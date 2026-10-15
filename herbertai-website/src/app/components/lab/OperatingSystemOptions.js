'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { STATE, useInView } from '../runs/board'
import { useSteps } from '../runs/steps'
import { Avatar, EMPLOYEES } from '../runs/employees'
import { INDUSTRIES, EMMA, KATE, ROSE, Lamp, Status, Scaled, Frame } from './IndustryOptions'

// Design pass, homepage section 4, now Operating Systems (15 Oct 2026). Will:
// "the industries page should actually be about the entirely built system, so
// maybe we call that section Operating Systems", and the ladder is AI Audit,
// AI Employee, AI Operating System. The Work folds in: built systems carry an
// open link. Property's operating system drawn three ways, from the research
// (product/research/markdown/industries-2026-10-13/property.md, section 4):
// 1 the hub whole, the app shell with its nine modules and the approvals home
// screen; 2 the office map, the modules around one property's record with the
// employees handing work to each other; 3 one day on the system, every
// module's lane across a day. Every name, address and figure is made up.
// Colour is state only. Goes with the lab.

const W = 1184
const H = 520
const Q = '’'
const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))
const LEO = G(['XX...XX', 'X.X.X.X', 'X..X..X', 'X.....X', 'X.....X', 'X.....X', 'X.....X'])
const OWEN = G(['..XXX..', '.X...X.', 'X.....X', 'X..X..X', 'X.....X', '.X...X.', '..XXX..'])
const GUS = EMPLOYEES[0].glyph
const INK = '#111'

function Dot({ c, size = 7 }) {
  return <span aria-hidden className="inline-block rounded-full shrink-0" style={{ width: size, height: size, background: c }} />
}

const LINE = { hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }
function Line({ on, children, className = '' }) {
  return (
    <motion.p variants={LINE} initial={false} animate={on ? 'show' : 'hidden'} className={`text-[11.5px] leading-[1.3] text-[#333] ${className}`} style={{ display: on ? 'block' : 'none' }}>
      {children}
    </motion.p>
  )
}

/* ─── 1: the hub, whole (the app shell and its approvals home) ─── */

const NAV = [['Approvals', 3], ['Maintenance', 7], ['Leasing', 3], ['Arrears', 9], ['Inspections', 12], ['Renewals', 5], ['Comms'], ['Landlords'], ['Dashboard']]
const QUEUE = [
  { who: 'Emma', job: 'Maintenance', glyph: EMMA, what: `Hot water at 12 Elm St, Norwood. Plumber $380, inside the landlord${Q}s $500 limit. Book 8:30am?`, at: 2, then: 'Approved by Jess · booked 8:30am' },
  { who: 'Kate', job: 'Renewals', glyph: KATE, what: `Rent review, 14 Elm St: $520 to $545 a week, three comparables attached, notice ready for 1 Dec.`, at: 3, then: 'Approved by Jess · notice sent' },
  { who: 'Rose', job: 'Arrears', glyph: ROSE, what: `8 Sturt St, 15 days behind, no reply to two reminders. Breach notice drafted.`, at: 4, then: 'Edited by Jess · sent' },
]
const TEAM = [
  ['Emma', 'Maintenance', EMMA, (n) => (n >= 2 ? 'done' : n >= 1 ? 'wait' : 'scan'), ['7 open', 'Waiting on Jess', 'Booked 8:30am']],
  ['Kate', 'Renewals', KATE, (n) => (n >= 3 ? 'done' : n >= 1 ? 'wait' : 'scan'), ['5 due', 'Waiting on Jess', 'Notice sent']],
  ['Rose', 'Arrears', ROSE, (n) => (n >= 4 ? 'done' : n >= 1 ? 'wait' : 'scan'), ['9 behind', 'Waiting on Jess', 'Notice sent']],
  ['Leo', 'Leasing', LEO, () => 'scan', ['4 enquiries answered']],
  ['Owen', 'Inspections', OWEN, () => 'scan', ['3 reports drafting']],
  ['Gus', 'Recoveries', GUS, () => 'still', ['Next run 9:00am']],
]

function HubWhole() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5)
  const handled = 30 + Math.min(2, Math.max(0, n - 1))
  const left = QUEUE.filter((q) => n < q.at).length
  return (
    <div ref={ref}>
      <Frame bar="Operations hub · an example property agency" right="Tuesday · 7:00am">
        <div className="grid grid-cols-[196px_1fr]" style={{ height: H - 42 }}>
          <aside className="bg-[#F6F6F3] border-r border-[#111]/10 px-3 py-4 flex flex-col">
            <p className="px-2 text-[11px] text-[#777] mb-3">Norwood Property · example</p>
            <div className="grid gap-[2px]">
              {NAV.map(([k, c]) => (
                <div key={k} className={`flex items-center justify-between rounded-[7px] px-2 py-[6px] text-[13px] ${k === 'Approvals' ? 'bg-white border border-[#111]/10 font-medium' : 'text-[#444]'}`}>
                  <span>{k}</span>
                  {c != null && <span className={`text-[11px] tabular-nums rounded-full px-1.5 py-[1px] ${k === 'Approvals' ? 'bg-[#111] text-white' : 'bg-[#111]/8 text-[#555]'}`}>{k === 'Approvals' ? left : c}</span>}
                </div>
              ))}
            </div>
            <p className="mt-auto px-2 text-[11px] text-[#777]">6 AI employees · 2 people</p>
          </aside>
          <div className="p-5 min-w-0">
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-[15px] font-semibold">Waiting on you <span className="ml-2 text-[12px] font-normal text-[#777] tabular-nums">{left} to decide</span></p>
              <p className="text-[12.5px] text-[#555] tabular-nums">This week: 34 requests · <b className="text-[#111]">{handled}</b> handled by the AI employees · {34 - handled} needed a person</p>
            </div>
            <div className="grid gap-2">
              {QUEUE.map((q) => {
                const done = n >= q.at
                return (
                  <div key={q.who} className="rounded-lg border border-[#111]/10 bg-white px-3.5 py-3.5 grid grid-cols-[36px_1fr_auto] gap-x-3 items-center">
                    <Avatar glyph={q.glyph} size={36} mode={done ? 'done' : n >= 1 ? 'wait' : 'still'} />
                    <div className="min-w-0">
                      <p className="text-[13px] leading-[1.35] text-[#333]"><span className="font-semibold text-[#111]">{q.who}</span> <span className="text-[#777]">· {q.job} ·</span> {q.what}</p>
                      <div className="mt-1"><Status s={done ? 'done' : 'waiting'}>{done ? q.then : 'Waiting on Jess'}</Status></div>
                    </div>
                    <motion.span animate={done ? { opacity: 0.35, scale: 0.96 } : { opacity: 1, scale: 1 }} className="rounded-[7px] bg-[#111] text-white text-[12px] px-3 py-1.5">
                      {done ? 'Done' : 'Approve'}
                    </motion.span>
                  </div>
                )
              })}
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                ['Maintenance', '7 open', '2 urgent, both booked'],
                ['Leasing', '3 vacancies', '9 days vacant on average'],
                ['Arrears', '2.1% of rent roll', '9 behind, 7 promised'],
                ['Renewals', '5 due in 30 days', '12 of 12 on time this quarter'],
              ].map(([k, v, sub]) => (
                <div key={k} className="rounded-lg border border-[#111]/10 px-3 py-2.5">
                  <p className="text-[11.5px] text-[#777]">{k}</p>
                  <p className="text-[15px] font-semibold tracking-[-0.01em] tabular-nums leading-tight">{v}</p>
                  <p className="text-[11px] text-[#777] leading-tight">{sub}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 mb-2 text-[12px] text-[#777]">On the board right now</p>
            <div className="grid grid-cols-6 gap-2">
              {TEAM.map(([who, job, glyph, mode, lines]) => {
                const m = mode(n)
                const line = lines[Math.min(lines.length - 1, m === 'done' ? 2 : m === 'wait' ? 1 : 0)]
                return (
                  <div key={who} className="rounded-lg border border-[#111]/10 px-2.5 py-2 flex items-center gap-2 min-w-0">
                    <Avatar glyph={glyph} size={26} mode={m} />
                    <div className="min-w-0">
                      <p className="text-[12px] leading-tight truncate"><b>{who}</b> <span className="text-[#777]">· {job}</span></p>
                      <p className="text-[11px] leading-tight text-[#777] truncate">{line}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── 2: the office map (one record, the modules around it, the hand-offs) ─── */

const PANELS = [
  { id: 'maint', x: 20, y: 16, who: 'Emma', job: 'Maintenance', glyph: EMMA, lit: (n) => (n >= 4 ? 'done' : n >= 3 ? 'waiting' : n >= 1 ? 'ink' : null),
    lines: [['11:42pm · No hot water, 12 Elm St. Plumber by 8am.', 1], ['6:58am · Quoted $380, inside the limit. Booked 8:30am, tenant told.', 2], ['9:24am · Dripping tap at 5 Rose Tce, from Owen.', 5]] },
  { id: 'arr', x: 20, y: 168, who: 'Rose', job: 'Arrears', glyph: ROSE, lit: (n) => (n >= 6 ? 'ink' : null),
    lines: [['9 tenancies behind, 7 promised a date.', 0], ['7:30am · Two reminders sent. Hardship flag on one: no messages.', 6]] },
  { id: 'insp', x: 20, y: 320, who: 'Owen', job: 'Inspections', glyph: OWEN, lit: (n) => (n >= 5 ? 'ink' : null),
    lines: [['12 routines due this month, entry notices sent.', 0], ['9:15am · 5 Rose Tce report drafted. Dripping tap found, raised with Emma.', 5]] },
  { id: 'lease', x: 854, y: 16, who: 'Leo', job: 'Leasing', glyph: LEO, lit: (n) => (n >= 7 ? 'ink' : null),
    lines: [['3 vacancies, 9 days vacant on average.', 0], ['8:30am · 22 Park Ave: 4 enquiries answered, 2 inspection slots booked.', 7]] },
  { id: 'ren', x: 854, y: 168, who: 'Kate', job: 'Renewals', glyph: KATE, lit: (n) => (n >= 6 ? 'ink' : null),
    lines: [['5 due in 30 days.', 0], ['7:10am · 14 Elm St: checked open maintenance first, then recommended $545 with three comparables.', 6]] },
  { id: 'appr', x: 854, y: 320, who: 'Jess', job: 'the property manager', glyph: null, lit: (n) => (n >= 4 ? 'done' : n >= 3 ? 'waiting' : null),
    lines: [['Nothing waiting.', 0, (n) => n < 3], ['7:00am · Emma: book the plumber at $380?', 3, (n) => n >= 3 && n < 4], ['7:05am · Approved. One tap.', 4]] },
]
const LOG = [
  ['11:42pm', 'SMS from Aisha K. · 12 Elm St', 'Hot water’s gone cold. Photo attached.', 1],
  ['11:43pm', 'SMS to tenant · Emma', 'Urgent repair logged, a plumber will contact you by 8am.', 1],
  ['6:58am', 'Email from Norwood Plumbing', 'Quote $380, can do 8:30 today.', 2],
  ['7:06am', 'SMS to tenant · Emma', 'Dave from Norwood Plumbing is booked for 8:30 this morning.', 4],
  ['10:40am', 'Note · Emma', 'Done. Invoice matched to the quote, sent to the PMS.', 7],
]
const WIRES = [
  ['maint', 330, 86, 380], ['arr', 330, 238, 380], ['insp', 330, 390, 380],
  ['lease', 804, 86, 854], ['ren', 804, 238, 854], ['appr', 804, 390, 854],
]

function OfficeMap() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 7)
  const colour = (lit) => (lit === 'done' ? STATE.done : lit === 'waiting' ? STATE.waiting : lit === 'ink' ? INK : null)
  return (
    <div ref={ref}>
      <Frame bar="The system, drawn · an example property agency" right="One property, one Tuesday">
        <div className="relative" style={{ height: H - 42 }}>
          <svg className="absolute inset-0" width={W} height={H - 42} aria-hidden>
            {WIRES.map(([id, x1, y, x2]) => {
              const p = PANELS.find((q) => q.id === id)
              const c = colour(p.lit(n))
              return (
                <g key={id}>
                  <line x1={x1} y1={y} x2={x2} y2={y} stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
                  {c && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1={x1} y1={y} x2={x2} y2={y} stroke={c} strokeWidth={2} />}
                </g>
              )
            })}
          </svg>
          {PANELS.map((p) => {
            const lit = p.lit(n)
            const c = colour(lit)
            return (
              <div key={p.id} className="absolute rounded-lg border bg-white px-3.5 py-3" style={{ left: p.x, top: p.y, width: 310, height: 144, overflow: 'hidden', borderColor: c ? c : 'rgba(17,17,17,.12)', boxShadow: c ? `0 0 0 3px ${c}22` : 'none' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  {p.glyph ? <Avatar glyph={p.glyph} size={26} mode={lit === 'done' ? 'done' : lit === 'waiting' ? 'wait' : lit ? 'scan' : 'still'} /> : <span className="inline-flex w-[26px] h-[26px] rounded-full bg-[#111]/8 items-center justify-center text-[11px] font-semibold">J</span>}
                  <p className="text-[13px]"><b>{p.who}</b> <span className="text-[#777]">· {p.job}</span></p>
                  <span className="ml-auto"><Dot c={c || STATE.queued} /></span>
                </div>
                <div className="grid gap-1">
                  {p.lines.map(([t, at, show], i) => (
                    <Line key={i} on={show ? show(n) : n >= at} className={n >= at && at > 0 ? 'text-[#111]' : 'text-[#777]'}>{t}</Line>
                  ))}
                </div>
              </div>
            )
          })}
          <div className="absolute rounded-lg border border-[#111]/12 bg-white px-4 py-3" style={{ left: 380, top: 18, width: 424, height: 118 }}>
            <div className="flex items-baseline justify-between">
              <p className="text-[15px] font-semibold">12 Elm St, Norwood</p>
              <p className="text-[11px] font-mono text-[#777]">the record</p>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-[#333]">
              <p><span className="text-[#777]">Tenant</span> Aisha K. · since Mar 2025</p>
              <p><span className="text-[#777]">Landlord</span> M. Rossi · limit $500</p>
              <p><span className="text-[#777]">Rent</span> $520 a week · paid to date</p>
              <p><span className="text-[#777]">Lease</span> to 30 Jun · review due</p>
            </div>
            <p className="mt-2 text-[12px] text-[#333]"><span className="text-[#777]">Open:</span> {n >= 4 ? 'hot water, booked 8:30am' : n >= 1 ? 'hot water, urgent' : 'nothing'}{n >= 6 ? ' · rent review drafted' : ''}</p>
          </div>
          <div className="absolute rounded-lg border border-[#111]/12 bg-white px-4 py-3" style={{ left: 380, top: 148, width: 424, height: 240 }}>
            <p className="text-[12px] text-[#777] mb-2">Comms log · every message, one thread</p>
            <div className="grid gap-1.5">
              {LOG.filter((l) => n >= l[3]).map(([t, from, text], i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-[52px_1fr] gap-2 text-[12px] leading-[1.35]">
                  <span className="font-mono text-[10.5px] text-[#777] tabular-nums pt-[2px]">{t}</span>
                  <span className="text-[#333]"><span className="text-[#777]">{from}:</span> {text}</span>
                </motion.div>
              ))}
              {n < 1 && <p className="text-[12px] text-[#999]">Quiet.</p>}
            </div>
          </div>
          <div className="absolute rounded-lg border border-dashed border-[#111]/20 bg-[#F6F6F3] px-4 py-2.5 flex items-center justify-between" style={{ left: 380, top: 400, width: 424, height: 58 }}>
            <div>
              <p className="text-[12.5px] font-medium">PropertyMe · the trust ledger</p>
              <p className="text-[11.5px] text-[#777]">Read and written by the system. Never replaced.</p>
            </div>
            <p className="text-[11px] font-mono text-[#777]">{n >= 7 ? 'synced 10:40am' : 'synced'}</p>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── 3: one day on the system (every module's lane across a Tuesday) ─── */

const LANES = [
  ['Maintenance', 'Emma', EMMA], ['Arrears', 'Rose', ROSE], ['Leasing', 'Leo', LEO], ['Inspections', 'Owen', OWEN], ['Renewals', 'Kate', KATE], ['Jess', 'the property manager', null],
]
const HOURS = 20 // 11pm to 7pm
const X0 = 196
const XW = 748
const xAt = (t) => X0 + (t / HOURS) * XW
const TICKS = [[0, '11pm'], [4, '3am'], [8, '7am'], [12, '11am'], [16, '3pm'], [20, '7pm']]
const EVENTS = [
  { lane: 0, t: 0.7, row: 0, c: STATE.waiting, text: 'No hot water, 12 Elm St · urgent', at: 1 },
  { lane: 0, t: 7.97, row: 0, c: INK, text: 'Plumber quoted $380', at: 2 },
  { lane: 5, t: 8.0, row: 0, c: (n) => (n >= 4 ? STATE.done : STATE.waiting), text: (n) => (n >= 4 ? 'Book the plumber? Yes, 7:05am' : 'Book the plumber?'), at: 3 },
  { lane: 4, t: 8.17, row: 0, c: INK, text: '14 Elm St review drafted, 3 comparables', at: 5 },
  { lane: 1, t: 8.5, row: 0, c: INK, text: '9 behind, 7 promised · 2 reminders sent', at: 5 },
  { lane: 2, t: 9.5, row: 0, c: INK, text: '22 Park Ave · 4 enquiries answered, 2 slots booked', at: 6 },
  { lane: 3, t: 10.25, row: 0, c: INK, text: '5 Rose Tce report drafted · tap found', at: 7 },
  { lane: 0, t: 10.4, row: 1, c: INK, text: `Dripping tap, 5 Rose Tce · from Owen`, at: 7 },
  { lane: 0, t: 11.67, row: 0, c: STATE.done, text: 'Done · invoice matched', at: 8 },
  { lane: 5, t: 15.0, row: 0, c: (n) => (n >= 9 ? STATE.done : STATE.waiting), text: (n) => (n >= 9 ? 'Breach notice · edited, sent' : 'Breach notice, 8 Sturt St?'), at: 8 },
  { lane: 2, t: 14.5, row: 1, c: STATE.done, text: 'Application complete · offered', at: 9 },
  { lane: 1, t: 15.5, row: 1, c: STATE.done, text: '1 promise paid · 8 behind', at: 10 },
  { lane: 3, t: 15.2, row: 1, c: INK, text: '2 more reports drafted', at: 10 },
]

function DayLanes() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 10, 700)
  const nowT = Math.min(HOURS, 0.5 + n * 1.95)
  const moved = Math.min(34, Math.round(n * 3.4))
  const laneY = (i) => 52 + i * 66
  return (
    <div ref={ref}>
      <Frame bar="One day on the system · an example property agency" right="Tuesday">
        <div className="relative" style={{ height: H - 42 }}>
          {TICKS.map(([t, l]) => (
            <div key={l} className="absolute top-[18px] text-[10.5px] font-mono text-[#777]" style={{ left: xAt(t), transform: 'translateX(-50%)' }}>{l}</div>
          ))}
          <svg className="absolute inset-0" width={W} height={H - 42} aria-hidden>
            {TICKS.map(([t]) => <line key={t} x1={xAt(t)} y1={38} x2={xAt(t)} y2={H - 60} stroke={INK} strokeOpacity={0.07} />)}
            {LANES.map((_, i) => <line key={i} x1={20} y1={laneY(i) + 62} x2={944} y2={laneY(i) + 62} stroke={INK} strokeOpacity={0.08} />)}
            {n > 0 && <motion.line animate={{ x1: xAt(nowT), x2: xAt(nowT) }} y1={38} y2={H - 60} stroke={INK} strokeOpacity={0.35} strokeDasharray="3 3" />}
          </svg>
          {LANES.map(([k, who, glyph], i) => (
            <div key={k} className="absolute flex items-center gap-2" style={{ left: 20, top: laneY(i) + 18, width: 166 }}>
              {glyph ? <Avatar glyph={glyph} size={24} mode={n > 0 ? 'scan' : 'still'} /> : <span className="inline-flex w-6 h-6 rounded-full bg-[#111]/8 items-center justify-center text-[10px] font-semibold">J</span>}
              <div className="min-w-0 leading-tight">
                <p className="text-[12.5px] font-medium truncate">{k}</p>
                <p className="text-[11px] text-[#777] truncate">{who}</p>
              </div>
            </div>
          ))}
          {EVENTS.filter((e) => n >= e.at).map((e, i) => {
            const c = typeof e.c === 'function' ? e.c(n) : e.c
            const text = typeof e.text === 'function' ? e.text(n) : e.text
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="absolute flex items-center gap-1.5 rounded-[6px] border border-[#111]/10 bg-white pl-2 pr-2.5 py-[3px] text-[11.5px] whitespace-nowrap text-[#333]" style={{ left: xAt(e.t) - 7, top: laneY(e.lane) + 6 + e.row * 28 }}>
                <Dot c={c} />
                {text}
              </motion.div>
            )
          })}
          <div className="absolute rounded-lg border border-[#111]/12 bg-white px-4 py-3" style={{ left: 964, top: 18, width: 200, height: 440 }}>
            <p className="text-[12px] text-[#777]">Tuesday so far</p>
            <p className="mt-1 text-[30px] font-semibold tracking-[-0.02em] tabular-nums leading-none">{moved}</p>
            <p className="text-[12px] text-[#555]">jobs moved</p>
            <div className="mt-4 grid gap-2 text-[12px] text-[#333]">
              <p className="flex items-center gap-2"><Dot c={INK} /> {Math.max(0, moved - Math.min(4, Math.round(n * 0.4)))} by the AI employees</p>
              <p className="flex items-center gap-2"><Dot c={STATE.waiting} /> {Math.min(4, Math.round(n * 0.4))} needed Jess</p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#111]/10 text-[11.5px] text-[#777] leading-[1.4]">
              <p>Jess{Q}s time on the system today: <b className="text-[#111]">{Math.min(11, n + 1)} min</b></p>
              <p className="mt-2">Example figures for an example agency.</p>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── the section, renamed, with The Work folded in ────────── */

export function OSSection({ Visual }) {
  const active = INDUSTRIES[0]
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-[15px] font-medium text-[#555] mb-4">Operating Systems</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Built for the office you actually run.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <div>
            <Scaled><Visual /></Scaled>
            <div className="mt-4 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-[15px] font-medium text-[#777]">{active.name}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{active.system}</p>
              </div>
              <Link href="https://dashboard.herbert-aisolutions.com" className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                Built. Open the dashboard <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
          <div role="tablist" aria-label="Operating systems" className="border-b border-[#111]/15">
            {INDUSTRIES.map((x) => {
              const on = x.id === active.id
              return (
                <div key={x.id} role="tab" aria-selected={on} className={`py-4 pl-4 pr-3 border-t border-[#111]/15 border-l-2 ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent'}`}>
                  <span className="flex items-center gap-2 text-[15px] font-medium text-[#777]">{x.name}{x.id === 'property' && <span className="font-mono text-[10px] uppercase tracking-[0.12em] rounded-full border border-[#111]/15 px-2 py-[1px] text-[#555]">Built</span>}</span>
                  <span className={`block mt-1 text-[20px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{x.system}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

const OPTIONS = [
  ['1', '1. The hub, whole', 'The app shell: nine modules down the side with their counts, the approvals home screen a principal opens at 7am, the six AI employees on the board underneath. Closest to the first version in the research.', HubWhole],
  ['2', '2. The office map', 'One property’s record in the middle with its comms log and the PMS it syncs to; the six modules around it, each with its employee; a job travels the wires and the employees hand work to each other.', OfficeMap],
  ['3', '3. One day on the system', 'Every module as a lane across a Tuesday, from the 11:42pm text to the 3:30pm promise paid; the day’s count on the right, with the minutes the person spent.', DayLanes],
]

export default function OperatingSystemOptions() {
  const [runs, setRuns] = useState({ 1: 0, 2: 0, 3: 0 })
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Visual]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
            <button type="button" onClick={() => setRuns((r) => ({ ...r, [id]: r[id] + 1 }))} className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10">
              Run again
            </button>
          </div>
          <div key={runs[id]}><OSSection Visual={Visual} /></div>
        </div>
      ))}
    </main>
  )
}
