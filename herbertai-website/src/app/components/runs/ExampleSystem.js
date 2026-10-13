'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { STATE, useBoard, useInView } from './board'
import { AUDIT_HREF } from '../site/shared'

// One page per system that cannot be opened for real (13 Oct 2026, Will: "maybe
// u can just generate what the other things would look like, and then the link
// goes to that"). Each is drawn in the site's own board style with made-up
// data and says so: the system's day as jobs finishing, beside what it does.
// Colour means state only; motion is only a job finishing; with reduced motion
// the day renders finished.

function Lamp({ s }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
      style={{ background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

export function RunBoard({ title, label, rows, whoWidth = 168 }) {
  const ref = useRef(null)
  const b = useBoard(useInView(ref), 1300, rows)
  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden"
    >
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
        <span>{title}</span>
        <span className="flex items-center gap-5 tabular-nums">
          <span className="flex items-center gap-2"><Lamp s="done" /> done <b>{b.done}</b></span>
          <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting on a person <b>{b.waiting}</b></span>
        </span>
      </div>
      <div className="px-2 py-2" style={{ minHeight: rows.length * 58 + 16 }}>
        <AnimatePresence initial={false}>
          {b.shown.map((r) => (
            <motion.div
              key={r.t + r.what}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-[48px_1fr] items-center gap-x-3 gap-y-1 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[15px] md:[grid-template-columns:var(--cols)]"
              style={{ '--cols': `52px ${whoWidth}px minmax(0,1fr) 190px` }}
            >
              <span className="text-[12px] text-[#777] tabular-nums font-mono">{r.t}</span>
              <span className="font-medium">{r.who}</span>
              <span className="col-start-2 md:col-start-auto leading-[1.35] text-[#333]">{r.what}</span>
              <span
                className="col-start-2 md:col-start-auto flex items-center gap-2 text-[12px] leading-[1.3]"
                style={{ color: r.state === 'done' ? '#0E8F53' : '#9A6300' }}
              >
                <Lamp s={r.state} />
                {r.state === 'waiting' ? r.wait : r.then || 'Done'}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ExampleSystem({ tag, title, sub, facts, board, note }) {
  return (
    <main className="bg-[#FAFAF8] text-[#111]">
      <section>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-12 md:pt-16 pb-24">
          <Link
            href="/work"
            className="text-[14px] font-medium text-[#555] underline underline-offset-4 decoration-[#111]/20 hover:decoration-[#111] transition-colors"
          >
            <span aria-hidden>&larr;</span> All the systems
          </Link>
          <div className="mt-10 grid xl:grid-cols-[0.72fr_1.28fr] gap-x-12 gap-y-12 items-start">
            <div>
              <p className="text-[15px] font-medium text-[#555] mb-4">{tag}</p>
              <h1 className="font-bold tracking-[-0.04em] leading-[1]" style={{ fontSize: 'clamp(36px, 3.6vw, 52px)' }}>
                {title}
              </h1>
              <p className="mt-6 text-[18px] leading-[1.5] text-[#333] max-w-[42ch]">{sub}</p>
              <ul className="mt-8">
                {facts.map((f) => (
                  <li key={f} className="text-[16px] leading-[1.45] text-[#444] py-2.5 border-t border-[#111]/10">{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <RunBoard {...board} />
              <p className="mt-3.5 text-[13px] text-[#777]">{note}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-[#111]/10">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24">
          <h2 className="font-bold tracking-[-0.04em] leading-[1] max-w-[20ch]" style={{ fontSize: 'clamp(32px, 3vw, 44px)' }}>
            Find the job in your business it would take first.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.5] text-[#444] max-w-[48ch]">
            45 minutes auditing your business, and a written page back within two business days with the three jobs costing you most.
          </p>
          <a
            href={AUDIT_HREF}
            className="mt-8 inline-flex items-center gap-2 bg-[#111] text-white rounded-[10px] px-6 py-3.5 text-[16px] font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            Book a free AI audit <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>
    </main>
  )
}
