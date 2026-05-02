import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: 'jkr-industries',
    title: 'JKR Industries',
    subtitle: 'Industrial & Commercial Shed Fabrication',
    type: 'carousel',
    images: [
      '/images/ourwork/shed/shed_1.jpg',
      '/images/ourwork/shed/shed_2.jpeg',
      '/images/ourwork/shed/shed_3.jpeg',
      '/images/ourwork/shed/shed_4.jpeg',
      '/images/ourwork/shed/shed_5.jpeg',
      '/images/ourwork/shed/shed_6.jpeg',
      '/images/ourwork/shed/shed_7.jpeg',
      '/images/ourwork/shed/shed_8.jpeg',
      '/images/ourwork/shed/shed_9.jpeg',
      '/images/ourwork/shed/shed_10.jpeg',
      '/images/ourwork/shed/shed_11.jpeg',
      '/images/ourwork/shed/shed_12.jpeg',
      '/images/ourwork/shed/shed_13.jpeg',
      '/images/ourwork/shed/shed_14.jpeg',
      '/images/ourwork/shed/shed_15.jpeg',
      '/images/ourwork/shed/shed_16.jpeg',
    ],
  },
  {
    id: 'laser-cutting',
    title: 'JKR Laser Cutting & Facade Designs',
    subtitle: 'Precision CNC Laser Cutting & Custom Metal Art',
    type: 'carousel',
    speed: 'fast',
    images: [
      '/images/ourwork/laser/laser_1.jpeg',
      '/images/ourwork/laser/laser_2.jpeg',
      '/images/ourwork/laser/laser_3.jpeg',
      '/images/ourwork/laser/laser_4.jpeg',
      '/images/ourwork/laser/laser_5.jpeg',
    ],
  },
  {
    id: 'sheet-metal-powder-coating',
    title: 'JKR Sheet Metal & Powder Coating',
    subtitle: 'Precision Fabrication & High-Quality Finishes',
    type: 'carousel',
    images: [
      '/assets/images/jkr-powder/powder_1.jpeg',
      '/assets/images/jkr-powder/powder_2.jpeg',
      '/assets/images/jkr-powder/powder_3.jpeg',
      '/assets/images/jkr-powder/powder_4.jpeg',
      '/assets/images/jkr-powder/powder_5.jpeg',
    ],
  },
];

function ImageGrid({ images }) {
  return (
    <div className="ourwork-grid">
      {images.map((src, i) => (
        <div className="ourwork-grid-item" key={i}>
          <img src={src} alt={`Work showcase ${i + 1}`} loading="lazy" />
        </div>
      ))}
    </div>
  );
}

function ImageCarousel({ images, direction = 'left', speed = 'normal' }) {
  const trackRef = useRef(null);
  const duplicated = [...images, ...images, ...images];
  const speedClass = speed === 'fast' ? 'ourwork-carousel-fast' : '';

  return (
    <div className="ourwork-carousel" onMouseEnter={() => {
      if (trackRef.current) trackRef.current.style.animationPlayState = 'paused';
    }} onMouseLeave={() => {
      if (trackRef.current) trackRef.current.style.animationPlayState = 'running';
    }}>
      <div
        ref={trackRef}
        className={`ourwork-carousel-track ${direction === 'right' ? 'ourwork-carousel-reverse' : ''} ${speedClass}`}
        style={{ '--item-count': images.length }}
      >
        {duplicated.map((src, i) => (
          <div className="ourwork-carousel-item" key={i}>
            <img src={src} alt={`Work showcase ${(i % images.length) + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CreatorBox() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleTrigger = (e) => {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastClickTimeRef.current < 50) return;
    if (now - lastClickTimeRef.current > 3000) clickCountRef.current = 0;
    clickCountRef.current += 1;
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (window.navigator.vibrate) window.navigator.vibrate(50);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setVisible(true);
        timerRef.current = setTimeout(() => setVisible(false), 3000);
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <div
        className="creator-stealth-trigger"
        onClick={handleTrigger}
        onTouchEnd={handleTrigger}
        aria-hidden="true"
      />
      <div className={`creator-toast ${visible ? 'creator-toast--visible' : ''}`}>
        <span className="creator-toast-text">Created by Joel Anto Edwin J</span>
      </div>
    </>
  );
}

export default function OurWorkPage() {
  const pageRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const BG_IMAGES = [
    '/assets/demob2/1.jpeg',
    '/assets/demob2/2.jpeg',
    '/assets/demob2/3.jpeg',
    '/assets/demob2/4.jpeg',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Track all critical images: background + category images
    const criticalImages = [...BG_IMAGES];
    SECTIONS.forEach(s => {
      if (s.images) criticalImages.push(...s.images);
    });

    let loadedCount = 0;
    let isMounted = true;
    const totalToLoad = criticalImages.length;

    // Safety timeout: stop loading after 5 seconds regardless
    const safetyTimeout = setTimeout(() => {
      if (isMounted && !imagesLoaded) {
        setImagesLoaded(true);
      }
    }, 5000);

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      const handleLoad = () => {
        if (!isMounted) return;
        loadedCount++;
        if (loadedCount >= totalToLoad) {
          clearTimeout(safetyTimeout);
          setImagesLoaded(true);
        }
      };
      img.onload = handleLoad;
      img.onerror = handleLoad;
    });

    if (!imagesLoaded) return () => { isMounted = false; clearTimeout(safetyTimeout); };

    // GSAP initialization
    const ctx = gsap.context(() => {
      const bgLayers = pageRef.current?.querySelectorAll('.cinematic-bg-layer');
      if (bgLayers && bgLayers.length > 0) {
        gsap.set(bgLayers, { opacity: 0, scale: 1 });
        gsap.set(bgLayers[0], { opacity: 1 });

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        });

        mainTl.to(bgLayers[0], { opacity: 0, duration: 1 }, 0.15)
          .to(bgLayers[1], { opacity: 1, duration: 1 }, 0.15);
        mainTl.to(bgLayers[1], { opacity: 0, duration: 1 }, 0.5)
          .to(bgLayers[2], { opacity: 1, duration: 1 }, 0.5);
        mainTl.to(bgLayers[2], { opacity: 0, duration: 1 }, 0.85)
          .to(bgLayers[3], { opacity: 1, duration: 1 }, 0.85);

        bgLayers.forEach((layer) => {
          gsap.to(layer, {
            scale: 1.05,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: pageRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            }
          });
        });
      }

      const sections = pageRef.current?.querySelectorAll('.ourwork-hero, .ourwork-category, .ourwork-cta');
      sections?.forEach((section) => {
        gsap.fromTo(section,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, pageRef);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      ctx.revert();
    };
  }, [imagesLoaded]);

  if (!imagesLoaded) {
    return (
      <div data-theme="dark" style={{ height: '100vh', width: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#fff', fontFamily: 'var(--font-heading)', letterSpacing: '4px', fontSize: '1.2rem' }}>
          LOADING CINEMATIC EXPERIENCE...
        </div>
      </div>
    );
  }

  return (
    <div className="ourwork-page" ref={pageRef}>
      <div className="cinematic-bg-engine">
        {BG_IMAGES.map((src, i) => (
          <img
            key={i}
            className="cinematic-bg-layer"
            src={src}
            alt={`Background ${i + 1}`}
            style={{ zIndex: -10 + i }}
          />
        ))}
        <div className="cinematic-overlay" />
        <div className="cinematic-tint" />
        <div className="cinematic-vignette" />
        <div className="cinematic-edge-fade" />
        <div className="cinematic-noise" />
        <div className="cinematic-grain" />
      </div>

      <section className="ourwork-hero" id="our-work-hero" data-theme="dark">
        <div className="product-hero-overlay product-hero-overlay--dark" />
        <div className="product-hero-overlay product-hero-overlay--gold" />
        <div className="product-hero-overlay product-hero-overlay--vignette" />
        <div className="product-hero-overlay product-hero-overlay--shimmer" />

        <div className="ourwork-hero-content">
          <div className="ourwork-breadcrumb">
            <Link to="/">Home</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span>Our Work</span>
          </div>
          <h1 className="ourwork-hero-title">Our Work</h1>
          <p className="ourwork-hero-subtitle">
            Explore our portfolio of precision engineering, fabrication, and design projects
          </p>
          <div className="ourwork-hero-divider"></div>
        </div>
      </section>

      {SECTIONS.map((section, idx) => (
        <section
          className="ourwork-category"
          key={section.id}
          id={section.id}
        >
          <div className="ourwork-category-header">
            <div className="ourwork-category-number">{String(idx + 1).padStart(2, '0')}</div>
            <h2 className="ourwork-category-title">{section.title}</h2>
            <p className="ourwork-category-subtitle">{section.subtitle}</p>
            <div className="ourwork-category-divider"></div>
          </div>
          {section.type === 'static' ? (
            <ImageGrid images={section.images} />
          ) : (
            <ImageCarousel
              images={section.images}
              direction="left"
            />
          )}
        </section>
      ))}

      <section className="ourwork-cta">
        <div className="ourwork-cta-box">
          <h2 className="ourwork-cta-title">Have a Project in Mind?</h2>
          <p className="ourwork-cta-desc">
            Let's bring your vision to life with precision engineering and quality craftsmanship.
          </p>
          <Link to="/#contact" className="ourwork-cta-btn">
            Get In Touch
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <CreatorBox />
    </div>
  );
}
