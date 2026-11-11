import { useEffect } from 'react';

/**
 * useScrollReveal: Lightweight IntersectionObserver hook for scroll animations (AOS-style)
 * Automatically triggers smooth fade-up, zoom-in, fade-left, fade-right when elements enter viewport.
 */
export const useScrollReveal = (selector = '[data-aos], .reveal-on-scroll', triggerKey = false) => {
  useEffect(() => {
    // Small delay to allow DOM nodes to settle if freshly revealed
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('aos-animate');
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => clearTimeout(timer);
  }, [selector, triggerKey]);
};

export default useScrollReveal;
