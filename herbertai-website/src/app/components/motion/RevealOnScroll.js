'use client'

import { motion } from 'framer-motion'

/**
 * Wrap any child element to fade + lift it into view as it enters the viewport.
 * Reason: subtle, used as connective tissue between sections — the *content*
 * (mockups, chapter openers) carries the signature motion; this is hygiene.
 *
 * Framer Motion honours prefers-reduced-motion automatically via its
 * MotionConfig + system-level reduce-motion handling — no extra logic needed
 * here beyond setting reasonable defaults.
 *
 * Props:
 *   - delay    seconds, default 0 (use for stagger inside a section)
 *   - y        initial Y offset in px, default 32
 *   - duration seconds, default 0.7
 *   - once     reveal once and stay, default true
 *   - className passes through
 *   - as       html element to render, default 'div'
 */
export default function RevealOnScroll({
  children,
  delay = 0,
  y = 32,
  duration = 0.7,
  once = true,
  className,
  as = 'div',
  ...rest
}) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -10% 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
