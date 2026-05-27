# Herbert AI — Design Charter

Locked: 2026-05-27. This is the source of truth for visual direction. Component code follows this; this does not follow component code.

---

## Audience brief

- **Who:** Upmarket SMB owners and ops/marketing leads — 5–30-staff companies, already automation-aware, evaluating studios not freelancers.
- **Emotional state:** Skeptical-curious. They've been burned by agencies who oversold. They scan for craft cues before reading copy.
- **What *they* recognise as "designed":** Vercel, Linear, Resn, Locomotive, Active Theory portfolios, art-directed agency sites. They expect motion, scale, and confident typography. A plain trust-template reads as "freelancer" to them.
- **Competitive whitespace:** Australian SMB automation studios mostly look like template-generic (TopGrowth, Ratchet, MoonAgency) or pure-tradie utilitarian. Almost no one in this category executes godly-tier craft. That gap is ours to take.

---

## Register chosen

**Art-directed studio** — godly.website territory, executed for an SMB operator audience.

DNA:
- Oversized typography as the hero (display sizes ≥160px desktop)
- Scroll-driven storytelling for the "how it works" sequence — motion serves comprehension
- Custom magnetic cursor + scroll-reactive elements — craft cues at every interactive surface
- Asymmetric, broken grids; content can bleed past container edges
- Cream + ink palette retained; neon green amplified as a signature flood, not just an accent

**Why this register fits:**
- The audience recognises art-direction as "operator-grade craft." Editorial-flourish alone doesn't read that way to them.
- Differentiates Herbert AI from every other Australian SMB-services site in the category.
- Provides a moat: most competitors won't execute this well, won't try.

**Why NOT another register:**
- Warm trade / SMB — that's what we're leaving (mismatch with "studio" positioning).
- Sharp-tech / developer-dark — wrong signal; we serve operators, not developers.
- Pure editorial — too close to HQ (distinctness fail).
- Soft wellness / playful — wrong tonal range for B2B automation.

---

## Type system

**Locked fonts (next/font/google):**

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display (hero, section H1) | **Bricolage Grotesque** | 700, 800 (variable) | Free on Google Fonts, designed for display use with optical sizing, characterful at 280px. NEW addition. (Initially specced Inter Display but it's not a standalone Google Fonts family.) |
| Body / UI sans | Geist | 300, 400, 500, 600 | Keep — already in use. |
| Mono / numeric / labels | Geist Mono | 400, 500 | Keep. Used for eyebrows, stat labels, tabular figures. |
| Italic emphasis | Instrument Serif | 400 italic | Keep, but use SPARINGLY — once per page max. The art-direction register leans on weight + scale, not italic flourish. |

**Drop:** Inter Tight — currently loaded but unused.

**Scale:**

```
display-xl   clamp(96px, 14vw, 280px)   — hero only, line-height 0.88, tracking -0.04em
display-lg   clamp(64px, 8vw, 160px)    — section openers
display-md   clamp(40px, 5vw, 96px)     — sub-heroes
h1           clamp(36px, 4.5vw, 64px)
h2           clamp(28px, 3vw, 44px)
h3           20–24px
body         16–17px / line-height 1.55
small        13–14px
mono-label   10–11px / tracking 0.18em / uppercase
```

**Tracking discipline:** display sizes go negative (-0.04em to -0.05em). Body stays at 0. Mono labels expand (+0.18em).

**No mixed-typeface emphasis.** Don't gradient text. Don't colour individual words for emphasis — let size/weight/position do the work. Italic-serif is reserved for ONE moment per page if used at all.

---

## Palette

| Token | Hex | Role |
|---|---|---|
| `--color-cream` | `#F5F0E5` | Default page canvas (warm, distinctive). |
| `--color-cream-alt` | `#EFE9DC` | Alternating section banding (use sparingly). |
| `--color-ink` | `#0A0A0A` | Primary text + dark hero/CTA panels. |
| `--color-ink-soft` | `#1A1A1A` | Secondary dark surfaces. |
| `--color-muted` | `#6B6660` | Secondary text. |
| `--color-line` | `#E2DBCB` | Hairline rules ONLY where space-separation isn't enough. |
| `--color-green` | `#00FF88` | Signature accent — interactive states, magnetic cursor, hero accent flood. |
| `--color-green-deep` | `#00D924` | On-cream usage of green (contrast). |

**Accent discipline (the rule from the skill):** green has ONE semantic role — interactive + signature. It does NOT colour for typographic emphasis (use weight). It does NOT tint backgrounds as decoration. The exception is the deliberate **green-flood moment** — exactly ONE section per page where green is the entire background. Used like a director uses a colour cue, not as decoration.

---

## Layout & spacing

- **Container:** `max-w-[1280px]` retained. Content can bleed past container edges deliberately (oversized type, full-bleed photography sections).
- **Section spacing:** 160–240px vertical (UP from current 96–128px). Art-direction needs more air.
- **Hero:** ≥ 100vh, left-aligned asymmetric, type dominates ≥ 60% of the visible area at first paint.
- **Grid:** 12-col implicit, but broken deliberately — overlapping elements, asymmetric splits (7/5, 8/4, never 6/6).
- **Borders:** none by default. Hairline rules only where space-separation visibly fails the greyscale test.
- **No card-everywhere.** Content sits on the page surface; cards reserved for genuinely discrete objects (a pricing tier, a service, a case study).

---

## Border-radius scale

| Token | Value | Where |
|---|---|---|
| `rounded-full` | 9999px | CTAs (pills retained — signature shape). |
| `rounded-3xl` | 24px | Pricing cards, service cards (reduced from 32px). |
| `rounded-2xl` | 16px | Inline widgets (audio player, badges). |
| `rounded-none` | 0px | Full-bleed sections, dark hero panels (sharper than current). |

**Direction shift:** away from rounded-everywhere toward sharper deliberate edges, except CTAs (which stay pills).

---

## Signature interactions

**Two locked, both with one-sentence reasons:**

1. **Magnetic cursor with subtle text-distortion on hover over interactive elements.**
   *Reason: signals operator-grade craft at every interactive surface — buyers feel the difference before reading a word.*

2. **Scroll-revealed workflow on "How It Works" — agent → transcribe → AroFlo → SMS chain builds itself as the user scrolls.**
   *Reason: lets the visitor SEE the product working without screenshots; motion IS the explanation.*

Everything else is hygiene (smooth fade-in on viewport entry, hover lifts, transition timing). No additional motion ornaments. Specifically NOT adding: Spline 3D, Lottie illustrations, scroll-jacked horizontal sections, video loops in the hero.

---

## Three concrete anti-references

The site must NOT look like:

1. **HQ (`hq.herbert-aisolutions.com`)** — Will's editorial-italic-cream project. Distinctness fail if we land in the same register.
2. **Linear marketing (`linear.app`)** — sharp-tech / developer-dark. We're not selling to engineers.
3. **Calendly / ServiceTitan / Square for Business** — generic-SMB trust-template. Exactly the register we're leaving.

If a design decision moves us toward any of these three, the decision is wrong.

---

## Stack additions

- **Framer Motion** — for scroll-driven sequences, magnetic cursor, page transitions. Required.
- **Lenis** (`@studio-freight/lenis`) — smooth scroll. Required for art-direction-grade scroll feel. ~3kb.
- No GSAP (Framer Motion handles what we need; GSAP licence cost not worth it).
- No Lottie. No Spline. No Three.js.
- Keep `next/font` for all faces. No external CDN font loads.

---

## Ship checklist hooks

Every PR that touches design must pass:
- Greyscale test (desaturate mentally — hierarchy still reads).
- Anti-AI-slop checklist (`C:\Files\Claude\notes\anti-ai-slop-patterns-2026-05-23.md`).
- Distinctness check vs the three anti-references above.
- `prefers-reduced-motion` honoured for every animation added.
- Lighthouse perf ≥ 90 on mobile (motion library tax is real — budget for it).
