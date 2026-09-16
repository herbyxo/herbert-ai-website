# Site restructure: the ladder as the spine

## Overview

herbert-aisolutions.com is rebuilt around the offer ladder (free AI audit,
Bottleneck Pilot as one AI employee, full build, retainer) so that a visitor
Harry sent, a referral, or someone who opened a demo link sees the same thing
Harry said and can take one action. The identity stays a custom software and
AI studio; the ladder is the sales layer. Structure, copy, pricing and proof
ship first; the visual design pass runs after, starting with the whole-site
colour decision; vertical pages go live as their demos land.

Evidence and decisions: the research report at
`product/research/markdown/herbert-ai-identity-and-website-2026-09-16.md`
and the decisions file beside it (`...-decisions.md`), both in the Herbert AI
files repo. The settled tree at the end of the decisions file is the spec for
this plan; nothing here reopens it.

## Problem

The site says "automation and growth studio" with a nineteen-service menu
across three buckets, while the strategy runs one motion and Harry sells one
thing. It has two front doors (a free AI audit and a free homepage mockup),
an industries page that names industries and nothing else, no proof beyond
the new demos, and a pricing page with no numbers. A prospect Harry sends
there has to work out whether it is the same business.

## Constraints

- Will builds and closes alone during a 24-unit semester; the brokerage
  build outranks this work. Anything here slips before that does.
- No client names or hard proof numbers anywhere public (standing rule). The
  brokerage hub appears only de-branded with sample data, and only after the
  exclusivity question is settled with the client.
- Copy rules from the research: savings as ranges from the client's own
  figures, labelled assumptions, the guarantee honoured as written, no
  "replaces staff" claims, "AI automation agency" never used.
- The visual register (keep the charter or start fresh) is undecided and is
  decided on boards in the design pass; everything in M1 to M3 is copy and
  structure that survives either answer.
- Paid landing pages (`/lp/*`) and their mockup offer are untouched; they
  are a separate, measured lane.

## Approach

Rewrite navigation, copy and page inventory in the existing components
without restyling them. One button on every organic page: the free audit,
into `/pilot#book`. The `/start` project intake stays as a secondary path.
Proof is the systems themselves, live where a mock mode exists. The design
pass (design-taste, element by element) then takes each page from working to
right, with the colour boards first.

## Scope

In: navigation and footer; home; `/pilot` as the how-it-works page; `/services`
rewritten as what gets built; `/pricing` with the floors; a `/work` proof page;
`/about` with the founder; the four industry pages; redirects and the
subordinate-lane footer line; sitemap, llms.txt, CLAUDE.md and the herbertai
skill route list; the brokerage hub demo instance; the design pass ledger.

Out: any change to the hero manifesto lines (locked); the `/lp/*` pages; the
web design, AI receptionist and Google Ads pages beyond removing them from
the nav; a case study for the brokerage before go-live; videos (later,
build-in-public content); a paid audit tier; new services.

## Active Plan

### M1: structure, copy, pricing, proof (this week)
- [x] **M1.1: Navigation and footer** (2026-09-16, 545b44b). Nav: How it works (`/pilot`), What gets
  built (`/services`), Industries (`/industries`), Pricing, About, button
  "Free AI audit". Footer gains an "also" line: AI receptionist, Web design
  Adelaide, Google Ads Adelaide. Mobile menu matches.
- [x] **M1.2: Home** (2026-09-16). Sub-line becomes "Custom software and AI for small
  businesses. Adelaide." (manifesto lines unchanged). Sections in order: hero;
  how it works (audit, first AI employee, the system it runs in); proof (the
  systems, linking to `/work`); industries strip (four); founder note with
  name and photo; final call to action. The three bucket chapters are
  retired from home and their capability content moves to `/services`.
- [x] **M1.3: `/pilot` as how it works** (2026-09-16). Adds the build and retainer rungs
  after the pilot section, the founding-client exchange (case study for 90
  days of care), and the "AI employee" framing with its honest limit (one
  job, a person approves what goes out). Audit FAQ already live.
- [x] **M1.4: `/services` as what gets built** (2026-09-16). The Grow, Automate, Build
  buckets become a capability list under the rungs; Grow framed as what
  comes after the operations build; one button.
- [x] **M1.5: `/pricing`** (2026-09-16). Order: audit (free), pilot ($3,500, live in 14
  days or free, credited in full within 60 days), builds from $25,000 scoped
  after the audit, retainers from $1,000 a month with the monthly report,
  the sentence "If the audit shows the saving would not comfortably cover the
  price, you will be told so", and the after-day-30 options. Metadata and
  FAQ schema updated.
- [x] **M1.6: `/work` proof page** (2026-09-16; screenshots of the property dashboard and the accountants demo captured to `public/work/`, the other four systems text-only until M2). The property manager dashboard (live
  link), the operations hub (demo instance from M2.1, placeholder screenshot
  until then), the marketing engine (screenshots), the four industry demos.
  One class-of-work caption each, no names, no numbers.
- [~] **M1.7: `/about`** (2026-09-16; copy done, photo slot renders an initial until Will supplies the file). Founder name, photo, first-person voice, the story
  of what gets built and how, no client names. Photo supplied by Will (GATE:
  the photo).
- [x] **M1.8: Old pages and plumbing** (2026-09-16). Deviation: there was no `/property-managers` page to redirect (the property manager product lives at dashboard.herbert-aisolutions.com and is now the live proof on the real estate page); `/automation-adelaide` deleted and redirected; the industries index and the four pages ship together on `components/site/shared.js`, so M3.1 to M3.4 are the demo embeds only. `/property-managers` becomes the real
  estate industry page (redirect to `/industries/real-estate`);
  `/automation-adelaide` redirects to `/pilot`; `/industries` becomes an
  index of the four pages; sitemap, llms.txt, `next.config.mjs` redirects,
  the website CLAUDE.md and the herbertai skill route list updated.
- [~] **M1.9: Verify and ship.** Lint and production build clean, every page checked at 375 in the Browser pane (one overflow fixed on the industry h1), redirect and 404 confirmed, on branch `preview/ladder-restructure` awaiting Will's look at the Vercel preview before merge. Lint, production build, every page checked
  at desktop and 375 in the Browser pane, one button per page confirmed,
  production polled after push.

### M2: proof instances
- [ ] **M2.1: Operations hub demo instance.** The brokerage hub's mock mode
  deployed de-branded as "a client file pipeline" with sample data, at
  `demo.herbert-aisolutions.com` or under `/demo/`, no login, no client
  branding, no real data (GATE: Will confirms with the client that a
  de-branded demo is fine under the agreement and the exclusivity
  conversation).
- [ ] **M2.2: Marketing engine screenshots**, cropped to the parts that
  read as a product, no client data.
- [ ] **M2.3: Property manager dashboard** confirmed live, un-gated and
  linked from `/work`.

### M3: industry pages (as demos land, from the `demo-pages` branch)
- [ ] **M3.1: `/industries/accountants`**: the bottleneck question, the demo
  embedded, what the first AI employee does, the audit button.
- [ ] **M3.2: `/industries/allied-health`**, same shape, when its demo exists.
- [ ] **M3.3: `/industries/trades`**, same shape, when its demo exists.
- [ ] **M3.4: `/industries/real-estate`**, same shape, folding in the
  property manager dashboard as its live proof.

### M4: design pass (design-taste, element by element)
- [ ] **M4.1: Whole-site decisions.** Five to seven scouted references and
  three palette boards rendered on the real homepage; typeface and density
  shown large; Will picks (GATE: Will's pick). Ledger at
  `docs/design/design-pass-site-2026-09.md`.
- [ ] **M4.2: Home**, section by section, three options each, built after
  each pick.
- [ ] **M4.3: `/pilot` and `/pricing`.**
- [ ] **M4.4: `/work`, `/industries/*`, `/about`.**

### M5: after the triggers
- [ ] **M5.1: Brokerage case study** at go-live, internal and public
  versions per `case-study-template.md`; the founding-client exchange
  offered to the first three pilot clients.
- [ ] **M5.2: Ten-audit review.** Price as a bounce reason on Harry's sheet
  checked; the build floor stays or comes off; the paid audit tier decided.

## Risks

- Capacity: M1 is a week of copy and structure; if the brokerage build needs
  the week, M1 slips and Harry keeps pitching to the current site, which now
  already carries the audit button.
- Exposure: the operations hub demo must never show the client's name,
  data or branding; the mock mode exists, and M2.1 is gated on the client
  conversation.
- Copy drift: the rewrite must not slide into agency language; the writing
  rules and the research's banned terms apply, and the herbertai skill
  carries the ladder.
- Design pass stalls: picks are Will-gated; M1 ships without waiting for
  them so the site is never blocked on taste.
- Search: `/automation-adelaide` has 70 searches a month behind it; the
  redirect keeps the equity. The web design pages are untouched.

## Success metrics

- By end of M1: every organic page has one button, the nav reads as the
  ladder, the pricing page shows the floors, and a visitor from Harry's
  pitch sees the same offer in the same words.
- After ten audits: the share of audit bookings that came via the site
  versus the door, the audit-to-pilot rate, and whether price appeared as a
  bounce reason; these decide M5.2.
- Day 90 (2 December 2026): two pilots sold and delivered, one converting to
  a build, per STRATEGY.md's scoreboard.
