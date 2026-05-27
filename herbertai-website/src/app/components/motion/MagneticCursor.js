'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom magnetic cursor — replaces system cursor on hover-capable devices.
 * Reason (locked in CHARTER.md): signals operator-grade craft at every interactive
 * surface — buyers feel the difference before reading a word.
 *
 * Behaviour:
 *   - Small green dot follows the cursor via spring.
 *   - On hover over [data-magnetic] elements, dot scales up + pulls toward the
 *     element centre (magnetic attraction).
 *   - Hidden entirely on coarse pointers (touch) or prefers-reduced-motion.
 */

function subscribeMQ(query) {
  return (callback) => {
    if (typeof window === 'undefined') return () => {}
    const mql = window.matchMedia(query)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
  }
}

function useMediaQuery(query) {
  return useSyncExternalStore(
    subscribeMQ(query),
    () => window.matchMedia(query).matches,
    () => false, // server snapshot — never enabled during SSR
  )
}

export default function MagneticCursor() {
  const supportsHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const enabled = supportsHover && !reducedMotion

  const [hovering, setHovering] = useState(false)
  const targetRef = useRef(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  // tight, near-1:1 tracking — premium-feeling without jitter
  const cursorX = useSpring(mouseX, { damping: 45, stiffness: 900, mass: 0.12 })
  const cursorY = useSpring(mouseY, { damping: 45, stiffness: 900, mass: 0.12 })

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('magnetic-cursor-active')

    function handleMove(e) {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        // subtle drift toward element centre — 25% pull, 75% follow mouse
        // (was 60/40 — too locked on bigger targets like CTAs)
        mouseX.set(cx * 0.25 + e.clientX * 0.75)
        mouseY.set(cy * 0.25 + e.clientY * 0.75)
      } else {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      }
    }
    function handleOver(e) {
      const magnetic = e.target.closest('[data-magnetic]')
      if (magnetic) {
        targetRef.current = magnetic
        setHovering(true)
      }
    }
    function handleOut(e) {
      const magnetic = e.target.closest('[data-magnetic]')
      if (magnetic && !magnetic.contains(e.relatedTarget)) {
        targetRef.current = null
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      document.body.classList.remove('magnetic-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [enabled, mouseX, mouseY])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
        width: hovering ? 48 : 14,
        height: hovering ? 48 : 14,
        background: hovering ? 'transparent' : '#00FF88',
        border: hovering ? '1.5px solid #00FF88' : '0',
        // difference blend always — visible on cream, green CTAs, ink panels alike
        mixBlendMode: 'difference',
        transition: 'width 220ms ease, height 220ms ease, background 220ms ease, border 220ms ease',
      }}
    />
  )
}
