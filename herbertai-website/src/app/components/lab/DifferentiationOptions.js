'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { STATE, useInView } from '../runs/board'
import { useSteps } from '../runs/steps'
import { Avatar } from '../runs/employees'
import { EMMA, KATE, ROSE, Frame } from './IndustryOptions'
import { OSSection, HubWhole, LEO, OWEN } from './OperatingSystemOptions'

// Design pass, Operating Systems: saying the difference (15 Oct 2026). Will:
// "at the moment it just looks like im selling a product that these
// businesses already use". The research (industries-2026-10-13, section 4 of
// each) is that the system of record is taken and cheap and the work between
// the systems is open: the shared inbox, the whiteboard, the spreadsheet, the
// person's memory. Three ways to say it on the section, Property first:
// A say it on the screen we have (the record named and kept, what is gone
// named, the heading and the list naming the gap); B make the motion the
// difference (the manager's own list for the day, draining to one decision);
// C lead with what is replaced (the desk: the record kept, the inbox, the
// whiteboard and the spreadsheet collapsing into one screen). Every name and
// figure is made up. Goes with the lab.

const H = 520
const INK = '#111'
const Q = '’'

function Dot({ c, size = 7 }) {
  return <span aria-hidden className="inline-block rounded-full shrink-0" style={{ width: size, height: size, background: c }} />
}

const GAP = {
  property: 'The work between PropertyMe and your inbox',
  trades: 'The office in front of ServiceM8',
  health: 'Beside Cliniko: the waitlist, recalls and funding',
  hospitality: 'The functions office beside the booking system',
  finance: 'The season board beside Xero',
}

/* ─── B: the manager's list, draining to one decision ──────── */

// [the item in the manager's words, who took it, glyph, when, step]; step 0 is the one decision
const LIST = [
  ['Hot water at 12 Elm St, find a plumber tonight', 'Emma', EMMA, '11:43pm', 1],
  ['Tell the tenant at 12 Elm what is happening', 'Emma', EMMA, '11:43pm', 1],
  ['Get a quote under the $500 limit for 12 Elm', 'Emma', EMMA, '6:58am', 2],
  ['Book the plumber for 12 Elm', null, null, '', 0],
  ['Chase 8 Sturt St, 15 days behind', 'Rose', ROSE, '7:30am', 3],
  ['Reminders to the 9 behind on rent', 'Rose', ROSE, '7:30am', 3],
  ['Pull comparables for the 14 Elm St rent review', 'Kate', KATE, '7:10am', 4],
  ['Draft the 14 Elm St notice', 'Kate', KATE, '7:10am', 4],
  ['Reply to the 4 enquiries on 22 Park Ave', 'Leo', LEO, '8:30am', 5],
  ['Book inspection slots for 22 Park Ave', 'Leo', LEO, '8:30am', 5],
  [`Entry notices for next week${Q}s routines`, 'Owen', OWEN, '9:00am', 6],
  ['Write up the 5 Rose Tce inspection', 'Owen', OWEN, '9:15am', 6],
  ['Log the dripping tap from 5 Rose Tce', 'Owen', OWEN, '9:24am', 7],
  [`Match the plumber${Q}s invoice to the quote`, 'Emma', EMMA, '10:40am', 8],
]
const TEAM_B = [['Emma', EMMA], ['Rose', ROSE], ['Kate', KATE], ['Leo', LEO], ['Owen', OWEN]]

function TodayList() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 9, 700)
  const done = LIST.filter((x) => x[4] > 0 && n >= x[4]).length
  const approved = n >= 9
  const count = (who) => LIST.filter((x) => x[1] === who && n >= x[4]).length
  return (
    <div ref={ref}>
      <Frame bar="Tuesday · an example property agency" right="PropertyMe stays the record">
        <div className="grid grid-cols-[1fr_440px]" style={{ height: H - 42 }}>
          <div className="px-6 py-4 border-r border-[#111]/10">
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-[14px] font-semibold">Jess{Q}s list for today <span className="ml-2 text-[12px] font-normal text-[#777]">written Monday 5:40pm</span></p>
              <p className="text-[12px] text-[#777] tabular-nums">{14 - done - (approved ? 1 : 0)} left</p>
            </div>
            <div>
              {LIST.map(([text, who, glyph, time, at], i) => {
                const isDecision = at === 0
                const off = isDecision ? approved : n >= at
                const pending = isDecision && n >= 2 && !approved
                return (
                  <div key={i} className="grid grid-cols-[18px_1fr_150px] gap-3 items-center h-[29px] border-t border-[#111]/8 text-[12.5px]">
                    <span className={`w-[13px] h-[13px] rounded-[3px] border ${off ? 'bg-[#111] border-[#111]' : pending ? 'border-[#F5A623]' : 'border-[#111]/30'}`} style={off ? { boxShadow: 'inset 0 0 0 2px #fff' } : undefined} />
                    <span className={`truncate ${off ? 'line-through text-[#999]' : pending ? 'text-[#111] font-medium' : 'text-[#111]'}`}>{text}</span>
                    <span className="flex items-center gap-1.5 text-[11px] text-[#777] whitespace-nowrap">
                      {off && !isDecision && <><Avatar glyph={glyph} size={13} mode="done" /><span><b className="font-medium text-[#333]">{who}</b> · {time}</span></>}
                      {isDecision && approved && <><Dot c={STATE.done} size={6} /><span><b className="font-medium text-[#333]">Jess</b> · 7:05am, one tap</span></>}
                      {pending && <><Dot c={STATE.waiting} size={6} /><span>waiting on Jess</span></>}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="px-5 py-4 flex flex-col">
            <p className="text-[12px] text-[#777] mb-2">Done by</p>
            <div className="grid grid-cols-5 gap-2">
              {TEAM_B.map(([who, glyph]) => (
                <div key={who} className="rounded-lg border border-[#111]/10 px-2 py-2 text-center">
                  <Avatar glyph={glyph} size={24} mode={count(who) ? 'done' : n > 0 ? 'scan' : 'still'} />
                  <p className="mt-1 text-[11px] font-medium">{who}</p>
                  <p className="text-[14px] font-semibold tabular-nums leading-tight">{count(who)}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12px] text-[#777] mb-2">For Jess</p>
            {n >= 2 ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0, borderColor: approved ? STATE.done : STATE.waiting }} className="rounded-xl border border-[#111]/10 p-3.5">
                <div className="flex items-center gap-2.5">
                  <Avatar glyph={EMMA} size={30} mode={approved ? 'done' : 'wait'} />
                  <p className="text-[12.5px]"><b>Emma</b> <span className="text-[#777]">· Maintenance · 7:00am</span></p>
                </div>
                <p className="mt-2 text-[12.5px] text-[#333]">Book the plumber for 12 Elm St at $380? Inside the landlord{Q}s $500 limit, 8:30 this morning.</p>
                <motion.div animate={approved ? { scale: [1, 0.96, 1] } : {}} className={`mt-2.5 rounded-[7px] text-center text-[12px] py-1.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
                  {approved ? 'Approved by Jess · 7:05am' : 'Approve'}
                </motion.div>
              </motion.div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#111]/15 p-5 text-center text-[12px] text-[#999]">Nothing yet.</div>
            )}
            <div className="mt-auto pt-3 border-t border-[#111]/10 text-[12px] text-[#333]">
              <p><b className="tabular-nums">{done}</b> of 14 done by the AI employees · <b className="tabular-nums">{approved ? 1 : 0}</b> decision for Jess</p>
              <p className="mt-1 text-[#777]">Jess{Q}s time on the list today: {approved ? 'one minute' : 'none yet'}. Example figures.</p>
            </div>
          </div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── C: the desk, the record kept and the rest collapsing ─── */

function Win({ title, tag, gone, kept, children, dim }) {
  return (
    <motion.div animate={{ opacity: dim ? 0.35 : 1 }} className="rounded-lg border border-[#111]/12 bg-white overflow-hidden flex flex-col" style={{ height: 196, borderColor: kept ? STATE.done : undefined }}>
      <div className="flex items-center gap-2 px-3 h-[26px] border-b border-[#111]/10 bg-[#F6F6F3]">
        <span className="flex gap-1">{[0, 1, 2].map((i) => <span key={i} className="w-[7px] h-[7px] rounded-full bg-[#111]/15" />)}</span>
        <span className="text-[11px] font-medium text-[#333] truncate">{title}</span>
        {tag && <span className={`ml-auto text-[9.5px] font-mono uppercase tracking-[0.1em] rounded-full px-2 py-[1px] ${kept ? 'bg-[#E8F7EE] text-[#0E8F53]' : gone ? 'bg-[#111] text-white' : 'bg-[#111]/8 text-[#555]'}`}>{tag}</span>}
      </div>
      <div className="flex-1 p-3 text-[11px] text-[#333] overflow-hidden">{children}</div>
    </motion.div>
  )
}

function Desk() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), 5, 900)
  return (
    <div ref={ref}>
      <Frame bar="The desk · an example property agency" right="what stays, what goes">
        <div className="relative px-5 pt-4" style={{ height: H - 42 }}>
          <div className="grid grid-cols-4 gap-4">
            <Win title="PropertyMe" tag={n >= 4 ? 'Kept · the record' : 'the record'} kept={n >= 4}>
              <div className="grid gap-[5px]">
                {[['Tenancies', '212'], ['Rent received this week', '$118,400'], ['Trust ledger', 'balanced'], ['Owners', '164'], ['Inspections due', '12']].map(([k, v]) => (
                  <p key={k} className="flex justify-between border-b border-[#111]/6 pb-[3px]"><span className="text-[#777]">{k}</span><span className="tabular-nums">{v}</span></p>
                ))}
              </div>
            </Win>
            <Win title="info@ inbox, 42 unread" tag={n >= 1 ? 'Gone' : 'the queue'} gone={n >= 1} dim={n >= 1}>
              <div className="grid gap-[5px]">
                {['Re: hot water 12 Elm St', 'Quote attached, 3 Rose Tce', 'Rent? 8 Sturt St', 'Enquiry: 22 Park Ave', 'Fwd: smoke alarm invoice', 'Re: Re: keys', 'Application, 22 Park Ave'].map((t) => (
                  <p key={t} className="truncate border-b border-[#111]/6 pb-[3px]"><b className="font-medium">{t}</b></p>
                ))}
              </div>
            </Win>
            <Win title="The whiteboard" tag={n >= 2 ? 'Gone' : 'Monday'} gone={n >= 2} dim={n >= 2}>
              <div className="grid grid-cols-2 gap-2">
                {['plumber 12 Elm??', 'chase 8 Sturt', '14 Elm review due', '22 Park enquiries x4', 'Rose Tce report', 'invoice #1182?'].map((t, i) => (
                  <p key={t} className="rounded-[3px] px-2 py-2 text-[10.5px] leading-tight" style={{ background: i % 2 ? '#EFEFEB' : '#F6F6F3', transform: `rotate(${(i % 3) - 1}deg)` }}>{t}</p>
                ))}
              </div>
            </Win>
            <Win title="maintenance.xlsx" tag={n >= 3 ? 'Gone' : 'last saved Fri'} gone={n >= 3} dim={n >= 3}>
              <div className="grid grid-cols-[1fr_52px_56px] text-[10px] font-mono">
                {[['Address', 'Quote', 'Status'], ['12 Elm St', '?', 'urgent'], ['3 Rose Tce', '640', 'waiting'], ['7 Park Ave', '220', 'booked'], ['21 Osmond', '?', 'quoting'], ['40 Magill', '1,180', 'done'], ['9 Beulah', '310', 'done']].map((r, i) => r.map((c, j) => (
                  <span key={`${i}-${j}`} className={`border border-[#111]/8 px-1 py-[2px] truncate ${i === 0 ? 'bg-[#F6F6F3] font-semibold' : ''}`}>{c}</span>
                )))}
              </div>
            </Win>
          </div>
          <svg className="absolute pointer-events-none" style={{ left: 20, top: 212, width: 1144, height: 30 }} aria-hidden>
            <line x1={137} y1={0} x2={137} y2={30} stroke={INK} strokeOpacity={0.12} strokeWidth={2} />
            {n >= 4 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1={137} y1={0} x2={137} y2={30} stroke={STATE.done} strokeWidth={2} />}
          </svg>
          <motion.div animate={{ borderColor: n >= 5 ? INK : 'rgba(17,17,17,.12)' }} className="mt-[30px] rounded-xl border bg-white px-5 py-3.5" style={{ height: 196 }}>
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-semibold">One screen: the hub <span className="ml-2 text-[11.5px] font-normal text-[#777]">reads and writes PropertyMe</span></p>
              <p className="text-[12px] text-[#777] tabular-nums">{n >= 5 ? '13 done by the AI employees · 1 for Jess' : 'Tuesday 7:00am'}</p>
            </div>
            <div className="mt-3 grid grid-cols-[1fr_1fr_1fr] gap-3">
              {[['Emma', 'Maintenance', EMMA, 'Hot water, 12 Elm St. Plumber $380, inside the limit. Book 8:30am?', n >= 5 ? 'Approved by Jess · 7:05am' : 'Waiting on Jess'], ['Rose', 'Arrears', ROSE, '8 Sturt St, 15 days behind. Breach notice drafted.', n >= 5 ? 'Edited by Jess · sent' : 'Waiting on Jess'], ['Kate', 'Renewals', KATE, '14 Elm St review: $520 to $545, three comparables.', n >= 5 ? 'Approved · notice sent' : 'Waiting on Jess']].map(([who, job, glyph, what, st]) => (
                <div key={who} className="rounded-lg border border-[#111]/10 px-3 py-2.5 grid grid-cols-[28px_1fr] gap-x-2.5 items-start">
                  <Avatar glyph={glyph} size={28} mode={n >= 5 ? 'done' : n >= 1 ? 'wait' : 'still'} />
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#777]"><b className="text-[#111]">{who}</b> · {job}</p>
                    <p className="text-[11.5px] leading-[1.35] text-[#111]">{what}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-[10.5px]" style={{ color: n >= 5 ? '#0E8F53' : '#9A6300' }}><Dot c={n >= 5 ? STATE.done : STATE.waiting} size={5} />{st}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-[#777]">The inbox, the whiteboard and the spreadsheet were the office{Q}s memory. The hub is, and it does the work.</p>
          </motion.div>
        </div>
      </Frame>
    </div>
  )
}

/* ─── the three, on the section ────────────────────────────── */

const OPTIONS = [
  ['a', 'A. Say it on the screen', 'The hub as picked, with the record named and kept in the frame, what is gone named, the heading and the list naming the gap.', () => <HubWhole record />, 'You keep your software. This is where the work gets done.', 'Reads and writes PropertyMe. Replaces the shared inbox as the work queue, the whiteboard and the maintenance spreadsheet.'],
  ['b', 'B. The motion is the difference', 'The manager’s own list for the day, in her words, draining to one decision as the employees take the rest.', TodayList, 'Your software stays. The day runs itself.', 'Jess’s Tuesday list, 14 items. Thirteen done by the AI employees, one tap from her.'],
  ['c', 'C. Lead with what is replaced', 'The desk: the record kept, the inbox, the whiteboard and the spreadsheet going, one screen underneath that reads and writes the record.', Desk, 'Your software stays. The inbox, the whiteboard and the spreadsheet go.', 'PropertyMe kept. The shared inbox, the whiteboard and the maintenance spreadsheet replaced by one screen that does the work.'],
]

export default function DifferentiationOptions() {
  const [runs, setRuns] = useState({ a: 0, b: 0, c: 0 })
  return (
    <main className="bg-[#FAFAF8] pb-16">
      {OPTIONS.map(([id, name, note, Visual, heading, caption]) => (
        <div key={id} data-opt={id}>
          <div className="sticky top-0 z-10 bg-[#111] text-white px-6 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
            <b className="text-[15px]">{name}</b>
            <span className="opacity-70">{note}</span>
            <button type="button" onClick={() => setRuns((r) => ({ ...r, [id]: r[id] + 1 }))} className="ml-auto rounded-[8px] border border-white/30 px-3 py-1 hover:bg-white/10">
              Run again
            </button>
          </div>
          <div key={runs[id]}><OSSection Visual={Visual} activeId="property" heading={heading} lines={GAP} caption={caption} /></div>
        </div>
      ))}
    </main>
  )
}
