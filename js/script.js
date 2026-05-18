/* ================================================================
   LORENZA ROJAS — js/script.js  |  Versión 2.0
   Nav · Hamburger · Scroll Reveal multi-tipo · Parallax ·
   Progress bar · Magnetic CTA · Tilt cards · Orbs · Pain rotator
================================================================ */

(function () {
  'use strict';

  /* ── 1. Año ──────────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 2. Nav scroll ───────────────────────────────────────── */
  const nav = document.getElementById('nav');
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 3. Hamburguesa ──────────────────────────────────────── */
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
  menu.querySelectorAll('a').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── 4. Scroll suave con offset nav ─────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10
      ) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
    });
  });

  /* ── 5. Progress bar ─────────────────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── 6. Scroll Reveal multi-tipo ─────────────────────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el      = entry.target;
          const stagger = parseFloat(el.dataset.stagger || 0) * 150;
          setTimeout(() => el.classList.add('is-visible'), stagger);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ── 7. Parallax hero ────────────────────────────────────── */
  const heroContent = document.querySelector('.hero__content');
  if (heroContent && window.matchMedia('(min-width: 700px)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < window.innerHeight) {
            heroContent.style.transform = `translateY(${y * 0.22}px)`;
            heroContent.style.opacity   = String(Math.max(0, 1 - y / 520));
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 8. Parallax orbs decorativos ───────────────────────── */
  const orbs = document.querySelectorAll('.deco-orb');
  if (orbs.length && window.matchMedia('(min-width: 700px)').matches) {
    let ticking2 = false;
    window.addEventListener('scroll', () => {
      if (!ticking2) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          orbs.forEach(orb => {
            const speed = parseFloat(orb.dataset.speed || 0.08);
            const dir   = orb.dataset.dir === '-1' ? -1 : 1;
            orb.style.transform = `translateY(${y * speed * dir}px)`;
          });
          ticking2 = false;
        });
        ticking2 = true;
      }
    }, { passive: true });
  }

  /* ── 9. Parallax imagen about ────────────────────────────── */
  const aboutImg = document.querySelector('.about__img-main img');
  if (aboutImg && window.matchMedia('(min-width: 700px)').matches) {
    let ticking3 = false;
    const observer2 = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      window.addEventListener('scroll', () => {
        if (!ticking3) {
          requestAnimationFrame(() => {
            const rect = aboutImg.closest('.about').getBoundingClientRect();
            const rel  = -rect.top * 0.08;
            aboutImg.style.transform = `scale(1.06) translateY(${rel}px)`;
            ticking3 = false;
          });
          ticking3 = true;
        }
      }, { passive: true });
    }, { threshold: 0 });
    observer2.observe(document.querySelector('.about'));
  }

  /* ── 10. Magnetic button ─────────────────────────────────── */
  document.querySelectorAll('.btn--magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r    = btn.getBoundingClientRect();
      const dx   = e.clientX - (r.left + r.width  / 2);
      const dy   = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ── 11. Tilt 3D en service cards ────────────────────────── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = (e.clientX - r.left) / r.width  - 0.5;
      const y   = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── 12. Pain-word rotator ───────────────────────────────── */
  const words = document.querySelectorAll('.pain-word');
  if (words.length > 0) {
    let current    = 0;
    const DISPLAY_MS = 4000;
    const LEAVE_MS   = 400;

    function showWord(i)  { words[i].classList.remove('is-leaving'); words[i].classList.add('is-active'); }
    function hideWord(i, cb) {
      words[i].classList.add('is-leaving');
      setTimeout(() => { words[i].classList.remove('is-active','is-leaving'); if (cb) cb(); }, LEAVE_MS);
    }
    function next() { hideWord(current, () => { current = (current + 1) % words.length; showWord(current); }); }
    showWord(current);
    setInterval(next, DISPLAY_MS);
  }

})();
