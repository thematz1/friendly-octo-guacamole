// QA smoke test for the TMG Brokerage static site.
// Usage (from tests/): npm install && npm test   — or: node qa.js .. webkit
// Uses an already-installed browser under ~/.cache/ms-playwright when one exists,
// otherwise Playwright's own (run `npx playwright install chromium webkit`).
const fs = require('fs');
const path = require('path');
let pw;
try { pw = require('playwright'); } catch { pw = require('playwright-core'); }

const site = path.resolve(process.argv[2]);
const engine = process.argv[3] || 'chromium';
const pages = ['index', 'about', 'contact', 'login', 'register', 'forgot-password'];
const url = (p, q = '') => 'file://' + path.join(site, p + '.html') + q;
let failures = 0;
const check = (ok, msg) => { console.log((ok ? 'PASS ' : 'FAIL ') + msg); if (!ok) failures++; };

function findExe(prefix, rel) {
  const base = path.join(process.env.HOME, '.cache/ms-playwright');
  if (!fs.existsSync(base)) return undefined;
  const dir = fs.readdirSync(base).find(d => d.startsWith(prefix));
  return dir ? path.join(base, dir, rel) : undefined;
}

(async () => {
  const opts = engine === 'chromium'
    ? { executablePath: findExe('chromium-', 'chrome-linux64/chrome') }
    : { executablePath: findExe('webkit-', 'pw_run.sh') };
  const browser = await pw[engine].launch(opts);

  // 1. Every page: no console errors, no horizontal overflow at 320px, skip link / brand first
  for (const p of pages) {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 800 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(url(p), { waitUntil: 'load' });
    check(errors.length === 0, `${p}: no console errors ${errors.length ? JSON.stringify(errors) : ''}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    check(overflow <= 0, `${p}: no horizontal scroll at 320px (overflow ${overflow}px)`);
    const missingAlt = await page.$$eval('img:not([alt])', els => els.length);
    check(missingAlt === 0, `${p}: every img has alt`);
    const unlabeled = await page.$$eval('input:not([type=hidden]):not([name=_gotcha]), select, textarea', els => els.filter(e => !e.labels || e.labels.length === 0).map(e => e.id));
    check(unlabeled.length === 0, `${p}: every form control has a label ${unlabeled.join(',')}`);
    await ctx.close();
  }

  // 2. Mobile nav popover
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(url('index'));
    check(await page.isHidden('#site-menu'), 'mobile: menu closed initially');
    await page.click('.menu-button');
    check(await page.isVisible('#site-menu a[href="about.html"]'), 'mobile: Menu button opens nav');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    check(await page.isHidden('#site-menu'), 'mobile: Escape closes nav');
    await ctx.close();
  }

  // 3. Desktop nav inline
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(url('index'));
    check(await page.isVisible('#site-menu a[href="contact.html"]'), 'desktop: nav links inline');
    check(await page.isHidden('.menu-button'), 'desktop: Menu button hidden');
    check((await page.getAttribute('#site-menu', 'popover')) === null, 'desktop: popover attribute removed');
    // resize down → becomes popover again
    await page.setViewportSize({ width: 400, height: 800 });
    await page.waitForTimeout(200);
    check((await page.getAttribute('#site-menu', 'popover')) === 'auto', 'resize: popover restored on narrow');
    await ctx.close();
  }

  // 4. Contact: subject prefill, required validation, confirmation
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(url('contact', '?subject=Lot%2001%3A%20Leather%20bucket%20bag'));
    check((await page.inputValue('#subject')) === 'Lot 01: Leather bucket bag', 'contact: subject prefilled from lot link');
    await page.click('button[type=submit]');
    check(await page.isVisible('form'), 'contact: empty submit is blocked by required fields');
    await page.fill('#name', 'QA Test');
    await page.fill('#email', 'qa@example.com');
    await page.fill('#message', 'Hello');
    await page.click('button[type=submit]');
    check(await page.isHidden('form'), 'contact: form hides after submit');
    const status = await page.textContent('#contact-status');
    check(/received/.test(status), 'contact: confirmation shown');
    check(await page.evaluate(() => document.activeElement.id === 'contact-status'), 'contact: focus moves to confirmation');
    await ctx.close();
  }


  // 4b. Formspree path (network mocked): success hides form, failure keeps it with an error
  for (const [code, sent] of [[200, true], [500, false]]) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    let posted = null;
    await page.route('https://formspree.io/**', route => { posted = route.request().postData() || ''; route.fulfill({ status: code, contentType: 'application/json', body: '{}' }); });
    await page.goto(url('contact'));
    await page.evaluate(() => { window.FORMSPREE_ID = 'test123'; });
    await page.fill('#name', 'QA Test');
    await page.fill('#email', 'qa@example.com');
    await page.fill('#message', 'Hello');
    await page.click('button[type=submit]');
    await page.waitForFunction(() => document.getElementById('contact-status').textContent.length > 0);
    check(posted !== null && posted.includes('qa@example.com'), `formspree ${code}: form data posted`);
    check((await page.isHidden('form')) === sent, `formspree ${code}: form ${sent ? 'hidden' : 'kept'} after response`);
    if (!sent) check(/could not be sent/.test(await page.textContent('#contact-status')), 'formspree 500: error message shown');
    await ctx.close();
  }

  // 5. Password toggle
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(url('login'));
    await page.click('.password-toggle');
    check((await page.getAttribute('#login-password', 'type')) === 'text', 'login: toggle shows password');
    check((await page.getAttribute('.password-toggle', 'aria-pressed')) === 'true', 'login: toggle aria-pressed=true');
    await ctx.close();
  }

  // 6. Internal links resolve to files that exist
  {
    const hrefs = new Set();
    for (const p of pages) {
      const html = fs.readFileSync(path.join(site, p + '.html'), 'utf8');
      for (const m of html.matchAll(/(?:href|src)="(?![a-z]+:)([^"#?]+)[^"]*"/g)) hrefs.add(m[1]);
    }
    const missing = [...hrefs].filter(h => !h.startsWith('//') && !fs.existsSync(path.join(site, h)));
    check(missing.length === 0, `links: all local href/src exist ${missing.join(',')}`);
  }

  await browser.close();
  console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
  process.exit(failures ? 1 : 0);
})();
