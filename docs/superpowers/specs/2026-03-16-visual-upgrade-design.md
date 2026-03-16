# LuxeBrand Visual Upgrade — Design Spec

## Overview

A comprehensive visual and interaction overhaul of the LuxeBrand static site (5 pages, hosted on GitHub Pages). The goal: transform a well-structured luxury site into a bold, expressive, interactive experience — SSENSE/Farfetch-level energy with 3D elements, page transitions, custom cursor, and scroll-driven animations on every page.

## Tech Stack

All libraries loaded via CDN script tags. No build step.

| Library | Purpose | Approx Size |
|---------|---------|-------------|
| GSAP + ScrollTrigger + SplitText | Scroll animations, text reveals, timelines | ~60KB |
| Lenis | Smooth inertia scroll | ~15KB |
| Barba.js | Seamless page transitions | ~7KB |
| Three.js | 3D particle hero backgrounds | ~150KB |
| Splitting.js | Character-level text animation targets | ~3KB |

Total: ~235KB from CDN.

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

## Global Experience Layer

Applied across all pages.

### Smooth Scroll
- Lenis with `lerp: 0.1` for buttery inertia scrolling.
- Synced with GSAP ScrollTrigger.
- Disabled on mobile (native touch scroll preferred).

### Custom Cursor
- Default cursor hidden on desktop.
- Small dot (8px) + larger trailing circle (40px) with magnetic lag.
- Grows on hover over interactive elements.
- Morphs to "View" on product cards, "Drag" on category scroll track.
- `mix-blend-mode: difference` for universal visibility.
- Falls back to native cursor on touch devices.

### Magnetic Buttons
- All CTAs and nav links have magnetic pull within ~100px radius.
- Button shifts toward cursor, snaps back with elastic easing on leave.

### Page Transitions (Barba.js)
- Gold line sweeps left to right (~0.6s) on navigation.
- Content fades in behind the wipe.
- URL updates, scroll resets, GSAP re-initializes per page.
- Graceful fallback to standard navigation if JS fails.

### Film Grain Overlay
- CSS pseudo-element on `body` with generated SVG noise pattern.
- `opacity: 0.03`, `pointer-events: none`.
- Adds analog warmth without impacting interaction.

### Scroll Progress Indicator
- 2px gold line at top of viewport.
- Grows left to right with scroll position.

## Homepage

### Hero (100vh)
- **Three.js particle background**: Gold particles on dark, slow-moving. Particles react to mouse position with parallax depth.
- **Text reveal**: "Where Rarity Meets Refinement" — GSAP SplitText, characters stagger in from below with opacity + Y transform. Tagline fades in 0.3s after headline.
- **CTAs**: Fade up with slight scale. Magnetic effect. Gold border draws on hover (animated clip-path).
- **Scroll indicator**: Animated chevron at bottom, pulses gently, disappears on first scroll.

### Category Scroll Track
- **3D tilt cards**: Tilt toward cursor on hover (~10deg max perspective transform). Image zooms inside.
- **Drag to scroll**: Cursor morphs to "Drag." Click-and-drag with GSAP inertia on release.
- **Staggered entrance**: Cards slide in from right with stagger on scroll into view.
- **Progress dots**: Dots below track showing position. Arrows remain with glass hover glow.

### Featured Products Grid
- **Scroll-triggered stagger**: Cards fade up one by one (0.15s stagger) on viewport entry.
- **Hover**: Card lifts (translateY -12px), image zooms, gold gradient overlay fades in from bottom with "View Details." Cursor morphs to "View."
- **Image reveal**: Clip-path wipe from left to right on first scroll into view.

### Trust Banner
- **Counter animation**: Numbers count up on scroll into view (if numeric stats are added).
- **Staggered fade**: Each trust point fades in left to right.
- **Gold line animation**: Decorative line draws itself left to right on scroll.

### Introduction Strip
- **Text split reveal**: Each line fades in and slides up on viewport entry.
- **Parallax**: Text scrolls at 0.8x speed for depth.

## About Page

### Hero (50vh)
- Same text reveal as homepage. "The House" character stagger.
- Subtle parallax on dark gradient. Grain more visible.

### Mission Section (2-column)
- **Left (text)**: Lines reveal with stagger per paragraph.
- **Right (image)**: Clip-path reveal wipe from left. Slow Ken Burns drift on hover. Gold border frame draws itself on scroll.
- **Column entrance**: Left slides from left, right from right, meeting in the middle at ~30% viewport entry.

### Values Grid (3 cards)
- Scale 0.9 to 1.0 + fade in, 0.2s stagger.
- Gold top border draws left to right on scroll.
- Hover: lift + gold glow shadow + slight background shift.
- 3D tilt on cursor move.

## Contact Page

### Hero (40vh)
- Same character split text reveal. Consistent treatment.

### Contact Form (glass-light card)
- **Field stagger**: Inputs fade up on form viewport entry. Labels slide from left.
- **Focus effects**: Border animates to gold from left. Subtle gold glow.
- **Floating labels**: Labels start inside field, float up and shrink on focus/fill.
- **Submit button**: Magnetic. Gold fill sweeps from left on hover. Text inverts to dark.
- **Success state**: Fields collapse upward. Success message scales in from center. Gold checkmark draws itself (SVG stroke animation).

### Contact Details (sidebar)
- Each detail line staggers in (0.15s).
- Social icons: bounce entrance, magnetic hover, gold glow lift.
- Email/phone: gold underline draws on hover left to right.

## Login & Register Pages

Shared split-screen layout with unified treatment.

### Left Panel (branding)
- **Three.js particle background**: Same gold particles as homepage hero, slower and more sparse. Replaces current CSS gradient animation.
- **Logo + tagline**: Fade in with Y-translate. Logo characters stagger, tagline follows 0.3s later.

### Right Panel (form)
- **Glass card entrance**: Scale 0.95 to 1.0 + fade. Backdrop-filter animates from 0 to full blur.
- **Fields**: Stagger top to bottom, 0.1s delay each.
- **Floating labels**: Same as contact page.
- **Focus effects**: Gold border animation, subtle glow.
- **Submit button**: Magnetic. Gold fill sweep on hover.
- **Password**: Show/hide toggle with icon crossfade.

### Register-specific
- **Dropdown**: Custom styled with gold accent. Options micro-stagger on open.
- **Success state**: Card flips on 3D Y-axis to reveal success message. Gold checkmark draws. "Return to LuxeBrand" fades in after flip.

### Login-specific
- **Success state**: Card content fades out. "Accessing your private portfolio..." with gold loading spinner (SVG stroke-dashoffset).

### Shared Mobile
- Left panel compresses to header strip (simplified particles).
- Form takes full screen below.
- Barba.js crossfade between login/register.

## Navigation & Footer

### Navigation (fixed glass bar)
- **Entrance**: Slides down from above on load (0.4s ease-out).
- **Scroll behavior**: Hides on scroll down, reveals on scroll up. Progress bar stays visible.
- **Logo**: Character shimmer on load (opacity wave). Gold sweep on hover.
- **Nav links**: Magnetic pull. Underline draws from left on hover (animated). Active page underline pulses once on load.
- **Hamburger (mobile)**: Bars morph into X with rotation (not icon swap). Menu items stagger from right. Overlay fades in.
- **Glass effect**: Backdrop blur increases on scroll (8px to 20px).

### Footer
- **Gold top border**: Draws left to right on viewport entry.
- **Column stagger**: Three columns fade up left to right, 0.2s stagger.
- **Social icons**: Bounce entrance, magnetic hover, gold glow.
- **Links**: Gold underline draws on hover, matching nav treatment.
- **Copyright**: Fades in last, 0.3s after columns.

## Accessibility & Performance

- All animations respect `prefers-reduced-motion` — reduced to simple fades or disabled entirely.
- Custom cursor disabled on touch devices; falls back to native.
- Lenis disabled on mobile for native scroll behavior.
- All interactive elements remain keyboard-focusable with gold focus outlines.
- Three.js canvas is decorative (`aria-hidden="true"`).
- Page transitions gracefully degrade to standard navigation if JS fails.
- Libraries loaded with `defer` to avoid blocking render.
