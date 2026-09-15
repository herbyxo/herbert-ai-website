@C:\Files\Claude\claude-skills\herbertai\SKILL.md

# Herbert AI — Claude Code Context

## What this is
Herbert AI has repositioned as an **automation & growth studio for SMBs** (target audience: 5–30 staff, ops/marketing leads who already get automation). Core products: AI voice receptionist, custom dashboards, web/automation work, ads/SEO.

**Repo:** github.com/herbyxo/herbert-ai-website
**Live site:** herbert-aisolutions.com
**Deploy:** Vercel — auto-deploys `main`, preview URL for every branch

---

## ✅ Art-directed studio register — SHIPPED on `main` (live)

The full art-directed homepage rebuild is **done, merged to `main`, and live** at herbert-aisolutions.com. The site moved off the warm-trade register (white/gray-50/black CTA) onto an art-directed studio register: cream + ink + neon green, Bricolage Grotesque display + Geist, Lenis smooth scroll, scroll-storytelling chapters. The custom magnetic cursor was removed site-wide on 15 Sep 2026 at Will's request; the normal system cursor is used everywhere.

**Source of truth for any visual change — read before touching anything visual:**
1. `herbertai-website/docs/design/CHARTER.md` — locked register, palette, type system, signature interactions, anti-references
2. `herbertai-website/docs/design/PLAN.md` — original phase plan + asset list (historical; build is complete)

**Current homepage structure** (`src/app/page.js`): `Hero → GrowChapter → AutomateChapter → BuildChapter → FinalCTA`. Pricing section was dropped from the homepage (lives at `/pricing`). Primary CTA is the `/start` async intake page (replaced "book a call").

**Key components:**
- `components/Hero.js` — 3-line manifesto, green-flood wipe, founder note + question-prompt CTAs. Uses `useReducedMotion()` + `initial={false}` (do NOT revert — fixes a blank-hero bug under reduce-motion).
- `components/motion/`: `LenisProvider`, `RevealOnScroll`
- `components/chapters/` — `GrowChapter` (barber "Forge Barber"), `AutomateChapter`, `BuildChapter` (pilates "Studio Twenty")
- Hero display floor is `clamp(60px, 14vw, 280px)` — tuned for iPhone-X-and-up (375px+).

**Locked hero copy** (don't rewrite without explicit ask):
```
Less admin.
More money.        ← green flood / accent
Built to run itself.
```
Sub-line: *"Adelaide-based automation & growth studio. Custom-built, shipped in weeks."*

**The "Legacy conventions" section below describes the OLD warm-trade register that was replaced.** Do not follow it. CHARTER.md supersedes everything below.

---

## Tech Stack
- **Framework:** Next.js 14+ App Router (plain JS, no TypeScript)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) — utility classes only, no CSS modules
- **Deploy:** Vercel
- **Voice agent:** Retell AI / Vapi → n8n → AroFlo → Twilio SMS
- **Automation:** n8n workflows

---

## Project Structure

The app lives in `herbertai-website/` (repo root is a wrapper). Routes are ground truth — enumerate with `find src/app -name page.js` rather than trusting any list written here. When adding or retiring a route, update all of: page metadata + `alternates.canonical`, `src/app/sitemap.js` (hand-maintained array), `public/llms.txt`, `Header.js` nav, and a `next.config.mjs` redirect if retiring a URL.

**Conventions:** plain JS server components by default, Tailwind v4 utilities only, no CSS modules, no styled-components, no TypeScript, no new colours outside CHARTER.md tokens.

---

## Git Workflow
- Always branch: `git checkout -b preview/<description>`
- Show diff before committing
- Push preview branch → Vercel generates preview URL → wait for approval → merge to main
- Commit messages: imperative, lowercase, specific (`add pricing page hero section`)
- Never commit .env files or secrets

---

## Business Context (for content/copy decisions)
- **Positioning:** automation & growth studio for SMBs — Grow / Automate / Build service buckets. Voice agents are one service, not the identity.
- **Pricing story:** priced on scope, no public price list (see `/pricing` — "Priced on scope. Not on a menu."). Never publish hard dollar figures or name specific clients in site copy — describe the class of work instead.
- **ICP:** small businesses 5–30 staff across trades, hospitality, property, accounting, health, creative.

---

## Current Pages
Enumerate from `src/app/**/page.js` (currently: `/`, `/about`, `/ai-receptionist`, `/automation-adelaide`, `/contact`, `/faq`, `/google-ads-adelaide`, `/industries`, `/pricing`, `/privacy`, `/services`, `/start`, `/start/thanks`, `/web-design-adelaide`, plus the paid landing pages `/lp/web-design`, `/lp/website-redesign`, `/lp/tradie-websites`). Keep `sitemap.js` and `llms.txt` in sync with the organic set; the `/lp/*` pages are `noindex`, deliberately NOT in the sitemap, and not in the nav.

**Paid landing pages (`/lp/*`, added 2026-09-11).** One component, `src/app/components/landing/LandingPage.js`, one config per Google Ads ad group. They do NOT follow CHARTER.md: Will picked the direct-response structure over the brand register on rendered boards (ledger: `herbertai-website/docs/design/design-pass-paid-landing-pages.md`; rule locked in design-taste `registers/marketing-landing-page.md`). Archivo loads only on these routes; the palette lives in the component. Header and Footer hide on `/lp/` the way they hide on `/preview`. The lead form is the shared `MockupLeadForm` with `look="direct"`, same endpoint and redirect as the organic page, so the two cannot drift. The organic `/web-design-adelaide` is untouched and is the control in the marketing-engine landing page field test (`code/marketing-engine/lab/landing-page-principles.md`).
