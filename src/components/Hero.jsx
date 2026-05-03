import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const HERO_DATA = [
  { 
    word: 'TRUST', 
    subtext: 'Built over decades, proven in every project',
    color: 'rgba(243, 174, 13, 0.03)' // Warm
  },
  { 
    word: 'STRENGTH', 
    subtext: 'Engineered for durability and scale',
    color: 'rgba(0, 0, 0, 0.05)' // Stronger contrast
  },
  { 
    word: 'PRECISION', 
    subtext: 'Accuracy in every cut, every detail',
    color: 'rgba(56, 189, 248, 0.03)' // Cooler tone
  }
];

const CARDS = [
  { img: '/jkr/assets/images/lasercut.jpeg', label: 'Laser Cutting' },
  { img: '/jkr/assets/images/sheetm.png', label: 'Sheet Metal' },
  { img: '/jkr/assets/images/giser.jpeg', label: 'Doors & Windows' },
  { img: '/jkr/assets/images/traderser.jpeg', label: 'JKR Trader' },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const progressRef = useRef(null);
  const bgEffectRef = useRef(null);

  // Duplicate cards for seamless looping
  const duplicatedCards = [...CARDS, ...CARDS, ...CARDS];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.hero-word-group');
      const progress = progressRef.current;
      const totalWords = HERO_DATA.length;
      const stayDuration = 2; // Time word stays fully visible
      const animDuration = 0.8; // Entry/Exit duration

      // Initial state: everything hidden
      gsap.set(words, { opacity: 0, y: 30, filter: 'blur(10px)' });

      const mainTimeline = gsap.timeline({ repeat: -1 });

      HERO_DATA.forEach((_, i) => {
        const currentGroup = words[i];
        
        // 1. Entry & Background Sync
        mainTimeline.add(() => setActiveIndex(i));
        
        mainTimeline.fromTo(currentGroup, 
          { opacity: 0, y: 30, filter: 'blur(10px)', letterSpacing: '12px' },
          { opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '4px', duration: animDuration, ease: 'power3.out' }
        );

        // 2. Progress Bar (starts with entry, ends with exit start)
        mainTimeline.fromTo(progress, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: stayDuration, ease: 'none' },
          "<"
        );

        // 3. Exit (starts near end of stay)
        mainTimeline.to(currentGroup, {
          opacity: 0,
          y: -20,
          filter: 'blur(10px)',
          duration: animDuration,
          ease: 'power2.inOut'
        }, `-=${animDuration * 0.5}`); // Slight overlap with next word's entry will happen because of repeat loop
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="hero" data-theme="light">
      {/* Dynamic Background Light */}
      <div 
        className="hero-bg-light" 
        style={{ 
          background: HERO_DATA[activeIndex].color,
          transition: 'background 1.2s ease-in-out'
        }}
      />

      <div className="hero-content" ref={contentRef}>
        <p className="hero-subtitle">25 YEARS OF EXCELLENCE</p>
        
        <div className="hero-title-wrapper">
          {HERO_DATA.map((item, i) => (
            <div 
              key={i} 
              className="hero-word-group"
              style={{ position: 'absolute', width: '100%', left: 0 }}
            >
              <h1 className="hero-title">{item.word}</h1>
              <p className="hero-micro-subtext">{item.subtext}</p>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="hero-progress-container">
          <div className="hero-progress-bar" ref={progressRef} />
        </div>

        <p className="hero-tagline">Engineering Excellence. Built to Last.</p>
      </div>

      <div className="hero-cards-wrapper">
        <div className="hero-cards-track" style={{ '--item-count': CARDS.length }}>
          {duplicatedCards.map((card, i) => (
            <div className="hero-card" key={i}>
              <img src={card.img} alt={card.label} loading="eager" />
              <div className="hero-card-overlay">
                <span>{card.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
