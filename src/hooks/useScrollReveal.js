import { useEffect, useState, useRef } from 'react';

/**
 * Hook to reveal elements when they scroll into view.
 * @param {Object} options Configuration options
 * @param {boolean} options.once Whether to trigger the animation only once
 * @param {number} options.threshold The intersection threshold (0 to 1)
 * @param {string} options.rootMargin The intersection root margin
 * @returns {[React.RefObject, boolean]} Ref to attach to the element and visible state
 */
export default function useScrollReveal({ 
  once = true, 
  threshold = 0.05, 
  rootMargin = '0px 0px -50px 0px' 
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (once) {
          observer.unobserve(element);
        }
      } else if (!once) {
        setIsVisible(false);
      }
    }, { threshold, rootMargin });

    observer.observe(element);
    return () => {
      if (element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [once, threshold, rootMargin]);

  return [ref, isVisible];
}
