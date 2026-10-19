'use client'
import { motion } from 'framer-motion'
import { STATE } from './board'
import { useSteps } from './steps'
import { Dot } from './os/shared'
import { PhoneFrame } from './os/mobile'

// Herbert Reach on the owner's phone, shown in the Products band on phones in
// place of the laptop dashboard, by the same rule as Herbert OS: never a laptop
// screen shrunk to fit. The full product, matching ReachDashboard (19 Oct
// 2026: the band sells Herbert Reach as defined): the month across every
// channel judged by cost per job, the one new ad waiting on the owner, and
// what the AI employees did. Plays once: the ad waits, is approved and goes
// live, and a booked enquiry lands at the top.

const FEED = [
  ['Analyst', 'Moved $10 a day to Meta, where a job costs $91'],
  ['Social', 'Before and after post goes out at 6pm'],
  ['Reviews', 'Review request sent after yesterday’s job'],
  ['Researcher', 'New competitor ad nearby: $99 hot water'],
]
const AFTER = ['Leads', 'Hot water enquiry called back in 48 seconds, booked Thu 8:30am']

export default function ReachMobile({ play = false }) {
  const run = useSteps(play, 3, 900)
  const n = play ? run : 3
  const waiting = n >= 1 && n < 2
  const approved = n >= 2
  const rows = n >= 3 ? [AFTER, ...FEED.slice(0, 3)] : FEED
  return (
    <PhoneFrame onDark>
      <div className="px-5 pt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#777]">Herbert Reach · Plumbing</p>
        <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em] leading-tight">Morning, Dave</p>
        <p className="text-[12.5px] text-[#777]">The last 30 days, and what ran overnight.</p>
      </div>
      <div className="px-5 mt-4 grid grid-cols-3 gap-2">
        {[['$1,730', 'spent, every channel'], ['23', 'jobs booked'], ['$75', 'per job, was $112']].map(([v, k]) => (
          <div key={k} className="rounded-xl border border-[#111]/10 bg-white px-2.5 py-2">
            <p className="text-[17px] font-semibold tracking-[-0.02em] tabular-nums leading-none">{v}</p>
            <p className="mt-1 text-[10px] text-[#777] leading-tight">{k}</p>
          </div>
        ))}
      </div>
      <div className="px-5 mt-5">
        <p className="text-[12px] text-[#777] mb-2">Waiting on you <span className="tabular-nums">{approved ? '· nothing' : '· 1'}</span></p>
        <motion.div animate={approved ? { borderColor: STATE.done } : waiting ? { borderColor: STATE.waiting } : {}} className="rounded-2xl border border-[#111]/10 bg-white p-3.5">
          <div className="flex items-center gap-2.5">
            <Dot c={approved ? STATE.done : waiting ? STATE.waiting : '#111'} size={8} />
            <p className="text-[12.5px]"><b>Creative</b> <span className="text-[#777]">· new ad</span></p>
            <span className="ml-auto text-[10.5px] text-[#999]">6:05am</span>
          </div>
          <p className="mt-2 text-[13px] leading-[1.4] text-[#333]">Winter heating ad and its landing page, drafted at $15 a day. It goes live when you say yes.</p>
          <motion.div animate={approved && play ? { scale: [1, 0.96, 1] } : {}} className={`mt-3 rounded-xl text-center text-[13px] font-medium py-2.5 ${approved ? 'bg-[#E8F7EE] text-[#0E8F53]' : 'bg-[#111] text-white'}`}>
            {approved ? 'Approved · now live' : 'Approve'}
          </motion.div>
        </motion.div>
      </div>
      <div className="px-5 mt-5 flex-1 min-h-0">
        <p className="text-[12px] text-[#777] mb-1">Done for you</p>
        {rows.map(([who, text], i) => (
          <motion.div key={`${who}-${text}`} initial={play && i === 0 && n >= 3 ? { opacity: 0, y: -6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex items-center gap-2.5 py-2 border-t border-[#111]/8">
            <Dot c={i === 0 && n >= 3 ? STATE.done : '#111'} size={6} />
            <p className="text-[12px] leading-tight text-[#333] min-w-0"><b className="font-medium text-[#111]">{who}</b> · {text}</p>
          </motion.div>
        ))}
      </div>
      <div className="px-5 pb-5 pt-2 flex items-center text-[10.5px] text-[#999]">
        <span className="flex items-center gap-1.5"><Dot c={STATE.waiting} size={5} />You approve every new ad</span>
      </div>
    </PhoneFrame>
  )
}
