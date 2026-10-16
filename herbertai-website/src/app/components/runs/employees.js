'use client'
import { motion } from 'framer-motion'
import { STATE } from './board'

// The AI employees (CHARTER.md, "The AI employees", 13 Oct 2026): a plain first
// name with the job always beside it, a 7x7 dot-grid avatar drawn from the job,
// and three lines of one example day each. The six are the original idea from
// each industry (product/research/markdown/industries-2026-10-13-ideas.md),
// approved by Will on 14 Oct 2026 ("yes, the names u have are good"). Clients
// name their own at kickoff; these are the site's examples, and every figure
// on them is made up.

const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))

export const EMPLOYEES = [
  {
    name: 'Gus', job: 'Recoveries', what: 'Compares every signed agreement with what the ledger actually charged', where: 'Property',
    glyph: G(['..XXX..', '.X.X.X.', '.X.X...', '..XXX..', '...X.X.', '.X.X.X.', '..XXX..']),
    feed: [['Letting fee in the agreement, never charged: $1,100', 'done'], ['Water usage $214 not passed to the tenant', 'wait', 'Approved by Jess, invoiced'], ['Duplicate plumber invoice found, $380', 'done']],
    count: 11620, countLabel: 'found this month',
  },
  {
    name: 'Vic', job: 'Margins', what: 'Tells the owner which kinds of jobs are priced wrong', where: 'Trades',
    glyph: G(['.......', '.X.....', '.X...X.', '.X.X.X.', '.X.X.X.', '.X.X.X.', 'XXXXXXX']),
    feed: [['Double-storey ducted: quoted 28%, made 16%', 'done'], ['Gas fitting quotes thin since the price rise', 'wait', 'Template reviewed by Dave'], ['Won 11 of 13 ducted jobs, price holds', 'done']],
    count: 38, countLabel: 'quotes checked',
  },
  {
    name: 'Fern', job: 'Scope', what: 'Flags client requests outside the engagement letter before the work starts', where: 'Finance',
    glyph: G(['.XXXXX.', '.X...X.', '.XXXXX.', '.X...X.', '.X...X.', '.X...X.', '.XXXXX.']),
    feed: [['“Quick letter for the bank”: outside scope, usual fee $220', 'wait', 'Quoted by Sam'], ['BAS query: inside the engagement, no charge', 'done'], ['Free work this month down to $2,880', 'done']],
    count: 3100, countLabel: 'free work caught',
  },
  {
    name: 'Rita', job: 'Rebookings', what: 'Brings back every function when its date comes round again', where: 'Hospitality',
    glyph: G(['..XXX..', '.X...X.', 'X.....X', 'X......', 'X...X.X', '.X...XX', '..XXXXX']),
    feed: [['Last year’s Christmas party, 42 guests: back room held for 11 Dec', 'done'], ['Draft to Priya with last year’s menu', 'wait', 'Approved by Jess, sent'], ['Priya replied: yes, please hold it', 'done']],
    count: 14, countLabel: 'dates held',
  },
  {
    name: 'Joy', job: 'Milestones', what: 'Remembers the goal each patient named and asks how it went', where: 'Health',
    glyph: G(['.X.....', '.XXXXX.', '.XXXXX.', '.XXXX..', '.X.....', '.X.....', '.X.....']),
    feed: [['Priya’s goal from 3 June: run the City-Bay', 'done'], ['City-Bay was yesterday: draft from Alex ready', 'wait', 'Approved by Alex, sent'], ['Priya replied, booked Wednesday', 'done']],
    count: 23, countLabel: 'goals remembered',
  },
  {
    name: 'Ray', job: 'Promises', what: 'Keeps every promise made to a customer, or the customer hears first', where: 'Every industry',
    glyph: G(['.......', '......X', '.....X.', 'X...X..', '.X.X...', '..X....', '.......']),
    feed: [['Job note: “send price for 2nd split by Fri”', 'done'], ['Friday, not sent: update to Mrs Patel drafted', 'wait', 'Approved by Dave, sent'], ['Price sent Monday, promise kept', 'done']],
    count: 52, countLabel: 'promises tracked',
  },
]

const INK = '#111'

// mode: 'still' | 'scan' (dots light one by one: at work) | 'wait' (a wave
// of amber passes through the dots and fades back to ink, looping while the
// job waits on a person) | 'done' (green sweeps through once and stays on
// every dot it reaches). Will, 16 Oct 2026: "the yellow colour ripples
// through the symbol and then the green ripples through ... no the amber
// shouldnt stay, only the green". scanKey restarts the scan.
const WAVE = 0.05 // seconds between one diagonal of dots and the next
export function Avatar({ glyph, mode = 'still', size = 52, scanKey = 0 }) {
  const n = glyph.length
  const gap = size / n
  const r = gap * 0.32
  const on = []
  glyph.forEach((row, y) => row.forEach((v, x) => v && on.push(`${x}-${y}`)))
  const rest = mode === 'done' ? STATE.done : INK
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="shrink-0">
      {glyph.map((row, y) =>
        row.map((v, x) => {
          const cx = x * gap + gap / 2
          const cy = y * gap + gap / 2
          if (!v) return <circle key={`${x}-${y}`} cx={cx} cy={cy} r={r * 0.55} fill={INK} opacity={0.1} />
          const i = on.indexOf(`${x}-${y}`)
          const w = (x + y) * WAVE
          const anim =
            mode === 'scan'
              ? { initial: { opacity: 0.15, fill: INK }, animate: { opacity: 1, fill: INK }, transition: { delay: i * 0.035, duration: 0.25 } }
              : mode === 'wait'
                ? { initial: { opacity: 1, fill: INK }, animate: { opacity: 1, fill: [INK, STATE.waiting, STATE.waiting, INK] }, transition: { delay: w, duration: 0.8, repeat: Infinity, repeatDelay: 0.9, ease: 'easeInOut' } }
                : mode === 'done'
                  ? { initial: false, animate: { opacity: 1, fill: STATE.done }, transition: { delay: w, duration: 0.3 } }
                  : { initial: false, animate: { opacity: 1, fill: INK }, transition: { duration: 0.25 } }
          return <motion.circle key={`${x}-${y}-${scanKey}`} cx={cx} cy={cy} r={r} fill={rest} {...anim} />
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
