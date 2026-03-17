/* ============================================================
   animations.js — GSAP ScrollTrigger, magnetic buttons,
                   floating labels, scroll animations
   ============================================================ */
(function () {

  /* ----------------------------------------------------------
     ScrollTrigger Setup (native scroll — no Lenis hijack)
     ---------------------------------------------------------- */
  function initScrollTrigger() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
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
     About Page Scroll Animations
     ---------------------------------------------------------- */
  function initAboutAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    var missionGrid = document.querySelector('.mission-grid');
    if (missionGrid) {
      var cols = missionGrid.children;
      if (cols[0]) gsap.from(cols[0], {
        scrollTrigger: { trigger: missionGrid, start: 'top 70%', toggleActions: 'play none none none' },
        x: -40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });
      if (cols[1]) gsap.from(cols[1], {
        scrollTrigger: { trigger: missionGrid, start: 'top 70%', toggleActions: 'play none none none' },
        x: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
      });

      var img = document.querySelector('.placeholder-image');
      if (img) {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 80%', toggleActions: 'play none none none' },
          clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power2.inOut'
        });
        ScrollTrigger.create({
          trigger: img,
          start: 'top 70%',
          onEnter: function () { img.classList.add('border-drawn'); }
        });
      }
    }

    var aboutHero = document.querySelector('.hero-short');
    if (aboutHero) {
      gsap.to(aboutHero, {
        scrollTrigger: { trigger: aboutHero, start: 'top top', end: 'bottom top', scrub: true },
        backgroundPositionY: '40%', ease: 'none'
      });
    }

    var valueCards = gsap.utils.toArray('.value-card');
    if (valueCards.length) {
      gsap.from(valueCards, {
        scrollTrigger: { trigger: '.values-grid', start: 'top 80%', toggleActions: 'play none none none' },
        scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out'
      });
    }
  }

  /* ----------------------------------------------------------
     Floating Labels
     ---------------------------------------------------------- */
  function initFloatingLabels() {
    document.querySelectorAll('.form-group .form-input').forEach(function (input) {
      if (input.value) input.classList.add('has-value');
      input.addEventListener('input', function () {
        if (input.value) { input.classList.add('has-value'); }
        else { input.classList.remove('has-value'); }
      });
      input.addEventListener('animationstart', function (e) {
        if (e.animationName === 'onAutoFillStart') { input.classList.add('has-value'); }
      });
    });
  }

  /* ----------------------------------------------------------
     Contact Page Scroll Animations
     ---------------------------------------------------------- */
  function initContactAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    var formGroups = gsap.utils.toArray('.contact-form-card .form-group');
    if (formGroups.length) {
      gsap.from(formGroups, {
        scrollTrigger: { trigger: '.contact-form-card', start: 'top 80%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
      });
    }

    var contactHero = document.querySelector('.hero-40');
    if (contactHero) {
      gsap.to(contactHero, {
        scrollTrigger: { trigger: contactHero, start: 'top top', end: 'bottom top', scrub: true },
        backgroundPositionY: '40%', ease: 'none'
      });
    }

    var detailItems = gsap.utils.toArray('.contact-details > *');
    if (detailItems.length) {
      gsap.from(detailItems, {
        scrollTrigger: { trigger: '.contact-details', start: 'top 80%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out'
      });
    }

    var socialIcons = gsap.utils.toArray('.contact-details .footer-social a');
    if (socialIcons.length) {
      gsap.from(socialIcons, {
        scrollTrigger: { trigger: '.contact-details .footer-social', start: 'top 90%', toggleActions: 'play none none none' },
        scale: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)'
      });
    }
  }

  /* ----------------------------------------------------------
     Footer Scroll Animations
     ---------------------------------------------------------- */
  function initFooterAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    var footerCols = gsap.utils.toArray('.footer-grid > div');
    if (footerCols.length) {
      gsap.from(footerCols, {
        scrollTrigger: { trigger: '.footer', start: 'top 90%', toggleActions: 'play none none none' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out'
      });
    }

    var socialIcons = gsap.utils.toArray('.footer-social a');
    if (socialIcons.length) {
      gsap.from(socialIcons, {
        scrollTrigger: { trigger: '.footer-social', start: 'top 95%', toggleActions: 'play none none none' },
        scale: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)'
      });
    }

    var copyright = document.querySelector('.footer-copyright');
    if (copyright) {
      gsap.from(copyright, {
        scrollTrigger: { trigger: copyright, start: 'top 95%', toggleActions: 'play none none none' },
        opacity: 0, duration: 0.6, delay: 0.6, ease: 'power2.out'
      });
    }
  }

  /* ----------------------------------------------------------
     3D Tilt Cards
     ---------------------------------------------------------- */
  function initTiltCards() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.category-card, .value-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(800px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg) scale(1.02)';
      });
      card.addEventListener('mouseleave', function () {
        if (typeof gsap !== 'undefined') {
          gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power2.out' });
        } else { card.style.transform = ''; }
      });
    });
  }

  /* ----------------------------------------------------------
     Drag-to-Scroll with Momentum
     ---------------------------------------------------------- */
  function initDragScroll() {
    var track = document.querySelector('.scroll-track');
    if (!track) return;
    var isDragging = false, hasDragged = false, startX = 0, scrollLeft = 0, velocity = 0, lastX = 0, lastTime = 0, momentumId = null;

    track.addEventListener('mousedown', function (e) {
      isDragging = true; hasDragged = false;
      startX = e.pageX; scrollLeft = track.scrollLeft;
      lastX = e.pageX; lastTime = Date.now(); velocity = 0;
      if (momentumId) cancelAnimationFrame(momentumId);
      track.classList.add('is-dragging');
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      var dx = e.pageX - startX;
      if (Math.abs(dx) > 3) hasDragged = true;
      track.scrollLeft = scrollLeft - dx;
      var now = Date.now(); var dt = now - lastTime;
      if (dt > 0) velocity = (e.pageX - lastX) / dt;
      lastX = e.pageX; lastTime = now;
    });

    // Prevent clicks on links inside track after a drag
    track.addEventListener('click', function (e) {
      if (hasDragged) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('is-dragging');
      function momentum() {
        if (Math.abs(velocity) < 0.01) { return; }
        track.scrollLeft -= velocity * 16; velocity *= 0.95;
        momentumId = requestAnimationFrame(momentum);
      }
      momentum();
    }
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mouseleave', stopDrag);
  }

  /* ----------------------------------------------------------
     Progress Dots
     ---------------------------------------------------------- */
  function initProgressDots() {
    var track = document.querySelector('.scroll-track');
    var wrapper = document.querySelector('.scroll-track-wrapper');
    if (!track || !wrapper) return;
    var cards = track.querySelectorAll('.category-card');
    if (!cards.length) return;
    var dotsContainer = document.createElement('div');
    dotsContainer.className = 'scroll-dots'; dotsContainer.setAttribute('aria-hidden', 'true');
    wrapper.parentElement.appendChild(dotsContainer);
    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
      dotsContainer.appendChild(dot);
    });
    var dots = dotsContainer.querySelectorAll('.scroll-dot');
    track.addEventListener('scroll', function () {
      var index = Math.round(track.scrollLeft / 296);
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     Logo Animation
     ---------------------------------------------------------- */
  function initLogoAnimation() {
    if (typeof Splitting === 'undefined' || typeof gsap === 'undefined') return;
    var logo = document.querySelector('.nav-logo[data-splitting]');
    if (!logo) return;
    Splitting({ target: logo });
    logo.classList.add('is-revealed');
    var chars = logo.querySelectorAll('.char');
    gsap.from(chars, { opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 });
    logo.addEventListener('mouseenter', function () {
      gsap.fromTo(chars, { color: '' },
        { color: 'var(--gold-hover)', duration: 0.3, stagger: 0.04, ease: 'power2.out',
          onComplete: function () { gsap.to(chars, { color: '', duration: 0.3, stagger: 0.04 }); }
        });
    });
  }

  /* ----------------------------------------------------------
     Mobile Menu Stagger
     ---------------------------------------------------------- */
  function initMobileMenuStagger() {
    var hamburger = document.querySelector('.nav-hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu || typeof gsap === 'undefined') return;
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class' && mobileMenu.classList.contains('open')) {
          var links = mobileMenu.querySelectorAll('a');
          gsap.from(links, { x: 30, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' });
        }
      });
    });
    observer.observe(mobileMenu, { attributes: true });
  }

  /* ----------------------------------------------------------
     Init
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollTrigger();
    initScrollProgress();
    initMagnetic();
    initNavAnimation();
    initHeroReveal();
    initHomepageAnimations();
    initAboutAnimations();
    initContactAnimations();
    initFooterAnimations();
    initFloatingLabels();
    initTiltCards();
    initDragScroll();
    initProgressDots();
    initMobileMenuStagger();
    initLogoAnimation();
  });

  // Expose for Barba re-init
  window.LuxeAnimations = {
    reinit: function () {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
      }
      initScrollTrigger();
      initScrollProgress();
      initMagnetic();
      initNavAnimation();
      initHeroReveal();
      initHomepageAnimations();
      initAboutAnimations();
      initContactAnimations();
      initFooterAnimations();
      initFloatingLabels();
      initTiltCards();
      initDragScroll();
      initProgressDots();
      initMobileMenuStagger();
      initLogoAnimation();
    }
  };

})();
