'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import OneJob, { H, W } from './OneJob'
import { INDUSTRIES } from './industries'

// Homepage section 4, Industries (15 Oct 2026). Layout A, as The Work: the
// five industries listed beside one big screen; the screen shows one job
// start to finish through that industry's system (Will: "B"). Calm until an
// industry is clicked, then that story plays once. Opens on Property, which
// has a real build behind it. Industry pages keep the old slugs until the
// rename lands (CLAUDE.md, ICP).

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
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${W} / ${H}` }}>
      <div className="absolute top-0 left-0" style={{ width: W, transform: `scale(${k})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}

export default function IndustriesSection() {
  const [active, setActive] = useState(INDUSTRIES[0].id)
  const [plays, setPlays] = useState(0)
  const story = INDUSTRIES.find((x) => x.id === active)
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-16 pb-20">
        <div className="mb-10">
          <p className="text-[15px] font-medium text-[#555] mb-4">Industries</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            Built for the office you actually run.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <div>
            <Scaled>
              <div key={`${active}-${plays}`}><OneJob story={story} play={plays > 0} /></div>
            </Scaled>
            <div className="mt-4 flex items-baseline justify-between gap-6">
              <div className="hidden lg:block">
                <p className="text-[15px] font-medium text-[#777]">{story.name}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{story.system}</p>
              </div>
              <Link href={`/industries/${story.slug}`} className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                See the {story.name} page <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
          <div role="tablist" aria-label="Industries" className="border-b border-[#111]/15">
            {INDUSTRIES.map((x) => {
              const on = x.id === active
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setActive(x.id); setPlays((p) => p + 1) }}
                  className={`w-full text-left py-4 pl-4 pr-3 border-t border-[#111]/15 border-l-2 transition-colors ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent hover:bg-white/60'}`}
                >
                  <span className="block text-[15px] font-medium text-[#777]">{x.name}</span>
                  <span className={`block mt-1 text-[20px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{x.system}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
