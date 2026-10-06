'use client'
import { useEffect, useState } from 'react'

// Shared engine for the "Runs itself" hero options: one example office's jobs
// finishing in order. Colour means state only (green done, amber waiting on a
// person, grey queued); motion is only ever a job finishing.

export const STATE = { done: '#12B76A', waiting: '#F5A623', queued: '#BDBDBD' }

export const ROWS = [
  { t: '08:32', who: 'Document chaser', short: 'DOC CHASER', what: 'Checklists sent to 150 clients', board: 'CHECKLISTS TO 150 CLIENTS', s: 'done' },
  { t: '08:40', who: 'Document chaser', short: 'DOC CHASER', what: '38 reminders drafted, only for what is missing', board: '38 REMINDERS DRAFTED', s: 'waiting', wait: 'Waiting on Sarah', waitB: 'WAITING: SARAH', then: 'Approved by Sarah, sent', thenB: 'APPROVED, SENT' },
  { t: '08:47', who: 'Quote follow-up', short: 'QUOTE FOLLOW-UP', what: 'Quote 1042 followed up, second time', board: 'QUOTE 1042 FOLLOWED UP', s: 'done' },
  { t: '08:51', who: 'Front desk assistant', short: 'FRONT DESK', what: 'Intake form sent to a new patient', board: 'INTAKE FORM SENT', s: 'done' },
  { t: '08:55', who: 'Maintenance coordinator', short: 'MAINTENANCE', what: 'Landlord approval requested, Unit 4', board: 'LANDLORD APPROVAL, UNIT 4', s: 'waiting', wait: 'Waiting on the landlord', waitB: 'WAITING: LANDLORD', then: 'Approved, plumber booked for Tuesday', thenB: 'PLUMBER BOOKED TUE' },
  { t: '09:02', who: 'Document chaser', short: 'DOC CHASER', what: 'Bank statement matched to the Nguyen file', board: 'STATEMENT MATCHED, NGUYEN', s: 'done' },
  { t: '09:06', who: 'Quote follow-up', short: 'QUOTE FOLLOW-UP', what: 'Quote 1038 flagged: worth a call', board: 'QUOTE 1038: WORTH A CALL', s: 'done' },
]

export function useInView(ref, threshold = 0.3) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return seen
}

export function useBoard(active, every = 1400, rows = ROWS) {
  const [n, setN] = useState(0)
  const [resolved, setResolved] = useState({})
  useEffect(() => {
    if (!active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setInterval(() => {
      setN((v) => (v >= rows.length ? v : reduce ? rows.length : v + 1))
      if (reduce) setResolved(Object.fromEntries(rows.map((_, i) => [i, true])))
    }, reduce ? 50 : every)
    return () => clearInterval(t)
  }, [active, every, rows])
  useEffect(() => {
    const timers = rows.map((r, i) => (r.s === 'waiting' && i < n && !resolved[i] ? setTimeout(() => setResolved((o) => ({ ...o, [i]: true })), 3200) : null))
    return () => timers.forEach((x) => x && clearTimeout(x))
  }, [n, resolved, rows])
  const shown = rows.slice(0, n).map((r, i) => ({ ...r, state: r.s === 'waiting' && !resolved[i] ? 'waiting' : 'done' }))
  return {
    shown,
    done: shown.filter((r) => r.state === 'done').length,
    waiting: shown.filter((r) => r.state === 'waiting').length,
    queued: rows.length - n,
    latest: shown[shown.length - 1],
  }
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

// Split-flap text: characters settle left to right, the next few flicker
// through random glyphs first, the way a departures board lands a line. Runs
// again whenever the text changes (a status going from waiting to done).
export function useFlap(text, speed = 22) {
  const [out, setOut] = useState('')
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let i = 0
    const t = setInterval(() => {
      i += 1
      if (reduce || i >= text.length + 3) { setOut(text); clearInterval(t); return }
      const flicker = text.slice(i, i + 3).split('').map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join('')
      setOut(text.slice(0, i) + flicker)
    }, speed)
    return () => clearInterval(t)
  }, [text, speed])
  return out
}
