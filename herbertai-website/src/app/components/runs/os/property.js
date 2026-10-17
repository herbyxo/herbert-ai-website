'use client'
import { motion } from 'framer-motion'
import { STATE } from '../board'
import { useSteps } from '../steps'
import { Avatar } from '../employees'
import { Frame, Dot, Status, GLYPH, H, Q } from './shared'

// Property: the owner's Monday page (operating-systems-2026-10-15/property.md,
// section 7). The modules down the side, six small tiles in the stat-strip
// idiom, the week as a list of jobs with the employee on each row, one amber
// row, one approval card, one grey line about hours. Work already done with
// one decision left. Every name and figure is made up.

const NAV = ['Today', 'Approvals', 'Maintenance', 'Leasing', 'Arrears', 'Inspections', 'Renewals', 'Comms', 'Landlords']
const ROWS = [
  ['Hot water, 12 Elm St', 'Emma', 'emma', 'wait'],
  ['Rent review, 14 Elm St', 'Kate', 'kate', 2, 'Approved, notice sent', 'Notice drafted, three comparables'],
  ['8 Sturt St, 15 days behind', 'Rose', 'rose', 3, 'Reminder sent, promised Wednesday', 'Reminder drafted'],
  ['22 Park Ave, 4 enquiries', 'Leo', 'leo', 0, 'Answered, 2 inspection slots booked'],
  ['5 Rose Tce, routine inspection', 'Owen', 'owen', 0, 'Report drafted, dripping tap raised with Emma'],
  ['Smoke alarm invoice #1182', 'Gus', 'gus', 0, 'Matched to the agreement, $140'],
  ['3 Rose Tce, dripping tap', 'Emma', 'emma', 0, 'Two quotes in, inside the limit'],
]
const TEAM = [['Emma', 'Maintenance', 'emma'], ['Kate', 'Renewals', 'kate'], ['Rose', 'Arrears', 'rose'], ['Leo', 'Leasing', 'leo'], ['Owen', 'Inspections', 'owen'], ['Gus', 'Recoveries', 'gus']]

export default function PropertyHub({ play = false }) {
  const run = useSteps(play, 5, 900)
  const n = play ? run : 5
  const approved = n >= 4
  const tiles = [
    ['34', 'requests this week'], [approved ? '31' : '30', 'handled by employees'], [approved ? '3' : '4', 'needed a person'],
    ['9', 'behind, 7 paid by Wednesday'], ['11', 'renewals decided, 0 late'], ['2', 'landlords at risk, both called'],
  ]
  return (
    <Frame bar="Operations hub · an example property agency" right="Monday · 7:00am">
      <div className="grid grid-cols-[164px_1fr_296px]" style={{ height: H - 42 }}>
        <aside className="bg-[#F6F6F3] border-r border-[#111]/10 px-3 py-4">
          <p className="px-2 text-[11px] text-[#999] mb-3">Example agency</p>
          <div className="grid gap-[1px]">
            {NAV.map((k) => (
              <div key={k} className={`flex items-center justify-between rounded-[7px] px-2 py-[6px] text-[12.5px] ${k === 'Today' ? 'bg-white border border-[#111]/10 font-medium text-[#111]' : 'text-[#666]'}`}>
                <span>{k}</span>
                {k === 'Approvals' && <span className={`text-[11px] tabular-nums rounded-full px-1.5 py-[1px] ${approved ? 'bg-[#111]/8 text-[#555]' : 'bg-[#F5A623] text-white'}`}>{approved ? 0 : 1}</span>}
              </div>
            ))}
          </div>
        </aside>
        <div className="px-6 py-5 min-w-0 flex flex-col">
          <div className="grid grid-cols-6 gap-2">
            {tiles.map(([v, k]) => (
              <div key={k} className="rounded-lg border border-[#111]/10 px-2.5 py-2">
                <p className="text-[18px] font-semibold tracking-[-0.02em] tabular-nums leading-none">{v}</p>
                <p className="mt-1 text-[10.5px] text-[#777] leading-tight">{k}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 mb-1 text-[12px] text-[#777]">This week</p>
          <div>
            {ROWS.map(([what, who, g, at, doneText, beforeText], i) => {
              const isAmber = at === 'wait'
              const done = !isAmber && n >= at
              const text = isAmber ? (approved ? 'Booked 8:30am, tenant told' : 'Waiting on you') : done ? doneText : beforeText || doneText
              const s = isAmber ? (approved ? 'done' : 'waiting') : done ? 'done' : 'queued'
              return (
                <motion.div key={i} initial={play ? { opacity: 0, x: -6 } : false} animate={{ opacity: 1, x: 0 }} className={`grid grid-cols-[1fr_120px_1fr] gap-3 items-center h-[31px] border-t border-[#111]/8 text-[12.5px] ${isAmber && !approved ? 'bg-[#FFF7E8]' : ''}`}>
                  <span className="truncate text-[#111]">{what}</span>
                  <span className="flex items-center gap-1.5 text-[11.5px] text-[#555]"><Avatar glyph={GLYPH[g]} size={14} mode={s === 'done' ? 'done' : s === 'waiting' ? 'wait' : 'still'} />{who}</span>
                  <Status s={s} size={11.5}>{text}</Status>
                </motion.div>
              )
            })}
          </div>
          <p className="mt-auto text-[12px] text-[#999]">{approved ? '26' : '25'} hours handled by employees this week, 3 by a person.</p>
        </div>
        <div className="border-l border-[#111]/10 px-5 py-5 flex flex-col">
          <p className="text-[12px] text-[#777] mb-2">Waiting on you</p>
          {n >= 1 ? (
            <motion.div initial={play ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0, borderColor: approved ? STATE.done : STATE.waiting }} className="rounded-xl border border-[#111]/10 p-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar glyph={GLYPH.emma} size={32} mode={approved ? 'done' : 'wait'} />
                <p className="text-[12.5px]"><b>Emma</b> <span className="text-[#777]">· Maintenance · 7:00am</span></p>
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.4] text-[#333]">Hot water at 12 Elm St. Plumber $380, inside the landlord{Q}s $500 limit. Booked 8:30am unless you say no.</p>
              <motion.div animate={approved && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-2.5 rounded-[7px] text-center text-[12px] py-1.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
                {approved ? 'Approved by Jess · 7:05am' : 'Approve'}
              </motion.div>
            </motion.div>
          ) : (
            <div className="rounded-xl border border-dashed border-[#111]/15 p-5 text-center text-[12px] text-[#999]">Nothing yet.</div>
          )}
          <p className="mt-5 mb-2 text-[12px] text-[#777]">On the board</p>
          <div className="grid gap-[8px]">
            {TEAM.map(([who, job, g]) => (
              <div key={who} className="flex items-center gap-2.5 min-w-0">
                <Avatar glyph={GLYPH[g]} size={22} mode={n > 0 ? 'scan' : 'still'} />
                <p className="text-[12px] truncate"><b>{who}</b> <span className="text-[#777]">· {job}</span></p>
              </div>
            ))}
          </div>
          <p className="mt-auto flex items-center gap-2 text-[11px] text-[#777]"><Dot c={STATE.waiting} size={6} />a person approves what goes out</p>
        </div>
      </div>
    </Frame>
  )
}
