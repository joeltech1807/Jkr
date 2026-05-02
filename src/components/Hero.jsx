import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const WORDS = ['PRECISION', 'DURABILITY', 'INNOVATION', 'EXCELLENCE'];

const CARDS = [
  { img: '/images/trader.png', label: 'JKR Trader' },
  { img: '/images/laser_cutting.png', label: 'Laser Cutting' },
  { img: '/images/sheet_metal.png', label: 'Sheet Metal' },
  { img: '/images/doors_windows.png', label: 'Doors & Windows' },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const titleRefs = useRef([]);
  const heroRef = useRef(null);

  // Duplicate cards for seamless looping
  const duplicatedCards = [...CARDS, ...CARDS, ...CARDS];

  return (
    <section className="hero" ref={heroRef} id="hero" data-theme="light">
      <div className="hero-content">
        <p className="hero-subtitle">Engineering Excellence & Fabrication Solutions</p>
        <div className="hero-title-wrapper">
          {WORDS.map((word, i) => (
            <h1
              key={word}
              ref={(el) => (titleRefs.current[i] = el)}
              className={`hero-title ${i === activeIndex ? 'active' : ''}`}
            >
              {word}
            </h1>
          ))}
        </div>
        <p className="hero-tagline">Delivering precision, durability, and innovation across industrial services</p>

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
