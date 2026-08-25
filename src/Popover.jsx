import React, { useState, useRef, useLayoutEffect } from 'react';

// Hover/tap reveal. The panel sits inside a wrapper with transparent top padding
// so the gap between term and panel stays hoverable — you can move the cursor
// into the panel and click through to each entry.
const Popover = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const wrapRef = useRef(null);
  const popRef = useRef(null);

  useLayoutEffect(() => {
    if (!open) {
      if (shift !== 0) setShift(0);
      return;
    }
    if (!popRef.current) return;
    const r = popRef.current.getBoundingClientRect();
    const pad = 16;
    let next = shift;
    if (r.left < pad) next = shift + (pad - r.left);
    else if (r.right > window.innerWidth - pad) next = shift + (window.innerWidth - pad - r.right);
    if (next !== shift) setShift(next);
  }, [open, shift]);

  return (
    <span
      ref={wrapRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onPointerDown={(e) => { if (e.pointerType === 'touch') setOpen((v) => !v); }}
        onFocus={(e) => { if (e.target.matches(':focus-visible')) setOpen(true); }}
        // don't close when focus moves into the panel to click a link
        onBlur={(e) => { if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false); }}
        className="border-b border-dotted border-zinc-400 hover:border-zinc-900 focus:outline-none focus-visible:border-zinc-900 transition-colors"
      >
        {label}
      </button>

      <span
        style={{ transform: `translateX(calc(-50% + ${shift}px)) translateY(${open ? 0 : -4}px)` }}
        className={`absolute left-1/2 top-full z-20 pt-[11px] transition-all duration-150
          ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <span
          ref={popRef}
          className="flex min-h-[164px] w-[360px] max-w-[calc(100vw-32px)] flex-col border border-zinc-300 bg-white text-left"
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
    </span>
  );
};

export default Popover;
