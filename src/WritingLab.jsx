import React, { useEffect } from 'react';
import essay from './content/who-spreads-the-jam.json';
import './writing-lab.css';

const labPath = '/writing/lab';
const essayPath = '/writing/who-spreads-the-jam';
const question = 'What comes after everyone gets good at AI?';
const opening = essay.blocks[0].text;
const curve = essay.blocks.find(block => block.src?.includes('capability-curve'));

const concepts = [
  { id: 'newspaper', number: '01', name: 'The personal newspaper', description: 'A big headline, fine rules, and a little editorial gravity.', component: Newspaper },
  { id: 'contents', number: '02', name: 'The table of contents', description: 'An ongoing book. Each essay earns its own line.', component: Contents },
  { id: 'letters', number: '03', name: 'Letters from Krish', description: 'Warm, unhurried, and addressed to whoever finds it.', component: Letters },
  { id: 'journal', number: '04', name: 'The research journal', description: 'Questions and drawings, collected as the thinking develops.', component: Journal },
];

function EssayTitle({ children = essay.title }) {
  return <a href={essayPath}>{children}</a>;
}

function Newspaper() {
  return (
    <div className="wl-concept wl-newspaper">
      <header>
        <div className="wl-paper-top"><span>A personal publication</span><span>Krish Vazirani</span></div>
        <h1 className="wl-masthead">Writing</h1>
        <div className="wl-paper-edition"><span>No. 01</span><time dateTime={essay.date}>October 16, 2026</time><span>Essays & ideas</span></div>
      </header>
      <article className="wl-paper-story">
        <p className="wl-eyebrow">On AI & how we work</p>
        <h2><EssayTitle /></h2>
        <p className="wl-paper-deck">{question}</p>
        <div className="wl-paper-columns">
          <div><p className="wl-paper-opening">{opening}</p><a className="wl-read" href={essayPath}>Continue reading <span aria-hidden="true">↗</span></a></div>
          <figure><img src={curve.src} alt={curve.alt} /><figcaption>The next jump.</figcaption></figure>
        </div>
      </article>
      <footer className="wl-paper-footer"><span>Written by Krish Vazirani</span><span>01</span></footer>
    </div>
  );
}

function Contents() {
  return (
    <div className="wl-concept wl-contents">
      <header className="wl-book-author">Krish Vazirani</header>
      <div className="wl-book-heading"><p className="wl-eyebrow">An ongoing collection</p><h1>Contents</h1></div>
      <article className="wl-book-entry">
        <span className="wl-book-number">01</span>
        <div className="wl-book-entry-body">
          <div className="wl-book-title-row"><h2><EssayTitle /></h2><span className="wl-book-leader" aria-hidden="true" /><time dateTime={essay.date}>Oct 2026</time></div>
          <p>{question}</p>
        </div>
      </article>
      <footer className="wl-book-footer"><span>Essays</span><span>2026 —</span></footer>
    </div>
  );
}

function Letters() {
  return (
    <div className="wl-concept wl-letters">
      <header className="wl-letter-heading"><p className="wl-eyebrow">From Krish Vazirani</p><h1>Letters, <em>mostly.</em></h1><p>A few things I’m trying to make sense of.</p></header>
      <article className="wl-letter">
        <div className="wl-letter-date"><span>01</span><time dateTime={essay.date}>October 16, 2026</time></div>
        <h2><EssayTitle /></h2>
        <p className="wl-letter-opening">{opening}</p>
        <a className="wl-read" href={essayPath}>Read on <span aria-hidden="true">↗</span></a>
        <p className="wl-letter-signature">— Krish</p>
      </article>
    </div>
  );
}

function Journal() {
  return (
    <div className="wl-concept wl-journal">
      <header><div className="wl-journal-top"><span>Krish Vazirani</span><span>Field notes</span></div><h1>Working theories.</h1><p className="wl-journal-subtitle">Writing to figure things out.</p></header>
      <article className="wl-journal-entry">
        <div className="wl-journal-meta"><span>Note 001</span><time dateTime={essay.date}>16 Oct 2026</time></div>
        <h2><EssayTitle /></h2>
        <p className="wl-journal-question">{question}</p>
        <figure><img src={curve.src} alt={curve.alt} /><figcaption><span>Fig. 01</span><span>Where does the next jump come from?</span></figcaption></figure>
        <a className="wl-read" href={essayPath}>Read the essay <span aria-hidden="true">↗</span></a>
      </article>
    </div>
  );
}

function Sheet({ concept }) {
  const Concept = concept.component;
  return <div className="wl-sheet-frame"><Concept /></div>;
}

export default function WritingLab({ path }) {
  const active = concepts.find(concept => path === `${labPath}/${concept.id}`);
  useEffect(() => {
    document.title = `${active ? active.name : 'Writing prototype lab'} — Krish Vazirani`;
  }, [active]);

  return (
    <div className={`writing-lab ${active ? 'wl-single' : ''}`}>
      <header className="wl-lab-header">
        <a href={active ? labPath : '/writing'} className="wl-back">← {active ? 'All directions' : 'Current writing page'}</a>
        <div className="wl-lab-title"><h1>{active ? active.name : 'Writing, four ways.'}</h1><span>Prototype lab</span></div>
        <p>{active ? active.description : 'The same essay. Four quiet ways to give it a home.'}</p>
        {active && <nav className="wl-switcher" aria-label="Design directions">{concepts.map(concept => <a key={concept.id} href={`${labPath}/${concept.id}`} aria-current={active.id === concept.id ? 'page' : undefined}>{concept.number} <span>{concept.name.replace('The ', '')}</span></a>)}</nav>}
      </header>
      <main className={active ? 'wl-focus' : 'wl-grid'}>
        {active ? <Sheet concept={active} /> : concepts.map(concept => (
          <section className="wl-study" key={concept.id} aria-labelledby={`study-${concept.id}`}>
            <div className="wl-study-heading"><h2 id={`study-${concept.id}`}><span>{concept.number}</span>{concept.name}</h2><a href={`${labPath}/${concept.id}`}>Open full size <span aria-hidden="true">↗</span></a></div>
            <Sheet concept={concept} />
            <p className="wl-study-caption">{concept.description}</p>
          </section>
        ))}
      </main>
      <footer className="wl-lab-footer">Local design studies · Article links open the finished essay.</footer>
    </div>
  );
}
