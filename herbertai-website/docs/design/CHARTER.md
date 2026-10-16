# Herbert AI: Design Charter

Rewritten 22 Sep 2026 around the concept **"Runs itself"**, which Will picked from
two concepts drawn as live pages ("i think the runs itself"). It replaces the
May 2026 charter (art-directed studio: cream, ink, a neon green flood, Bricolage
Grotesque display). The live site still renders the May register until the
rebuild ships section by section; that charter's text is in git history at
commit `7056612` and summarised under History below.

How it was reached: `docs/design/design-pass-site-2026-09.md`. The method is
design-taste's `loop/concept.md`.

---

## The concept

Herbert AI builds software that does one job in an office every day without
anyone having to remember to. So the site shows that happening instead of
describing it. The running system is the page.

The truths it rests on, all literally true: one AI employee per job; a person
on the client's team approving what goes out; live in 14 days or free; the
client owns what gets built; real systems a visitor can open (a live property
dashboard, a demo that plays itself); one person in Adelaide who builds it and
answers when something needs a human.

The test it passes: every page can be described from the concept alone.

| Page | What the concept makes it |
|---|---|
| Home | An example office's board, jobs finishing while you read, the manifesto beside it |
| Industries | One board per kind of office, running that industry's jobs |
| Pricing | The ladder as steps that light in order: audit, first employee, keeping it running, the whole office, care |
| The systems | The instruments: the live dashboard and the demos, shown running |
| The audit (`/pilot`) | The first job on the board: booked, done, page sent |
| About | Who keeps it running: one person, the one who answers when a light goes amber |

---

## The signature device: the board

A list of jobs completing: a time, which AI employee, what it did in the
office's own words, and its state. Every page carries a version of it, sized to
the page. It is never decoration: each row is something the software really
does for that kind of office, with example data labelled as such.

## Colour means state, and nothing else

| State | Meaning |
|---|---|
| Green | Done |
| Amber | Waiting on a person (an approval, a reply) |
| Grey | Queued |

Everything else is ink on a ground. No colour for emphasis, no decorative
tints, no gradients, no brand accent that means nothing. One exception, Will's
call on 6 Oct 2026: the logo mark keeps its black "h" tile with the green dot
and glow ("i like todays"). It is the brand, not a state. The exact values, and
whether the May green survives as the "done" colour, are settled in the hero
round.

## Motion shows the system working

Loosened 13 Oct 2026 from "a job finishing, and nothing else" after Will judged
three levels on a running demo (`/lab/motion`): "2 across the site plus 3 on
the homepage". He wants the site to "look visually appealing and grab the
eye", and the eye-catching part comes from the product doing its work.

- **Everywhere (level 2):** anything that shows an AI employee or a system at
  work can move the way the work moves. Rows arrive, amber turns green when a
  person approves, counts run up as they come into view, an avatar's dots light
  as it works, Approve gets pressed, a card plays its job when it comes into
  view and again on hover and lifts slightly under the pointer.
- **Once, on the homepage (level 3):** one scroll scene, the AI employees
  roster. The section holds while the visitor scrolls, and a large screen in
  slight depth plays each employee's job in turn, with a cursor pressing
  Approve. No other page gets a scroll scene unless Will picks one.
- **Still out:** motion for decoration. Fade-ins on every block, parallax,
  ambient loops, floating shapes, shifting gradients, a custom cursor (removed
  15 Sep 2026).
- With `prefers-reduced-motion` everything renders its finished state at once,
  and the scroll scene becomes a still grid. On phones the scroll scene is the
  grid of cards.

## Section labels are title case

The small label above each section heading is a title and is set in title
case: "How It Works", "AI Employees", "The Work". The headings under them stay
sentences. Will, 13 Oct 2026: "the title for each section should be
capitalised".

## The AI employees

Each AI employee has a plain first name with its job always beside it, and a
7x7 dot-grid avatar drawn from its job; the dots are ink at rest, light as it
works, amber while it waits on a person and green when the job is done, so the
avatar is also its status light. Will, 13 Oct 2026: "job names plus dot
avatars - something like Steve - Front Desk". Clients name their own at
kickoff.

The homepage roster (Will, 14 Oct 2026, "yes, the names u have are good") is
the original idea from each industry, judged in
`product/research/markdown/industries-2026-10-13-ideas.md`: Gus · Recoveries
(Property), Vic · Margins (Trades), Fern · Scope (Finance), Rita · Rebookings
(Hospitality), Joy · Milestones (Health), and Ray · Promises, which works in
every industry. The first roster (Steve · Front Desk, Penny · Document Chaser,
Max · Quote Follow-up, Emma · Maintenance, Archie · Invoice Chaser, Tess ·
Bookings) moves to the industry pages and inside the full systems; Tess
retires. Every employee's visual has one shape: one line from a real record
lighting up, one card with one thing to approve, one counter moving.

## Nothing is claimed, things happen

Copy says what the employee does, in the office's words ("Chased 6 clients for
missing payslips"), not what Herbert AI is ("smart", "powerful"). Every figure
on a board is an example office and says so. No client names and no results
figures in public copy. The employee takes the job, never replaces the person.

## Pictures are the instruments

The real software: the property dashboard, the demos, a pilot's own screens.
No stock photography, no illustration, no 3D objects. A founder photo on About
only.

## Kept from before

- The manifesto, locked:

  ```
  Less admin.
  More money.
  Built to run itself.
  ```

  "Built to run itself" is where the concept came from. Sub-line: "Custom
  software and AI for small businesses, built in Adelaide."
- One action per organic page: the free AI audit (`/pilot#book`).
- The normal system cursor.

## Settled in the hero round (6 Oct 2026)

Will picked the product window: "the whole point of it is to showcase the
product". So:

- **Typeface:** Geist throughout, weight and size doing the hierarchy; Geist
  Mono only for times, counts and labels on a board. Bricolage retires with the
  May register.
- **Ground:** light paper `#FAFAF8`, ink `#111`, white for the software
  surfaces. State colours as above (done `#12B76A`, waiting `#F5A623`, queued
  `#BDBDBD`).
- **The board's form:** the software itself, a clean product window. Never a
  metaphor for the product (a departures board, an andon board) where the
  product can be shown.

## Settled: the homepage (14 Oct 2026, seven sections from 15 Oct 2026)

Will: "yes and products now". Sections in this order, with the rhythm of a
moving section then a calm one. Only the hero fills a screen; every other
section shows a bit of the next. The ladder the page walks is AI Audit, AI
Employee, AI Operating System (Will, 15 Oct 2026: "i think we define the
steps as being AI audit, AI employee, and then AI Operating System").

1. Hero: the manifesto beside the example office’s board, whose rows are the
   six AI employees doing their jobs.
2. How It Works: the free AI audit, your first AI employee, your AI operating
   system. Calm.
3. AI Employees: the one scroll scene; scrolling picks the employee, the day
   plays by itself. Details settled 16 Oct 2026: heading "They do the job.
   Your team says yes."; the list is a scoreboard, each row ending in what
   that employee did this month; each line on the card carries its time; the
   section closes on the rung ("Your first one is $3,500, live in 14 days",
   to /pilot); on phones one card at a time under a strip of the six avatars,
   tap or swipe. The avatar’s amber is a travelling pulse that never stays,
   the green a sweep that does.
4. Operating Systems: the five industries listed beside one big screen showing
   that industry’s operating system from the owner’s chair, work already done
   with one decision left, calm until clicked. Under the screen, the model’s
   headline figure as one sentence naming the example business it is worked
   for, closed with "Yours come out of the audit." rather than an "example
   figures" label (product/research/markdown/operating-systems-2026-10-15.md;
   Will, 16 Oct 2026). The figures are estimates for a stated reference
   business, never a result Herbert AI claims; "about" and the ranges stay. No software
   names (Will, 15 Oct 2026: naming the incumbents was "the wrong direction").
   The built ones carry an open link and a Built tag; The Work is folded in.
   Order: Property, Trades, Hospitality, Health, Finance. (Was Industries, with
   The Work as a separate proof section; Will, 15 Oct 2026: "the industries
   page should actually be about the entirely built system, so maybe we call
   that section Operating Systems", and "yes fold it in". The list keeps each
   system’s specific name: an operations hub, an office system, a functions
   office, a patient board, a season board.)
5. Products: Herbert AI’s own products, each with its own name (the pattern is
   Wispr AI the company, Wispr Flow the product; Will, 14 Oct 2026: "i was
   thinking of doing a similar sort of strategy"). First the marketing engine
   under its product name (placeholder "Herbert Reach", Will, 14 Oct 2026, not final), shown as early access until its paywall opens; later
   the industry systems once productised.
6. Who Builds It: the founder, named.
7. Book the Audit: the button and the three audit facts.

The research behind the order and the motion rule:
`research-order-and-motion-2026-10-14.md`.

## Anti-references

- A copy of any single reference site. Will, 18 Sep 2026: "its just a copy of
  these sites. nothings original".
- Generic AI marketing: purple gradients, glowing orbs, sparkles, fake analytics
  charts, a robot.
- HQ (`hq.herbert-aisolutions.com`), Will's editorial-cream command centre.
- SMB template sites (Calendly, ServiceTitan, Square for Business).

## History

May 2026 to September 2026: the art-directed studio register. Cream `#F5F0E5`,
ink `#0A0A0A`, neon green `#00FF88` with one green-flood section per page,
Bricolage Grotesque display with Geist and Geist Mono, oversized type,
scroll-revealed chapters, a magnetic cursor (removed 15 Sep 2026). Will, 16 Sep
2026: "i dont like the pages in terms of colour and structure".
