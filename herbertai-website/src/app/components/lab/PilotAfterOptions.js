'use client'
import { Avatar, EMPLOYEES } from '../runs/employees'
import { GLYPH, Status } from '../runs/os/shared'

// /pilot section 5, After the pilot: today and three options (30 Oct 2026).
// Facts from the pilot run sheet (business/sales/pilot-build-runsheet.md, "Days
// 14 to 30"), the engagement process ("After 30 days the client picks one") and
// the one-pager prospects see (business/team/onboarding/markdown/
// first-ai-employee.md, "After day 14", "After the first one"); the dashboard
// from Will's 29 Oct 2026 decision (every AI employee works inside one
// dashboard, a second employee is a second card, the dashboard that grows is
// the AI operating system); the founding-client offer from the 16 Sep 2026
// identity decisions. Drawn in the /pilot section frame with its own classes.
// Static: /pilot does not move (CHARTER.md, "Settled: /pilot").

const Q = '’'

function Frame({ id, tag, note, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">
        <b>{tag}</b> <span className="text-white/60">{note}</span>
      </div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">After the pilot</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            One job first. Then the system.
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

function Card({ t, b, price }) {
  return (
    <div className="border-t border-[#111]/15 pt-4 flex flex-col">
      <h3 className="text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
      <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555]">{b}</p>
      {price && <p className="mt-auto pt-5 text-[15px] font-medium text-[#111]">{price}</p>}
    </div>
  )
}

function Foot({ children }) {
  return <p className="mt-10 pt-5 border-t border-[#111]/10 text-[15px] leading-[1.5] text-[#555] max-w-[78ch]">{children}</p>
}

const TODAY = [
  ['Your AI operating system', 'Each AI employee after the first is added to the same dashboard, and the dashboard grown to run the whole office is the AI operating system. It puts your files, comms, follow-ups and reporting on one system your team works out of every day, and your business owns it. Scoped after the audit, from $25,000, with the pilot’s $3,500 taken off.'],
  ['Keep it running', 'A retainer from $1,000 a month covers hosting, fixes, a set number of small changes, and a monthly report on what the system handled and one improvement shipped. Month to month, and nothing switches off without being handed over to you first.'],
  ['The first three', 'The first three pilot clients who agree to a case study and a testimonial get 90 days of included care instead of 30, at the same price.'],
]

function Today() {
  return (
    <div className="mt-12 grid md:grid-cols-3 gap-x-12 gap-y-8">
      {TODAY.map(([t, b]) => (
        <div key={t} className="border-t border-[#111]/15 pt-4">
          <h3 className="text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
          <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555]">{b}</p>
        </div>
      ))}
    </div>
  )
}

// A. Day 30's three choices, as the run sheet and the one-pager give them.
function OptionA() {
  return (
    <>
      <p className="mt-12 text-[16px] font-medium text-[#777]">At day 30, you pick one</p>
      <div className="mt-4 grid md:grid-cols-3 gap-x-12 gap-y-8">
        <Card t="Keep it running" b="Hosting, fixing anything that breaks, and normal AI usage. Heavier usage is billed at cost, and you hear about it first." price="$200 a month" />
        <Card t="Take it with you" b="It is moved onto your own accounts with a written guide to how it works." />
        <Card t="Go ahead with the full build" b={`Your AI operating system: the next AI employees in the same dashboard, on your own accounts, scoped after the audit. Support after it is from $1,000 a month.`} price="From $25,000, with the $3,500 taken off within 60 days" />
      </div>
      <Foot>
        A reminder comes a week before day 30. With no choice made, it is paused and your data is sent to you. The first three clients who agree to a case study and a testimonial get 90 days of included care instead of 30.
      </Foot>
    </>
  )
}

// B. The dashboard the first AI employee ships in, with the next ones queued in it.
const NEXT = [
  [GLYPH.nora, 'Nora', 'Intake'],
  [EMPLOYEES.find((e) => e.name === 'Fern').glyph, 'Fern', 'Scope'],
  [EMPLOYEES.find((e) => e.name === 'Ray').glyph, 'Ray', 'Promises'],
]

function Dashboard() {
  return (
    <div className="min-w-0 rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555]">
        <span className="truncate">Your dashboard · an example accounting practice</span>
        <span className="shrink-0">Day 14</span>
      </div>
      <div className="p-4 sm:p-5 space-y-3">
        <div className="rounded-xl border border-[#111]/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar glyph={GLYPH.penny} size={30} mode="still" />
            <p className="text-[14px]"><b>Penny</b> <span className="text-[#777]">· Requests</span></p>
            <span className="ml-auto"><Status s="done">Live</Status></span>
          </div>
          <p className="mt-3 text-[13.5px] leading-[1.45] text-[#333]">{`Mrs Nguyen${Q}s reply, read against last year: rental statement short April to June, dividends missing. Request drafted.`}</p>
          <div className="mt-3 flex gap-2 text-[13px]">
            <span className="rounded-[7px] bg-[#111] text-white px-3 py-1.5">Approve and send</span>
            <span className="rounded-[7px] bg-[#111]/5 text-[#555] px-3 py-1.5">Edit</span>
            <span className="rounded-[7px] bg-[#111]/5 text-[#555] px-3 py-1.5">Skip</span>
          </div>
          <p className="mt-3 text-[12.5px] text-[#777]">9 reminders sent this week · 14 replies read</p>
        </div>
        {NEXT.map(([g, n, j]) => (
          <div key={n} className="rounded-xl border border-dashed border-[#111]/15 px-4 py-3 flex items-center gap-3">
            <span className="opacity-40"><Avatar glyph={g} size={22} mode="still" /></span>
            <p className="text-[13.5px] text-[#777]"><b className="text-[#555]">{n}</b> · {j}</p>
            <span className="ml-auto"><Status s="queued">On the roadmap</Status></span>
          </div>
        ))}
      </div>
    </div>
  )
}

const STAGES = [
  ['Day 14', 'Your first AI employee', 'One card in your dashboard, live on your real data.', '$3,500 fixed'],
  ['Day 30', 'Keep it running, or take it with you', 'Kept on Herbert AI’s accounts, or moved onto yours with a written guide.', '$200 a month to keep it running'],
  ['Within 60 days', 'Your AI operating system', 'The next AI employees join the same dashboard, on your own accounts, scoped after the audit.', 'From $25,000, with the $3,500 taken off'],
]

function OptionB() {
  return (
    <>
      <div className="mt-12 grid lg:grid-cols-[0.8fr_1.2fr] gap-x-14 gap-y-10 items-start">
        <ol className="min-w-0">
          {STAGES.map(([w, t, b, p]) => (
            <li key={t} className="border-t border-[#111]/12 py-4">
              <p className="text-[15px] font-medium text-[#777]">{w}</p>
              <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
              <p className="mt-1 text-[16px] leading-[1.5] text-[#555]">{b}</p>
              <p className="mt-2 text-[15px] font-medium">{p}</p>
            </li>
          ))}
        </ol>
        <Dashboard />
      </div>
      <Foot>
        Support after the full build is from $1,000 a month. The first three clients who agree to a case study and a testimonial get 90 days of included care instead of 30.
      </Foot>
    </>
  )
}

// C. Section 3's line, carried on past day 14.
const STOPS = [
  { when: 'Day 30', title: 'Your pick', facts: ['Keep it running for $200 a month', 'Take it with you onto your own accounts', 'Go ahead with the full build'] },
  { when: 'Within 60 days', title: 'Your AI operating system', facts: ['The next AI employees in the same dashboard', 'Running on your own accounts', 'Scoped after the audit'], price: 'From $25,000, with the $3,500 taken off.' },
  { when: 'After the build', title: 'Kept running', facts: ['Hosting, fixes and a set number of small changes', 'A monthly report on what it handled', 'Month to month'], price: 'From $1,000 a month.' },
]

function Facts({ facts }) {
  return (
    <ul>
      {facts.map((f) => (
        <li key={f} className="text-[17px] leading-[1.45] text-[#444] py-2 border-t border-[#111]/8">{f}</li>
      ))}
    </ul>
  )
}

function OptionC() {
  return (
    <>
      <ol className="lg:hidden mt-12">
        {STOPS.map((st) => (
          <li key={st.title} className="group relative min-w-0 pl-9 pb-9 last:pb-0">
            <span aria-hidden className="absolute left-[5px] top-2 bottom-0 w-[2px] bg-[#111] group-last:hidden" />
            <span aria-hidden className="absolute left-0 top-[3px] w-3 h-3 rounded-full bg-[#111]" />
            <p className="text-[16px] font-medium text-[#777] leading-[1.2] mb-2">{st.when}</p>
            <h3 className="text-[22px] font-semibold tracking-[-0.02em] mb-2.5">{st.title}</h3>
            <Facts facts={st.facts} />
            {st.price && <p className="mt-4 text-[15px] font-medium text-[#111]">{st.price}</p>}
          </li>
        ))}
      </ol>
      <ol className="hidden lg:grid mt-14 grid-cols-3 grid-rows-[auto_auto_1fr]">
        {STOPS.map((st, i) => (
          <li key={st.title} className="grid grid-rows-subgrid row-span-3 min-w-0">
            <p className="self-end pr-7 pb-5 text-[16px] font-medium text-[#777] leading-[1.2]">{st.when}</p>
            <div aria-hidden className="relative h-3 flex items-center">
              <span className="shrink-0 w-3 h-3 rounded-full bg-[#111]" />
              {i < STOPS.length - 1 && <span className="flex-1 h-[2px] bg-[#111]" />}
            </div>
            <div className="min-w-0 flex flex-col pt-4 pr-7">
              <h3 className="text-[24px] font-semibold tracking-[-0.02em] mb-2.5">{st.title}</h3>
              <Facts facts={st.facts} />
              {st.price && <p className="mt-auto pt-6 text-[15px] font-medium text-[#111]">{st.price}</p>}
            </div>
          </li>
        ))}
      </ol>
      <Foot>
        With no choice made by day 30, it is paused and your data is sent to you. The first three clients who agree to a case study and a testimonial get 90 days of included care instead of 30.
      </Foot>
    </>
  )
}

export default function PilotAfterOptions() {
  return (
    <main className="pb-24">
      <Frame id="today" tag="Today" note="three cards; Keep it running reads as a $1,000 a month retainer straight after the pilot"><Today /></Frame>
      <Frame id="a" tag="A. Day 30, three choices" note="what happens at day 30, as the run sheet gives it; the full build carries the rest"><OptionA /></Frame>
      <Frame id="b" tag="B. The dashboard grows" note="the first AI employee as one card, the next ones queued in the same dashboard"><OptionB /></Frame>
      <Frame id="c" tag="C. The line goes on" note="section 3's timeline carried on past day 14"><OptionC /></Frame>
    </main>
  )
}
