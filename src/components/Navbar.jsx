import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState('light'); // Safe default for home page
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    let observer;
    let mutationObserver;

    const checkTheme = () => {
      const sections = document.querySelectorAll('[data-theme]');
      if (sections.length === 0) return;

      // Find the section that is currently at the top of the viewport
      const topSection = Array.from(sections).find(section => {
        const rect = section.getBoundingClientRect();
        // Allow a small buffer for the navbar height (approx 80-100px)
        return rect.top <= 100 && rect.bottom >= 50;
      });

      if (topSection) {
        const newTheme = topSection.getAttribute('data-theme') || 'light';
        setTheme(newTheme);
      }
    };

    const setupObserver = () => {
      if (observer) observer.disconnect();
      
      const sections = document.querySelectorAll('[data-theme]');
      if (sections.length === 0) return;

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newTheme = entry.target.getAttribute('data-theme') || 'light';
            setTheme(newTheme);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -90% 0px',
        threshold: 0
      });

      sections.forEach(section => observer.observe(section));
    };

    // 1. Initial check
    checkTheme();
    setupObserver();

    // 2. Watch for DOM changes (important for pages with loading states)
    mutationObserver = new MutationObserver(() => {
      checkTheme();
      setupObserver();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // 3. Fallback polling for the first few seconds of page load
    const interval = setInterval(checkTheme, 500);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

    const handleLogoClick = (e) => {
      if (location.pathname === '/' || location.pathname === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    return (
      <nav className={`navbar ${theme}`} id="navbar">
        <Link to="/#hero" className="nav-logo" onClick={handleLogoClick}>
          <img src="/assets/images/logo.jpeg" alt="JKR INDUSTRIES" className="nav-logo-img" />
        </Link>
      <div className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
        <Link to="/#hero" className={(location.pathname === '/' || location.pathname === '') && !location.hash ? 'active' : ''} onClick={handleLogoClick}>Home</Link>
        <Link to="/#about-section" className={location.hash === '#about-section' ? 'active' : ''}>About Us</Link>
        <Link to="/#services" className={location.hash === '#services' ? 'active' : ''}>Our Services</Link>
        <Link to="/products#products-hero" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
        <Link to="/our-work#our-work-hero" className={location.pathname === '/our-work' ? 'active' : ''}>Our Work</Link>
        <Link to="/#contact" className="nav-cta">Contact Us</Link>
      </div>
      <div
        className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span />
        <span />
        <span />
      </div>
    </nav>
  );
}
