'use client'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  if (pathname?.startsWith('/preview')) return null

  return (
    <header className="bg-cream">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 lg:px-12 py-5">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-green shadow-[0_0_10px_var(--green-glow)]" />
          <span className="text-[18px] font-semibold tracking-[-0.02em] text-ink">herbertai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[14px] text-ink-soft">
          <DropdownLink label="Services">
            <DropItem href="/services#grow" title="Grow" sub="Ads, SEO, email, landing pages" />
            <DropItem href="/services#automate" title="Automate" sub="Voice agents, chatbots, workflows, CRM" />
            <DropItem href="/services#build" title="Build" sub="Websites, dashboards, custom systems" />
          </DropdownLink>

          <Link href="/industries" className="hover:opacity-60 transition-opacity">Industries</Link>
          <Link href="/case-studies" className="hover:opacity-60 transition-opacity">Case Studies</Link>
          <Link href="/pricing" className="hover:opacity-60 transition-opacity">Pricing</Link>
          <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
          <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="bg-ink text-cream px-4 py-2 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5 hover:bg-ink-soft transition-colors"
          >
            Get started <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-line py-5 px-6 space-y-1 text-[15px]">
          {[
            ['/services', 'Services'],
            ['/industries', 'Industries'],
            ['/case-studies', 'Case Studies'],
            ['/pricing', 'Pricing'],
            ['/about', 'About'],
            ['/faq', 'FAQ'],
            ['/contact', 'Contact'],
          ].map(([href, label]) => (
            <Link key={href} href={href} className="block py-2 text-ink-soft hover:text-ink" onClick={() => setMobileMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="pt-3">
            <Link
              href="/contact"
              className="bg-ink text-cream px-4 py-2.5 rounded-full text-[13px] font-medium inline-flex items-center gap-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get started <span aria-hidden>→</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}

function DropdownLink({ label, children }) {
  return (
    <div className="relative group">
      <button className="hover:opacity-60 transition-opacity flex items-center gap-1">
        {label}
        <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute left-0 top-full mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-cream border border-line rounded-2xl shadow-[0_8px_32px_rgba(10,10,10,0.06)] py-2">
          {children}
        </div>
      </div>
    </div>
  )
}

function DropItem({ href, title, sub }) {
  return (
    <Link href={href} className="block px-4 py-2.5 hover:bg-cream-alt transition-colors">
      <div className="font-medium text-ink text-[14px]">{title}</div>
      <div className="text-[12px] text-muted mt-0.5">{sub}</div>
    </Link>
  )
}

function DropDivider() {
  return <div className="my-2 border-t border-line" />
}
