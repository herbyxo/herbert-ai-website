'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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
// mark). Shown as early access, not a paywall, until Herbert AI's own ads
// have numbers. The line is Will's (19 Oct 2026), and so are the facts: the
// product as a story in five steps, name in, booked jobs out (Will, 19 Oct
// 2026: "sort of telling a story of what the product does", then "i think i
// like 1"). On a laptop the
// marketing dashboard plays once in view; on a phone, Herbert Reach as the
// owner would run it from their phone. The dashboard is the full product, every
// channel judged by cost per booked job (ReachDashboard), and claims no results.

const W = 1184
const H = 740
const NAME = 'Herbert Reach'
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
  return (
    <section ref={ref} className="bg-[#111] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20 grid lg:grid-cols-[0.72fr_1.28fr] gap-x-12 gap-y-10 items-center">
        <div className="min-w-0">
          <p className="text-[15px] font-medium text-white/60 mb-4">Products</p>
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50">by Herbert AI</p>
          <h2 className="mt-2 font-bold tracking-[-0.04em] leading-[0.95]" style={{ fontSize: 'clamp(40px, 4.4vw, 64px)' }}>{NAME}</h2>
          <p className="mt-5 text-[17px] leading-[1.5] text-white/75 max-w-[40ch]">Your whole marketing department at the click of a button.</p>
          <ol className="mt-6 border-b border-white/15">
            {STORY.map((f, i) => (
              <li key={f} className="flex items-baseline gap-4 py-3 border-t border-white/15">
                <span aria-hidden className="w-5 shrink-0 font-mono text-[11px] tracking-[0.12em] text-white/40">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[20px] font-semibold tracking-[-0.015em] text-white">{f}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 flex items-start gap-2.5 text-[13.5px] leading-[1.45] text-white/60">
            <span className="mt-[2px] shrink-0 rounded-full border border-white/30 px-2 py-[1px] font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">Early access</span>
            <span>It runs Herbert AI’s own ads first, and opens up once it has the numbers to show for it.</span>
          </p>
          <p className="mt-6 hidden lg:block">
            <Link href="/work/marketing-engine" className="text-[15px] font-medium underline underline-offset-4 decoration-white/40 hover:decoration-white">
              See {NAME} <span aria-hidden>&rarr;</span>
            </Link>
          </p>
        </div>
        <div className="min-w-0">
          <div className="hidden lg:block"><Scaled><ReachDashboard name={NAME} /></Scaled></div>
          <div className="lg:hidden"><PhoneScaled><ReachMobile play={seen} /></PhoneScaled></div>
          <p className="mt-8 lg:hidden">
            <Link href="/work/marketing-engine" className="text-[15px] font-medium underline underline-offset-4 decoration-white/40 hover:decoration-white">
              See {NAME} <span aria-hidden>&rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
