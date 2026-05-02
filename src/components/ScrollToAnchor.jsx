import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's no hash, scroll to top of the page
    if (hash === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If there is a hash, scroll to the specific element
      // Small timeout to ensure components are rendered (especially those waiting for images)
      const scrollWithTimeout = (retryCount = 0) => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (retryCount < 10) {
          // Retry a few times for slow-loading pages
          setTimeout(() => scrollWithTimeout(retryCount + 1), 100);
        }
      };

      scrollWithTimeout();
    }
  }, [pathname, hash]);

  return null;
}
