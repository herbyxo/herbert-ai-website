'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SANS, MONO } from './content'

// Concept: "Now hiring". Herbert AI supplies staff, so the site is an
// employer's positions board turned around: the visitor is the employer and
// the AI employees are the candidates. The signature device is the position
// description, which every page reuses: industries are open positions,
// pricing is what it costs to employ, the audit works out which position to
// fill first, the work page is staff already placed. Colour has one job: the
// house green is a highlighter, marking the line on a form that matters.
// Motion has one job: paperwork completing. Fields fill in, a stamp lands.

const FIELDS = [
  ['Position', 'Document chaser'],
  ['Employer', 'Your accounting firm'],
  ['Reports to', 'Your office manager'],
  ['Hours', 'Every day, including tax season'],
  ['Start', '14 days from signing'],
  ['Pay', '$3,500 once, then $200 a month'],
  ['Duties', 'Sends each client their checklist. Reminds them about only what is missing. Matches what comes back to the file.'],
  ['Approvals', 'A person on your team, before anything goes out'],
]

function useTyped(fields, speed = 18) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const total = fields.reduce((a, [, v]) => a + v.length + 1, 0)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setInterval(() => setN((v) => (v >= total + 40 ? v : reduce ? total + 41 : v + 1)), speed)
    return () => clearInterval(t)
  }, [fields, speed])
  const out = []
  let left = n
  for (const [k, v] of fields) {
    const take = Math.max(0, Math.min(v.length, left))
    out.push([k, v.slice(0, take), take === v.length])
    left -= v.length + 1
  }
  return { out, done: left > 20 }
}

function Mark({ children }) {
  return <span style={{ background: 'linear-gradient(transparent 12%, rgba(0,255,136,.62) 12%, rgba(0,255,136,.62) 88%, transparent 88%)', padding: '0 .08em' }}>{children}</span>
}

export default function NowHiring() {
  const { out, done } = useTyped(FIELDS)
  return (
    <main className="bg-[#F7F6F2] text-[#141414] pb-20" style={{ fontFamily: SANS }}>
      <div className="border-b border-[#141414]/15 bg-[#F7F6F2]/90">
        <div className="mx-auto max-w-[1200px] px-6 py-4 flex items-center justify-between">
          <div className="font-semibold text-[18px] tracking-[-0.02em]">Herbert AI</div>
          <div className="hidden md:flex gap-8 text-[14px]"><span>Positions</span><span>How hiring works</span><span>Already placed</span><span>What it costs</span><span>About</span></div>
          <span className="bg-[#141414] text-[#F7F6F2] rounded px-4 py-2 text-[14px] font-medium">Book the free audit</span>
        </div>
      </div>

      <section className="mx-auto max-w-[1200px] px-6 pt-16 md:pt-24 pb-12 grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-16 items-start">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>Positions vacant &middot; Adelaide &middot; September 2026</div>
          <h1 className="mt-6 font-bold tracking-[-0.035em] leading-[1.02]" style={{ fontSize: 'clamp(40px, 5.2vw, 72px)' }}>
            Now hiring: one AI employee for <Mark>the job everyone in the office hates.</Mark>
          </h1>
          <p className="mt-7 text-[19px] leading-[1.45] max-w-[46ch] text-[#333]">A free 45 minute audit works out which position to fill first, in your own numbers. The first employee starts within 14 days, or it costs nothing.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="bg-[#141414] text-[#F7F6F2] rounded px-6 py-3.5 text-[16px] font-medium">Book the free audit</span>
            <span className="text-[16px] underline underline-offset-4 decoration-[#141414]/30">See the open positions &rarr;</span>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-5 max-w-[480px] text-[14px]">
            {[['Placed so far', 'A brokerage, a barbershop, a property office'], ['Start date', '14 days, or free'], ['Employer of record', 'You. It is your software.'], ['Supervision', 'A person approves what goes out']].map(([k, v]) => (
              <div key={k}><div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>{k}</div><div className="mt-1 leading-[1.35]">{v}</div></div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative bg-white border border-[#141414] rounded-[4px] shadow-[0_24px_60px_-30px_rgba(0,0,0,.35)] p-7 md:p-9">
            <div className="flex items-baseline justify-between border-b border-[#141414] pb-3">
              <div className="text-[11px] uppercase tracking-[0.2em]" style={{ fontFamily: MONO }}>Position description</div>
              <div className="text-[11px] tracking-[0.16em]" style={{ fontFamily: MONO }}>PD-001</div>
            </div>
            <dl className="mt-2">
              {out.map(([k, v, full]) => (
                <div key={k} className="grid grid-cols-[112px_1fr] gap-4 py-3.5 border-b border-dashed border-[#141414]/25">
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b] pt-1" style={{ fontFamily: MONO }}>{k}</dt>
                  <dd className={`text-[16.5px] leading-[1.4] ${k === 'Pay' && full ? '' : ''}`}>
                    {k === 'Pay' && full ? <Mark>{v}</Mark> : v}
                    {!full && v.length > 0 && <span className="inline-block w-[2px] h-[1em] bg-[#141414] align-middle ml-0.5 animate-pulse" />}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-center justify-between text-[12px] text-[#6b6b6b]" style={{ fontFamily: MONO }}>
              <span>Signed: ____________________</span><span>Herbert AI</span>
            </div>
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
                animate={{ opacity: 1, scale: 1, rotate: -9 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="absolute -top-5 right-6 md:-right-4 px-4 py-2 border-[3px] border-[#00A85A] text-[#00A85A] rounded-[6px] text-[13px] tracking-[0.2em] uppercase font-bold"
                style={{ fontFamily: MONO, boxShadow: 'inset 0 0 0 2px #fff, inset 0 0 0 3px #00A85A' }}
              >
                Live in 14 days or free
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pt-12">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>How the rest of the site follows from the idea</div>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#141414]/20 rounded-[4px] p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>Industries page</div>
            <div className="mt-2 font-semibold text-[18px]">Open positions</div>
            <ul className="mt-4 text-[14px] space-y-2.5">
              {[['Document chaser', 'Accounting firms'], ['Front desk assistant', 'Clinics'], ['Quote follow-up', 'Trades offices'], ['Maintenance coordinator', 'Property managers']].map(([r, w]) => (
                <li key={r} className="flex justify-between gap-3 border-b border-dashed border-[#141414]/20 pb-2"><span>{r}</span><span className="text-[#6b6b6b]">{w}</span></li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#141414]/20 rounded-[4px] p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>Pricing page</div>
            <div className="mt-2 font-semibold text-[18px]">What it costs to employ</div>
            <table className="mt-4 w-full text-[14px]">
              <tbody>
                {[['The audit', '$0'], ['First employee', '$3,500 once'], ['Keeping it on', '$200 a month'], ['The whole office', 'from $25,000'], ['Ongoing care', 'from $1,000 a month']].map(([k, v], i) => (
                  <tr key={k} className="border-b border-dashed border-[#141414]/20"><td className="py-2">{k}</td><td className="py-2 text-right" style={{ fontFamily: MONO }}>{i === 1 ? <Mark>{v}</Mark> : v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white border border-[#141414]/20 rounded-[4px] p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>The work page</div>
            <div className="mt-2 font-semibold text-[18px]">Already placed</div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="border border-[#141414]/20 p-1.5 bg-[#F7F6F2]"><img src="/work/property-dashboard.png" alt="" className="w-full h-[70px] object-cover object-top" /><div className="mt-1 text-[10px]" style={{ fontFamily: MONO }}>Maintenance, at work</div></div>
              <div className="border border-[#141414]/20 p-1.5 bg-[#F7F6F2]"><img src="/work/accountants-demo.png" alt="" className="w-full h-[70px] object-cover object-top" /><div className="mt-1 text-[10px]" style={{ fontFamily: MONO }}>Chaser, at work</div></div>
            </div>
            <p className="mt-3 text-[13px] text-[#555] leading-[1.4]">Each system shown as a staff member on the job, not a case study.</p>
          </div>
          <div className="bg-white border border-[#141414]/20 rounded-[4px] p-5">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#6b6b6b]" style={{ fontFamily: MONO }}>The audit</div>
            <div className="mt-2 font-semibold text-[18px]">Which position to fill first</div>
            <p className="mt-4 text-[14px] leading-[1.45] text-[#333]">Forty five minutes, then a written page: the three jobs eating the most hours, what each costs a year in your figures, and the first position to fill.</p>
            <div className="mt-4 text-[12px] border border-dashed border-[#141414]/40 p-3 leading-[1.5]" style={{ fontFamily: MONO }}>Job: chasing documents<br />Hours: 8 a week<br />Cost: <Mark>$19,760 a year</Mark><br />Fill first: Document chaser</div>
          </div>
        </div>
        <p className="mt-6 text-[13px] text-[#6b6b6b] max-w-[80ch] leading-[1.5]">Rules the concept sets: green is a highlighter and nothing else. Motion is paperwork completing and nothing else. Pictures are the employees at work. It says &ldquo;takes the job&rdquo;, never &ldquo;replaces the person&rdquo;.</p>
      </section>
    </main>
  )
}
