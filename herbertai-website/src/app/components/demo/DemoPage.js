'use client'
// Bottleneck Pilot demo page, direction A (live app replay) with the client's
// email one tap away on each timeline event. Will's pick, 15 Sep 2026; ledger at
// docs/design/design-pass-demo-pages.md.
//
// Shown by Harry on a phone at the door and sent as a link after calls, so it is
// built phone-first and reads without scrolling past the app. The page follows
// the internal ops tool register for the app itself (Inter, white, 8px corners,
// a 3px status rail, no shadows) rather than the site charter: it depicts the
// software, and the software is what is being sold.
//
// Palette: ground #F7F7F8  surface #FFFFFF  ink #111827  muted #6B7280
//   line #E5E7EB  accent #4F46E5  done #16A34A  wait #D97706  idle #9CA3AF

import { useEffect, useMemo, useRef, useState } from 'react'

const TONE = { done: '#16A34A', wait: '#D97706', idle: '#9CA3AF' }
const KIND = { sent: '#4F46E5', reply: '#16A34A', done: '#16A34A' }
const STEP_MS = 1300
const PHONE_HREF = 'tel:+61448111840'
const PHONE = '0448 111 840'

function dateLabel(start, day) {
  const d = new Date(`${start}T00:00:00`)
  d.setDate(d.getDate() + day)
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
}

function statusAt(client, day) {
  let s = null
  for (const e of client.status) if (e.day <= day) s = e
  return s
}

export default function DemoPage({ industry, firm }) {
  const lastDay = Math.max(...industry.timeline.map((e) => e.day), ...industry.clients.flatMap((c) => c.status.map((s) => s.day)))
  const [day, setDay] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [open, setOpen] = useState(null)
  const timer = useRef(null)

  // Reduced motion starts on the finished season with nothing moving; everyone
  // else watches it play once from day 0, then it rests on the final state.
  // The short delay lets day 0 register before anything moves.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setTimeout(() => (reduced ? setDay(lastDay) : setPlaying(true)), reduced ? 0 : 700)
    return () => clearTimeout(id)
  }, [lastDay])

  useEffect(() => {
    if (!playing) return
    timer.current = setInterval(() => {
      setDay((d) => {
        if (d >= lastDay) {
          setPlaying(false)
          return d
        }
        return d + 1
      })
    }, STEP_MS)
    return () => clearInterval(timer.current)
  }, [playing, lastDay])

  const focus = industry.clients.find((c) => c.focus)
  const events = useMemo(
    () => industry.timeline.map((e, i) => ({ ...e, i })).filter((e) => e.day <= day),
    [industry, day],
  )

  function togglePlay() {
    if (playing) return setPlaying(false)
    if (day >= lastDay) setDay(0)
    setOpen(null)
    setPlaying(true)
  }

  return (
    <div className="demo-root min-h-screen bg-[#F7F7F8] text-[#111827]" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[560px] mx-auto px-5 py-3 text-[12.5px] text-[#6B7280]">
          Demo prepared for <span className="text-[#111827] font-semibold">{firm}</span>
        </div>
      </div>

      <div className="max-w-[560px] mx-auto">
        <section className="px-5 pt-7 pb-5">
          <h1 className="text-[28px] leading-[1.15] tracking-[-0.02em] font-bold">{industry.hero.h1}</h1>
          <p className="mt-3 text-[15.5px] leading-[1.55] text-[#4B5563]">{industry.hero.sub}</p>
        </section>

        <section className="mx-3 bg-white border border-[#E5E7EB] rounded-lg overflow-hidden" aria-label="Demo of the software">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
            <span className="text-[13.5px] font-semibold">{industry.appTitle}</span>
            <span className="text-[12px] text-[#6B7280]">{industry.appPeriod}</span>
          </div>

          <ul>
            {industry.clients.map((c) => {
              const s = statusAt(c, day)
              return (
                <li key={c.name} className={`flex gap-3 px-4 py-3 border-b border-[#F0F0F2] ${c.focus ? 'bg-[#F5F7FF]' : ''}`}>
                  <span className="w-[3px] rounded-sm self-stretch transition-colors duration-300" style={{ background: s ? TONE[s.tone] : '#E5E7EB' }} />
                  <div className="min-w-0">
                    <div className="text-[14px] font-semibold">{c.name}</div>
                    <div className="text-[12px] text-[#6B7280] mt-0.5">{s ? `${s.received} of ${c.total} received` : 'Not started'}</div>
                  </div>
                  <div className="ml-auto text-[12px] font-medium whitespace-nowrap pt-0.5 transition-colors duration-300" style={{ color: s ? (s.tone === 'idle' ? '#6B7280' : TONE[s.tone]) : '#9CA3AF' }}>
                    {s ? s.label : ''}
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="px-4 pt-4">
            <h2 className="text-[11.5px] uppercase tracking-[0.06em] text-[#6B7280] font-semibold">{focus.name}</h2>
            <p className="text-[12px] text-[#6B7280] mt-1">Tap an email to see what they received.</p>
          </div>

          <ol className="px-4 pt-3 min-h-[250px]">
            {events.map((e) => {
              const isOpen = open === e.i
              const Row = e.email ? 'button' : 'div'
              return (
                <li key={e.i} className="pb-3">
                  <Row
                    {...(e.email ? { type: 'button', onClick: () => { setPlaying(false); setOpen(isOpen ? null : e.i) }, 'aria-expanded': isOpen } : {})}
                    className={`w-full text-left flex gap-3 ${e.email ? 'cursor-pointer' : ''}`}
                  >
                    <span className="w-[46px] shrink-0 text-[12px] text-[#6B7280] pt-px">{dateLabel(industry.startDate, e.day)}</span>
                    <span className="w-2 h-2 rounded-full mt-[5px] shrink-0" style={{ background: KIND[e.kind] }} />
                    <span className="text-[13.5px] leading-[1.4]">
                      {e.title}
                      {e.email && <span className="ml-1.5 text-[12px] font-medium text-[#4F46E5]">{isOpen ? 'Hide email' : 'View email'}</span>}
                      <span className="block text-[12px] text-[#6B7280] mt-0.5">{e.detail}</span>
                    </span>
                  </Row>
                  {isOpen && <EmailCard industry={industry} event={e} firm={firm} client={focus} />}
                </li>
              )
            })}
          </ol>

          <div className="flex items-center gap-3 px-4 pt-1 pb-4">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : day >= lastDay ? 'Replay' : 'Play'}
              className="w-8 h-8 rounded-full bg-[#111827] text-white grid place-items-center shrink-0"
            >
              {playing ? (
                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5" aria-hidden><rect x="1.5" y="1" width="2.4" height="8" fill="currentColor" /><rect x="6.1" y="1" width="2.4" height="8" fill="currentColor" /></svg>
              ) : day >= lastDay ? (
                <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden><path d="M6 1.5a4.5 4.5 0 1 1-4.2 2.9" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M1 1.3v3.4h3.4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
              ) : (
                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 ml-0.5" aria-hidden><path d="M2 1l7 4-7 4z" fill="currentColor" /></svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={lastDay}
              value={day}
              onChange={(ev) => { setPlaying(false); setOpen(null); setDay(Number(ev.target.value)) }}
              aria-label="Day of the season"
              className="flex-1 accent-[#4F46E5]"
            />
            <span className="text-[12px] text-[#6B7280] w-[44px] text-right">{dateLabel(industry.startDate, day)}</span>
          </div>
        </section>

        <section className="px-5 pt-6">
          <p className="text-[15px] leading-[1.55] text-[#374151]">{industry.example.replaceAll('{firm}', firm)}</p>
        </section>

        <section className="px-5 pt-6 pb-10">
          <a href="/pilot#book" className="block text-center bg-[#111827] text-white rounded-lg py-3.5 font-semibold text-[15px]">
            Book a 15 minute call
          </a>
          <p className="text-center text-[13px] text-[#6B7280] mt-3">
            Working software on your {industry.bottleneck} in 14 days. $3,500 fixed, or it&apos;s free.
          </p>
          <p className="text-center text-[13px] text-[#6B7280] mt-1">
            Or call Will on <a href={PHONE_HREF} className="text-[#111827] font-medium">{PHONE}</a>
          </p>
        </section>

        <footer className="px-5 pb-8 text-[12px] text-[#9CA3AF] text-center">
          Built by <a href="/pilot" className="underline">Herbert AI</a>, Adelaide. Names in this demo are made up.
        </footer>
      </div>
    </div>
  )
}

function EmailCard({ industry, event, firm, client }) {
  const got = new Set(event.received)
  const needed = industry.docs.filter((_, i) => !got.has(i)).length
  const initials = firm.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()
  return (
    <div className="mt-3 sm:ml-[58px] border border-[#E5E7EB] rounded-lg bg-white overflow-hidden">
      <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-[#F0F0F2]">
        <span className="w-7 h-7 rounded-full bg-[#4F46E5] text-white text-[11px] font-semibold grid place-items-center shrink-0">{initials}</span>
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold leading-[1.3]">{firm}</div>
          <div className="text-[11.5px] text-[#6B7280]">to {client.name}</div>
        </div>
      </div>
      <div className="px-3 py-3">
        <span className="inline-block text-[10.5px] font-semibold text-[#4F46E5] bg-[#EEF2FF] rounded px-1.5 py-0.5 mb-2">Sent automatically</span>
        <div className="text-[14px] font-semibold leading-[1.3]">{event.email.subject}</div>
        <p className="text-[13px] leading-[1.5] text-[#374151] mt-2">{event.email.intro}</p>
        <ul className="mt-2.5 border border-[#EEF0F2] rounded-md">
          {industry.docs.map((d, i) => (
            <li key={d} className="flex justify-between px-2.5 py-1.5 text-[12.5px] border-b border-[#F3F4F6] last:border-b-0">
              <span>{d}</span>
              <span className={got.has(i) ? 'text-[#16A34A] font-semibold' : 'text-[#D97706] font-semibold'}>{got.has(i) ? 'Received' : 'Needed'}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 text-center text-[12.5px] font-semibold text-white bg-[#4F46E5] rounded-md py-2">
          Upload {needed === industry.docs.length ? 'documents' : `the last ${needed}`}
        </div>
      </div>
    </div>
  )
}
