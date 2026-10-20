'use client'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STATE, useInView } from './board'
import { useSteps } from './steps'

// Herbert Reach as the whole marketing department, the full product as
// defined in code/marketing-engine/docs/REACH-DEFINITION.md, not only what is
// built today (Will, 19 Oct 2026: "we arent selling what we have built yet,
// we're selling the full product"). Will kept this layout over three redraws
// ("i like todays visual"), so it is the ads dashboard built up: every channel
// in one table judged by cost per booked job, and the AI employees' morning
// beside it. The steps run once in view: the researcher, a budget move, a new
// ad and landing page held for the owner then approved, a post, a review
// request, and an enquiry called back and booked. Colour is state only; the
// chart is ink and grey. Every figure belongs to an example business; no dates.
// EngineDashboard stays as the ads-only engine for the /work example page.

const SPEND = [52, 61, 58, 66, 70, 49, 44, 63, 67, 72, 60, 55, 48, 51, 64, 69, 73, 58, 62, 47, 45, 66, 71, 74, 59, 63, 57, 49, 68, 62]
const JOBS = [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 2, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 2, 1, 1, 2, 0]

const FEED = [
  { t: '06:00', who: 'Researcher', what: 'New competitor ad nearby: $99 hot water service', at: 1 },
  { t: '06:02', who: 'Analyst', what: 'Moved $10 a day from Google to Meta, where a job costs $91', at: 2 },
  { t: '06:05', who: 'Creative', what: 'Winter heating ad and its landing page, drafted', at: 3, done: 4, wait: 'Waiting on the owner', then: 'Approved, now live' },
  { t: '06:30', who: 'Social', what: 'Before and after post, blocked drain in Reynella', at: 5, then: 'Approved, goes out at 6pm' },
  { t: '07:15', who: 'Reviews', what: 'Review request sent after yesterday’s job in Seaford', at: 6 },
  { t: '08:42', who: 'Leads', what: 'Enquiry from the hot water ad, called back in 48 seconds', at: 7, done: 8, pre: 'Calling back', then: 'Booked, Thu 8:30am' },
]
const TOTAL = 8

const LABEL = { done: '#0E8F53', waiting: '#9A6300', queued: '#777' }

function Lamp({ s }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2 h-2 rounded-full shrink-0"
      style={{ background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

function Status({ s, children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[12px] leading-[1.3] whitespace-nowrap" style={{ color: LABEL[s] }}>
      <Lamp s={s} />
      {children}
    </span>
  )
}

const money = (v) => `$${Math.round(v).toLocaleString('en-AU')}`

function Chart({ jobs }) {
  const W = 600, H = 132, pad = 8
  const bw = W / SPEND.length
  const sy = (v) => H - (v / 80) * (H - pad)
  const jy = (v) => H - (v / 3) * (H - pad * 3) - pad
  const pts = jobs.map((v, i) => `${i * bw + bw / 2},${jy(v)}`).join(' ')
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Ad spend and booked jobs per day over the last 30 days">
        {SPEND.map((v, i) => (
          <rect key={i} x={i * bw + bw * 0.2} y={sy(v)} width={bw * 0.6} height={H - sy(v)} fill="#E7E7E3" rx="1.5" />
        ))}
        <polyline points={pts} fill="none" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
        {jobs.map((v, i) => (
          <circle key={i} cx={i * bw + bw / 2} cy={jy(v)} r={i === jobs.length - 1 ? 3.2 : 2} fill="#111" />
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-between text-[12px] text-[#777]">
        <span>30 days ago</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-[#E7E7E3]" /> Spend</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-[2px] bg-[#111]" /> Booked jobs</span>
        </span>
        <span>Today</span>
      </div>
    </div>
  )
}

export default function ReachDashboard({ name = 'Herbert Reach' }) {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), TOTAL)
  const stateOf = (f) => (n < f.at ? null : f.done && n < f.done ? (f.pre ? 'queued' : 'waiting') : 'done')
  const labelOf = (f, s) => (s === 'waiting' ? f.wait : s === 'queued' ? f.pre : f.then || 'Done')
  const feed = FEED.filter((f) => stateOf(f))
  const called = n >= 7
  const booked = n >= 8
  const jobsByDay = JOBS.map((v, i) => (i === JOBS.length - 1 && booked ? v + 1 : v))
  const spend = 1730
  const enquiries = 57 + (called ? 1 : 0)
  const jobs = 22 + (booked ? 1 : 0)

  const channels = [
    { name: 'Google ads', st: 'Live', spend: 1090, enq: 26 + (called ? 1 : 0), jobs: 10 + (booked ? 1 : 0) },
    { name: 'Meta ads', st: 'Live', spend: 640, enq: 19, jobs: 7 },
    { name: 'Google Business Profile', st: 'Live', spend: 0, enq: 7, jobs: 3 },
    { name: 'Social posts', st: '3 a week', spend: 0, enq: 2, jobs: 1 },
    { name: 'Email to past customers', st: 'Sent Tuesday', spend: 0, enq: 3, jobs: 1 },
  ]
  const waiting = feed.filter((f) => stateOf(f) === 'waiting').length

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Herbert Reach's dashboard for an example plumbing business"
      className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden"
    >
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
        <span>{name} &middot; an example plumbing business</span>
        <span className="text-[#555]">Last 30 days</span>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-4 gap-3">
          {[
            ['Spend, every channel', money(spend), 'of a $2,000 budget'],
            ['Enquiries', String(enquiries), 'every one called back'],
            ['Jobs booked', String(jobs), 'from those enquiries'],
            ['Cost per job', money(spend / jobs), 'was $112'],
          ].map(([k, v, sub]) => (
            <div key={k} className="rounded-lg border border-[#111]/10 px-4 py-3.5">
              <p className="text-[12.5px] text-[#666]">{k}</p>
              <p className="mt-1 text-[26px] font-semibold tracking-[-0.02em] tabular-nums">{v}</p>
              <p className="mt-0.5 text-[12px] text-[#888]">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-[1.5fr_1fr] gap-3 items-start">
          <div className="grid gap-3">
            <div className="rounded-lg border border-[#111]/10 px-4 pt-3.5 pb-3">
              <p className="text-[13px] font-medium mb-3">Spend and booked jobs</p>
              <Chart jobs={jobsByDay} />
            </div>
            <div className="rounded-lg border border-[#111]/10">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="text-left text-[12px] text-[#777]">
                    <th className="font-medium px-4 py-2.5">Channel</th>
                    <th className="font-medium px-3 py-2.5">Status</th>
                    <th className="font-medium px-3 py-2.5 text-right">Spend</th>
                    <th className="font-medium px-3 py-2.5 text-right">Enquiries</th>
                    <th className="font-medium px-3 py-2.5 text-right">Jobs</th>
                    <th className="font-medium px-4 py-2.5 text-right">Per job</th>
                  </tr>
                </thead>
                <tbody>
                  {channels.map((c) => (
                    <tr key={c.name} className="border-t border-[#111]/8">
                      <td className="px-4 py-2.5 font-medium">{c.name}</td>
                      <td className="px-3 py-2.5"><Status s="done">{c.st}</Status></td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{money(c.spend)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{c.enq}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{c.jobs}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{money(c.spend / c.jobs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border border-[#111]/10">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#111]/8">
              <p className="text-[13px] font-medium">This morning</p>
              <span className="text-[12px] text-[#777] tabular-nums">{waiting ? `${waiting} waiting on the owner` : `${feed.length} done`}</span>
            </div>
            <div className="min-h-[370px] px-1.5 py-1">
              <AnimatePresence initial={false}>
                {feed.map((f) => {
                  const s = stateOf(f)
                  return (
                    <motion.div
                      key={f.t}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-2.5 py-2.5 border-b border-[#111]/8 last:border-0"
                    >
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[11.5px] text-[#888] tabular-nums font-mono">{f.t}</span>
                        <span className="text-[13px] font-medium">{f.who}</span>
                        <span className="ml-auto"><Status s={s}>{labelOf(f, s)}</Status></span>
                      </div>
                      <p className="mt-0.5 text-[13px] leading-[1.4] text-[#333]">{f.what}</p>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
