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
          <Link to="/jkr/#hero" className="footer-logo" onClick={handleLogoClick}>JKR INDUSTRIES</Link>
          <p className="footer-brand-desc">
            Engineering excellence and fabrication solutions — delivering precision,
            durability, and innovation across multiple industrial services.
          </p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Quick Links</h4>
            <Link to="/jkr/">Home</Link>
            <Link to="/jkr/#about-section">About Us</Link>
            <Link to="/jkr/#services">Our Services</Link>
            <Link to="/jkr/products">All Products</Link>
            <Link to="/jkr/our-work">Our Work</Link>
            <Link to="/jkr/#contact">Contact Us</Link>
          </div>
          <div className="footer-column">
            <h4>Our Services</h4>
            <Link to="/jkr/products#jkr-industries">JKR Industries</Link>
            <Link to="/jkr/products#upvc-doors-windows">UPVC Doors & Windows</Link>
            <Link to="/jkr/products#gi-doors-windows">GI Doors & Windows</Link>
            <Link to="/jkr/products#aluminium-doors-windows">System Aluminium</Link>
            <Link to="/jkr/products#jkr-laser-cutting">Laser Cutting & Facades</Link>
            <Link to="/jkr/products#jkr-sheet-metal">Sheet Metal & Coating</Link>
            <Link to="/jkr/products#jkr-trader">JKR Trader</Link>
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
