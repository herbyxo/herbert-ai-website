'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from './board'
import { SCREENS } from './os'
import { Scaled } from './os/shared'

// Homepage section 4, Operating Systems (15 Oct 2026). Layout A: the five
// industries listed beside one big screen; the screen is that industry's
// operating system seen from the owner's chair, work already done with one
// decision left (operating-systems-2026-10-15.md). Calm until an industry is
// clicked, then that screen plays once. The Work is folded in, but the page
// shows nothing of that on the homepage (no Built tag, no per-screen link;
// Will, 16 Oct 2026). Under the screen, the model's line
// for an example business, said to be example figures. No software names.
// `initial` and `autoplay` exist for the lab page, which shows all five.

export default function OperatingSystemsSection({ initial = SCREENS[0].id, autoplay = false }) {
  const [active, setActive] = useState(initial)
  const [plays, setPlays] = useState(0)
  const ref = useRef(null)
  const seen = useInView(ref, 0.25)
  const s = SCREENS.find((x) => x.id === active)
  const Visual = s.Visual
  const play = autoplay ? seen : plays > 0
  return (
    <section ref={ref} className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-14 pb-16">
        <div className="mb-8">
          <p className="text-[15px] font-medium text-[#555] mb-4">Operating Systems</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The whole office, on one screen.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <div>
            <Scaled>
              <div key={`${active}-${plays}`}><Visual play={play} /></div>
            </Scaled>
            <div className="mt-4">
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-[#777]">{s.name}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{s.system}</p>
                <p className="mt-2 text-[15px] leading-[1.5] text-[#555] max-w-[66ch]">{s.short} <span className="text-[#999]">Yours come out of the audit.</span></p>
              </div>
            </div>
          </div>
          <div>
          <div role="tablist" aria-label="Operating systems" className="border-b border-[#111]/15">
            {SCREENS.map((x) => {
              const on = x.id === active
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => { setActive(x.id); setPlays((p) => p + 1) }}
                  className={`w-full text-left py-3 pl-4 pr-3 border-t border-[#111]/15 border-l-2 transition-colors ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent hover:bg-white/60'}`}
                >
                  <span className={`block text-[22px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{x.name}</span>
                  <span className="block mt-0.5 text-[14px] text-[#777]">{x.jobs}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-6 text-[15px]">
            <Link href="/pricing" className="font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
              Your AI operating system, from $25,000, scoped after the audit <span aria-hidden>&rarr;</span>
            </Link>
          </p>
          </div>
        </div>
      </div>
    </section>
  )
}
