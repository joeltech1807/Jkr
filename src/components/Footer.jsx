import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === '/' || location.pathname === '') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link to="/#hero" className="footer-logo" onClick={handleLogoClick}>JKR INDUSTRIES</Link>
          <p className="footer-brand-desc">
            Engineering excellence and fabrication solutions — delivering precision,
            durability, and innovation across multiple industrial services.
          </p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/#about-section">About Us</Link>
            <Link to="/#services">Our Services</Link>
            <Link to="/products">All Products</Link>
            <Link to="/our-work">Our Work</Link>
            <Link to="/#contact">Contact Us</Link>
          </div>
          <div className="footer-column">
            <h4>Our Services</h4>
            <Link to="/products#jkr-industries">JKR Industries</Link>
            <Link to="/products#upvc-doors-windows">UPVC Doors & Windows</Link>
            <Link to="/products#gi-doors-windows">GI Doors & Windows</Link>
            <Link to="/products#aluminium-doors-windows">System Aluminium</Link>
            <Link to="/products#jkr-laser-cutting">Laser Cutting & Facades</Link>
            <Link to="/products#jkr-sheet-metal">Sheet Metal & Coating</Link>
            <Link to="/products#jkr-trader">JKR Trader</Link>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <a href="tel:9842466030">📞 98424 66030</a>
            <a href="https://wa.me/918838615904">💬 88386 15904</a>
            <a href="mailto:Jkrindustries.in@gmail.com">✉️ Jkrindustries.in@gmail.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copyright">
          Copyright &copy; {new Date().getFullYear()} JKR Industries. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
