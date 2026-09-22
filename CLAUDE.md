@C:\Files\Claude\claude-skills\herbertai\SKILL.md

# Herbert AI — Claude Code Context

## What this is
Herbert AI is **custom software and AI for small businesses**, built in Adelaide (descriptor decided 16 Sep 2026; replaces "automation & growth studio"). It sells one ladder: a free AI audit, the $3,500 Bottleneck Pilot (one AI employee for one job, live in 14 days), full operations builds from $25,000, retainers from $1,000/mo. Target: owner-operated businesses with 3 to 20 staff, first in accounting, allied health, trades and real estate. Research and decisions: `product/research/markdown/herbert-ai-identity-and-website-2026-09-16*.md` in the files repo.

**Repo:** github.com/herbyxo/herbert-ai-website
**Live site:** herbert-aisolutions.com
**Deploy:** Vercel — auto-deploys `main`, preview URL for every branch

---

## ✅ Art-directed studio register — SHIPPED on `main` (live)

The full art-directed homepage rebuild is **done, merged to `main`, and live** at herbert-aisolutions.com. The site moved off the warm-trade register (white/gray-50/black CTA) onto an art-directed studio register: cream + ink + neon green, Bricolage Grotesque display + Geist, Lenis smooth scroll, scroll-storytelling chapters. The custom magnetic cursor was removed site-wide on 15 Sep 2026 at Will's request; the normal system cursor is used everywhere.

**Rebuild under way (22 Sep 2026).** `docs/design/CHARTER.md` was rewritten around the concept "Runs itself": the site shows the running system, colour means only state, motion means only a job finishing. The live pages still render the May register described in this section until each section of the rebuild ships; build new sections to the new charter, not to this section. Ledger: `herbertai-website/docs/design/design-pass-site-2026-09.md`.

**Source of truth for any visual change — read before touching anything visual:**
1. `herbertai-website/docs/design/CHARTER.md` — locked register, palette, type system, signature interactions, anti-references
2. `herbertai-website/docs/design/PLAN.md` — original phase plan + asset list (historical; build is complete)

**Current homepage structure** (`src/app/page.js`, restructured 16 Sep 2026): `Hero → HowItWorks → Proof → IndustriesStrip → FounderNote → FinalCTA`. The three bucket chapters (`components/chapters/*`) are retired from home and no longer imported; their capability content lives on `/services`. The one action on every organic page is the free AI audit (`/pilot#book`); `/start` is the secondary project-intake path. Shared ladder and industry content: `components/site/shared.js`. Plan and decisions: `herbertai-website/docs/restructure-2026-09/PROJECT.md`.

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
Sub-line (changed 16 Sep 2026): *"Custom software and AI for small businesses, built in Adelaide."*

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
- **Positioning:** custom software and AI for small businesses; the ladder (audit, AI employee pilot, the system it runs in, retainer) is the sales layer, not the identity. Grow / Automate / Build survive only as the capability list on `/services`. "AI automation agency" is never used. Voice agents are one AI employee among several.
- **Pricing story (changed 16 Sep 2026):** the four rungs are priced on `/pricing`: audit free, pilot $3,500 fixed, builds from $25,000 scoped after the audit, retainers from $1,000/mo, with the line that the client is told if the saving would not cover the price. Never name specific clients in site copy; describe the class of work. Savings are ranges from the client's own figures, never invented.
- **ICP:** owner-operated businesses with 3 to 20 staff; accountants and bookkeepers, allied health, trades with an office, real estate and property management first.

---

## Current Pages
Enumerate from `src/app/**/page.js` (currently: `/`, `/pilot` (how it works, the audit form), `/services` (what gets built), `/work` (the systems), `/industries` and `/industries/[slug]` (accountants, allied-health, trades, real-estate), `/pricing`, `/about`, `/contact`, `/faq`, `/privacy`, `/start`, `/start/thanks`, `/demo/[industry]` (noindex, personalised by `?for=`), the subordinate SEO lane `/ai-receptionist`, `/web-design-adelaide`, `/google-ads-adelaide` (live, indexed, footer only), plus the paid landing pages `/lp/web-design`, `/lp/website-redesign`, `/lp/tradie-websites`). `/automation-adelaide` was removed 16 Sep 2026 and redirects to `/pilot`. Keep `sitemap.js` and `llms.txt` in sync with the organic set; the `/lp/*` and `/demo/*` pages are `noindex`, deliberately NOT in the sitemap, and not in the nav.

**Paid landing pages (`/lp/*`, added 2026-09-11).** One component, `src/app/components/landing/LandingPage.js`, one config per Google Ads ad group. They do NOT follow CHARTER.md: Will picked the direct-response structure over the brand register on rendered boards (ledger: `herbertai-website/docs/design/design-pass-paid-landing-pages.md`; rule locked in design-taste `registers/marketing-landing-page.md`). Archivo loads only on these routes; the palette lives in the component. Header and Footer hide on `/lp/` the way they hide on `/preview`. The lead form is the shared `MockupLeadForm` with `look="direct"`, same endpoint and redirect as the organic page, so the two cannot drift. The organic `/web-design-adelaide` is untouched and is the control in the marketing-engine landing page field test (`code/marketing-engine/lab/landing-page-principles.md`).
