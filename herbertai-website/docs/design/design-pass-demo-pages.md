# Design pass: Bottleneck Pilot demo pages

Per-industry demo pages Harry shows on his phone at the door and sends as a link.
Route `/demo/<industry>?for=<slug>`, noindex, personalised with the prospect's
business name. Plan: `code/lead-outreach/prospector/markdown/PROJECT.md` (M4).

## [~] Direction (15 Sep 2026)

Board: `design-pass-demo-pages-2026-09-15.html` / `.png`, accountants, phone width,
same content across all three.

- A. Live app replay: the page is mostly a clean ops tool playing one client's
  tax season on a loop (file list with rails, timeline, scrubber), then the call.
- B. Before and after story: Herbert cream and ink brand, the week as it is now
  (hand-written chase emails), the same week with the workflow, then the call.
- C. The client's inbox: the automated email the firm's clients receive, in a
  familiar inbox layout, plus the reply with attachments, then the call.

Recommendation given: A, with C's email card as what opens when a timeline event
is tapped. Open question noted: the "6 hrs a week / 10 min a day" comparison is
made-up and would need framing as an example or removing.

Pick: A. Will, 15 Sep 2026: "A, whats the difference between A and C though".
C's email card opens from a tapped timeline event: Will, "ok" (15 Sep 2026).

## [~] Accountants template (15 Sep 2026)

Built in b7be0ef, live at /demo/accountants?for=<name>. Plays the season once
from day 0 then rests on the final state (reduced motion starts at the end); tap
"View email" on a sent event to open the email the client got. The made-up hours
comparison was replaced with an example stated as one ("Say <firm> has 150
clients..."). Verified at 375 in the Browser pane: Inter loaded, no horizontal
overflow, site header and footer hidden, unknown industry 404s, production 200
with noindex. Waiting on Will's sign-off before the other three industries.
