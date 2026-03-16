# LuxeBrand Visual Upgrade — Design Spec

## Overview

A comprehensive visual and interaction overhaul of the LuxeBrand static site (6 pages, hosted on GitHub Pages). The goal: transform a well-structured luxury site into a bold, expressive, interactive experience — SSENSE/Farfetch-level energy with 3D elements, page transitions, custom cursor, and scroll-driven animations on every page.

Pages: `index.html`, `about.html`, `contact.html`, `login.html`, `register.html`, `forgot-password.html`.

## Tech Stack

Libraries loaded via CDN script tags where available. GSAP Club plugins self-hosted as local JS files. No build step required.

| Library | Source | Purpose | Approx Size |
|---------|--------|---------|-------------|
| GSAP core + ScrollTrigger | CDN (cdnjs) | Scroll animations, timelines | ~45KB |
| Splitting.js | CDN (unpkg) | Character-level text split for animation targets | ~3KB |
| Lenis | CDN (unpkg) | Smooth inertia scroll | ~15KB |
| Barba.js | CDN (unpkg) | Seamless page transitions | ~7KB |
| Three.js | CDN (unpkg) | 3D particle hero backgrounds | ~150KB |

Total: ~220KB from CDN.

**Note on GSAP SplitText and InertiaPlugin**: These are GSAP Club (paid) plugins not available on public CDNs. We use **Splitting.js** (free, CDN-available) for character-level targeting instead of SplitText. For drag inertia on the category scroll track, we use a custom `requestAnimationFrame` deceleration loop instead of InertiaPlugin.

## File Structure

New JS organized by concern. CSS stays in a single file.

```
css/
  style.css          — all styling (existing, updated with new tokens + animations)
js/
  main.js            — nav toggle, form handling (existing, updated)
  animations.js      — GSAP ScrollTrigger animations, Lenis init, magnetic buttons, floating labels
  cursor.js          — custom cursor logic
  particles.js       — Three.js particle system (shared by homepage hero + login/register panels)
  transitions.js     — Barba.js page transition setup and lifecycle hooks
```

## Barba.js Container Structure

Every page wraps its content in Barba's required structure:

```html
<div data-barba="wrapper">
  <!-- nav stays OUTSIDE the container (persists across transitions) -->
  <header>...</header>

  <div data-barba="container" data-barba-namespace="home">
    <main>...</main>
    <footer>...</footer>
  </div>
</div>
```

**Login, Register, and Forgot Password pages** have no nav/footer. Their structure:

```html
<div data-barba="wrapper">
  <div data-barba="container" data-barba-namespace="login">
    <div class="login-layout">...</div>
  </div>
</div>
```

When transitioning between nav pages and no-nav pages, the nav element fades out/in during the transition. Barba's `before`/`after` hooks toggle nav visibility.

A `barba.hooks.after()` callback fires a virtual page view event for analytics compatibility.

## Refined Color Palette

Same warm luxury DNA, modernized for sharper contrast and sophistication.

| Token | Current | New | Rationale |
|-------|---------|-----|-----------|
| `--primary` | `#1C1917` | `#0F0F0F` | Deeper near-black, more modern |
| `--secondary` | `#44403C` | `#1A1A1A` | Cleaner dark surface |
| `--gold` | `#CA8A04` | `#C9A96E` | Champagne gold, more sophisticated |
| `--gold-hover` | `#EAB308` | `#D4BC8B` | Softer highlight |
| `--bg` | `#FAFAF9` | `#F5F0EB` | Warm cream, richer feel |
| `--text` | `#0C0A09` | `#0A0A0A` | Slightly neutral |
| `--text-muted` | `#78716C` | `#6B6B6B` | Neutral gray |

New tokens:
- `--accent`: `#2A2A2A` — subtle UI surfaces
- `--grain-opacity`: `0.03` — film grain overlay
- `--glow`: `rgba(201, 169, 110, 0.15)` — gold glow for hover states
- `--z-progress`: `51` — scroll progress bar, above nav

**Favicon**: `forgot-password.html` currently uses an inline SVG data URI favicon with old colors. Normalize it to use `href="images/favicon.svg"` like all other pages. Update `images/favicon.svg` colors to match the new palette (`--primary: #0F0F0F`, `--gold: #C9A96E`).

## Global Experience Layer

Applied across all 6 pages.

### Smooth Scroll
- Lenis with `lerp: 0.1` for buttery inertia scrolling.
- Synced with GSAP ScrollTrigger.
- Disabled on mobile (native touch scroll preferred).

### Custom Cursor
- Default cursor hidden on desktop via `cursor: none` on `body`.
- Small dot (8px, `background: var(--gold)`) + larger trailing circle (40px, `border: 1px solid var(--gold)`) with magnetic lag via `requestAnimationFrame` lerp.
- Grows to 60px on hover over interactive elements (buttons, links, cards).
- **Morph states**: The trailing circle expands to 80px and displays centered text in Montserrat 11px uppercase, `color: var(--bg)`, `background: var(--gold)`:
  - "VIEW" on product cards
  - "DRAG" on category scroll track
- `mix-blend-mode: difference` for visibility. **Exception**: over `backdrop-filter` elements (glass nav), blend mode switches to `normal` with fixed `opacity: 0.9` to avoid rendering conflicts in Safari.
- Both cursor elements are `aria-hidden="true"`, `pointer-events: none`.
- Magnetic effects and cursor morphs are **pointer-only**. Keyboard users see standard gold focus outlines. No cursor rendering on touch devices.

### Magnetic Buttons
- All CTAs and nav links have magnetic pull within ~100px radius.
- Button shifts toward cursor, snaps back with elastic easing on leave.
- Pointer-only — no effect on keyboard focus.

### Page Transitions (Barba.js)
- Gold line sweeps left to right (~0.6s) on navigation.
- Content fades in behind the wipe.
- URL updates, scroll resets, Lenis resets, GSAP animations re-initialize per page.
- Three.js scenes are disposed and re-created per page to prevent memory leaks.
- `barba.hooks.after()` fires a virtual page view event for analytics.
- Graceful fallback to standard navigation if JS fails.

### Film Grain Overlay
- CSS `body::after` pseudo-element with inline SVG noise pattern (base64 data URI, no HTTP request).
- `opacity: 0.03`, `pointer-events: none`, `position: fixed`, full viewport coverage.
- Adds analog warmth without impacting interaction.

### Scroll Progress Indicator
- **Separate fixed element** at `top: 0`, `z-index: 51` (new token `--z-progress: 51`). Independent of the nav bar.
- 2px gold line, grows left to right with scroll position.
- Remains visible when the nav hides on scroll-down.

## Homepage

### Hero (100vh)
- **Three.js particle background**: Gold particles (`color: var(--gold)`) on dark, slow-moving. ~200 particles, small radius. Particles react to mouse position with parallax depth. **WebGL fallback**: if `WebGLRenderingContext` is unavailable, fall back to the existing `hero.jpg` background image with a dark overlay.
- **Text reveal**: "Where Rarity Meets Refinement" — Splitting.js splits into characters, GSAP staggers them in from below (`y: 30, opacity: 0`, 0.03s stagger per char). Tagline fades in 0.3s after headline completes.
- **CTAs**: Fade up with slight scale. Magnetic effect. Gold border draws on hover (animated clip-path).
- **Scroll indicator**: Animated chevron at bottom, pulses gently (`opacity` + `translateY` loop), disappears after first scroll.

### Category Scroll Track
- **3D tilt cards**: Tilt toward cursor on hover (~10deg max perspective transform). Image zooms slightly (scale 1.05) inside the card via `overflow: hidden`.
- **Drag to scroll**: Cursor morphs to "DRAG." Click-and-drag scrolling. On release, custom `requestAnimationFrame` deceleration loop provides momentum (velocity decays at 0.95 per frame).
- **Staggered entrance**: Cards slide in from right (`x: 60, opacity: 0`, 0.15s stagger) as section scrolls into view.
- **Progress dots**: One dot per card, rendered below the track. Active dot is gold and larger (8px vs 6px). Updates on scroll position. Arrows remain with glass hover glow.

### Featured Products Grid
- **Scroll-triggered stagger**: Cards fade up one by one (`y: 40, opacity: 0`, 0.15s stagger) on viewport entry.
- **Hover**: Card lifts (`translateY: -12px`), image zooms (`scale: 1.08`), gold gradient overlay fades in from bottom with "View Details." Cursor morphs to "VIEW."
- **Image reveal**: `clip-path: inset(0 100% 0 0)` animates to `inset(0 0 0 0)` on first scroll into view.

### Trust Banner
- **Staggered fade**: Each trust point fades in left to right with 0.2s stagger.
- **Gold line animation**: Decorative line above each point draws itself from `width: 0` to `width: 100%` on scroll.
- No counter animation — current content is text-only with no numeric stats.

### Introduction Strip
- **Text split reveal**: Each line fades in and slides up on viewport entry.
- **Parallax**: Text scrolls at 0.8x speed relative to background via ScrollTrigger scrub.

## About Page

### Hero (50vh)
- Same Splitting.js + GSAP text reveal as homepage. "The House" character stagger.
- **Background**: Retains `hero.jpg` background image with darkened overlay gradient. Subtle parallax (background scrolls at 0.6x).
- Grain overlay more visible on this quieter page.

### Mission Section (2-column)
- **Left (text)**: Lines reveal with stagger per paragraph (`y: 30, opacity: 0`, 0.1s stagger).
- **Right (image)**: `clip-path: inset(0 100% 0 0)` wipe reveal from left. Slow Ken Burns drift on hover (scale 1.03, translate 2%). Gold border frame draws itself on scroll (`border-color` transitions from transparent to gold, one side at a time clockwise).
- **Column entrance**: Left slides from left (`x: -40`), right from right (`x: 40`), meeting in the middle. Triggered at 30% viewport entry.

### Values Grid (3 cards)
- Scale 0.9 to 1.0 + fade in, 0.2s stagger left to right.
- Gold top border draws from `width: 0` to `width: 100%` on scroll.
- Hover: lift (`translateY: -8px`) + gold glow shadow (`box-shadow: 0 8px 30px var(--glow)`) + background shifts slightly lighter.
- 3D tilt on cursor move, same perspective treatment as category cards.

## Contact Page

### Hero (40vh)
- Same Splitting.js + GSAP character split text reveal. "Private Enquiries" stagger.
- **Background**: Same as About — retains `hero.jpg` with darkened overlay and subtle parallax.

### Contact Form (glass-light card)
- **Field stagger**: Inputs fade up (`y: 20, opacity: 0`, 0.1s stagger) on form viewport entry.
- **Floating labels**: Remove `placeholder` attributes from inputs. Reposition `<label>` elements inside `.form-group` using `position: absolute`. Label sits inside the input area, then translates up (`translateY: -24px`) and shrinks (`scale: 0.85`, `color: var(--gold)`) on `:focus` or when input has a value (detected via JS `input` event adding a `.has-value` class). Transition: `0.3s ease`.
- **Focus effects**: Border animates to gold from left (`border-image: linear-gradient(to right, var(--gold) X%, var(--border) X%) 1`, animated via JS). Subtle gold glow (`box-shadow: 0 0 0 3px var(--glow)`).
- **Submit button**: Magnetic. Gold fill sweeps from left on hover (`background-position` shift on linear-gradient). Text inverts to dark.
- **Success state**: Fields collapse upward (`height` + `opacity` transition). Success message scales in from center (`scale: 0.9` to `1`). Gold checkmark draws itself (SVG `stroke-dashoffset` animation from full length to 0).
- **Error states**: All form submissions simulate success (no failure states for this static demo). No validation error styling needed.

### Contact Details (sidebar)
- Each detail line staggers in (`y: 20, opacity: 0`, 0.15s stagger).
- Social icons: bounce entrance (`scale: 0` to `1` with `back` easing). Magnetic hover, gold glow lift.
- Email/phone: gold underline draws on hover from left (`width: 0` to `width: 100%`, `background: var(--gold)`, `height: 1px`).

## Login, Register & Forgot Password Pages

Shared split-screen `.login-layout` with unified treatment. All three pages get the same base experience.

### Left Panel (branding)
- **Three.js particle background**: Same gold particle system as homepage hero, but slower drift speed and fewer particles (~100). Replaces current CSS gradient animation. **WebGL fallback**: if unavailable, fall back to the existing CSS animated gradient.
- **Logo + tagline**: Fade in with Y-translate (`y: 20, opacity: 0`). Splitting.js on logo, characters stagger in. Tagline follows 0.3s later.

### Right Panel (form)
- **Glass card entrance**: Scale 0.95 to 1.0 + fade on page load. Backdrop-filter animates from `blur(0)` to `blur(16px)`.
- **Fields**: Stagger top to bottom (`y: 15, opacity: 0`, 0.1s delay each).
- **Floating labels**: Same treatment as contact page — remove `placeholder` attributes, absolute-position labels inside `.form-group`, float up on focus/value with `.has-value` class via JS. Applied to all form inputs site-wide (contact, login, register, forgot-password).
- **Focus effects**: Gold border animation from left, subtle glow.
- **Submit button**: Magnetic. Gold fill sweep on hover.
- **Password fields**: Show/hide toggle button (eye icon). Smooth icon crossfade (`opacity` transition).
- **Error states**: All form submissions simulate success (static demo). No validation error styling.

### Login-specific
- **Success state**: Card content fades out. "Accessing your private portfolio..." with gold loading spinner (SVG circle, animated `stroke-dashoffset`, 1.5s loop).

### Register-specific
- **Dropdown (Area of Interest)**: Custom styled `<select>` with gold accent border on focus. Native dropdown on mobile.
- **Success state**: Card flips on 3D Y-axis (`rotateY: 180deg`, `backface-visibility: hidden`, 0.6s). Back face reveals success message. Gold checkmark draws. "Return to LuxeBrand" fades in after flip.

### Forgot Password-specific
- Same left panel, glass card entrance, floating labels, and focus effects.
- **Success state**: Same treatment as login — content fades out, replaced by confirmation message: "A reset link has been sent to your email." Gold checkmark draws.

### Shared Mobile (< 768px)
- Left panel compresses to header strip (~15vh). Three.js simplified to ~50 particles, or CSS gradient fallback if performance is poor.
- Form takes full screen below.
- Barba.js crossfade between login/register/forgot-password.

## Navigation & Footer

### Navigation (fixed glass bar)
- **Entrance**: Slides down from above on page load (`translateY: -100%` to `0`, 0.4s ease-out).
- **Scroll behavior**: Hides on scroll down (`translateY: -100%`), reveals on scroll up. Transition: 0.3s ease. Scroll progress bar remains visible (separate element, see above).
- **Logo**: Splitting.js character shimmer on page load (opacity wave left to right, 0.05s stagger). Gold color sweep on hover (same stagger effect).
- **Nav links**: Magnetic pull. Underline draws from left on hover (`width: 0` to `100%`, 0.3s). Active page underline pulses once on load (`opacity` keyframe).
- **Hamburger (mobile)**: Single `.nav-hamburger` toggle button. Remove the separate `.mobile-menu-close` button. Three SVG `<line>` elements animate via CSS transforms: top line rotates +45deg and translates down, bottom line rotates -45deg and translates up, middle line fades to `opacity: 0`. Toggled via `.is-open` class. Menu items stagger in from right (`x: 30, opacity: 0`, 0.1s stagger). Dark overlay fades in.
- **Glass effect**: Backdrop blur increases on scroll (8px at top, 20px after 100px scroll). Controlled via ScrollTrigger.
- **Login/Register/Forgot Password pages**: Nav is hidden. Barba `before` hook hides nav when entering these namespaces, `after` hook shows nav when leaving.

### Footer
- **Gold top border**: Draws from `width: 0` to `100%` left to right on viewport entry.
- **Column stagger**: Three columns fade up left to right (`y: 30, opacity: 0`, 0.2s stagger).
- **Social icons**: Bounce entrance, magnetic hover, gold glow.
- **Links**: Gold underline draws on hover, matching nav link treatment.
- **Copyright**: Fades in last, 0.3s after columns complete.

## Accessibility & Performance

### Accessibility
- All animations respect `prefers-reduced-motion: reduce` — animations reduced to simple opacity fades (no transforms, no staggers) or disabled entirely. Three.js particles become static.
- Custom cursor is pointer-only, `aria-hidden="true"`. Keyboard users see gold focus outlines (`2px solid var(--gold)`, `outline-offset: 2px`).
- Lenis disabled on mobile for native scroll behavior.
- All interactive elements remain keyboard-focusable.
- Three.js canvas is decorative (`aria-hidden="true"`, `role="presentation"`).
- Barba.js transitions gracefully degrade to standard navigation if JS fails.

### Performance
- Libraries loaded with `defer` to avoid blocking render.
- Three.js lazy-loaded only on pages that use it (homepage, login, register, forgot-password). In the Barba `enter` hook, dynamically create a `<script>` element with `src="js/particles.js"` and append it to the document when transitioning to a page that needs Three.js. On pages that include Three.js in their initial HTML, load it normally with `defer`.
- Below-the-fold images use `loading="lazy"`.
- Images wrapped in `<picture>` with WebP sources where available for smaller payloads.
- WebGL availability check (`!!window.WebGLRenderingContext && document.createElement('canvas').getContext('webgl')`) before initializing Three.js. Falls back to CSS gradient/background image.
- Three.js scenes disposed on page exit (Barba `leave` hook) to prevent memory leaks.
