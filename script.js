/* ForwardEdge site — shared JS
 * Mounts nav helpers, ticker pause, headline rotator, reveal-on-scroll.
 */
(function () {
  // Sticky nav scroll state
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Count-up stats — animate when stats band enters viewport
  const countEls = document.querySelectorAll('[data-count-to]');
  if (countEls.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const el = e.target;
        const target = parseInt(el.dataset.countTo, 10);
        const dur = 1200;
        const start = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);
        const tick = (now) => {
          const t = Math.min(1, (now - start) / dur);
          const v = Math.round(easeOut(t) * target);
          el.textContent = String(v).padStart(el.dataset.countPad ? Number(el.dataset.countPad) : 0, '0');
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.3 });
    countEls.forEach(el => { el.textContent = el.dataset.countPad ? '0'.padStart(Number(el.dataset.countPad), '0') : '0'; obs.observe(el); });
  }

  // Scroll-into-view section label animation + stats rule slide
  if ('IntersectionObserver' in window) {
    const inObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); inObs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('.section-head .num, .stats-rule').forEach(el => inObs.observe(el));
  }

  // Reveal-on-scroll disabled — JS no-op. Content always visible.
  // (Class kept on elements for forward compatibility.)

  // Hero word rotator
  document.querySelectorAll('[data-rotator]').forEach(host => {
    const items = [...host.querySelectorAll('span')];
    if (items.length < 2) return;
    // Size container to widest item so layout doesn't jump
    const measure = document.createElement('span');
    measure.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-style:italic;';
    host.appendChild(measure);
    let maxW = 0;
    items.forEach(s => { measure.textContent = s.textContent; maxW = Math.max(maxW, measure.offsetWidth); });
    host.style.minWidth = (maxW + 2) + 'px';
    measure.remove();
    let i = 0;
    items[0].classList.add('in');
    setInterval(() => {
      const next = (i + 1) % items.length;
      // Fade current out
      items[i].classList.remove('in');
      items[i].classList.add('out');
      // Fade next in simultaneously (clears any lingering 'out')
      items[next].classList.remove('out');
      items[next].classList.add('in');
      // After transition completes, clear 'out' from previous so it's reusable
      const finished = items[i];
      setTimeout(() => finished.classList.remove('out'), 700);
      i = next;
    }, 2600);
  });

  // Photo enhancement: inject vignette + color-grade overlays on every real photo
  (function enhancePhotos() {
    document.querySelectorAll('.photo').forEach(photo => {
      const img = photo.querySelector('.photo-img');
      if (!img || photo.querySelector('.fe-grade')) return;
      const vig = document.createElement('div');
      vig.className = 'fe-grade fe-vignette';
      const color = document.createElement('div');
      color.className = 'fe-grade fe-color';
      photo.appendChild(vig);
      photo.appendChild(color);
    });
  })();

  // Ticker pause on hover
  document.querySelectorAll('.hero-ticker .track, .ticker').forEach(t => {
    t.addEventListener('mouseenter', () => t.style.animationPlayState = 'paused');
    t.addEventListener('mouseleave', () => t.style.animationPlayState = 'running');
  });

  // Mobile nav toggle (simple)
  const mobileNav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const links = mobileNav.querySelector('.nav-links');
      if (!links) return;
      const open = links.style.display === 'flex';
      links.style.display = open ? '' : 'flex';
      links.style.position = 'absolute';
      links.style.flexDirection = 'column';
      links.style.top = '72px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = 'var(--color-paper)';
      links.style.padding = '20px';
      links.style.borderBottom = 'var(--rule)';
    });
  }
})();
