'use client'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion'
import { Avatar, EMPLOYEES, StateLine } from './employees'

// Homepage section 3, the AI employees roster (13 Oct 2026). Will picked motion
// "2 across the site plus 3 on the homepage": this is the homepage's one scroll
// scene (CHARTER.md, "Motion shows the system working"). On a laptop the
// section holds while the visitor scrolls through the six employees, and a
// large screen in slight depth plays the active one's job by itself: the
// avatar's dots light as it works, the day's lines arrive, a cursor presses
// Approve, the avatar goes green. It follows How it works, not the hero, so
// two moving sections never sit back to back (Will: "going from the hero to
// the next section having graphic animations again is a bit much"). On phones,
// and with reduced motion, it is a grid of cards, each playing its job once
// when it comes into view (level 2) or showing its finished day.

// The counter as the card and the list show it: dollars where the label says so.
const countText = (e, v = e.count) => (e.countLabel.startsWith('found') || e.countLabel.startsWith('free') ? `$${v.toLocaleString('en-AU')}` : v)

function Heading() {
  return (
    <>
      <p className="text-[15px] font-medium text-[#555] mb-4">AI Employees</p>
      <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
        They do the job. Your team says yes.
      </h2>
    </>
  )
}

/* ─── the card (level 2), used on phones and with reduced motion ── */

function useCount(target, run, still) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (still) { const t = setTimeout(() => setV(target), 0); return () => clearTimeout(t) }
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1)
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, still])
  return v
}

function Card({ e, still }) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, amount: 0.4 })
  const [n, setN] = useState(0)
  const count = useCount(e.count, seen, still)
  useEffect(() => {
    if (!seen) return
    if (still) { const t = setTimeout(() => setN(5), 0); return () => clearTimeout(t) }
    const t = setInterval(() => setN((v) => Math.min(v + 1, 5)), 1050)
    return () => clearInterval(t)
  }, [seen, still])
  const mode = n === 0 ? 'still' : n < 3 ? 'scan' : n === 3 ? 'wait' : 'done'
  return (
    <div ref={ref} className="rounded-xl border border-[#111]/12 bg-white p-5">
      <div className="flex items-center gap-3.5">
        <Avatar glyph={e.glyph} mode={mode} scanKey={n < 3 ? n : 0} />
        <div className="flex-1 min-w-0">
          <p className="text-[17px] font-semibold tracking-[-0.01em] leading-tight">{e.name}</p>
          <p className="text-[14px] text-[#555] leading-tight mt-0.5">{e.job}</p>
          <p className="text-[12.5px] text-[#777] mt-1">{e.where}</p>
        </div>
        <div className="text-right">
          <p className="text-[22px] font-semibold tabular-nums leading-none">{countText(e, count)}</p>
          <p className="text-[11px] text-[#888] mt-1">{e.countLabel}</p>
        </div>
      </div>
      <p className="mt-3 text-[14px] text-[#444]">{e.what}</p>
      <div className="mt-3 h-[160px]">
        <AnimatePresence initial={false}>
          {e.feed.slice(0, Math.min(n, 3)).map(([t, s, then], i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="py-2 border-t border-[#111]/8">
              <p className="text-[13px] text-[#333]">{t}</p>
              <StateLine s={s === 'wait' && n < 5 ? 'wait' : 'done'} then={s === 'wait' ? then : null} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Grid({ still }) {
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <Heading />
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {EMPLOYEES.map((e) => <Card key={e.name} e={e} still={still} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── the scroll scene (level 3), laptops and up ───────────── */

// Scrolling only picks the employee (Will, 13 Oct 2026: "maybe we can scroll
// through each employee, and the jobs queue automatically activates"). Once an
// employee is on screen its day plays by itself: the avatar works, the three
// lines arrive, the cursor presses Approve, the avatar goes green. Scrolling on
// mid-way starts the next one.
const STEP_MS = 850 // Will, 16 Oct 2026: each item a bit slower, so it reads smoother
const STEPS = 7 // 1 scan, 2-4 the lines, 5 cursor, 6 pressed, 7 approved

function Scene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [idx, setIdx] = useState(0)
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIdx(Math.min(EMPLOYEES.length - 1, Math.floor(v * EMPLOYEES.length)))
  })
  useEffect(() => {
    const t0 = setTimeout(() => setStep(0), 0)
    const t = setInterval(() => setStep((v) => Math.min(v + 1, STEPS)), STEP_MS)
    return () => { clearTimeout(t0); clearInterval(t) }
  }, [idx])
  const e = EMPLOYEES[idx]
  const shown = Math.max(0, Math.min(3, step - 1))
  const approved = step >= STEPS
  const sub = step >= 5 ? 1 : 0 // the cursor moves onto Approve
  const mode = step === 0 ? 'still' : shown < 2 ? 'scan' : approved ? 'done' : 'wait'
  return (
    <section ref={ref} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10 relative" style={{ height: `calc(100vh + ${EMPLOYEES.length * 33}vh)` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-[1280px] mx-auto px-12 grid grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <div>
            <Heading />
            <ul className="mt-8">
              {EMPLOYEES.map((x, i) => (
                <li key={x.name} className="flex items-center gap-3 py-2.5 border-t border-[#111]/10 transition-opacity duration-300" style={{ opacity: i === idx ? 1 : 0.35 }}>
                  <Avatar glyph={x.glyph} size={26} mode={i < idx ? 'done' : 'still'} />
                  <span className="text-[16px] font-semibold">{x.name}</span>
                  <span className="text-[15px] text-[#777]">· {x.job}</span>
                  <span className="ml-auto text-right leading-tight">
                    <span className="block text-[15px] font-semibold tabular-nums">{countText(x)}</span>
                    <span className="block text-[11px] text-[#999]">{x.countLabel}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ perspective: 1400 }}>
            <motion.div
              key={e.name}
              initial={{ opacity: 0, rotateY: -8, y: 20 }}
              animate={{ opacity: 1, rotateY: -6, rotateX: 4, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[#111]/12 bg-white shadow-[0_50px_100px_-40px_rgba(0,0,0,.45)] overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
                <span>{e.name} · {e.job} · an example business</span>
                <span className="text-[#777]">{e.where}</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar glyph={e.glyph} size={72} mode={mode} scanKey={idx * 10 + shown} />
                  <div>
                    <p className="text-[24px] font-semibold tracking-[-0.02em]">{e.name}</p>
                    <p className="text-[15px] text-[#555]">{e.what}</p>
                  </div>
                </div>
                <div className="mt-6 h-[210px]">
                  {e.feed.slice(0, shown).map(([t, s, then], i) => (
                    <motion.div key={`${idx}-${i}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="py-3 border-t border-[#111]/8 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[15px] text-[#333]">{t}</p>
                        <StateLine s={s === 'wait' && !approved ? 'wait' : 'done'} then={s === 'wait' ? then : null} size={12} />
                      </div>
                      {s === 'wait' && !approved && (
                        <motion.span
                          animate={step === 6 ? { scale: [1, 0.9, 1] } : { scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="relative shrink-0 rounded-[8px] bg-[#111] text-white text-[12px] px-3 py-1.5"
                        >
                          Approve
                          <motion.svg
                            width="18" height="18" viewBox="0 0 24 24" className="absolute" aria-hidden
                            initial={{ left: 70, top: 40, opacity: 0 }}
                            animate={sub ? { left: 22, top: 12, opacity: 1 } : { left: 70, top: 40, opacity: 0 }}
                            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <path d="M4 2l15 9-7 1.5L9 20z" fill="#fff" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
                          </motion.svg>
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Reduced motion is read as an external store with a server snapshot of
// false, so the server HTML and the first client render match (framer's
// useReducedMotion is null on the server and mismatched, a hydration error)
// and the still form applies right after hydration.
const QUERY = '(prefers-reduced-motion: reduce)'
const subscribe = (cb) => {
  const m = window.matchMedia(QUERY)
  m.addEventListener('change', cb)
  return () => m.removeEventListener('change', cb)
}
const getStill = () => window.matchMedia(QUERY).matches
const getServerStill = () => false

export default function EmployeesSection() {
  const still = useSyncExternalStore(subscribe, getStill, getServerStill)
  return (
    <>
      <div className="hidden lg:block">{still ? <Grid still /> : <Scene />}</div>
      <div className="lg:hidden"><Grid still={still} /></div>
    </>
  )
}
