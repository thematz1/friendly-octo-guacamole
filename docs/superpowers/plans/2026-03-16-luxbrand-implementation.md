# LuxBrand Static Site Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page static luxury goods brokerage website with liquid glass effects, horizontal scroll category track, and split-screen login — deployable to GitHub Pages with zero build step.

**Architecture:** Plain HTML pages with a shared CSS file and minimal vanilla JS. Each HTML page is self-contained (header/footer duplicated). CSS custom properties define the design system. Glass effects via `backdrop-filter` with solid fallbacks.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, scroll-snap, backdrop-filter), vanilla JavaScript, Google Fonts (Cormorant + Montserrat), inline SVGs (Lucide Icons)

**Spec:** `docs/superpowers/specs/2026-03-16-luxbrand-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `css/style.css` | All styles: reset, design tokens, typography, layout, components, glass effects, responsive, a11y, animations |
| `js/main.js` | Mobile nav toggle, form submit interception, category scroll arrows, confirmation message fade |
| `index.html` | Homepage: hero, intro strip, horizontal category track, featured items, trust banner |
| `about.html` | About page: hero, mission section, values cards |
| `contact.html` | Contact page: hero, two-column form + details |
| `login.html` | Login page: split-screen branding + glass sign-in card |

---

## Chunk 1: Foundation (CSS + JS)

### Task 1: CSS Design System & Reset

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create CSS file with reset and custom properties**

Write `css/style.css` with:
- Minimal reset (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`)
- Google Fonts `@import` — use exact URL: `@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');`
- `:root` block with all 12 color tokens from spec:
  - `--primary: #1C1917`, `--secondary: #44403C`, `--gold: #CA8A04`, `--gold-hover: #EAB308`, `--gold-dark: #92620A`, `--bg: #FAFAF9`, `--text: #0C0A09`, `--text-muted: #78716C`, `--border: #D6D3D1`, `--glass-bg: rgba(255,255,255,0.08)`, `--glass-bg-light: rgba(255,255,255,0.60)`, `--glass-border: rgba(255,255,255,0.12)`
- `html` base: `font-size: 16px`, `scroll-behavior: smooth`
- `body`: `font-family: 'Montserrat', sans-serif`, `font-weight: 400`, `line-height: 1.6`, `color: var(--text)`, `background: var(--bg)`
- Typography rules: `h1, h2, h3` use `font-family: 'Cormorant', serif` with weights/sizes per spec table
- `.sr-only` utility class for visually hidden skip links

- [ ] **Step 2: Add layout utilities and section spacing**

Add to `css/style.css`:
- `.container`: `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px` (48px at tablet+)
- `.section`: `padding: 60px 0` on mobile, `100px 0` on desktop
- Z-index custom properties: `--z-cards: 10`, `--z-sticky: 20`, `--z-overlay: 30`, `--z-nav: 50`, `--z-mobile-menu: 100`

- [ ] **Step 3: Add glass effect classes**

Add to `css/style.css`:
- `.glass` class: `background: var(--glass-bg)`, `backdrop-filter: blur(16px)`, `-webkit-backdrop-filter: blur(16px)`, `border: 1px solid var(--glass-border)`, `border-radius: 8px`
- `.glass-light` class: `background: var(--glass-bg-light)`, `backdrop-filter: blur(16px)`, `-webkit-backdrop-filter: blur(16px)`, `border: 1px solid var(--border)`, `border-radius: 8px`
- `@supports not (backdrop-filter: blur(1px))` fallback: `.glass` gets `background: rgba(28,25,23,0.9)`, `.glass-light` gets `background: rgba(250,250,249,0.95)`

- [ ] **Step 4: Add button and form input styles**

Add to `css/style.css`:
- `.btn`: shared base — `display: inline-flex`, `align-items: center`, `justify-content: center`, `min-height: 44px`, `padding: 12px 32px`, `border-radius: 4px`, `font-family: 'Montserrat'`, `font-weight: 500`, `font-size: 0.875rem`, `letter-spacing: 0.05em`, `text-transform: uppercase`, `text-decoration: none`, `cursor: pointer`, `transition: all 200ms ease-out`, `border: none`
- `.btn-primary`: `background: var(--gold)`, `color: var(--primary)`. Hover: `background: var(--gold-hover)`
- `.btn-secondary`: `background: transparent`, `border: 1px solid var(--gold)`, `color: var(--gold)`. Hover: `background: var(--gold)`, `color: var(--primary)`
- Form inputs: `.form-input` — `width: 100%`, `min-height: 44px`, `padding: 12px 16px`, `background: transparent`, `border: 1px solid var(--border)`, `border-radius: 4px`, `font-family: 'Montserrat'`, `font-size: 1rem`, `color: inherit`, `transition: border-color 200ms ease-out, box-shadow 200ms ease-out`
- `.form-input:focus`: `outline: none`, `border-color: var(--gold)`, `box-shadow: 0 0 0 3px rgba(202,138,4,0.15)`
- `.form-input::placeholder`: `color: var(--text-muted)`
- `label`: `display: block`, `margin-bottom: 6px`, `font-size: 0.875rem`, `font-weight: 500`
- Focus states for all interactive elements: `*:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }`

- [ ] **Step 5: Add navigation styles**

Add to `css/style.css`:
- `.nav`: `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: var(--z-nav)`, `background: rgba(28,25,23,0.85)`, `backdrop-filter: blur(16px)`, `-webkit-backdrop-filter: blur(16px)`, `border-bottom: 1px solid var(--glass-border)`
- `.nav-inner`: `display: flex`, `align-items: center`, `justify-content: space-between`, `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px` (48px tablet+), `height: 72px`
- `.nav-logo`: `font-family: 'Cormorant'`, `font-weight: 700`, `font-size: 1.5rem`, `color: var(--bg)`, `text-decoration: none`, `letter-spacing: 0.05em`
- `.nav-links`: `display: flex`, `gap: 32px`, `list-style: none`
- `.nav-links a`: `font-family: 'Montserrat'`, `font-weight: 500`, `font-size: 0.875rem`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--bg)`, `text-decoration: none`, `position: relative`, `transition: color 200ms ease-out`
- `.nav-links a::after`: gold underline pseudo-element — `content: ''`, `position: absolute`, `bottom: -4px`, `left: 0`, `width: 0`, `height: 2px`, `background: var(--gold)`, `transition: width 200ms ease-out`
- `.nav-links a:hover::after, .nav-links a.active::after`: `width: 100%`
- Hamburger button: `.nav-hamburger` — hidden on desktop, visible < 768px, 44x44px touch target, `aria-label="Toggle menu"`
- Mobile menu: `.mobile-menu` — fixed, right: -280px, width: 280px, height: 100vh, `background: var(--primary)`, `z-index: var(--z-mobile-menu)`, `transition: right 300ms ease-out`. `.mobile-menu.open { right: 0; }`
- `.mobile-overlay`: fixed full-screen, `background: rgba(0,0,0,0.5)`, `opacity: 0`, `pointer-events: none`, `z-index: calc(var(--z-mobile-menu) - 1)`, `transition: opacity 300ms ease-out`. `.mobile-overlay.open { opacity: 1; pointer-events: auto; }`

- [ ] **Step 6: Add footer styles**

Add to `css/style.css`:
- `.footer`: `background: var(--primary)`, `border-top: 1px solid var(--gold)`, `color: var(--bg)`, `padding: 60px 0 30px`
- `.footer-grid`: 3-column grid on desktop, single column on mobile, `gap: 40px`, `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px` (48px tablet+)
- `.footer-logo`: Cormorant 700, 1.25rem
- `.footer-tagline`: Montserrat 300, 0.875rem, `color: var(--text-muted)`
- Footer links: `color: var(--bg)`, `text-decoration: none`, hover `color: var(--gold)`
- `.footer-social`: flex row, gap 16px, SVG icons `width: 24px`, `height: 24px`, `fill: currentColor`
- `.footer-copyright`: `text-align: center`, `margin-top: 40px`, `padding-top: 20px`, `border-top: 1px solid var(--secondary)`, `font-size: 0.875rem`, `color: var(--text-muted)`

- [ ] **Step 7: Add animation and responsive utilities**

Add to `css/style.css`:
- `@media (prefers-reduced-motion: reduce)` block disabling all animations/transitions
- Responsive breakpoints via media queries:
  - `@media (min-width: 768px)` — tablet adjustments (padding, grid columns, nav)
  - `@media (min-width: 1200px)` — desktop adjustments
- Hide `.nav-hamburger` on desktop, show `.nav-links` on desktop
- Hide `.nav-links` on mobile, show `.nav-hamburger` on mobile

- [ ] **Step 8: Commit CSS foundation**

```bash
git add css/style.css
git commit -m "feat: add CSS design system, components, layout, glass effects, and responsive styles"
```

### Task 2: JavaScript — Mobile Nav, Forms, Scroll Arrows

**Files:**
- Create: `js/main.js`

- [ ] **Step 1: Create main.js with mobile nav toggle**

Write `js/main.js`:
- `DOMContentLoaded` event listener wrapping all code
- Mobile nav: query `.nav-hamburger`, `.mobile-menu`, `.mobile-overlay`, `.mobile-menu-close`
- Hamburger click: toggle `.open` on menu and overlay, toggle `aria-expanded` on hamburger
- Overlay click: close menu
- Close button click: close menu
- Extract into `openMenu()` / `closeMenu()` functions

- [ ] **Step 2: Add form submit interception**

Add to `js/main.js`:
- Query all `form[data-fake-submit]` elements
- For each form, add `submit` event listener:
  - `e.preventDefault()`
  - Find `.form-confirmation` element within the form's parent
  - Set its `textContent` to the form's `data-confirm-message` attribute
  - Set `opacity: 1`
  - After 3000ms, transition `opacity` to 0

- [ ] **Step 3: Add category scroll arrow handlers**

Add to `js/main.js`:
- Query `.scroll-track`, `.scroll-arrow-left`, `.scroll-arrow-right`
- If elements exist:
  - Left arrow click: `scrollTrack.scrollBy({ left: -296, behavior: 'smooth' })` (280px card + 16px gap)
  - Right arrow click: `scrollTrack.scrollBy({ left: 296, behavior: 'smooth' })`

- [ ] **Step 4: Commit JS**

```bash
git add js/main.js
git commit -m "feat: add JS for mobile nav, form interception, and scroll arrows"
```

---

## Chunk 2: Homepage

### Task 3: Homepage HTML

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with head, nav, and skip link**

Write `index.html`:
- `<!DOCTYPE html>`, `<html lang="en">`
- `<head>`: charset, viewport meta, `<title>LuxBrand — Private Luxury Brokerage</title>`, meta description, OG tags (`og:title`, `og:description`, `og:type=website`), preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`, link to `css/style.css`, inline SVG favicon (`<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">`) — gold "L" in Cormorant on dark `#1C1917` circle
- Skip link: `<a href="#main" class="sr-only">Skip to content</a>`
- `<header>` with `.nav` containing `.nav-inner` > logo link + `<nav>` with `.nav-links` (Home [active], About, Contact, Login) + hamburger button
- Mobile menu markup: `.mobile-overlay` + `.mobile-menu` with close button and nav links

- [ ] **Step 2: Add hero section**

Add to `index.html` after header:
- `<main id="main">`
- Hero `<section>` with class `.hero`:
  - `<div class="hero-content container">`
  - `<h1>Private Brokerage for Luxury Goods</h1>`
  - `<p class="hero-tagline">Connecting discerning collectors with authenticated luxury pieces</p>`
  - `<div class="hero-ctas">` with two buttons: "Browse Inventory" (`.btn .btn-primary`, href `#`) and "Sell With Us" (`.btn .btn-secondary`, href `#`)

- [ ] **Step 3: Add hero CSS**

Add to `css/style.css`:
- `.hero`: `min-height: 100vh`, `display: flex`, `align-items: center`, `justify-content: center`, `text-align: center`, `background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, #2c2420 100%)`, `color: var(--bg)`, `padding-top: 72px` (account for fixed nav)
- `.hero-content`: `max-width: 800px`
- `.hero h1`: `font-size: 4rem` (3rem on mobile), `font-weight: 700`, `line-height: 1.1`, `letter-spacing: -0.02em` (hero-specific values from typography table, distinct from standard H1)
- `.hero-tagline`: `font-weight: 300`, `font-size: 1.125rem`, `margin: 24px 0 40px`, `color: var(--border)` (light muted on dark)
- `.hero-ctas`: `display: flex`, `gap: 16px`, `justify-content: center`, `flex-wrap: wrap`
- `.hero .btn:hover`: add subtle glass hover — `box-shadow: 0 0 20px rgba(202,138,4,0.2)`, `backdrop-filter: blur(4px)` for a premium glass shimmer on CTA hover

- [ ] **Step 4: Add introduction strip**

Add to `index.html`:
- `<section class="section intro-strip">` with `.container`
- `<p class="intro-text">` with the spec copy
- CSS: `.intro-strip`: centered. `.intro-text`: `max-width: 720px`, `margin: 0 auto`, `text-align: center`, `font-size: 1.125rem`, `line-height: 1.8`, `color: var(--text-muted)`

- [ ] **Step 5: Add horizontal scroll category track**

Add to `index.html`:
- `<section class="section categories">` with `.container`
- `<h2>Browse Categories</h2>`
- `.scroll-track-wrapper` (position: relative) containing:
  - `.scroll-arrow-left` and `.scroll-arrow-right` buttons (each with inline SVG chevron icon from Lucide, `aria-label="Scroll left/right"`)
  - `.scroll-track`: `<div>` with 5 category cards
- Each card: `<a href="#" class="category-card" style="--angle: Xdeg">` with `<span class="category-name">Category</span>`
- Specific angle values per card: Handbags `--angle: 135deg`, Watches `--angle: 160deg`, Shoes `--angle: 180deg`, Jewelry `--angle: 200deg`, Designer Clothing `--angle: 225deg`

CSS for categories:
- `.scroll-track-wrapper`: `position: relative`
- `.scroll-track`: `display: flex`, `gap: 16px`, `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scrollbar-width: none`, `-webkit-overflow-scrolling: touch`, `padding: 16px 0`
- `.scroll-track::-webkit-scrollbar`: `display: none`
- `.category-card`: `flex: 0 0 280px`, `height: 360px`, `scroll-snap-align: start`, `border-radius: 8px`, `position: relative`, `overflow: hidden`, `display: flex`, `align-items: flex-end`, `padding: 24px`, `cursor: pointer`, `text-decoration: none`, `transition: transform 200ms ease-out, border-color 200ms ease-out`, `border: 2px solid transparent`
- `.category-card` background: `linear-gradient(var(--angle, 135deg), var(--primary), var(--secondary), #3d2e24)` — use CSS custom property `--angle` set per card
- `.category-card::after`: dark gradient overlay from bottom for text readability
- `.category-card:hover`: `transform: scale(1.02)`, `border-color: var(--gold)`
- `.category-name`: `position: relative`, `z-index: 1`, `font-family: 'Cormorant'`, `font-size: 1.5rem`, `font-weight: 600`, `color: white`
- `.scroll-track-wrapper`: must have `overflow: visible` to avoid clipping arrows
- Scroll arrows: `.scroll-arrow`: `position: absolute`, `top: 50%`, `transform: translateY(-50%)`, `width: 40px`, `height: 40px`, `border-radius: 50%`, `background: var(--glass-bg)`, `backdrop-filter: blur(16px)`, `border: 1px solid var(--glass-border)`, `color: white`, `cursor: pointer`, `z-index: var(--z-sticky)`, `display: none`. Left: `left: 8px`. Right: `right: 8px` (inset to avoid parent clipping).
- `@media (hover: hover)`: `.scroll-arrow { display: flex; align-items: center; justify-content: center; }`
- Fade edges: `.scroll-track-wrapper::before, ::after` pseudo-elements with gradient masks (transparent to `--bg`), `pointer-events: none`, `z-index: 1`, width ~40px

- [ ] **Step 6: Add featured items grid**

Add to `index.html`:
- `<section class="section featured">` with `.container`
- `<h2>Featured Pieces</h2>`
- `.featured-grid`: 4 product cards
- Each card: `<div class="product-card glass-light">`
  - `.product-image`: div with CSS gradient background, `aspect-ratio: 4/3`
  - `.product-brand`: "HERMÈS" (uppercase, small, muted)
  - `.product-name`: "Birkin 30"
  - `.product-price`: "$12,500"
  - `.btn .btn-secondary`: "View Details" linking to `#`
- Repeat for Rolex Submariner ($9,800), Chanel Classic Flap ($8,200), Cartier Love Bracelet ($6,900)

CSS:
- `.featured-grid`: `display: grid`, `grid-template-columns: 1fr` on mobile, `repeat(2, 1fr)` tablet, `repeat(4, 1fr)` desktop, `gap: 24px`
- `.product-card`: `cursor: pointer`, `transition: transform 200ms ease-out, box-shadow 200ms ease-out`, `overflow: hidden`
- `.product-card:hover`: `transform: translateY(-4px)`, `box-shadow: 0 12px 40px rgba(0,0,0,0.1)`
- `.product-image`: `aspect-ratio: 4/3`, `background: linear-gradient(...)`, `border-radius: 8px 8px 0 0`
- `.product-brand`: `text-transform: uppercase`, `font-size: 0.75rem`, `letter-spacing: 0.1em`, `color: var(--text-muted)`, `margin: 16px 16px 4px`
- `.product-name`: `font-family: 'Cormorant'`, `font-weight: 600`, `font-size: 1.25rem`, `margin: 0 16px`
- `.product-price`: `color: var(--gold-dark)`, `font-weight: 600`, `margin: 8px 16px 16px`
- Button inside card: `margin: 0 16px 16px`

- [ ] **Step 7: Add trust banner and footer**

Add to `index.html`:
- `<section class="section trust-banner">` with `.container`
- `.trust-grid`: 3 items, each with `.trust-item` > `.trust-line` (gold decorative line) + `<h3>` + `<p>`
- Trust points: "Expert Authentication" / "Secure Transactions" / "Curated Selection" with brief descriptions

CSS:
- `.trust-grid`: `display: grid`, `grid-template-columns: 1fr` mobile, `repeat(3, 1fr)` tablet+, `gap: 40px`, `text-align: center`
- `.trust-line`: `width: 40px`, `height: 2px`, `background: var(--gold)`, `margin: 0 auto 16px`

Add footer markup:
- `<footer class="footer">` with `.footer-grid` > 3 columns
- Column 1: logo + tagline
- Column 2: quick links list
- Column 3: contact info + social SVGs (Instagram, Facebook, LinkedIn from Lucide — inline `<svg>` elements at 24x24, `viewBox="0 0 24 24"`, `stroke="currentColor"`, `fill="none"`). Each social link `<a>` must have `aria-label` (e.g., `aria-label="Follow us on Instagram"`)
- `.footer-copyright` at bottom

Close `</main>`, add `<script src="js/main.js"></script>`, close `</body></html>`

- [ ] **Step 8: Verify homepage in browser**

Open `index.html` in browser. Check:
- Nav glass effect renders, logo + links visible
- Hero is full viewport, gradient smooth, CTAs styled
- Intro strip centered with comfortable line length
- Category track scrolls horizontally, snap works, arrows appear on desktop (hover)
- Featured cards have glass treatment, hover lift works
- Trust banner 3-column on desktop, stacks on mobile
- Footer 3 columns, social SVGs render, gold accent line visible
- Resize to mobile: hamburger appears, sections stack, scroll track swipes
- Test mobile menu: opens/closes, overlay dismisses it

- [ ] **Step 9: Commit homepage**

```bash
git add index.html css/style.css
git commit -m "feat: add homepage with hero, category scroll track, featured items, and trust banner"
```

---

## Chunk 3: About, Contact, Login Pages

### Task 4: About Page

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create about.html**

Write `about.html`:
- Same `<head>` as index.html but: `<title>About — LuxBrand</title>`, updated meta description and OG tags
- Same nav markup (About link gets `.active` class instead of Home)
- Same skip link

Sections:
- `.hero .hero-short` (50vh variant): "About Us" heading + subtitle
- `.mission-section .section`: two-column — left text, right `.placeholder-image` div with gradient (aspect-ratio 4:3, border-radius 8px)
- `.values-section .section`: `.values-grid` with 3 `.value-card.glass-light` cards, each with gold top border (`border-top: 2px solid var(--gold)`)
- Same footer markup as index.html

CSS additions:
- `.hero-short`: same as `.hero` but `min-height: 50vh`
- `.hero-40`: same but `min-height: 40vh` (for contact page)
- `.mission-grid`: `display: grid`, `grid-template-columns: 1fr` mobile, `1fr 1fr` tablet+, `gap: 48px`, `align-items: center`
- `.placeholder-image`: `aspect-ratio: 4/3`, `border-radius: 8px`, `background: linear-gradient(135deg, var(--primary), var(--secondary), #3d2e24)`
- `.values-grid`: `display: grid`, `grid-template-columns: 1fr` mobile, `repeat(3, 1fr)` tablet+, `gap: 24px`
- `.value-card`: `padding: 32px`, `border-top: 2px solid var(--gold)`
- `.value-card h3`: `margin-bottom: 12px`

- [ ] **Step 2: Verify about page in browser**

Open `about.html`. Check: hero 50vh, mission two-column with placeholder, values in glass cards with gold top border, footer. Resize to mobile: all stacks.

- [ ] **Step 3: Commit about page**

```bash
git add about.html css/style.css
git commit -m "feat: add about page with mission section and glass value cards"
```

### Task 5: Contact Page

**Files:**
- Create: `contact.html`

- [ ] **Step 1: Create contact.html**

Write `contact.html`:
- Same `<head>` pattern: `<title>Contact — LuxBrand</title>`, updated meta/OG
- Nav with Contact `.active`
- `.hero .hero-40`: "Get In Touch" heading + subtitle "We'd love to hear from you"
- `.contact-section .section`: `.contact-grid` (two-column)
  - Left: `.contact-form-card.glass-light` containing `<form data-fake-submit data-confirm-message="Thank you for your message. We'll be in touch shortly.">`
    - 4 fields: Name (`<input type="text" id="name">`), Email (`<input type="email" id="email">`), Subject (`<input type="text" id="subject">`), Message (`<textarea rows="5" id="message">`) — each with `<label for="fieldId">` using matching `for`/`id` pairs, and `.form-input` class
    - Submit: `.btn .btn-primary` "Send Message"
    - `.form-confirmation` div (initially empty, opacity 0)
  - Right: `.contact-details`
    - Email, phone, social SVGs (same as footer, each `<a>` with `aria-label`)
- Footer

CSS additions:
- `.contact-grid`: `display: grid`, `grid-template-columns: 1fr` mobile, `3fr 2fr` tablet+, `gap: 48px`
- `.contact-form-card`: `padding: 32px`
- `.form-group`: `margin-bottom: 20px`
- `textarea.form-input`: `resize: vertical`, `min-height: 120px`
- `.form-confirmation`: `margin-top: 16px`, `color: var(--gold-dark)`, `font-weight: 500`, `opacity: 0`, `transition: opacity 500ms ease-out`
- `.contact-details h3`: `margin-bottom: 16px`
- `.contact-detail-item`: `margin-bottom: 12px`, `display: flex`, `align-items: center`, `gap: 8px`

- [ ] **Step 2: Verify contact page**

Open `contact.html`. Check: hero 40vh, form renders with labels, focus states show gold glow, submit shows confirmation that fades, contact details on right, social icons. Mobile: stacks form-first.

- [ ] **Step 3: Commit contact page**

```bash
git add contact.html css/style.css
git commit -m "feat: add contact page with glass form card and detail sidebar"
```

### Task 6: Login Page

**Files:**
- Create: `login.html`

- [ ] **Step 1: Create login.html**

Write `login.html`:
- Same `<head>` pattern: `<title>Sign In — LuxBrand</title>`, updated meta/OG
- Include `<script src="js/main.js"></script>` before `</body>` (needed for form submit interception)
- NO nav, NO footer
- `<div class="login-layout">`:
  - `.login-branding` (left panel):
    - `<a href="index.html" class="login-logo">LUXBRAND</a>`
    - `<p class="login-tagline">Private Brokerage for Luxury Goods</p>`
  - `.login-form-panel` (right panel):
    - `.login-card.glass-light`:
      - `<h1>Sign In</h1>`
      - `<form data-fake-submit data-confirm-message="Welcome back!">`
        - Email field: `<label for="login-email">Email</label>` + `<input type="email" id="login-email" class="form-input">`
        - Password field: `<label for="login-password">Password</label>` + `<input type="password" id="login-password" class="form-input">`
        - `.btn .btn-primary .btn-full` "Sign In"
        - `.form-confirmation`
      - `<a href="#" class="login-forgot">Forgot Password?</a>`
      - `<hr class="login-divider">`
      - `<p class="login-signup">Don't have an account? <a href="#">Create one</a></p>`

CSS additions:
- `.login-layout`: `display: grid`, `grid-template-columns: 1fr 1fr`, `min-height: 100vh`
- `.login-branding`: `display: flex`, `flex-direction: column`, `align-items: center`, `justify-content: center`, `background: linear-gradient(135deg, var(--primary), var(--secondary), #2c2420)`, `background-size: 200% 200%`, `animation: gradientShift 8s ease-in-out infinite`, `padding: 48px`
- `@keyframes gradientShift`: `0% { background-position: 0% 50% }` → `50% { background-position: 100% 50% }` → `100% { background-position: 0% 50% }`
- `.login-logo`: `font-family: 'Cormorant'`, `font-weight: 700`, `font-size: 2.5rem`, `color: var(--gold)`, `text-decoration: none`, `letter-spacing: 0.05em`
- `.login-tagline`: `font-weight: 300`, `color: var(--bg)`, `margin-top: 12px`, `text-align: center`
- `.login-form-panel`: `display: flex`, `align-items: center`, `justify-content: center`, `background: var(--bg)`, `padding: 48px`
- `.login-card`: `width: 100%`, `max-width: 420px`, `padding: 48px`
- `.login-card h1`: Cormorant H1 specs, `margin-bottom: 32px`
- `.btn-full`: `width: 100%`
- `.login-forgot`: `display: block`, `text-align: center`, `margin-top: 16px`, `color: var(--text-muted)`, `font-size: 0.875rem`, `text-decoration: none`
- `.login-forgot:hover`: `color: var(--gold)`
- `.login-divider`: `border: none`, `border-top: 1px solid var(--border)`, `margin: 24px 0`
- `.login-signup`: `text-align: center`, `font-size: 0.875rem`, `color: var(--text-muted)`
- `.login-signup a`: `color: var(--gold)`, `text-decoration: none`, `font-weight: 500`

Mobile (< 768px):
- `.login-layout`: `grid-template-columns: 1fr`, `grid-template-rows: 20vh 1fr`
- `.login-card`: `padding: 24px`

- [ ] **Step 2: Verify login page**

Open `login.html`. Check: split screen renders, left panel gradient animates slowly, logo in gold links to index, right panel glass card centered, form fields have gold focus, submit shows "Welcome back!", forgot/signup links styled. Mobile: stacks with short branding header. Test `prefers-reduced-motion`: gradient animation should stop.

- [ ] **Step 3: Commit login page**

```bash
git add login.html css/style.css
git commit -m "feat: add split-screen login page with animated gradient and glass form card"
```

---

## Chunk 4: Polish & Final Verification

### Task 7: Cross-Page Verification & Polish

**Files:**
- Modify: `css/style.css`
- Modify: `index.html`, `about.html`, `contact.html`, `login.html` (if needed)

- [ ] **Step 1: Verify nav active states across all pages**

Open each page and confirm the correct nav link has the `.active` class and gold underline. Check that the LUXBRAND logo always links to `index.html`.

- [ ] **Step 2: Verify favicon on all pages**

Confirm the inline SVG favicon appears in the browser tab on all 4 pages. No 404 in dev tools console for `/favicon.ico`.

- [ ] **Step 3: Test responsive at all breakpoints**

For each page, resize browser to:
- 375px (mobile): everything stacks, hamburger visible, touch targets ≥ 44px
- 768px (tablet): grids adjust, padding increases
- 1200px+ (desktop): full layouts, scroll arrows visible on category track
- Check no horizontal overflow at any width

- [ ] **Step 4: Test accessibility**

- Tab through each page: focus rings visible on all interactive elements
- Skip link works on keyboard (Tab from page load, Enter to jump to main)
- All form inputs have visible labels
- Social icon links have `aria-label` attributes
- Hamburger button has `aria-label` and `aria-expanded`
- Check `prefers-reduced-motion` in browser dev tools: all animations/transitions stop

- [ ] **Step 5: Fix any issues found**

Address any bugs or styling issues discovered in steps 1–4.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "fix: polish cross-page consistency, responsive behavior, and accessibility"
```
