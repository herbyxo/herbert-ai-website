'use client'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STATE, useInView } from './board'
import { useSteps } from './steps'

// The marketing engine drawn as the marketing dashboard it is (Will, 13 Oct
// 2026: "for marketing engine maybe youd show some marketing dashboard, based
// off of some research into what some marketing tools look like"). The layout
// follows what marketing dashboards converge on: a short row of headline
// numbers (five to seven at most read best), spend and enquiries over time, and
// a campaigns table with spend, enquiries and cost per enquiry, the way Google
// Ads and its reporting tools set them out. Beside it, the engine's own morning:
// what it did and what it is holding for the owner. The steps run once:
// the audit pauses a campaign once approved, the Meta draft goes live once
// approved, and an enquiry lands. Colour is state only; the chart is ink and
// grey. Every figure is an example business and says so; no dates, so nothing
// on it ages.

const SPEND = [52, 61, 58, 66, 70, 49, 44, 63, 67, 72, 60, 55, 48, 51, 64, 69, 73, 58, 62, 47, 45, 66, 71, 74, 59, 63, 57, 49, 68, 62]
const LEADS = [1, 2, 1, 2, 3, 0, 1, 2, 2, 3, 1, 1, 0, 1, 2, 2, 3, 2, 1, 0, 1, 2, 2, 3, 1, 2, 1, 1, 2, 0]

const FEED = [
  { t: '06:00', who: 'Daily audit', what: 'Gas fitting: $302 for 4 enquiries, $76 each', at: 1, done: 2, wait: 'Waiting on the owner', then: 'Approved, campaign paused' },
  { t: '06:01', who: 'Google ads', what: 'Hot water ad paused: lowest result in its group', at: 3 },
  { t: '06:03', who: 'Google ads', what: 'New headline written to test against the winner', at: 4 },
  { t: '06:10', who: 'Landing pages', what: 'Page built for the new blocked drains ad group', at: 5 },
  { t: '06:20', who: 'Meta', what: 'Winter heating campaign drafted at $15 a day', at: 6, done: 7, wait: 'Waiting on the owner', then: 'Approved, now live' },
  { t: '08:42', who: 'Leads', what: 'Enquiry from the hot water ad, logged with its source', at: 8 },
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

function Chart({ leads }) {
  const W = 600, H = 150, pad = 8
  const bw = W / SPEND.length
  const sy = (v) => H - (v / 80) * (H - pad)
  const ly = (v) => H - (v / 4) * (H - pad * 3) - pad
  const pts = leads.map((v, i) => `${i * bw + bw / 2},${ly(v)}`).join(' ')
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Ad spend and enquiries per day over the last 30 days">
        {SPEND.map((v, i) => (
          <rect key={i} x={i * bw + bw * 0.2} y={sy(v)} width={bw * 0.6} height={H - sy(v)} fill="#E7E7E3" rx="1.5" />
        ))}
        <polyline points={pts} fill="none" stroke="#111" strokeWidth="1.6" strokeLinejoin="round" />
        {leads.map((v, i) => (
          <circle key={i} cx={i * bw + bw / 2} cy={ly(v)} r={i === leads.length - 1 ? 3.2 : 2} fill="#111" />
        ))}
      </svg>
      <div className="mt-2 flex items-center justify-between text-[12px] text-[#777]">
        <span>30 days ago</span>
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-[2px] bg-[#E7E7E3]" /> Ad spend</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-[2px] bg-[#111]" /> Enquiries</span>
        </span>
        <span>Today</span>
      </div>
    </div>
  )
}

export default function EngineDashboard() {
  const ref = useRef(null)
  const n = useSteps(useInView(ref, 0.25), TOTAL)
  const stateOf = (f) => (n < f.at ? null : f.done && n < f.done ? 'waiting' : 'done')
  const feed = FEED.filter((f) => stateOf(f))
  const leadIn = n >= 8
  const leads = LEADS.map((v, i) => (i === LEADS.length - 1 && leadIn ? v + 1 : v))
  const enquiries = 45 + (leadIn ? 1 : 0)
  const spend = 1842

  const gas = n >= 2 ? ['queued', 'Paused by the engine'] : ['done', 'Live']
  const winter = n < 6 ? null : n < 7 ? ['waiting', 'Waiting on the owner'] : ['done', 'Live']
  const campaigns = [
    { name: 'Hot water repairs', ch: 'Google', st: ['done', 'Live'], spend: 612, enq: 17 + (leadIn ? 1 : 0) },
    { name: 'Blocked drains', ch: 'Google', st: ['done', 'Live'], spend: 420, enq: 13 },
    { name: 'Emergency plumber', ch: 'Google', st: ['done', 'Live'], spend: 508, enq: 11 },
    { name: 'Gas fitting', ch: 'Google', st: gas, spend: 302, enq: 4 },
    ...(winter ? [{ name: 'Winter heating', ch: 'Meta', st: winter, spend: 0, enq: 0 }] : []),
  ]
  const waiting = feed.filter((f) => stateOf(f) === 'waiting').length

  return (
    <div
      ref={ref}
      role="group"
      aria-label="A marketing engine's dashboard for an example plumbing business"
      className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden"
    >
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
        <span>Marketing engine &middot; an example plumbing business</span>
        <span className="text-[#555]">Last 30 days</span>
      </div>

      <div className="p-4 md:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['Ad spend', money(spend), 'of a $2,000 budget'],
            ['Enquiries', String(enquiries), '+12 on the 30 days before'],
            ['Cost per enquiry', money(spend / enquiries), 'was $51'],
            ['Booked jobs', '19', 'from those enquiries'],
          ].map(([k, v, sub]) => (
            <div key={k} className="rounded-lg border border-[#111]/10 px-4 py-3.5">
              <p className="text-[12.5px] text-[#666]">{k}</p>
              <p className="mt-1 text-[26px] font-semibold tracking-[-0.02em] tabular-nums">{v}</p>
              <p className="mt-0.5 text-[12px] text-[#888]">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid lg:grid-cols-[1.5fr_1fr] gap-3 items-start">
          <div className="grid gap-3">
            <div className="rounded-lg border border-[#111]/10 px-4 pt-3.5 pb-3">
              <p className="text-[13px] font-medium mb-3">Spend and enquiries</p>
              <Chart leads={leads} />
            </div>
            <div className="rounded-lg border border-[#111]/10 overflow-x-auto">
              <table className="w-full min-w-[520px] text-[13px]">
                <thead>
                  <tr className="text-left text-[12px] text-[#777]">
                    <th className="font-medium px-4 py-2.5">Campaign</th>
                    <th className="font-medium px-3 py-2.5">Status</th>
                    <th className="font-medium px-3 py-2.5 text-right">Spend</th>
                    <th className="font-medium px-3 py-2.5 text-right">Enquiries</th>
                    <th className="font-medium px-4 py-2.5 text-right">Per enquiry</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.name} className="border-t border-[#111]/8">
                      <td className="px-4 py-2.5">
                        <span className="font-medium">{c.name}</span>
                        <span className="ml-2 text-[12px] text-[#888]">{c.ch}</span>
                      </td>
                      <td className="px-3 py-2.5"><Status s={c.st[0]}>{c.st[1]}</Status></td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{money(c.spend)}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{c.enq}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{c.enq ? money(c.spend / c.enq) : '–'}</td>
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
            <div className="min-h-[360px] px-1.5 py-1">
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
                      </div>
                      <p className="mt-0.5 text-[13px] leading-[1.4] text-[#333]">{f.what}</p>
                      <div className="mt-1"><Status s={s}>{s === 'waiting' ? f.wait : f.then || 'Done'}</Status></div>
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
