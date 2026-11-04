'use client'
import FixesGrid, { JOBS } from '../site/FixesGrid'
import { EMPLOYEES } from '../runs/employees'
import { GLYPH } from '../runs/os/shared'

// /pilot section 4, What it fixes, redone as one unit (4 Nov 2026). Will: "do
// all the employees actually match to the text underneath them?" Two did not
// and two were loose. Every employee in A and C is one the site already shows
// doing that exact job (the Operating Systems screens, os/*.js), and each card
// is written from that employee's own lines of work. B keeps today's six jobs
// and gives the four with no matching employee new example employees. All
// three use Will's 4 Nov details: name and job above the title, no note,
// phones two across without the sentence.

const Q = '’'
const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))
const glyphOf = (n) => EMPLOYEES.find((e) => e.name === n)?.glyph

// A. Six jobs from six offices, each card written from that employee's work.
export const SET_A = [
  [GLYPH.penny, 'Penny', 'Requests', 'Missing documents', 'Asks each client for only what is still missing, and asks again until it arrives.'],
  [GLYPH.max, 'Max', 'Sales Coordinator', 'Quote questions', 'Answers questions about a quote the same day, and books the measure and quote.'],
  [GLYPH.hazel, 'Hazel', 'Waitlist', 'Cancellations', 'Offers a cancelled appointment to the patients on the wait list, and books the first to reply.'],
  [GLYPH.emma, 'Emma', 'Maintenance', 'Repairs', `Books a tradie inside the landlord${Q}s limit, and tells the tenant when they are coming.`],
  [GLYPH.clara, 'Clara', 'Functions', 'Event enquiries', 'Replies to each enquiry with a price and a proposal, and books the site visit.'],
  [GLYPH.rose, 'Rose', 'Arrears', 'Late rent', 'Sends the reminder when rent falls behind, and notes the day the tenant says they will pay.'],
]

// C. A's six, each with what it did today, in its screen's own words.
export const SET_C = [
  [GLYPH.penny, 'Penny', 'Requests', 'Missing documents', '9 reminders sent, second round.'],
  [GLYPH.max, 'Max', 'Sales Coordinator', 'Quote questions', 'Reply to Priya sent, quote unchanged.'],
  [GLYPH.hazel, 'Hazel', 'Waitlist', 'Cancellations', 'Sam T. booked into 2:15pm with Chris.'],
  [GLYPH.emma, 'Emma', 'Maintenance', 'Repairs', 'Plumber booked for 8:30am, tenant told.'],
  [GLYPH.clara, 'Clara', 'Functions', 'Event enquiries', 'Site visit booked, Sunday 10am.'],
  [GLYPH.rose, 'Rose', 'Arrears', 'Late rent', 'Reminder sent, 8 Sturt St, promised Wednesday.'],
]

// B. Today's six jobs and sentences, each with an employee that does that job:
// Penny and Max from the screens, Kit (places jobs with the tech on the trades
// screen, no title there yet) as Dispatch, and three new example employees.
const IVY = G(['XXXXXXX', '.......', 'X.X.X.X', '.......', 'X.X.X.X', '.......', '.XXXXX.'])
const BEA = G(['XXXXXXX', 'X.....X', 'XXXXXXX', 'X.X.X.X', 'XXXXXXX', 'X.X.X.X', 'XXXXXXX'])
const NED = G(['......X', '....X.X', '....X.X', '..X.X.X', '..X.X.X', 'X.X.X.X', 'XXXXXXX'])
export const SET_B = [
  [JOBS[0][0], 'Penny', 'Requests', JOBS[0][3], JOBS[0][4]],
  [IVY, 'Ivy', 'Data Entry', JOBS[1][3], JOBS[1][4]],
  [JOBS[2][0], 'Max', 'Sales Coordinator', JOBS[2][3], JOBS[2][4]],
  [BEA, 'Bea', 'Bookings', JOBS[3][3], JOBS[3][4]],
  [GLYPH.kit || glyphOf('Kit'), 'Kit', 'Dispatch', JOBS[4][3], JOBS[4][4]],
  [NED, 'Ned', 'Reports', JOBS[5][3], JOBS[5][4]],
]

function Frame({ id, tag, note, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">
        <b>{tag}</b> <span className="text-white/60">{note}</span>
      </div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">What it fixes</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The jobs everyone hates doing.
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

export default function PilotFixesRedo() {
  return (
    <main className="pb-24">
      <Frame id="today" tag="Today" note="two pairings wrong, two loose"><FixesGrid note={null} phone="two" /></Frame>
      <Frame id="a" tag="A. Six jobs, six offices" note="every employee doing the job the site already shows it doing"><FixesGrid jobs={SET_A} note={null} phone="two" /></Frame>
      <Frame id="b" tag="B. Today's six jobs, matched" note="the same six jobs, each with an employee that does it, three of them new"><FixesGrid jobs={SET_B} note={null} phone="two" /></Frame>
      <Frame id="c" tag="C. What they did today" note="A's six, each with a line of its work in its screen's own words"><FixesGrid jobs={SET_C} note={null} phone="two" /></Frame>
    </main>
  )
}
