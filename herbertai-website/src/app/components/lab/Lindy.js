'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SANS } from './content'

// Composed like lindy.ai: warm off-white, a floating nav, a centred headline
// with one amber phrase, the tools the office already uses drifting either
// side, and a chat-style product window where the AI employee answers.

const TOOLS = [
  ['Xero', 6, 30], ['Gmail', 12, 48], ['MYOB', 17, 66], ['Outlook', 22, 84], ['Excel', 3, 58],
  ['AroFlo', 88, 30], ['Cliniko', 83, 48], ['ServiceM8', 78, 66], ['PropertyMe', 72, 84], ['Dropbox', 93, 58],
]
const CHANNELS = ['tax-season', 'quotes', 'front-desk', 'maintenance']

export default function Lindy() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 6), 1600)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="bg-[#FCF9F8] text-[#0f172a] pb-16 overflow-x-hidden" style={{ fontFamily: SANS }}>
      <style>{`@keyframes lab-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }`}</style>
      <div className="px-4 pt-4">
        <nav className="mx-auto max-w-[1180px] flex items-center justify-between rounded-xl border border-black/10 bg-white/80 px-5 py-3 shadow-sm">
          <div className="font-bold text-[22px] tracking-[-0.03em]">Herbert AI</div>
          <div className="hidden md:flex gap-7 text-[15px] font-medium"><span>How it works</span><span>Industries</span><span>The work</span><span>Pricing</span><span>About</span></div>
          <span className="bg-[#2563FF] text-white rounded-lg px-4 py-2.5 text-[15px] font-semibold">Free AI audit</span>
        </nav>
      </div>

      <section className="relative text-center px-6 pt-28 pb-16">
        {TOOLS.map(([name, x, y], n) => (
          <span key={name} className="hidden lg:grid absolute place-items-center w-[62px] h-[44px] rounded-xl bg-white border border-black/5 shadow-[0_6px_18px_rgba(0,0,0,.06)] text-[11px] font-semibold text-[#475569]" style={{ left: `${x}%`, top: `${y}%`, animation: `lab-float ${5 + (n % 4)}s ease-in-out ${n * 0.3}s infinite` }}>{name}</span>
        ))}
        <h1 className="mx-auto max-w-[15ch] font-bold tracking-[-0.035em] leading-[1.05]" style={{ fontSize: 'clamp(40px, 5.6vw, 80px)' }}>
          The AI employee that takes{' '}
          <span style={{ background: 'linear-gradient(90deg,#d97706,#eab308)', WebkitBackgroundClip: 'text', color: 'transparent' }}>the job everyone hates</span>.
        </h1>
        <p className="mx-auto mt-7 max-w-[46ch] text-[20px] leading-[1.45]">Herbert AI builds it on the tools your office already uses, in 14 days, and your team approves everything that goes out.</p>
        <span className="inline-block mt-8 bg-[#2563FF] text-white rounded-xl px-6 py-4 text-[16px] font-semibold">Book a free AI audit</span>
        <div className="mt-4 text-[14px] text-[#334155]">Free &middot; 45 minutes &middot; a written page back</div>
      </section>

      <section className="px-4 md:px-6">
        <div className="mx-auto max-w-[1110px] grid md:grid-cols-[300px_1fr] rounded-xl border border-black/10 bg-white shadow-[0_30px_80px_rgba(15,23,42,.10)] overflow-hidden min-h-[440px]">
          <aside className="hidden md:block bg-[#F8F8F8] border-r border-black/10 p-6">
            <div className="font-bold text-[17px]">Henderson &amp; Co</div>
            <div className="mt-6 text-[13px] text-[#64748b]">Channels</div>
            {CHANNELS.map((c, n) => (
              <div key={c} className={`mt-1 rounded-md px-3 py-2 text-[15px] ${n === 0 ? 'bg-[#E9E9EC] font-semibold' : 'text-[#475569]'}`}># {c}</div>
            ))}
          </aside>
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-black/10 pb-4"><b className="text-[17px]"># tax-season</b><span className="text-[13px] text-[#64748b]">5 members</span></div>
            <div className="mt-6 flex gap-3">
              <span className="w-9 h-9 rounded-md bg-[#CBD5E1] grid place-items-center font-bold text-[13px]">SK</span>
              <div><div className="text-[15px]"><b>Sarah</b> <span className="text-[12px] text-[#64748b]">8:47 AM</span></div><div className="text-[15px]"><span className="text-[#2563FF]">@chaser</span> who still owes us documents for June?</div></div>
            </div>
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex gap-3">
                <span className="w-9 h-9 rounded-md bg-[#FDE9B8] grid place-items-center font-bold text-[13px]">H</span>
                <div className="flex-1">
                  <div className="text-[15px]"><b>Document chaser</b> <span className="text-[10px] bg-[#E2E8F0] rounded px-1.5 py-0.5 font-semibold">APP</span> <span className="text-[12px] text-[#64748b]">8:47 AM</span></div>
                  <div className="text-[12px] text-[#64748b]">3 steps &middot; done in 18s</div>
                  {step >= 2 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-[15px]">38 of 150 clients are still missing something. Reminders are drafted for each one, only for what is missing. Want me to send them?</motion.div>}
                  {step >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 flex items-center gap-3 rounded-lg border border-black/10 p-3 max-w-[460px]">
                      <span className="rounded-md bg-[#FDE9B8] px-3 py-2 text-[12px] font-bold">38</span>
                      <div><div className="text-[14px] font-semibold">Missing-documents list.csv</div><div className="text-[12px] text-[#64748b]">38 clients &middot; 61 items</div></div>
                    </motion.div>
                  )}
                  {step >= 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex flex-wrap gap-2">
                      <span className="bg-[#0F7B5F] text-white rounded-md px-4 py-2 text-[14px] font-semibold">Send the reminders</span>
                      <span className="border border-black/15 rounded-md px-4 py-2 text-[14px] font-semibold">Open the list</span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
