# LuxeBrand Visual Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the static LuxeBrand site into a bold, interactive luxury experience with 3D particles, page transitions, custom cursor, and scroll-driven animations.

**Architecture:** Static HTML/CSS/JS site on GitHub Pages. New JS split by concern (`animations.js`, `cursor.js`, `particles.js`, `transitions.js`). All libraries loaded via CDN `<script>` tags. CSS stays in one file. HTML pages restructured with Barba.js `data-barba` wrapper/container attributes.

**Tech Stack:** GSAP + ScrollTrigger (CDN), Splitting.js (CDN), Lenis (CDN), Barba.js (CDN), Three.js (CDN), vanilla JS.

**Spec:** `docs/superpowers/specs/2026-03-16-visual-upgrade-design.md`

---

## Chunk 1: Foundation — Palette, Tokens, Favicon, CDN Setup, HTML Restructure

### Task 1: Update CSS custom properties and add new tokens

**Files:**
- Modify: `css/style.css:27-48`

- [ ] **Step 1: Update `:root` color tokens**

Replace the existing `:root` block with updated palette and new tokens:

```css
:root {
  /* Colors — refined palette */
  --primary: #0F0F0F;
  --secondary: #1A1A1A;
  --gold: #C9A96E;
  --gold-hover: #D4BC8B;
  --gold-dark: #92620A; /* unchanged from original */
  --bg: #F5F0EB;
  --text: #0A0A0A;
  --text-muted: #6B6B6B;
  --border: #D6D3D1;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-bg-light: rgba(255, 255, 255, 0.60);
  --glass-border: rgba(255, 255, 255, 0.12);

  /* New tokens */
  --accent: #2A2A2A;
  --grain-opacity: 0.03;
  --glow: rgba(201, 169, 110, 0.15);

  /* Z-index scale */
  --z-cards: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-nav: 50;
  --z-progress: 51;
  --z-mobile-menu: 100;
}
```

- [ ] **Step 2: Update hardcoded color references in CSS**

Several places in `style.css` use hardcoded colors that reference the old palette. Update:
- Line 262: `.nav` background `rgba(28, 25, 23, 0.85)` → `rgba(15, 15, 15, 0.85)`
- Line 500: `.hero` gradient `rgba(28, 25, 23, ...)` → `rgba(15, 15, 15, 0.65), rgba(15, 15, 15, 0.75)`
- Line 537: `.hero .btn:hover` box-shadow `rgba(202, 138, 4, 0.2)` → `rgba(201, 169, 110, 0.2)`
- Line 652: `.scroll-arrow` background `rgba(28, 25, 23, 0.7)` → `rgba(15, 15, 15, 0.7)`
- Line 665: `.scroll-arrow:hover` background `rgba(28, 25, 23, 0.9)` → `rgba(15, 15, 15, 0.9)`
- Line 231: `.form-input:focus-visible` box-shadow `rgba(202, 138, 4, 0.15)` → `var(--glow)`
- Line 847: `.form-confirmation` background `rgba(202, 138, 4, 0.08)` → `rgba(201, 169, 110, 0.08)`
- Line 848: `.form-confirmation` border `rgba(202, 138, 4, 0.25)` → `rgba(201, 169, 110, 0.25)`
- Line 908: `.login-branding` gradient colors `var(--primary), var(--secondary), #2c2420` → `var(--primary), var(--secondary), #1A1A1A`
- Line 159: `@supports` fallback `.glass` `rgba(28, 25, 23, 0.9)` → `rgba(15, 15, 15, 0.9)`
- Line 163: `@supports` fallback `.glass-light` `rgba(250, 250, 249, 0.95)` → `rgba(245, 240, 235, 0.95)`
- Line 240: `select.form-input` dropdown arrow stroke `%2378716C` → `%236B6B6B`

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: update color palette to refined champagne gold + near-black"
```

---

### Task 2: Fix favicon on forgot-password.html

**Files:**
- Modify: `forgot-password.html:13`
- Modify: `images/favicon.svg`

- [ ] **Step 1: Replace inline data URI with file reference**

In `forgot-password.html` line 13, replace the entire `<link rel="icon" ...>` tag:

```html
<link rel="icon" type="image/svg+xml" href="images/favicon.svg">
```

- [ ] **Step 2: Update favicon.svg colors**

Read `images/favicon.svg` and update the rect fills from `#1C1917` to `#0F0F0F`, the text fill from `#CA8A04` to `#C9A96E`, and the decorative border stroke from `#CA8A04` to `#C9A96E`.

- [ ] **Step 3: Commit**

```bash
git add forgot-password.html images/favicon.svg
git commit -m "fix: normalize favicon across all pages and update to new palette"
```

---

### Task 3: Add CDN library script tags to all 6 HTML pages

**Files:**
- Modify: `index.html` (before `</body>`)
- Modify: `about.html` (before `</body>`)
- Modify: `contact.html` (before `</body>`)
- Modify: `login.html` (before `</body>`)
- Modify: `register.html` (before `</body>`)
- Modify: `forgot-password.html` (before `</body>`)

- [ ] **Step 1: Add CDN scripts and new JS files to all pages with nav (index, about, contact)**

Replace the single `<script src="js/main.js"></script>` before `</body>` with:

```html
<!-- Libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js" defer></script>
<script src="https://unpkg.com/splitting/dist/splitting.min.js" defer></script>
<script src="https://unpkg.com/@barba/core@2.9.7/dist/barba.umd.js" defer></script>

<!-- App -->
<script src="js/main.js" defer></script>
<script src="js/cursor.js" defer></script>
<script src="js/animations.js" defer></script>
<script src="js/transitions.js" defer></script>
```

- [ ] **Step 2: Add scripts to pages with Three.js (index, login, register, forgot-password)**

These pages also need Three.js. Add before the app scripts:

```html
<script src="https://unpkg.com/three@0.170.0/build/three.module.min.js" type="module"></script>
<script src="js/particles.js" type="module" defer></script>
```

Wait — Three.js as ES module won't work alongside non-module scripts easily. Instead, use the UMD build:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r169/three.min.js" defer></script>
<script src="js/particles.js" defer></script>
```

Use Three.js r169 (latest stable UMD build on cdnjs that exposes the `THREE` global). Verify the URL resolves before committing. If r169 is unavailable on cdnjs, use `https://unpkg.com/three@0.169.0/build/three.min.js` instead.

For pages WITHOUT Three.js (about, contact), omit these two script tags.

- [ ] **Step 3: Add Splitting.js CSS to all pages `<head>`**

In every page's `<head>`, after the `style.css` link:

```html
<link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting.css">
<link rel="stylesheet" href="https://unpkg.com/splitting/dist/splitting-cells.css">
```

- [ ] **Step 4: Create empty JS files as placeholders**

```bash
touch js/cursor.js js/animations.js js/particles.js js/transitions.js
```

- [ ] **Step 5: Commit**

```bash
git add index.html about.html contact.html login.html register.html forgot-password.html js/cursor.js js/animations.js js/particles.js js/transitions.js
git commit -m "feat: add CDN library scripts and new JS file structure to all pages"
```

---

### Task 4: Restructure HTML for Barba.js on nav pages (index, about, contact)

**Files:**
- Modify: `index.html`
- Modify: `about.html`
- Modify: `contact.html`

Each of these pages needs:
1. A `<div data-barba="wrapper">` wrapping everything inside `<body>` (after skip link)
2. The `<header>` (nav) stays OUTSIDE the container but INSIDE the wrapper
3. Mobile overlay + mobile menu stay outside the container but inside the wrapper
4. A `<div data-barba="container" data-barba-namespace="PAGENAME">` wrapping `<main>` and `<footer>`
5. A scroll progress bar element

- [ ] **Step 1: Restructure index.html**

After `<a href="#main" class="sr-only">Skip to content</a>`, wrap everything in `data-barba="wrapper"`. Add the scroll progress element. Wrap `<main>` and `<footer>` in `data-barba="container"`:

```html
<a href="#main" class="sr-only">Skip to content</a>

<!-- Scroll Progress -->
<div class="scroll-progress" aria-hidden="true"></div>

<div data-barba="wrapper">

<header class="nav">
  <!-- ... unchanged ... -->
</header>

<div class="mobile-overlay"></div>
<div class="mobile-menu">
  <!-- ... unchanged ... -->
</div>

<div data-barba="container" data-barba-namespace="home">

<main id="main">
  <!-- ... unchanged ... -->
</main>

<footer class="footer">
  <!-- ... unchanged ... -->
</footer>

</div><!-- /container -->
</div><!-- /wrapper -->
```

- [ ] **Step 2: Restructure about.html**

Same pattern, with `data-barba-namespace="about"`.

- [ ] **Step 3: Restructure contact.html**

Same pattern, with `data-barba-namespace="contact"`.

- [ ] **Step 4: Commit**

```bash
git add index.html about.html contact.html
git commit -m "feat: restructure nav pages with Barba.js wrapper/container attributes"
```

---

### Task 5: Restructure HTML for Barba.js on auth pages (login, register, forgot-password)

**Files:**
- Modify: `login.html`
- Modify: `register.html`
- Modify: `forgot-password.html`

Auth pages have no nav/footer. Wrap the `.login-layout` in Barba structure.

- [ ] **Step 1: Restructure login.html**

```html
<body>

<div data-barba="wrapper">
<div data-barba="container" data-barba-namespace="login">

<div class="login-layout">
  <!-- ... unchanged ... -->
</div>

</div><!-- /container -->
</div><!-- /wrapper -->

<!-- scripts -->
</body>
```

- [ ] **Step 2: Restructure register.html**

Same pattern, `data-barba-namespace="register"`.

- [ ] **Step 3: Restructure forgot-password.html**

Same pattern, `data-barba-namespace="forgot-password"`.

- [ ] **Step 4: Commit**

```bash
git add login.html register.html forgot-password.html
git commit -m "feat: restructure auth pages with Barba.js wrapper/container attributes"
```

---

### Task 6: Add film grain overlay and scroll progress CSS

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add film grain overlay CSS**

Add after the base/typography section (after line ~64):

```css
/* --------------------------------------------------------------------------
   Film Grain Overlay
   -------------------------------------------------------------------------- */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}
```

- [ ] **Step 2: Add scroll progress bar CSS**

```css
/* --------------------------------------------------------------------------
   Scroll Progress Bar
   -------------------------------------------------------------------------- */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: var(--gold);
  z-index: var(--z-progress);
  transition: none;
}
```

- [ ] **Step 3: Add `loading="lazy"` to below-the-fold images in HTML**

In `index.html`, add `loading="lazy"` to all product card images. Category cards use CSS background-image so no change needed. The hero is above the fold so no lazy loading.

The product cards use `background-image` in inline styles, not `<img>` tags. No change needed — CSS backgrounds don't support `loading="lazy"`. Leave as-is.

In `about.html`, the mission image is a CSS background. No change needed.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: add film grain overlay and scroll progress bar CSS"
```

---

## Chunk 2: Custom Cursor

### Task 7: Implement custom cursor

**Files:**
- Create: `js/cursor.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add cursor CSS**

Add to `style.css`:

```css
/* --------------------------------------------------------------------------
   Custom Cursor
   -------------------------------------------------------------------------- */
@media (hover: hover) and (pointer: fine) {
  body.cursor-ready {
    cursor: none;
  }

  body.cursor-ready a,
  body.cursor-ready button,
  body.cursor-ready [role="button"] {
    cursor: none;
  }
}

.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: var(--gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
}

.cursor-circle {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border: 1px solid var(--gold);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease, border-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor-circle.is-hovering {
  width: 60px;
  height: 60px;
}

.cursor-circle.is-morph {
  width: 80px;
  height: 80px;
  background: var(--gold);
  border-color: var(--gold);
}

.cursor-circle .cursor-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--bg);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cursor-circle.is-morph .cursor-text {
  opacity: 1;
}

.cursor-circle.over-glass {
  mix-blend-mode: normal;
  opacity: 0.9;
}
```

- [ ] **Step 2: Write js/cursor.js**

```javascript
/* ============================================================
   cursor.js — Custom cursor with morph states
   ============================================================ */
(function () {
  // Skip on touch devices
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  // Create elements
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');

  const circle = document.createElement('div');
  circle.className = 'cursor-circle';
  circle.setAttribute('aria-hidden', 'true');
  const cursorText = document.createElement('span');
  cursorText.className = 'cursor-text';
  circle.appendChild(cursorText);

  document.body.appendChild(dot);
  document.body.appendChild(circle);
  document.body.classList.add('cursor-ready');

  let mouseX = -100, mouseY = -100;
  let circleX = -100, circleY = -100;

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
    // Interactive elements — grow
    document.querySelectorAll('a, button, .btn, [role="button"]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        circle.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', function () {
        circle.classList.remove('is-hovering');
      });
    });

    // Product cards — morph to VIEW
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

    // Scroll track — morph to DRAG
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

    // Glass nav — disable blend mode
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

  // Initialize on load, and re-initialize after Barba transitions
  document.addEventListener('DOMContentLoaded', addHoverListeners);
  // Expose for Barba re-init
  window.LuxeCursor = { reinit: addHoverListeners };
})();
```

- [ ] **Step 3: Add `.over-glass` override to cursor dot CSS**

```css
.cursor-dot.over-glass {
  mix-blend-mode: normal;
  opacity: 0.9;
}
```

- [ ] **Step 4: Commit**

```bash
git add js/cursor.js css/style.css
git commit -m "feat: implement custom cursor with morph states and glass detection"
```

---

## Chunk 3: Lenis Smooth Scroll, Magnetic Buttons, Scroll Progress

### Task 8: Implement Lenis smooth scroll and scroll progress bar

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Write Lenis init + scroll progress in animations.js**

```javascript
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
    // Disable on mobile for native scroll
    if (window.innerWidth < 768) return;

    if (typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true
    });

    // Sync with GSAP ScrollTrigger
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
     Init
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initLenis();
    initScrollProgress();
  });

  // Expose for Barba re-init
  window.LuxeAnimations = {
    reinit: function () {
      if (lenis) { lenis.destroy(); lenis = null; }
      initLenis();
      initScrollProgress();
    },
    getLenis: function () { return lenis; }
  };

})();
```

- [ ] **Step 2: Commit**

```bash
git add js/animations.js
git commit -m "feat: implement Lenis smooth scroll and scroll progress bar"
```

---

### Task 9: Implement magnetic buttons

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add magnetic button logic to animations.js**

Add inside the IIFE, before the Init section:

```javascript
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
```

Add `initMagnetic()` call in the DOMContentLoaded handler and in the `reinit` function.

- [ ] **Step 2: Commit**

```bash
git add js/animations.js
git commit -m "feat: add magnetic button effect to CTAs and nav links"
```

---

## Chunk 4: GSAP Scroll Animations — All Pages

### Task 10: Implement nav entrance, hide/show on scroll, and glass blur ramp

**Files:**
- Modify: `js/animations.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add nav CSS for slide animation**

Add to `style.css` after the `.nav` rules:

```css
.nav {
  transition: transform 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease;
}

.nav.nav-hidden {
  transform: translateY(-100%);
}
```

- [ ] **Step 2: Add nav animation logic to animations.js**

```javascript
  /* ----------------------------------------------------------
     Navigation — entrance, hide/show, blur ramp
     ---------------------------------------------------------- */
  function initNavAnimation() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    // Entrance slide down
    if (typeof gsap !== 'undefined') {
      gsap.from(nav, { y: -72, duration: 0.4, ease: 'power2.out' });
    }

    // Hide on scroll down, show on scroll up
    var lastScrollY = 0;
    var ticking = false;

    function onScroll() {
      var currentY = window.scrollY || document.documentElement.scrollTop;

      if (currentY > lastScrollY && currentY > 100) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }

      // Blur ramp: 8px at top, 20px after 100px
      var blur = Math.min(20, 8 + (currentY / 100) * 12);
      nav.style.backdropFilter = 'blur(' + blur + 'px)';
      nav.style.webkitBackdropFilter = 'blur(' + blur + 'px)';

      lastScrollY = currentY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }
```

Add `initNavAnimation()` to DOMContentLoaded and reinit.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js css/style.css
git commit -m "feat: add nav entrance animation and hide-on-scroll behavior"
```

---

### Task 11: Implement Splitting.js text reveals for hero headings

**Files:**
- Modify: `js/animations.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add Splitting CSS for initial hidden state**

```css
/* --------------------------------------------------------------------------
   Splitting.js Text Reveal
   -------------------------------------------------------------------------- */
[data-splitting] .char {
  opacity: 0;
  transform: translateY(30px);
  display: inline-block;
  transition: none;
}

.hero-tagline.will-reveal,
.hero-ctas.will-reveal {
  opacity: 0;
  transform: translateY(20px);
}
```

- [ ] **Step 2: Add `data-splitting` attribute to hero headings in HTML**

In `index.html` line 53:
```html
<h1 data-splitting>Where Rarity Meets Refinement</h1>
```

In `about.html` line 53:
```html
<h1 data-splitting>The House</h1>
```

In `contact.html` line 53:
```html
<h1 data-splitting>Private Enquiries</h1>
```

In all three files, add `will-reveal` class:
- `index.html`: `<p class="hero-tagline will-reveal">` and `<div class="hero-ctas will-reveal">`
- `about.html`: `<p class="hero-tagline will-reveal">`
- `contact.html`: `<p class="hero-tagline will-reveal">`

- [ ] **Step 3: Add hero text reveal animation to animations.js**

```javascript
  /* ----------------------------------------------------------
     Hero Text Reveals (Splitting.js + GSAP)
     ---------------------------------------------------------- */
  function initHeroReveal() {
    if (typeof Splitting === 'undefined' || typeof gsap === 'undefined') return;

    // Split all [data-splitting] elements
    Splitting();

    // Animate hero heading characters
    document.querySelectorAll('.hero [data-splitting]').forEach(function (el) {
      var chars = el.querySelectorAll('.char');
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.3
      });
    });

    // Animate hero taglines
    document.querySelectorAll('.hero-tagline.will-reveal').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.0
      });
    });

    // Animate hero CTAs
    document.querySelectorAll('.hero-ctas.will-reveal').forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.2
      });
    });
  }
```

Add `initHeroReveal()` to DOMContentLoaded and reinit.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js css/style.css index.html about.html contact.html
git commit -m "feat: add Splitting.js character reveal on hero headings"
```

---

### Task 12: Implement scroll-triggered animations for homepage sections

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add homepage scroll animations**

```javascript
  /* ----------------------------------------------------------
     Homepage Section Animations
     ---------------------------------------------------------- */
  function initHomepageAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Intro strip — text reveal with parallax
    gsap.utils.toArray('.intro-text').forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0, y: 30, duration: 0.8, ease: 'power2.out'
      });
      // Parallax
      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        y: -40
      });
    });

    // Category cards — stagger from right
    var categoryCards = gsap.utils.toArray('.category-card');
    if (categoryCards.length) {
      gsap.from(categoryCards, {
        scrollTrigger: { trigger: '.scroll-track', start: 'top 80%', toggleActions: 'play none none none' },
        x: 60, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
      });
    }

    // Product cards — stagger fade up with clip-path reveal on images
    var productCards = gsap.utils.toArray('.product-card');
    if (productCards.length) {
      gsap.from(productCards, {
        scrollTrigger: { trigger: '.featured-grid', start: 'top 80%', toggleActions: 'play none none none' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
      });

      // Image clip-path reveal
      gsap.utils.toArray('.product-image').forEach(function (img) {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 85%', toggleActions: 'play none none none' },
          clipPath: 'inset(0 100% 0 0)', duration: 0.8, ease: 'power2.inOut'
        });
      });
    }

    // Trust banner — stagger + gold line draw
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
```

Add `initHomepageAnimations()` to DOMContentLoaded and reinit.

- [ ] **Step 2: Commit**

```bash
git add js/animations.js
git commit -m "feat: add scroll-triggered animations for homepage sections"
```

---

### Task 13: Implement scroll animations for About page

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add About page scroll animations**

```javascript
  /* ----------------------------------------------------------
     About Page Animations
     ---------------------------------------------------------- */
  function initAboutAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Mission section — columns slide in from sides
    var missionGrid = document.querySelector('.mission-grid');
    if (missionGrid) {
      var cols = missionGrid.children;
      if (cols[0]) {
        gsap.from(cols[0], {
          scrollTrigger: { trigger: missionGrid, start: 'top 70%', toggleActions: 'play none none none' },
          x: -40, opacity: 0, duration: 0.8, ease: 'power2.out'
        });
      }
      if (cols[1]) {
        gsap.from(cols[1], {
          scrollTrigger: { trigger: missionGrid, start: 'top 70%', toggleActions: 'play none none none' },
          x: 40, opacity: 0, duration: 0.8, ease: 'power2.out'
        });
      }

      // Image clip-path reveal
      var img = document.querySelector('.placeholder-image');
      if (img) {
        gsap.from(img, {
          scrollTrigger: { trigger: img, start: 'top 80%', toggleActions: 'play none none none' },
          clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power2.inOut'
        });
      }
    }

    // About hero parallax (background scrolls at 0.6x)
    var aboutHero = document.querySelector('.hero-short');
    if (aboutHero) {
      gsap.to(aboutHero, {
        scrollTrigger: { trigger: aboutHero, start: 'top top', end: 'bottom top', scrub: true },
        backgroundPositionY: '40%',
        ease: 'none'
      });
    }

    // Values grid — scale + fade stagger + hover glow CSS (hover handled via CSS below)
    var valueCards = gsap.utils.toArray('.value-card');
    if (valueCards.length) {
      gsap.from(valueCards, {
        scrollTrigger: { trigger: '.values-grid', start: 'top 80%', toggleActions: 'play none none none' },
        scale: 0.9, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out'
      });
    }
  }
```

Add `initAboutAnimations()` to DOMContentLoaded and reinit.

- [ ] **Step 2: Add About page hover and Ken Burns CSS to style.css**

```css
/* Value card hover states */
.value-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px var(--glow);
  background: rgba(255, 255, 255, 0.7);
}

/* Mission image Ken Burns on hover */
.placeholder-image {
  transition: transform 4s ease;
  overflow: hidden;
}

.placeholder-image:hover {
  transform: scale(1.03) translate(1%, -1%);
}

/* Mission image gold border draw */
.placeholder-image {
  border: 2px solid transparent;
  transition: border-color 1.2s ease;
}

.placeholder-image.border-drawn {
  border-color: var(--gold);
}
```

In `initAboutAnimations`, add the border-draw trigger:

```javascript
    // Gold border draw on scroll
    if (img) {
      ScrollTrigger.create({
        trigger: img,
        start: 'top 70%',
        onEnter: function () { img.classList.add('border-drawn'); }
      });
    }
```

- [ ] **Step 3: Commit**

```bash
git add js/animations.js css/style.css
git commit -m "feat: add scroll animations, hover glow, Ken Burns for About page"
```

---

### Task 14: Implement scroll animations for Contact page + floating labels

**Files:**
- Modify: `js/animations.js`
- Modify: `css/style.css`
- Modify: `contact.html`
- Modify: `login.html`
- Modify: `register.html`
- Modify: `forgot-password.html`

- [ ] **Step 1: Add floating label CSS**

Add to `style.css`:

```css
/* --------------------------------------------------------------------------
   Floating Labels
   -------------------------------------------------------------------------- */
.form-group {
  position: relative;
}

.form-group label {
  position: absolute;
  top: 14px;
  left: 16px;
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-muted);
  pointer-events: none;
  transition: transform 0.3s ease, font-size 0.3s ease, color 0.3s ease;
  transform-origin: left top;
  margin-bottom: 0;
}

.form-group .form-input:focus ~ label,
.form-group .form-input.has-value ~ label {
  transform: translateY(-24px);
  font-size: 0.75rem;
  color: var(--gold);
}

.form-group .form-input {
  padding-top: 16px;
}
```

- [ ] **Step 2: Restructure form groups in HTML — move labels AFTER inputs**

Floating labels require `<input>` before `<label>` so the `~` sibling selector works.

In `contact.html`, `login.html`, `register.html`, `forgot-password.html`: for every `.form-group`, swap the order so `<input>` comes before `<label>`, and remove `placeholder` attributes.

For each `.form-group` across all 4 pages: move `<label>` AFTER the `<input>`, and remove the `placeholder` attribute. For `<select>` elements, keep the label BEFORE the select (floating labels don't work well with native selects) — do NOT move the label or remove placeholder.

**contact.html** (4 fields): name, email, subject, message. Each transforms from `<label><input placeholder="...">` to `<input><label>` with no placeholder.

**login.html** (2 fields): email, password. Same transformation.

**register.html** (6 fields): first, last, email, phone, interest (select — SKIP), password. Transform 5 fields, leave interest `<select>` as-is.

**forgot-password.html** (1 field): email. Same transformation.

Example — contact.html name field, from:
```html
<div class="form-group">
  <label for="name">Name</label>
  <input type="text" id="name" class="form-input" placeholder="Your name" required>
</div>
```
To:
```html
<div class="form-group">
  <input type="text" id="name" class="form-input" required>
  <label for="name">Name</label>
</div>
```

Total: 12 form groups to transform (13 minus the 1 select).

- [ ] **Step 3: Add floating label JS (`.has-value` class) to animations.js**

```javascript
  /* ----------------------------------------------------------
     Floating Labels
     ---------------------------------------------------------- */
  function initFloatingLabels() {
    document.querySelectorAll('.form-group .form-input').forEach(function (input) {
      // Set initial state
      if (input.value) input.classList.add('has-value');

      input.addEventListener('input', function () {
        if (input.value) {
          input.classList.add('has-value');
        } else {
          input.classList.remove('has-value');
        }
      });

      // Handle autofill
      input.addEventListener('animationstart', function (e) {
        if (e.animationName === 'onAutoFillStart') {
          input.classList.add('has-value');
        }
      });
    });
  }
```

- [ ] **Step 4: Add focus border animation CSS**

```css
.form-group .form-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--glow);
}
```

- [ ] **Step 5: Add Contact page scroll animations to animations.js**

```javascript
  /* ----------------------------------------------------------
     Contact Page Animations
     ---------------------------------------------------------- */
  function initContactAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Form fields stagger
    var formGroups = gsap.utils.toArray('.contact-form-card .form-group');
    if (formGroups.length) {
      gsap.from(formGroups, {
        scrollTrigger: { trigger: '.contact-form-card', start: 'top 80%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
      });
    }

    // Contact hero parallax
    var contactHero = document.querySelector('.hero-40');
    if (contactHero) {
      gsap.to(contactHero, {
        scrollTrigger: { trigger: contactHero, start: 'top top', end: 'bottom top', scrub: true },
        backgroundPositionY: '40%',
        ease: 'none'
      });
    }

    // Contact details stagger
    var detailItems = gsap.utils.toArray('.contact-details > *');
    if (detailItems.length) {
      gsap.from(detailItems, {
        scrollTrigger: { trigger: '.contact-details', start: 'top 80%', toggleActions: 'play none none none' },
        y: 20, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out'
      });
    }

    // Social icons bounce
    var socialIcons = gsap.utils.toArray('.contact-details .footer-social a');
    if (socialIcons.length) {
      gsap.from(socialIcons, {
        scrollTrigger: { trigger: '.contact-details .footer-social', start: 'top 90%', toggleActions: 'play none none none' },
        scale: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)'
      });
    }
  }
```

- [ ] **Step 6: Add contact form success animation**

Update the contact form's success handler in `main.js` to animate collapse + checkmark. In the contact form's `.form-confirmation` div, add an SVG checkmark:

In `contact.html`, update the `.form-confirmation` div:
```html
<div class="form-confirmation">
  <svg class="checkmark-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path class="checkmark-path" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline class="checkmark-check" points="22 4 12 14.01 9 11.01"/>
  </svg>
  <span></span>
</div>
```

Add CSS for checkmark draw animation:
```css
.checkmark-icon .checkmark-path,
.checkmark-icon .checkmark-check {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.form-confirmation.visible .checkmark-path {
  animation: drawCheckmark 0.8s ease forwards;
}

.form-confirmation.visible .checkmark-check {
  animation: drawCheckmark 0.5s ease 0.5s forwards;
}

@keyframes drawCheckmark {
  to { stroke-dashoffset: 0; }
}
```

Add `initFloatingLabels()` and `initContactAnimations()` to DOMContentLoaded and reinit.

- [ ] **Step 7: Commit**

```bash
git add js/animations.js css/style.css contact.html login.html register.html forgot-password.html
git commit -m "feat: add floating labels, focus effects, contact success animation, and scroll animations"
```

**Note on `<picture>` WebP:** The spec mentions wrapping images in `<picture>` with WebP sources. Since we don't have WebP versions of the images, this is deferred until WebP assets are available. The current JPGs work fine.

---

### Task 15: Implement footer scroll animations

**Files:**
- Modify: `js/animations.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add footer animation CSS**

Add to `style.css`:

```css
.footer {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: var(--gold);
}

.footer .footer-border-anim {
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  width: 0;
  background: var(--gold);
}
```

Actually, simpler approach — animate the border via GSAP on the footer element itself, using a pseudo-element or just a visual cue. The existing `border-top: 1px solid var(--gold)` is fine — we'll just animate the columns staggering in.

- [ ] **Step 2: Add footer animation to animations.js**

```javascript
  /* ----------------------------------------------------------
     Footer Animations
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

    // Social icons bounce
    var socialIcons = gsap.utils.toArray('.footer-social a');
    if (socialIcons.length) {
      gsap.from(socialIcons, {
        scrollTrigger: { trigger: '.footer-social', start: 'top 95%', toggleActions: 'play none none none' },
        scale: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)'
      });
    }

    // Copyright fade
    var copyright = document.querySelector('.footer-copyright');
    if (copyright) {
      gsap.from(copyright, {
        scrollTrigger: { trigger: copyright, start: 'top 95%', toggleActions: 'play none none none' },
        opacity: 0, duration: 0.6, delay: 0.6, ease: 'power2.out'
      });
    }
  }
```

- [ ] **Step 3: Add animated gold underline CSS for footer/nav links**

```css
.footer-links a {
  position: relative;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.footer-links a:hover::after {
  width: 100%;
}
```

Add `initFooterAnimations()` to DOMContentLoaded and reinit.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js css/style.css
git commit -m "feat: add footer scroll animations and animated link underlines"
```

---

## Chunk 5: Interactive Elements — 3D Tilt, Drag Scroll, Product Hover, Hamburger

### Task 16: Implement 3D tilt on category and value cards

**Files:**
- Modify: `js/animations.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add perspective CSS**

```css
.scroll-track {
  perspective: 800px;
}

.values-grid {
  perspective: 800px;
}
```

- [ ] **Step 2: Add 3D tilt logic to animations.js**

```javascript
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
        } else {
          card.style.transform = '';
        }
      });
    });
  }
```

Add `initTiltCards()` to DOMContentLoaded and reinit.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js css/style.css
git commit -m "feat: add 3D tilt effect on category and value cards"
```

---

### Task 17: Implement drag-to-scroll with momentum on category track

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add drag-to-scroll logic**

```javascript
  /* ----------------------------------------------------------
     Drag-to-Scroll with Momentum
     ---------------------------------------------------------- */
  function initDragScroll() {
    var track = document.querySelector('.scroll-track');
    if (!track) return;

    var isDragging = false;
    var startX = 0;
    var scrollLeft = 0;
    var velocity = 0;
    var lastX = 0;
    var lastTime = 0;
    var momentumId = null;

    track.addEventListener('mousedown', function (e) {
      isDragging = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      lastX = e.pageX;
      lastTime = Date.now();
      velocity = 0;
      if (momentumId) cancelAnimationFrame(momentumId);
      track.style.cursor = 'grabbing';
      track.style.scrollSnapType = 'none';
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      e.preventDefault();
      var x = e.pageX - track.offsetLeft;
      var walk = (x - startX);
      track.scrollLeft = scrollLeft - walk;

      var now = Date.now();
      var dt = now - lastTime;
      if (dt > 0) {
        velocity = (e.pageX - lastX) / dt;
      }
      lastX = e.pageX;
      lastTime = now;
    });

    function stopDrag() {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = '';

      // Momentum
      function momentum() {
        if (Math.abs(velocity) < 0.01) {
          track.style.scrollSnapType = 'x mandatory';
          return;
        }
        track.scrollLeft -= velocity * 16;
        velocity *= 0.95;
        momentumId = requestAnimationFrame(momentum);
      }
      momentum();
    }

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mouseleave', stopDrag);
  }
```

Also add progress dots logic:

```javascript
  /* ----------------------------------------------------------
     Category Progress Dots
     ---------------------------------------------------------- */
  function initProgressDots() {
    var track = document.querySelector('.scroll-track');
    var wrapper = document.querySelector('.scroll-track-wrapper');
    if (!track || !wrapper) return;

    var cards = track.querySelectorAll('.category-card');
    if (!cards.length) return;

    // Create dots container
    var dotsContainer = document.createElement('div');
    dotsContainer.className = 'scroll-dots';
    dotsContainer.setAttribute('aria-hidden', 'true');
    wrapper.parentElement.appendChild(dotsContainer);

    cards.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.className = 'scroll-dot' + (i === 0 ? ' active' : '');
      dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.scroll-dot');

    track.addEventListener('scroll', function () {
      var index = Math.round(track.scrollLeft / 296);
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === index);
      });
    }, { passive: true });
  }
```

- [ ] **Step 2: Add progress dots CSS**

Add to `style.css`:

```css
.scroll-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.scroll-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
  transition: all 0.3s ease;
}

.scroll-dot.active {
  width: 8px;
  height: 8px;
  background: var(--gold);
}
```

Add both init functions to DOMContentLoaded and reinit.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js css/style.css
git commit -m "feat: add drag-to-scroll with momentum and progress dots on category track"
```

---

### Task 18: Implement enhanced product card hover effects

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Update product card hover CSS**

```css
.product-card {
  position: relative;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.product-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.product-image {
  transition: transform 0.6s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

/* Gold gradient overlay on hover */
.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(201, 169, 110, 0.3), transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
  border-radius: 8px;
}

.product-card:hover::before {
  opacity: 1;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: enhance product card hover with lift, zoom, and gold overlay"
```

---

### Task 19: Implement hamburger morph animation

**Files:**
- Modify: `index.html`, `about.html`, `contact.html` (hamburger SVG + mobile menu)
- Modify: `css/style.css`
- Modify: `js/main.js`

- [ ] **Step 1: Update hamburger SVG in nav pages**

In `index.html`, `about.html`, `contact.html` — replace the hamburger button SVG with one that has identifiable lines for animation:

```html
<button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line class="hamburger-top" x1="4" y1="6" x2="20" y2="6"/>
    <line class="hamburger-mid" x1="4" y1="12" x2="20" y2="12"/>
    <line class="hamburger-bot" x1="4" y1="18" x2="20" y2="18"/>
  </svg>
</button>
```

- [ ] **Step 2: Remove separate `.mobile-menu-close` button from all nav pages**

Remove the `<button class="mobile-menu-close">...</button>` element from the mobile menu in `index.html`, `about.html`, `contact.html`.

- [ ] **Step 3: Add hamburger morph CSS**

```css
.nav-hamburger svg line {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

.nav-hamburger.is-open .hamburger-top {
  transform: translate(0, 6px) rotate(45deg);
}

.nav-hamburger.is-open .hamburger-mid {
  opacity: 0;
}

.nav-hamburger.is-open .hamburger-bot {
  transform: translate(0, -6px) rotate(-45deg);
}
```

Remove the `.mobile-menu-close` CSS rules.

- [ ] **Step 4: Update main.js to toggle via single button**

Replace the mobile nav section in `main.js`:

```javascript
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    overlay.addEventListener('click', closeMenu);
  }
```

- [ ] **Step 5: Add mobile menu item stagger animation**

In `animations.js`, add to nav init:

```javascript
  // Mobile menu link stagger (triggered when menu opens)
  function initMobileMenuStagger() {
    var hamburger = document.querySelector('.nav-hamburger');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu || typeof gsap === 'undefined') return;

    // Use MutationObserver to detect when .open is added
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (m.attributeName === 'class' && mobileMenu.classList.contains('open')) {
          var links = mobileMenu.querySelectorAll('a');
          gsap.from(links, {
            x: 30, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out'
          });
        }
      });
    });
    observer.observe(mobileMenu, { attributes: true });
  }
```

- [ ] **Step 6: Commit**

```bash
git add index.html about.html contact.html css/style.css js/main.js js/animations.js
git commit -m "feat: morph hamburger to X, remove separate close button, add menu stagger"
```

---

### Task 20: Implement nav logo shimmer with Splitting.js

**Files:**
- Modify: `index.html`, `about.html`, `contact.html`
- Modify: `js/animations.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add `data-splitting` to nav logo in all 3 nav pages**

```html
<a href="index.html" class="nav-logo" data-splitting>LUXEBRAND</a>
```

- [ ] **Step 2: Add shimmer CSS**

```css
.nav-logo .char {
  display: inline-block;
  opacity: 0;
}

.nav-logo.is-revealed .char {
  opacity: 1;
}
```

- [ ] **Step 3: Add logo animation to animations.js**

```javascript
  function initLogoAnimation() {
    if (typeof Splitting === 'undefined' || typeof gsap === 'undefined') return;

    var logo = document.querySelector('.nav-logo[data-splitting]');
    if (!logo) return;

    Splitting({ target: logo });
    logo.classList.add('is-revealed');

    var chars = logo.querySelectorAll('.char');
    // Entrance shimmer
    gsap.from(chars, {
      opacity: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2
    });

    // Hover re-shimmer
    logo.addEventListener('mouseenter', function () {
      gsap.fromTo(chars,
        { color: '' },
        { color: 'var(--gold-hover)', duration: 0.3, stagger: 0.04, ease: 'power2.out',
          onComplete: function () {
            gsap.to(chars, { color: '', duration: 0.3, stagger: 0.04 });
          }
        }
      );
    });
  }
```

- [ ] **Step 4: Commit**

```bash
git add index.html about.html contact.html js/animations.js css/style.css
git commit -m "feat: add nav logo character shimmer animation"
```

---

## Chunk 6: Three.js Particle System

### Task 21: Implement Three.js gold particle background

**Files:**
- Create: `js/particles.js`

- [ ] **Step 1: Write particles.js**

```javascript
/* ============================================================
   particles.js — Three.js gold particle system
   Shared by homepage hero and login/register/forgot-password
   ============================================================ */
(function () {

  // WebGL availability check
  function hasWebGL() {
    try {
      var canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!hasWebGL() || typeof THREE === 'undefined') return;

  function createParticleScene(container, options) {
    var opts = Object.assign({
      particleCount: 200,
      speed: 0.0005,
      color: 0xC9A96E,
      size: 2,
      mouseInfluence: 0.5
    }, options);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 300;

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.setAttribute('role', 'presentation');
    container.style.position = 'relative';
    container.insertBefore(renderer.domElement, container.firstChild);

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(opts.particleCount * 3);
    var velocities = [];

    for (var i = 0; i < opts.particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
      velocities.push({
        x: (Math.random() - 0.5) * opts.speed * 2,
        y: (Math.random() - 0.5) * opts.speed * 2,
        z: (Math.random() - 0.5) * opts.speed
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var material = new THREE.PointsMaterial({
      color: opts.color,
      size: opts.size,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    var points = new THREE.Points(geometry, material);
    scene.add(points);

    var mouseX = 0, mouseY = 0;
    container.addEventListener('mousemove', function (e) {
      var rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    });

    var animId = null;
    var isReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animate() {
      animId = requestAnimationFrame(animate);

      if (!isReducedMotion) {
        var pos = geometry.attributes.position.array;
        for (var i = 0; i < opts.particleCount; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;

          // Wrap around
          if (pos[i * 3] > 300) pos[i * 3] = -300;
          if (pos[i * 3] < -300) pos[i * 3] = 300;
          if (pos[i * 3 + 1] > 300) pos[i * 3 + 1] = -300;
          if (pos[i * 3 + 1] < -300) pos[i * 3 + 1] = 300;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      // Mouse parallax influence on camera
      camera.position.x += (mouseX * 30 * opts.mouseInfluence - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 30 * opts.mouseInfluence - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    // Resize handler
    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    // Return dispose function
    return {
      dispose: function () {
        if (animId) cancelAnimationFrame(animId);
        window.removeEventListener('resize', onResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }

  // Init particles on appropriate containers
  var scenes = [];

  function init() {
    // Dispose existing
    scenes.forEach(function (s) { s.dispose(); });
    scenes = [];

    // Homepage hero
    var hero = document.querySelector('.hero');
    if (hero) {
      scenes.push(createParticleScene(hero, { particleCount: 200, speed: 0.0005 }));
    }

    // Login/register/forgot-password branding panel
    var branding = document.querySelector('.login-branding');
    if (branding) {
      var count = window.innerWidth < 768 ? 50 : 100;
      scenes.push(createParticleScene(branding, { particleCount: count, speed: 0.0003 }));
    }
  }

  document.addEventListener('DOMContentLoaded', init);

  // Expose for Barba re-init
  window.LuxeParticles = {
    reinit: init,
    dispose: function () {
      scenes.forEach(function (s) { s.dispose(); });
      scenes = [];
    }
  };

})();
```

- [ ] **Step 2: Add CSS to ensure hero has proper positioning for canvas and suppress existing backgrounds**

Add to `style.css`:

```css
/* When Three.js canvas is active, suppress the background image */
.hero.has-particles {
  background: var(--primary);
}

.hero {
  position: relative;
  overflow: hidden;
}

.hero canvas {
  position: absolute;
  inset: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* When Three.js canvas is active, suppress the gradient animation */
.login-branding.has-particles {
  background: var(--primary);
  animation: none;
}

.login-branding {
  position: relative;
  overflow: hidden;
}

.login-branding canvas {
  position: absolute;
  inset: 0;
}

.login-branding > *:not(canvas) {
  position: relative;
  z-index: 1;
}
```

In `particles.js`, after inserting the canvas, add the `.has-particles` class to the container:

```javascript
container.classList.add('has-particles');
```

This ensures the CSS background image on `.hero` and the CSS gradient animation on `.login-branding` are suppressed when Three.js particles are active. If WebGL is unavailable (fallback), the class is never added and the original backgrounds remain.

- [ ] **Step 3: Commit**

```bash
git add js/particles.js css/style.css
git commit -m "feat: implement Three.js gold particle system for hero and auth pages"
```

---

## Chunk 7: Barba.js Page Transitions

### Task 22: Implement Barba.js page transitions

**Files:**
- Create: `js/transitions.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add transition overlay CSS**

```css
/* --------------------------------------------------------------------------
   Page Transition Overlay
   -------------------------------------------------------------------------- */
.transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gold);
  z-index: 9998;
  transform: scaleX(0);
  transform-origin: left;
  pointer-events: none;
}
```

- [ ] **Step 2: Write transitions.js**

```javascript
/* ============================================================
   transitions.js — Barba.js page transitions
   ============================================================ */
(function () {
  if (typeof barba === 'undefined') return;

  // Create transition overlay
  var overlay = document.createElement('div');
  overlay.className = 'transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  barba.init({
    preventRunning: true,
    transitions: [{
      name: 'gold-wipe',

      before: function (data) {
        // Hide nav when entering auth pages
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
        // Dispose Three.js scenes
        if (window.LuxeParticles) window.LuxeParticles.dispose();

        return new Promise(function (resolve) {
          if (typeof gsap !== 'undefined') {
            gsap.to(overlay, {
              scaleX: 1,
              duration: 0.6,
              ease: 'power2.inOut',
              onComplete: resolve
            });
          } else {
            resolve();
          }
        });
      },

      enter: function (data) {
        // Scroll to top
        window.scrollTo(0, 0);
        if (window.LuxeAnimations) {
          var lenis = window.LuxeAnimations.getLenis();
          if (lenis) lenis.scrollTo(0, { immediate: true });
        }

        return new Promise(function (resolve) {
          if (typeof gsap !== 'undefined') {
            gsap.to(overlay, {
              scaleX: 0,
              duration: 0.6,
              ease: 'power2.inOut',
              transformOrigin: 'right',
              onComplete: function () {
                overlay.style.transformOrigin = 'left';
                resolve();
              }
            });
          } else {
            resolve();
          }
        });
      },

      after: function (data) {
        // Show nav when leaving auth pages and entering nav pages
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

        // Re-init all modules
        if (window.LuxeAnimations) window.LuxeAnimations.reinit();
        if (window.LuxeCursor) window.LuxeCursor.reinit();
        if (window.LuxeParticles) window.LuxeParticles.reinit();

        // Re-run Splitting on new page
        if (typeof Splitting !== 'undefined') Splitting();

        // Re-init main.js form handlers
        if (window.LuxeMain) window.LuxeMain.reinit();

        // Virtual page view for analytics
        if (typeof window.dataLayer !== 'undefined') {
          window.dataLayer.push({
            event: 'virtualPageView',
            pagePath: window.location.pathname
          });
        }

        // Refresh ScrollTrigger
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }
    }]
  });

})();
```

- [ ] **Step 3: Refactor main.js to expose reinit function**

Replace the entire `js/main.js` with:

```javascript
/* ============================================================
   main.js — Luxury Brand Static Site
   Mobile nav toggle, fake form submission, scroll arrows
   ============================================================ */

function initMain() {

  /* Mobile Navigation */
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var overlay = document.querySelector('.mobile-overlay');

  function openMenu() {
    mobileMenu.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    overlay.addEventListener('click', closeMenu);
  }

  /* Fake Form Submission */
  document.querySelectorAll('form[data-fake-submit]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (form.hasAttribute('data-success-replace')) {
        var successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          var card = form.closest('.login-card');
          if (card) card.classList.add('is-flipped');
          form.style.display = 'none';
          successEl.style.display = 'block';
        }
        return;
      }

      var confirmation = form.parentElement.querySelector('.form-confirmation');
      if (!confirmation) return;

      confirmation.textContent = form.getAttribute('data-confirm-message');
      confirmation.classList.add('visible');
      form.reset();

      setTimeout(function () {
        confirmation.classList.remove('visible');
      }, 5000);
    });
  });

  /* Category Scroll Arrows */
  var scrollTrack = document.querySelector('.scroll-track');
  var arrowLeft = document.querySelector('.scroll-arrow-left');
  var arrowRight = document.querySelector('.scroll-arrow-right');

  if (scrollTrack && arrowLeft && arrowRight) {
    var scrollAmount = 296;
    arrowLeft.addEventListener('click', function () {
      scrollTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    arrowRight.addEventListener('click', function () {
      scrollTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

document.addEventListener('DOMContentLoaded', initMain);

window.LuxeMain = { reinit: initMain };
```

- [ ] **Step 4: Commit**

```bash
git add js/transitions.js css/style.css js/main.js
git commit -m "feat: implement Barba.js page transitions with gold wipe effect"
```

---

## Chunk 8: Auth Page Animations

### Task 23: Implement login/register/forgot-password animations

**Files:**
- Modify: `js/animations.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add auth page entrance CSS**

```css
/* Auth page initial states */
.login-card {
  will-change: transform, opacity;
}

.login-logo,
.login-tagline {
  will-change: transform, opacity;
}
```

- [ ] **Step 2: Add auth page animations to animations.js**

```javascript
  /* ----------------------------------------------------------
     Auth Page Animations (login, register, forgot-password)
     ---------------------------------------------------------- */
  function initAuthAnimations() {
    if (typeof gsap === 'undefined') return;

    // Logo + tagline reveal
    var logo = document.querySelector('.login-logo');
    var tagline = document.querySelector('.login-tagline');

    if (logo) {
      if (typeof Splitting !== 'undefined') {
        Splitting({ target: logo });
        var chars = logo.querySelectorAll('.char');
        gsap.from(chars, { opacity: 0, y: 20, duration: 0.5, stagger: 0.04, ease: 'power2.out', delay: 0.3 });
      } else {
        gsap.from(logo, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 0.3 });
      }
    }

    if (tagline) {
      gsap.from(tagline, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out', delay: 0.8 });
    }

    // Glass card entrance
    var card = document.querySelector('.login-card');
    if (card) {
      gsap.from(card, { scale: 0.95, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.3 });
    }

    // Form fields stagger
    var formGroups = document.querySelectorAll('.login-card .form-group');
    if (formGroups.length) {
      gsap.from(formGroups, { y: 15, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.6 });
    }

    // Submit button
    var submitBtn = document.querySelector('.login-card .btn');
    if (submitBtn) {
      gsap.from(submitBtn, { opacity: 0, y: 10, duration: 0.4, ease: 'power2.out', delay: 1.0 });
    }
  }
```

Add `initAuthAnimations()` to DOMContentLoaded and reinit.

- [ ] **Step 3: Update register success state to use 3D flip**

Add CSS for card flip:

```css
.login-card {
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

.login-card.is-flipped {
  transform: rotateY(180deg);
}

.login-card .form-success {
  backface-visibility: hidden;
  transform: rotateY(180deg);
}
```

Update register form success handler in `main.js` to add `.is-flipped` class instead of toggling display:

For register's `data-success-replace` form, instead of `form.style.display = 'none'`, add:
```javascript
form.closest('.login-card').classList.add('is-flipped');
form.style.display = 'none';
successEl.style.display = 'block';
```

- [ ] **Step 4: Add login success spinner SVG**

In `login.html`, replace the existing `.form-confirmation` div with a styled success area. After the form, add:

```html
<div class="form-confirmation">
  <svg class="login-spinner" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="var(--gold)" stroke-width="2" stroke-dasharray="88" stroke-dashoffset="88" stroke-linecap="round"/>
  </svg>
  <span></span>
</div>
```

Add CSS for the spinner:

```css
.login-spinner {
  animation: spinnerDash 1.5s ease-in-out infinite, spinnerRotate 1.5s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spinnerDash {
  0% { stroke-dashoffset: 88; }
  50% { stroke-dashoffset: 22; }
  100% { stroke-dashoffset: 88; }
}

@keyframes spinnerRotate {
  100% { transform: rotate(360deg); }
}
```

When the login form submits, the confirmation message now shows with the gold spinner alongside "Accessing your private portfolio..."

- [ ] **Step 5: Add password show/hide toggle to auth pages**

In `login.html`, `register.html`: wrap each password input in a `.password-wrapper` and add a toggle button:

```html
<div class="form-group">
  <div class="password-wrapper">
    <input type="password" id="login-password" class="form-input" required>
    <button type="button" class="password-toggle" aria-label="Show password">
      <svg class="eye-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      <svg class="eye-closed" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    </button>
  </div>
  <label for="login-password">Password</label>
</div>
```

Add CSS:

```css
.password-wrapper {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: var(--gold);
}
```

Add to `main.js` init function:

```javascript
  /* Password Toggle */
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
```

- [ ] **Step 6: Add CTA button hover gold sweep CSS**

```css
.btn-primary {
  background: linear-gradient(to right, var(--gold-hover) 50%, var(--gold) 50%);
  background-size: 200% 100%;
  background-position: right;
  transition: background-position 0.4s ease, color 0.2s ease, box-shadow 0.3s ease;
}

.btn-primary:hover {
  background-position: left;
}
```

- [ ] **Step 5: Commit**

```bash
git add js/animations.js css/style.css js/main.js
git commit -m "feat: add auth page entrance animations and button hover sweep"
```

---

## Chunk 9: Scroll Indicator, Active Link Pulse, Reduced Motion, Final Polish

### Task 24: Add hero scroll indicator

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/animations.js`

- [ ] **Step 1: Add scroll indicator HTML to homepage hero**

In `index.html`, inside `.hero-content`, after `.hero-ctas`:

```html
<div class="scroll-indicator" aria-hidden="true">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
</div>
```

- [ ] **Step 2: Add scroll indicator CSS**

```css
.scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--gold);
  animation: scrollPulse 2s ease-in-out infinite;
  transition: opacity 0.5s ease;
}

.scroll-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

@keyframes scrollPulse {
  0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
  50% { transform: translateX(-50%) translateY(8px); opacity: 0.5; }
}
```

- [ ] **Step 3: Hide on first scroll**

In `animations.js`:

```javascript
  function initScrollIndicator() {
    var indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    function onScroll() {
      if (window.scrollY > 50) {
        indicator.classList.add('hidden');
        window.removeEventListener('scroll', onScroll);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }
```

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css js/animations.js
git commit -m "feat: add animated scroll indicator to homepage hero"
```

---

### Task 25: Add active nav link pulse animation

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add pulse keyframe for active link**

```css
.nav-links a.active::after {
  width: 100%;
  animation: activePulse 1.5s ease-out 0.5s 1;
}

@keyframes activePulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add pulse animation on active nav link"
```

---

### Task 26: Add contact/footer link hover underline animation

**Files:**
- Modify: `css/style.css`

- [ ] **Step 1: Add underline draw CSS for email/phone on contact page**

```css
.contact-detail-item p {
  position: relative;
  display: inline-block;
}

.contact-detail-item a,
.contact-detail-item p {
  position: relative;
}

.contact-details a::after,
.contact-detail-item p::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.contact-details a:hover::after,
.contact-detail-item:hover p::after {
  width: 100%;
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add animated underline on contact detail hover"
```

---

### Task 27: Ensure reduced motion and accessibility compliance

**Files:**
- Modify: `css/style.css`
- Modify: `js/animations.js`

- [ ] **Step 1: Update reduced motion CSS**

Replace the existing `@media (prefers-reduced-motion: reduce)` block:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .scroll-indicator {
    animation: none;
  }

  body::after {
    display: none;
  }

  [data-splitting] .char {
    opacity: 1;
    transform: none;
  }

  .cursor-dot,
  .cursor-circle {
    display: none;
  }
}
```

- [ ] **Step 2: Add reduced motion check in animations.js**

At the top of the IIFE:

```javascript
  var isReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
```

Wrap all GSAP animation calls (ScrollTrigger, from, to) in `if (!isReducedMotion)` checks. For reduced motion, just set final states directly (opacity: 1, transforms: none).

- [ ] **Step 3: Commit**

```bash
git add css/style.css js/animations.js
git commit -m "feat: ensure all animations respect prefers-reduced-motion"
```

---

### Task 28: Final integration — ensure all init functions are called and cleanup

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Verify the DOMContentLoaded handler calls all init functions in order**

```javascript
  document.addEventListener('DOMContentLoaded', function () {
    initLenis();
    initScrollProgress();
    initMagnetic();
    initNavAnimation();
    initHeroReveal();
    initHomepageAnimations();
    initAboutAnimations();
    initContactAnimations();
    initFooterAnimations();
    initTiltCards();
    initDragScroll();
    initProgressDots();
    initFloatingLabels();
    initAuthAnimations();
    initScrollIndicator();
    initLogoAnimation();
    initMobileMenuStagger();
  });
```

- [ ] **Step 2: Verify reinit function includes all necessary re-inits**

```javascript
  window.LuxeAnimations = {
    reinit: function () {
      if (lenis) { lenis.destroy(); lenis = null; }
      // Kill all ScrollTrigger instances
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
      }

      initLenis();
      initScrollProgress();
      initMagnetic();
      initNavAnimation();
      initHeroReveal();
      initHomepageAnimations();
      initAboutAnimations();
      initContactAnimations();
      initFooterAnimations();
      initTiltCards();
      initDragScroll();
      initProgressDots();
      initFloatingLabels();
      initAuthAnimations();
      initScrollIndicator();
      initLogoAnimation();
      initMobileMenuStagger();
    },
    getLenis: function () { return lenis; }
  };
```

- [ ] **Step 3: Test all pages by opening in browser**

Verify manually:
- `index.html` — particles, hero text reveal, category tilt/drag, product hover, trust banner, scroll progress, custom cursor
- `about.html` — hero reveal, mission columns slide, values card tilt, footer stagger
- `contact.html` — floating labels, focus effects, social bounce, detail underlines
- `login.html` — particles on branding panel, card entrance, field stagger, floating labels
- `register.html` — same as login + dropdown + 3D flip success
- `forgot-password.html` — same as login + success message
- Navigation between pages — gold wipe transition
- Mobile — no cursor, native scroll, hamburger morph, menu stagger
- Reduced motion — all animations disabled

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: finalize visual upgrade — integration and cleanup"
```
