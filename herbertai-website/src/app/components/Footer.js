'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const managerUrl = process.env.NEXT_PUBLIC_MANAGER_DASHBOARD_URL
const ownerUrl = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL

const NAV_COLS = [
  {
    label: 'Studio',
    links: [
      ['/services', 'Services'],
      ['/industries', 'Industries'],
      ['/pricing', 'Pricing'],
      ['/about', 'About'],
    ],
  },
  {
    label: 'Talk',
    links: [
      ['/start', 'Start a project'],
      ['/contact', 'Book a call'],
      ['/faq', 'FAQ'],
      ['mailto:hello@herbert-aisolutions.com', 'hello@herbert-aisolutions.com'],
    ],
  },
]

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/preview')) return null

  return (
    <footer className="bg-cream border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-10">

        {/* Big typographic anchor */}
        <div
          aria-hidden
          className="font-display text-ink leading-[0.88] tracking-[-0.04em] font-bold"
          style={{ fontSize: 'var(--text-display-md)' }}
        >
          Built to run itself<span className="text-green-deep">.</span>
        </div>

        {/* Divider */}
        <div className="mt-16 lg:mt-24 pt-10 border-t border-line grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Identity */}
          <div className="max-w-[36ch]">
            <Link href="/" data-magnetic className="inline-flex items-center gap-2.5 mb-5">
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
              <span className="text-[16px] font-semibold tracking-[-0.02em] text-ink">herbert ai</span>
            </Link>
            <p className="text-muted text-[14px] leading-[1.6] max-w-md">
              Adelaide-based automation &amp; growth studio for SMBs.
              Custom-built systems &mdash; ads, websites, dashboards, voice agents,
              workflows. Shipped in weeks, owned by you.
            </p>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <FooterNavCol key={col.label} label={col.label} links={col.links} />
          ))}

          {/* Portals (env-gated) */}
          {(managerUrl || ownerUrl) && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">
                Portals
              </div>
              <ul className="space-y-2.5">
                {managerUrl && (
                  <li>
                    <Link href={managerUrl} data-magnetic className="text-[14px] text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5 group">
                      Manager portal
                      <span aria-hidden className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
                    </Link>
                  </li>
                )}
                {ownerUrl && (
                  <li>
                    <Link href={ownerUrl} data-magnetic className="text-[14px] text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5 group">
                      Owner console
                      <span aria-hidden className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom strip */}
        <div className="mt-16 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          <span>© {new Date().getFullYear()} Herbert AI</span>
          <span>Adelaide &middot; South Australia</span>
        </div>
      </div>
    </footer>
  )
}

function FooterNavCol({ label, links }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">
        {label}
      </div>
      <ul className="space-y-2.5">
        {links.map(([href, text]) => {
          const external = href.startsWith('mailto:') || href.startsWith('http')
          return (
            <li key={href}>
              <Link
                href={href}
                data-magnetic
                className="text-[14px] text-ink-soft hover:text-ink transition-colors inline-block"
              >
                {text}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
