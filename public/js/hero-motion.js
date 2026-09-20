(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.orbital-hero, .film-hero').forEach(hero => {
    const button = hero.querySelector('[data-motion-toggle]');
    const video = hero.querySelector('video');
    if (!button) return;
    let enabled = !reduced.matches && !navigator.connection?.saveData;
    let visible = true;
    let playRequest = 0;
    const render = () => {
      const request = ++playRequest;
      const playing = enabled && visible && !document.hidden;
      hero.classList.toggle('motion-paused', !playing);
      hero.classList.toggle('motion-enabled', enabled);
      button.textContent = enabled ? (video ? 'Pause footage' : 'Pause motion') : (video ? 'Play footage' : 'Play motion');
      button.setAttribute('aria-pressed', String(enabled));
      if (!video) return;
      if (!playing) { video.pause(); return; }
      if (!video.getAttribute('src')) video.src = video.dataset.videoSrc;
      video.muted = true;
      video.play().catch(() => {
        if (request !== playRequest) return;
        enabled = false;
        render();
      });
    };
    button.hidden = false;
    button.addEventListener('click', () => { enabled = !enabled; render(); });
    reduced.addEventListener('change', () => { enabled = !reduced.matches && !navigator.connection?.saveData; render(); });
    document.addEventListener('visibilitychange', render);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { visible = entries[0].isIntersecting; render(); }).observe(hero);
    }
    render();
  });
})();
