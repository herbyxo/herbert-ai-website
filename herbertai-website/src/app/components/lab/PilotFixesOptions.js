'use client'
import { Avatar, EMPLOYEES } from '../runs/employees'
import { GLYPH } from '../runs/os/shared'
import { INDUSTRIES } from '../site/shared'

// /pilot section 4, What it fixes: today and two of the three options (3 Nov
// 2026); the third, the section removed, is drawn on the real page. Will (30
// Oct 2026): "section 4 isnt done". Its details pass ran on 27 Oct with no
// options step. Facts: today's six jobs; the industry pages' own lines
// (shared.js INDUSTRIES); the example roster's employees (employees.js, the
// Operating Systems screens). Static, as /pilot does not move.

const glyphOf = (n) => EMPLOYEES.find((e) => e.name === n).glyph

function Frame({ id, tag, note, children }) {
  return (
    <div data-opt={id}>
      <div className="bg-[#111] text-white px-6 lg:px-12 py-3 text-[13px] font-mono">
        <b>{tag}</b> <span className="text-white/60">{note}</span>
      </div>
      <section data-shot={id} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <p className="text-[16px] font-medium mb-4 text-[#555]">What it fixes</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch] text-balance" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The jobs everyone hates doing.
          </h2>
          {children}
        </div>
      </section>
    </div>
  )
}

const FIXES = [
  ['Chasing', 'Follow-ups for documents, invoices and approvals go out on time without anyone writing them.'],
  ['Re-typing', 'Details entered once reach every system that needs them, instead of being keyed in three times.'],
  ['The same emails', 'Quotes, confirmations and updates are drafted for you to check and send.'],
  ['Booking admin', 'Confirmations, reschedules and reminders are handled without anyone touching the calendar.'],
  ['Handovers', 'Job details that live in one person’s head or inbox go on one screen the whole team can see.'],
  ['The Monday report', 'The numbers someone compiles by hand every week are compiled for you.'],
]

function Today() {
  return (
    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
      {FIXES.map(([t, b]) => (
        <div key={t} className="border-t border-[#111]/15 pt-4">
          <h3 className="text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
          <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555]">{b}</p>
        </div>
      ))}
    </div>
  )
}

// B. The job each kind of office loses most to, in the industry pages' own words.
function ByIndustry() {
  return (
    <div className="mt-12 border-b border-[#111]/12">
      {INDUSTRIES.map((x) => (
        <div key={x.slug} className="grid md:grid-cols-[0.7fr_1.5fr_0.8fr] gap-x-10 gap-y-2 border-t border-[#111]/12 py-6 items-baseline">
          <h3 className="text-[20px] font-semibold tracking-[-0.015em]">{x.name}</h3>
          <p className="text-[16px] leading-[1.5] text-[#555]">{x.bottleneck}</p>
          <a href={`/industries/${x.slug}`} className="text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 md:text-right">
            {x.employee} <span aria-hidden>&rarr;</span>
          </a>
        </div>
      ))}
    </div>
  )
}

// C. Each job with the example AI employee that takes it.
const STAFF = [
  [GLYPH.penny, 'Penny', 'Requests'],
  [GLYPH.nora, 'Nora', 'Intake'],
  [GLYPH.max, 'Max', 'Sales Coordinator'],
  [glyphOf('Rita'), 'Rita', 'Rebookings'],
  [GLYPH.emma, 'Emma', 'Maintenance'],
  [glyphOf('Vic'), 'Vic', 'Margins'],
]

function WithEmployees() {
  return (
    <>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
        {FIXES.map(([t, b], i) => (
          <div key={t} className="border-t border-[#111]/15 pt-4">
            <div className="flex items-center gap-3">
              <Avatar glyph={STAFF[i][0]} size={28} mode="still" />
              <p className="text-[14px] text-[#555]"><b className="text-[#111]">{STAFF[i][1]}</b> · {STAFF[i][2]}</p>
            </div>
            <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
            <p className="mt-1.5 text-[16px] leading-[1.5] text-[#555]">{b}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[13px] text-[#777]">Example AI employees, one for each job. Yours are named at kickoff.</p>
    </>
  )
}

export default function PilotFixesOptions() {
  return (
    <main className="pb-24">
      <Frame id="today" tag="Today" note="six jobs, a name and a sentence each"><Today /></Frame>
      <Frame id="b" tag="B. By industry" note="the job each kind of office loses most to, in the industry pages' own words, each linking to its page"><ByIndustry /></Frame>
      <Frame id="c" tag="C. With the AI employee that takes it" note="the six jobs, each with an example AI employee from the roster"><WithEmployees /></Frame>
    </main>
  )
}
