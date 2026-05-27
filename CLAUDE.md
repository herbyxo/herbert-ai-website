@C:\Files\Claude\claude-skills\herbertai\SKILL.md

# Herbert AI — Claude Code Context

## What this is
Herbert AI has repositioned as an **automation & growth studio for SMBs** (target audience: 5–30 staff, ops/marketing leads who already get automation). Core products: AI voice receptionist, custom dashboards, web/automation work, ads/SEO.

**Repo:** github.com/herbyxo/herbert-ai-website
**Live site:** herbert-aisolutions.com
**Deploy:** Vercel — auto-deploys `main`, preview URL for every branch

---

## 🚧 Active redesign — read these BEFORE making any design changes

A full art-directed homepage rebuild is in progress on branch **`preview/art-direction-homepage`**. The site has moved off the warm-trade register (white/gray-50/black CTA) and onto an art-directed studio register (cream + ink + neon green, Bricolage Grotesque display + Geist, magnetic cursor, scroll storytelling).

**Source of truth — read in this order before touching anything visual:**
1. `herbertai-website/docs/design/CHARTER.md` — locked register, palette, type system, signature interactions, anti-references
2. `herbertai-website/docs/design/PLAN.md` — phase-by-phase work order, asset list, locked hero copy, what's in/out of scope

**Where the build is up to (8 phases total):**
- ✅ Phase 0 — Foundation (Framer Motion + Lenis + Bricolage, motion primitives, type/radius/spacing tokens)
- ✅ Phase 1 — Header rebuild (magnetic links, fullscreen mobile overlay)
- ✅ Phase 2 — Hero (3-line stacked manifesto with green flood, no stat row, founder note + question-prompt 2nd CTA)
- ✅ Phase 3 — GROW chapter (4 mockups: paid ad / SEO ranking / SMS funnel / analytics, with ghosted 01-04 indices)
- ⏭ Phase 4 — AUTOMATE chapter (voice agent transcript, n8n flow, chatbot conversation)
- ⏭ Phase 5 — BUILD chapter (dashboard, booking flow, admin panel)
- ⏭ Phase 6 — Footer + final CTA rebuild
- ⏭ Phase 7 — Polish + ship checklist + merge to main

**Locked hero copy** (don't rewrite without explicit ask):
```
Less admin.
More money.        ← green flood / accent
Built to run itself.
```
Sub-line: *"Adelaide-based automation & growth studio. Custom-built, shipped in weeks."*
Founder note: *"Hi — I'm Will. Tell me where the friction is, I'll show you what I'd build."*

**The "Legacy conventions" section below describes the OLD warm-trade register and is being phased out.** Do not follow it for new work. CHARTER.md supersedes everything below.

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
