'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../runs/board'
import { useSteps } from '../runs/steps'
import { Avatar, EMPLOYEES } from '../runs/employees'
import { EMMA, KATE, ROSE, Frame, IndustriesSection, Lamp } from './IndustryOptions'

// Design pass, Industries, the recognition version (15 Oct 2026). Will: "what
// is the point of this section, we're showing demo dashboards, or how an
// employee might work" and then "show me the recognition version". The
// section's job here is recognition: the visitor sees their own industry's
// week, the AI employee that would take each job, and the software it plugs
// into, then goes to the industry page. Property drawn three ways from
// industries-2026-10-13/property.md: hours are the research's estimates for an
// example agency (10 staff, 400 properties) and are labelled as such; they
// are never a saving, only the size of the job. Goes with the lab.

const Q = '’'
const G = (rows) => rows.map((r) => [...r].map((c) => c === 'X'))
const LEO = G(['...X...', '..X.X..', '.X...X.', 'X.....X', '.XXXXX.', '.X...X.', '.XXXXX.'])
const GUS = EMPLOYEES.find((e) => e.name === 'Gus').glyph

const TEAM = [
  { name: 'Emma', job: 'Maintenance', glyph: EMMA, line: 'Every repair from the tenant’s first message to a finished, invoiced job', takes: 'Maintenance', hours: '15 to 25 hrs a week', into: 'PropertyMe, your inbox, the tradie’s phone' },
  { name: 'Leo', job: 'Leasing', glyph: LEO, line: 'Enquiries answered, inspections booked, applications chased to complete', takes: 'Leasing', hours: '12 to 20 hrs a week', into: 'Inspect Real Estate, 2Apply, your inbox' },
  { name: 'Kate', job: 'Renewals', glyph: KATE, line: 'Every lease ending in 90 days decided, written and signed on time', takes: 'Renewals and rent reviews', hours: '3 to 5 hrs a week', into: 'PropertyMe, the landlord’s inbox' },
  { name: 'Rose', job: 'Arrears', glyph: ROSE, line: 'The ledger checked every morning, every late rent followed up by the rules', takes: 'Arrears', hours: '4 to 6 hrs a week', into: 'PropertyMe, SMS' },
  { name: 'Gus', job: 'Recoveries', glyph: GUS, line: 'Every signed agreement compared with what the ledger actually charged', takes: 'Fee checks nobody does', hours: 'about $11,000 a year found', into: 'Your agreements, the ledger' },
]

const WEEK = [
  { job: 'Maintenance', hours: '15 to 25', w: 100, who: 'Emma' },
  { job: 'Leasing', hours: '12 to 20', w: 80, who: 'Leo' },
  { job: 'Routine inspections', hours: '7 to 15', w: 55, who: null },
  { job: 'Arrears', hours: '4 to 6', w: 25, who: 'Rose' },
  { job: 'Renewals and rent reviews', hours: '3 to 5', w: 20, who: 'Kate' },
  { job: 'Fee and water checks', hours: 'nobody’s', w: 8, who: 'Gus' },
]

function Who({ name, size = 30 }) {
  const e = TEAM.find((t) => t.name === name)
  return <Avatar glyph={e.glyph} size={size} mode="done" />
}

/* ─── 1: the week ───────────────────────────────────────────── */

function TheWeek() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 6, 700)
  const order = WEEK.filter((w) => w.who).map((w) => w.who)
  return (
    <div ref={ref}>
      <Frame bar="A week at an example property agency" right="10 staff · 400 properties · example figures">
        <div className="p-5">
          <div className="grid grid-cols-[200px_1fr_250px] gap-x-5 items-center text-[11.5px] text-[#888] pb-2 border-b border-[#111]/10">
            <span>The admin job</span><span>Hours a week, today</span><span>Who takes it</span>
          </div>
          {WEEK.map((w) => {
            const idx = w.who ? order.indexOf(w.who) : -1
            const on = w.who && n > idx
            return (
              <div key={w.job} className="grid grid-cols-[200px_1fr_250px] gap-x-5 items-center py-3 border-b border-[#111]/8">
                <span className="text-[14px] font-medium">{w.job}</span>
                <div className="flex items-center gap-3">
                  <div className="h-[10px] rounded-full bg-[#E7E7E3] overflow-hidden" style={{ width: `${w.w}%`, maxWidth: 420 }}>
                    <div className="h-full bg-[#111]/70" style={{ width: '100%' }} />
                  </div>
                  <span className="text-[12.5px] text-[#555] tabular-nums whitespace-nowrap">{w.hours}{w.hours.includes('nobody') ? '' : ' hrs'}</span>
                </div>
                <div className="min-h-[34px] flex items-center">
                  {w.who ? (
                    on ? (
                      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5">
                        <Who name={w.who} />
                        <span className="text-[13px]"><b>{w.who}</b> <span className="text-[#777]">· {TEAM.find((t) => t.name === w.who).job}</span></span>
                      </motion.div>
                    ) : (
                      <span className="text-[12px] text-[#bbb]">…</span>
                    )
                  ) : (
                    <span className="text-[12px] text-[#999]">Stays with your team</span>
                  )}
                </div>
              </div>
            )
          })}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
            <span className="text-[#777]">Plugs into what you already run:</span>
            {['PropertyMe', 'Inspection Express', 'Xero', 'your inbox'].map((t) => (
              <span key={t} className="rounded-md border border-[#111]/12 px-2.5 py-1 font-mono text-[11.5px]">{t}</span>
            ))}
            <span className="ml-auto flex items-center gap-2 text-[#555]"><Lamp s="waiting" /> a person approves what goes out</span>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── 2: your software, with the employees in it ────────────── */

const SYSTEMS = ['Inbox and phone', 'PropertyMe', 'Inspection Express', 'Xero']
const LINKS = [
  { name: 'Emma', from: [0, 1], what: 'reads the inbox, writes the job' },
  { name: 'Leo', from: [0, 2], what: 'answers enquiries, books inspections' },
  { name: 'Rose', from: [1, 0], what: 'reads the ledger, sends the reminder' },
  { name: 'Gus', from: [1, 3], what: 'compares the agreement with the ledger' },
  { name: 'Kate', from: [1, 0], what: 'drafts the notice, gets the landlord’s yes' },
]

function YourSoftware() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5, 750)
  const W = 1184 - 40
  const colX = (i) => (W / SYSTEMS.length) * (i + 0.5)
  const empX = (i) => (W / LINKS.length) * (i + 0.5)
  return (
    <div ref={ref}>
      <Frame bar="The software an example property agency already runs" right="nothing replaced">
        <div className="relative px-5 pt-5" style={{ height: 460 }}>
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${SYSTEMS.length}, 1fr)` }}>
            {SYSTEMS.map((s) => (
              <div key={s} className="rounded-lg border border-[#111]/12 bg-white px-4 py-3 text-center font-mono text-[12.5px]">{s}</div>
            ))}
          </div>
          <svg className="absolute left-5 top-[70px]" width={W} height={240} aria-hidden>
            {LINKS.slice(0, n).map((l, i) =>
              l.from.map((f) => (
                <motion.line
                  key={`${l.name}-${f}`}
                  x1={colX(f)} y1={0} x2={empX(i)} y2={200}
                  stroke="#111" strokeWidth="1" strokeOpacity="0.35"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                />
              )),
            )}
          </svg>
          <div className="absolute left-5 right-5 top-[270px] grid gap-3" style={{ gridTemplateColumns: `repeat(${LINKS.length}, 1fr)` }}>
            {LINKS.map((l, i) => (
              <div key={l.name} className="text-center">
                {n > i ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-2">
                    <Who name={l.name} size={44} />
                    <p className="text-[13px]"><b>{l.name}</b> <span className="text-[#777]">· {TEAM.find((t) => t.name === l.name).job}</span></p>
                    <p className="text-[11.5px] text-[#666] leading-[1.35] max-w-[170px]">{l.what}</p>
                  </motion.div>
                ) : (
                  <div className="h-[44px]" />
                )}
              </div>
            ))}
          </div>
          <p className="absolute left-5 right-5 bottom-4 text-[12.5px] text-[#555] flex items-center gap-2"><Lamp s="waiting" /> Each one does one job, and a person on your team approves what goes out.</p>
        </div>
      </Frame>
    </div>
  )
}

/* ─── 3: the team ───────────────────────────────────────────── */

function TheTeam() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5, 650)
  return (
    <div ref={ref}>
      <Frame bar="The AI employees for an example property agency" right="one job each">
        <div className="grid grid-cols-3 gap-3 p-5">
          {TEAM.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: n > i ? 1 : 0.25 }}
              className="rounded-lg border border-[#111]/10 bg-white p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar glyph={t.glyph} size={44} mode={n > i ? 'done' : 'still'} scanKey={n > i ? 1 : 0} />
                <div>
                  <p className="text-[15px] font-semibold leading-tight">{t.name}</p>
                  <p className="text-[13px] text-[#555] leading-tight">{t.job}</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-[1.4] text-[#333]">{t.line}</p>
              <p className="mt-3 text-[12px] text-[#555]"><span className="text-[#888]">Takes:</span> {t.takes}, <span className="tabular-nums">{t.hours}</span></p>
              <p className="mt-1 text-[12px] text-[#555]"><span className="text-[#888]">Plugs into:</span> {t.into}</p>
            </motion.div>
          ))}
          <div className="rounded-lg border border-dashed border-[#111]/15 p-4 flex flex-col justify-center text-[12.5px] text-[#555]">
            <p>Hours are the research{Q}s estimates for an example agency of 10 staff and 400 properties. Yours come from the free audit.</p>
            <p className="mt-2 flex items-center gap-2"><Lamp s="waiting" /> Jess approves what goes out.</p>
          </div>
        </div>
      </Frame>
    </div>
  )
}

const OPTIONS = [
  ['a', '1. The week', 'The admin jobs with the hours each takes at an example agency; an AI employee attaches to each job it would take; the software it plugs into underneath.', TheWeek],
  ['b', '2. Your software, with the employees in it', 'The systems the agency already runs as a row, the AI employees appearing between them with lines to what each reads and writes. Nothing replaced.', YourSoftware],
  ['c', '3. The team', 'The industry’s AI employees as a team sheet: what each does, the job it takes and its hours, what it plugs into.', TheTeam],
]

export default function IndustryRecognitionOptions() {
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
