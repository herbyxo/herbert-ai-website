@C:\Files\Claude\claude-skills\herbertai\SKILL.md

# Herbert AI — Claude Code Context

## What this is
Herbert AI has repositioned as an **automation & growth studio for SMBs** (target audience: 5–30 staff, ops/marketing leads who already get automation). Core products: AI voice receptionist, custom dashboards, web/automation work, ads/SEO.

**Repo:** github.com/herbyxo/herbert-ai-website
**Live site:** herbert-aisolutions.com
**Deploy:** Vercel — auto-deploys `main`, preview URL for every branch

---

## ✅ Art-directed studio register — SHIPPED on `main` (live)

The full art-directed homepage rebuild is **done, merged to `main`, and live** at herbert-aisolutions.com. The site moved off the warm-trade register (white/gray-50/black CTA) onto an art-directed studio register: cream + ink + neon green, Bricolage Grotesque display + Geist, magnetic cursor, Lenis smooth scroll, scroll-storytelling chapters.

**Source of truth for any visual change — read before touching anything visual:**
1. `herbertai-website/docs/design/CHARTER.md` — locked register, palette, type system, signature interactions, anti-references
2. `herbertai-website/docs/design/PLAN.md` — original phase plan + asset list (historical; build is complete)

**Current homepage structure** (`src/app/page.js`): `Hero → GrowChapter → AutomateChapter → BuildChapter → FinalCTA`. Pricing section was dropped from the homepage (lives at `/pricing`). Primary CTA is the `/start` async intake page (replaced "book a call").

**Key components:**
- `components/Hero.js` — 3-line manifesto, green-flood wipe, founder note + question-prompt CTAs. Uses `useReducedMotion()` + `initial={false}` (do NOT revert — fixes a blank-hero bug under reduce-motion).
- `components/motion/` — `MagneticCursor`, `LenisProvider`, `RevealOnScroll`
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
```
src/
  app/
    components/
      Header.js       — 'use client', mobile hamburger menu, nav dropdown
      Footer.js       — minimal copyright
    page.js           — homepage
    layout.js         — root layout, wraps Header + Footer
    globals.css       — Tailwind import
    about/page.js
    contact/page.js
    faq/page.js
    pricing/page.js
    services/page.js
    portfolio/
      voice/page.js     — Master Freeze demo card + audio player
      websites/page.js  — 3 demo website projects with lightbox
      chatbots/page.js  — coming soon placeholder
public/
  logo.png            — 32x32 Herbert AI logo
  steve-demo.wav      — Master Freeze unedited call recording
```

---

## Legacy conventions (being phased out — see CHARTER.md instead)

**Color palette:**
- Background: `bg-white` or `bg-gray-50`
- Text: `text-gray-900` (primary), `text-gray-600` (secondary)
- Borders: `border-gray-200`
- CTA buttons: `bg-black text-white rounded-full` (primary), `border-2 border-black rounded-full` (outline)
- Dark sections: `bg-black text-white`

**Layout:** All sections use `container mx-auto px-4` with `max-w-5xl`. Sections alternate `bg-white` / `bg-gray-50`.

**New pages:** `src/app/[route]/page.js` — server components by default, `py-20` padding on sections.

**New components:** `src/app/components/` — add to both desktop and mobile nav in Header.js if needed.

**Never:** introduce new colors, use CSS modules, add styled-components, or use TypeScript.

---

## Git Workflow
- Always branch: `git checkout -b preview/<description>`
- Show diff before committing
- Push preview branch → Vercel generates preview URL → wait for approval → merge to main
- Commit messages: imperative, lowercase, specific (`add pricing page hero section`)
- Never commit .env files or secrets

---

## Business Context (for content/copy decisions)
- **Pitch:** Solo tradies miss 3-5 calls/week on the tools. At ~$400/callout that's $5k+/mo lost. Herbert catches those calls.
- **Pricing:** $299 setup + $149–299/mo. Month-to-month, no lock-in. Two-week free trial.
- **ICP:** Solo operators, electricians/plumbers/HVAC, Adelaide-based, mobile-only number
- **Core flow:** Customer calls → Retell agent → n8n → AroFlo job created → SMS confirmation

---

## Current Pages
`/` `/services` `/pricing` `/about` `/faq` `/contact` `/portfolio/voice` `/portfolio/websites` `/portfolio/chatbots`

Services page has anchor links: `#website` `#voice` `#chatbot`
