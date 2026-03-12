/* ═══════════════════════════════════════════
   PANDAN LABS — Main JavaScript
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CURSOR ── */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function animateCursor() {
      if (cursor) { cursor.style.left = mx + 'px'; cursor.style.top = my + 'px'; }
      rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
      requestAnimationFrame(animateCursor);
    })();
    document.querySelectorAll('a, button, .service-card, .industry-card, .why-item').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  /* ── NAV SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── MOBILE MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  window.toggleMenu = function () {
    if (!mobileMenu) return;
    const open = mobileMenu.classList.toggle('open');
    if (hamburger) {
      hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(4.5px, 4.5px)' : '';
      hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
      hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '';
    }
  };

  /* ── REVEAL ON SCROLL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 1600;
    const startTime = performance.now();
    function step(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const statsBar = document.getElementById('stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.stat-num').forEach(el => {
            const text = el.dataset.target;
            if (text) {
              const num = parseInt(text);
              const suffix = text.replace(/[0-9]/g, '');
              animateCounter(el, num, suffix);
            }
          });
          statsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(statsBar);
  }

  /* ── METRIC BARS ── */
  const metricObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.metric-fill[data-width]').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.width; }, 300);
        });
        metricObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.metrics-list').forEach(el => metricObserver.observe(el));

  /* ── SCROLL TO TOP BUTTON ── */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── CONTACT FORM ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.submit-btn');
      const successMsg = document.getElementById('formSuccess');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (successMsg) successMsg.classList.add('show');
        contactForm.reset();
        setTimeout(() => { if (successMsg) successMsg.classList.remove('show'); }, 5000);
      }, 1500);
    });
  }

  /* ── SMOOTH SCROLL NAV LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').substring(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

});
