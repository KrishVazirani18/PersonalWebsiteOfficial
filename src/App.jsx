import React from 'react';
import shipImage from '../images/ship.jpg';
import brightstarLogo from '../images/logos/brightstar.png';
import powercmaLogo from '../images/logos/powercma.png';
import lvlupLogo from '../images/logos/lvlup.jpg';
import chapterOneLogo from '../images/logos/chapterone.jpg';
import Popover from './Popover';

// inline mentions stay in ink; only the footer links read as blue
const link =
  'underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors';
const linkBlue =
  'text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-600 transition-colors';

const OTHER = [
  {
    name: 'Brightstar',
    year: '2025–2026',
    desc: 'Product Development Firm',
    note: 'Worked with 3 $1B+ companies',
    logo: brightstarLogo,
    url: 'https://www.linkedin.com/company/brightstar-ventures/',
  },
  {
    name: 'Chapter One',
    year: '2025–2026',
    desc: 'Investment Team',
    note: '$150M AUM',
    logo: chapterOneLogo,
    url: 'https://chapterone.com/',
  },
  {
    name: 'LvlUp Ventures',
    year: '2025',
    desc: 'Head of Technology',
    note: '$500M AUM',
    logo: lvlupLogo,
    url: 'https://www.lvlup.vc/',
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

const App = () => {
  return (
    <div className="bg-white text-zinc-900 font-sans min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-10 md:py-12 min-h-screen">
        <div className="max-w-2xl mx-auto">
          <img
            src={shipImage}
            alt="Painting of a tall ship under sail on open water"
            className="w-full h-32 sm:h-40 md:h-48 object-cover border border-zinc-200"
          />

          <section className="mt-8 md:mt-10 w-full space-y-5 text-[14px] leading-relaxed text-zinc-900">
            <p>
              Hi, I'm Krish. I like working on things that don't immediately make sense. Right now, I'm the first hire at <a href="https://www.aseonlabs.com/" target="_blank" rel="noreferrer" className={link}>Aseon Labs</a> (P26), where I work on product. We're building robotic pit stops for self-driving cars. Aseon is backed by some incredible investors including YC, Robinhood, and the founders of Mercury, Uber, and Lyft.
            </p>

            <p>
              Before that, I founded <a href="https://useswarm.co" target="_blank" rel="noreferrer" className={link}>Swarm</a>, a startup that simulated user behavior for product teams. We raised $250K+ from LeapYear, Afore Capital, KPMG, and other early believers.
            </p>

            <p>
              You can find a few other things I've done <Popover label="here" items={OTHER} />.
            </p>
          </section>

          <div className="mt-10 w-full text-center text-[14px] text-zinc-900">
            <p>
              <a href="https://linkedin.com/in/krish-vazirani-814511236" target="_blank" rel="noreferrer" className={linkBlue}>LinkedIn</a> / krishvazirani1018 [at] gmail [dot] com / <a href="https://github.com/KrishVazirani18" target="_blank" rel="noreferrer" className={linkBlue}>GitHub</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
