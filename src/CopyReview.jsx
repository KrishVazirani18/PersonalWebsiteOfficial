import React from 'react';
import notes from './content/who-spreads-the-jam-review.json';
import './copy-review.css';

export const reviewCounts = {
  total: notes.length,
  fix: notes.filter(note => note.kind === 'fix').length,
  copy: notes.filter(note => note.kind === 'copy').length,
  check: notes.filter(note => note.kind === 'check').length,
};

const labels = { fix: 'Fix', copy: 'For your review', check: 'Research / wording' };

export function LinkedText({ text, links = [] }) {
  const matches = links.map(link => ({ ...link, start: text.indexOf(link.text) }))
    .filter(link => link.start >= 0).sort((a, b) => a.start - b.start);
  const parts = [];
  let cursor = 0;
  matches.forEach(link => {
    if (link.start < cursor) return;
    parts.push(text.slice(cursor, link.start));
    parts.push(<a key={`${link.start}-${link.href}`} href={link.href} className="essay-source-link" target="_blank" rel="noopener noreferrer">{link.text}</a>);
    cursor = link.start + link.text.length;
  });
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}

export function ReviewNavigation() {
  return (
    <nav className="copy-review-jump" aria-label="Open recommendations">
      <span>Still open:</span>
      {notes.map(note => <a key={note.id} href={`#edit-${note.id}`}>#{note.id}</a>)}
    </nav>
  );
}

export default function CopyReview({ block, index }) {
  const paragraphNotes = notes.filter(note => note.block === index && block.text.includes(note.current));
  const ordered = paragraphNotes.map(note => ({
    ...note,
    start: block.text.indexOf(note.current),
  })).sort((a, b) => a.start - b.start);
  const text = [];
  let cursor = 0;

  ordered.forEach(note => {
    text.push(<LinkedText key={`before-${note.id}`} text={block.text.slice(cursor, note.start)} links={block.links} />);
    text.push(
      <a
        key={note.id}
        id={`passage-${note.id}`}
        href={`#edit-${note.id}`}
        className={`copy-review-highlight review-${note.kind}`}
        title={`Note ${note.id}: ${note.title}`}
      >
        {note.current}<sup aria-label={`Review note ${note.id}`}>{note.id}</sup>
      </a>,
    );
    cursor = note.start + note.current.length;
  });
  text.push(<LinkedText key="remainder" text={block.text.slice(cursor)} links={block.links} />);

  return (
    <div className="copy-review-row">
      <p className={block.signature ? 'mt-7' : 'mb-[22px]'}>{text}</p>
      {paragraphNotes.length > 0 && (
        <aside className="copy-review-notes" aria-label={`Review notes for paragraph ${index + 1}`}>
          <ol>
            {paragraphNotes.map(note => (
              <li key={note.id} id={`edit-${note.id}`} className={`copy-review-note review-${note.kind}`} tabIndex={-1}>
                <div className="copy-review-note-heading">
                  <a href={`#passage-${note.id}`} aria-label={`Back to passage ${note.id}`}>#{note.id}</a>
                  <span>{labels[note.kind]}</span>
                </div>
                <h2>{note.title}</h2>
                {note.options?.length > 0 ? (
                  <div className="copy-review-options">
                    {note.options.map(option => (
                      <div className="copy-review-option" key={option.label}>
                        <p className="copy-review-label">{option.label}</p>
                        <p className="copy-review-suggestion">{option.text}</p>
                      </div>
                    ))}
                  </div>
                ) : note.suggestion === null ? (
                  <p className="copy-review-action">Resolve the source or cut this sentence.</p>
                ) : note.suggestion === '' ? (
                  <p className="copy-review-action">Suggested: remove the highlighted passage.</p>
                ) : (
                  <>
                    <p className="copy-review-label">Suggested wording</p>
                    <p className="copy-review-suggestion">{note.suggestion}</p>
                  </>
                )}
                <p className="copy-review-reason">{note.reason}</p>
                {note.sources?.length > 0 && (
                  <ul className="copy-review-sources">
                    {note.sources.map(source => (
                      <li key={source.href}><a href={source.href} className="essay-source-link" target="_blank" rel="noopener noreferrer">{source.text}</a></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </aside>
      )}
    </div>
  );
}
