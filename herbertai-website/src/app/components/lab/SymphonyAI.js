'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SANS } from './content'

// Composed like symphonyai.com: announcement bar, dark nav with a blue pill,
// a centred headline whose last word swaps, a lit object under it, a stat
// bento on black, then one block per industry with the screen framed in colour.

const WORDS = ['accountants', 'allied health', 'trades offices', 'property managers']

export default function SymphonyAI() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2400)
    return () => clearInterval(t)
  }, [])

  return (
    <main className="bg-black text-white pb-16" style={{ fontFamily: SANS }}>
      <style>{`
        @keyframes lab-rail { 0%,100% { opacity:.55 } 50% { opacity:1 } }
        @keyframes lab-orb { 0%,100% { box-shadow:0 0 60px 18px rgba(120,170,255,.45) } 50% { box-shadow:0 0 90px 34px rgba(120,170,255,.75) } }
        .lab-rail i { animation: lab-rail 3.2s ease-in-out infinite }
      `}</style>

      <div className="text-center text-[14px] md:text-[15px] px-4 py-3 font-medium" style={{ background: 'linear-gradient(90deg,#8A2BE2,#B04CFF 60%,#F06AF0)' }}>
        <b className="font-bold">Free AI audits now booking for October.</b> Forty five minutes, a written page back.
        <span className="ml-4 font-bold underline underline-offset-4">How it works</span>
      </div>

      <nav className="flex items-center justify-between px-6 md:px-20 py-5 bg-[#1A1A1A]">
        <div className="flex items-center gap-3 font-bold text-[22px] tracking-[-0.02em]">
          <span className="w-10 h-5 rounded" style={{ background: 'linear-gradient(90deg,#FFB600,#0074E8 50%,#A933FB)' }} />
          Herbert AI
        </div>
        <div className="hidden md:flex gap-11 text-[17px] font-medium">
          <span>Industries</span><span>How it works</span><span>The work</span><span>Pricing</span>
        </div>
        <span className="bg-[#0074E8] rounded-full px-6 py-3 text-[15px] font-semibold">Book a free audit</span>
      </nav>

      <section className="relative overflow-hidden" style={{ height: 'min(860px, 100vh)', minHeight: 640, background: 'radial-gradient(60% 50% at 50% 72%, #0b1f4d 0%, #000 62%)' }}>
        <div className="absolute inset-x-0 top-[22%] text-center px-4">
          <div className="font-medium tracking-[-0.02em] leading-[1.15]" style={{ fontSize: 'clamp(30px, 4.6vw, 66px)' }}>
            Our software knows{' '}
            <span className="relative inline-block align-bottom overflow-hidden rounded-[10px] bg-[#0074E8] px-4" style={{ height: '1.2em', minWidth: '7ch' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={WORDS[i]}
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  {WORDS[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </div>

        <div className="absolute left-1/2 top-[44%] w-14 h-14 -translate-x-1/2 rounded-full" style={{ background: 'radial-gradient(circle at 40% 40%, #fff, #9cc5ff 40%, #2f7be8 70%)', animation: 'lab-orb 3.6s ease-in-out infinite' }} />
        <div className="absolute left-1/2 top-[47%] w-1 -translate-x-1/2" style={{ height: '46%', background: 'linear-gradient(#fff, rgba(255,255,255,0))' }} />
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2" style={{ width: 900, height: 520, perspective: 900 }}>
          {['l', 'r'].map((side) => (
            <div
              key={side}
              className="lab-rail absolute top-0 flex flex-col gap-[14px]"
              style={{ width: 150, [side === 'l' ? 'left' : 'right']: 250, transformOrigin: '50% 0', transform: `rotateX(58deg) rotateZ(${side === 'l' ? 14 : -14}deg)` }}
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <i key={n} className="block h-[74px] rounded-lg" style={{ background: 'linear-gradient(135deg,#8fc4ff,#1e6fe0 55%,#0b3fa8)', boxShadow: '0 10px 40px rgba(30,111,224,.45)', animationDelay: `${n * 0.35}s` }} />
              ))}
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-[9%] text-center px-4">
          <div className="font-semibold tracking-[-0.02em]" style={{ fontSize: 'clamp(24px, 3vw, 44px)' }}>AI employees for the office you actually run</div>
          <div className="mt-5 text-[17px] opacity-90">Explore more</div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-3 p-4 md:p-10">
        <div className="min-h-[400px] p-7 flex flex-col bg-[#0074E8]">
          <div className="font-medium tracking-[-0.04em] leading-[.95]" style={{ fontSize: 'clamp(72px, 8vw, 120px)' }}>$3,500</div>
          <div className="text-[26px] font-medium leading-[1.2] mt-2 max-w-[14ch]">One AI employee, live on your real data in 14 days</div>
          <div className="mt-auto font-bold text-[18px]">Learn more &gt;</div>
        </div>
        <div className="min-h-[400px] flex flex-col bg-[#111] relative overflow-hidden">
          <img src="/work/accountants-demo.png" alt="" className="w-full h-[58%] object-cover object-top opacity-90" />
          <div className="p-7 mt-auto">
            <h3 className="text-[25px] font-medium leading-[1.25] max-w-[20ch]">Watch the document chaser run one firm&rsquo;s tax season</h3>
            <div className="mt-5 font-bold text-[18px]">Watch here &gt;</div>
          </div>
        </div>
        <div className="min-h-[400px] p-7 flex flex-col bg-[#FF8A00] text-[#0A0A0A]">
          <div className="font-medium tracking-[-0.04em] leading-[.95]" style={{ fontSize: 'clamp(72px, 8vw, 120px)' }}>14 days</div>
          <div className="text-[26px] font-medium leading-[1.2] mt-2">or the pilot is free</div>
          <div className="mt-auto font-bold text-[18px]">Read the terms &gt;</div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-12 md:gap-20 items-center px-6 md:px-20 py-24" style={{ '--c': '#4C9DFF' }}>
        <div>
          <div className="text-[16px] text-[#bbb] mb-6">AI employees with office IQ</div>
          <h2 className="flex items-center gap-4 text-[34px] md:text-[38px] font-semibold"><i className="w-3.5 h-3.5 rounded-full bg-[var(--c)] inline-block" />Accountants and bookkeepers</h2>
          <h3 className="mt-5 text-[22px] font-semibold leading-[1.35]">Chasing documents at tax time, done by software.</h3>
          <p className="mt-5 text-[18px] leading-[1.45] text-[#ddd] max-w-[52ch]">Each client gets their own checklist. The document chaser reminds them about only what is still missing, matches what comes back to the file, and tells your team when a return is ready to start.</p>
          <div className="grid grid-cols-3 gap-5 mt-9">
            {[['Checklists', 'out to every client'], ['Reminders', 'for only what is missing'], ['Files', 'matched as they land']].map(([a, b]) => (
              <div key={a}><b className="block text-[30px] md:text-[38px] font-medium text-[var(--c)] leading-none mb-2">{a}</b><span className="text-[16px] text-[#ddd] leading-[1.3]">{b}</span></div>
            ))}
          </div>
          <span className="inline-block mt-9 rounded-full px-6 py-3 text-[15px] font-semibold text-[#0A0A0A] bg-[var(--c)]">Explore accountants</span>
        </div>
        <div className="rounded-[26px] pt-6 px-6 h-[400px] overflow-hidden text-[#0A0A0A] bg-[var(--c)]">
          <div className="text-[19px] font-bold">Document chaser</div>
          <div className="text-[13px] font-semibold mb-4">Plays one tax season, start to finish</div>
          <img src="/work/accountants-demo.png" alt="" className="w-full h-[300px] object-cover object-top rounded-t-xl" />
        </div>
      </section>
    </main>
  )
}
