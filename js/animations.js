/* ============================================================
   animations.js — GSAP ScrollTrigger, Lenis, magnetic buttons,
                   floating labels, scroll animations
   ============================================================ */
(function () {

  /* ----------------------------------------------------------
     Lenis Smooth Scroll
     ---------------------------------------------------------- */
  var lenis = null;

  function initLenis() {
    if (window.innerWidth < 768) return;
    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ----------------------------------------------------------
     Scroll Progress Bar
     ---------------------------------------------------------- */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    function updateProgress() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ----------------------------------------------------------
     Magnetic Buttons
     ---------------------------------------------------------- */
  function initMagnetic() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    document.querySelectorAll('.btn, .nav-links a, .footer-links a, .footer-social a, .scroll-arrow').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
      });

      el.addEventListener('mouseleave', function () {
        if (typeof gsap !== 'undefined') {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        } else {
          el.style.transform = '';
        }
      });
    });
  }

  /* ----------------------------------------------------------
     Nav Animation — entrance + hide-on-scroll + glass blur ramp
     ---------------------------------------------------------- */
  function initNavAnimation() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    if (typeof gsap !== 'undefined') {
      gsap.from(nav, { y: -72, duration: 0.4, ease: 'power2.out' });
    }

    var lastScrollY = 0;
    var ticking = false;

    function onScroll() {
      var currentY = window.scrollY || document.documentElement.scrollTop;
      if (currentY > lastScrollY && currentY > 100) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
      var blur = Math.min(20, 8 + (currentY / 100) * 12);
      nav.style.backdropFilter = 'blur(' + blur + 'px)';
      nav.style.webkitBackdropFilter = 'blur(' + blur + 'px)';
      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Hero Reveal — Splitting.js character animation
     ---------------------------------------------------------- */
  function initHeroReveal() {
    if (typeof Splitting === 'undefined' || typeof gsap === 'undefined') return;
    Splitting();
    document.querySelectorAll('.hero [data-splitting]').forEach(function (el) {
      var chars = el.querySelectorAll('.char');
      gsap.to(chars, { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out', delay: 0.3 });
    });
    document.querySelectorAll('.hero-tagline.will-reveal').forEach(function (el) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.0 });
    });
    document.querySelectorAll('.hero-ctas.will-reveal').forEach(function (el) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1.2 });
    });
  }

  /* ----------------------------------------------------------
     Homepage Scroll Animations
     ---------------------------------------------------------- */
  function initHomepageAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.utils.toArray('.intro-text').forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
      });
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        y: -40
      });
    });

    var categoryCards = gsap.utils.toArray('.category-card');
    if (categoryCards.length) {
      gsap.from(categoryCards, {
        scrollTrigger: { trigger: '.scroll-track', start: 'top 80%', toggleActions: 'play none none none' },
        x: 60, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
      });
    }

    var productCards = gsap.utils.toArray('.product-card');
    if (productCards.length) {
      gsap.from(productCards, {
        scrollTrigger: { trigger: '.featured-grid', start: 'top 80%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
      });
      gsap.utils.toArray('.product-image').forEach(function (img) {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 85%', toggleActions: 'play none none none' },
          clipPath: 'inset(0 100% 0 0)', duration: 0.8, ease: 'power2.inOut'
        });
      });
    }

    var trustItems = gsap.utils.toArray('.trust-item');
    if (trustItems.length) {
      gsap.from(trustItems, {
        scrollTrigger: { trigger: '.trust-grid', start: 'top 80%', toggleActions: 'play none none none' },
        opacity: 0, y: 30, duration: 0.6, stagger: 0.2, ease: 'power2.out'
      });
      gsap.utils.toArray('.trust-line').forEach(function (line) {
        gsap.from(line, {
          scrollTrigger: { trigger: line, start: 'top 85%', toggleActions: 'play none none none' },
          width: 0, duration: 0.8, ease: 'power2.out'
        });
      });
    }
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLenis();
    initScrollProgress();
    initMagnetic();
  });

  // Expose for Barba re-init
  window.LuxeAnimations = {
    reinit: function () {
      if (lenis) { lenis.destroy(); lenis = null; }
      initLenis();
      initScrollProgress();
      initMagnetic();
    },
    getLenis: function () { return lenis; }
  };

})();
