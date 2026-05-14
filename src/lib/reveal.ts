export function reveal(node: HTMLElement, delay = 0) {
  node.style.transitionDelay = `${delay}ms`;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    node.classList.add('in-view');
    return {};
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('in-view');
        observer.unobserve(node);
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -80px 0px' }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
