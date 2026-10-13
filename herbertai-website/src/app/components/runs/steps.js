'use client'
import { useEffect, useState } from 'react'

// A step counter for the example pages' visuals: once active it counts up to
// `total`, one step every `every` ms, and stops. Each visual derives what it
// shows from the step, so a step is a job finishing. With reduced motion it
// jumps straight to the finished state.
export function useSteps(active, total, every = 1300) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!active) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      const t = setTimeout(() => setN(total), 0)
      return () => clearTimeout(t)
    }
    const t = setInterval(() => setN((v) => (v >= total ? v : v + 1)), every)
    return () => clearInterval(t)
  }, [active, total, every])
  return n
}
