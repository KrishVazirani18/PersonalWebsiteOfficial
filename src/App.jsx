import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Linkedin, Play, FileText, Database, Layers, ExternalLink, Cpu, Globe, Mic, CheckCircle, Terminal, Code, X, Bot } from 'lucide-react';
import img1 from '../images/1.png';
import img2 from '../images/2.png';
import img3 from '../images/3.png';
import headshot from '../krish_headshot.jpeg';

// Card 1 Assets
import powerCmaLogo from '../card1_logos/PowerCMA_Logo.png';
import c1l1 from '../card1_logos/1.jpg';
import c1l2 from '../card1_logos/2.png';
import c1l3 from '../card1_logos/3.png';

// Card 2 Assets
import lvlUpLogo from '../card2_logos/LvlUp_Logo.png';
import c2l1 from '../card2_logos/1.png';
import c2l2 from '../card2_logos/2.png';
import c2l3 from '../card2_logos/3.jpg';

// Card 3 Assets
import brightstarLogo from '../card3_logos/Brightstar_Logo.png';
import c3l1 from '../card3_logos/1.png';
import c3l2 from '../card3_logos/2.png';
import c3l3 from '../card3_logos/3.webp';

// Card 4 Assets
import chapterOneLogo from '../card3_logos/card4_logos/ChapterOne_Logo.jpg';
import c4l1 from '../card3_logos/card4_logos/1.png';
import c4l2 from '../card3_logos/card4_logos/2.png';
import c4l3 from '../card3_logos/card4_logos/3.jpg';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const trailingRef = useRef(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const trailingPos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      const target = e.target;
      setIsHovering(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    let animationFrameId;
    const animate = () => {
      const ease = 0.15;
      trailingPos.current.x += (cursorPos.current.x - trailingPos.current.x) * ease;
      trailingPos.current.y += (cursorPos.current.y - trailingPos.current.y) * ease;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }
      
      if (trailingRef.current) {
        const scale = isHoveringRef.current ? 1.5 : 1;
        trailingRef.current.style.transform = `translate3d(${trailingPos.current.x}px, ${trailingPos.current.y}px, 0) scale(${scale})`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={trailingRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full mix-blend-difference pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

const SummaryModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl flex relative animate-in zoom-in-95 duration-300">
         <button onClick={onClose} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors z-50 cursor-pointer">
            <X size={24} />
         </button>

         {isLoading ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white z-50">
              <div className="w-16 h-16 border-2 border-zinc-800 border-t-zinc-100 rounded-full animate-spin mb-4"></div>
              <div className="font-mono text-xs uppercase tracking-widest animate-pulse text-zinc-400">Initializing Profile...</div>
           </div>
         ) : (
           <div className="flex w-full h-full flex-col md:flex-row">
              {/* Sidebar */}
              <div className="w-full md:w-64 bg-zinc-950 border-r border-zinc-800 p-6 md:p-8 flex flex-col shrink-0">
                  <div className="mb-8 md:mb-12 flex items-center md:block gap-4">
                     {/* Profile Photo Area */}
                     <img 
                        src={headshot} 
                        alt="Krish Vazirani"
                        loading="lazy"
                        className="w-10 h-10 md:w-32 md:h-32 rounded-full md:mb-6 object-cover border-2 border-zinc-800 shadow-xl"
                     />
                     <div>
                        <div className="font-bold text-white">Krish Vazirani</div>
                        <div className="text-xs text-zinc-500 font-mono uppercase mt-1">Full Stack Engineer</div>
                     </div>
                  </div>
                  
                  <nav className="space-y-2 flex-1">
                     <a href="https://linkedin.com/in/krish-vazirani-814511236" target="_blank" rel="noreferrer" className="block px-4 py-3 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm font-medium flex items-center gap-3">
                        <Linkedin size={16}/> LinkedIn
                     </a>
                     <a href="mailto:krishvazirani1018@gmail.com" className="block px-4 py-3 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm font-medium flex items-center gap-3">
                        <Mail size={16}/> Email
                     </a>
                     <a href="#" className="block px-4 py-3 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm font-medium flex items-center gap-3">
                        <FileText size={16}/> Resume
                     </a>
                  </nav>

                  <div className="hidden md:block text-[10px] text-zinc-700 font-mono uppercase tracking-widest">
                     v2.0.5 • System Active
                  </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 bg-zinc-900 p-8 md:p-12 overflow-y-auto text-zinc-300 scrollbar-hide">
                 <h2 className="text-3xl font-bold text-white mb-8">Executive Summary</h2>
                 <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed mb-6 text-zinc-400">
                       Founder and Full Stack Engineer with a focus on high-velocity product development. 
                       Specialized in building scalable engines from 0 to 1. 
                       Proven track record of exiting a company in 6 months (PowerCMA) and scaling review pipelines for $300M+ AUM firms.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
                       <div className="p-6 bg-zinc-950/50 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors">
                          <div className="text-3xl font-bold text-white mb-1">4.5x</div>
                          <div className="text-xs uppercase tracking-widest text-zinc-500">Efficiency Boost</div>
                       </div>
                       <div className="p-6 bg-zinc-950/50 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors">
                          <div className="text-3xl font-bold text-white mb-1">6 Mo</div>
                          <div className="text-xs uppercase tracking-widest text-zinc-500">Time to Exit</div>
                       </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">Core Competencies</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                       {['React', 'Node.js', 'System Architecture', 'Venture Capital', 'AI Agents', 'Product Strategy', 'PostgreSQL', 'Tailwind'].map(skill => (
                          <span key={skill} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300 border border-zinc-700 hover:border-zinc-500 transition-colors cursor-default">{skill}</span>
                       ))}
                    </div>
                    
                    <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/30 text-sm text-zinc-500 font-mono">
                       &gt; echo "Ready to build."
                    </div>
                 </div>
              </div>
           </div>
         )}
      </div>
    </div>
  );
};

const App = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [unblurredChapters, setUnblurredChapters] = useState(new Set([0]));
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dateTime, setDateTime] = useState('');
  const [originCollapsed, setOriginCollapsed] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [collidingChapter, setCollidingChapter] = useState(null);
  const [activeVaultItem, setActiveVaultItem] = useState(0);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const lastScrollY = useRef(0);
  
  const originRef = useRef(null);
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const spineTrackerRef = useRef(null);
  const spineLineRef = useRef(null);
  const gridBgRef = useRef(null);

  // Live Clock with Date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setDateTime(`${dateStr} • ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const chapterRefs = useRef([]);

  // Scroll Logic (Progress + Header + Chapter Activation)
  useEffect(() => {
    let animationFrameId;
    
    // Animation Loop for Smooth Spine
    const animateSpine = () => {
        // Lerp logic
        const ease = 0.1; // Adjust for smoothness (lower = slower/smoother)
        const diff = scrollTarget.current - scrollCurrent.current;
        
        if (Math.abs(diff) > 0.0001) {
            scrollCurrent.current += diff * ease;
            
            // Update DOM directly
            if (spineTrackerRef.current) {
                spineTrackerRef.current.style.top = `${scrollCurrent.current * 100}%`;
            }
            if (spineLineRef.current) {
                spineLineRef.current.style.height = `${scrollCurrent.current * 100}%`;
            }
            if (gridBgRef.current) {
                gridBgRef.current.style.transform = `rotateX(60deg) translateY(${scrollCurrent.current * 200}px) scale(1.5)`;
            }
        }
        
        animationFrameId = requestAnimationFrame(animateSpine);
    };
    animateSpine();

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      
      // Update target for animation loop
      scrollTarget.current = scroll;
      setScrollProgress(Number(scroll)); // Keep this for React state logic if needed elsewhere, or remove if purely visual

      // Collision Detection (using current lerped value would be better but scroll is fine for logic)
      const trackerY = scroll * window.innerHeight;
      let collisionFound = null;

      chapterRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const milestoneY = rect.top + rect.height / 2;
        
        // Checking collision relative to viewport top (since tracker is fixed)
        // Actually tracker is fixed at top: scrollProgress * 100% of viewport height?
        // Wait, the spine is fixed height: 100vh. 
        // The tracker moves from 0% to 100% of the viewport height based on total scroll progress.
        
        // Visual tracker Y relative to viewport:
        const visualTrackerY = scroll * window.innerHeight;
        
        // Element center relative to viewport:
        const elementCenterY = rect.top + rect.height / 2;

        if (Math.abs(visualTrackerY - elementCenterY) < 50) { // Increased threshold slightly
           collisionFound = index;
        }
      });
      setCollidingChapter(collisionFound);

      // Header Fade Logic
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false); 
      } else {
        setIsHeaderVisible(true); 
      }
      lastScrollY.current = currentScrollY;

      // Collapse Origin Story logic...
      if (!originCollapsed && originRef.current) {
        const rect = originRef.current.getBoundingClientRect();
        // Disappear only when the section is scrolling off the top (bottom is at 20% of screen height)
        if (rect.bottom < window.innerHeight * 0.2) {
           setOriginCollapsed(true);
        }
      }

      // Distance-based Chapter Activation logic...
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = -1;
      let minDistance = Infinity;

      chapterRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }

        if (distance < window.innerHeight * 0.4) {
             setUnblurredChapters(prev => new Set(prev).add(index));
        } else {
            setUnblurredChapters(prev => {
                const next = new Set(prev);
                if (distance < window.innerHeight * 0.4) {
                    next.add(index);
                } else {
                    next.delete(index);
                }
                return next;
            });
        }
      });

      if (closestIndex !== -1) {
        setActiveChapter(closestIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animationFrameId);
    };
  }, [originCollapsed]);

  const addToRefs = (el) => {
    if (el && !chapterRefs.current.includes(el)) {
      chapterRefs.current.push(el);
    }
  };

  const story = [
    {
      id: "01",
      title: "Startup",
      company: "PowerCMA",
      companyLogo: powerCmaLogo, 
      role: "Founder & CEO",
      period: "May 2024 — Nov 2024",
      link: null,
      text: "It started with a gap. I saw realtors drowning in data entry. I realized this wasn't just a nuisance; it was a market inefficiency waiting for code.",
      subtext: "Acquired in 6 months for >$100K.",
      theme: "from-zinc-200 to-zinc-400",
      logos: [
        { name: "Berkshire Hathaway", src: c1l1 },
        { name: "Intero", src: c1l2 },
        { name: "MLS", src: c1l3 }
      ],
      artifacts: [
        { label: "Founder Podcast", type: "Audio", icon: Mic, link: "https://www.linkedin.com/posts/krish-vazirani-814511236_the-real-estate-game-is-all-about-effective-activity-7227609445608923138-954J?utm_source=share&utm_medium=member_desktop&rcm=ACoAADrO-FABs1hF65Fc1GcN1N0FfZ8drKJGLP0" }
      ]
    },
    {
      id: "02",
      title: "VC Firm",
      company: "LvlUp Ventures",
      companyLogo: lvlUpLogo,
      role: "Head of Technology & Investor",
      period: "Dec 2024 — Jul 2025",
      link: "https://www.lvlup.vc",
      text: "After the exit, I needed to understand scale. I joined LvlUp ($300M AUM) to see how big capital handles big data.",
      subtext: "I architected pipelines that automated 4,000+ startup reviews, multiplying deal coverage by 4.5x.",
      theme: "from-zinc-200 to-zinc-400",
      logos: [
        { name: "Oracle", src: c2l1 },
        { name: "First Citizens", src: c2l2 },
        { name: "K12", src: c2l3 }
      ],
      artifacts: [
        { label: "Innovation Alliance", type: "Growth", icon: Globe, link: "https://www.lvlup.vc/innovation-alliance" }
      ]
    },
    {
      id: "03",
      title: "Startup",
      company: "Brightstar",
      companyLogo: brightstarLogo,
      role: "Founder & Managing Partner",
      period: "Feb 2025 — Present",
      link: "https://www.buildwithbrightstar.com",
      text: "Brightstar is a product development firm I started with a few buddies of mine.",
      subtext: "Shipping products for 10+ enterprises & startups across 13 industries.",
      theme: "from-zinc-200 to-zinc-400",
      logos: [
        { name: "Lerer Hippeau", src: c3l1 },
        { name: "Google", src: c3l2 },
        { name: "Virnika", src: c3l3 } 
      ],
      artifacts: [
        { label: "Our Mission", type: "Vision", icon: Layers, link: "https://www.linkedin.com/feed/update/urn:li:activity:7348017980758204416" }
      ]
    },
    {
      id: "04",
      title: "VC Firm",
      company: "Chapter One",
      companyLogo: chapterOneLogo,
      role: "Investment Analyst Intern",
      period: "Sep 2025 — Present",
      link: "https://chapterone.com",
      text: "The final piece: venture vision. At Chapter One ($150M), I support the CFO on enhancing financial workflows.",
      subtext: "Streamlining fund operations and analyzing portfolio performance for institutional deployment.",
      theme: "from-zinc-200 to-zinc-400",
      logos: [
        { name: "Chapter One", src: c4l1 },
        { name: "Sequoia", src: c4l2 },
        { name: "Network", src: c4l3 }
      ],
      artifacts: [
         { label: "Firm Profile", type: "Press", icon: FileText, link: "https://techcrunch.com/2021/12/20/venture-firm-chapter-one-focused-on-all-things-web3-draws-backing-from-big-name-vc-firms/" }
      ]
    }
  ];

  const vaultItems = [
    { 
      title: "Academic Research", 
      tag: "NLP / Economics", 
      desc: "Presented at IEEE ICARC 2023 and published in IJIT 2023. Solo-authored paper on transformer models for market forecasting.",
      icon: ExternalLink,
      illustration: img1,
      link: "https://ieeexplore.ieee.org/document/10145702"
    },
    { 
      title: "VC AI Agent", 
      tag: "AI / Finance", 
      desc: "Autonomous agentic workflow for automating due diligence and deal screening.",
      icon: Bot,
      illustration: img2,
      confidential: true
    },
    { 
      title: "Software Architecture Consulting", 
      tag: "System Design", 
      desc: "Partnered with a Series A agentic metahuman startup to rehaul architecture and technical decisions for scale.",
      icon: Layers,
      illustration: img3,
      link: "https://drive.google.com/file/d/1zgz_ZXCwCqIpgMagrfOh9KCzdIIjXTyv/view?usp=sharing"
    }
  ];

  return (
    <div className="bg-white text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white min-h-screen relative overflow-x-hidden cursor-none">
      <CustomCursor />

      {/* 1. Dynamic Grid Background */}
      <div className="fixed inset-0 z-0 pointer-events-none perspective-1000">
        <div 
          ref={gridBgRef}
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(zinc-900 1px, transparent 1px), linear-gradient(90deg, zinc-900 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            transformOrigin: 'top center',
            // Initial transform set here, updated by ref in animation loop
            transform: `rotateX(60deg) translateY(0px) scale(1.5)`, 
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* 2. Fixed Header (Fade In/Out) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 md:py-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-zinc-200/50 transition-all duration-500 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="pointer-events-auto font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-80 tabular-nums text-left min-w-[120px] text-zinc-900">
          {dateTime} NC
        </div>
        
        <a 
           href="https://linkedin.com/in/krish-vazirani-814511236" 
           target="_blank" 
           rel="noreferrer"
           className="pointer-events-auto w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all shadow-sm hover:shadow-md"
        >
           <Linkedin size={16} />
        </a>
      </header>
      
      <SummaryModal isOpen={isSummaryOpen} onClose={() => setIsSummaryOpen(false)} />

      {/* 3. The Central Spine */}
      <div className="fixed left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-100 z-0 md:-translate-x-1/2 transition-all duration-300">
        <div 
          ref={spineLineRef}
          className="absolute top-0 left-0 w-full bg-zinc-900 transition-none ease-linear" // Removed transition for smoother lerp
          style={{ height: '0%' }}
        ></div>
        <div 
           ref={spineTrackerRef}
           className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 transition-transform duration-100 ${collidingChapter !== null ? 'bg-white scale-100' : 'bg-zinc-400 scale-75'}`}
           style={{ top: '0%' }}
        ></div>
      </div>

      {/* 4. Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center relative z-20 px-6">
        <div className="text-center max-w-4xl pt-20">
           <div className="mb-8 flex justify-center">
              <img 
                src={headshot} 
                alt="Krish Vazirani" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-zinc-100 shadow-2xl cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsSummaryOpen(true)}
              />
           </div>

           <div 
              onClick={() => setIsSummaryOpen(true)}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer"
           >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 duration-1000"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 font-medium">Open for opportunities</span>
           </div>
           
           <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-8 text-zinc-900 selection:text-white selection:bg-zinc-900">
             HI, I'M KRISH
           </h1>
           
           <p className="text-lg md:text-2xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed mb-12">
             CS + Entrepreneurship at UNC-Chapel Hill <br/>
             <span className="text-zinc-900 font-medium">Exited Founder, Product Owner.</span>
           </p>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50">
          <span className="font-mono text-[10px] uppercase tracking-widest">Initiate Sequence</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-900 to-transparent"></div>
        </div>
      </section>

      {/* 5. Origin Story (One-Time Collapse) */}
      <div 
        ref={originRef}
        className={`relative z-10 transition-all duration-1000 ease-in-out overflow-hidden border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm
        ${originCollapsed ? 'max-h-0 opacity-0 py-0' : 'max-h-[1000px] opacity-100 py-24 md:py-32'}`}
      >
         <div className="container mx-auto px-6 max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-medium leading-relaxed text-zinc-800 mb-8">
               My journey started in 6th grade. I started an apparel company with friends of mine. We got shutdown for soliciting to teachers on campus.
            </h2>
            <p className="text-zinc-500 leading-relaxed font-light text-base md:text-lg">
               Everything I tried failed for the next 6 years. But I learned a lot and realized I had to stop solving for things that weren't problems. I indulged in free work. <span className="font-medium text-zinc-900">Solve then sell.</span>
            </p>
            <div className="mt-12 animate-bounce opacity-40">
               <ArrowDown className="mx-auto" size={20} />
            </div>
         </div>
      </div>

      {/* 6. The Narrative Journey */}
      <div className="relative z-10 pb-32">
        {story.map((chapter, index) => {
           const isEven = index % 2 === 0;
           const isActive = activeChapter === index;
           const isUnblurred = unblurredChapters.has(index);

           return (
             <div 
                key={chapter.id}
                ref={addToRefs}
                data-index={index}
                className="min-h-screen flex items-center justify-center relative py-12 md:py-24"
             >
                {/* Connector Node on Spine */}
                <div className={`absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 -translate-x-1/2 z-20 transition-all duration-500 ${isActive ? 'scale-150' : 'scale-100'} ${collidingChapter === index ? 'scale-[3] opacity-0' : ''}`}>
                   <div className={`w-full h-full rounded-full border-2 border-white ${isActive ? 'bg-zinc-900' : 'bg-zinc-300'}`}></div>
                   {isActive && (
                     <div className="absolute inset-0 bg-zinc-900 rounded-full animate-ping opacity-20"></div>
                   )}
                </div>

                {/* Content Container */}
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
                   
                   {/* Text Side */}
                   <div className={`order-2 ${isEven ? 'md:order-1 md:text-right' : 'md:order-2 md:text-left'} pl-12 md:pl-0`}>
                      <div className={`transition-all duration-700 ease-out ${isActive ? 'opacity-100 translate-y-0 filter-none' : 'opacity-30 translate-y-4 blur-[1px]'}`}>
                        <div className={`inline-block mb-4 px-2 py-1 bg-zinc-100 rounded text-xs font-mono text-zinc-500 uppercase tracking-widest ${isEven ? 'md:mr-auto' : ''}`}>
                          {chapter.period}
                        </div>
                        <h2 className="text-3xl md:text-6xl font-bold mb-2 tracking-tight">{chapter.company}</h2>
                        <h3 className="text-lg md:text-xl text-zinc-400 font-medium mb-8">{chapter.title}</h3>
                        
                        <p className="text-lg md:text-2xl font-light leading-relaxed text-zinc-800 mb-6">
                          {chapter.text}
                        </p>
                        <p className="text-sm md:text-base text-zinc-500 leading-relaxed font-mono border-l-2 border-zinc-200 pl-4 md:border-l-0 md:border-r-2 md:pr-4">
                           {chapter.subtext}
                        </p>
                      </div>
                   </div>

                   {/* Artifact/Visual Side */}
                   <div className={`order-1 ${isEven ? 'md:order-2' : 'md:order-1'} pl-12 md:pl-0 flex flex-col ${isEven ? 'items-start' : 'items-end'}`}>
                      <div className={`relative transition-all duration-1000 ease-out w-full max-w-md ${isUnblurred ? 'opacity-100 scale-100 translate-x-0 blur-0' : 'opacity-40 scale-95 translate-x-4 blur-sm'}`}>
                         
                         {/* Connecting Line to Spine */}
                         <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] bg-zinc-200 w-24 ${isEven ? '-left-24' : '-right-24'} ${isUnblurred ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}></div>

                         {/* The Card */}
                         <div 
                            className={`bg-white border border-zinc-100 shadow-xl p-6 md:p-8 w-full relative group overflow-hidden rounded-sm hover:shadow-2xl transition-all duration-500 ${chapter.link ? 'cursor-pointer' : ''}`}
                            onClick={() => chapter.link && window.open(chapter.link, '_blank')}
                            onMouseMove={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const y = e.clientY - rect.top;
                                e.currentTarget.style.setProperty('--x', `${x}px`);
                                e.currentTarget.style.setProperty('--y', `${y}px`);
                            }}
                         >
                            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${chapter.theme}`}></div>
                            
                            {/* Reactive Grid Background */}
                            <div 
                                className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                                style={{
                                    maskImage: 'radial-gradient(300px circle at var(--x) var(--y), black, transparent)',
                                    WebkitMaskImage: 'radial-gradient(300px circle at var(--x) var(--y), black, transparent)',
                                }}
                            ></div>

                            <div className="mb-6 md:mb-8 flex justify-between items-start relative z-10">
                               <div className="flex items-center justify-center h-12 min-w-[3rem]">
                                  <img src={chapter.companyLogo} alt={chapter.company} loading="lazy" className="h-full w-auto max-w-[140px] object-contain" onError={(e) => {
                                    e.target.style.display = 'none'; 
                                    e.target.parentNode.innerHTML = `<span class="text-[8px] text-zinc-500 font-mono">${chapter.company}</span>`
                                  }}/>
                               </div>
                               <div className="font-mono text-xs text-zinc-300">ID: {chapter.id}</div>
                            </div>

                            <div className="mb-6">
                              <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-3">Ecosystem</div>
                              <div className="flex flex-wrap gap-6 items-center">
                                 {chapter.logos.map((logo, lIdx) => (
                                   <div key={lIdx} className="h-12 md:h-16 min-w-[3rem] flex items-center justify-center" title={logo.name}>
                                      <img src={logo.src} alt={logo.name} loading="lazy" className="h-full w-auto max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-opacity" onError={(e) => {e.target.style.display='none'}} />
                                   </div>
                                 ))}
                              </div>
                           </div>

                            <div className="space-y-3 border-t border-zinc-50 pt-6">
                               <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2">Artifacts</div>
                               {chapter.artifacts.length > 0 ? (
                                  chapter.artifacts.map((art, i) => {
                                    const Icon = art.icon;
                                    return (
                                      <a key={i} href={art.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-4 p-3 rounded-lg transition-colors group/item cursor-pointer border border-transparent hover:border-zinc-200 relative z-20">
                                         <div className="h-8 w-8 md:h-10 md:w-10 bg-white border border-zinc-100 rounded-full flex items-center justify-center shadow-sm group-hover/item:scale-90 transition-transform">
                                            <Icon size={16} className="text-zinc-400 group-hover/item:text-zinc-900"/>
                                         </div>
                                         <div className="flex-1">
                                            <div className="text-sm font-bold text-zinc-900">{art.label}</div>
                                            <div className="text-[10px] uppercase tracking-wider text-zinc-400">{art.type}</div>
                                         </div>
                                         <ArrowUpRight size={14} className="opacity-0 group-hover/item:opacity-100 text-zinc-400 transition-opacity"/>
                                      </a>
                                    )
                                  })
                               ) : (
                                 <div className="p-4 bg-zinc-50 border border-zinc-100 text-center rounded">
                                    <span className="font-mono text-xs text-zinc-400">Classified / Internal Only</span>
                                 </div>
                               )}
                            </div>
                         </div>
                         <div className={`absolute -z-10 top-4 ${isEven ? '-right-4' : '-left-4'} w-full h-full border border-zinc-200 rounded-sm opacity-50 hidden md:block`}></div>
                      </div>
                   </div>
                </div>
             </div>
           )
        })}
      </div>

      {/* 8. The Vault (Lab) */}
      <section className="py-24 md:py-32 bg-zinc-50 relative z-10 border-t border-zinc-200">
         <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">Projects</h2>
                  <p className="text-zinc-500 font-light">Archived experiments and research papers.</p>
               </div>
               <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">3 Items</span>
            </div>
            
            <div className="flex flex-col h-[600px] gap-2">
               {vaultItems.map((item, i) => {
                  const isActive = activeVaultItem === i;
                  
                  return (
                    <div 
                        key={i} 
                        onClick={() => setActiveVaultItem(i)}
                        className={`relative overflow-hidden border border-zinc-200 bg-white transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group w-full ${isActive ? 'flex-[3] opacity-100' : 'flex-[0.5] hover:flex-[0.6] opacity-60 hover:opacity-100'}`}
                    >
                       {/* Active Content */}
                       <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-between transition-opacity duration-500 ${isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
                           <div>
                               <div className="flex justify-between items-start mb-8">
                                   <span className="font-mono text-4xl md:text-5xl font-light text-zinc-200">0{i + 1}</span>
                               </div>
                               <h3 className="text-2xl md:text-4xl font-bold mb-6 leading-tight max-w-xl">{item.title}</h3>
                               <div className="w-12 h-1 bg-zinc-900 mb-8"></div>
                               <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-lg">
                                   {item.desc}
                               </p>
                           </div>
                           
                           <div className="flex items-center gap-4 mt-4">
                               <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">{item.tag}</span>
                               <div className="h-[1px] flex-1 bg-zinc-100"></div>
                               {item.confidential ? (
                                  <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                                      Confidential
                                  </div>
                               ) : (
                                  <a href={item.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 text-zinc-900 font-medium text-sm group/link z-20">
                                      View Work <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"/>
                                  </a>
                               )}
                           </div>

                           {/* Decorative Background Graphics for Active State */}
                           <div className="absolute right-0 bottom-0 w-1/2 h-full overflow-hidden pointer-events-none opacity-[0.1]">
                               <div className="absolute inset-0 bg-gradient-to-l from-zinc-900 to-transparent z-10"></div>
                               {/* Unique Animations per Card */}
                               {i === 0 && (
                                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-zinc-900/20">
                                     <path d="M0 50 Q 25 40 50 50 T 100 50 V 100 H 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-[wave_8s_linear_infinite]" />
                                     <path d="M0 60 Q 25 50 50 60 T 100 60 V 100 H 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-[wave_10s_linear_infinite]" />
                                     <path d="M0 70 Q 25 60 50 70 T 100 70 V 100 H 0 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="animate-[wave_12s_linear_infinite]" />
                                 </svg>
                               )}
                               {i === 1 && (
                                 <div className="absolute inset-0 flex items-center justify-center">
                                     <div className="w-[200%] h-[200%] border-[1px] border-zinc-900/20 rounded-[40%] animate-[spin_15s_linear_infinite] absolute"></div>
                                     <div className="w-[180%] h-[180%] border-[1px] border-zinc-900/20 rounded-[45%] animate-[spin_20s_linear_infinite_reverse] absolute"></div>
                                     <div className="w-[160%] h-[160%] border-[1px] border-zinc-900/20 rounded-[35%] animate-[spin_25s_linear_infinite] absolute"></div>
                                 </div>
                               )}
                               {i === 2 && (
                                  <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute -right-10 -bottom-10 grid grid-cols-6 gap-2 animate-pulse">
                                      {[...Array(20)].map((_, idx) => (
                                        <div key={idx} className="w-8 h-8 border border-zinc-900/20 rounded-sm" style={{ animationDelay: `${idx * 100}ms` }}></div>
                                      ))}
                                    </div>
                                  </div>
                               )}
                           </div>
                       </div>

                       {/* Inactive Horizontal Label (Vertical Accordion style) */}
                       <div className={`absolute inset-0 flex items-center px-8 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                           <div className="flex items-center justify-between w-full">
                               <div className="flex items-center gap-4">
                                   <span className="font-mono text-sm text-zinc-400 tracking-widest">0{i + 1}</span>
                                   <span className="font-bold text-xl text-zinc-900 uppercase tracking-tight">{item.title}</span>
                               </div>
                               <div className="flex items-center gap-6">
                                  {/* Sketch Illustration */}
                                  <img 
                                    src={item.illustration} 
                                    alt="Sketch" 
                                    className="w-16 h-16 md:w-24 md:h-24 object-contain opacity-60 mix-blend-multiply grayscale hidden md:block" 
                                  />
                                  <ArrowDown size={16} className="text-zinc-300" />
                               </div>
                           </div>
                       </div>
                       
                       {/* Hover Overlay for Inactive */}
                       <div className={`absolute inset-0 bg-zinc-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${isActive ? 'hidden' : 'block'}`}></div>
                    </div>
                  )
               })}
            </div>
         </div>
      </section>

      {/* 9. Footer */}
      <footer className="py-24 bg-white relative z-10">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-zinc-100 mb-12 select-none">CONNECT</h2>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 -mt-16 md:-mt-20">
               <a href="mailto:krishvazirani1018@gmail.com" className="bg-white border border-zinc-200 px-8 py-4 rounded-full flex items-center gap-3 hover:bg-zinc-900 hover:text-white transition-all hover:scale-105 shadow-lg group w-full md:w-auto justify-center">
                  <Mail size={20} className="text-zinc-400 group-hover:text-white"/>
                  <span className="font-medium">Email Me</span>
               </a>
               <a href="https://linkedin.com/in/krish-vazirani-814511236" target="_blank" rel="noreferrer" className="bg-white border border-zinc-200 px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[#0077b5] hover:text-white transition-all hover:scale-105 shadow-lg group w-full md:w-auto justify-center">
                  <Linkedin size={20} className="text-zinc-400 group-hover:text-white"/>
                  <span className="font-medium">LinkedIn</span>
               </a>
            </div>

            <div className="mt-24 font-mono text-[10px] md:text-xs text-zinc-300 uppercase tracking-widest">
               End of File • © 2025 Krish Vazirani
            </div>
         </div>
      </footer>

    </div>
  );
};

export default App;
