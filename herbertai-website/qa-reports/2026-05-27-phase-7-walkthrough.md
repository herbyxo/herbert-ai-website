# Site Walkthrough — Herbert AI homepage redesign — 2026-05-27

Scope: Phase 7 polish pass on the `preview/art-direction-homepage` branch redesign before merging to main.

Branch SHA tested: `8f0d176` → patched to `96bcf7f` after critical finding.
Preview URL: `https://herbert-ai-website-q5sotf4vk-herbert-ai.vercel.app` (rolling; new SHA → `https://herbert-ai-website-1vfmsyy6j-herbert-ai.vercel.app`)

---

## Summary

**One critical ship-blocker found and fixed during the walkthrough:** the rebuilt hero rendered fully blank for any user with `prefers-reduced-motion` enabled (macOS default, plus the entire accessibility-need audience). Caught by inspecting computed styles after first screenshot showed a header-then-blank page. Fix shipped and verified live.

No further critical issues caught by the in-browser audit. Mobile responsive walkthrough was blocked by tooling (Vercel auth-gates headless Chrome; MCP browser renderer froze on resize). Recommend Will eyeballs the preview on his phone for final mobile sign-off before merge.

---

## Coverage

- ✅ Desktop ~1280px render — verified live
- ✅ Reduced-motion render — verified live (after fix)
- ✅ Framer Motion + magnetic cursor + Lenis init — no runtime errors
- ⏭ Mobile 375 / 768 / 1024 — not verifiable via available tooling, recommend Will checks on device
- ⏭ Lighthouse perf — not run (needs DevTools in user-driven Chrome)
- ⏭ Cross-browser Safari Lenis check — not run (no Safari access on Windows)

---

## 🔴 Critical (fixed in-walkthrough)

### 1. Hero invisible under `prefers-reduced-motion`

**Where:** `src/app/components/Hero.js`
**Affects:** every user with the OS-level reduce-motion setting enabled
**Status:** Fixed in commit `96bcf7f`, verified live

**What was wrong:** Every `<motion.span>` / `<motion.p>` / `<motion.div>` in the hero used the `initial={{ opacity: 0, y: 32 }}` + `animate={{ opacity: 1, y: 0 }}` pattern. Under reduce-motion, Framer Motion's behaviour leaves the element at the SSR-applied `initial` state and skips the transition to `animate`, so elements rendered at `opacity: 0; transform: translateY(32px)` permanently.

**Diagnosis:** First screenshot showed header rendered, then cream nothingness. Console had no errors. Inspecting computed styles on the first H1 span returned:
```
{ "h1Opacity": "0", "h1Transform": "matrix(1, 0, 0, 1, 0, 32)", "reducedMotion": true }
```
Force-setting `opacity: 1; transform: none` via JS revealed the hero rendered perfectly, confirming the issue was purely the Framer Motion + reduce-motion interaction.

**Why chapters were unaffected:** they use `whileInView` (via `RevealOnScroll`), which Framer Motion handles differently — the end-state is applied immediately when the user has reduce-motion. Only `animate` (used in the hero) has the bug.

**Fix:** `useReducedMotion()` hook + `initial={false}` when reduce-motion is on. When `initial={false}`, Framer Motion skips the initial state entirely and renders the element at the animate target from first paint.

```js
const reduced = useReducedMotion()
const init = (y = 32) => (reduced ? false : { opacity: 0, y })
// ...
<motion.span initial={init(32)} animate={{ opacity: 1, y: 0 }} ... />
```

Applied to all 7 motion components in `Hero.js` including the green-flood `scaleX` wipe.

---

## 🟡 Warning

### 1. Mobile typography risk (unverified)

Headless captures at 375px suggested the H1 `clamp(96px, 14vw, 280px)` floor of 96px may overflow on small phones — at 375px viewport with 24px horizontal padding, the content width is 327px; 96px Bricolage at zero letter-spacing puts "More money." at roughly 350px wide. The headless screenshot wasn't conclusive (Vercel preview auth-blocked + hydration timing) so this needs Will's eyeball.

**To test:** open preview URL on a real phone (375–414px wide), confirm "Less admin." / "More money." / "Built to run itself." don't horizontal-scroll or clip.

**If broken:** drop the floor to `clamp(72px, 14vw, 280px)` or `clamp(64px, 14vw, 280px)` in `globals.css` `@theme`. CHARTER specifies 96 but the visual intent is "huge at any size" — fitting the viewport beats the literal floor value.

### 2. Browser screenshot tooling froze repeatedly

Twice during the walkthrough the renderer in the Chrome MCP froze on `Page.captureScreenshot` after a window resize. Forced retries via reload worked. Probably unrelated to the page itself (the page rendered fine when the tool eventually recovered), but worth a note if Will runs into it.

---

## 🟢 Nit

None caught beyond the items already covered in the Phase 7 polish commit (`8f0d176` — reduced-motion on chapters via `useReducedMotion`, dropped redundant section borders, dropped "The closing pitch" eyebrow).

---

## What still needs in-person verification

The remaining Phase 7 items in `docs/design/PLAN.md` ("Ship checklist hooks" in CHARTER + step 7 in PLAN):

- [ ] Mobile pass at 375 / 768 / 1024 / 1440 — recommend Will checks preview on phone + a 768 tablet view if available
- [ ] Lighthouse perf check (target ≥90 mobile) — run via Chrome DevTools on the preview URL
- [ ] Cross-browser Safari — Lenis smooth scroll feel is the only real risk; Lenis works in modern Safari but feel-check it
- [ ] Distinctness scan vs HQ / Linear marketing / Calendly — visually side-by-side, gut check

None of these require a code change unless verification surfaces an issue. The branch is mergeable from a code-correctness standpoint after `96bcf7f`.

---

## Test fixtures

No mutations performed — read-only walkthrough.
