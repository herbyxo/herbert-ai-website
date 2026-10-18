'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from './board'
import EngineDashboard from './EngineDashboard'
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
// have numbers. The line is Will's (19 Oct 2026). On a laptop the
// marketing dashboard plays once in view; on a phone, Herbert Reach as the
// owner would run it from their phone. Copy reuses the engine page's lines and
// claims no results.

const W = 1184
const H = 740
const NAME = 'Herbert Reach'
const FACTS = ['Google ads written, tested and paused against results', 'A landing page for every ad group', 'A daily audit that flags what is wasting money']

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
          <ul className="mt-6 border-b border-white/15">
            {FACTS.map((f) => (
              <li key={f} className="py-3 border-t border-white/15 text-[15px] text-white/80">{f}</li>
            ))}
          </ul>
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
          <div className="hidden lg:block"><Scaled><EngineDashboard name={NAME} /></Scaled></div>
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
