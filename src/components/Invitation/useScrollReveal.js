import { useEffect } from 'react';

/**
 * useScrollReveal: Smooth 60fps IntersectionObserver hook for scroll reveal animations.
 * - Uses low threshold (0.05) so tall mobile sections trigger smoothly on entry.
 * - Immediately reveals any elements already within/above the initial viewport.
 * - Unobserves elements after animating for optimal scrolling performance.
 * - Watches dynamic DOM updates (tabs/filters) via MutationObserver.
 */
export const useScrollReveal = (selector = '[data-aos], .reveal-on-scroll', triggerKey = false) => {
  useEffect(() => {
    if (!triggerKey) return undefined;

    let intersectionObserver = null;
    let mutationObserver = null;

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length || !intersectionObserver) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      elements.forEach((el) => {
        if (el.classList.contains('aos-animate')) return;
        const rect = el.getBoundingClientRect();
        // Immediately reveal items already visible or scrolled past
        if (rect.top < viewportHeight * 0.96) {
          el.classList.add('aos-animate');
        } else {
          intersectionObserver.observe(el);
        }
      });
    };

    const timer = setTimeout(() => {
      if (typeof IntersectionObserver === 'undefined') {
        document.querySelectorAll(selector).forEach((el) => el.classList.add('aos-animate'));
        return;
      }

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('aos-animate');
              intersectionObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -15px 0px',
        }
      );

      observeElements();

      // Re-scan if user switches filter pills or tabs
      const mainEl = document.querySelector('.invitation-main-content');
      if (mainEl && typeof MutationObserver !== 'undefined') {
        mutationObserver = new MutationObserver(() => {
          observeElements();
        });
        mutationObserver.observe(mainEl, { childList: true, subtree: true });
      }
    }, 80);

    return () => {
      clearTimeout(timer);
      if (intersectionObserver) intersectionObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [selector, triggerKey]);
};

export default useScrollReveal;
