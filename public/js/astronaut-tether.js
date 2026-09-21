(() => {
  const hero = document.querySelector('.orbital-hero');
  const rig = hero?.querySelector('[data-astronaut-rig]');
  const path = hero?.querySelector('[data-tether-path]');
  if (!hero || !rig || !path) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = true;
  let frame = 0;
  let startedAt = 0;
  let frozenAt = 0;

  // Socket position measured on the transparent source image.
  const socket = { x: .684, y: .599 };
  const rotatePoint = (x, y, ox, oy, angle) => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    return { x: ox + (x - ox) * cos - (y - oy) * sin, y: oy + (x - ox) * sin + (y - oy) * cos };
  };

  const draw = (elapsed = frozenAt) => {
    const phase = elapsed / 11000 * Math.PI * 2;
    const dx = 7 + 7 * Math.sin(phase);
    const dy = -5 + 13 * Math.cos(phase);
    const angle = (-.5 + 2.5 * Math.sin(phase)) * Math.PI / 180;

    rig.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${angle}rad)`;

    // offset* values provide the untransformed layout box in the SVG's container.
    const width = rig.offsetWidth;
    const height = rig.offsetHeight;
    const baseLeft = rig.offsetLeft;
    const baseTop = rig.offsetTop;
    const originX = baseLeft + width * .52;
    const originY = baseTop + height * .45;
    const attached = rotatePoint(baseLeft + width * socket.x + dx, baseTop + height * socket.y + dy, originX + dx, originY + dy, angle);

    const anchor = { x: path.ownerSVGElement.clientWidth + 34, y: -24 };
    const distance = Math.hypot(anchor.x - attached.x, anchor.y - attached.y);
    const slack = Math.min(150, Math.max(65, distance * .17));
    const flutter = Math.sin(phase * .72 + .8) * 10;
    const c1 = { x: anchor.x - distance * .22, y: anchor.y + slack * .45 };
    const c2 = { x: attached.x + distance * .30, y: attached.y + slack + flutter };
    path.setAttribute('d', `M ${anchor.x.toFixed(1)} ${anchor.y.toFixed(1)} C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${attached.x.toFixed(1)} ${attached.y.toFixed(1)}`);
  };

  // hero-motion owns preference and explicit user opt-in; these classes are the
  // single authority, including reduced-motion and data-saving overrides.
  const shouldAnimate = () => visible && !document.hidden && hero.classList.contains('motion-enabled') && !hero.classList.contains('motion-paused');
  const tick = now => {
    if (!shouldAnimate()) { frame = 0; startedAt = 0; draw(frozenAt); return; }
    if (!startedAt) startedAt = now - frozenAt;
    frozenAt = now - startedAt;
    draw(frozenAt);
    frame = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (shouldAnimate() && !frame) frame = requestAnimationFrame(tick);
    if (!shouldAnimate() && frame) { cancelAnimationFrame(frame); frame = 0; startedAt = 0; draw(frozenAt); }
    if (!shouldAnimate()) draw(frozenAt);
  };

  hero.querySelector('[data-motion-toggle]')?.addEventListener('click', () => requestAnimationFrame(sync));
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('resize', () => draw(frozenAt), { passive: true });
  if ('ResizeObserver' in window) new ResizeObserver(() => draw(frozenAt)).observe(hero);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }).observe(hero);
  draw(0);
  requestAnimationFrame(sync);
})();
