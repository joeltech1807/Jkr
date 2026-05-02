import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    // High Performance Smooth Full-Screen Zoom-Out Effect
    gsap.fromTo(card,
      { 
        scale: 2.5, 
        opacity: 0,
        y: 150
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end: 'center center',
          scrub: 1.5,
        },
      }
    );

    // Fade up contents as the box shrinks
    gsap.fromTo(card.querySelector('.vision-title'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(card.querySelector('.vision-desc'),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 35%',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(card.querySelector('.vision-link'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="vision-section" ref={sectionRef} data-theme="light">
      <div className="vision-card" ref={cardRef}>
        <h2 className="vision-title">
          Engineering Excellence & Fabrication Solutions Under One Roof
        </h2>
        <p className="vision-desc">
          From raw material trading to precision laser cutting, sheet metal fabrication,
          and modern door & window installations — JKR Industries delivers complete
          industrial solutions with unmatched quality.
        </p>
        <a href="/#about-section" className="vision-link">
          About JKR Industries
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
