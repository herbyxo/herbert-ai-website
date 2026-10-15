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
export const LEO = G(['XX...XX', 'X.X.X.X', 'X..X..X', 'X.....X', 'X.....X', 'X.....X', 'X.....X'])
export const OWEN = G(['..XXX..', '.X...X.', 'X.....X', 'X..X..X', 'X.....X', '.X...X.', '..XXX..'])
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

const NAV = [['Approvals', 3], ['Maintenance', 7], ['Leasing'], ['Arrears'], ['Inspections'], ['Renewals'], ['Comms'], ['Landlords'], ['Dashboard']]
const QUEUE = [
  { who: 'Emma', job: 'Maintenance', glyph: EMMA, what: 'Hot water, 12 Elm St. Plumber $380, inside the limit. Book 8:30am?', at: 2, then: 'Approved by Jess · booked 8:30am' },
  { who: 'Kate', job: 'Renewals', glyph: KATE, what: '14 Elm St review: $520 to $545, three comparables. Send the notice?', at: 3, then: 'Approved by Jess · notice sent' },
  { who: 'Rose', job: 'Arrears', glyph: ROSE, what: '8 Sturt St, 15 days behind, no reply twice. Send the breach notice?', at: 4, then: 'Edited by Jess · sent' },
]
const TEAM = [
  ['Emma', 'Maintenance', EMMA, (n) => (n >= 2 ? 'done' : n >= 1 ? 'wait' : 'scan'), ['7 open, 2 urgent', 'Waiting on Jess', 'Booked 8:30am']],
  ['Kate', 'Renewals', KATE, (n) => (n >= 3 ? 'done' : n >= 1 ? 'wait' : 'scan'), ['5 due in 30 days', 'Waiting on Jess', 'Notice sent']],
  ['Rose', 'Arrears', ROSE, (n) => (n >= 4 ? 'done' : n >= 1 ? 'wait' : 'scan'), ['9 behind, 7 promised', 'Waiting on Jess', 'Breach notice sent']],
  ['Leo', 'Leasing', LEO, () => 'scan', ['4 enquiries answered']],
  ['Owen', 'Inspections', OWEN, () => 'scan', ['3 reports drafting']],
  ['Gus', 'Recoveries', GUS, () => 'still', ['Next run 9:00am']],
]

export function HubWhole({ record = false }) {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5)
  const handled = 30 + Math.min(2, Math.max(0, n - 1))
  const left = QUEUE.filter((q) => n < q.at).length
  return (
    <div ref={ref}>
      <Frame bar="Operations hub · an example property agency" right={record ? 'Tuesday · 7:00am · reads and writes PropertyMe' : 'Tuesday · 7:00am'}>
        <div className="grid grid-cols-[172px_1fr_292px]" style={{ height: H - 42 - (record ? 36 : 0) }}>
          <aside className="bg-[#F6F6F3] border-r border-[#111]/10 px-3 py-4 flex flex-col">
            <p className="px-2 text-[11px] text-[#999] mb-3">Example agency</p>
            <div className="grid gap-[1px]">
              {NAV.map(([k, c]) => (
                <div key={k} className={`flex items-center justify-between rounded-[7px] px-2 py-[6px] text-[12.5px] ${k === 'Approvals' ? 'bg-white border border-[#111]/10 font-medium text-[#111]' : 'text-[#666]'}`}>
                  <span>{k}</span>
                  {c != null && <span className={`text-[11px] tabular-nums ${k === 'Approvals' ? 'rounded-full bg-[#111] text-white px-1.5 py-[1px]' : 'text-[#999]'}`}>{k === 'Approvals' ? left : c}</span>}
                </div>
              ))}
            </div>
          </aside>
          <div className="px-7 py-6 min-w-0 flex flex-col">
            <div className="flex items-baseline gap-3 mb-4">
              <p className="text-[17px] font-semibold tracking-[-0.01em]">Waiting on you</p>
              <p className="text-[12.5px] text-[#777] tabular-nums">{left === 0 ? 'nothing' : `${left} to decide`}</p>
            </div>
            <div className="grid gap-3">
              {QUEUE.map((q) => {
                const done = n >= q.at
                return (
                  <div key={q.who} className="rounded-xl border border-[#111]/10 bg-white px-4 py-4 grid grid-cols-[40px_1fr_auto] gap-x-3.5 items-center">
                    <Avatar glyph={q.glyph} size={40} mode={done ? 'done' : n >= 1 ? 'wait' : 'still'} />
                    <div className="min-w-0">
                      <p className="text-[12px] text-[#777]"><span className="font-semibold text-[#111]">{q.who}</span> · {q.job}</p>
                      <p className="mt-0.5 text-[14px] leading-[1.35] text-[#111] truncate">{q.what}</p>
                      <div className="mt-1.5"><Status s={done ? 'done' : 'waiting'}>{done ? q.then : 'Waiting on Jess'}</Status></div>
                    </div>
                    <motion.span animate={done ? { opacity: 0.3, scale: 0.96 } : { opacity: 1, scale: 1 }} className="rounded-[8px] bg-[#111] text-white text-[12.5px] px-3.5 py-2">
                      {done ? 'Done' : 'Approve'}
                    </motion.span>
                  </div>
                )
              })}
            </div>
            <p className="mt-auto text-[12px] text-[#999]">Everything else ran by itself overnight: 12 messages sent, 3 jobs booked, 2 reports drafted.</p>
          </div>
          <div className="border-l border-[#111]/10 px-5 py-6">
            <p className="text-[12px] text-[#777]">This week</p>
            <p className="mt-1 text-[30px] font-semibold tracking-[-0.02em] tabular-nums leading-none">34 <span className="text-[13px] font-medium text-[#777] tracking-normal">requests</span></p>
            <div className="mt-3 grid gap-1.5 text-[12.5px] text-[#333]">
              <p className="flex items-center gap-2"><Dot c={STATE.done} /> <b className="tabular-nums">{handled}</b>&nbsp;handled by the AI employees</p>
              <p className="flex items-center gap-2"><Dot c={STATE.waiting} /> <b className="tabular-nums">{34 - handled}</b>&nbsp;needed a person</p>
            </div>
            <p className="mt-6 mb-2 text-[12px] text-[#777]">On the board</p>
            <div className="grid gap-[9px]">
              {TEAM.map(([who, job, glyph, mode, lines]) => {
                const m = mode(n)
                const line = lines[Math.min(lines.length - 1, m === 'done' ? 2 : m === 'wait' ? 1 : 0)]
                return (
                  <div key={who} className="flex items-center gap-2.5 min-w-0">
                    <Avatar glyph={glyph} size={24} mode={m} />
                    <div className="min-w-0 leading-tight">
                      <p className="text-[12.5px] truncate"><b>{who}</b> <span className="text-[#777]">· {job}</span></p>
                      <p className="text-[11.5px] text-[#777] truncate">{line}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {record && (
          <div className="h-[36px] border-t border-[#111]/10 bg-[#F6F6F3] px-5 flex items-center justify-between gap-6 text-[11.5px] text-[#555]">
            <span className="whitespace-nowrap"><b className="font-medium text-[#111]">PropertyMe stays the trust ledger.</b> Read and written by the system, never replaced.</span>
            <span className="whitespace-nowrap"><b className="font-medium text-[#111]">Gone:</b> the shared inbox as the work queue, the whiteboard, the maintenance spreadsheet.</span>
          </div>
        )}
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

/* ─── Health: the appointment book (dashboards-2026-10-15/health.md) ─── */

const HAZEL = G(['XXXXXXX', 'X.....X', 'X.....X', 'X..XX.X', 'X..XX.X', 'X.....X', 'XXXXXXX'])
const LENA = G(['X......', 'X......', 'X......', 'X......', 'X......', 'X......', 'XXXXXXX'])
const JOY = (EMPLOYEES.find((e) => e.name === 'Joy') || EMPLOYEES[4]).glyph
const ROW = 24 // px per half hour
const PRACS = ['Chris', 'Priya', 'Sam', 'Mei']
const TINT = { std: '#EFEFEB', init: '#E3E3DD', rev: '#F6F6F3', cls: '#E9ECE6' }
// [column, start (half hours from 8am), length (half hours), name, type, glyphs]
const APPTS = [
  [0, 0, 2, 'A. Nguyen', 'std', '✓'], [0, 2, 2, 'J. Lee', 'init', '✓ ◎'], [0, 4, 2, 'M. Rossi', 'rev', '✓'], [0, 7, 2, 'P. Shah', 'std', ''], [0, 10, 2, 'K. Dale', 'std', '◎'], [0, 15, 2, 'T. Burke', 'std', ''], [0, 17, 1, 'R. Holt', 'rev', ''],
  [1, 1, 2, 'D. Kaur', 'std', '✓'], [1, 3, 2, 'S. Ito', 'init', '✓'], [1, 5, 2, 'L. Webb', 'std', ''], [1, 11, 2, 'B. Osei', 'std', ''], [1, 13, 2, 'E. Park', 'rev', '◎'], [1, 16, 2, 'N. Ali', 'std', ''],
  [2, 0, 2, 'H. Tran', 'std', '✓'], [2, 2, 2, 'F. Moss', 'std', '✓'], [2, 4, 2, 'G. Lund', 'init', '✓'], [2, 6, 2, 'C. Reid', 'std', ''], [2, 12, 2, 'Class · 6/8', 'cls', ''], [2, 14, 2, 'O. Bell', 'std', ''], [2, 16, 2, 'V. Ruiz', 'rev', ''],
  [3, 10, 2, 'I. Wong', 'init', '◎'], [3, 12, 2, 'U. Dias', 'std', ''], [3, 14, 2, 'W. Hale', 'std', ''], [3, 16, 2, 'Y. Chen', 'rev', ''],
]
const HERO = { col: 0, start: 12.5, len: 1.5 } // Chris, 2:15pm to 3:00pm
const MATCHES = [['Sam T.', 'wants Chris, afternoons'], ['Jo K.', 'wants Chris, any day'], ['Dana R.', 'wants afternoons']]

function Block({ a, hero }) {
  const [col, start, len, name, type, glyphs] = a
  return (
    <div className="absolute rounded-[5px] px-2 py-1 overflow-hidden" style={{ left: col * 173 + 2, top: start * ROW + 1, width: 169, height: len * ROW - 3, background: TINT[type] }}>
      <p className="text-[11px] font-semibold leading-tight truncate">{name}</p>
      {len >= 2 && <p className="text-[10px] text-[#777] leading-tight">{type === 'init' ? 'Initial' : type === 'rev' ? 'Review' : type === 'cls' ? 'Class' : 'Standard'}{glyphs ? ` · ${glyphs}` : ''}</p>}
    </div>
  )
}

function ClinicBook() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 6)
  const approved = n >= 2
  const filled = n >= 4
  const hours = ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
  return (
    <div ref={ref}>
      <Frame bar="Appointment book · an example physio clinic" right="Tuesday · 8:12am">
        <div className="grid grid-cols-[44px_736px_1fr]" style={{ height: H - 42 }}>
          <aside className="bg-[#111] flex flex-col items-center gap-4 pt-4">
            {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className={`block w-4 h-4 rounded-[4px] ${i === 1 ? 'bg-white' : 'bg-white/25'}`} />)}
          </aside>
          <div className="relative overflow-hidden border-r border-[#111]/10">
            <div className="grid grid-cols-[44px_1fr] h-[30px] border-b border-[#111]/10 text-[12px]">
              <span />
              <div className="grid grid-cols-4">
                {PRACS.map((x) => <span key={x} className="px-3 flex items-center font-medium">{x}</span>)}
              </div>
            </div>
            <div className="relative" style={{ height: 18 * ROW }}>
              {hours.map((h, i) => (
                <div key={h} className="absolute left-0 right-0 border-t border-[#111]/8" style={{ top: i * 2 * ROW }}>
                  <span className="absolute left-2 -top-[7px] text-[10px] font-mono text-[#999] bg-white pr-1">{h}</span>
                </div>
              ))}
              <div className="absolute top-0 bottom-0" style={{ left: 44, width: 692 }}>
                <div className="absolute inset-0 grid grid-cols-4">
                  {PRACS.map((x, i) => <div key={x} className="border-l border-[#111]/8" style={{ background: i === 3 ? `repeating-linear-gradient(135deg, transparent 0 6px, rgba(17,17,17,.04) 6px 7px)` : 'none', backgroundSize: '100% 240px', backgroundRepeat: 'no-repeat' }} />)}
                </div>
                {APPTS.map((a) => <Block key={a[3] + a[0]} a={a} />)}
                <motion.div
                  animate={filled ? { borderStyle: 'solid', borderColor: STATE.done, background: '#EAF8F0' } : n >= 1 ? { borderColor: STATE.waiting } : {}}
                  className="absolute rounded-[5px] px-2 py-1 border-2 border-dashed"
                  style={{ left: HERO.col * 173 + 2, top: HERO.start * ROW + 1, width: 169, height: HERO.len * ROW - 3, borderColor: '#BDBDBD' }}
                >
                  {filled ? (
                    <>
                      <p className="text-[11px] font-semibold leading-tight">Sam T.</p>
                      <p className="text-[10px] text-[#0E8F53] leading-tight">Booked 8:11am · wait list</p>
                    </>
                  ) : (
                    <>
                      <p className="text-[11px] font-semibold leading-tight text-[#777]">Cancelled 8:02am</p>
                      <p className="text-[10px] text-[#777] leading-tight">{n >= 1 ? 'Hazel: offering to 3' : '2:15pm, 45 min'}</p>
                    </>
                  )}
                </motion.div>
                <div className="absolute left-0 right-0 border-t border-dashed border-[#111]/40" style={{ top: 0.4 * ROW }}>
                  <span className="absolute right-1 -top-[8px] text-[9.5px] font-mono text-white bg-[#111] rounded-[3px] px-1 leading-[15px]">8:12</span>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 py-4 flex flex-col min-w-0">
            <p className="text-[12px] text-[#777] mb-3">AI employees · today</p>
            <motion.div animate={approved ? { borderColor: STATE.done } : n >= 1 ? { borderColor: STATE.waiting } : {}} className="rounded-xl border border-[#111]/10 p-3.5">
              <div className="flex items-center gap-2.5">
                <Avatar glyph={HAZEL} size={30} mode={approved ? 'done' : n >= 1 ? 'wait' : 'scan'} />
                <p className="text-[12.5px]"><b>Hazel</b> <span className="text-[#777]">· Waitlist</span></p>
                <span className="ml-auto text-[11px] text-[#777]">8:03am</span>
              </div>
              <p className="mt-2 text-[12.5px] text-[#111]">2:15pm with Chris opened. 3 matches on the wait list.</p>
              <div className="mt-2 grid gap-1">
                {MATCHES.map(([who, pref], i) => (
                  <div key={who} className="flex items-center gap-2 text-[11.5px]">
                    <Dot c={filled ? (i === 0 ? STATE.done : STATE.queued) : n >= 3 && i === 0 ? STATE.done : approved ? INK : STATE.queued} />
                    <span className="font-medium">{who}</span>
                    <span className="text-[#777] truncate">{filled ? (i === 0 ? 'booked 8:11am' : 'told it has gone') : n >= 3 && i === 0 ? 'replied YES 8:09am' : approved ? 'offered 8:03am' : pref}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-[#777] leading-[1.35] truncate">Draft: “Hi Sam, it’s Hazel at the clinic. 2:15 today with Chris has opened up. Reply YES to take it.”</p>
              <motion.div animate={approved ? { scale: [1, 0.96, 1] } : {}} className={`mt-2.5 rounded-[7px] text-center text-[12px] py-1.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
                {approved ? 'Approved by Alex · 8:03am' : 'Approve offers'}
              </motion.div>
            </motion.div>
            <div className="mt-2.5 rounded-xl border border-[#111]/10 p-3 flex items-center gap-2.5">
              <Avatar glyph={JOY} size={26} mode="scan" />
              <div className="min-w-0 leading-tight">
                <p className="text-[12px]"><b>Joy</b> <span className="text-[#777]">· Milestones</span></p>
                <p className="text-[11px] text-[#777] truncate">3 plans at session 5 of 6, reviews drafted</p>
              </div>
            </div>
            <div className="mt-2 rounded-xl border border-[#111]/10 p-3 flex items-center gap-2.5">
              <Avatar glyph={LENA} size={26} mode="scan" />
              <div className="min-w-0 leading-tight">
                <p className="text-[12px]"><b>Lena</b> <span className="text-[#777]">· Funding</span></p>
                <p className="text-[11px] text-[#777] truncate">2 WorkCover approvals expiring, requests drafted</p>
              </div>
            </div>
            <p className="mt-auto pt-3 border-t border-[#111]/10 text-[11.5px] text-[#555]"><span className="font-medium text-[#111]">Today:</span> {n >= 5 ? '4 cancellations, 3 filled, $300 kept.' : '4 cancellations, 2 filled so far.'} <span className="text-[#999]">Example figures.</span></p>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── Finance: the season board (dashboards-2026-10-15/finance.md) ─── */

const NORA = G(['.XXX...', 'X...X..', 'X...X..', '.XXX...', '....X..', '.....X.', '......X'])
const PENNY = G(['XXXXX..', 'X....X.', 'X....X.', 'XXXXX..', 'X......', 'X......', 'X......'])
const OWENF = G(['..XXX..', '.X...X.', 'X.....X', 'X..X..X', 'X.....X', '.X...X.', '..XXX..'])
const COLS_F = [
  ['Not yet in', 41, [['R. Okafor', 'Individual', '31 Oct', PENNY, 'Penny · reminder 1 sent'], ['L. Marsh', 'Sole trader', '31 Oct', PENNY, 'Penny · reminder 2 sent Mon'], ['F. Dunn', 'Individual · rental', '31 Oct', PENNY, 'Penny · reminder 1 sent'], ['T. Vo', 'Individual', '31 Oct', null, 'Not contacted']]],
  ['Waiting on client', 63, [['D. Nguyen', 'Individual · rental', '31 Oct', NORA, 'Nora · 7 of 9 in'], ['B. Carter', 'Individual', '31 Oct', NORA, 'Nora · 6 of 6 in'], ['S. Patel', 'Sole trader', '31 Oct', NORA, 'Nora · 4 of 8 in'], ['M. Ling', 'Individual', '31 Oct', NORA, 'Nora · 2 of 5 in']]],
  ['Ready to prepare', 38, [['E. Fox', 'Individual', '31 Oct', null, 'Assigned to Sam'], ['K. Rowe', 'Company', '28 Feb', null, 'Assigned to Priya'], ['A. Hart', 'Individual · rental', '31 Oct', null, 'Assigned to Sam']]],
  ['In review', 17, [['J. Kemp', 'Individual', '31 Oct', null, 'With Sam'], ['C. Abe', 'Trust', '28 Feb', null, 'With Priya'], ['N. Diaz', 'Individual', '31 Oct', null, 'With Sam']]],
  ['Ready to lodge', 9, [['H. Ward', 'Individual', '31 Oct', OWENF, 'Owen · to sign, with client'], ['P. Shaw', 'Individual', '31 Oct', OWENF, 'Owen · signed, lodging today'], ['G. Ito', 'Sole trader', '31 Oct', OWENF, 'Owen · submitted, awaiting ATO']]],
]
const CHECK = [
  ['Income statement', 'Received', 1, STATE.done], ['Private health statement', 'Received', 2, STATE.done],
  ['Rental statement', 'Short: Jul to Mar in, Apr to Jun missing', 3, STATE.waiting], ['Dividend statements', 'Missing', 3, STATE.queued],
]

function JobCard({ c, extra, moving, lifted }) {
  const [name, type, due, glyph, line] = c
  return (
    <motion.div layout={moving ? true : undefined} layoutId={moving ? 'carter' : undefined} className="rounded-[6px] border border-[#111]/10 bg-white px-2.5 py-2" style={lifted ? { boxShadow: '0 8px 20px -10px rgba(0,0,0,.35)' } : undefined}>
      <div className="flex items-baseline justify-between gap-2 min-w-0">
        <p className="text-[11.5px] font-semibold min-w-0 truncate">{name}</p>
        <span className="text-[9.5px] font-mono text-[#777] whitespace-nowrap shrink-0">{due}</span>
      </div>
      <p className="text-[10.5px] text-[#777] truncate">{type}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[10.5px] text-[#333] truncate">
        {glyph ? <Avatar glyph={glyph} size={13} mode={extra === 'done' ? 'done' : 'still'} /> : <Dot c={STATE.queued} size={5} />}
        <span className="truncate">{extra === 'done' ? 'Penny · request sent 8:04' : line}</span>
      </p>
    </motion.div>
  )
}

function SeasonBoard() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 6)
  const moved = n >= 6
  const waiting = moved ? 62 : 63
  const ready = moved ? 39 : 38
  return (
    <div ref={ref}>
      <Frame bar="Season board · an example accounting practice" right="Tax season · Tuesday 8:12am">
        <div className="flex items-center gap-6 px-5 h-[44px] border-b border-[#111]/10 text-[12px]">
          <span className="font-medium">2026 individual returns</span>
          {[['312', 'clients'], [waiting, 'waiting on client'], [ready, 'ready to prepare'], ['17', 'in review'], ['112', 'lodged']].map(([v, k], i) => (
            <span key={k} className={`flex items-baseline gap-1.5 ${i === 0 ? 'border-l border-[#111]/10 pl-6' : ''}`}><b className="text-[15px] tabular-nums tracking-[-0.01em]">{v}</b><span className="text-[#777]">{k}</span></span>
          ))}
        </div>
        <div className="grid grid-cols-[756px_1fr]" style={{ height: H - 42 - 44 }}>
          <div className="bg-[#F6F6F3] border-r border-[#111]/10 p-3 grid grid-cols-5 gap-2 content-start">
            {COLS_F.map(([title, count, cards], ci) => (
              <div key={title} className="min-w-0">
                <p className="flex items-center justify-between text-[10px] uppercase tracking-[0.08em] text-[#555] mb-2 px-0.5">
                  <span className="truncate">{title}</span>
                  <span className="rounded-full bg-[#111]/8 px-1.5 py-[1px] text-[10px] tabular-nums tracking-normal">{ci === 1 ? waiting : ci === 2 ? ready : count}</span>
                </p>
                <div className="grid gap-2">
                  {cards.filter((c) => !(ci === 1 && c[0] === 'B. Carter' && moved)).map((c) => (
                    <JobCard key={c[0]} c={c} extra={ci === 1 && c[0] === 'D. Nguyen' && n >= 5 ? 'done' : ''} moving={c[0] === 'B. Carter'} lifted={c[0] === 'B. Carter' && n >= 5} />
                  ))}
                  {ci === 2 && (moved ? <JobCard c={COLS_F[1][2][1]} moving /> : n >= 5 ? <div className="rounded-[6px] border border-dashed border-[#111]/20 h-[62px]" /> : null)}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 flex flex-col gap-2 min-w-0">
            <div className="rounded-xl border border-[#111]/10 p-3">
              <div className="flex items-center gap-2.5 mb-2">
                <Avatar glyph={NORA} size={26} mode={n >= 1 && n < 4 ? 'scan' : n >= 4 ? 'done' : 'still'} />
                <p className="text-[12.5px]"><b>Nora</b> <span className="text-[#777]">· Intake</span></p>
                <span className="ml-auto text-[11px] text-[#777]">{n >= 1 ? 'reading a reply' : 'watching the inbox'}</span>
              </div>
              {n >= 1 ? (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-[6px] bg-[#F6F6F3] px-2.5 py-1.5 text-[11px]">
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
              <p className="mt-2 text-[10.5px] text-[#777]">Checklist built from last year’s return · <span className="tabular-nums">{n >= 3 ? 7 : n >= 2 ? 5 : n >= 1 ? 3 : 0} of 9 items</span></p>
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
                <Avatar glyph={PENNY} size={26} mode={n >= 5 ? 'done' : n >= 4 ? 'wait' : 'still'} />
                <p className="text-[12.5px]"><b>Penny</b> <span className="text-[#777]">· Requests</span></p>
                <span className="ml-auto text-[11px] text-[#777]">{n >= 4 ? '7:55am' : ''}</span>
              </div>
              {n >= 4 ? (
                <p className="text-[11.5px] leading-[1.4] text-[#333]">“Thanks Mrs Nguyen, nearly there. We still need April to June of the rental statement and your dividend statements.”</p>
              ) : (
                <p className="text-[11.5px] text-[#999]">No request to send yet.</p>
              )}
              <motion.div animate={n >= 5 ? { scale: [1, 0.96, 1] } : {}} className={`mt-2 rounded-[7px] text-center text-[12px] py-1.5 ${n >= 5 ? 'bg-[#E8F7EE] text-[#0E8F53]' : n >= 4 ? 'bg-[#111] text-white' : 'bg-[#111]/5 text-[#999]'}`}>
                {n >= 5 ? 'Approved by Sam · 8:04am' : 'Approve and send'}
              </motion.div>
            </motion.div>
            <p className="mt-auto text-[10.5px] text-[#999] leading-tight">Nora, Penny and Owen are AI employees. A person approves what goes out.</p>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── Trades: the dispatch board (dashboards-2026-10-15/trades.md) ─── */

const MAX = G(['.XXXXX.', '.X...X.', '.X.X.X.', '.X...X.', '.X.X.X.', '.X...X.', '.XXXXX.'])
const VIC = (EMPLOYEES.find((e) => e.name === 'Vic') || EMPLOYEES[1]).glyph
const KIT = G(['X.....X', 'X....X.', 'X...X..', 'XXXX...', 'X...X..', 'X....X.', 'X.....X'])
const HOUR = 64 // px per hour, 7am to 5pm
const TECHS = ['Sam', 'Priya', 'Jack', 'Luke', 'Tom', 'Unassigned']
// [row, start hour after 7am, length, job, customer and type, kind] kind: '' set, 'placed' by the scheduler (dashed until confirmed), 'move' the unassigned block
const JOBS_T = [
  [0, 0.5, 2, '#2214', 'Nguyen · install', ''], [0, 3, 2, '#2209', 'Hall · service', ''], [0, 6, 3, '#2216', 'Reid · install', ''],
  [1, 0, 2, '#2211', 'Costa · service', ''], [1, 2.5, 2, '#2215', 'Webb · service', ''], [1, 6, 2, '#2208', 'Kaur · install', ''], [1, 8.5, 1.5, '#2219', 'Moss · measure and quote', 'placed'],
  [2, 0, 3, '#2205', 'Ito · install', ''], [2, 3.5, 1.5, '#2217', 'Lund · service', ''],
  [3, 1, 4, '#2207', 'Park · install', ''], [3, 6, 1.5, '#2218', 'Ali · measure and quote', 'placed'], [3, 7.5, 2.5, '#2212', 'Bell · service', ''],
  [4, 0, 2.5, '#2203', 'Ruiz · install', ''], [4, 3, 1, '#2213', 'Hale · service', ''], [4, 5.5, 4.5, '#2210', 'Chen · install', ''],
]
const MOVE = { job: '#2220', text: 'Dale · service', fromRow: 5, fromStart: 7, toRow: 2, toStart: 7, len: 2 }
const PIPE = [
  ['Enquiries', 6, '', 'Max', MAX, '3 answered overnight'], ['Quoting', 12, '$184,000', 'Max', MAX, '2 visits booked'],
  ['Scheduled', 35, '', 'Kit', KIT, '4 placed, 1 moved'], ['In progress', 9, '', null, null, ''],
  ['Done, not invoiced', 7, '$31,400', 'Vic', VIC, '5 invoices drafted'], ['Overdue', 9, '$46,200', 'Vic', VIC, '4 reminders sent'],
]
const FEED_T = [
  [VIC, 'Vic', '7:02', 'Drafted invoice #2207 from Luke’s job card, $1,420', 0],
  [MAX, 'Max', '7:15', 'Booked Thu 10am measure and quote, 14 Elm St', 0],
  [KIT, 'Kit', '7:16', 'Placed it with Sam, 40 min from his 8am', 0],
  [VIC, 'Vic', '9:30', 'Asked Tom for the gas fitting quantities on #2203', 0],
  [MAX, 'Max', '10:41', 'Reply to Priya sent, quote unchanged', 5],
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

function DispatchBoard() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5)
  const solid = n >= 2
  const movedT = n >= 3
  const approvedT = n >= 4
  const hoursT = ['7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm']
  const moveJob = [movedT ? MOVE.toRow : MOVE.fromRow, movedT ? MOVE.toStart : MOVE.fromStart, MOVE.len, MOVE.job, MOVE.text, movedT ? 'move' : '']
  return (
    <div ref={ref}>
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
                  {hoursT.map((h, i) => <span key={h} className="absolute -top-[1px] text-[10px] font-mono text-[#999]" style={{ left: i * HOUR - 10 }}>{h}</span>)}
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
                  {hoursT.map((h, i) => <div key={h} className="absolute top-0 bottom-0 border-l border-[#111]/6" style={{ left: i * HOUR }} />)}
                  {JOBS_T.map((j) => <JobBlock key={j[3]} j={j} solid={solid} />)}
                  <JobBlock j={moveJob} solid moving />
                  <div className="absolute top-0 bottom-0 border-l border-dashed border-[#111]/50" style={{ left: 3.67 * HOUR }} />
                </div>
              </div>
            </div>
            <div className="mt-auto border-t border-[#111]/10 bg-[#F6F6F3] px-4 py-3 grid grid-cols-6 gap-3">
              {PIPE.map(([k, c, money, who, glyph, line], i) => (
                <div key={k} className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.06em] text-[#777] truncate">{k}</p>
                  <p className="text-[15px] font-semibold tabular-nums leading-tight">{c}{money && <span className="ml-1.5 text-[10.5px] font-normal text-[#777]">{money}</span>}</p>
                  <span className="mt-1 block h-[4px] rounded-full overflow-hidden bg-[#111]/8"><span className="block h-full" style={{ width: `${[40, 70, 85, 55, 45, 60][i]}%`, background: i === 5 ? STATE.waiting : i === 4 ? STATE.done : INK }} /></span>
                  {who ? (
                    <p className="mt-1.5 flex items-center gap-1 text-[10px] text-[#555] min-w-0"><Avatar glyph={glyph} size={12} mode="still" /><span className="truncate">{who} · {line}</span></p>
                  ) : <p className="mt-1.5 text-[10px] text-[#999]">on the tools</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-4 flex flex-col min-w-0">
            <p className="text-[12.5px] font-semibold mb-2.5">Waiting on Dave <span className="ml-1.5 font-normal text-[12px] text-[#777] tabular-nums">{approvedT ? 'nothing' : '1'}</span></p>
            <motion.div animate={approvedT ? { borderColor: STATE.done } : n >= 1 ? { borderColor: STATE.waiting } : {}} className="rounded-xl border border-[#111]/10 p-3">
              <div className="flex items-center gap-2.5">
                <Avatar glyph={MAX} size={28} mode={approvedT ? 'done' : n >= 1 ? 'wait' : 'still'} />
                <p className="text-[12.5px]"><b>Max</b> <span className="text-[#777]">· Sales Coordinator</span></p>
                <span className="ml-auto text-[11px] text-[#777]">10:36</span>
              </div>
              <p className="mt-2 text-[11.5px] text-[#333]">Priya asks: “does $4,860 include removing the old unit?”</p>
              <p className="mt-1.5 rounded-[6px] bg-[#F6F6F3] px-2.5 py-2 text-[11.5px] leading-[1.4] text-[#333]">“Yes, removal and disposal of the old split system is in the price, and the install is still Thursday at 10am.”</p>
              <motion.div animate={approvedT ? { scale: [1, 0.96, 1] } : {}} className={`mt-2 rounded-[7px] text-center text-[12px] py-1.5 ${approvedT ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
                {approvedT ? 'Approved by Dave · sent 10:41' : 'Approve'}
              </motion.div>
            </motion.div>
            <p className="mt-4 mb-1.5 text-[11px] text-[#777]">Done since 7am</p>
            <div className="grid gap-[7px]">
              {FEED_T.filter((f) => n >= f[4]).map(([glyph, who, t, text], i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-[16px_34px_1fr] gap-2 items-start text-[11px]">
                  <Avatar glyph={glyph} size={14} mode="still" />
                  <span className="font-mono text-[10px] text-[#999] tabular-nums pt-[1px]">{t}</span>
                  <span className="text-[#333] leading-[1.35]"><b className="font-medium">{who}</b> · {text}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-auto text-[10.5px] text-[#999] leading-tight">Max, Kit and Vic are AI employees. Dave approves what goes out. Example figures.</p>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── Hospitality: the functions pipeline (dashboards-2026-10-15/hospitality.md) ─── */

const CLARA = G(['...X...', '...X...', '.XXXXX.', '..XXX..', '..X.X..', '.X...X.', 'X.....X'])
const OLIVE = G(['..XXX..', '.X...X.', 'X.....X', 'X.....X', 'X.....X', '.X...X.', '..XXX..'])
const RITA = (EMPLOYEES.find((e) => e.name === 'Rita') || EMPLOYEES[3]).glyph
const STAGES = [['New', 4, '$11,200'], ['Replied', 6, '$18,900'], ['Site visit', 3, '$9,400'], ['Proposal sent', 5, '$21,750'], ['Deposit paid', 9, '$38,600']]
// [stage, name, guests and date, value, note]
const FUNCS = [
  [0, 'Engagement drinks', '45 guests · Fri 13 Mar', '$3,150', 'in 8:12am'], [0, 'Team lunch', '20 guests · Thu 5 Mar', '$1,400', 'in 9:30am'],
  [1, 'Retirement dinner', '32 guests · Sat 28 Feb', '$2,880', 'replied Sat'], [1, 'Book club dinner', '14 guests · Wed 4 Mar', '$980', 'replied Fri'],
  [2, 'Lee 50th', '50 guests · Sat 14 Mar', '$3,950', 'visit Tue 5pm'], [2, 'Baby shower', '30 guests · Sun 15 Mar', '$1,800', 'visit Thu 11am'],
  [3, 'Patel wedding', '90 guests · Sat 11 Apr', '$9,900', 'sent Mon'], [3, 'Corporate lunch', '40 guests · Fri 20 Mar', '$2,600', 'sent Tue'],
  [4, 'Nguyen christening', '60 guests · Sun 8 Mar', '$4,200', 'paid'], [4, 'Quiz night', '70 guests · Thu 12 Mar', '$2,100', 'paid'], [4, 'Wake, Okafor', '55 guests · Fri 6 Mar', '$3,300', 'paid'],
]
const HERO_H = { name: '40th birthday', line: '60 guests · Sat 21 Mar', value: '$4,740' }
const TIMELINE_H = [['Enquiry', 'Sat 9:47pm', 0], ['Draft ready', '9:48pm', 1], ['Approved, Jess', '11:02pm', 2], ['Visit booked', 'Sun 10:12am', 4]]
const WEEK = [['Mon', []], ['Tue', ['5pm Lee 50th · visit']], ['Wed', ['7pm Book club · Back room']], ['Thu', ['11am Baby shower · visit', '7pm Quiz night · Bar']], ['Fri', ['6pm Wake · Back room']], ['Sat', ['7pm Retirement · Back room']], ['Sun', ['10am 40th · visit']]]

function FuncCard({ f, hero, n }) {
  const [, name, line, value, note] = f || [0, HERO_H.name, HERO_H.line, HERO_H.value, '']
  const paid = f && f[0] === 4
  return (
    <motion.div layout={hero ? true : undefined} layoutId={hero ? 'forty' : undefined} className="rounded-[6px] border bg-white px-2.5 py-2" style={{ borderColor: hero && n >= 1 && n < 2 ? STATE.waiting : hero ? STATE.done : 'rgba(17,17,17,.1)', boxShadow: hero ? '0 8px 20px -12px rgba(0,0,0,.35)' : 'none' }}>
      <p className="text-[11.5px] font-semibold truncate">{name}</p>
      <p className="text-[10.5px] text-[#777] truncate">{line}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[12px] font-semibold tabular-nums">{value}</span>
        {hero ? <Avatar glyph={CLARA} size={14} mode={n >= 2 ? 'done' : n >= 1 ? 'wait' : 'scan'} /> : <span className="flex items-center gap-1 text-[10px] text-[#777]"><Dot c={paid ? STATE.done : STATE.queued} size={5} />{note}</span>}
      </div>
      {hero && (
        <div className="mt-1.5 pt-1.5 border-t border-[#111]/8 grid gap-[2px]">
          {TIMELINE_H.filter((t) => n >= t[2]).map(([k, t]) => (
            <p key={k} className="flex items-center gap-1.5 text-[10px] text-[#555] whitespace-nowrap"><Dot c={k.startsWith('Approved') || k.startsWith('Visit') ? STATE.done : INK} size={4} />{k} <span className="text-[#999] font-mono text-[9px] ml-auto">{t}</span></p>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function FunctionsPipeline() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5)
  const heroStage = n >= 4 ? 2 : n >= 2 ? 1 : 0
  const approvedH = n >= 2
  return (
    <div ref={ref}>
      <Frame bar="Functions office · an example restaurant" right="Sunday · 10:15am">
        <div className="grid grid-cols-[44px_748px_1fr]" style={{ height: H - 42 }}>
          <aside className="bg-[#111] flex flex-col items-center gap-4 pt-4">
            {[0, 1, 2, 3, 4].map((i) => <span key={i} className={`block w-4 h-4 rounded-[4px] ${i === 2 ? 'bg-white' : 'bg-white/25'}`} />)}
          </aside>
          <div className="flex flex-col min-w-0 border-r border-[#111]/10">
            <div className="grid grid-cols-[repeat(5,1fr)_150px] h-[52px] border-b border-[#111]/10">
              {STAGES.map(([k, c, money], i) => (
                <div key={k} className={`flex flex-col justify-center px-3 ${i ? 'border-l border-[#111]/8' : ''}`}>
                  <p className="text-[10px] uppercase tracking-[0.06em] text-[#777] truncate">{k}</p>
                  <p className="text-[13px] font-semibold tabular-nums leading-tight">{i === heroStage ? c + 1 : c} <span className="text-[10.5px] font-normal text-[#777]">{money}</span></p>
                </div>
              ))}
              <div className="flex flex-col justify-center px-3 bg-[#111] text-white">
                <p className="text-[10px] uppercase tracking-[0.06em] text-white/60">Held this month</p>
                <p className="text-[13px] font-semibold tabular-nums leading-tight">$52,300</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-5 gap-2 p-3 bg-[#F6F6F3] content-start overflow-hidden">
              {STAGES.map((st, si) => (
                <div key={st[0]} className="grid gap-2 content-start min-w-0">
                  {si === heroStage && <FuncCard hero n={n} />}
                  {FUNCS.filter((f) => f[0] === si).map((f) => <FuncCard key={f[1]} f={f} />)}
                </div>
              ))}
            </div>
            <div className="h-[54px] border-t border-[#111]/10 grid grid-cols-7">
              {WEEK.map(([d, items], i) => (
                <div key={d} className={`px-1.5 py-1 min-w-0 ${i ? 'border-l border-[#111]/8' : ''} ${i === 6 ? 'bg-[#F6F6F3]' : ''}`}>
                  <p className="text-[9.5px] text-[#999]">{d}{i === 6 ? ' · today' : ''}</p>
                  {items.map((t) => <p key={t} className="text-[9.5px] text-[#333] leading-tight truncate">{t}</p>)}
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-3.5 flex flex-col gap-2.5 min-w-0">
            <motion.div animate={approvedH ? { borderColor: STATE.done } : n >= 1 ? { borderColor: STATE.waiting } : {}} className="rounded-xl border border-[#111]/10 p-3">
              <div className="flex items-center gap-2.5">
                <Avatar glyph={CLARA} size={28} mode={approvedH ? 'done' : n >= 1 ? 'wait' : 'scan'} />
                <p className="text-[12.5px]"><b>Clara</b> <span className="text-[#777]">· Functions</span></p>
                <span className="ml-auto text-[11px] text-[#777]">{n >= 1 ? 'Sat 9:48pm' : ''}</span>
              </div>
              <p className="mt-2 text-[11.5px] text-[#333]">Tom asked about a 40th for 60 on Sat 21 March.</p>
              <p className="mt-1.5 rounded-[6px] bg-[#F6F6F3] px-2.5 py-2 text-[11.5px] leading-[1.4] text-[#333]">“The back room seats 60 and is free on 21 March. Cocktail package $79 a head, proposal attached. Would Sunday 10am suit for a look around?”</p>
              <motion.div animate={approvedH ? { scale: [1, 0.96, 1] } : {}} className={`mt-2 rounded-[7px] text-center text-[12px] py-1.5 ${approvedH ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
                {approvedH ? 'Approved by Jess · 11:02pm, between tables' : 'Approve'}
              </motion.div>
            </motion.div>
            <div className="rounded-xl border border-[#111]/10 p-3">
              <div className="flex items-center gap-2.5 mb-2">
                <Avatar glyph={OLIVE} size={24} mode="scan" />
                <p className="text-[12px]"><b>Olive</b> <span className="text-[#777]">· Deposits</span></p>
              </div>
              <div className="grid gap-1">
                {[['Patel wedding', '$1,500 · due Fri · reminder 2 of 3', STATE.queued], ['Lee 50th', n >= 5 ? '$800 · paid this morning' : '$800 · due today · reminder 3 of 3', n >= 5 ? STATE.done : STATE.queued], ['Corporate lunch', '$600 · due Mon · reminder 1 of 3', STATE.queued]].map(([k, v, c]) => (
                  <p key={k} className="flex items-center gap-2 text-[11px] min-w-0"><Dot c={c} size={5} /><span className="font-medium whitespace-nowrap">{k}</span><span className="text-[#777] truncate">{v}</span></p>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-[#111]/10 p-3 flex items-center gap-2.5">
              <Avatar glyph={RITA} size={24} mode="scan" />
              <div className="min-w-0 leading-tight">
                <p className="text-[12px]"><b>Rita</b> <span className="text-[#777]">· Rebookings</span></p>
                <p className="text-[11px] text-[#777] truncate">Acme Christmas party, held 12 Dec: ask to rebook, draft ready</p>
              </div>
            </div>
            <p className="mt-auto text-[10.5px] text-[#999] leading-tight">Clara, Olive and Rita are AI employees. Jess approves what goes out. Example figures.</p>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── the section, renamed, with The Work folded in ────────── */

const BUILT = { property: 'https://dashboard.herbert-aisolutions.com' }
const SLUG = { property: 'real-estate', trades: 'trades', health: 'allied-health', hospitality: 'hospitality', finance: 'accountants' }

export function OSSection({ Visual, activeId = 'property', heading = 'Built for the office you actually run.', lines = null, caption = null }) {
  const active = INDUSTRIES.find((x) => x.id === activeId)
  const line = (x) => (lines ? lines[x.id] : x.system)
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-[15px] font-medium text-[#555] mb-4">Operating Systems</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[22ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            {heading}
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <div>
            <Scaled><Visual /></Scaled>
            <div className="mt-4 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-[15px] font-medium text-[#777]">{active.name}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{line(active)}</p>
                {caption && <p className="mt-1.5 text-[13.5px] text-[#777]">{caption}</p>}
              </div>
              {BUILT[active.id] ? (
                <Link href={BUILT[active.id]} className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                  Built. Open the dashboard <span aria-hidden>&rarr;</span>
                </Link>
              ) : (
                <Link href={`/industries/${SLUG[active.id]}`} className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                  See the {active.name} page <span aria-hidden>&rarr;</span>
                </Link>
              )}
            </div>
          </div>
          <div role="tablist" aria-label="Operating systems" className="border-b border-[#111]/15">
            {INDUSTRIES.map((x) => {
              const on = x.id === active.id
              return (
                <div key={x.id} role="tab" aria-selected={on} className={`py-4 pl-4 pr-3 border-t border-[#111]/15 border-l-2 ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent'}`}>
                  <span className="flex items-center gap-2 text-[15px] font-medium text-[#777]">{x.name}{BUILT[x.id] && <span className="font-mono text-[10px] uppercase tracking-[0.12em] rounded-full border border-[#111]/15 px-2 py-[1px] text-[#555]">Built</span>}</span>
                  <span className={`block mt-1 text-[20px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{line(x)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// The 15 Oct board's other two Property options, kept for the ledger's record
// (design-pass-site-2026-10-15-operating-systems.png); not shown on the page.
export const EARLIER = { OfficeMap, DayLanes }

// One screen per industry, each in its own software's idiom (Will, 15 Oct
// 2026: "a different looking dashboard for each industry"), drawn from
// product/research/markdown/dashboards-2026-10-15/<industry>.md. Property is
// option 1 from the board, cleaned up ("read a bit cleaner/less cluttered").
const SCREENS = [
  ['property', 'Property · the operations hub', 'Option 1 from the board, cleaner: three regions, one line per decision, the team down the side.', HubWhole],
  ['trades', 'Trades · the office system', 'The dispatch board the office lives in: technicians as rows, hours across, a now-line, a pipeline strip underneath with each AI employee under its column, and the one reply waiting on the owner.', DispatchBoard],
  ['health', 'Health · the patient board', 'The appointment book every clinic system opens to: time down the side, practitioners across, the cancelled 2:15pm the only dashed block, the wait-list offers the one approval.', ClinicBook],
  ['hospitality', 'Hospitality · the functions office', 'The sales view functions software opens to: stages with counts and dollars, cards by stage with the 40th moving across as it plays, Clara’s reply the one approval, deposits and rebookings under it, the week along the bottom.', FunctionsPipeline],
  ['finance', 'Finance · the season board', 'The jobs board every practice tool shows: five stages with count pills, the fat “waiting on client” column, the AI employee as the last line on each card, one reply read against the checklist and one request approved on the right.', SeasonBoard],
]

export default function OperatingSystemOptions() {
  const [runs, setRuns] = useState({})
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {SCREENS.filter(([, , , Visual]) => Visual).map(([id, name, note, Visual]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
            <button type="button" onClick={() => setRuns((r) => ({ ...r, [id]: (r[id] || 0) + 1 }))} className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10">
              Run again
            </button>
          </div>
          <div key={runs[id] || 0}><OSSection Visual={Visual} activeId={id} /></div>
        </div>
      ))}
    </main>
  )
}
