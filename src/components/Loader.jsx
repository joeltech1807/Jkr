import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete,
        });
      },
    });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );

    tl.to(barRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, '-=0.2');

    tl.to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    });
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="loader-overlay">
      <div ref={logoRef} className="loader-logo">JKR</div>
      <div className="loader-bar-container">
        <div ref={barRef} className="loader-bar" />
      </div>
    </div>
  );
}
