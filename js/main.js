function initMain() {
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var overlay = document.querySelector('.mobile-overlay');

  function openMenu() {
    mobileMenu.classList.add('open'); overlay.classList.add('open');
    hamburger.classList.add('is-open'); hamburger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    mobileMenu.classList.remove('open'); overlay.classList.remove('open');
    hamburger.classList.remove('is-open'); hamburger.setAttribute('aria-expanded', 'false');
  }
  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) closeMenu(); else openMenu();
    });
    overlay.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('form[data-fake-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.hasAttribute('data-success-replace')) {
        var successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.style.display = 'block';
        }
        return;
      }
      var confirmation = form.parentElement.querySelector('.form-confirmation');
      if (!confirmation) return;
      var span = confirmation.querySelector('span');
      if (span) span.textContent = form.getAttribute('data-confirm-message');
      else confirmation.textContent = form.getAttribute('data-confirm-message');
      confirmation.classList.add('visible');
      form.reset();
      setTimeout(function () { confirmation.classList.remove('visible'); }, 5000);
    });
  });

  var scrollTrack = document.querySelector('.scroll-track');
  var arrowLeft = document.querySelector('.scroll-arrow-left');
  var arrowRight = document.querySelector('.scroll-arrow-right');
  if (scrollTrack && arrowLeft && arrowRight) {
    var scrollAmount = 296;
    arrowLeft.addEventListener('click', function () { scrollTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
    arrowRight.addEventListener('click', function () { scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
  }

  document.querySelectorAll('.password-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.parentElement.querySelector('input');
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.querySelector('.eye-open').style.display = isPassword ? 'none' : '';
      btn.querySelector('.eye-closed').style.display = isPassword ? '' : 'none';
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });
}

document.addEventListener('DOMContentLoaded', initMain);
window.LuxeMain = { reinit: initMain };
