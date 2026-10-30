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

## The wording: plain facts (Will, 29 Oct 2026: "A")

Every line on the site was written section by section with no shared voice, so
an aside ("One job and a name, say an AI document chaser") and a slogan ("A
progress update, not a project plan") sat beside plain facts on How it works.
Will, 28 Oct 2026: "the problem we have been having is that we did not
establish a tone of wording across the site". Three tones were drawn on the
same eight lines (`design-pass-site-2026-10-28-tone.png`) and Will picked A,
plain facts, on 29 Oct 2026. The site has three layers of wording and this rule
is the middle one:

- Headings keep their own register: one or two beats, a plain statement of who
  does what ("They do the job. Your team says yes."), never a slogan couplet.
  That is the Lines register’s "Will’s shape" in the writing-style skill.
- Body copy and short lines (list rows, timeline facts, terms, card bodies, FAQ
  answers, form text) are plain facts, by the rule below.
- The boards speak as the system, in log rows in the office’s words ("Approved
  by Mia, sent", "Waiting on the owner"); the section above governs them.

The rule for body copy and short lines:

1. Each line says what happens or what the reader gets, in words a stranger
   could picture with no knowledge of the business: "Built inside the tools
   you already use", "Tested on your real work before it sends anything". The
   check is a cold read, never the run sheet. Until 30 Oct 2026 this rule said
   "words a buyer could check against the run sheet", and that is a truth test,
   not a comprehension test: "Its drafts checked by your team before it goes
   live" passed it and meant nothing to Liam, the first reader who had not read
   the run sheet (Will, 30 Oct 2026: "if i was someone who had no idea about
   the business, some of the points are hard to get an idea of what it actually
   is"). Cold read: `design-pass-site-2026-10-30-cold-read.md`.
2. A list keeps one grammar on every row. The timeline’s facts are noun
   phrases with the thing first; a card’s rows are sentences; never mixed
   inside one list.
3. No asides. An example is a fact of its own, or sits in the proof beside the
   line, never a "say an AI document chaser" tail on a line.
4. No slogans: no not-this-but-that ("A progress update, not a project plan",
   "Software, not a report"), no mirrored pair, no closing kicker, no aphorism
   as an opener ("When one job runs itself, the next ones follow").
5. The business speaks, in the third person. "You" and "your" name the reader;
   "we" and "I" do not appear in site copy, and steps say what happens, not who
   does it.
6. Contractions stay in sentences where they read naturally; a noun-phrase line
   has none.
7. No claim about what other people do or feel ("Most people read it and decide
   from there"), and no figure that is not the reader’s own, a published price,
   or an example office’s that says so (the section above).
8. A term the business coined (AI audit, AI employee, AI operating system,
   Herbert OS, the first three) is said in plain words the first time it
   appears on a page ("an AI employee, software that does one office job every
   day"), and never stands bare where a stranger meets it first.
9. No trade words where an owner’s word exists: scoped (priced), comms
   (messages), incidents (fixes), shipped (made), go-live (when it goes live),
   milestone (stage), rungs (steps), engagement (work), exceptions (anything
   unusual), module, platform, funnel, ad group, accounts for hosting (hosted
   by Herbert AI, on your own systems), live and real data for working on your
   actual clients and files.

The eight How it works lines as built to it: How your business runs and where
the hours go / The three jobs costing you most, in your figures / Its job, in
plain English, confirmed with you on day one / Built inside the tools you
already use / Its drafts checked by your team before it goes live / Running on
your real data, your team approving what goes out / A walkthrough with your
team / A twelve month roadmap of the next jobs.

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

## Settled: /pilot (20 Oct 2026)

Will: "B". The audit page every audit button lands on. Paper ground
throughout, no header audit button (the form is in the first section), nothing
moves. As built, 30 Oct 2026, numbered on the page in
`assets-2026-10-30/pilot-map-1440.png`:

1. AI Audit: the offer and the booking form. "Find the job eating your time
   and money.", three terms (Free / No obligation, 45 min / One call on how
   your business runs, 2 days / Your written report), the form beside them;
   #book is here. Done 22 Oct, terms 27 Oct.
2. What you get back: "What your admin costs, written down." and the written
   report at size, an example practice’s three jobs with hours and cost,
   "Read the whole sample". Done 22 and 27 Oct.
3. How it works: "Your first AI employee in four steps." and the timeline, 45
   minutes, within two business days, 14 days from your go, day 14, each stop
   its time and its title, the two prices level at the foot, no rows (Will, 30
   Oct). Layout 23 Oct, words 30 Oct.
4. What it fixes: "The jobs everyone hates doing." and six jobs with a sentence
   each. Details pass 27 Oct with no options step; not signed off (Will, 30
   Oct: "section 4 isnt done").
5. What comes next (was After the pilot): "One job first. Then the system."
   and the three stages after the first AI employee (Day 14, Day 30, within
   60 days) with their prices, beside the dashboard that employee ships in,
   the next ones queued in it. Built 30 Oct (Will: "B, dashboard"); its four
   details are drawn and wait on his picks.
6. Questions: "Before you book." and eight questions. Built from the skeleton;
   words settled by the tone pass and the cold read; its own options and
   details pass not yet run.
7. Back up to the form: "Ready? Book your free AI audit". Built from the
   skeleton; details pass not yet run.

## Settled: the homepage (14 Oct 2026, seven sections from 15 Oct 2026)

Will: "yes and products now". Sections in this order, with the rhythm of a
moving section then a calm one. The hero, Operating Systems and Products fill
a screen on laptops (Will, 20 Oct 2026, phase 4); every other section shows a
bit of the next. The ladder the page walks is AI Audit, AI
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
   for, with no tag under it (Will, 17 Oct 2026: not "Yours come out of the
   audit", and no "example figures" label anywhere in the section, the
   screens and the phone version included); each screen’s bar names it an
   example business (product/research/markdown/operating-systems-2026-10-15.md;
   Will, 16 Oct 2026). The figures are estimates for a stated reference
   business, never a result Herbert AI claims; "about" and the ranges stay. No software
   names (Will, 15 Oct 2026: naming the incumbents was "the wrong direction").
   The title under the screen is the product name with the industry: Herbert
   OS for Property, Herbert OS for Trades, and so on (Will, 16 Oct 2026; the
   test was "you now have a Herbert OS", and it is the rung’s own words; name
   check 20 Oct 2026: always in full with the industry after it, never the
   joined forms like PropertyOS, which are other people’s marks); the list
   is the industry big with the jobs that run by themselves under it; the
   section closes on one line under the list, the rung and its price to the
   pricing page. No Built tag and no per-screen link (Will, 16 Oct 2026: one
   built out of five "indicates a weak position"); The Work is folded in, but
   the homepage says nothing about what is built. The close reads "What would your
   Herbert OS cost?". On phones: the industries as pills, then the phone
   version of that industry’s Herbert OS (the owner’s day, the one
   approval, what was done), never a laptop screen shrunk to fit, and on phones only (Will, 17
   Oct 2026). Order: Property, Trades,
   Hospitality, Health, Finance. (Was Industries, with
   The Work as a separate proof section; Will, 15 Oct 2026: "the industries
   page should actually be about the entirely built system, so maybe we call
   that section Operating Systems", and "yes fold it in". The list keeps each
   system’s specific name: an operations hub, an office system, a functions
   office, a patient board, a season board.)
5. Products: the one dark section on the page (Will, 17 Oct 2026: "1 - the
   its own band looks cool, it gives a distinctive premium feel"). Herbert AI
   is the company and its software carries its own name, the Wispr AI and
   Wispr Flow pattern (14 Oct 2026): "by Herbert AI" over the product name as
   the heading. First Herbert Reach, a small business’s whole marketing
   department (name settled 17 Oct 2026, always written in full), sold as the
   full product it is defined to be and marked In development, with no link
   out until it opens (19 Oct 2026); never a paywall before it has numbers. The marketing dashboard on a laptop; on a phone, Herbert Reach
   as the owner runs it from their phone, by the same rule as Herbert OS.
   Under the name, Will’s line, "Your whole marketing department at the
   click of a button.", and the product as a story in five numbered steps:
   Type your name, Writes ads, Runs ads, Answers leads, Books jobs (19 Oct
   2026).
6. Book the Audit: one line and the booking form itself, the shared AuditForm
   that /pilot#book also uses (20 Oct 2026).
7. Who Builds It: the founder, named, said flat in the third person under the
   label Founder, no photo (19 Oct 2026); the last section, under the booking
   form (20 Oct 2026, phase 4).

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
