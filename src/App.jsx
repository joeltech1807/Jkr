import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import ScrollToAnchor from './components/ScrollToAnchor';
import HomePage from './components/HomePage';
import OurWorkPage from './components/OurWorkPage';
import ProductPage from './components/ProductPage';
import Footer from './components/Footer';

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload critical global assets (logos, common icons, hero first view)
    const criticalAssets = [
      '/logo.jpeg',
      '/images/trader.png',
      '/images/laser_cutting.png',
      '/images/sheet_metal.png',
      '/images/doors_windows.png',
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
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      <ScrollToAnchor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
