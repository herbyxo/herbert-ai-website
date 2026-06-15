'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const managerUrl = process.env.NEXT_PUBLIC_MANAGER_DASHBOARD_URL
const ownerUrl = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL

const NAV_COLS = [
  {
    label: 'Work',
    links: [
      ['/services', 'Services'],
      // ['/case-studies', 'Work'], // hidden until case studies are fleshed out
      ['/web-design-adelaide', 'Web Design Adelaide'],
      ['/ai-receptionist', 'AI Receptionist'],
      ['/automation-adelaide', 'Automation Adelaide'],
      ['/google-ads-adelaide', 'Google Ads Adelaide'],
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

        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Identity — wordmark heads the descriptor column */}
          <div className="max-w-[36ch]">
            <Link href="/" data-magnetic aria-label="Herbert AI — home" className="inline-flex items-baseline gap-2 group mb-6">
              <span
                className="font-display text-ink leading-[0.9] tracking-[-0.03em] font-bold"
                style={{ fontSize: '32px' }}
              >
                herbert ai
              </span>
              <span
                className="rounded-full bg-green shrink-0"
                style={{ width: '0.4em', height: '0.4em', boxShadow: '0 0 16px var(--green-glow)' }}
              />
            </Link>
            <p className="text-muted text-[14px] leading-[1.6] max-w-md">
              Adelaide-based automation &amp; growth for SMBs.
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
          <span className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link>
            <span>Adelaide &middot; South Australia</span>
            <a href="tel:+61448111840" className="hover:text-ink transition-colors">0448 111 840</a>
          </span>
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
