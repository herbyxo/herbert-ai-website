# Search and AI search plan

Started 20 Oct 2026, after Will asked to "win SEO everywhere possible" and whether AI SEO exists. It does, under the names GEO (generative engine optimisation), AEO (answer engine optimisation) and LLMO: getting named and cited inside ChatGPT, Perplexity, Google's AI Overviews and AI Mode, Gemini, Copilot and Claude, as well as ranking in ordinary results. The evidence behind each lever is in `Herbert AI/product/research/markdown/aeo-2026-10-20/research.md`.

## The goal

Herbert AI gets named when an Australian owner of a small business asks a search engine or an AI assistant who can help with AI, custom software or AI for their industry, and ranks on Google for the searches that have real volume.

## Where it stood on 20 Oct 2026

- ChatGPT (web search) named Herbert AI first for "who can build custom AI software for a small business in Adelaide", and not at all for the same question about a trades business.
- Perplexity left it out of category answers and described it from a snapshot older than September ("web design and automation").
- Google indexed the site but it was not on page 1 for "AI consultant for small business Adelaide".
- Bing had none of the site's pages indexed. A `site:` search returned an unrelated site, and the only result for the domain was Will's LinkedIn profile. Bing's index feeds Copilot and much of ChatGPT search, so this is the largest single gap.
- Google Maps showed no listing for "Herbert AI Adelaide" (it returned Heubert Technologies and others), so the Business Profile is unverified, hidden or missing.
- No LinkedIn company page exists (Mind, 7 Oct 2026). Will's own profile is linkedin.com/in/will-herbert-founder.
- The name collides with Herbert Digital, Herbert Retail and other Herbert businesses, so every profile has to pair "Herbert AI" with Adelaide and the domain.

## What people search (Google Ads keyword planner, 20 Oct 2026)

Monthly searches, Google only. Adelaide AI searches are close to zero; the volume is national and by industry.

| Search | Adelaide | Australia |
|---|---|---|
| ai consultant / ai automation / ai agency adelaide | under 10 | under 10 |
| custom software (development) adelaide | 10 | 10 to 50 |
| web design adelaide | 880 | 1,000 |
| web developer adelaide | 720 | 1,000 |
| seo adelaide | 590 | 1,000 |
| ai for accountants (and close variants) | 40 | 1,000 |
| ai automation (and close variants) | | 1,000 |
| ai receptionist | 30 | 880 |
| ai for real estate | 10 | 480 |
| chatgpt for business | 10 | 390 |
| ai for small business | 10 | 210 |
| ai employee | 10 | 170 |
| ai audit | 10 | 140 |
| ai for tradies | 10 | 70 |
| ai in hospitality | | 50 |
| ai for psychologists / clinics | | 10 to 30 |

What follows from it: for AI services the contest is being named in AI answers and owning the national "AI for [industry]" searches, not ranking for "AI Adelaide". The Adelaide volume is in web design and SEO, which the subordinate pages already cover. Planner figures are rounded buckets and group close variants together.

## Milestones

### M1. The technical layer (shipped to main 20 Oct 2026)

- [x] One structured data graph (`src/app/components/site/schema.js`): the business with its offer catalogue and prices, Will as founder, the website, each with an `@id`. Validated at validator.schema.org on 11 page types, 0 errors and 0 warnings.
- [x] Page schema: breadcrumbs on every page, Service on /pilot, the industry pages and the three Adelaide service pages, ProfilePage on /about. FAQPage was already on /pilot, /faq and the service pages.
- [x] Titles lead with what people search: /pilot "Free AI audit for small business", industry pages "AI for accountants", "AI for real estate", "AI for tradies", "AI for allied health". The visible headings are untouched (the design pass owns them).
- [x] Sitemap dates come from git (`npm run seo:dates`) instead of the build time.
- [x] IndexNow key and `npm run seo:ping`; all 19 URLs submitted on 20 Oct 2026 (202 Accepted).
- [x] llms.txt rewritten to the live site: the ladder with prices, what an AI employee is, Herbert OS by industry, Herbert Reach in development, the pages, and direct answers to common questions.
- [x] Will's LinkedIn added to his schema profile.

### M2. Indexed and verified everywhere (needs Will's accounts)

- [ ] Search Console access from a session: `marketing/seo/gsc.py auth` (one Allow click), then `gsc.py submit` and the first query report.
- [ ] Bing Webmaster Tools: sign in, import the site from Search Console, submit the sitemap.
- [ ] Google Business Profile: find out why it does not show, then verify it as a service-area business (Adelaide, no shopfront), category, description, services with prices, the website.
- [ ] Bing Places (imports from the Business Profile) and Apple Business Connect.
- [ ] LinkedIn company page "Herbert AI", linked from Will's role, then added to `sameAs`.

### M3. Mentioned by others

- [ ] The directory and review profiles from the research, free first, each with the same name, description, Adelaide and the domain, added to `sameAs` as they go live.
- [ ] Reviews: Google reviews from clients who are happy to give one (asked the same way every time, never gated).
- [ ] Listicles that AI answers cite for "best AI consultants Adelaide" and similar: ask to be included where the list is editorial and free.

### M4. Content for the demand (with the design pass, phase 7)

- [ ] Industry pages built around the searched words: "AI for accountants" (about 1,000 a month), "AI for real estate" (480), "AI for tradies" (70), with the AI employee as the answer and a hospitality page added.
- [ ] Answer-shaped sections: each page opens with a one-sentence direct answer, figures carry their source, questions as headings where the page answers a question people ask.
- [ ] The AI receptionist page (880 a month nationally) brought onto the new charter.

### M5. Measure

- [ ] A fixed set of prompts run monthly across ChatGPT, Perplexity, Google AI Mode, Gemini, Copilot and Claude, recording whether Herbert AI is named, where, and what each one cites.
- [ ] Search Console and Bing Webmaster figures monthly: impressions, clicks and position for the target searches.

## How the two sessions share the site

The design pass runs on `preview/runs-itself`; this plan's work runs on `preview/aeo`, fast-forwarded to main as each piece is verified. Page metadata and schema lines sit at the top of each page and merge cleanly with redesigns. When the design pass next merges to main, it merges main in first and runs `npm run seo:dates`.
