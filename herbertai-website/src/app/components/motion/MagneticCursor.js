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
  const cursorX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.4 })
  const cursorY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.4 })

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('magnetic-cursor-active')

    function handleMove(e) {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        // 60% pull toward centre, 40% follow mouse
        mouseX.set(cx * 0.6 + e.clientX * 0.4)
        mouseY.set(cy * 0.6 + e.clientY * 0.4)
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
        width: hovering ? 56 : 14,
        height: hovering ? 56 : 14,
        background: hovering ? 'rgba(0, 255, 136, 0.18)' : '#00FF88',
        border: hovering ? '1px solid rgba(0, 255, 136, 0.6)' : '0',
        mixBlendMode: hovering ? 'normal' : 'difference',
        transition: 'width 220ms ease, height 220ms ease, background 220ms ease',
      }}
    />
  )
}
