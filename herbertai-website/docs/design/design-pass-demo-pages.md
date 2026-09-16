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

## [~] Allied health, trades and real estate templates (16 Sep 2026)

Same component, three more entries in `industries.js`. The component now lets a
row carry its own second line (a quoted price, a fault) instead of a document
count, lets an email name its own recipient (a GP, a landlord, a plumber) and
its own button, and lets a checklist industry hide the list on an email to
someone other than the client. Made-up names throughout, no client wording.

- Allied health: new patient intake, four items, the referral chased from the
  GP by email. "New patient paperwork, done before they walk in."
- Trades: open quotes followed up on a schedule, a customer reply pausing the
  follow-ups, a revised quote sent after the office changed the price.
  "Quotes followed up, without anyone remembering to."
- Real estate: one maintenance request, landlord approval with a cost cap,
  the job sent to the plumber, the tenant told the time. "Maintenance
  handled, without the phone tennis."

Verified at 375 in the Browser pane: each plays through to its final state, the
email cards open with the right recipient and button, no horizontal overflow,
no console errors, header and footer hidden, noindex on all four, unknown
industry 404s. Built in the website-demo-pages worktree, which needed its own
node_modules (Turbopack refuses a symlink that points outside the project
root). Waiting on Will's sign-off alongside the accountants page.
