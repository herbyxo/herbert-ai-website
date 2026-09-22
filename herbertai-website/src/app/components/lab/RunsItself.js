'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SANS, MONO } from './content'

// Concept: "Runs itself". The site is the running system, not a description
// of it. The signature device is the board: a stream of the employees' work
// completing while you read. Colour only ever means state: green is done,
// amber is waiting on a person, grey is queued. Motion is only ever a job
// finishing. Numbers are set in tabular figures because numbers are the point.
// The locked manifesto fits this concept as written.

const ROWS = [
  { t: '08:32', who: 'Document chaser', what: 'Checklists sent to 150 clients', s: 'done' },
  { t: '08:40', who: 'Document chaser', what: '38 reminders drafted, only for what is missing', s: 'waiting', wait: 'Waiting on Sarah', then: 'Approved by Sarah, sent' },
  { t: '08:47', who: 'Quote follow-up', what: 'Quote 1042 followed up, second time', s: 'done' },
  { t: '08:51', who: 'Front desk assistant', what: 'Intake form sent to a new patient', s: 'done' },
  { t: '08:55', who: 'Maintenance coordinator', what: 'Landlord approval requested, Unit 4', s: 'waiting', wait: 'Waiting on the landlord', then: 'Approved, plumber booked for Tuesday' },
  { t: '09:02', who: 'Document chaser', what: 'Bank statement matched to the Nguyen file', s: 'done' },
  { t: '09:06', who: 'Quote follow-up', what: 'Quote 1038 flagged: worth a call', s: 'done' },
]

const COLOUR = { done: '#12B76A', waiting: '#F5A623', queued: '#C4C4C4' }

function Light({ s }) {
  return <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: COLOUR[s], boxShadow: s === 'done' ? '0 0 0 3px rgba(18,183,106,.18)' : 'none' }} />
}

export default function RunsItself() {
  const [n, setN] = useState(0)
  const [resolved, setResolved] = useState({})
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setInterval(() => {
      setN((v) => (v >= ROWS.length ? v : reduce ? ROWS.length : v + 1))
      if (reduce) setResolved(Object.fromEntries(ROWS.map((_, i) => [i, true])))
    }, reduce ? 50 : 1500)
    return () => clearInterval(t)
  }, [])
  useEffect(() => {
    const timers = ROWS.map((r, i) => (r.s === 'waiting' && i < n && !resolved[i]) ? setTimeout(() => setResolved((o) => ({ ...o, [i]: true })), 3200) : null)
    return () => timers.forEach((x) => x && clearTimeout(x))
  }, [n, resolved])

  const shown = ROWS.slice(0, n)
  const done = shown.filter((r, i) => r.s === 'done' || resolved[i]).length
  const waiting = shown.filter((r, i) => r.s === 'waiting' && !resolved[i]).length

  return (
    <main className="bg-[#FAFAF8] text-[#111] pb-20" style={{ fontFamily: SANS }}>
      <div className="mx-auto max-w-[1200px] px-6 py-5 flex items-center justify-between">
        <div className="font-semibold text-[18px] tracking-[-0.02em]">Herbert AI</div>
        <div className="hidden md:flex gap-8 text-[14px]"><span>How it works</span><span>Industries</span><span>The systems</span><span>What it costs</span><span>About</span></div>
        <span className="bg-[#111] text-white rounded-full px-5 py-2.5 text-[14px] font-medium">Book a free AI audit</span>
      </div>

      <section className="mx-auto max-w-[1200px] px-6 pt-12 md:pt-20 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-end">
        <div>
          <h1 className="font-bold tracking-[-0.045em] leading-[0.95]" style={{ fontSize: 'clamp(52px, 6.6vw, 96px)' }}>Less admin.<br />More money.<br />Built to run itself.</h1>
          <p className="mt-7 text-[19px] leading-[1.45] max-w-[40ch] text-[#333]">Custom software and AI for small businesses, built in Adelaide. One AI employee for the job everyone hates, running every day, with a person approving what goes out.</p>
          <div className="mt-8 flex items-center gap-5">
            <span className="bg-[#111] text-white rounded-full px-6 py-3.5 text-[16px] font-medium">Book a free AI audit</span>
            <span className="text-[15px] text-[#555]">45 minutes, a written page back</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px]" style={{ fontFamily: MONO }}>
            <span>Today &middot; an example office</span>
            <span className="flex items-center gap-5 tabular-nums">
              <span className="flex items-center gap-2"><Light s="done" /> done <b className="font-semibold">{done}</b></span>
              <span className="flex items-center gap-2"><Light s="waiting" /> waiting on a person <b className="font-semibold">{waiting}</b></span>
            </span>
          </div>
          <div className="min-h-[380px] px-2 py-2">
            <AnimatePresence initial={false}>
              {shown.map((r, i) => {
                const s = r.s === 'waiting' && !resolved[i] ? 'waiting' : 'done'
                return (
                  <motion.div key={r.t + r.who} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid grid-cols-[52px_1fr_auto] md:grid-cols-[56px_170px_1fr_auto] items-center gap-3 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[14px]">
                    <span className="text-[12px] text-[#777] tabular-nums" style={{ fontFamily: MONO }}>{r.t}</span>
                    <span className="hidden md:block font-medium">{r.who}</span>
                    <span className="leading-[1.35]"><span className="md:hidden font-medium">{r.who}: </span>{r.what}</span>
                    <motion.span key={s} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[12px] whitespace-nowrap" style={{ color: s === 'done' ? '#0E8F53' : '#9A6300' }}>
                      <Light s={s} />{s === 'waiting' ? r.wait : (r.then || 'Done')}
                    </motion.span>
                  </motion.div>
                )
              })}
            </AnimatePresence>
            {n < ROWS.length && (
              <div className="grid grid-cols-[52px_1fr] md:grid-cols-[56px_1fr] gap-3 px-3 py-3 text-[14px] text-[#B8B8B8]"><span style={{ fontFamily: MONO }} className="text-[12px]">&middot;&middot;:&middot;&middot;</span><span className="flex items-center gap-2"><Light s="queued" /> next job queued</span></div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pt-20">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[#777]" style={{ fontFamily: MONO }}>How the rest of the site follows from the idea</div>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#111]/12 bg-white p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#777]" style={{ fontFamily: MONO }}>Industries page</div>
            <div className="mt-2 font-semibold text-[18px]">One board per office</div>
            <ul className="mt-4 text-[14px] space-y-2.5">
              {[['Accounting firm', 'done'], ['Clinic', 'done'], ['Trades office', 'waiting'], ['Property manager', 'done']].map(([k, s]) => (
                <li key={k} className="flex items-center justify-between border-b border-[#111]/8 pb-2"><span>{k}</span><Light s={s} /></li>
              ))}
            </ul>
            <p className="mt-3 text-[13px] text-[#555] leading-[1.4]">Each industry page is that office&rsquo;s board running, not a description.</p>
          </div>
          <div className="rounded-xl border border-[#111]/12 bg-white p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#777]" style={{ fontFamily: MONO }}>Pricing page</div>
            <div className="mt-2 font-semibold text-[18px]">What it costs to run</div>
            <table className="mt-4 w-full text-[14px] tabular-nums">
              <tbody>
                {[['The audit', '$0', 'done'], ['First employee', '$3,500', 'done'], ['Keeping it running', '$200 / mo', 'done'], ['The whole office', 'from $25,000', 'queued'], ['Care', 'from $1,000 / mo', 'queued']].map(([k, v, s]) => (
                  <tr key={k} className="border-b border-[#111]/8"><td className="py-2 flex items-center gap-2"><Light s={s} />{k}</td><td className="py-2 text-right" style={{ fontFamily: MONO }}>{v}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[13px] text-[#555] leading-[1.4]">Rungs read as steps that complete in order. The lights are where you are.</p>
          </div>
          <div className="rounded-xl border border-[#111]/12 bg-white p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#777]" style={{ fontFamily: MONO }}>The systems page</div>
            <div className="mt-2 font-semibold text-[18px]">The instruments</div>
            <div className="mt-4 space-y-2">
              <div className="rounded-lg border border-[#111]/10 overflow-hidden"><img src="/work/property-dashboard.png" alt="" className="w-full h-[74px] object-cover object-top" /><div className="px-2 py-1.5 text-[11px] flex items-center gap-2" style={{ fontFamily: MONO }}><Light s="done" /> live, click in</div></div>
              <div className="rounded-lg border border-[#111]/10 overflow-hidden"><img src="/work/accountants-demo.png" alt="" className="w-full h-[74px] object-cover object-top" /><div className="px-2 py-1.5 text-[11px] flex items-center gap-2" style={{ fontFamily: MONO }}><Light s="done" /> demo, plays itself</div></div>
            </div>
          </div>
          <div className="rounded-xl border border-[#111]/12 bg-white p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#777]" style={{ fontFamily: MONO }}>About page</div>
            <div className="mt-2 font-semibold text-[18px]">Who keeps it running</div>
            <p className="mt-4 text-[14px] leading-[1.45] text-[#333]">One person, Adelaide. The person you meet in the audit is the person who builds it and the person who answers when a light goes amber.</p>
            <div className="mt-4 flex items-center gap-2 text-[12px]" style={{ fontFamily: MONO }}><Light s="done" /> Will Herbert &middot; on the job</div>
          </div>
        </div>
        <p className="mt-6 text-[13px] text-[#777] max-w-[80ch] leading-[1.5]">Rules the concept sets: colour only ever means state, green done, amber waiting on a person, grey queued. Motion is only ever a job finishing. Nothing is claimed; things happen. All figures on the board are an example office and say so.</p>
      </section>
    </main>
  )
}
