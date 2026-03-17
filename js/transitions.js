(function () {
  if (typeof barba === 'undefined') return;

  var overlay = document.createElement('div');
  overlay.className = 'transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  barba.init({
    preventRunning: true,
    transitions: [{
      name: 'gold-wipe',
      before: function (data) {
        var nav = document.querySelector('.nav');
        var mobileOverlay = document.querySelector('.mobile-overlay');
        var mobileMenu = document.querySelector('.mobile-menu');
        var namespace = data.next.namespace;
        var authPages = ['login', 'register', 'forgot-password'];
        if (nav && authPages.indexOf(namespace) > -1) {
          nav.style.display = 'none';
          if (mobileOverlay) mobileOverlay.style.display = 'none';
          if (mobileMenu) mobileMenu.style.display = 'none';
        }
      },
      leave: function (data) {
        if (window.LuxeParticles) window.LuxeParticles.dispose();
        return new Promise(function (resolve) {
          if (typeof gsap !== 'undefined') {
            gsap.to(overlay, { scaleX: 1, duration: 0.6, ease: 'power2.inOut', onComplete: resolve });
          } else { resolve(); }
        });
      },
      enter: function (data) {
        window.scrollTo(0, 0);
        if (window.LuxeAnimations) {
          var lenis = window.LuxeAnimations.getLenis();
          if (lenis) lenis.scrollTo(0, { immediate: true });
        }
        return new Promise(function (resolve) {
          if (typeof gsap !== 'undefined') {
            gsap.to(overlay, { scaleX: 0, duration: 0.6, ease: 'power2.inOut', transformOrigin: 'right',
              onComplete: function () { overlay.style.transformOrigin = 'left'; resolve(); }
            });
          } else { resolve(); }
        });
      },
      after: function (data) {
        var nav = document.querySelector('.nav');
        var mobileOverlay = document.querySelector('.mobile-overlay');
        var mobileMenu = document.querySelector('.mobile-menu');
        var namespace = data.next.namespace;
        var authPages = ['login', 'register', 'forgot-password'];
        if (nav && authPages.indexOf(namespace) === -1) {
          nav.style.display = '';
          if (mobileOverlay) mobileOverlay.style.display = '';
          if (mobileMenu) mobileMenu.style.display = '';
        }
        if (window.LuxeAnimations) window.LuxeAnimations.reinit();
        if (window.LuxeCursor) window.LuxeCursor.reinit();
        if (window.LuxeParticles) window.LuxeParticles.reinit();
        if (typeof Splitting !== 'undefined') Splitting();
        if (window.LuxeMain) window.LuxeMain.reinit();
        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({ event: 'virtualPageView', pagePath: window.location.pathname });
        }
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      }
    }]
  });
})();
