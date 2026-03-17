(function () {
  if (typeof barba === 'undefined') return;

  barba.init({
    preventRunning: true,
    transitions: [{
      name: 'instant',
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
      },
      enter: function (data) {
        window.scrollTo(0, 0);
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
