# Herbert AI — Homepage Rebuild Plan

Scope: homepage + header + footer, art-directed register, ship-when-right (~7-day soft target).
Locked: 2026-05-27. Companion to `CHARTER.md`.

---

## Locked decisions (the recap)

| Topic | Decision |
|---|---|
| Audience | Upmarket SMB ops/marketing leads (5–30 staff) |
| Register | Art-directed studio (godly route) |
| Structure | 3-chapter scroll storytelling: GROW → AUTOMATE → BUILD |
| Imagery | Stylised in-brand mockups (Stripe-style) — no real client UI, no pure abstract |
| Signature interactions | Magnetic cursor + scroll-revealed workflow per chapter |
| Hero headline | `Less admin. / More money. / Built to run itself.` (3-line stack) |
| Hero accent | Green flood / accent moment on `More money.` |
| Stack additions | Framer Motion + Lenis + Bricolage Grotesque (next/font) |
| Anti-references | HQ, Linear marketing, Calendly/ServiceTitan |
| Timeline | Ship-when-right, ~7 working days, no fake urgency |

---

## Branch + git plan

- Work on `preview/art-direction-homepage`
- Vercel auto-generates preview URL — Will reviews before merging to `main`
- Small commits per phase (foundation, header, hero, each chapter, footer, polish) so any phase can be reverted in isolation

---

## Phase-by-phase work order

### Phase 0 — Foundation (≈1 day)
- Branch: `preview/art-direction-homepage`
- Install: `framer-motion`, `@studio-freight/lenis`
- Add `Bricolage_Grotesque` to `next/font/google` in `layout.js`, drop unused `Inter_Tight`
- Update `globals.css` `@theme` block:
  - New type scale (display-xl, display-lg, display-md tokens via clamp())
  - New radius scale (0px / 16px / 24px / pill)
  - Section spacing tokens (160–240px)
- Build motion primitives in `src/app/components/motion/`:
  - `<MagneticCursor>` — global custom cursor with magnetic attraction to `[data-magnetic]` elements
  - `<RevealOnScroll>` — wrap any child; fades + lifts on viewport entry; respects `prefers-reduced-motion`
  - `<LenisProvider>` — smooth scroll wrapper, mounted in layout
- Add `prefers-reduced-motion` media query handling at the root — kills magnetic cursor + Lenis + all transitions when set
- Commit + push → preview URL exists, nothing visible yet

### Phase 1 — Header rebuild (≈0.5–1 day)
- New `Header.js` matching art-direction register
- Wordmark stays (no logo work)
- Nav links get `data-magnetic` attribute
- Possible upgrade: fullscreen overlay menu on click (decide during build — start with horizontal nav, only escalate if it feels weak)
- Mobile: full-screen takeover menu (already partially in current header — refine)

### Phase 2 — Hero (≈1–2 days)
- Replace current hero section in `page.js`
- 3-line stacked headline at `clamp(96px, 14vw, 280px)`, Bricolage Grotesque 800, tracking `-0.05em`, line-height `0.88`
- Green flood / accent on `More money.` — pick treatment during build (options: green background block behind line, green colour on text + subtle scale animation, green underline-fill on viewport entry)
- Sub-line below: a one-sentence positioning line in Geist 400 (draft 3-5 candidates during build)
- CTAs: green pill primary + outline secondary, with magnetic cursor pull
- Stat row (Solo / 2wks / 0 lock-in): KEEP, but restyle to fit new type scale — mono labels stay, numeric scale up
- Hero blob retired; replaced with one subtle abstract motion piece (probably an oversized rotating outlined shape OR a stationary green gradient field — decide during build)
- Hero ≥ 100vh, asymmetric layout (text left-weighted, motion piece right-weighted or full bleed behind)

### Phase 3 — GROW chapter (≈1 day)
- Section opener: huge GROW label (display-lg) + 1-sentence promise (e.g. "Bring new business in.")
- Mockup components (build in `src/app/components/mockups/grow/`):
  - `<MockGoogleReview />` — 5-star card, generic copy ("loved the work they did, highly recommend"), in-brand styling
  - `<MockAdCreative />` — Meta/Google ad preview, generic offer, in-brand colours
  - `<MockSMSConversation />` — phone-style chat bubble exchange, no real numbers/names
  - `<MockLandingPageHero />` — tiny landing page mockup as a card
- Scroll choreography: mockups enter staggered as user scrolls past, with subtle parallax
- Abstract transition out → AUTOMATE: green-tinted particle flow / rising-lines motion (decide during build)

### Phase 4 — AUTOMATE chapter (≈1 day)
- Section opener: huge AUTOMATE label + 1-sentence promise (e.g. "Run without you in the loop.")
- Mockup components in `src/app/components/mockups/automate/`:
  - `<MockVoiceAgentTranscript />` — live-look transcript with animated waveform + caller name redacted
  - `<MockN8nFlow />` — 4-node workflow graph with animated connection lines (CSS-only, no canvas)
  - `<MockChatbotConversation />` — chat UI with typing indicator + 2-3 exchanges
- Scroll choreography: nodes/transcript lines build themselves as user scrolls (this is the key "motion-as-content" moment)
- Abstract transition out → BUILD

### Phase 5 — BUILD chapter (≈1 day)
- Section opener: huge BUILD label + 1-sentence promise (e.g. "Custom software, yours to keep.")
- Mockup components in `src/app/components/mockups/build/`:
  - `<MockDashboard />` — admin dashboard with sidebar, stat cards, mini chart — all in-brand
  - `<MockBookingFlow />` — calendar + form, looks like a real booking widget
  - `<MockAdminPanel />` — table-style admin view (rows of fake records, in-brand)
- Scroll choreography: dashboard assembles itself (charts populate, sidebar slides in) on viewport entry

### Phase 6 — Footer + final CTA (≈0.5 day)
- Final CTA: rebuild current `<FinalCTA>` to match new register
- Footer: minimal current — upgrade with one big typographic moment ("Built to run itself." at display-md as the footer's anchor) + contact + nav re-listing
- All footer links `data-magnetic`

### Phase 7 — Polish + ship checklist (≈1 day)
- Greyscale test — desaturate every section mentally, hierarchy reads
- Anti-AI-slop checklist walk (`C:\Files\Claude\notes\anti-ai-slop-patterns-2026-05-23.md`) — fix every "yes" item
- Distinctness check vs HQ, Linear marketing, Calendly
- `prefers-reduced-motion` audit — every animation honours it
- Mobile pass at 375 / 768 / 1024 / 1440
- Lighthouse perf check — target ≥90 mobile (Framer Motion + Lenis cost is real; lazy-load anything possible)
- Cross-browser: Safari, Chrome, Firefox — Lenis especially needs Safari verification
- Final review: Will walks the preview URL, signs off
- Merge to `main`

**Total: ~7–8 working days**, consistent with the soft target.

---

## Asset list (deliverables by phase)

| Asset | Phase | Notes |
|---|---|---|
| Hero abstract motion piece | 2 | Subtle, doesn't fight type — choose 1 of 2 options during build |
| Magnetic cursor component | 0 | Reusable primitive |
| Lenis smooth scroll wrapper | 0 | Mounted in layout |
| RevealOnScroll wrapper | 0 | Reusable primitive |
| MockGoogleReview component | 3 | Generic 5-star card |
| MockAdCreative component | 3 | Meta/Google ad preview |
| MockSMSConversation component | 3 | Chat bubble exchange |
| MockLandingPageHero component | 3 | Tiny landing page card |
| GROW→AUTOMATE transition motion | 3-4 | Abstract green motion |
| MockVoiceAgentTranscript component | 4 | Transcript + waveform |
| MockN8nFlow component | 4 | 4-node animated graph |
| MockChatbotConversation component | 4 | Chat UI with typing |
| AUTOMATE→BUILD transition motion | 4-5 | Abstract green motion |
| MockDashboard component | 5 | Sidebar + stats + chart |
| MockBookingFlow component | 5 | Calendar + form |
| MockAdminPanel component | 5 | Table-style admin view |

All mockups designed in-brand (cream + ink + green, Bricolage Grotesque + Geist, matching radii). Stylised but instantly readable.

---

## Open questions (decide during build, not before)

1. **Magnetic cursor mobile fallback** — on touch, cursor is killed entirely (touch users don't get this signal). Alternative: small "press" haptic-feel scale on tap. Decide during Phase 0.
2. **Hero sub-line copy** — what sits below the 3-line headline before the CTAs? Draft 3–5 options during Phase 2, pick one.
3. **Section transition style** — hard cuts vs. soft fades vs. Lenis-pinned scroll sequences (like Locomotive). Default to soft + reveal; consider pinning only for the AUTOMATE chapter where the workflow build-out warrants it.
4. **Perf floor** — is Lighthouse 85 mobile acceptable as a worst case, or is 90 a hard line? Defaults to 90; reconsider if Lenis specifically blows the budget.
5. **Audio demo (Master Freeze recording) placement** — keep on homepage in the AUTOMATE chapter, or move entirely to /services? Default: keep on homepage as the AUTOMATE chapter's proof anchor — but as a small inline element, not a section of its own like currently.
6. **Stat row survival** — Solo / 2wks / 0 lock-in. Default: keep but restyle. Reconsider if it fights the new hero composition during Phase 2.
7. **Header overlay menu vs horizontal nav** — start with horizontal, escalate to fullscreen overlay only if the horizontal feels weak. Decide during Phase 1.

---

## Out of scope (this ship)

- Other pages (/services, /industries, /pricing, /about, /faq, /contact) — second pass after homepage is live
- New logo / wordmark work — defer per the brand-identity-and-marks foundation rule (no 18+ months brand equity yet)
- Photography shoot — no real photos this ship; pure mockup + abstract motion
- CMS / dynamic content — homepage stays statically composed
- Analytics / experiment framework — no A/B test on this ship; whole homepage swaps
