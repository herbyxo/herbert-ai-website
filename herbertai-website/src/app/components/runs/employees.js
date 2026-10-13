'use client'
import { motion } from 'framer-motion'
import { STATE } from './board'

// The AI employees (CHARTER.md, "The AI employees", 13 Oct 2026): a plain first
// name with the job always beside it, a 7x7 dot-grid avatar drawn from the job,
// and three lines of one example day each. Names approved by Will ("names are
// good. instead of Ruby can u do Emma"). Clients name their own at kickoff;
// these are the site's examples.

const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))

export const EMPLOYEES = [
  {
    name: 'Steve', job: 'Front Desk', what: 'Answers calls and enquiries, books appointments', where: 'Health · Trades · Hospitality',
    glyph: G(['.XXXXX.', 'X.....X', 'X.X.X.X', 'X.....X', '.XXXXX.', '..X....', '.X.....']),
    feed: [['Call answered, new patient enquiry', 'done'], ['Booked Tuesday 10:30 with the physio', 'done'], ['Reschedule request drafted for the clinic', 'wait', 'Approved, client told']],
    count: 37,
  },
  {
    name: 'Penny', job: 'Document Chaser', what: 'Chases the documents a file is missing', where: 'Finance',
    glyph: G(['XXXXX..', 'X...XX.', 'X.....X', 'X.XXX.X', 'X.....X', 'X.XXX.X', 'XXXXXXX']),
    feed: [['Checklists sent to 150 clients', 'done'], ['38 reminders drafted, only what is missing', 'wait', 'Approved, sent'], ['Bank statement matched to the Nguyen file', 'done']],
    count: 212,
  },
  {
    name: 'Max', job: 'Quote Follow-up', what: 'Follows up every quote until it is a yes or a no', where: 'Trades',
    glyph: G(['..XXX..', '.X...X.', 'X.....X', 'X...XXX', 'X....X.', '.X.....', '..XXX..']),
    feed: [['Quote 1042 followed up, second time', 'done'], ['Quote 1038 flagged: worth a call', 'done'], ['Follow-up drafted for a $4,800 install', 'wait', 'Approved, sent']],
    count: 19,
  },
  {
    name: 'Emma', job: 'Maintenance', what: 'Logs repair requests, gets approval, books the tradie', where: 'Property',
    glyph: G(['...X...', '..X.X..', '.X...X.', 'XXXXXXX', '.X...X.', '.X.X.X.', '.XXXXX.']),
    feed: [['Plumbing request logged, Unit 5', 'done'], ['Landlord approval requested, $380 quote', 'wait', 'Approved, plumber booked'], ['Tenant told the plumber comes Tuesday', 'done']],
    count: 26,
  },
  {
    name: 'Archie', job: 'Invoice Chaser', what: 'Reminds overdue invoices, politely, on schedule', where: 'Finance · Trades',
    glyph: G(['...X...', '.XXXXX.', 'X..X...', '.XXXXX.', '...X..X', '.XXXXX.', '...X...']),
    feed: [['Invoice 2214 reminded, second time', 'done'], ['Invoice 2198 paid, reminder stopped', 'done'], ['Final notice drafted for 2187', 'wait', 'Approved, sent']],
    count: 44,
  },
  {
    name: 'Tess', job: 'Bookings', what: 'Confirms bookings and fills cancellations', where: 'Health · Hospitality',
    glyph: G(['.X...X.', 'XXXXXXX', 'X.....X', 'X.X.X.X', 'X.....X', 'X.X.X.X', 'XXXXXXX']),
    feed: [['Tomorrow’s 46 bookings confirmed', 'done'], ['Cancellation at 2:15, the waitlist took it', 'done'], ['Table for 12 needs a deposit', 'wait', 'Approved, deposit link sent']],
    count: 61,
  },
]

const INK = '#111'

// mode: 'still' | 'scan' (dots light one by one: at work) | 'done' (green) |
// 'wait' (amber). scanKey restarts the scan.
export function Avatar({ glyph, mode = 'still', size = 52, scanKey = 0 }) {
  const n = glyph.length
  const gap = size / n
  const r = gap * 0.32
  const on = []
  glyph.forEach((row, y) => row.forEach((v, x) => v && on.push(`${x}-${y}`)))
  const colour = mode === 'done' ? STATE.done : mode === 'wait' ? STATE.waiting : INK
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="shrink-0">
      {glyph.map((row, y) =>
        row.map((v, x) => {
          const cx = x * gap + gap / 2
          const cy = y * gap + gap / 2
          if (!v) return <circle key={`${x}-${y}`} cx={cx} cy={cy} r={r * 0.55} fill={INK} opacity={0.1} />
          const i = on.indexOf(`${x}-${y}`)
          return (
            <motion.circle
              key={`${x}-${y}-${scanKey}`}
              cx={cx}
              cy={cy}
              r={r}
              initial={mode === 'scan' ? { opacity: 0.15 } : false}
              animate={{ opacity: 1, fill: colour }}
              transition={{ delay: mode === 'scan' ? i * 0.035 : 0, duration: 0.25 }}
              fill={colour}
            />
          )
        }),
      )}
    </svg>
  )
}

export function StateLine({ s, then, size = 11.5 }) {
  return (
    <span className="flex items-center gap-1.5" style={{ color: s === 'wait' ? '#9A6300' : '#0E8F53', fontSize: size }}>
      <span className="inline-block w-2 h-2 rounded-full" style={{ background: s === 'wait' ? STATE.waiting : STATE.done }} />
      {s === 'wait' ? 'Waiting on a person' : then || 'Done'}
    </span>
  )
}
