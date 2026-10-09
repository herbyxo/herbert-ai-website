'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { STATE, useBoard, useInView } from '../runs/board'
import { AUDIT_HREF, RUNGS } from '../site/shared'

// Design pass, homepage section 2 "How it works" (10 Oct 2026): three options
// for the section under the hero, built to the "Runs itself" charter (paper
// ground, Geist, colour means state, motion means a job finishing). Each runs
// when it scrolls into view and has a Run again. The picked one moves to
// components/runs/ and this file goes with the lab when the pass ends.

const LABEL = {
  done: '#0E8F53',
  waiting: '#9A6300',
  queued: '#777',
}

function Lamp({ s }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
      style={{ background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

function Window({ title, right, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden ${className}`}>
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
        <span>{title}</span>
        {right}
      </div>
      {children}
    </div>
  )
}

function Head() {
  return (
    <div className="mb-12 md:mb-16">
      <p className="text-[15px] font-medium text-[#555] mb-4">How it works</p>
      <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
        Start with the job that costs you most.
      </h2>
    </div>
  )
}

function Cta() {
  return (
    <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-6 gap-y-4">
      <a
        href={AUDIT_HREF}
        className="inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors"
      >
        Book a free AI audit <span aria-hidden>&rarr;</span>
      </a>
      <Link
        href="/pricing"
        className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
      >
        See how it&apos;s priced
      </Link>
    </div>
  )
}

function Section({ children }) {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">{children}</div>
    </section>
  )
}

// Rows arrive in order; a waiting row turns green when its person approves.
// A queued row stays grey: it has not happened yet.
function stateOf(r) {
  return r.s === 'queued' ? 'queued' : r.state
}

function Status({ r }) {
  const s = stateOf(r)
  return (
    <span className="flex items-center gap-2 text-[12px] leading-[1.3]" style={{ color: LABEL[s] }}>
      <Lamp s={s} />
      {s === 'waiting' ? r.wait : r.then || 'Done'}
    </span>
  )
}

/* ─── A: the first month as a board ─────────────────────────── */

const MONTH = [
  { t: 'Day 1', who: 'Free AI audit', what: '45 minutes with Will on how the office runs', price: 'Free', s: 'done', then: 'Done' },
  { t: 'Day 3', who: 'The written page', what: 'Three jobs costed in the office’s own figures. Start with document chasing.', price: 'Free', s: 'done', then: 'Page sent' },
  { t: 'Day 4', who: 'Bottleneck Pilot', what: 'A document chaser built on the office’s real files', price: '$3,500 fixed', s: 'done', then: 'Started' },
  { t: 'Day 18', who: 'Document chaser live', what: 'First 38 reminders drafted, only for what is missing', price: 'Live in 14 days or free', s: 'waiting', wait: 'Waiting on Sarah', then: 'Approved by Sarah, sent' },
  { t: 'Month 2', who: 'The system it runs in', what: 'Files, comms and follow-ups on one system the office owns', price: 'From $25,000', s: 'queued', then: 'Scoped after the audit' },
]

export function OptionA() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1100, MONTH)
  return (
    <Section>
      <Head />
      <div ref={ref}>
        <Window title="Your first month · an example office">
          <div className="min-h-[300px] px-2 py-2">
            <AnimatePresence initial={false}>
              {b.shown.map((r) => (
                <motion.div
                  key={r.t}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-[64px_1fr] lg:grid-cols-[72px_200px_minmax(0,1fr)_170px_190px] items-center gap-x-3 gap-y-1 px-3 py-3.5 border-b border-[#111]/8 last:border-0 text-[15px]"
                >
                  <span className="text-[12px] text-[#777] tabular-nums font-mono">{r.t}</span>
                  <span className="font-medium">{r.who}</span>
                  <span className="col-start-2 lg:col-start-auto leading-[1.35] text-[#333]">{r.what}</span>
                  <span className="col-start-2 lg:col-start-auto text-[13px] font-medium">{r.price}</span>
                  <span className="col-start-2 lg:col-start-auto"><Status r={r} /></span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Window>
      </div>
      <Cta />
    </Section>
  )
}

/* ─── B: three steps, set plain ─────────────────────────────── */

export function OptionB() {
  return (
    <Section>
      <Head />
      <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
        {RUNGS.map((r, i) => (
          <div key={r.n} className="border-t border-[#111]/15 pt-6">
            <p className="text-[15px] font-medium text-[#777] mb-5">Step {i + 1}</p>
            <h3 className="text-[24px] font-semibold tracking-[-0.02em] mb-3">{r.title}</h3>
            <p className="text-[16px] leading-[1.55] text-[#444]">{r.body}</p>
            <p className="mt-5 text-[14px] font-medium">{r.price}</p>
          </div>
        ))}
      </div>
      <Cta />
    </Section>
  )
}

/* ─── C: each step shows what you get ───────────────────────── */

const AUDIT_ROWS = [
  ['Document chasing', '9 hours a week', 'about $19,000 a year'],
  ['Quote follow-up', '4 hours a week', 'about $8,600 a year'],
  ['New client intake', '3 hours a week', 'about $6,500 a year'],
]

function AuditPage() {
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] px-6 md:px-8 py-7">
      <div className="flex items-center justify-between text-[12px] font-mono text-[#777]">
        <span>AI audit · an example office</span>
        <span>Page 1 of 1</span>
      </div>
      <p className="mt-6 text-[20px] font-semibold tracking-[-0.02em]">The three jobs costing the most</p>
      <div className="mt-4">
        {AUDIT_ROWS.map(([job, hours, cost], i) => (
          <div key={job} className="grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_150px_170px] gap-x-4 gap-y-0.5 py-3 border-b border-[#111]/8 text-[15px]">
            <span className="font-medium">{i + 1}. {job}</span>
            <span className="text-[#555] tabular-nums md:text-left text-right">{hours}</span>
            <span className="col-span-2 md:col-span-1 text-[#333] tabular-nums md:text-right">{cost}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[15px]">
        <span className="font-semibold">Hand over first:</span> document chasing.
      </p>
      <p className="mt-6 text-[12px] font-mono text-[#999]">Example figures. Yours come from your own numbers.</p>
    </div>
  )
}

const PILOT = [
  { t: '09:00', what: 'Checklists sent to 150 clients', s: 'done' },
  { t: '09:12', what: '38 reminders drafted, only for what is missing', s: 'waiting', wait: 'Waiting on Sarah', then: 'Approved by Sarah, sent' },
  { t: '09:31', what: 'Bank statement matched to the Nguyen file', s: 'done' },
]

function PilotBoard() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1100, PILOT)
  return (
    <div ref={ref}>
      <Window title="Document chaser · day 14 · an example office">
        <div className="min-h-[180px] px-2 py-2">
          <AnimatePresence initial={false}>
            {b.shown.map((r) => (
              <motion.div
                key={r.t}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-[48px_1fr] md:grid-cols-[52px_minmax(0,1fr)_190px] items-center gap-x-3 gap-y-1 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[15px]"
              >
                <span className="text-[12px] text-[#777] tabular-nums font-mono">{r.t}</span>
                <span className="leading-[1.35] text-[#333]">{r.what}</span>
                <span className="col-start-2 md:col-start-auto"><Status r={r} /></span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Window>
    </div>
  )
}

const OFFICE = [
  { t: '08:32', who: 'Document chaser', what: 'Checklists sent to 150 clients', s: 'done' },
  { t: '08:47', who: 'Quote follow-up', what: 'Quote 1042 followed up, second time', s: 'done' },
  { t: '08:51', who: 'Front desk assistant', what: 'New client intake form sent', s: 'done' },
  { t: '09:10', who: 'Invoice chaser', what: 'Invoice 2214 reminded, second time', s: 'waiting', wait: 'Waiting on Sarah', then: 'Approved by Sarah, sent' },
]

function OfficeBoard() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1100, OFFICE)
  return (
    <div ref={ref}>
      <Window
        title="The whole office · an example office"
        right={
          <span className="flex items-center gap-5 tabular-nums">
            <span className="flex items-center gap-2"><Lamp s="done" /> done <b>{b.done}</b></span>
            <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting on a person <b>{b.waiting}</b></span>
          </span>
        }
      >
        <div className="min-h-[232px] px-2 py-2">
          <AnimatePresence initial={false}>
            {b.shown.map((r) => (
              <motion.div
                key={r.t}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-[48px_1fr] md:grid-cols-[52px_168px_minmax(0,1fr)_190px] items-center gap-x-3 gap-y-1 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[15px]"
              >
                <span className="text-[12px] text-[#777] tabular-nums font-mono">{r.t}</span>
                <span className="font-medium">{r.who}</span>
                <span className="col-start-2 md:col-start-auto leading-[1.35] text-[#333]">{r.what}</span>
                <span className="col-start-2 md:col-start-auto"><Status r={r} /></span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Window>
    </div>
  )
}

const STEPS = [
  {
    title: 'A free AI audit',
    line: '45 minutes with Will on how your business runs. Within two business days you get a written page: the three jobs costing you most, in your own figures.',
    price: 'Free, and yours to keep.',
    Art: AuditPage,
  },
  {
    title: 'Your first AI employee',
    line: 'One AI employee for the top job, live on your real data in 14 days. Your team approves anything that goes out.',
    price: '$3,500 fixed. Live in 14 days or it’s free.',
    Art: PilotBoard,
  },
  {
    title: 'The system it runs in',
    line: 'The next jobs follow, on one system your team works out of and your business owns. The pilot’s $3,500 comes off.',
    price: 'From $25,000, scoped after the audit.',
    Art: OfficeBoard,
  },
]

export function OptionC() {
  return (
    <Section>
      <Head />
      <div>
        {STEPS.map(({ title, line, price, Art }, i) => (
          <div
            key={title}
            className="grid lg:grid-cols-[0.72fr_1.28fr] gap-x-12 gap-y-8 items-center py-12 border-t border-[#111]/10 first:pt-0 first:border-0"
          >
            <div>
              <p className="text-[15px] font-medium text-[#777] mb-4">Step {i + 1}</p>
              <h3 className="text-[28px] font-semibold tracking-[-0.025em] leading-[1.1] mb-3">{title}</h3>
              <p className="text-[17px] leading-[1.5] text-[#444] max-w-[40ch]">{line}</p>
              <p className="mt-5 text-[15px] font-medium">{price}</p>
            </div>
            <Art />
          </div>
        ))}
      </div>
      <Cta />
    </Section>
  )
}

/* ─── the lab page: all three, each with a Run again ───────── */

const OPTIONS = [
  ['a', 'A. The first month as a board', 'One product window: an example office’s first month, rows lighting in order from the audit to the system, with the price beside each step.', OptionA],
  ['b', 'B. Three steps, set plain', 'Today’s three steps and words, moved onto the new paper ground and Geist. No moving parts.', OptionB],
  ['c', 'C. Each step shows what you get', 'Each step beside the thing it produces: the audit’s written page, the first AI employee running, the whole office’s board. Less reading than today; the windows carry the rest.', OptionC],
]

export default function HowItWorksOptions() {
  const [runs, setRuns] = useState({ a: 0, b: 0, c: 0 })
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Opt]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
            <button
              type="button"
              onClick={() => setRuns((r) => ({ ...r, [id]: r[id] + 1 }))}
              className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10"
            >
              Run again
            </button>
          </div>
          <div key={runs[id]}><Opt /></div>
        </div>
      ))}
    </main>
  )
}
