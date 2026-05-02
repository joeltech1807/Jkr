import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    title: 'JKR Industries',
    desc: 'The parent company managing multiple specialized divisions, delivering end-to-end industrial services with precision and quality.',
    img: '/images/jkr_industries.png',
    link: '/products#jkr-industries',
  },
  {
    num: '02',
    title: 'UPVC Doors & Windows',
    desc: 'High-performance UPVC solutions for superior insulation, weather resistance, and soundproofing in modern living spaces.',
    img: '/images/doors_windows.png',
    link: '/products#upvc-doors-windows',
  },
  {
    num: '03',
    title: 'GI Doors & Windows',
    desc: 'Robust Galvanized Iron doors and windows designed for industrial-grade security, fire resistance, and exceptional longevity.',
    img: '/images/doors_windows.png',
    link: '/products#gi-doors-windows',
  },
  {
    num: '04',
    title: 'System Aluminium Doors & Windows',
    desc: 'Premium architectural aluminium systems featuring slim profiles, thermal breaks, and seamless modern functionality.',
    img: '/images/doors_windows.png',
    link: '/products#aluminium-doors-windows',
  },
  {
    num: '05',
    title: 'JKR Laser Cutting & Facade Designs',
    desc: 'Precision CNC laser cutting services for intricate patterns, facade designs, signage, and custom metal art with unmatched accuracy.',
    img: '/images/laser_cutting.png',
    link: '/products#jkr-laser-cutting',
  },
  {
    num: '06',
    title: 'JKR Sheet Metal & Powder Coating',
    desc: 'Complete sheet metal fabrication from bending and welding to finishing with durable, weather-resistant powder coating for lasting quality.',
    img: '/images/sheet_metal.png',
    link: '/products#jkr-sheet-metal',
  },
  {
    num: '07',
    title: 'JKR Trader',
    desc: 'Supplying high-quality industrial materials including steel, pipes, rods, construction hardware, and raw materials for fabrication projects.',
    img: '/images/trader.png',
    link: '/products#jkr-trader',
  },
];

export default function ExpertiseSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const headerItems = sectionRef.current?.querySelectorAll('.section-header .fade-up');
    headerItems?.forEach((item, i) => {
      gsap.fromTo(item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });

    const cards = sectionRef.current?.querySelectorAll('.expertise-card');
    if (!cards) return;

    cards.forEach((card) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="expertise-wrapper" id="services" ref={sectionRef} data-theme="dark">
      <div className="services-bg" />
      <div className="services-content-layer">
        <div className="expertise-container">
          <header className="section-header">
            <div className="section-label fade-up">What We Do</div>
            <h2 className="section-title fade-up">Our Services</h2>
            <div className="section-divider fade-up"></div>
          </header>
          <div className="expertise-cards">
          {SERVICES.map((svc, i) => (
            <div className="expertise-card" key={i}>
              <div className="expertise-card-content">
                <div>
                  <div className="expertise-card-number">{svc.num}</div>
                  <h3 className="expertise-card-title">{svc.title}</h3>
                  <p className="expertise-card-desc">{svc.desc}</p>
                  {svc.subServices && (
                    <ul className="expertise-sub-list">
                      {svc.subServices.map((sub, j) => (
                        <li key={j}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <a href={svc.link} className="expertise-card-link">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
              <div className="expertise-card-image">
                <img src={svc.img} alt={svc.title} loading="lazy" />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
