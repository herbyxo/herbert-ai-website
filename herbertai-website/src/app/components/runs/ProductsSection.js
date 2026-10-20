'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from './board'
import ReachDashboard from './ReachDashboard'
import ReachMobile from './ReachMobile'
import { PhoneScaled } from './os/mobile'

// Homepage section 5, Products (Will, 17 Oct 2026: "1 - the its own band looks
// cool, it gives a distinctive premium feel"). The one dark section on the
// page: Herbert AI is the company and its own software carries its own name,
// the Wispr AI and Wispr Flow pattern (14 Oct 2026). Herbert Reach, a small
// business's whole marketing department, as defined in
// code/marketing-engine/docs/REACH-DEFINITION.md (17 Oct 2026); the name is
// settled and always written in full (bare REACH is someone else's live
// mark). Marked In development, with no link out until it opens (Will, 19 Oct
// 2026: "i think we just remove that, and the early access note. and instead
// of the see Herbert Reach, we have a still in development, or in alpha phase,
// or something"). The line is Will's (19 Oct 2026), and so are the facts: the
// product as a story in five steps, name in, booked jobs out (Will, 19 Oct
// 2026: "sort of telling a story of what the product does", then "i think i
// like 1"). On a laptop the
// marketing dashboard plays once in view; on a phone, Herbert Reach as the
// owner would run it from their phone. The dashboard is the full product, every
// channel judged by cost per booked job (ReachDashboard), and claims no results.

const W = 1184
const H = 700
const NAME = 'Herbert Reach'
const STATUS = 'In development'
const STORY = ['Type your name.', 'Writes ads.', 'Runs ads.', 'Answers leads.', 'Books jobs.']

function Scaled({ children }) {
  const ref = useRef(null)
  const [k, setK] = useState(0.6)
  useEffect(() => {
    const el = ref.current
    const ro = new ResizeObserver(() => setK(el.clientWidth / W))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-xl text-[#111]" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute top-0 left-0" style={{ width: W, transform: `scale(${k})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

export default function ProductsSection() {
  const ref = useRef(null)
  const seen = useInView(ref, 0.3)
  // Fills the screen on laptops, like Operating Systems (Will, 20 Oct 2026: "can we
  // have the OS section take up the entire screen", "same as the Herbert Reach
  // section"); on phones it is taller than a screen anyway.
  // On laptops the story runs as a row of five steps and the dashboard spans
  // the full width at its real size (critique fix 1, Will, 20 Oct 2026: "2"),
  // so every number on it can be read; the section then runs past one screen.
  // Phones keep the story as a list and the phone version.
  return (
    <section ref={ref} className="bg-[#111] text-white lg:min-h-[100svh] lg:flex lg:flex-col lg:justify-center">
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20 grid gap-y-10">
        <div className="min-w-0">
          <p className="text-[16px] font-medium text-white/60 mb-4">Products</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50">by Herbert AI</p>
          <h2 className="mt-2 font-bold tracking-[-0.04em] leading-[0.95]" style={{ fontSize: 'clamp(40px, 4.4vw, 64px)' }}>{NAME}</h2>
          <p className="mt-5 text-[17px] leading-[1.5] text-white/75 max-w-[40ch]">Your whole marketing department at the click of a button.</p>
          <ol className="mt-6 border-b border-white/15 lg:mt-8 lg:grid lg:grid-cols-5 lg:gap-x-5 lg:border-b-0">
            {STORY.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4 py-3 border-t border-white/15 lg:flex-col lg:items-start lg:gap-1.5 lg:border-t-2 lg:border-white/20">
                <span aria-hidden className="w-5 shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[20px] font-semibold tracking-[-0.015em] text-white">{f}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
            <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-[#BDBDBD]" />
            {STATUS}
          </p>
        </div>
        <div className="min-w-0">
          <div className="hidden lg:block"><Scaled><ReachDashboard name={NAME} /></Scaled></div>
          <div className="lg:hidden"><PhoneScaled><ReachMobile play={seen} /></PhoneScaled></div>
        </div>
      </div>
    </section>
  )
}
