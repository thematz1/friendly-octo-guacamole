// TMG Brokerage — the site's only script. No dependencies, no build step.
// Everything here is an enhancement: pages stay readable and navigable without it.

// 1. Navigation: the link list is a popover on narrow screens and an inline
//    list on wide ones. Keep the `popover` attribute in sync with the layout
//    (use setAttribute, not the .popover property — see modern-web-guidance "navbar").
(function navigation() {
  var menu = document.getElementById('site-menu');
  if (!menu) return;
  var wide = window.matchMedia('(min-width: 52rem)');
  function sync() {
    if (wide.matches) menu.removeAttribute('popover');
    else menu.setAttribute('popover', 'auto');
  }
  sync();
  wide.addEventListener('change', sync);
})();

// 2. Forms. GitHub Pages has no backend, so forms marked data-formspree are
//    sent to Formspree (https://formspree.io). Paste the form ID from the
//    Formspree dashboard (the part after /f/ in the endpoint) below.
//    While it is empty, forms only show their confirmation and send nothing.
var FORMSPREE_ID = '';

function showStatus(form, message, done) {
  var status = document.getElementById(form.getAttribute('aria-describedby') || '');
  if (!status) return;
  status.textContent = message;
  if (done) form.hidden = true;
  status.setAttribute('tabindex', '-1');
  status.focus();
}

document.querySelectorAll('form[data-success]').forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var success = form.getAttribute('data-success');
    if (!form.hasAttribute('data-formspree') || !FORMSPREE_ID) {
      showStatus(form, success, true);
      return;
    }
    var button = form.querySelector('[type=submit]');
    button.disabled = true;
    fetch('https://formspree.io/f/' + FORMSPREE_ID, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error(response.status);
      showStatus(form, success, true);
    }).catch(function () {
      button.disabled = false;
      showStatus(form, 'Your message could not be sent. Please try again, or email contact@tmgbrokerage.com.', false);
    });
  });
});

// 3. Password fields: show/hide toggle.
document.querySelectorAll('.password-toggle').forEach(function (button) {
  button.addEventListener('click', function () {
    var input = button.parentElement.querySelector('input');
    var show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    button.setAttribute('aria-pressed', String(show));
  });
});

// 4. Contact form: "Enquire" links on lots pass ?subject=… to prefill it.
(function prefillSubject() {
  var field = document.getElementById('subject');
  var subject = new URLSearchParams(window.location.search).get('subject');
  if (field && subject) field.value = subject.slice(0, 120);
})();
