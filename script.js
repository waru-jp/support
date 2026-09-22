(() => {
  const revealItems = document.querySelectorAll('.reveal');
  const show = (item) => item.classList.add('is-visible');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(show);
  } else {
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        current.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll('[data-app-store-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (link.getAttribute('href') !== '#download') return;
      event.preventDefault();
      link.textContent = '公開準備中';
    });
  });
})();
