'use client'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { STATE, useBoard, useInView } from './board'

// The homepage board: one example office's AI employees finishing their jobs,
// shown as the software itself (design pass, hero option A, picked 6 Oct 2026:
// "the whole point of it is to showcase the product"). Colour means state only:
// green done, amber waiting on a person, grey queued. Every figure is an
// example office and the header says so.

function Lamp({ s }) {
  return (
    <span
      aria-hidden
      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
      style={{ background: STATE[s], boxShadow: s === 'done' ? `0 0 0 3px ${STATE.done}2e` : 'none' }}
    />
  )
}

export default function HeroBoard() {
  const ref = useRef(null)
  const b = useBoard(useInView(ref))
  return (
    <div
      ref={ref}
      role="group"
      aria-label="An example office: its AI employees' jobs for today"
      className="rounded-xl border border-[#111]/12 bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,.35)] overflow-hidden"
    >
      <div className="flex flex-wrap gap-3 items-center justify-between px-5 py-3 border-b border-[#111]/10 text-[12px] font-mono">
        <span>Today &middot; an example office</span>
        <span className="flex items-center gap-5 tabular-nums">
          <span className="flex items-center gap-2"><Lamp s="done" /> done <b>{b.done}</b></span>
          <span className="flex items-center gap-2"><Lamp s="waiting" /> waiting on a person <b>{b.waiting}</b></span>
        </span>
      </div>
      <div className="min-h-[392px] px-2 py-2">
        {/* Each row is its own grid, so every column has a fixed width: an auto
            column sizes per row and the statuses stop lining up. */}
        <AnimatePresence initial={false}>
          {b.shown.map((r) => (
            <motion.div
              key={r.t}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-[48px_1fr] md:grid-cols-[52px_168px_minmax(0,1fr)_164px] items-center gap-x-3 gap-y-1 px-3 py-3 border-b border-[#111]/8 last:border-0 text-[14px]"
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
        {b.queued > 0 && (
          <div className="flex items-center gap-2 px-3 py-3 text-[13px] text-[#999]">
            <Lamp s="queued" /> {b.queued} jobs queued
          </div>
        )}
      </div>
    </div>
  )
}
