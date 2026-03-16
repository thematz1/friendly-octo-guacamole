# LuxBrand — Static Website Design Spec

## Overview

A static website for **LuxBrand**, a luxury goods brokerage hosted on GitHub Pages. The site connects buyers and sellers of authenticated high-end fashion items. This phase delivers 4 pages: Home, About, Contact, and Login.

All forms and interactive elements are **visual-only** — no backend, no third-party integrations. Pages that are referenced but not yet built (Browse Inventory, Sell With Us, product detail pages) link to `#` as placeholders for future development.

## Tech Stack

- Plain HTML, CSS, vanilla JavaScript
- No build step — push to GitHub Pages and it works
- Google Fonts (Playfair Display, Inter)
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

Shared header and footer are duplicated across the 4 page files. With only 4 pages, this is simpler than a JS-based include system and has zero runtime cost.

## Design System

### Colors

| Token          | Value     | Usage                        |
|----------------|-----------|------------------------------|
| `--black`      | `#0a0a0a` | Primary backgrounds, text    |
| `--white`      | `#fafafa` | Page backgrounds, text       |
| `--gold`       | `#b8860b` | Accent, CTAs, hover states   |
| `--gold-light` | `#d4a843` | Hover highlights             |
| `--gray`       | `#6b6b6b` | Secondary/muted text         |
| `--border`     | `#e0d5c1` | Warm gray dividers           |

### Typography

| Element   | Font              | Weight | Size    | Line-height | Letter-spacing |
|-----------|-------------------|--------|---------|-------------|----------------|
| Hero text | Playfair Display  | 700    | 4rem    | 1.1         | -0.02em        |
| H1        | Playfair Display  | 700    | 3rem    | 1.2         | -0.01em        |
| H2        | Playfair Display  | 600    | 2rem    | 1.3         | 0              |
| H3        | Playfair Display  | 600    | 1.25rem | 1.4         | 0.01em         |
| Body      | Inter             | 400    | 1rem    | 1.6         | 0              |
| Small     | Inter             | 400    | 0.875rem| 1.5         | 0.01em         |

### Layout

- Max content width: `1200px`, centered with `margin: 0 auto`
- Content padding: `0 24px` on mobile, `0 48px` on tablet+

### Shared Components

**Navigation (all pages except Login):**
- Fixed top bar, `--black` background, z-index 1000
- "LUXBRAND" logo text on the left (links to `index.html`), nav links on the right
- Nav links in order: Home, About, Contact, Login
- Gold underline on hover for nav links, active page gets a persistent gold underline
- On screens < 768px: hamburger icon replaces nav links. Tapping it slides in a menu from the right side (width: 280px) with a dark overlay behind it. Dismissed by tapping the X button or tapping the overlay. Menu items stack vertically.

**Footer (all pages except Login):**
- `--black` background with 1px gold accent line at the top edge
- Three-column layout:
  - Column 1: "LUXBRAND" logo text + tagline "Curating luxury since 2024"
  - Column 2: Quick links — Home, About, Contact, Login
  - Column 3: Contact info — info@luxbrand.com, +1 (555) 000-0000, social icons (Instagram, Facebook, LinkedIn — link to `#`)
- Copyright: "© 2026 LuxBrand. All rights reserved."
- Collapses to single column on mobile

**Buttons:**
- Primary: solid `--gold` background, `--black` text, subtle hover brightening to `--gold-light`
- Secondary: transparent background, `--gold` border, `--gold` text, fills on hover
- Both: rounded corners (4px), transitions (0.3s), `cursor: pointer`

**Form Inputs:**
- Background: transparent
- Border: 1px solid `--border`, radius 4px
- On focus: border color transitions to `--gold`, subtle gold box-shadow glow
- Placeholder text color: `--gray`
- Text color: inherits from page context (dark on light backgrounds, light on dark)

**Form Submit Behavior:**
- All forms are visual-only. On submit:
  - Prevent default form submission
  - Show a brief "Thank you" confirmation message below the form (styled in `--gold`)
  - Message auto-fades after 3 seconds
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
- Form inputs have associated `<label>` elements
- Interactive elements have visible focus states (gold outline)
- Keyboard navigation supported: tab through nav links, form fields, buttons
- Sufficient color contrast ratios (gold on black, black on white)
- Skip-to-content link hidden visually but accessible to screen readers

## Page Designs

### Homepage (`index.html`)

**1. Hero Section**
- Full viewport height (100vh)
- Dark background with CSS gradient (luxury dark-to-darker gradient with subtle warm tone)
- Centered content:
  - Heading: "Private Brokerage for Luxury Goods"
  - Tagline: "Connecting discerning collectors with authenticated luxury pieces"
  - Two CTA buttons: "Browse Inventory" (primary) and "Sell With Us" (secondary) — link to `#`

**2. Introduction Strip**
- White background
- Centered text: "LuxBrand is a premier brokerage service specializing in authenticated luxury goods. We connect sellers of fine handbags, watches, jewelry, and designer fashion with discerning buyers worldwide."
- Clean, generous padding

**3. Category Preview**
- 5 cards in a responsive grid
  - Desktop: 5 columns
  - Tablet: 3 columns top row, 2 columns bottom row
  - Mobile: 2 columns, last card full-width
- Categories: Handbags, Watches, Shoes, Jewelry, Designer Clothing
- Each card: CSS gradient placeholder with category name overlaid in white text on dark gradient overlay
- Hover: subtle scale(1.03) + gold border appears
- Cards link to `#`

**4. Featured Items**
- Grid of 4 product cards
  - Desktop: 4 columns
  - Tablet: 2 columns
  - Mobile: 1 column
- Each card: CSS gradient placeholder image area, brand name (small caps, `--gray`), product name, price in `--gold`, "View Details" button (secondary style)
- Placeholder products: Hermès Birkin 30, Rolex Submariner, Chanel Classic Flap, Cartier Love Bracelet
- All links go to `#`

**5. Trust Banner**
- Light background (`--white`)
- 3 trust points in a row: "Expert Authentication", "Secure Transactions", "Curated Selection"
- Each with a small gold decorative line above
- Stacks vertically on mobile

**6. Footer**

### About Page (`about.html`)

**1. Hero**
- 50vh height, dark CSS gradient background
- Heading: "About Us"
- Subtitle: "A passion for luxury craftsmanship and trusted connections"

**2. Mission Section**
- Two-column layout (stacks on mobile)
- Left: "At LuxBrand, we believe every luxury piece tells a story. Founded with a passion for fine craftsmanship, we serve as a trusted bridge between collectors looking to sell and those seeking their next treasured acquisition. Every item on our platform undergoes rigorous authentication to ensure quality, provenance, and peace of mind."
- Right: CSS gradient placeholder representing a luxury lifestyle image

**3. Values**
- Three columns (stacks on mobile)
- "Authenticity" — "Every item is verified by our team of experts using industry-leading authentication standards."
- "Exclusivity" — "We curate only the finest pieces from the world's most sought-after luxury brands."
- "Trust" — "Secure transactions and transparent processes protect both buyers and sellers."

**4. Footer**

### Contact Page (`contact.html`)

**1. Hero**
- Short hero (40vh), dark background
- Heading: "Get In Touch"
- Subtitle: "We'd love to hear from you"

**2. Two-Column Layout**
- Left: contact form
  - Fields: Name (text), Email (email), Subject (text), Message (textarea)
  - Submit button (primary style, text: "Send Message")
  - On submit: shows "Thank you for your message. We'll be in touch shortly." below the form
- Right: contact details
  - Email: info@luxbrand.com
  - Phone: +1 (555) 000-0000
  - Social icons: Instagram, Facebook, LinkedIn (link to `#`)
- Stacks to single column on mobile (form first, then details)

**3. Footer**

### Login Page (`login.html`)

**1. Layout**
- No shared nav bar — clean, dedicated auth screen
- "LUXBRAND" logo text at top center, linking back to `index.html`
- Centered card on a dark background (same gradient as hero sections)

**2. Card Contents**
- White card with generous padding
- Heading: "Sign In"
- Email input field (with label)
- Password input field (with label)
- "Sign In" button (primary style, full-width)
- "Forgot Password?" text link (links to `#`)
- Divider line
- "Don't have an account? Create one" text with link (links to `#`)
- On submit: shows "Welcome back!" message below the button

## Images

All imagery is created with CSS gradients — no external image files needed for v1. This ensures:
- Zero load time for images
- No licensing concerns
- The site looks intentionally designed, not broken

Gradients use warm dark tones (dark browns, charcoals with warm undertones) to maintain the luxury aesthetic.

## SEO & Performance

- Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`)
- Meta descriptions and title tags per page
- Open Graph meta tags for social sharing
- Preconnect to Google Fonts for faster loading
- Minimal CSS and JS — no frameworks, no bloat
- `<html lang="en">` on all pages

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
