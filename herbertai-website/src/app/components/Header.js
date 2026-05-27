'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  if (pathname?.startsWith('/preview')) return null

  return (
    <header className="bg-cream">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
        <Link href="/" data-magnetic className="flex items-center gap-2.5 group">
          <svg
            aria-hidden
            viewBox="0 0 32 32"
            className="w-6 h-6 shrink-0"
            style={{ filter: 'drop-shadow(0 0 6px var(--green-glow))' }}
          >
            <rect width="32" height="32" rx="7" fill="#0A0A0A" />
            <text
              x="50%"
              y="24"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
              fontWeight="700"
              fontSize="22"
              letterSpacing="-1"
              fill="#F5F0E5"
              textAnchor="middle"
            >
              h
            </text>
            <circle cx="24.5" cy="8.5" r="2.4" fill="#00FF88" />
          </svg>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">herbert ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-ink">
          <DropdownLink label="Services">
            <DropItem href="/services#grow" title="Grow" sub="Ads, SEO, email, landing pages" />
            <DropItem href="/services#automate" title="Automate" sub="Voice agents, chatbots, workflows, CRM" />
            <DropItem href="/services#build" title="Build" sub="Websites, dashboards, custom systems" />
          </DropdownLink>
          <NavLink href="/industries">Industries</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            data-magnetic
            className="bg-ink text-cream px-4 py-2 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5 hover:bg-ink-soft transition-colors"
          >
            Get started <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          data-magnetic
          className="md:hidden text-ink"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 17h16" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileOverlay onClose={() => setMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  )
}

/* ─── desktop nav link with animated underline-fill on hover ──── */
function NavLink({ href, children }) {
  return (
    <Link href={href} data-magnetic className="relative group inline-block py-1">
      <span className="text-ink">{children}</span>
      <span
        aria-hidden
        className="absolute left-0 right-0 -bottom-0.5 h-px bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
    </Link>
  )
}

/* ─── desktop dropdown ────────────────────────────────────────── */
function DropdownLink({ label, children }) {
  return (
    <div className="relative group">
      <button data-magnetic className="flex items-center gap-1 py-1 text-ink">
        <span>{label}</span>
        <svg className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute left-0 top-full mt-3 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-cream border border-line rounded-2xl shadow-[0_8px_32px_rgba(10,10,10,0.06)] py-2">
          {children}
        </div>
      </div>
    </div>
  )
}

function DropItem({ href, title, sub }) {
  return (
    <Link href={href} className="block px-4 py-3 hover:bg-cream-alt transition-colors">
      <div className="font-medium text-ink text-[14px]">{title}</div>
      <div className="text-[12px] text-muted mt-0.5">{sub}</div>
    </Link>
  )
}

/* ─── mobile fullscreen overlay with big-type nav ─────────────── */
function MobileOverlay({ onClose }) {
  const links = [
    ['/services', 'Services'],
    ['/industries', 'Industries'],
    ['/pricing', 'Pricing'],
    ['/about', 'About'],
    ['/faq', 'FAQ'],
    ['/contact', 'Contact'],
  ]

  // body scroll lock + ESC to close
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-cream md:hidden"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
          <svg
            aria-hidden
            viewBox="0 0 32 32"
            className="w-6 h-6 shrink-0"
            style={{ filter: 'drop-shadow(0 0 6px var(--green-glow))' }}
          >
            <rect width="32" height="32" rx="7" fill="#0A0A0A" />
            <text
              x="50%"
              y="24"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
              fontWeight="700"
              fontSize="22"
              letterSpacing="-1"
              fill="#F5F0E5"
              textAnchor="middle"
            >
              h
            </text>
            <circle cx="24.5" cy="8.5" r="2.4" fill="#00FF88" />
          </svg>
          <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">herbert ai</span>
        </Link>
        <button onClick={onClose} className="text-ink" aria-label="Close menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="px-6 pt-6 flex flex-col gap-3">
        {links.map(([href, label], i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={href}
              onClick={onClose}
              className="block font-display text-[44px] sm:text-[56px] leading-[0.95] tracking-[-0.03em] text-ink"
              style={{ fontWeight: 800 }}
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 mt-10"
      >
        <Link
          href="/contact"
          onClick={onClose}
          className="bg-green text-ink px-6 py-3.5 rounded-full font-semibold text-[15px] inline-flex items-center gap-2"
        >
          Get started <span aria-hidden>→</span>
        </Link>
      </motion.div>
    </motion.div>
  )
}
