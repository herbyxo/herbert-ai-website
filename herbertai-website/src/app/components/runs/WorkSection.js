'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import EngineDashboard from './EngineDashboard'
import HubPipeline from './HubPipeline'

// Homepage section 4, The Work (13 Oct 2026). Will picked layout A ("i think
// A, but lets capitalise the wording, and instead of having currently
// building, live click in, etc, we have the industry name above it"): one big
// screen with the systems listed beside it; clicking one swaps the screen and
// plays it once. It follows the AI employees scene, so it stays calm until
// clicked and opens on the live dashboard's still. Titles in title case, each
// under its industry; the link words say what a click does. The brokerage
// hub's visual shows only where hubExampleShown() allows (not on the live site
// until the client clears it); there its slot is words and its link is /work.

const W = 1184 // the width every visual is drawn at, then scaled to its slot
const H = 740

function systems(showHub) {
  return [
    { id: 'dash', industry: 'Property', title: 'A Property Manager’s Dashboard', href: 'https://dashboard.herbert-aisolutions.com', external: true, verb: 'Open it' },
    { id: 'demo', industry: 'Finance', title: 'An Accountant’s Document Chaser', href: '/demo/accountants', verb: 'See it run' },
    { id: 'hub', industry: 'Finance', title: 'An Operations Hub for a Finance Brokerage', href: showHub ? '/work/operations-hub' : '/work', verb: showHub ? 'See an example' : 'Read about it' },
    { id: 'engine', industry: 'Trades', title: 'A Marketing Engine', href: '/work/marketing-engine', verb: 'See an example' },
  ]
}

function Go({ s, className = '', children }) {
  return s.external ? (
    <a href={s.href} target="_blank" rel="noreferrer" className={className}>{children}</a>
  ) : (
    <Link href={s.href} className={className}>{children}</Link>
  )
}

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

function Frame({ bar, children }) {
  return (
    <div className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden">
      <div className="px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono text-[#555] truncate">{bar}</div>
      {children}
    </div>
  )
}

// The accountant demo itself, framed and scrolled to its software card. Same
// origin, so the frame can be scrolled from here; it plays as it loads.
function DemoFrame() {
  const ref = useRef(null)
  useEffect(() => {
    const f = ref.current
    let tries = 0
    const go = () => {
      try {
        const card = f.contentDocument.querySelector('[aria-label="Demo of the software"]')
        if (card) { f.contentWindow.scrollTo(0, card.getBoundingClientRect().top + f.contentWindow.scrollY - 12); return true }
      } catch {}
      return false
    }
    const t = setInterval(() => { if (go() || ++tries > 40) clearInterval(t) }, 150)
    f.addEventListener('load', go)
    return () => { clearInterval(t); f.removeEventListener('load', go) }
  }, [])
  return (
    <Frame bar="Demo · an example accounting firm · plays itself">
      <iframe ref={ref} src="/demo/accountants" title="The accountant demo" className="block w-full h-[680px] border-0 pointer-events-none bg-[#F7F7F8]" scrolling="no" tabIndex={-1} />
    </Frame>
  )
}

function Visual({ id, play, showHub }) {
  if (id === 'dash') {
    return (
      <Frame bar="dashboard.herbert-aisolutions.com · live, example data">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/work/property-dashboard-requests.png"
          alt="The property dashboard's maintenance requests: each tenant's issue, its urgency and where it is up to"
          className="w-full aspect-[1200/660] object-cover object-top"
        />
      </Frame>
    )
  }
  if (id === 'demo') return <DemoFrame />
  if (id === 'engine') return <EngineDashboard still={!play} />
  if (!showHub) {
    return (
      <div className="rounded-xl border border-[#111]/12 bg-white p-12" style={{ height: H - 40 }}>
        <p className="text-[18px] text-[#777]">Finance</p>
        <p className="mt-2 text-[40px] font-semibold tracking-[-0.02em] max-w-[22ch] leading-[1.1]">An Operations Hub for a Finance Brokerage</p>
        <p className="mt-5 text-[22px] text-[#444] max-w-[44ch] leading-[1.45]">Every client file on one board, documents chased on their own, and every client email approved by a person before it goes. An example with made-up data is on its way.</p>
      </div>
    )
  }
  return <HubPipeline still={!play} />
}

export default function WorkSection({ showHub }) {
  const list = systems(showHub)
  const [active, setActive] = useState('dash')
  const [plays, setPlays] = useState(0)
  const s = list.find((x) => x.id === active)
  return (
    <section className="bg-[#FAFAF8] text-[#111] border-t border-[#111]/10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <p className="text-[15px] font-medium text-[#555] mb-4">The Work</p>
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[18ch]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
            The systems, not the slides.
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1.28fr_0.72fr] gap-x-12 gap-y-10 items-start">
          <div>
            <Scaled>
              <div key={`${active}-${plays}`}><Visual id={active} play={plays > 0} showHub={showHub} /></div>
            </Scaled>
            <div className="mt-5 flex items-baseline justify-between gap-6">
              {/* On phones the list sits right under the screen and already
                  names the system, so only the link shows here. */}
              <div className="hidden lg:block">
                <p className="text-[15px] font-medium text-[#777]">{s.industry}</p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.02em]">{s.title}</p>
              </div>
              <Go s={s} className="shrink-0 text-[14px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111]">
                {s.verb} <span aria-hidden>&rarr;</span>
              </Go>
            </div>
          </div>
          <div>
            <div role="tablist" aria-label="The systems" className="border-b border-[#111]/15">
              {list.map((x) => {
                const on = x.id === active
                return (
                  <button
                    key={x.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => { setActive(x.id); setPlays((p) => p + 1) }}
                    className={`w-full text-left py-5 pl-4 pr-3 border-t border-[#111]/15 border-l-2 transition-colors ${on ? 'border-l-[#111] bg-white' : 'border-l-transparent hover:bg-white/60'}`}
                  >
                    <span className="block text-[15px] font-medium text-[#777]">{x.industry}</span>
                    <span className={`block mt-1 text-[20px] font-semibold tracking-[-0.02em] ${on ? '' : 'text-[#111]/70'}`}>{x.title}</span>
                  </button>
                )
              })}
            </div>
            <Link
              href="/work"
              className="inline-block mt-6 text-[15px] font-medium underline underline-offset-4 decoration-[#111]/30 hover:decoration-[#111] transition-colors"
            >
              All the systems
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
