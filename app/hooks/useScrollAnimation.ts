'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * Uses Intersection Observer API to detect when elements come into view
 * @returns {Object} Object containing ref and visibility state
 * @example
 * const { ref, isVisible } = useScrollAnimation();
 * return <motion.div ref={ref} animate={{ opacity: isVisible ? 1 : 0 }}>Content</motion.div>;
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
