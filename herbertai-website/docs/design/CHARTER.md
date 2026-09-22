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
tints, no gradients, no brand accent that means nothing. The exact values, and
whether the May green survives as the "done" colour, are settled in the hero
round.

## Motion means a job finishing, and nothing else

Rows arrive, amber turns green when a person approves, counts go up. No reveal
animations for their own sake, no parallax, no ambient loops, no custom cursor
(removed 15 Sep 2026). With `prefers-reduced-motion` the board renders its
finished state at once.

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

## Open, settled in the section pass

- Typeface: Geist throughout, Bricolage kept for display, or a mono for the board.
- Ground: light paper or dark.
- The board's form: a product window, a departures board, or an andon board.

All three are put to Will as the hero round. This file gets the answers as they
land.

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
