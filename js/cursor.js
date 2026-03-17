/* ============================================================
   cursor.js — Custom cursor with morph states
   ============================================================ */
(function () {
  // Skip on touch devices
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // Create elements
  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  var circle = document.createElement('div');
  circle.className = 'cursor-circle';
  circle.setAttribute('aria-hidden', 'true');
  var cursorText = document.createElement('span');
  cursorText.className = 'cursor-text';
  circle.appendChild(cursorText);

  document.body.appendChild(dot);
  document.body.appendChild(circle);
  document.body.classList.add('cursor-ready');

  var mouseX = -100, mouseY = -100;
  var circleX = -100, circleY = -100;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Trailing circle with lerp
  function animateCircle() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    circle.style.left = circleX + 'px';
    circle.style.top = circleY + 'px';
    requestAnimationFrame(animateCircle);
  }
  animateCircle();

  // Hover detection
  function addHoverListeners() {
    document.querySelectorAll('a, button, .btn, [role="button"]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        circle.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', function () {
        circle.classList.remove('is-hovering');
      });
    });

    document.querySelectorAll('.product-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        circle.classList.add('is-morph');
        cursorText.textContent = 'VIEW';
      });
      el.addEventListener('mouseleave', function () {
        circle.classList.remove('is-morph');
        cursorText.textContent = '';
      });
    });

    var scrollTrack = document.querySelector('.scroll-track');
    if (scrollTrack) {
      scrollTrack.addEventListener('mouseenter', function () {
        circle.classList.add('is-morph');
        cursorText.textContent = 'DRAG';
      });
      scrollTrack.addEventListener('mouseleave', function () {
        circle.classList.remove('is-morph');
        cursorText.textContent = '';
      });
    }

    var nav = document.querySelector('.nav');
    if (nav) {
      nav.addEventListener('mouseenter', function () {
        circle.classList.add('over-glass');
        dot.classList.add('over-glass');
      });
      nav.addEventListener('mouseleave', function () {
        circle.classList.remove('over-glass');
        dot.classList.remove('over-glass');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', addHoverListeners);
  window.LuxeCursor = { reinit: addHoverListeners };
})();
