'use client'
import { motion } from 'framer-motion'
import { STATE } from '../board'
import { useSteps } from '../steps'
import { Avatar } from '../employees'
import { Frame, Dot, GLYPH, H, Q } from './shared'

// Trades: the dispatch board the office lives in (dashboards-2026-10-15/
// trades.md) with the owner's 7am numbers under it (operating-systems-2026-10-15/
// trades.md, section 7): technicians as rows, hours across, a now-line, the
// scheduler's placements going solid and the unassigned job sliding into
// Jack's 2pm; the strip of figures the owner already watches; the one reply
// waiting on him and the timestamped list of what the roster did. Every name
// and figure is made up.

const HOUR = 64 // px per hour, 7am to 5pm
const TECHS = ['Sam', 'Priya', 'Jack', 'Luke', 'Tom', 'Unassigned']
const JOBS = [
  [0, 0.5, 2, '#2214', 'Nguyen · install', ''], [0, 3, 2, '#2209', 'Hall · service', ''], [0, 6, 3, '#2216', 'Reid · install', ''],
  [1, 0, 2, '#2211', 'Costa · service', ''], [1, 2.5, 2, '#2215', 'Webb · service', ''], [1, 6, 2, '#2208', 'Kaur · install', ''], [1, 8.5, 1.5, '#2219', 'Moss · measure and quote', 'placed'],
  [2, 0, 3, '#2205', 'Ito · install', ''], [2, 3.5, 1.5, '#2217', 'Lund · service', ''],
  [3, 1, 4, '#2207', 'Park · install', ''], [3, 6, 1.5, '#2218', 'Ali · measure and quote', 'placed'], [3, 7.5, 2.5, '#2212', 'Bell · service', ''],
  [4, 0, 2.5, '#2203', 'Ruiz · install', ''], [4, 3, 1, '#2213', 'Hale · service', ''], [4, 5.5, 4.5, '#2210', 'Chen · install', ''],
]
const MOVE = { job: '#2220', text: 'Dale · service', fromRow: 5, fromStart: 7, toRow: 2, toStart: 7, len: 2 }
const FEED = [
  ['vic', 'Vic', '7:02', `Drafted invoice #2207 from Luke${Q}s job card, $1,420`, 0],
  ['max', 'Max', '7:15', 'Booked Thu 10am measure and quote, 14 Elm St', 0],
  ['kit', 'Kit', '7:16', 'Placed it with Sam, 40 min from his 8am', 0],
  ['vic', 'Vic', '9:30', 'Asked Tom for the gas fitting quantities on #2203', 0],
  ['max', 'Max', '10:41', 'Reply to Priya sent, quote unchanged', 5],
]
const clock = (h) => { const hh = Math.floor(h); return `${hh > 12 ? hh - 12 : hh}${h % 1 ? ':30' : ''}${hh >= 12 ? 'pm' : 'am'}` }

function JobBlock({ j, solid, moving }) {
  const [row, start, len, job, text, kind] = j
  const dashed = kind === 'placed' && !solid
  return (
    <motion.div layout={moving ? true : undefined} layoutId={moving ? 'dale' : undefined} className={`absolute rounded-[5px] px-2 py-[5px] overflow-hidden border ${dashed ? 'border-dashed border-[#111]/35 bg-white' : 'border-[#111]/10 bg-[#EFEFEB]'}`} style={{ left: start * HOUR + 2, top: row * 38 + 3, width: len * HOUR - 4, height: 32 }}>
      <p className="text-[10.5px] font-semibold leading-tight truncate">{job} <span className="font-normal text-[#555]">{text}</span></p>
      <p className="text-[9.5px] text-[#777] leading-tight truncate">{kind === 'placed' ? (dashed ? 'placed by Kit · to confirm' : 'confirmed') : kind === 'move' ? 'from Unassigned · Kit' : `${clock(7 + Math.floor(start * 2) / 2)} · ${len}h`}</p>
    </motion.div>
  )
}

export default function TradesOffice({ play = false }) {
  const run = useSteps(play, 5, 850)
  const n = play ? run : 5
  const solid = n >= 2
  const moved = n >= 3
  const approved = n >= 4
  const hours = ['7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
  const moveJob = [moved ? MOVE.toRow : MOVE.fromRow, moved ? MOVE.toStart : MOVE.fromStart, MOVE.len, MOVE.job, MOVE.text, moved ? 'move' : '']
  const tiles = [
    ['3', 'quote requests answered overnight, median 52 seconds'], ['2', 'measure and quotes booked'], ['$184,000', 'in open quotes'],
    [approved ? '5 of 7' : '4 of 7', 'jobs done this week invoiced'], ['$46,200', 'overdue, 4 reminders sent'], ['6', 'services booked for next week'], ['2', 'certificates due by Thursday'],
  ]
  return (
    <Frame bar="Office · an example air conditioning business" right="Tuesday · 10:40am">
      <div className="grid grid-cols-[820px_1fr]" style={{ height: H - 42 }}>
        <div className="border-r border-[#111]/10 flex flex-col min-w-0">
          <div className="flex items-center gap-5 px-4 h-[30px] border-b border-[#111]/10 text-[11.5px]">
            {[['Board', null], ['Enquiries', 6], ['Quotes', 12], ['Jobs', 35], ['Invoices', 7], ['Service due', 17], ['Certificates', 4]].map(([k, c]) => (
              <span key={k} className={`flex items-center gap-1.5 ${k === 'Board' ? 'font-semibold text-[#111]' : 'text-[#666]'}`}>{k}{c != null && <span className="text-[10px] tabular-nums rounded-full bg-[#111]/8 px-1.5 text-[#555]">{c}</span>}</span>
            ))}
          </div>
          <div className="relative px-4 pt-2">
            <div className="grid grid-cols-[140px_1fr]">
              <span />
              <div className="relative h-[18px]">
                {hours.map((h, i) => <span key={h} className="absolute -top-[1px] text-[10px] font-mono text-[#999]" style={{ left: i * HOUR - 10 }}>{h}</span>)}
                <span className="absolute -top-[2px] text-[9px] font-mono text-white bg-[#111] rounded-[3px] px-1 leading-[14px]" style={{ left: 3.67 * HOUR - 16 }}>10:40</span>
              </div>
            </div>
            <div className="grid grid-cols-[140px_1fr]">
              <div>
                {TECHS.map((t, i) => (
                  <div key={t} className="h-[38px] flex items-center gap-2 border-t border-[#111]/8 text-[11.5px]">
                    {t === 'Unassigned' ? <span className="w-5 h-5 rounded-full border border-dashed border-[#111]/30" /> : <span className="w-5 h-5 rounded-full bg-[#111]/10 inline-flex items-center justify-center text-[9.5px] font-semibold">{t[0]}</span>}
                    <span className={t === 'Unassigned' ? 'text-[#777]' : 'font-medium'}>{t}</span>
                    {t !== 'Unassigned' && <span className="ml-auto mr-2 text-[9.5px] text-[#999] tabular-nums">{[6.5, 7, 5.5, 7.5, 8][i]}h · {[3, 4, 3, 3, 3][i]} jobs</span>}
                  </div>
                ))}
              </div>
              <div className="relative overflow-hidden" style={{ height: 6 * 38 }}>
                {TECHS.map((t, i) => <div key={t} className="absolute left-0 right-0 border-t border-[#111]/8" style={{ top: i * 38 }} />)}
                {hours.map((h, i) => <div key={h} className="absolute top-0 bottom-0 border-l border-[#111]/6" style={{ left: i * HOUR }} />)}
                {JOBS.map((j) => <JobBlock key={j[3]} j={j} solid={solid} />)}
                <JobBlock j={moveJob} solid moving />
                <div className="absolute top-0 bottom-0 border-l border-dashed border-[#111]/50" style={{ left: 3.67 * HOUR }} />
              </div>
            </div>
          </div>
          <div className="mt-auto border-t border-[#111]/10 bg-[#F6F6F3] px-4 py-3">
            <p className="text-[10.5px] text-[#777] mb-1.5">Since yesterday, in the owner{Q}s own figures. Example figures.</p>
            <div className="grid grid-cols-7 gap-2">
              {tiles.map(([v, k]) => (
                <div key={k} className="min-w-0">
                  <p className="text-[15px] font-semibold tracking-[-0.01em] tabular-nums leading-none whitespace-nowrap">{v}</p>
                  <p className="mt-1 text-[10px] text-[#777] leading-tight">{k}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="px-4 py-4 flex flex-col min-w-0">
          <p className="text-[12.5px] font-semibold mb-2.5">Waiting on Dave <span className="ml-1.5 font-normal text-[12px] text-[#777] tabular-nums">{approved ? 'nothing' : '1'}</span></p>
          <motion.div animate={approved ? { borderColor: STATE.done } : n >= 1 ? { borderColor: STATE.waiting } : {}} className="rounded-xl border border-[#111]/10 p-3">
            <div className="flex items-center gap-2.5">
              <Avatar glyph={GLYPH.max} size={28} mode={approved ? 'done' : n >= 1 ? 'wait' : 'still'} />
              <p className="text-[12.5px]"><b>Max</b> <span className="text-[#777]">· Sales Coordinator</span></p>
              <span className="ml-auto text-[11px] text-[#777]">10:36</span>
            </div>
            <p className="mt-2 text-[11.5px] text-[#333]">Priya asks: “does $4,860 include removing the old unit?”</p>
            <p className="mt-1.5 rounded-[6px] bg-[#F6F6F3] px-2.5 py-2 text-[11.5px] leading-[1.4] text-[#333]">“Yes, removal and disposal of the old split system is in the price, and the install is still Thursday at 10am.”</p>
            <motion.div animate={approved && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-2 rounded-[7px] text-center text-[12px] py-1.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
              {approved ? 'Approved by Dave · sent 10:41' : 'Approve'}
            </motion.div>
          </motion.div>
          <p className="mt-4 mb-1.5 text-[11px] text-[#777]">Done since 7am</p>
          <div className="grid gap-[7px]">
            {FEED.filter((f) => n >= f[4]).map(([g, who, t, text], i) => (
              <motion.div key={i} initial={play ? { opacity: 0, y: 4 } : false} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-[16px_34px_1fr] gap-2 items-start text-[11px]">
                <Avatar glyph={GLYPH[g]} size={14} mode="still" />
                <span className="font-mono text-[10px] text-[#999] tabular-nums pt-[1px]">{t}</span>
                <span className="text-[#333] leading-[1.35]"><b className="font-medium">{who}</b> · {text}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-auto flex items-center gap-2 text-[11px] text-[#777]"><Dot c={STATE.waiting} size={6} />every message that names a price waits for one tap</p>
        </div>
      </div>
    </Frame>
  )
}
