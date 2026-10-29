# Search and AI search plan

Started 20 Oct 2026, after Will asked to "win SEO everywhere possible" and whether AI SEO exists. It does, under the names GEO (generative engine optimisation), AEO (answer engine optimisation) and LLMO: getting named and cited inside ChatGPT, Perplexity, Google's AI Overviews and AI Mode, Gemini, Copilot and Claude, as well as ranking in ordinary results. The evidence behind each lever is in `Herbert AI/product/research/markdown/aeo-2026-10-20/research.md`.

## The goal

Herbert AI gets named when an Australian owner of a small business asks a search engine or an AI assistant who can help with AI, custom software or AI for their industry, and ranks on Google for the searches that have real volume.

## Where it stood on 20 Oct 2026

- ChatGPT (web search) named Herbert AI first for "who can build custom AI software for a small business in Adelaide", and not at all for the same question about a trades business.
- Perplexity left it out of category answers and described it from a snapshot older than September ("web design and automation").
- Google indexed the site but it was not on page 1 for "AI consultant for small business Adelaide".
- Bing had none of the site's pages indexed. A `site:` search returned an unrelated site, and the only result for the domain was Will's LinkedIn profile. Bing's index feeds Copilot and much of ChatGPT search, so this is the largest single gap.
- Google Maps showed no listing for "Herbert AI Adelaide" (it returned Heubert Technologies and others). The Business Profile exists (Herbert AI, Adelaide SA) but its status is "Verification required", so it shows nowhere.
- Brave, which Claude's web search uses, had only the homepage indexed.
- The LinkedIn company page exists (linkedin.com/company/herbert-ai, created 9 Oct 2026, rebranded 15 Oct) but was not linked from the site. Will's own profile is linkedin.com/in/will-herbert-founder.
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
- [x] Will's LinkedIn on his schema profile, the company page on the business's.

### M2. Indexed and verified everywhere (needs Will's accounts)

Found 20 Oct 2026 in Search Console (property `https://herbert-aisolutions.com/`, under william.herbert2711@gmail.com): 4 pages indexed and 17 not, 15 of them "Discovered, currently not indexed" (known but not yet crawled) and /pricing unknown to Google; 69 web clicks in three months; "Herbert AI" searches put the site at position 1.9. Google's snippets still carried the old identity ("web design & automation business").

- [x] Search Console API enabled on the Herbert AI Ads Cloud project (20 Oct 2026).
- [x] Sitemap resubmitted in Search Console (20 Oct 2026).
- [x] Indexing requested for /pilot, /pricing, /industries/accountants and the homepage (20 Oct 2026). The tool then hit its limit.
- [ ] Indexing requests for the rest, about ten a day: /about, /industries/trades, /industries/allied-health, /ai-receptionist, /faq, /privacy, /work, /industries, /contact.
- [x] `marketing/seo/gsc.py` reads Search Console from a session (owner access, 20 Oct 2026).

Search Console, 90 days to 18 Oct 2026: nearly every click is a brand search ("herbert ai" 38 clicks at position 1.9, "herber ai" 6). The one non-brand search with real impressions is "business automation adelaide" (52 impressions, position 14.9), with "business automation services adelaide" (37) and "workflow optimisation services adelaide" (34) near it, all reached through the old /automation-adelaide page that now redirects to /pilot. /web-design-adelaide and /google-ads-adelaide had no impressions at all, so their Adelaide volume is not being captured; they stay up but get no indexing requests.
- [x] Bing Webmaster Tools: Will signed in and imported the site from Search Console (21 Oct 2026); the sitemap was read the same day with all 19 URLs. Data, including the AI Performance report (Copilot citations), arrives within about 48 hours.
- [ ] Google Business Profile: disabled on 6 Jul 2026 ("Business Profile doesn't exist"), eligible for a one-time appeal. Will, 21 Oct 2026: skip for now; directories first. Pack ready when wanted: `Herbert AI/marketing/seo/markdown/gbp-appeal.md`.
- [ ] Bing Places (imports from the Business Profile once it is live) and Apple Business Connect.
- [x] LinkedIn company page in the business's `sameAs`; ABN as `taxID` (20 Oct 2026).

### M3. Mentioned by others

Mentions on other sites track AI visibility more closely than links do (0.664 against 0.218 across about 75,000 brands), and directories carry 37% of citations for local services. Every profile uses the same name, the descriptor line, Adelaide and the domain, and goes into `sameAs` once live. Free first, in this order:

- [x] Clutch profile created 22 Oct 2026 (clutch.co/profile/herbert-ai, under Clutch's review; goes into `sameAs` once published).
- [ ] Clutch reviews: three verified client reviews. Reviews there show the reviewer's role and industry; whether a client is named is the client's choice and the Smith agreement's.
- [ ] Google Business Profile reviews, asked for the same way after every job, never gated.
- [x] National AI Centre AI Directory: nomination submitted 22 Oct 2026 (review takes several weeks).
- [x] Crunchbase live 22 Oct 2026 (crunchbase.com/organization/herbert-ai), in `sameAs`. No logo yet.
- [x] GoodFirms and TechBehemoths submitted 22 Oct 2026, both under the site's review; into `sameAs` once published.
- [ ] TechBehemoths went live straight away but removes a profile whose head office is unconfirmed after 30 days (about 21 Nov 2026). Its only free confirmation is a public Google Maps listing, so it lapses unless the Business Profile appeal is made and succeeds by then; the paid plan is not worth it.
- [ ] DesignRush: draft saved; it will not proceed without three named featured clients, which the no-client-names rule rules out. Parked.
- [ ] Apple Business Connect; Yellow Pages, True Local, Hotfrog and StartLocal for consistent name, phone and site.
- [ ] The "best AI consultants Adelaide" lists that AI answers cite (GoodFirms Adelaide AI, TechBehemoths Adelaide), and pitching their authors where a list is editorial and free.
- [ ] Earned mentions: client sites crediting Herbert AI, Adelaide business press (InDaily, The Lead SA), podcasts, SA Government business events.
- [ ] Will's build write-ups on his personal LinkedIn (member posts are cited more than company pages).
- Paid, deferred until a lead is traced to a directory or an AI answer: Clutch Verified ($499 a year), DesignRush sponsorship, Otterly ($29 a month).

### M4. Content for the demand (with the design pass, phase 7)

- [ ] An Adelaide automation page or /pilot section for "business automation Adelaide", the one non-brand search Google already shows Herbert AI for (page 2).

- [ ] Industry pages built around the searched words: "AI for accountants" (about 1,000 a month), "AI for real estate" (480), "AI for tradies" (70), with the AI employee as the answer and a hospitality page added.
- [ ] Answer-shaped sections: each page opens with a one-sentence direct answer, figures carry their source, questions as headings where the page answers a question people ask.
- [ ] The AI receptionist page (880 a month nationally) brought onto the new charter.

### M5. Measure

- [ ] About 20 fixed prompts (category, industry, brand, comparison) run monthly, logged out, three runs each, across ChatGPT, Perplexity, Google AI Mode, Gemini, Copilot and Claude, recording whether Herbert AI is named, where, whether the description is current, what each one cites and which competitors it names. Three runs because named businesses change from run to run.
- [ ] Search Console (`marketing/seo/gsc.py queries`) and Bing Webmaster figures monthly: impressions, clicks and position for the target searches, and Bing's AI Performance report.

## How the two sessions share the site

The design pass runs on `preview/runs-itself`; this plan's work runs on `preview/aeo`, fast-forwarded to main as each piece is verified. Page metadata and schema lines sit at the top of each page and merge cleanly with redesigns. When the design pass next merges to main, it merges main in first and runs `npm run seo:dates`.

## What the research says not to do

Keyword stuffing (it cut visibility 9% in the GEO benchmark), hidden text or instructions aimed at AI (Google's spam policy covers "attempting to manipulate generative AI responses"), fake or undisclosed incentivised reviews (unlawful under the Australian Consumer Law), undisclosed paid spots in "best" lists, and city by industry grids of near-identical pages (scaled content abuse). llms.txt and schema are kept for identity, not as citation levers: neither has a measured citation effect.
