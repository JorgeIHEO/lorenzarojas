/* ================================================================
   LORENZA ROJAS — js/script.js  |  Versión 1.0
   Nav scroll · Hamburger · Scroll Reveal · Parallax · Year
================================================================ */

(function () {
  'use strict';

  /* ── 1. Año en el footer ─────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 2. Nav: estado según scroll ─────────────────────────── */
  const nav = document.getElementById('nav');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 3. Menú hamburguesa ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('nav-menu');

  function closeMenu() {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── 4. Scroll Reveal ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-visible'), i * 90);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── 5. Scroll suave con offset de nav ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
      ) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' });
    });
  });

  /* ── 6. Parallax sutil en el hero ───────────────────────── */
  const heroContent = document.querySelector('.hero__content');

  if (heroContent && window.matchMedia('(min-width: 700px)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroContent.style.transform = `translateY(${y * 0.22}px)`;
            heroContent.style.opacity   = String(Math.max(0, 1 - y / 550));
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 7. Pain words rotativas ─────────────────────────────── */
  const painWords = document.querySelectorAll('.pain-word');
  if (painWords.length > 0) {
    let current = 0;
    setInterval(() => {
      painWords[current].classList.remove('active');
      current = (current + 1) % painWords.length;
      painWords[current].classList.add('active');
    }, 2500);
  }

})();
