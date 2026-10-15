'use client'
import { motion } from 'framer-motion'
import { STATE } from '../board'
import { useSteps } from '../steps'
import { Avatar } from '../employees'
import { Frame, Dot, GLYPH, H, Q } from './shared'

// Finance: the season board (dashboards-2026-10-15/finance.md, operating-
// systems-2026-10-15/finance.md section 7): the principal's Tuesday in August.
// Four counters and the on-time figure, the fat waiting-on-client column
// where every card says what is missing, since when and who is on it, one card
// lifting to ready as a reply is read, the reply against last year's list on
// the right, one "Approve and send". Value shown as the waiting column
// shrinking, never as a dollar figure. Every name and figure is made up.

const COLS = [
  ['Not yet in', 41, [['R. Okafor', 'Individual', '31 Oct', 'penny', 'Penny · reminder 1 sent'], ['L. Marsh', 'Sole trader', '31 Oct', 'penny', 'Penny · reminder 2 sent Mon'], ['F. Dunn', 'Individual · rental', '31 Oct', 'penny', 'Penny · reminder 1 sent'], ['T. Vo', 'Individual', '31 Oct', null, 'Not contacted']]],
  ['Waiting on client', 63, [['D. Nguyen', 'Individual · rental', '31 Oct', 'nora', 'Nora · 7 of 9 in · 3 days'], ['B. Carter', 'Individual', '31 Oct', 'nora', 'Nora · 6 of 6 in'], ['S. Patel', 'Sole trader', '31 Oct', 'nora', 'Nora · 4 of 8 in · 9 days'], ['M. Ling', 'Individual', '31 Oct', 'nora', 'Nora · 2 of 5 in · 12 days']]],
  ['Ready to prepare', 38, [['E. Fox', 'Individual', '31 Oct', null, 'Assigned to Sam'], ['K. Rowe', 'Company', '28 Feb', null, 'Assigned to Priya'], ['A. Hart', 'Individual · rental', '31 Oct', null, 'Assigned to Sam']]],
  ['In review', 17, [['J. Kemp', 'Individual', '31 Oct', null, 'With Sam'], ['C. Abe', 'Trust', '28 Feb', null, 'With Priya'], ['N. Diaz', 'Individual', '31 Oct', null, 'With Sam']]],
  ['Ready to lodge', 9, [['H. Ward', 'Individual', '31 Oct', 'owen', 'Owen · to sign, with client'], ['P. Shaw', 'Individual', '31 Oct', 'owen', 'Owen · signed, lodging today'], ['G. Ito', 'Sole trader', '31 Oct', 'owen', 'Owen · submitted, awaiting the tax office']]],
]
const CHECK = [
  ['Income statement', 'Received', 1, STATE.done], ['Private health statement', 'Received', 2, STATE.done],
  ['Rental statement', 'Short: Jul to Mar in, Apr to Jun missing', 3, STATE.waiting], ['Dividend statements', 'Missing', 3, STATE.queued],
]

function JobCard({ c, extra, moving, lifted }) {
  const [name, type, due, g, line] = c
  return (
    <motion.div layout={moving ? true : undefined} layoutId={moving ? 'carter' : undefined} className="rounded-[6px] border border-[#111]/10 bg-white px-2.5 py-2" style={lifted ? { boxShadow: '0 8px 20px -10px rgba(0,0,0,.35)' } : undefined}>
      <div className="flex items-baseline justify-between gap-2 min-w-0">
        <p className="text-[11.5px] font-semibold min-w-0 truncate">{name}</p>
        <span className="text-[9.5px] font-mono text-[#777] whitespace-nowrap shrink-0">{due}</span>
      </div>
      <p className="text-[10.5px] text-[#777] truncate">{type}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-[#333] truncate">
        {g ? <Avatar glyph={GLYPH[g]} size={13} mode={extra === 'done' ? 'done' : 'still'} /> : <Dot c={STATE.queued} size={5} />}
        <span className="truncate">{extra === 'done' ? 'Penny · request sent 8:04' : line}</span>
      </p>
    </motion.div>
  )
}

export default function FinanceBoard({ play = false }) {
  const run = useSteps(play, 6, 850)
  const n = play ? run : 6
  const moved = n >= 6
  const waiting = moved ? 62 : 63
  const ready = moved ? 39 : 38
  return (
    <Frame bar="Season board · an example accounting practice" right="Tax season · Tuesday 8:12am">
      <div className="flex items-center gap-6 px-5 h-[44px] border-b border-[#111]/10 text-[12px]">
        <span className="font-medium">2026 individual returns</span>
        {[['312', 'clients'], [waiting, 'waiting on client'], [ready, 'ready to prepare'], ['17', 'in review'], ['112', 'lodged'], ['94%', 'lodged on time']].map(([v, k], i) => (
          <span key={k} className={`flex items-baseline gap-1.5 ${i === 0 ? 'border-l border-[#111]/10 pl-6' : ''}`}><b className="text-[15px] tabular-nums tracking-[-0.01em]">{v}</b><span className="text-[#777]">{k}</span></span>
        ))}
      </div>
      <div className="grid grid-cols-[756px_1fr]" style={{ height: H - 42 - 44 }}>
        <div className="bg-[#F6F6F3] border-r border-[#111]/10 p-3 grid grid-cols-5 gap-2 content-start">
          {COLS.map(([title, count, cards], ci) => (
            <div key={title} className="min-w-0">
              <p className="flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-[#555] mb-2 px-0.5">
                <span className="truncate">{title}</span>
                <span className="rounded-full bg-[#111]/8 px-1.5 py-[1px] text-[10px] tabular-nums tracking-normal">{ci === 1 ? waiting : ci === 2 ? ready : count}</span>
              </p>
              <div className="grid grid-cols-1 gap-2">
                {cards.filter((c) => !(ci === 1 && c[0] === 'B. Carter' && moved)).map((c) => (
                  <JobCard key={c[0]} c={c} extra={ci === 1 && c[0] === 'D. Nguyen' && n >= 5 ? 'done' : ''} moving={c[0] === 'B. Carter'} lifted={c[0] === 'B. Carter' && n >= 5 && play} />
                ))}
                {ci === 2 && (moved ? <JobCard c={COLS[1][2][1]} moving /> : n >= 5 ? <div className="rounded-[6px] border border-dashed border-[#111]/20 h-[62px]" /> : null)}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 flex flex-col gap-2 min-w-0">
          <div className="rounded-xl border border-[#111]/10 p-3">
            <div className="flex items-center gap-2.5 mb-2">
              <Avatar glyph={GLYPH.nora} size={26} mode={n >= 1 && n < 4 ? 'scan' : n >= 4 ? 'done' : 'still'} />
              <p className="text-[12.5px]"><b>Nora</b> <span className="text-[#777]">· Intake</span></p>
              <span className="ml-auto text-[11px] text-[#777]">{n >= 1 ? 'reading a reply' : 'watching the inbox'}</span>
            </div>
            {n >= 1 ? (
              <motion.div initial={play ? { opacity: 0, y: 4 } : false} animate={{ opacity: 1, y: 0 }} className="rounded-[6px] bg-[#F6F6F3] px-2.5 py-1.5 text-[11px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex w-4 h-4 rounded-full bg-[#111]/10 items-center justify-center text-[9px] font-semibold shrink-0">D</span>
                  <span className="font-medium whitespace-nowrap">D. Nguyen</span><span className="text-[#777] truncate">· here you go</span>
                  <span className="ml-auto text-[#999] font-mono text-[10px] shrink-0">7:52am</span>
                </div>
                <div className="mt-1 flex gap-1 pl-6">{['IMG_4471', 'IMG_4472', 'IMG_4473', 'rental.pdf'].map((f) => <span key={f} className="rounded-[3px] border border-[#111]/15 px-1 text-[9px] font-mono text-[#555]">{f}</span>)}</div>
              </motion.div>
            ) : (
              <div className="rounded-[6px] border border-dashed border-[#111]/15 px-2.5 py-2 text-[11px] text-[#999]">Nothing new since 7:40am.</div>
            )}
            <p className="mt-2 text-[10.5px] text-[#777]">Checklist built from last year{Q}s return · <span className="tabular-nums">{n >= 3 ? 7 : n >= 2 ? 5 : n >= 1 ? 3 : 0} of 9 items</span></p>
            <div className="mt-1 grid gap-[3px]">
              {CHECK.map(([k, v, at, c]) => (
                <div key={k} className="flex items-center gap-2 text-[11.5px]">
                  <Dot c={n >= at ? c : STATE.queued} size={6} />
                  <span className="font-medium whitespace-nowrap">{k}</span>
                  <span className="text-[#777] truncate">{n >= at ? v : 'waiting'}</span>
                </div>
              ))}
            </div>
          </div>
          <motion.div animate={n >= 5 ? { borderColor: STATE.done } : n >= 4 ? { borderColor: STATE.waiting } : {}} className="rounded-xl border border-[#111]/10 p-3">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Avatar glyph={GLYPH.penny} size={26} mode={n >= 5 ? 'done' : n >= 4 ? 'wait' : 'still'} />
              <p className="text-[12.5px]"><b>Penny</b> <span className="text-[#777]">· Requests</span></p>
              <span className="ml-auto text-[11px] text-[#777]">{n >= 4 ? '7:55am' : ''}</span>
            </div>
            {n >= 4 ? (
              <p className="text-[11.5px] leading-[1.4] text-[#333]">“Thanks Mrs Nguyen, nearly there. We still need April to June of the rental statement and your dividend statements.”</p>
            ) : (
              <p className="text-[11.5px] text-[#999]">No request to send yet.</p>
            )}
            <motion.div animate={n >= 5 && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-2 rounded-[7px] text-center text-[12px] py-1.5 ${n >= 5 ? 'bg-[#E8F7EE] text-[#0E8F53]' : n >= 4 ? 'bg-[#111] text-white' : 'bg-[#111]/5 text-[#999]'}`}>
              {n >= 5 ? 'Approved by Sam · 8:04am' : 'Approve and send'}
            </motion.div>
          </motion.div>
          <p className="mt-auto text-[10.5px] text-[#999] leading-tight">Nora, Penny and Owen are AI employees. A person approves what goes out. Example figures.</p>
        </div>
      </div>
    </Frame>
  )
}
