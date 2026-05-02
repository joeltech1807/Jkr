import { useState, useCallback } from 'react';
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
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
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
