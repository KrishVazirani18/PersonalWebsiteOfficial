import React, { useEffect, useState } from 'react';
import essay from './content/who-spreads-the-jam.json';
import CopyReview, { LinkedText, ReviewNavigation, reviewCounts } from './CopyReview';
import './writing-paper.css';

const essayPath = '/writing/who-spreads-the-jam';

export default function Writing({ path }) {
  const isEssay = path === essayPath;
  const isIndex = path === '/writing';
  const canReview = import.meta.env.DEV && isEssay && reviewCounts.total > 0;
  const [showNotes, setShowNotes] = useState(() => new URLSearchParams(window.location.search).get('review') !== 'off');
  const reviewing = canReview && showNotes;
  const paperView = isEssay && !reviewing;

  function toggleReview() {
    const next = !showNotes;
    setShowNotes(next);
    const url = new URL(window.location.href);
    url.searchParams.set('review', next ? '1' : 'off');
    window.history.replaceState(null, '', url);
  }

  useEffect(() => {
    document.title = `${isEssay ? essay.title : isIndex ? 'Writing' : 'Page not found'} — Krish Vazirani`;
  }, [isEssay, isIndex]);

  return (
    <div className={`min-h-screen font-sans text-zinc-900 ${paperView ? 'essay-paper-background' : 'bg-white'}`}>
      <main className={`mx-auto px-6 py-7 md:py-12 ${reviewing ? 'copy-review-page' : 'max-w-5xl'} ${paperView ? 'essay-paper-layout' : ''}`}>
        <div className={`mx-auto ${reviewing ? '' : paperView ? 'max-w-[802px]' : 'max-w-2xl'}`}>
          <nav className="mb-7 text-xs text-zinc-500 md:mb-8" aria-label="Back navigation">
            <a href={isEssay ? '/writing' : '/'} className="hover:text-zinc-900 hover:underline">
              {isEssay ? '← Writing' : '← Home'}
            </a>
          </nav>

          {isIndex ? (
            <>
              <h1 className="mb-6 text-base font-medium">Writing</h1>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <a href={essayPath} className="hover:underline">{essay.title}</a>
                <time dateTime={essay.date} className="whitespace-nowrap text-[11px] text-zinc-500">
                  {essay.displayDate}
                </time>
              </div>
            </>
          ) : isEssay ? (
            <article aria-labelledby="essay-title" className={paperView ? 'essay-paper' : undefined}>
              <header className="mb-7">
                <h1 id="essay-title" className="mb-2 text-[19px] font-medium leading-snug sm:text-xl">
                  {essay.title}
                </h1>
                <time dateTime={essay.date} className="text-[11px] text-zinc-500">
                  {essay.displayDate}
                </time>
              </header>
              {canReview && (
                <section className="copy-review-toolbar" aria-label="Editorial review">
                  <div className="copy-review-toolbar-top">
                    <strong>Copy review · {reviewCounts.total} open {reviewCounts.total === 1 ? 'note' : 'notes'}</strong>
                    <button type="button" onClick={toggleReview} aria-pressed={showNotes}>
                      {showNotes ? 'Hide notes' : 'Show notes'}
                    </button>
                  </div>
                  {showNotes && (
                    <>
                      <p>Your approved edits are applied. The passages below still have recommendations for you to review.</p>
                      <p>Original note numbers are preserved. Suggested wording has not been applied.</p>
                      <ReviewNavigation />
                    </>
                  )}
                </section>
              )}
              <div className="text-sm leading-[1.75] sm:text-[15px]">
                {essay.blocks.map((block, index) => block.type === 'image' ? (
                  <div key={block.src} className={reviewing ? 'copy-review-figure' : ''}>
                    <figure className="my-8 -mx-3 sm:mx-0">
                      <img src={block.src} alt={block.alt} className="h-auto w-full" loading="lazy" />
                    </figure>
                  </div>
                ) : reviewing ? (
                  <CopyReview key={index} block={block} index={index} />
                ) : (
                  <p key={index} className={block.signature ? 'mt-7' : 'mb-[22px]'}><LinkedText text={block.text} links={block.links} /></p>
                ))}
              </div>
            </article>
          ) : (
            <h1 className="text-base font-medium">Page not found</h1>
          )}
        </div>
      </main>
    </div>
  );
}
