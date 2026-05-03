import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Standard staggered reveals for fade-up items
    const children = el.querySelectorAll('.fade-up');
    children.forEach((child, i) => {
      gsap.fromTo(child,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: child,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );
    });

    // Dedicated spring reveal for the Brand Box highlight
    const brandBox = el.querySelector('.brand-highlight-box');
    if (brandBox) {
      gsap.fromTo(brandBox,
        { x: -100, opacity: 0, scale: 0.8 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: brandBox,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 1,
          }
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="intro-section" id="about-section" ref={sectionRef} data-theme="light">
      <p className="intro-text fade-up">
        <span className="brand-highlight-box">JKR INDUSTRIES</span> is the parent company managing multiple
        specialized divisions. We focus on quality, precision engineering, and
        customer satisfaction — delivering end-to-end industrial services from
        trading and laser cutting to sheet metal fabrication, powder coating,
        and modern door & window solutions, all under one roof.
      </p>
      <div className="intro-actions fade-up">
        <Link to="/#services" className="intro-cta">
          Explore Our Services
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link to="/our-work" className="intro-cta">
          Explore Our Work
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link to="/products" className="intro-cta">
          Explore Our Products
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
