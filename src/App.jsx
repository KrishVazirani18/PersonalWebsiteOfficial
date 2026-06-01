import React from 'react';
import shireImage from '../images/shire.png';

const App = () => {
  return (
    <div className="bg-white text-zinc-900 font-sans min-h-screen">
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="h-40 sm:h-48 md:h-56 border border-zinc-300 overflow-hidden">
            <img
              src={shireImage}
              alt="Landscape artwork"
              className="h-full w-full object-cover object-[center_65%]"
            />
          </div>

          <section className="mt-10 md:mt-12 w-full space-y-6 text-[15px] leading-relaxed text-zinc-700">
            <p>
              Hey, I'm Krish. I like working on things that don't immediately make sense. Ideas most people would wave off.
            </p>

            <p>
              In 2024, I sold my first company for six figures. It helped realtors in the Silicon Valley market work faster. From 2025 to 2026, I worked in venture capital. Tracked deals, spoke to founders, helped portfolio companies, and built tech to make VCs more efficient. Taught me a lot. I was also running my product development firm, Brightstar, on the side.
            </p>

            <p>
              Then, I built <a href="https://useswarm.co" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors">Swarm</a>, a startup that simulates user behavior at scale. We raised ~$250K in funding. Now, I'm working on product and strategy for <a href="https://www.aseonlabs.com/" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors">Aseon Labs (P26)</a>, who build robotic pitstops for autonomous vehicles.
            </p>
          </section>

          <div className="mt-12 w-full text-center text-[15px] text-zinc-700">
            <p>
              <a href="https://linkedin.com/in/krish-vazirani-814511236" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors">LinkedIn</a> / krishvazirani1018 [at] gmail [dot] com / <a href="https://github.com/KrishVazirani18" target="_blank" rel="noreferrer" className="underline decoration-zinc-300 hover:decoration-zinc-900 transition-colors">GitHub</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
