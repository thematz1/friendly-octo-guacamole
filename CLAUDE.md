# TMG Brokerage website

Static marketing site for TMG Brokerage, a private luxury-goods brokerage in Côte Saint-Luc, QC.
Hosted on **GitHub Pages** from `main` at `tmgbrokerage.com` (`CNAME`). Claude is the long-term
maintainer and QA for this repo.

## Stack — keep it this way

- Plain HTML + one CSS file (`css/style.css`) + one script (`js/site.js`). **No build step, no framework.**
  Whatever is committed is what's served.
- CDN dependencies (pin exact versions, never `@latest`):
  - Open Props `1.7.23` — only `sizes`, `easings`, `shadows` (`--size-*`, `--ease-*`, `--shadow-*`).
  - Google Fonts: Bodoni Moda (headlines), Hanken Grotesk (text).
- Prefer native platform features over libraries: `popover` for the mobile nav, cross-document
  view transitions (`@view-transition`) for page changes, CSS scroll-snap for the category row,
  `:user-invalid` for form errors. Before adding any HTML/CSS/JS pattern, use the
  `modern-web-guidance` skill (`.claude/skills/`) and follow its fallback rules.
- Header and footer markup is duplicated in `index.html`, `about.html`, `contact.html`;
  the auth layout is duplicated in `login.html`, `register.html`, `forgot-password.html`.
  **Change all copies together.** Each page sets `aria-current="page"` on its own nav link.

## Brand

- Name: **TMG Brokerage** (one T). Domain and email: `tmgbrokerage.com`, `contact@tmgbrokerage.com`.
- Contact: Tyrell Gerald · +1 (438) 936-6749 (`tel:+14389366749`) · 7480 Chemin Small, Côte Saint-Luc, QC H4W 1N2.
  The street name "Chemin Small" is the owner's wording; not yet confirmed.
- Palette (tokens at the top of `css/style.css`): navy `#0B1F33` / champagne `#D4B26A` / ivory `#F7F4EE`,
  roughly 60% ivory, 30% navy, 10% gold. Gold is too light for text on ivory — use `--gold-ink`.
- Light mode only (owner's decision).
- Design rules: one motion moment per page (home: certificate + seal). Sentence-case headings,
  no all-caps labels, no `→` on links. Lots are numbered because they are identifiers.

## Known limitations

- **Forms:** the contact and request-access forms (`data-formspree`) post to Formspree once
  `FORMSPREE_ID` is set at the top of section 2 in `js/site.js`. While it's empty they only show
  their confirmation and nothing is sent. The Formspree account belongs to the owner. Sign-in and
  password reset have no backend at all; sign-in tells users it isn't open yet.

## QA — run before every commit that touches the site

```sh
cd tests && npm install && npm test     # Chromium + WebKit
```

`tests/qa.js` checks every page for console errors, horizontal scroll at 320px, image alt text,
labelled form controls, the mobile/desktop nav, the contact form flow and subject prefill, the
password toggle, and that local links resolve. Then screenshot changed pages at 1440px and 390px
wide and look at them. Scroll-free headless screenshots are fine here: no content hides until scroll.

## Project skills (`.claude/skills/`)

- `modern-web-guidance` (GoogleChrome, Apache-2.0): search and retrieve current web-platform guidance via `npx`.
- `frontend-design` (Anthropic, Apache-2.0): visual design direction and self-critique.
- `web-design-guidelines` (Vercel): UI review against the Web Interface Guidelines (fetches the rules live).
