import { useEffect } from 'react';

/**
 * Hook that applies a simple vertical parallax effect to elements
 * with the class `parallax-layer` and a `data-parallax-speed`
 * attribute. Speed is a decimal where 0 = static and 1 = fully
 * scroll‑bound. The hook sets up a scroll listener attached to the
 * window and updates the `transform: translateY` style using
 * `requestAnimationFrame` for smooth 60 fps performance.
 */
export default function useParallax() {
  useEffect(() => {
    let ticking = false;
    const elements = document.querySelectorAll('.parallax-layer[data-parallax-speed]');
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          elements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0;
            const offset = scrollY * speed;
            el.style.transform = `translate3d(0, ${offset}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set positions
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
