'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

/**
 * Mounts Lenis smooth-scroll globally on the client.
 * Reason: art-direction register needs the elastic-feeling scroll;
 * native scrolling reads as utilitarian against godly-tier composition.
 *
 * Honours prefers-reduced-motion — Lenis is not initialised when set.
 */
export default function LenisProvider({ children }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false, // touch devices keep native momentum
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return children
}
