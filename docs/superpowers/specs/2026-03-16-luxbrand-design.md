# LuxBrand — Static Website Design Spec

## Overview

A static website for **LuxBrand**, a luxury goods brokerage hosted on GitHub Pages. The site connects buyers and sellers of authenticated high-end fashion items. This phase delivers 4 pages: Home, About, Contact, and Login.

All forms and interactive elements are **visual-only** — no backend, no third-party integrations. Pages that are referenced but not yet built (Browse Inventory, Sell With Us, product detail pages) link to `#` as placeholders for future development.

## Tech Stack

- Plain HTML, CSS, vanilla JavaScript
- No build step — push to GitHub Pages and it works
- Google Fonts (Cormorant, Montserrat)
- No external dependencies or frameworks

## File Structure

```
luxbrand/
├── index.html          (Home)
├── about.html          (About)
├── contact.html        (Contact)
├── login.html          (Login)
├── css/
│   └── style.css       (All styles)
├── js/
│   └── main.js         (Mobile nav, smooth scroll, interactions)
└── images/
    └── (placeholder images)
```

Shared header and footer are duplicated across the 3 page files that use them (Home, About, Contact). Login has its own layout. With only 4 pages, this is simpler than a JS-based include system and has zero runtime cost.

## Design System

### Colors

| Token              | Value                      | Usage                                  |
|--------------------|----------------------------|----------------------------------------|
| `--primary`        | `#1C1917`                  | Primary backgrounds, dark surfaces     |
| `--secondary`      | `#44403C`                  | Secondary surfaces, gradients          |
| `--gold`           | `#CA8A04`                  | Accent, CTAs, hover states             |
| `--gold-hover`     | `#EAB308`                  | Hover/active highlights                |
| `--gold-dark`      | `#92620A`                  | Gold text on light backgrounds (4.5:1) |
| `--bg`             | `#FAFAF9`                  | Page backgrounds                       |
| `--text`           | `#0C0A09`                  | Primary body text                      |
| `--text-muted`     | `#78716C`                  | Secondary/muted text                   |
| `--border`         | `#D6D3D1`                  | Dividers, input borders                |
| `--glass-bg`       | `rgba(255, 255, 255, 0.08)`| Glass card backgrounds on dark         |
| `--glass-bg-light` | `rgba(255, 255, 255, 0.60)`| Glass card backgrounds on light        |
| `--glass-border`   | `rgba(255, 255, 255, 0.12)`| Glass card borders on dark             |

### Typography

Font pairing: **Cormorant** (headings) + **Montserrat** (body). Cormorant's refined serif elegance paired with Montserrat's geometric precision.

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
```

| Element   | Font        | Weight | Size     | Line-height | Letter-spacing |
|-----------|-------------|--------|----------|-------------|----------------|
| Hero text | Cormorant   | 700    | 4rem     | 1.1         | -0.02em        |
| H1        | Cormorant   | 700    | 3rem     | 1.2         | -0.01em        |
| H2        | Cormorant   | 600    | 2rem     | 1.3         | 0              |
| H3        | Cormorant   | 600    | 1.25rem  | 1.4         | 0.01em         |
| Body      | Montserrat  | 400    | 1rem     | 1.6         | 0              |
| Small     | Montserrat  | 400    | 0.875rem | 1.5         | 0.01em         |
| Nav links | Montserrat  | 500    | 0.875rem | 1           | 0.08em         |

### Glass Effects

Used selectively on: navigation bar, login card, featured item cards, value cards on the About page.

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
}

.glass-light {
  background: var(--glass-bg-light);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 8px;
}
```

**Fallback:** For browsers without `backdrop-filter` support, glass elements fall back to solid semi-transparent backgrounds (`rgba(28, 25, 23, 0.9)` on dark, `rgba(250, 250, 249, 0.95)` on light).

### Animation & Motion

- Micro-interactions: 200–300ms duration
- Easing: `ease-out` for entrances, `ease-in` for exits
- Transform-based animations only (`transform`, `opacity`) — never animate `width`, `height`, or layout properties
- All animations wrapped in `prefers-reduced-motion` check:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Layout

- Max content width: `1200px`, centered with `margin: 0 auto`
- Content padding: `0 24px` on mobile, `0 48px` on tablet+
- Z-index scale: `10` (cards), `20` (sticky elements), `30` (overlays), `50` (nav), `100` (mobile menu)

### Shared Components

**Navigation (all pages except Login):**
- Fixed top bar with glass effect: `backdrop-filter: blur(16px)` over `--primary` at 85% opacity, z-index 50
- "LUXBRAND" logo text on the left in Cormorant 700 (links to `index.html`), nav links on the right in Montserrat 500 uppercase with wide letter-spacing
- Nav links in order: Home, About, Contact, Login
- Gold underline on hover (transition 200ms ease-out), active page gets persistent gold underline
- On screens < 768px: hamburger icon replaces nav links. Tapping it slides in a menu from the right side (width: 280px) with a dark overlay behind it. Dismissed by tapping the X button or tapping the overlay. Menu items stack vertically.
- Minimum touch target: 44x44px for hamburger icon and mobile menu links

**Footer (all pages except Login):**
- `--primary` background with 1px `--gold` accent line at the top edge
- Three-column layout:
  - Column 1: "LUXBRAND" logo text (Cormorant) + tagline "Curating luxury since 2024" (Montserrat 300)
  - Column 2: Quick links — Home, About, Contact, Login
  - Column 3: Contact info — info@luxbrand.com, +1 (555) 000-0000, social icons (Instagram, Facebook, LinkedIn — link to `#`, inline SVG from Lucide Icons at 24x24px, not emojis)
- Copyright: "© 2026 LuxBrand. All rights reserved."
- Collapses to single column on mobile

**Buttons:**
- Primary: solid `--gold` background, `--primary` text, hover brightens to `--gold-hover`
- Secondary: transparent background, 1px `--gold` border, `--gold` text, fills with `--gold` on hover (text becomes `--primary`)
- Both: `border-radius: 4px`, `transition: all 200ms ease-out`, `cursor: pointer`, min height 44px

**Form Inputs:**
- Background: transparent
- Border: 1px solid `--border`, `border-radius: 4px`
- On focus: border transitions to `--gold`, subtle gold `box-shadow` glow (`0 0 0 3px rgba(202, 138, 4, 0.15)`)
- Placeholder text: `--text-muted`
- Text color: inherits from page context (dark on light backgrounds, light on dark)
- Min height: 44px (touch target compliance)

**Form Submit Behavior:**
- All forms are visual-only. On submit:
  - Prevent default form submission
  - Show a brief "Thank you" confirmation message below the form (styled in `--gold-dark` on light backgrounds, `--gold` on dark)
  - Message fades out after 3 seconds (`opacity` transition)
  - Button shows no loading state — instant feedback

**Section Spacing:**
- 100px vertical padding between major sections on desktop
- 60px on mobile
- Generous whitespace throughout to convey premium feel

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px – 1199px
- Desktop: ≥ 1200px

Mobile-first approach: base styles target mobile, media queries scale up.

### Accessibility

- All images include descriptive `alt` text
- Form inputs have associated `<label>` elements (using `for` attribute)
- Interactive elements have visible focus states (gold outline, `outline-offset: 2px`)
- Keyboard navigation supported: tab order matches visual order
- Color contrast: `--gold` on `--primary` meets 4.5:1 ratio; `--text` on `--bg` exceeds 4.5:1; `--gold-dark` used for gold text on light backgrounds to meet 4.5:1
- Skip-to-content link hidden visually but accessible to screen readers
- `aria-label` on icon-only buttons (hamburger menu, social icons)
- `prefers-reduced-motion` respected (see Animation section)

## Page Designs

### Homepage (`index.html`)

**1. Hero Section**
- Full viewport height (100vh)
- Dark gradient background using `--primary` to `--secondary` with subtle warm undertone
- Centered content:
  - Heading: "Private Brokerage for Luxury Goods" (Cormorant 700, 4rem)
  - Tagline: "Connecting discerning collectors with authenticated luxury pieces" (Montserrat 300)
  - Two CTA buttons: "Browse Inventory" (primary) and "Sell With Us" (secondary) — link to `#`
  - CTA buttons get subtle glass hover effect

**2. Introduction Strip**
- `--bg` background
- Centered text: "LuxBrand is a premier brokerage service specializing in authenticated luxury goods. We connect sellers of fine handbags, watches, jewelry, and designer fashion with discerning buyers worldwide."
- Max-width: 720px for comfortable line length (~65-75 characters)
- Clean, generous padding

**3. Category Preview — Horizontal Scroll Track**
- `--bg` background with section heading "Browse Categories" (Cormorant H2)
- Horizontally scrolling row replacing the previous grid layout
- Container: `overflow-x: auto`, `scroll-snap-type: x mandatory`, `-webkit-overflow-scrolling: touch`
- Hide scrollbar: `scrollbar-width: none` / `::-webkit-scrollbar { display: none }`
- 5 cards, each ~280px wide, `scroll-snap-align: start`, 16px gap between cards
- Categories: Handbags, Watches, Shoes, Jewelry, Designer Clothing
- Each card: CSS gradient placeholder background (vary gradient angle per card — 135deg, 160deg, 180deg, 200deg, 225deg — so cards are visually distinguishable), category name overlaid in white Cormorant text on dark gradient overlay, `border-radius: 8px`
- Hover: subtle `scale(1.02)` + gold border appears (200ms ease-out)
- Scroll affordance: subtle left/right fade edges (CSS gradient masks) to signal more content, plus left/right arrow buttons on desktop (hidden on touch devices via `@media (hover: hover)`). Arrows are 40x40px circles with `--glass-bg` background, positioned at vertical center of the track, z-index 20. JS handles click-to-scroll by one card width.
- Cards link to `#`
- On mobile: natural touch swipe, same horizontal scroll behavior
- `cursor: pointer` on all cards

**4. Featured Items**
- `--bg` background with section heading "Featured Pieces" (Cormorant H2)
- Grid of 4 product cards:
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Each card uses `glass-light` treatment: `backdrop-filter: blur(16px)`, warm white semi-transparent background, subtle `--border` border
- Card contents: CSS gradient placeholder image area (aspect-ratio 4:3), brand name (`text-transform: uppercase`, Montserrat `0.75rem`, `letter-spacing: 0.1em`, `--text-muted`), product name (Cormorant H3), price in `--gold-dark` (Montserrat 600), "View Details" button (secondary style)
- Placeholder products: Hermès Birkin 30, Rolex Submariner, Chanel Classic Flap, Cartier Love Bracelet
- Hover: card lifts with `translateY(-4px)` + enhanced `box-shadow` (200ms ease-out)
- All links go to `#`
- `cursor: pointer` on all cards

**5. Trust Banner**
- `--bg` background
- 3 trust points in a row: "Expert Authentication", "Secure Transactions", "Curated Selection"
- Each with a small `--gold` decorative line above (40px wide, 2px thick)
- Heading in Cormorant H3, description in Montserrat body
- Stacks vertically on mobile

**6. Footer**

### About Page (`about.html`)

**1. Hero**
- 50vh height, dark gradient (`--primary` to `--secondary`)
- Heading: "About Us" (Cormorant 700)
- Subtitle: "A passion for luxury craftsmanship and trusted connections" (Montserrat 300)

**2. Mission Section**
- Two-column layout (stacks on mobile)
- Left: "At LuxBrand, we believe every luxury piece tells a story. Founded with a passion for fine craftsmanship, we serve as a trusted bridge between collectors looking to sell and those seeking their next treasured acquisition. Every item on our platform undergoes rigorous authentication to ensure quality, provenance, and peace of mind."
- Right: CSS gradient placeholder representing a luxury lifestyle image (aspect-ratio 4:3, `border-radius: 8px`)

**3. Values**
- Three columns (stacks on mobile)
- Each value presented in a `glass-light` card with a 2px `--gold` top border accent
- "Authenticity" — "Every item is verified by our team of experts using industry-leading authentication standards."
- "Exclusivity" — "We curate only the finest pieces from the world's most sought-after luxury brands."
- "Trust" — "Secure transactions and transparent processes protect both buyers and sellers."

**4. Footer**

### Contact Page (`contact.html`)

**1. Hero**
- Short hero (40vh), dark gradient (`--primary` to `--secondary`)
- Heading: "Get In Touch" (Cormorant 700)
- Subtitle: "We'd love to hear from you" (Montserrat 300)

**2. Two-Column Layout**
- Left: contact form in a `glass-light` card
  - Fields: Name (text), Email (email), Subject (text), Message (textarea)
  - Submit button (primary style, text: "Send Message")
  - On submit: shows "Thank you for your message. We'll be in touch shortly." below the form
  - On focus: gold border + gold glow `box-shadow`
- Right: contact details
  - Email: info@luxbrand.com
  - Phone: +1 (555) 000-0000
  - Social icons: Instagram, Facebook, LinkedIn (inline SVG from Lucide Icons at 24x24px, link to `#`)
- Stacks to single column on mobile (form first, then details)

**3. Footer**

### Login Page (`login.html`)

**1. Split-Screen Layout**
- No shared nav bar or footer — clean, dedicated auth screen
- Two panels side by side, each 50% viewport width, full viewport height

**2. Left Panel — Branding**
- Full-height dark gradient (`--primary` to `--secondary`, angled)
- Vertically centered content:
  - "LUXBRAND" logo text in Cormorant 700, `--gold` color (links to `index.html`)
  - Tagline: "Private Brokerage for Luxury Goods" in Montserrat 300, white
- Subtle slow gradient animation: background-position shift over 8s, `ease-in-out`, infinite loop
- Animation respects `prefers-reduced-motion` (disabled when reduced motion preferred)

**3. Right Panel — Sign In Form**
- `--bg` background, vertically centered
- Glass card (`glass-light` treatment) with generous padding (48px)
- Card contents:
  - Heading: "Sign In" (Cormorant H1)
  - Email input field (with `<label>`)
  - Password input field (with `<label>`)
  - "Sign In" button (primary style, full-width)
  - "Forgot Password?" text link in `--text-muted` (links to `#`)
  - Divider line (`--border`)
  - "Don't have an account? Create one" text with `--gold` link (links to `#`)
  - On submit: shows "Welcome back!" message below the button in `--gold-dark`

**4. Mobile Layout (< 768px)**
- Stacks vertically: branding panel becomes a short header strip (~20vh) with logo and tagline, form panel takes remaining space
- Glass card gets full-width treatment with reduced padding (24px)

## Images

All imagery is created with CSS gradients — no external image files needed for v1. This ensures:
- Zero load time for images
- No licensing concerns
- The site looks intentionally designed, not broken

Gradients use warm dark tones (`--primary`, `--secondary`, with hints of warm brown) to maintain the luxury aesthetic.

## SEO & Performance

- Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`)
- Meta descriptions and title tags per page
- Open Graph meta tags for social sharing
- Preconnect to Google Fonts for faster loading
- Minimal CSS and JS — no frameworks, no bloat
- `<html lang="en">` on all pages
- `backdrop-filter` fallback for non-supporting browsers
- Inline SVG favicon (gold "L" monogram on dark background) to avoid 404 on GitHub Pages

## Out of Scope (Future)

- Browse Inventory page
- Sell With Us page
- Product detail pages
- Trust & Verification page (authentication process details)
- Actual form submissions / backend
- User accounts and dashboards
- Checkout and payment
- CMS or product management
- Custom 404 page
- Print stylesheet
- Dark mode toggle

These are referenced via placeholder links (`#`) for future development.
