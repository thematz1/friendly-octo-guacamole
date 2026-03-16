# Luxury Goods Brokerage — Static Website Design Spec

## Overview

A static website for a luxury goods brokerage, hosted on GitHub Pages. The site connects buyers and sellers of authenticated high-end fashion items. This phase delivers 4 pages: Home, About, Contact, and Login.

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

| Element   | Font              | Weight    | Size   |
|-----------|-------------------|-----------|--------|
| Hero text | Playfair Display  | 700       | 4rem   |
| H1        | Playfair Display  | 700       | 3rem   |
| H2        | Playfair Display  | 600       | 2rem   |
| H3        | Playfair Display  | 600       | 1.25rem|
| Body      | Inter             | 400       | 1rem   |
| Small     | Inter             | 400       | 0.875rem|

### Shared Components

**Navigation (all pages except Login):**
- Fixed top bar, `--black` background
- Logo text (site name) on the left, nav links on the right
- Gold underline on hover for nav links
- Hamburger menu on screens < 768px — slides in a mobile menu

**Footer (all pages except Login):**
- `--black` background with gold accent line at the top edge
- Three-column layout: brand tagline, quick links, contact info
- Copyright line at the bottom
- Collapses to single column on mobile

**Buttons:**
- Primary: solid `--gold` background, `--black` text, subtle hover brightening to `--gold-light`
- Secondary: transparent background, `--gold` border, `--gold` text, fills on hover
- Both have rounded corners (4px), smooth transitions (0.3s)

**Section Spacing:**
- 100px+ vertical padding between major sections
- Generous whitespace throughout to convey premium feel

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px – 1199px
- Desktop: ≥ 1200px

Mobile-first approach: base styles target mobile, media queries scale up.

## Page Designs

### Homepage (`index.html`)

**1. Hero Section**
- Full viewport height (100vh)
- Dark background with a placeholder luxury product image, dimmed with a dark overlay
- Centered content: heading "Private Brokerage for Luxury Goods" in Playfair Display
- Tagline: one line describing the brokerage service
- Two CTA buttons: "Browse Inventory" and "Sell With Us" (link to `#`)

**2. Introduction Strip**
- White background
- Centered short paragraph (1-2 sentences) explaining the brokerage model
- Clean, generous padding

**3. Category Preview**
- 5 cards in a responsive row (wraps on mobile)
- Categories: Handbags, Watches, Shoes, Jewelry, Designer Clothing
- Each card: placeholder image with category name overlaid in white text on dark gradient
- Hover: subtle zoom on image + gold border appears
- Cards link to `#`

**4. Featured Items**
- Grid of 4 product cards (2x2 on desktop, 1-column on mobile)
- Each card: placeholder image, brand name, product name, price, "View Details" button
- All links go to `#`

**5. Trust Banner**
- Horizontal strip, white or light background
- 3-4 trust points: "Expert Authentication", "Secure Transactions", "Curated Selection"
- Simple gold accent lines or decorative elements between items

**6. Footer**

### About Page (`about.html`)

**1. Hero**
- 50vh height, dark background
- Heading: "About Us", one-line subtitle beneath

**2. Mission Section**
- Two-column layout (stacks on mobile)
- Left: text covering passion for luxury craftsmanship, connecting collectors, secure transactions
- Right: placeholder image

**3. Values**
- Three columns (stacks on mobile)
- Headings: "Authenticity", "Exclusivity", "Trust"
- Short paragraph under each

**4. Footer**

### Contact Page (`contact.html`)

**1. Hero**
- Short hero section, heading: "Get In Touch"

**2. Two-Column Layout**
- Left: contact form — Name, Email, Subject, Message (textarea), Submit button
- Right: contact details — email address, phone placeholder, social media icon links (to `#`)
- Form is visual only — submit button does nothing functional
- Stacks to single column on mobile

**3. Footer**

### Login Page (`login.html`)

**1. Layout**
- No shared nav bar — clean, dedicated auth screen
- Logo text at top linking back to homepage
- Centered card on a dark or subtly patterned background

**2. Card Contents**
- Email input field
- Password input field
- "Sign In" button (primary style)
- "Forgot Password?" text link
- "Create Account" text link
- All visual only — no authentication

## Images

All images are placeholders. Options:
- CSS gradient/pattern backgrounds for heroes
- Placeholder service images (e.g., via Unsplash URLs for luxury goods)
- Simple colored rectangles with text overlay for product cards

The site should look complete and premium even with placeholder imagery.

## SEO & Performance

- Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `footer`)
- Meta descriptions and title tags per page
- Open Graph meta tags for social sharing
- Preconnect to Google Fonts for faster loading
- Images use `loading="lazy"` where appropriate
- Minimal CSS and JS — no frameworks, no bloat

## Out of Scope (Future)

- Browse Inventory page
- Sell With Us page
- Product detail pages
- Authentication page (trust/verification info)
- Actual form submissions
- User accounts and dashboards
- Checkout and payment
- CMS or product management

These are referenced via placeholder links (`#`) for future development.
