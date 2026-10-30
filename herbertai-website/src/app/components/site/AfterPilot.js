'use client'
import { Avatar, EMPLOYEES } from '../runs/employees'
import { GLYPH, Status } from '../runs/os/shared'

// /pilot section 5, After the pilot (Will, 30 Oct 2026: "B, dashboard"): the
// stages after the first AI employee, with their prices, beside the dashboard
// that employee ships in, the next ones queued in the same dashboard (Will's
// 29 Oct 2026 decision: every AI employee works inside one dashboard, and the
// dashboard that grows is the AI operating system). Facts: the pilot run sheet
// ("Days 14 to 30"), the engagement process, the one-pager ("After day 14",
// "After the first one"), the 16 Sep 2026 founding-client offer. The example
// practice and Penny's request are the homepage Finance screen's own. Static:
// /pilot does not move. The props exist so the design lab can draw this
// section's details from the same code; the page uses the defaults.

const Q = '’'

export const STAGE = {
  day14: ['Day 14', 'Your first AI employee', 'One card in your dashboard, live on your real data.', '$3,500 fixed'],
  day30: ['Day 30', 'Keep it running, or take it with you', `Kept on Herbert AI${Q}s accounts, or moved onto yours with a written guide.`, '$200 a month to keep it running'],
  os: ['Within 60 days', 'Your AI operating system', 'The next AI employees join the same dashboard, on your own accounts, scoped after the audit.', 'From $25,000, with the $3,500 taken off'],
  care: ['After the build', 'Kept running', 'Hosting, fixes, a set number of small changes and a monthly report.', 'From $1,000 a month'],
}

const glyphOf = (name) => EMPLOYEES.find((e) => e.name === name).glyph

export const QUEUED = [
  [GLYPH.nora, 'Nora', 'Intake', 'Reads each client' + Q + 's documents against last year as they arrive'],
  [glyphOf('Fern'), 'Fern', 'Scope', EMPLOYEES.find((e) => e.name === 'Fern').what],
  [glyphOf('Ray'), 'Ray', 'Promises', EMPLOYEES.find((e) => e.name === 'Ray').what],
]

export const FOOT = 'Support after the full build is from $1,000 a month. The first three clients who agree to a case study and a testimonial get 90 days of included care instead of 30.'

function Stages({ items }) {
  return items.map(([w, t, b, p]) => (
    <li key={t} className="border-t border-[#111]/12 py-4">
      <p className="text-[15px] font-medium text-[#777]">{w}</p>
      <h3 className="mt-1 text-[20px] font-semibold tracking-[-0.015em]">{t}</h3>
      <p className="mt-1 text-[16px] leading-[1.5] text-[#555]">{b}</p>
      <p className="mt-2 text-[15px] font-medium">{p}</p>
    </li>
  ))
}

function Live({ glyph, name, job, children }) {
  return (
    <div className="rounded-xl border border-[#111]/10 p-4">
      <div className="flex items-center gap-3">
        <Avatar glyph={glyph} size={30} mode="still" />
        <p className="text-[14px]"><b>{name}</b> <span className="text-[#777]">· {job}</span></p>
        <span className="ml-auto"><Status s="done">Live</Status></span>
      </div>
      {children}
    </div>
  )
}

export function Dashboard({ queued = QUEUED, jobs = false, twoLive = false }) {
  const rest = twoLive ? queued.slice(1) : queued
  return (
    <div className="min-w-0 rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555]">
        <span className="truncate"><span className="hidden sm:inline">Your dashboard · an example accounting practice</span><span className="sm:hidden">An example accounting practice</span></span>
        {!twoLive && <span className="shrink-0 hidden sm:inline">Day 14</span>}
      </div>
      <div className="p-4 sm:p-5 space-y-3">
        <Live glyph={GLYPH.penny} name="Penny" job="Requests">
          <p className="mt-3 text-[13.5px] leading-[1.45] text-[#333]">{`Mrs Nguyen${Q}s reply, read against last year: rental statement short April to June, dividends missing. Request drafted.`}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[13px]">
            <span className="rounded-[7px] bg-[#111] text-white px-2.5 sm:px-3 py-1.5">Approve and send</span>
            <span className="rounded-[7px] bg-[#111]/5 text-[#555] px-2.5 sm:px-3 py-1.5">Edit</span>
            <span className="rounded-[7px] bg-[#111]/5 text-[#555] px-2.5 sm:px-3 py-1.5">Skip</span>
          </div>
          <p className="mt-3 text-[12.5px] text-[#777]">9 reminders sent this week · 14 replies read</p>
        </Live>
        {twoLive && (
          <Live glyph={GLYPH.nora} name="Nora" job="Intake">
            <p className="mt-3 text-[13.5px] leading-[1.45] text-[#333]">B. Carter complete, moved to ready to prepare.</p>
          </Live>
        )}
        {rest.map(([g, n, j, line]) => (
          <div key={n} className="rounded-xl border border-dashed border-[#111]/15 px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="opacity-40"><Avatar glyph={g} size={22} mode="still" /></span>
              <div className="min-w-0">
                <p className="text-[13.5px] text-[#777] whitespace-nowrap"><b className="text-[#555]">{n}</b> · {j}</p>
                <span className="sm:hidden block mt-1"><Status s="queued" size={11.5}>On the roadmap</Status></span>
              </div>
              <span className="ml-auto hidden sm:inline"><Status s="queued">On the roadmap</Status></span>
            </div>
            {jobs && <p className="mt-2 text-[13px] leading-[1.45] text-[#777]">{line}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

// order: 'list' (the stages, then the dashboard, on phones), 'dash' (the
// dashboard first on phones), 'split' (on phones, the dashboard after the
// first stage). Laptops always put the stages beside the dashboard.
export default function AfterPilot({ stages = [STAGE.day14, STAGE.day30, STAGE.os], foot = FOOT, order = 'list', dash = {} }) {
  return (
    <>
      <div className="mt-12 grid lg:grid-cols-[0.8fr_1.2fr] gap-x-14 gap-y-10 items-start">
        <ol className={`min-w-0 ${order === 'dash' ? 'order-2 lg:order-none' : ''}`}>
          {order === 'split' ? (
            <>
              <Stages items={stages.slice(0, 1)} />
              <li className="lg:hidden pt-2 pb-6"><Dashboard {...dash} /></li>
              <Stages items={stages.slice(1)} />
            </>
          ) : (
            <Stages items={stages} />
          )}
        </ol>
        <div className={`min-w-0 ${order === 'split' ? 'hidden lg:block' : ''} ${order === 'dash' ? 'order-1 lg:order-none' : ''}`}>
          <Dashboard {...dash} />
        </div>
      </div>
      {foot && <p className="mt-10 pt-5 border-t border-[#111]/10 text-[15px] leading-[1.5] text-[#555] max-w-[78ch]">{foot}</p>}
    </>
  )
}
