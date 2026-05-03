import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollToAnchor from './components/ScrollToAnchor';
import HomePage from './components/HomePage';
import OurWorkPage from './components/OurWorkPage';
import ProductPage from './components/ProductPage';
import Footer from './components/Footer';

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const pages = {
      '/': {
        title: 'JKR Industries | Fabrication & Laser Cutting in Nagapattinam',
        meta: 'JKR Industries offers laser cutting, sheet metal fabrication, powder coating, and industrial solutions in Nagapattinam. Quality, precision, and durability.'
      },
      '/products': {
        title: 'Our Products & Services | JKR Industries Nagapattinam',
        meta: 'Explore JKR Industries services including laser cutting, fabrication, powder coating, and industrial supply in Nagapattinam.'
      },
      '/our-work': {
        title: 'Our Work | Fabrication Projects by JKR Industries',
        meta: 'View completed industrial fabrication, laser cutting, and sheet metal projects by JKR Industries in Nagapattinam.'
      }
    };

    const sections = {
      '#about-section': {
        title: 'About JKR Industries | Industrial Experts in Nagapattinam',
        meta: 'Learn about JKR Industries, a trusted fabrication and industrial solutions provider in Nagapattinam with years of excellence.'
      },
      '#contact': {
        title: 'Contact JKR Industries | Nagapattinam',
        meta: 'Contact JKR Industries for fabrication, laser cutting, and industrial services in Nagapattinam. Call or WhatsApp us today.'
      }
    };

    let data = pages[location.pathname] || pages['/'];
    
    // Check for section-specific titles on Home page
    if (location.pathname === '/' && sections[location.hash]) {
      data = sections[location.hash];
    }

    // Update Title
    document.title = data.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', data.meta);

  }, [location]);

  return null;
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    // Preload critical global assets (logos, common icons, hero first view)
    const criticalAssets = [
      `${base}logo.jpeg`,
      `${base}images/trader.png`,
      `${base}images/laser_cutting.png`,
      `${base}images/sheet_metal.png`,
      `${base}images/doors_windows.png`,
    ];
    
    let loadedCount = 0;
    criticalAssets.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === criticalAssets.length) setImagesReady(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === criticalAssets.length) setImagesReady(true);
      };
    });

    // Fallback if images fail or take too long
    const timer = setTimeout(() => setImagesReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Final reveal only when animation is done AND images are ready
  useEffect(() => {
    if (loaderDone && imagesReady) {
      setLoaded(true);
    }
  }, [loaderDone, imagesReady]);

  const handleLoaderComplete = useCallback(() => {
    setLoaderDone(true);
  }, []);

  return (
    <BrowserRouter>
      <TitleUpdater />
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <ScrollToAnchor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/products" element={<ProductPage />} />
          {/* Fallback to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
