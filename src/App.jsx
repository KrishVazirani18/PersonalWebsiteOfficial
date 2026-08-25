import React from 'react';
import shipImage from '../images/ship.jpg';
import brightstarLogo from '../images/logos/brightstar.png';
import powercmaLogo from '../images/logos/powercma.png';
import lvlupLogo from '../images/logos/lvlup.jpg';
import chapterOneLogo from '../images/logos/chapterone.jpg';
import Popover from './Popover';

const link =
  'underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors';

const COMPANIES = [
  {
    name: 'Brightstar',
    year: '2025–2026',
    desc: 'Product Development Firm',
    note: 'Worked with 3 $1B+ companies',
    logo: brightstarLogo,
    url: 'https://www.linkedin.com/company/brightstar-ventures/',
  },
  {
    name: 'PowerCMA',
    year: '2024',
    desc: 'Automated Marketing for Realtors',
    note: 'Sold for $100K+',
    logo: powercmaLogo,
    crop: true,
    url: 'https://www.linkedin.com/posts/krishvazirani_the-real-estate-game-is-all-about-effective-activity-7227609445608923138-AZf2',
  },
];

const VENTURE = [
  { name: 'Chapter One', year: '2025–2026', desc: 'Investment Team', note: '$150M AUM', logo: chapterOneLogo, url: 'https://chapterone.com/' },
  { name: 'LvlUp Ventures', year: '2025', desc: 'Head of Technology', note: '$500M AUM', logo: lvlupLogo, url: 'https://www.lvlup.vc/' },
];

const App = () => {
  return (
    <div className="bg-white text-zinc-900 font-sans min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <img
            src={shipImage}
            alt="Painting of a tall ship under sail on open water"
            className="w-full h-48 object-cover border border-zinc-200"
          />

          <section className="mt-10 md:mt-12 w-full space-y-6 text-[14px] leading-relaxed text-zinc-900">
            <p>
              I'm Krish. I like to work on things that don't immediately make sense. Right now that's <a href="https://www.aseonlabs.com/" target="_blank" rel="noreferrer" className={link}>Aseon Labs</a> (P26), where I'm the first hire, working on product. We build robotic pitstops for self-driving cars, backed by some incredible investors including YC, Robinhood, and the founders of Mercury, Uber, and Lyft.
            </p>

            <p>
              I also founded <a href="https://useswarm.co" target="_blank" rel="noreferrer" className={link}>Swarm</a>, a startup that simulated user behavior for product teams. We raised $250K+ from LeapYear, Afore Capital, KPMG, and other early believers.
            </p>

            <p>
              Previously, I built <Popover label="a few companies" items={COMPANIES} /> and worked in <Popover label="venture capital" items={VENTURE} />.
            </p>
          </section>

          <div className="mt-12 w-full text-center text-[14px] text-zinc-900">
            <p>
              <a href="https://linkedin.com/in/krish-vazirani-814511236" target="_blank" rel="noreferrer" className={link}>LinkedIn</a> / krishvazirani1018 [at] gmail [dot] com / <a href="https://github.com/KrishVazirani18" target="_blank" rel="noreferrer" className={link}>GitHub</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
