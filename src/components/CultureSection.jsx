import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CultureSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Advanced Zoom-In Scrub Effect for the Grey Box
    const cultureBox = el.querySelector('.culture-box');
    if (cultureBox) {
      gsap.fromTo(cultureBox,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el, // trigger on section start
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.5,
          }
        }
      );
    }

    // Scrub reveal animation for the yellow highlight box
    gsap.fromTo(el.querySelector('.highlight-bg'),
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 60%',
          end: 'top 30%', // Amount of scrolling required to complete the wipe
          scrub: 1,
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="culture-section" ref={sectionRef} data-theme="light">
      <div className="culture-box">
        <p className="culture-text">
          <span>Built on decades of industrial expertise,</span>{' '}
          <span className="highlight-box">
            <span className="highlight-bg"></span>
            <span className="highlight-text">JKR Industries</span>
          </span>{' '}
          combines traditional craftsmanship with <span>modern fabrication technology</span> to deliver
          solutions that stand the test of time — <span>quality you can trust, precision you can see.</span>
        </p>
      </div>
    </section>
  );
}
