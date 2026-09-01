import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';

const GAP = 11;
const EDGE = 16;

// Hover/tap reveal. Positions itself against the viewport: opens below the
// term when there's room, flips above when there isn't, and shifts sideways
// to stay on screen. Transparent padding on the gap side keeps the path
// between term and panel hoverable so you can move in and click a link.
const Popover = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  // closing keeps the panel mounted while the fade-out plays
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState({ shift: 0, place: 'bottom', maxH: null });
  const btnRef = useRef(null);
  const popRef = useRef(null);

  const show = () => { setClosing(false); setOpen(true); };
  const hide = () => { if (open) { setOpen(false); setClosing(true); } };

  // single measuring pass — nothing here depends on a previous render's result,
  // so this can't feed back into itself
  const place = useCallback(() => {
    const btn = btnRef.current;
    const pop = popRef.current;
    if (!btn || !pop) return;

    const b = btn.getBoundingClientRect();
    const width = pop.offsetWidth;
    const height = pop.scrollHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const below = vh - b.bottom - GAP - EDGE;
    const above = b.top - GAP - EDGE;
    const useBottom = height <= below || below >= above;
    const room = Math.max(120, useBottom ? below : above);

    const centre = b.left + b.width / 2;
    let shift = 0;
    if (centre - width / 2 < EDGE) shift = EDGE - (centre - width / 2);
    else if (centre + width / 2 > vw - EDGE) shift = vw - EDGE - (centre + width / 2);

    setPos({
      shift,
      place: useBottom ? 'bottom' : 'top',
      maxH: height > room ? room : null,
    });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open, place]);

  const bottom = pos.place === 'bottom';

  return (
    <span
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        onPointerDown={(e) => { if (e.pointerType === 'touch') (open ? hide() : show()); }}
        onFocus={(e) => { if (e.target.matches(':focus-visible')) show(); }}
        onBlur={(e) => { if (!e.currentTarget.parentNode.contains(e.relatedTarget)) hide(); }}
        className="border-b border-dotted border-zinc-400 hover:border-zinc-900 focus:outline-none focus-visible:border-zinc-900 transition-colors"
      >
        {label}
      </button>

      {(open || closing) && (
      <span
        style={{
          transform: `translateX(calc(-50% + ${pos.shift}px))`,
          [bottom ? 'top' : 'bottom']: '100%',
          [bottom ? 'paddingTop' : 'paddingBottom']: `${GAP}px`,
        }}
        onAnimationEnd={(e) => { if (e.animationName === 'fade-out') setClosing(false); }}
        className={`absolute left-1/2 z-20 ${open ? 'animate-fade' : 'animate-fade-out'}`}
      >
        <span
          ref={popRef}
          style={pos.maxH ? { maxHeight: `${pos.maxH}px`, overflowY: 'auto' } : undefined}
          className="flex w-[360px] max-w-[calc(100vw-32px)] flex-col border border-zinc-300 bg-white text-left"
        >
          {items.map((it) => (
            <span
              key={it.name}
              className="flex flex-1 items-center gap-x-[11px] border-t border-zinc-200 px-3.5 py-2.5 first:border-t-0"
            >
              <a
                href={it.url}
                target="_blank"
                rel="noreferrer"
                aria-label={it.name}
                className="h-7 w-7 flex-none overflow-hidden border border-zinc-200 bg-cover bg-center transition-colors hover:border-zinc-900"
                style={it.crop
                  ? { backgroundImage: `url(${it.logo})`, backgroundSize: '125px', backgroundPosition: '-9.5px -44.5px', backgroundRepeat: 'no-repeat' }
                  : undefined}
              >
                {!it.crop && <img src={it.logo} alt="" className="h-full w-full object-cover" />}
              </a>

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] font-medium leading-snug">{it.name}</span>
                  <span className="flex-none text-[10.5px] leading-snug text-zinc-400">{it.year}</span>
                </span>
                <span className={`mt-0.5 block text-[11px] leading-normal ${it.note ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  {it.desc}
                </span>
                {it.note && (
                  <span className="mt-0.5 block text-[11.5px] leading-normal text-zinc-900">{it.note}</span>
                )}
              </span>
            </span>
          ))}
        </span>
      </span>
      )}
    </span>
  );
};

export default Popover;
