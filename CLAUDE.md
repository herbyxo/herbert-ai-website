@C:\Files\Claude\claude-skills\herbertai\SKILL.md

# Herbert AI — Claude Code Context

## What this is
Herbert AI is Will Herbert's sole-trader AI services business targeting Adelaide trades and SMBs. Core product: AI voice receptionist that answers calls 24/7, qualifies jobs, books into AroFlo, and sends SMS confirmations.

**Repo:** github.com/herbyxo/Business-Webpage  
**Live site:** herbert-aisolutions.com  
**Deploy:** Vercel — auto-deploys `main`, preview URL for every branch

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

## Conventions — follow these exactly

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
