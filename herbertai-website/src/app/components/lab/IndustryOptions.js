'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { STATE, useInView } from '../runs/board'
import { useSteps } from '../runs/steps'
import { Avatar } from '../runs/employees'

// Design pass, homepage section 4, Industries (14 Oct 2026): layout A, the
// five industries listed beside one big screen showing that industry's full
// system. Property is drawn first, three ways, and the other four follow the
// pick. Everything is from the Property research
// (product/research/markdown/industries-2026-10-13/property.md, sections 4 and
// 6): A the hub's morning, the approvals screen a principal opens; B one
// after-hours repair start to finish on a split screen, the research's own
// pick; C the maintenance board, a job moving across it overnight. Every
// name, address and figure is made up. Colour is state only. Goes with the lab.

const W = 1184
const H = 520
const Q = '’'

export const INDUSTRIES = [
  { id: 'property', name: 'Property', system: 'An operations hub for a property agency' },
  { id: 'trades', name: 'Trades', system: 'An office system for a trade business' },
  { id: 'health', name: 'Health', system: 'A patient board for a clinic' },
  { id: 'hospitality', name: 'Hospitality', system: 'A functions office for a venue' },
  { id: 'finance', name: 'Finance', system: 'A season board for a practice' },
]

const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))
export const EMMA = G(['...X...', '..X.X..', '.X...X.', 'XXXXXXX', '.X...X.', '.X.X.X.', '.XXXXX.'])
export const KATE = G(['XXXXXXX', 'X.....X', 'X.X.X.X', 'X.....X', 'X.XXX.X', 'X.....X', 'XXXXXXX'])
export const ROSE = G(['..XXX..', '.X...X.', 'X..X..X', 'X..XX.X', 'X.....X', '.X...X.', '..XXX..'])

export function Lamp({ s, size = 8 }) {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full shrink-0"
      style={{ width: size, height: size, background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

export function Status({ s, children, size = 12 }) {
  return (
    <span className="inline-flex items-center gap-2 leading-[1.3] whitespace-nowrap" style={{ color: s === 'done' ? '#0E8F53' : s === 'waiting' ? '#9A6300' : '#777', fontSize: size }}>
      <Lamp s={s} />
      {children}
    </span>
  )
}

export function Scaled({ children }) {
  const ref = useRef(null)
  const [k, setK] = useState(0.6)
  useEffect(() => {
    const el = ref.current
    const ro = new ResizeObserver(() => setK(el.clientWidth / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute top-0 left-0" style={{ width: W, transform: `scale(${k})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

export function Frame({ bar, right, children }) {
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden" style={{ height: H }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555]">
        <span>{bar}</span>
        {right && <span>{right}</span>}
      </div>
      {children}
    </div>
  )
}

/* ─── A: the hub's morning (the approvals screen) ───────────── */

const QUEUE = [
  { who: 'Emma', job: 'Maintenance', glyph: EMMA, what: `Hot water at 12 Elm St, Norwood. Plumber $380, inside the landlord${Q}s $500 limit. Booked 8:30am unless you say no.`, at: 2, then: 'Approved by Jess, booked 8:30am' },
  { who: 'Kate', job: 'Renewals', glyph: KATE, what: `Rent review, 14 Elm St: $520 to $545 a week, three comparables attached, notice ready for 1 Dec.`, at: 3, then: 'Approved by Jess, notice sent' },
  { who: 'Rose', job: 'Arrears', glyph: ROSE, what: `8 Sturt St, 15 days behind, no reply to two reminders. Breach notice drafted.`, at: 4, then: 'Edited by Jess, sent' },
]

function HubMorning() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5)
  const handled = 30 + Math.min(2, Math.max(0, n - 1))
  return (
    <div ref={ref}>
      <Frame bar="Operations hub · an example property agency" right="Tuesday · 7:00am">
        <div className="grid grid-cols-[1.35fr_1fr] gap-5 p-5">
          <div>
            <div className="flex items-baseline justify-between mb-3">
              <p className="text-[15px] font-semibold">Waiting on you</p>
              <p className="text-[12px] text-[#777] tabular-nums">{QUEUE.filter((q) => n < q.at).length} to decide</p>
            </div>
            <div className="grid gap-2.5">
              {QUEUE.map((q) => {
                const done = n >= q.at
                return (
                  <motion.div key={q.who} layout className="rounded-lg border border-[#111]/10 bg-white p-4 grid grid-cols-[44px_1fr_auto] gap-x-3.5 items-start">
                    <Avatar glyph={q.glyph} size={44} mode={done ? 'done' : n >= 1 ? 'wait' : 'still'} />
                    <div className="min-w-0">
                      <p className="text-[13px]"><span className="font-semibold">{q.who}</span> <span className="text-[#777]">· {q.job}</span></p>
                      <p className="mt-1 text-[14px] leading-[1.4] text-[#333]">{q.what}</p>
                      <div className="mt-1.5"><Status s={done ? 'done' : 'waiting'}>{done ? q.then : 'Waiting on Jess'}</Status></div>
                    </div>
                    <motion.span
                      animate={done ? { opacity: 0.35, scale: 0.96 } : { opacity: 1, scale: 1 }}
                      className="rounded-[7px] bg-[#111] text-white text-[12px] px-3 py-1.5"
                    >
                      {done ? 'Done' : 'Approve'}
                    </motion.span>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <div className="grid gap-2.5 content-start">
            <div className="rounded-lg border border-[#111]/10 p-4">
              <p className="text-[12.5px] text-[#666]">This week</p>
              <p className="mt-1 text-[26px] font-semibold tracking-[-0.02em] tabular-nums">34 <span className="text-[14px] font-medium text-[#666]">requests</span></p>
              <p className="text-[13px] text-[#333] tabular-nums"><b>{handled}</b> handled by the AI employees · <b>{34 - handled}</b> needed a person</p>
            </div>
            {[
              ['Maintenance', '7 open', '2 urgent, both booked'],
              ['Leasing', '3 vacancies', '9 days vacant on average'],
              ['Arrears', '2.1% of rent roll', '9 tenancies behind, 7 promised'],
              ['Renewals', '5 due in 30 days', '12 of 12 on time this quarter'],
            ].map(([k, v, sub]) => (
              <div key={k} className="rounded-lg border border-[#111]/10 px-4 py-3 flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[13px] font-medium">{k}</p>
                  <p className="text-[12px] text-[#777]">{sub}</p>
                </div>
                <p className="text-[15px] font-semibold tabular-nums whitespace-nowrap">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── B: one repair, start to finish ────────────────────────── */

const TIMELINE = [
  ['11:43pm', 'Marked urgent. Landlord’s standing limit: $500', 1],
  ['6:58am', 'Plumber quoted $380, inside the limit', 3],
  ['7:00am', 'Jess asked to approve', 4],
  ['7:05am', 'Booked for 8:30am', 5],
  ['7:06am', 'Tenant told', 5],
  ['10:40am', 'Done. Invoice matched to the quote', 6],
]

function Bubble({ side, time, children }) {
  return (
    <div className={`flex ${side === 'r' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.4] ${side === 'r' ? 'bg-[#111] text-white' : 'bg-[#F1F1EE] text-[#111]'}`}>
        {children}
        <p className={`mt-1 text-[10.5px] ${side === 'r' ? 'text-white/60' : 'text-[#888]'}`}>{time}</p>
      </div>
    </div>
  )
}

function OneRepair() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 6)
  const approved = n >= 5
  return (
    <div ref={ref}>
      <Frame bar="One repair, after hours · an example property agency" right="12 Elm St, Norwood">
        <div className="grid grid-cols-[0.9fr_1.2fr_0.9fr] gap-5 p-5">
          <div className="rounded-xl border border-[#111]/10 p-3.5">
            <p className="text-[11px] text-[#888] mb-3 text-center">The tenant{Q}s phone</p>
            <div className="grid gap-2">
              <Bubble side="r" time="11:42pm">Hot water{Q}s gone cold. Photo attached.</Bubble>
              {n >= 1 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <Bubble side="l" time="11:43pm">Thanks Aisha, this is Emma, the AI maintenance assistant. No hot water is an urgent repair, so a plumber will contact you by 8am.</Bubble>
                </motion.div>
              )}
              {n >= 5 && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <Bubble side="l" time="7:06am">Dave from Norwood Plumbing is booked for 8:30 this morning.</Bubble>
                </motion.div>
              )}
            </div>
          </div>
          <div className="pt-1">
            <p className="text-[13px] font-semibold mb-3">What happened overnight</p>
            <div className="min-h-[270px]">
              {TIMELINE.filter((t) => n >= t[2]).map(([time, what], i) => (
                <motion.div key={time + i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-[64px_1fr] gap-3 py-2.5 border-t border-[#111]/8 text-[13.5px]">
                  <span className="font-mono text-[11.5px] text-[#777] tabular-nums pt-0.5">{time}</span>
                  <span className="text-[#333]">{what}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-4 pt-3 border-t border-[#111]/15 text-[13px] text-[#333] tabular-nums">This week: <b>34</b> requests, <b>30</b> handled, <b>4</b> needed a person.</p>
          </div>
          <div className="rounded-xl border border-[#111]/10 p-3.5">
            <p className="text-[11px] text-[#888] mb-3 text-center">The property manager{Q}s phone</p>
            {n >= 4 ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-[#111]/10 p-3.5">
                <div className="flex items-center gap-2.5">
                  <Avatar glyph={EMMA} size={34} mode={approved ? 'done' : 'wait'} />
                  <p className="text-[12.5px]"><span className="font-semibold">Emma</span> <span className="text-[#777]">· Maintenance · 7:00am</span></p>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.4] text-[#333]">Hot water at 12 Elm St, Norwood. Plumber $380, inside the landlord{Q}s $500 limit. Booked 8:30am unless you say no.</p>
                <motion.div animate={approved ? { scale: [1, 0.94, 1] } : {}} className={`mt-3 rounded-[7px] text-center text-[12px] py-2 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
                  {approved ? 'Approved by Jess · 7:05am' : 'Approve'}
                </motion.div>
              </motion.div>
            ) : (
              <div className="rounded-lg border border-dashed border-[#111]/15 p-6 text-center text-[12px] text-[#999]">Nothing yet. Jess is asleep.</div>
            )}
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── C: the maintenance board ──────────────────────────────── */

const COLS = ['New', 'Urgent', 'Awaiting landlord', 'Quoting', 'Booked', 'Done']
const JOBS = [
  { id: 'tap', title: 'Dripping tap', addr: '3 Rose Tce', col: 3, note: 'Two quotes in' },
  { id: 'lock', title: 'Front door lock', addr: '7 Park Ave, Unit 2', col: 4, note: 'Locksmith Thursday 10am' },
  { id: 'gutter', title: 'Blocked gutter', addr: '21 Osmond Tce', col: 2, note: 'Quote $640, limit $500' },
  { id: 'fence', title: 'Fence panel', addr: '40 Magill Rd', col: 5, note: 'Invoice matched' },
  { id: 'oven', title: 'Oven element', addr: '9 Beulah Rd', col: 5, note: 'Invoice matched' },
]
const HOT = { id: 'hot', title: 'No hot water', addr: '12 Elm St, Norwood', urgent: true }
const HOTCOL = [0, 1, 2, 3, 3, 4, 5] // by step
const HOTNOTE = ['11:42pm, tenant SMS', '11:43pm, urgent, plumber by 8am', 'Limit $500 on file', '6:58am, quoted $380', '7:00am, waiting on Jess', '7:05am, booked 8:30am', '10:40am, done']

function Card({ j, note, state }) {
  return (
    <motion.div layoutId={j.id} layout transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className={`rounded-md border bg-white px-3 py-2.5 ${j.urgent ? 'border-[#111]/30' : 'border-[#111]/10'}`}>
      <p className="text-[13px] font-semibold">{j.title}</p>
      <p className="text-[11.5px] text-[#777]">{j.addr}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px]" style={{ color: state === 'done' ? '#0E8F53' : state === 'waiting' ? '#9A6300' : '#666' }}>
        {state && <Lamp s={state} size={7} />}
        {note}
      </p>
    </motion.div>
  )
}

function MaintenanceBoard() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 6)
  const hotCol = HOTCOL[n]
  const hotState = n >= 6 ? 'done' : n === 4 ? 'waiting' : null
  return (
    <div ref={ref}>
      <Frame bar="Maintenance board · an example property agency" right={`${JOBS.length + 1} open`}>
        <LayoutGroup>
          <div className="grid grid-cols-6 gap-2 p-4">
            {COLS.map((c, i) => {
              const here = JOBS.filter((j) => j.col === i)
              return (
                <div key={c} className="rounded-lg bg-[#F5F5F2] p-2 min-h-[372px]">
                  <div className="flex items-baseline justify-between px-1 pb-2">
                    <span className="text-[12px] font-medium">{c}</span>
                    <span className="text-[11.5px] text-[#888] tabular-nums">{here.length + (hotCol === i ? 1 : 0)}</span>
                  </div>
                  <div className="grid gap-2">
                    {hotCol === i && <Card j={HOT} note={HOTNOTE[n]} state={hotState} />}
                    {here.map((j) => <Card key={j.id} j={j} note={j.note} state={i === 5 ? 'done' : i === 2 ? 'waiting' : null} />)}
                  </div>
                </div>
              )
            })}
          </div>
        </LayoutGroup>
        <div className="border-t border-[#111]/10 px-5 py-3 flex items-center justify-between">
          <p className="text-[13px]"><span className="font-medium">Waiting on a person:</span> <span className="text-[#333]">{n === 4 ? `Jess, approve the $380 plumber for 12 Elm St` : n > 4 ? 'nothing right now' : `blocked gutter at 21 Osmond Tce, quote over the landlord${Q}s limit`}</span></p>
          <AnimatePresence>{n === 4 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rounded-[7px] bg-[#111] text-white text-[12px] px-3 py-1.5">Approve</motion.span>}</AnimatePresence>
        </div>
      </Frame>
    </div>
  )
}

/* ─── the section in layout A, Property active ──────────────── */

export function IndustriesSection({ Visual }) {
  const active = INDUSTRIES[0]
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <p className="text-[15px] font-medium text-[#555] mb-4">Industries</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Built for the office you actually run.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <div>
            <Scaled><Visual /></Scaled>
            <div className="mt-5 flex items-baseline justify-between gap-6">
              <div>
                <p className="text-[15px] font-medium text-[#777]">{active.name}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{active.system}</p>
              </div>
              <Link href="/industries/real-estate" className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                See the {active.name} page <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
          <div>
            <div role="tablist" aria-label="Industries" className="border-b border-[#111]/15">
              {INDUSTRIES.map((x) => {
                const on = x.id === active.id
                return (
                  <div key={x.id} role="tab" aria-selected={on} className={`py-5 pl-4 pr-3 border-t border-[#111]/15 border-l-2 ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent'}`}>
                    <span className="block text-[15px] font-medium text-[#777]">{x.name}</span>
                    <span className={`block mt-1 text-[20px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{x.system}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const OPTIONS = [
  ['a', 'A. The hub’s morning', 'The approvals screen a principal opens at 7am: three decisions waiting, each from a named AI employee, approved one by one; the week’s numbers and the four boards beside it.', HubMorning],
  ['b', 'B. One repair, start to finish', 'A tenant’s 11:42pm text, the overnight timeline, and the property manager’s single approval at 7:05am, on a split screen. The research’s own pick.', OneRepair],
  ['c', 'C. The maintenance board', 'The jobs board with a no-hot-water card moving across it overnight, from New to Done, pausing once for a person.', MaintenanceBoard],
]

export default function IndustryOptions() {
  const [runs, setRuns] = useState({ a: 0, b: 0, c: 0 })
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
          <div key={runs[id]}><IndustriesSection Visual={Visual} /></div>
        </div>
      ))}
    </main>
  )
}
