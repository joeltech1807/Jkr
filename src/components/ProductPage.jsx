import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function CreatorBox() {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleTrigger = (e) => {
    e.stopPropagation();
    const now = Date.now();

    if (now - lastClickTimeRef.current < 100) return;

    if (now - lastClickTimeRef.current > 3000) {
      clickCountRef.current = 0;
    }

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

function VerticalReel({ images, onClick }) {
  // Use exactly 2x duplication as requested: [1 2 3 4 1 2 3 4]
  const duplicated = [...images, ...images];
  return (
    <div className="vertical-reel-container" onClick={onClick}>
      <div className="vertical-reel-track">
        {duplicated.map((src, i) => (
          <div key={i} className="vertical-reel-item">
            <img src={src} alt={`Laser Cutting Showcase ${i % images.length + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryPopup({ isOpen, images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, initialIndex]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Swipe Support
  const handleTouchStart = (e) => (touchStartRef.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`gallery-popup-overlay ${isOpen ? 'gallery-popup-overlay--open' : ''}`} onClick={onClose}>
      <div 
        className="gallery-popup-content" 
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button className="gallery-close-btn" onClick={onClose}>&times;</button>
        
        <img 
          src={images[currentIndex]} 
          alt={`Gallery Item ${currentIndex + 1}`} 
          className="gallery-main-image"
          key={currentIndex}
        />

        <button className="gallery-nav-btn gallery-nav-btn--prev" onClick={prevImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="gallery-nav-btn gallery-nav-btn--next" onClick={nextImage}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <div className="gallery-info">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

gsap.registerPlugin(ScrollTrigger);

const DIVISIONS = [
  {
    id: 'jkr-industries',
    num: '01',
    title: 'JKR Industries',
    tagline: 'The Industrial Backbone',
    desc: 'The parent company managing multiple specialized divisions, delivering end-to-end industrial services with precision, quality, and innovation across every project we undertake.',
    offerings: [
      'PEB structure',
      'Ornamental canopy structure',
      'UPVC roof sheds',
      'Spiral staircase',
      'Unique metal sculptures',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10l3.13-2.74a2 2 0 0 1 2.65 0L12 10l4.22-2.74a2 2 0 0 1 2.65 0L22 10z"/><path d="m2 10 10-8 10 8"/></svg>,
    img: '/assets/images/industries/ind_1.jpg',
    reelImages: [
      '/assets/images/industries/ind_1.jpg',
      '/assets/images/industries/ind_2.jpg',
      '/assets/images/industries/ind_3.jpg',
      '/assets/images/industries/ind_4.jpg',
    ],
    gradient: 'linear-gradient(135deg, #1a1608 0%, #2a2210 100%)',
  },
  {
    id: 'upvc-doors-windows',
    num: '02',
    title: 'UPVC Doors & Windows',
    tagline: 'Energy-Efficient Solutions',
    desc: 'High-performance UPVC doors and windows engineered for superior thermal insulation, soundproofing, and weather resistance in modern environments.',
    offerings: [
      'Open & sliding windows',
      'French windows & doors',
      'Casement windows',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 3v18M3 12h18"/></svg>,
    img: '/assets/images/upvc/upvc_1.jpg',
    reelImages: [
      '/assets/images/upvc/upvc_1.jpg',
      '/assets/images/upvc/upvc_2.jpg',
      '/assets/images/upvc/upvc_3.jpg',
      '/assets/images/upvc/upvc_4.jpg',
      '/assets/images/upvc/upvc_5.jpg',
      '/assets/images/upvc/upvc_6.jpg',
    ],
    gradient: 'linear-gradient(135deg, #0a1a1a 0%, #102020 100%)',
  },
  {
    id: 'gi-doors-windows',
    num: '03',
    title: 'GI Doors & Windows',
    tagline: 'Industrial Strength Security',
    desc: 'Robust Galvanized Iron (GI) door and window systems designed for maximum security and durability in industrial and commercial environments.',
    offerings: [
      'Open windows',
      'Customisable doors',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    img: '/assets/images/gi/gi_1.jpg',
    reelImages: [
      '/assets/images/gi/gi_1.jpg',
      '/assets/images/gi/gi_2.jpg',
      '/assets/images/gi/gi_3.png',
      '/assets/images/gi/gi_4.webp',
    ],
    gradient: 'linear-gradient(135deg, #121212 0%, #1c1c1c 100%)',
  },
  {
    id: 'aluminium-doors-windows',
    num: '04',
    title: 'System Aluminium Doors & Windows',
    tagline: 'Premium Architectural Systems',
    desc: 'Elite architectural aluminium systems featuring ultra-slim sightlines and advanced thermal break technology for seamless modern aesthetics.',
    offerings: [
      'Open doors & windows',
      'Sliding doors & windows',
      'Casement windows',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    img: '/assets/images/aluminium/alu_1.jpg',
    reelImages: [
      '/assets/images/aluminium/alu_1.jpg',
      '/assets/images/aluminium/alu_2.jpg',
      '/assets/images/aluminium/alu_3.jpg',
      '/assets/images/aluminium/alu_4.jpg',
      '/assets/images/aluminium/alu_5.jpg',
      '/assets/images/aluminium/alu_6.jpg',
    ],
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
  {
    id: 'jkr-laser-cutting',
    num: '05',
    title: 'JKR Laser Cutting & Facade Designs',
    tagline: 'Precision Artistry',
    desc: 'Precision CNC laser cutting services for intricate patterns, facade designs, signage, and custom metal art — delivering unmatched accuracy on every cut.',
    offerings: [
      'Metal / GI laser cuts',
      'Facade designs',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v3M12 19v3M5 12H2M22 12h-3M16.95 7.05l2.12-2.12M4.93 19.07l2.12-2.12M16.95 16.95l2.12 2.12M4.93 4.93l2.12 2.12"/></svg>,
    img: '/assets/images/laser-cutting/laser_1.jpg',
    reelImages: [
      '/assets/images/laser-cutting/laser_1.jpg',
      '/assets/images/laser-cutting/laser_2.jpg',
      '/assets/images/laser-cutting/laser_3.jpg',
      '/assets/images/laser-cutting/laser_4.jpg',
    ],
    gradient: 'linear-gradient(135deg, #1a0a1a 0%, #201020 100%)',
  },
  {
    id: 'jkr-sheet-metal',
    num: '06',
    title: 'JKR Sheet Metal & Powder Coating',
    tagline: 'Form Meets Finish',
    desc: 'Complete sheet metal fabrication from bending and welding to finishing with durable, weather-resistant powder coating for products that last a lifetime.',
    offerings: [
      'EB power panels',
      'Metal furniture',
      'Commercial racks',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
    img: '/assets/images/sheet-metal/661ca50b7575d115452ff0ecf40804bc.jpg',
    reelImages: [
      '/assets/images/sheet-metal/661ca50b7575d115452ff0ecf40804bc.jpg',
      '/assets/images/sheet-metal/6b176463df8ee3aa2aaa7491ccc193aa.jpg',
      '/assets/images/sheet-metal/PDB-Power-Distribution-Board-Use~3.jpg',
      '/assets/images/sheet-metal/e-b-metering-panel-with-star-delta~2.jpg',
    ],
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #101028 100%)',
  },
  {
    id: 'jkr-trader',
    num: '07',
    title: 'JKR Trader',
    tagline: 'Industrial Supply Chain',
    desc: 'Supplying high-quality industrial materials including steel, pipes, rods, construction hardware, and raw materials for fabrication projects of all scales.',
    offerings: [
      'Shrimp auto feeder',
      'Aerator systems',
      'SS pipes & accessories',
    ],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    img: '/assets/images/trader/stainless-steel-pipe-316.webp',
    reelImages: [
      '/assets/images/trader/AFN-100-Auto-Feeder-with-HDPE-Floater-for-Nursery.jpg',
      '/assets/images/trader/He16fe82293b34d769e3cd5b51e16342eA~3.jpg',
      '/assets/images/trader/Paddle-Wheel-Aerator-Floating-Fish-Pond-Shrimp-Farming-Machine-Aerator-for-Aquaculture~2.jpg',
      '/assets/images/trader/stainless-steel-pipe-316.webp',
    ],
    gradient: 'linear-gradient(135deg, #181a1c 0%, #22262a 100%)',
  },
];

export default function ProductPage() {
  const pageRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [gallery, setGallery] = useState({ isOpen: false, images: [], index: 0 });

  const openGallery = (images, index = 0) => {
    setGallery({ isOpen: true, images, index });
  };

  const BG_IMAGES = [
    '/assets/demob1/1.jpeg',
    '/assets/demob1/2.jpeg',
    '/assets/demob1/3.jpeg',
    '/assets/demob1/4.jpeg',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Track all critical images: background + division images + reel images
    const criticalImages = [...BG_IMAGES];
    DIVISIONS.forEach(d => {
      if (d.img) criticalImages.push(d.img);
      if (d.reelImages) criticalImages.push(...d.reelImages);
    });

    let loadedCount = 0;
    let isMounted = true;
    const totalToLoad = criticalImages.length;

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

      const tlHero = gsap.timeline({ delay: 0.35 });
      const heroContent = pageRef.current?.querySelector('.product-hero-content');
      if (heroContent) {
        const breadcrumb = heroContent.querySelector('.ourwork-breadcrumb');
        const title = heroContent.querySelector('.product-hero-title');
        const subtitle = heroContent.querySelector('.product-hero-subtitle');
        const divider = heroContent.querySelector('.product-hero-divider');
        const scrollHint = pageRef.current?.querySelector('.product-hero-scroll');

        if (breadcrumb) tlHero.fromTo(breadcrumb, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' });
        if (title) tlHero.fromTo(title, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.35');
        if (subtitle) tlHero.fromTo(subtitle, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4');
        if (divider) tlHero.fromTo(divider, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3');
        if (scrollHint) tlHero.fromTo(scrollHint, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.15');
      }

      const cards = pageRef.current?.querySelectorAll('.product-division');
      cards?.forEach((card) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        const img = card.querySelector('.product-division-img-wrapper img');
        if (img) {
          gsap.fromTo(img,
            { y: -50, scale: 1.15 },
            {
              y: 50,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      });

      const tabs = pageRef.current?.querySelectorAll('.product-nav-item');
      if (tabs) {
        gsap.fromTo(tabs,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      DIVISIONS.forEach((div, i) => {
        ScrollTrigger.create({
          trigger: `#${div.id}`,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: (self) => {
            if (self.isActive && tabs?.[i]) {
              tabs.forEach(t => t.classList.remove('active'));
              tabs[i].classList.add('active');
            }
          }
        });
      });
    }, pageRef);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      ctx.revert();
    };
  }, [imagesLoaded, location.hash]);

  if (!imagesLoaded) {
    return (
      <div data-theme="dark" style={{ 
        height: '100vh', 
        width: '100%', 
        background: '#000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ color: '#fff', fontFamily: 'var(--font-heading)', letterSpacing: '4px', fontSize: '1.2rem' }}>
          LOADING CINEMATIC EXPERIENCE...
        </div>
      </div>
    );
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 120; // Correct offset for sticky navs
      const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="product-page" ref={pageRef}>
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

      <section className="product-hero" id="products-hero" data-theme="dark">
        <div className="product-hero-overlay product-hero-overlay--dark" />
        <div className="product-hero-overlay product-hero-overlay--gold" />
        <div className="product-hero-overlay product-hero-overlay--vignette" />
        <div className="product-hero-overlay product-hero-overlay--shimmer" />

        <div className="product-hero-content">
          <div className="ourwork-breadcrumb">
            <Link to="/">Home</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span>Products</span>
          </div>
          <h1 className="product-hero-title">Our Products</h1>
          <p className="product-hero-subtitle">
            Seven specialized divisions, one commitment to excellence — explore our comprehensive range of industrial products and services.
          </p>
          <div className="product-hero-divider" />
          
          <nav className="product-nav">
            <span className="product-nav-tag">Our Product Segments</span>
            <div className="product-nav-row product-nav-row--top">
              {DIVISIONS.slice(0, 4).map((div) => (
                <button
                  key={div.id}
                  className="product-nav-item"
                  onClick={() => scrollToSection(div.id)}
                >
                  <div className="product-nav-card-glow" />
                  <div className="product-nav-icon">{div.icon}</div>
                  <div className="product-nav-info">
                    <span className="product-nav-num">{div.num}</span>
                    <span className="product-nav-label">{div.title}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="product-nav-row product-nav-row--bottom">
              {DIVISIONS.slice(4, 7).map((div) => (
                <button
                  key={div.id}
                  className="product-nav-item"
                  onClick={() => scrollToSection(div.id)}
                >
                  <div className="product-nav-card-glow" />
                  <div className="product-nav-icon">{div.icon}</div>
                  <div className="product-nav-info">
                    <span className="product-nav-num">{div.num}</span>
                    <span className="product-nav-label">{div.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </nav>
        </div>

        <div className="product-hero-scroll">
          <span>Scroll</span>
          <div className="product-hero-scroll-line" />
        </div>
      </section>


      {DIVISIONS.map((div, idx) => (
        <section
          className={`product-division ${idx % 2 === 1 ? 'product-division--alt' : ''} ${div.reelImages ? 'product-division--reel' : ''}`}
          key={div.id}
          id={div.id}
        >
          <div className="product-division-inner">
            <div 
              className="product-division-media" 
              onClick={() => openGallery(div.reelImages || [div.img], 0)}
            >
              <div className={`product-division-img-wrapper ${div.reelImages ? 'product-division-img-wrapper--full' : ''}`} style={{ background: div.gradient }}>
                {div.reelImages ? (
                  <VerticalReel images={div.reelImages} onClick={() => openGallery(div.reelImages, 0)} />
                ) : (
                  <img src={div.img} alt={div.title} loading="lazy" />
                )}
                <div className="product-division-num-badge">{div.num}</div>
              </div>
            </div>
            <div className="product-division-content">
              <span className="product-division-tagline">{div.tagline}</span>
              <h2 className="product-division-title">{div.title}</h2>
              <div className="product-division-divider"></div>
              <p className="product-division-desc">{div.desc}</p>
              <div className="product-division-offerings">
                <h4 className="product-offerings-label">Key Offerings</h4>
                <ul className="product-offerings-list">
                  {div.offerings.map((item, j) => (
                    <li key={j}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/#contact" className="product-division-cta">
                Get a Quote
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="product-cta">
        <div className="product-cta-box">
          <h2 className="product-cta-title">Need a Custom Solution?</h2>
          <p className="product-cta-desc">
            Our divisions work together to deliver integrated industrial solutions tailored to your exact requirements.
          </p>
          <Link to="/#contact" className="product-cta-btn">
            Contact Us Today
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <GalleryPopup 
        isOpen={gallery.isOpen}
        images={gallery.images}
        initialIndex={gallery.index}
        onClose={() => setGallery({ ...gallery, isOpen: false })}
      />
    </div>
  );
}
