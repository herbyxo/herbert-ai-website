'use client'
import { motion } from 'framer-motion'
import { STATE } from '../board'
import { useSteps } from '../steps'
import { Avatar } from '../employees'
import { Frame, Dot, GLYPH, H, Q } from './shared'

// Health: the appointment book every clinic opens to (dashboards-2026-10-15/
// health.md) with the owner's weekly page beside it (operating-systems-2026-10-15/
// health.md, section 7): time down the side, practitioners across, the
// cancelled 2:15pm the only dashed block; on the right one line read in five
// seconds, its parts in plain rows, one episode card showing the hand-off, a
// strip about what waited for a person, one Approve. Every name and figure is
// made up.

const ROW = 24 // px per half hour
const PRACS = ['Chris', 'Priya', 'Sam', 'Mei']
const TINT = { std: '#EFEFEB', init: '#E3E3DD', rev: '#F6F6F3', cls: '#E9ECE6' }
const APPTS = [
  [0, 0, 2, 'A. Nguyen', 'std', '✓'], [0, 2, 2, 'J. Lee', 'init', '✓ ◎'], [0, 4, 2, 'M. Rossi', 'rev', '✓'], [0, 7, 2, 'P. Shah', 'std', ''], [0, 10, 2, 'K. Dale', 'std', '◎'], [0, 15, 2, 'T. Burke', 'std', ''], [0, 17, 1, 'R. Holt', 'rev', ''],
  [1, 1, 2, 'D. Kaur', 'std', '✓'], [1, 3, 2, 'S. Ito', 'init', '✓'], [1, 5, 2, 'L. Webb', 'std', ''], [1, 11, 2, 'B. Osei', 'std', ''], [1, 13, 2, 'E. Park', 'rev', '◎'], [1, 16, 2, 'N. Ali', 'std', ''],
  [2, 0, 2, 'H. Tran', 'std', '✓'], [2, 2, 2, 'F. Moss', 'std', '✓'], [2, 4, 2, 'G. Lund', 'init', '✓'], [2, 6, 2, 'C. Reid', 'std', ''], [2, 12, 2, 'Class · 6/8', 'cls', ''], [2, 14, 2, 'O. Bell', 'std', ''], [2, 16, 2, 'V. Ruiz', 'rev', ''],
  [3, 10, 2, 'I. Wong', 'init', '◎'], [3, 12, 2, 'U. Dias', 'std', ''], [3, 14, 2, 'W. Hale', 'std', ''], [3, 16, 2, 'Y. Chen', 'rev', ''],
]
const HERO = { col: 0, start: 12.5, len: 1.5 }
const MATCHES = [['Sam T.', 'wants Chris, afternoons'], ['Jo K.', 'wants Chris, any day'], ['Dana R.', 'wants afternoons']]

function Block({ a }) {
  const [col, start, len, name, type, glyphs] = a
  return (
    <div className="absolute rounded-[5px] px-2 py-1 overflow-hidden" style={{ left: col * 173 + 2, top: start * ROW + 1, width: 169, height: len * ROW - 3, background: TINT[type] }}>
      <p className="text-[11px] font-semibold leading-tight truncate">{name}</p>
      {len >= 2 && <p className="text-[10px] text-[#777] leading-tight">{type === 'init' ? 'Initial' : type === 'rev' ? 'Review' : type === 'cls' ? 'Class' : 'Standard'}{glyphs ? ` · ${glyphs}` : ''}</p>}
    </div>
  )
}

export default function HealthBoard({ play = false }) {
  const run = useSteps(play, 6, 850)
  const n = play ? run : 6
  const approved = n >= 2
  const filled = n >= 4
  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
  const week = [
    [`11 late cancellations, ${filled ? 8 : 7} filled`, filled ? STATE.done : STATE.queued],
    ['3 patients at their last funded session, 3 referral requests sent', STATE.done],
    ['4 patients checked in, 1 rebooked', STATE.done],
    ['10 letters drafted, 10 signed', STATE.done],
    ['$4,200 over 30 days, 2 chasers sent', STATE.queued],
  ]
  return (
    <Frame bar="Appointment book · an example physio clinic" right="Tuesday · 8:12am">
      <div className="grid grid-cols-[44px_736px_1fr]" style={{ height: H - 42 }}>
        <aside className="bg-[#111] flex flex-col items-center gap-4 pt-4">
          {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className={`block w-4 h-4 rounded-[4px] ${i === 1 ? 'bg-white' : 'bg-white/25'}`} />)}
        </aside>
        <div className="relative overflow-hidden border-r border-[#111]/10">
          <div className="grid grid-cols-[44px_1fr] h-[30px] border-b border-[#111]/10 text-[12px]">
            <span />
            <div className="grid grid-cols-4">{PRACS.map((x) => <span key={x} className="px-3 flex items-center font-medium">{x}</span>)}</div>
          </div>
          <div className="relative" style={{ height: 18 * ROW }}>
            {hours.map((h, i) => (
              <div key={h} className="absolute left-0 right-0 border-t border-[#111]/8" style={{ top: i * 2 * ROW }}>
                <span className="absolute left-2 -top-[7px] text-[10px] font-mono text-[#999] bg-white pr-1">{h}</span>
              </div>
            ))}
            <div className="absolute top-0 bottom-0" style={{ left: 44, width: 692 }}>
              <div className="absolute inset-0 grid grid-cols-4">
                {PRACS.map((x, i) => <div key={x} className="border-l border-[#111]/8" style={{ background: i === 3 ? 'repeating-linear-gradient(135deg, transparent 0 6px, rgba(17,17,17,.04) 6px 7px)' : 'none', backgroundSize: '100% 240px', backgroundRepeat: 'no-repeat' }} />)}
              </div>
              {APPTS.map((a) => <Block key={a[3] + a[0]} a={a} />)}
              <motion.div
                animate={filled ? { borderStyle: 'solid', borderColor: STATE.done, background: '#EAF8F0' } : n >= 1 ? { borderColor: STATE.waiting } : {}}
                className="absolute rounded-[5px] px-2 py-1 border-2 border-dashed"
                style={{ left: HERO.col * 173 + 2, top: HERO.start * ROW + 1, width: 169, height: HERO.len * ROW - 3, borderColor: '#BDBDBD' }}
              >
                {filled ? (
                  <><p className="text-[11px] font-semibold leading-tight">Sam T.</p><p className="text-[10px] text-[#0E8F53] leading-tight">Booked 8:11am · wait list</p></>
                ) : (
                  <><p className="text-[11px] font-semibold leading-tight text-[#777]">Cancelled 8:02am</p><p className="text-[10px] text-[#777] leading-tight">{n >= 1 ? 'Hazel: offering to 3' : '2:15pm, 45 min'}</p></>
                )}
              </motion.div>
              <div className="absolute left-0 right-0 border-t border-dashed border-[#111]/40" style={{ top: 0.4 * ROW }}>
                <span className="absolute right-1 -top-[8px] text-[9.5px] font-mono text-white bg-[#111] rounded-[3px] px-1 leading-[15px]">8:12</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 py-4 flex flex-col min-w-0">
          <p className="text-[12px] text-[#777]">This week</p>
          <p className="mt-0.5 text-[22px] font-semibold tracking-[-0.02em] tabular-nums leading-none">{filled ? '$1,140' : '$1,040'} <span className="text-[13px] font-medium text-[#777] tracking-normal">kept</span></p>
          <div className="mt-2.5 grid gap-[5px]">
            {week.map(([t, c]) => <p key={t} className="flex items-center gap-2 text-[11.5px] text-[#333] leading-tight"><Dot c={c} size={6} />{t}</p>)}
          </div>
          <motion.div animate={approved ? { borderColor: STATE.done } : n >= 1 ? { borderColor: STATE.waiting } : {}} className="mt-4 rounded-xl border border-[#111]/10 p-3">
            <div className="flex items-center gap-2.5">
              <Avatar glyph={GLYPH.hazel} size={28} mode={approved ? 'done' : n >= 1 ? 'wait' : 'scan'} />
              <p className="text-[12.5px]"><b>Hazel</b> <span className="text-[#777]">· Waitlist</span></p>
              <span className="ml-auto text-[11px] text-[#777]">8:03am</span>
            </div>
            <p className="mt-2 text-[12px] text-[#111]">2:15pm with Chris opened. 3 matches on the wait list.</p>
            <div className="mt-1.5 grid gap-[3px]">
              {MATCHES.map(([who, pref], i) => (
                <div key={who} className="flex items-center gap-2 text-[11px]">
                  <Dot c={filled ? (i === 0 ? STATE.done : STATE.queued) : n >= 3 && i === 0 ? STATE.done : approved ? '#111' : STATE.queued} size={5} />
                  <span className="font-medium">{who}</span>
                  <span className="text-[#777] truncate">{filled ? (i === 0 ? 'booked 8:11am' : 'told it has gone') : n >= 3 && i === 0 ? 'replied YES 8:09am' : approved ? 'offered 8:03am' : pref}</span>
                </div>
              ))}
            </div>
            <motion.div animate={approved && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-2.5 rounded-[7px] text-center text-[12px] py-1.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
              {approved ? 'Approved by Alex · 8:03am' : 'Approve offers'}
            </motion.div>
          </motion.div>
          <p className="mt-auto pt-3 border-t border-[#111]/10 text-[11px] text-[#777] leading-[1.4]">14 items waited for a person this week, the longest 40 minutes. Example figures for an example clinic.</p>
        </div>
      </div>
    </Frame>
  )
}
