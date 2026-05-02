import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { id: 1, stars: 5, text: "Precision laser cutting at its best. Perfect for our architectural project.", name: "R. Karthik" },
  { id: 2, stars: 5, text: "Outstanding quality and service. Our industrial doors were perfectly installed.", name: "S. Praveen Kumar" },
  { id: 3, stars: 5, text: "Go-to partner for fabrication. Impressive attention to detail and deadlines.", name: "K. Harini" },
  { id: 4, stars: 5, text: "Premium finish and robust build. Exceptional craftsmanship on our facades.", name: "V. Aravind" },
  { id: 5, stars: 5, text: "The best powder coating service in the region. Highly recommended.", name: "M. Suresh" },
  { id: 6, stars: 5, text: "Innovative designs and reliable execution for our retail racks.", name: "A. Divya" }
];

const ReviewStrip = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const bgRef = useRef(null);
  const fgRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const cards = gsap.utils.toArray('.review-card');

    // 1. Horizontal Loop (Cinematic Gliding Motion)
    const loop = horizontalLoop(cards, {
      repeat: -1,
      speed: 0.85,
      reversed: true,
      paddingRight: 70,
    });

    // 2. Parallax Depth System (Scroll-Driven)
    gsap.to(bgRef.current, {
      x: -120,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(fgRef.current, {
      x: 150,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // 3. Dynamic Focus Engine (Ticker-Based)
    const updateFocus = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        const distance = Math.abs(centerX - cardCenter);
        const maxDistance = containerRect.width / 1.6;

        const focus = Math.max(0, 1 - (distance / maxDistance));
        const smoothedFocus = Math.pow(focus, 2.8);

        gsap.set(card, {
          scale: 0.88 + (smoothedFocus * 0.17),
          opacity: 0.25 + (smoothedFocus * 0.75), // Darker cards on sides
          zIndex: Math.round(smoothedFocus * 20),
          boxShadow: `0 ${15 + (smoothedFocus * 35)}px ${40 + (smoothedFocus * 60)}px rgba(0, 0, 0, ${0.1 + (smoothedFocus * 0.3)})`,
        });

        if (smoothedFocus > 0.6) {
          card.classList.add('is-focused');
        } else {
          card.classList.remove('is-focused');
        }
      });
    };

    gsap.ticker.add(updateFocus);

    const onEnter = () => loop.pause();
    const onLeave = () => loop.play();
    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      gsap.ticker.remove(updateFocus);
      loop.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
      length = items.length,
      startX = items[0].offsetLeft,
      times = [],
      widths = [],
      xPercents = [],
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1),
      totalWidth, curX, distanceToStart, distanceToLoop, item, i;

    gsap.set(items, {
      xPercent: (i, target) => {
        let w = widths[i] = parseFloat(gsap.getProperty(target, "width", "px"));
        xPercents[i] = snap(parseFloat(gsap.getProperty(target, "x", "px")) / w * 100 + gsap.getProperty(target, "xPercent"));
        return xPercents[i];
      }
    });

    gsap.set(items, { x: 0 });
    totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);

    for (i = 0; i < length; i++) {
      item = items[i];
      curX = xPercents[i] / 100 * widths[i];
      distanceToStart = item.offsetLeft - startX;
      distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
      tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
        .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond);
    }

    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  return (
    <div className="review-strip-container" ref={containerRef} data-theme="dark">
      {/* Section Header */}
      <div className="review-header">
        <div className="section-label">What Our Clients Say</div>
        <h2 className="section-title">TESTIMONIALS</h2>
      </div>

      {/* Layer 1: Dark Industrial Background Parallax */}
      <div className="review-bg-layer" ref={bgRef}>
        <div className="review-texture-overlay"></div>
      </div>

      {/* Layer 3: Foreground Parallax (Light Accents) */}
      <div className="review-fg-layer" ref={fgRef}>
        <div className="fg-glow" style={{ top: '15%', left: '20%' }}></div>
        <div className="fg-glow" style={{ top: '70%', left: '80%' }}></div>
      </div>

      <div className="review-strip-track" ref={trackRef}>
        {[...reviews, ...reviews].map((review, index) => (
          <div className="review-card" key={`${review.id}-${index}`}>
            <div className="stars">
              {[...Array(review.stars)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="review-text">"{review.text}"</p>
            <span className="customer-name">{review.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewStrip;
