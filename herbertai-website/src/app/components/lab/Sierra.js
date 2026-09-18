'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SANS, MONO } from './content'

// Composed like sierra.ai: a full-bleed photographic hero with two calm lines,
// a light pill button, and a live conversation playing in cards at bottom
// right. Sierra's hero is a video of a person. There is no such footage yet, so
// the ground here is a soft warm blur with the slot labelled.

const STEPS = 4

export default function Sierra() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (STEPS + 2)), 1700)
    return () => clearInterval(t)
  }, [])
  const card = 'rounded-2xl border border-white/20 bg-white/15 backdrop-blur-md px-4 py-3 text-[16px] leading-[1.45]'

  return (
    <main className="bg-white text-[#1b1b1b] pb-16" style={{ fontFamily: SANS }}>
      <div className="bg-[#2F5FB3] text-white text-center text-[14px] py-3 px-4">Free AI audits now booking for October. <u>How it works</u></div>
      <section className="relative overflow-hidden text-white" style={{ minHeight: 'min(780px, 92vh)', background: 'radial-gradient(60% 70% at 72% 30%, #c89a78 0%, rgba(200,154,120,0) 60%), radial-gradient(50% 60% at 30% 80%, #e9dcc6 0%, rgba(233,220,198,0) 65%), linear-gradient(135deg,#6b4632,#8a5a3c 45%,#b98c68)' }}>
        <nav className="flex items-center justify-between px-6 md:px-[11%] py-6">
          <div className="flex items-center gap-3 text-[20px] tracking-[0.12em] font-medium">HERBERT AI</div>
          <div className="hidden md:flex gap-9 text-[15px]"><span>How it works</span><span>Industries</span><span>The work</span><span>Pricing</span></div>
          <span className="rounded-full bg-black/35 px-5 py-2.5 text-[15px]">Free AI audit</span>
        </nav>
        <div className="px-6 md:px-[11%] pt-[9vh]">
          <h1 className="font-normal tracking-[-0.02em] leading-[1.12]" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>Less admin.<br />Built to run itself.</h1>
          <span className="inline-block mt-8 rounded-full bg-[#F4F1EC] text-[#1b1b1b] px-8 py-4 text-[16px]">Book a free AI audit</span>
        </div>
        <div className="absolute right-6 md:right-[11%] bottom-10 w-[min(340px,86vw)] flex flex-col gap-3">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="q" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 0.75, y: 0 }} exit={{ opacity: 0 }} className={card}>
                Did you get my payslips? What else do you need from me?
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div key="a" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={card}>
                <div className="text-[13px] opacity-80 mb-1">Document chaser</div>
                Got them, thanks. Two things left: your June bank statement and the rental summary.
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div key="w" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={card}>
                <div className="flex justify-between text-[13px] mb-2"><span>Reminder</span><span>Thu 9:00</span></div>
                <div className="bg-white text-[#1b1b1b] rounded-lg px-3 py-2 text-[13px] flex justify-between"><span>Approved by Sarah</span><span className="text-[#1a9b55]">&#10003;</span></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute left-6 md:left-[11%] bottom-6 text-[10px] uppercase tracking-[0.18em] opacity-60" style={{ fontFamily: MONO }}>Video slot: a real office at work</div>
      </section>

      <section className="px-6 md:px-[11%] py-24 text-center">
        <h2 className="font-normal tracking-[-0.01em]" style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}>Start with the job that costs you most.</h2>
        <p className="mt-3 text-[15px] text-[#555]">Custom software and AI for small businesses, built in Adelaide.</p>
        <div className="mt-12 grid md:grid-cols-3 gap-4 text-left text-white">
          {[
            ['A free AI audit', 'Forty five minutes, then a written page: the three jobs eating the most hours and which to hand over first.', 'linear-gradient(160deg,#3d6fb8,#2a9ad6)'],
            ['Your first AI employee', 'One job, live on your real data in 14 days. $3,500 fixed, or free if it is late.', 'linear-gradient(160deg,#8f5a8c,#c94f75)'],
            ['The system it runs in', 'Files, comms and follow-ups on one system your team works out of. From $25,000, scoped after the audit.', 'linear-gradient(160deg,#b0563a,#d0703f)'],
          ].map(([h, p, bg]) => (
            <div key={h} className="rounded-xl p-7 min-h-[300px] flex flex-col" style={{ background: bg }}>
              <h3 className="text-[22px]">{h}</h3>
              <p className="mt-auto text-[14.5px] leading-[1.5] opacity-95">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
