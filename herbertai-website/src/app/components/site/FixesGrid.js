'use client'
import { Avatar, EMPLOYEES } from '../runs/employees'
import { GLYPH } from '../runs/os/shared'

// /pilot section 4, What it fixes (Will, 3 Nov 2026: "C"): the six office jobs
// everyone hates, each under the example AI employee that takes it, from the
// roster the homepage and the Operating Systems screens already use. The
// pairings are examples and the note under the grid says so; a client names
// their own AI employee at kickoff. The six sentences are the 27 Oct details
// pass's plain sentences. Static: /pilot does not move.

const glyphOf = (name) => EMPLOYEES.find((e) => e.name === name).glyph

const JOBS = [
  [GLYPH.penny, 'Penny', 'Requests', 'Chasing', 'Follow-ups for documents, invoices and approvals go out on time without anyone writing them.'],
  [GLYPH.nora, 'Nora', 'Intake', 'Re-typing', 'Details entered once reach every system that needs them, instead of being keyed in three times.'],
  [GLYPH.max, 'Max', 'Sales Coordinator', 'The same emails', 'Quotes, confirmations and updates are drafted for you to check and send.'],
  [glyphOf('Rita'), 'Rita', 'Rebookings', 'Booking admin', 'Confirmations, reschedules and reminders are handled without anyone touching the calendar.'],
  [GLYPH.emma, 'Emma', 'Maintenance', 'Handovers', 'Job details that live in one person’s head or inbox go on one screen the whole team can see.'],
  [glyphOf('Vic'), 'Vic', 'Margins', 'The Monday report', 'The numbers someone compiles by hand every week are compiled for you.'],
]

export const NOTE = 'Example AI employees, one for each job. Yours are named at kickoff.'

// The props exist so the design lab can draw this section's details from the
// same code; the page uses the defaults. line: 'full' (avatar, name and job
// above the title), 'name' (avatar and name), 'inline' (the avatar beside the
// title, no line). phone: 'stack' (six cards one under another), 'two' (two
// across, no sentence), 'short' (one column, no sentence).
export default function FixesGrid({ line = 'full', note = NOTE, phone = 'stack' }) {
  const grid = phone === 'two' ? 'grid-cols-2 gap-x-5 sm:gap-x-12' : 'gap-x-12'
  const body = phone === 'stack' ? '' : 'hidden sm:block'
  return (
    <>
      <div className={`mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-y-8 ${grid}`}>
        {JOBS.map(([g, name, job, title, text]) => (
          <div key={title} className="min-w-0 border-t border-[#111]/15 pt-4">
            {line !== 'inline' && (
              <div className="flex items-center gap-3">
                <Avatar glyph={g} size={28} mode="still" />
                <p className="text-[14px] text-[#555] whitespace-nowrap"><b className="text-[#111]">{name}</b>{line === 'full' && <span className={phone === 'two' ? 'hidden sm:inline' : ''}> · {job}</span>}</p>
              </div>
            )}
            <h3 className={`${line === 'inline' ? 'flex items-center gap-3' : 'mt-3'} ${phone === 'two' ? 'text-[17px] sm:text-[20px]' : 'text-[20px]'} font-semibold tracking-[-0.015em]`}>
              {line === 'inline' && <Avatar glyph={g} size={28} mode="still" />}
              {title}
            </h3>
            <p className={`mt-1.5 text-[16px] leading-[1.5] text-[#555] text-pretty ${body}`}>{text}</p>
          </div>
        ))}
      </div>
      {note && <p className="mt-8 text-[12.5px] text-[#777] text-pretty">{note}</p>}
    </>
  )
}
