/* ============================================================
   main.js — Luxury Brand Static Site
   Mobile nav toggle, fake form submission, scroll arrows
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     Mobile Navigation
     ---------------------------------------------------------- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu && overlay && closeBtn) {
    hamburger.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);
  }

  /* ----------------------------------------------------------
     Fake Form Submission
     ---------------------------------------------------------- */
  document.querySelectorAll('form[data-fake-submit]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Full-replace success (register page)
      if (form.hasAttribute('data-success-replace')) {
        const successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.style.display = 'block';
        }
        return;
      }

      // Inline confirmation (contact, login)
      const confirmation = form.parentElement.querySelector('.form-confirmation');
      if (!confirmation) return;

      confirmation.textContent = form.getAttribute('data-confirm-message');
      confirmation.classList.add('visible');
      form.reset();

      setTimeout(() => {
        confirmation.classList.remove('visible');
      }, 5000);
    });
  });

  /* ----------------------------------------------------------
     Category Scroll Arrows
     ---------------------------------------------------------- */
  const scrollTrack = document.querySelector('.scroll-track');
  const arrowLeft = document.querySelector('.scroll-arrow-left');
  const arrowRight = document.querySelector('.scroll-arrow-right');

  if (scrollTrack && arrowLeft && arrowRight) {
    const scrollAmount = 296; // 280px card + 16px gap

    arrowLeft.addEventListener('click', () => {
      scrollTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    arrowRight.addEventListener('click', () => {
      scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

});
