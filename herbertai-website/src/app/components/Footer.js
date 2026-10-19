'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const managerUrl = process.env.NEXT_PUBLIC_MANAGER_DASHBOARD_URL
const ownerUrl = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL

// The footer carries the ladder (Work), the ways in (Talk) and the pages that
// stay live for search but not in the nav (Also): the receptionist, web design
// and Google Ads pages sit on demand that exists and keep their ranking equity
// out of the spine. Decided 16 Sep 2026, docs/restructure-2026-09/PROJECT.md.
// Phase 4 of the site design pass (20 Oct 2026, Will: "fix footer"): the
// header's mark and Geist name in place of the display-font wordmark and its
// glowing dot, and the ground follows the header (paper on the homepage, cream
// on pages still in the May register until phase 7 redoes them).
const NAV_COLS = [
  {
    label: 'Work',
    links: [
      ['/pilot', 'How it works'],
      ['/services', 'What gets built'],
      ['/work', 'The systems'],
      ['/industries', 'Industries'],
      ['/pricing', 'Pricing'],
      ['/about', 'About'],
    ],
  },
  {
    label: 'Talk',
    links: [
      ['/pilot#book', 'Book a free AI audit'],
      ['/start', 'Start a project'],
      ['/contact', 'Contact'],
      ['/faq', 'FAQ'],
      ['mailto:hello@herbert-aisolutions.com', 'hello@herbert-aisolutions.com'],
    ],
  },
  {
    label: 'Also',
    links: [
      ['/ai-receptionist', 'AI receptionist'],
      ['/web-design-adelaide', 'Web design Adelaide'],
      ['/google-ads-adelaide', 'Google Ads Adelaide'],
    ],
  },
]

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/preview') || pathname?.startsWith('/lp/') || pathname?.startsWith('/demo/') || pathname?.startsWith('/lab')) return null

  return (
    <footer className={pathname === '/' ? 'bg-[#FAFAF8] border-t border-[#111]/10' : 'bg-cream border-t border-line'}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-10">

        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Identity */}
          <div className="max-w-[36ch]">
            <Link href="/" aria-label="Herbert AI, home" className="inline-flex items-center gap-2.5 mb-5">
              <svg aria-hidden viewBox="0 0 32 32" className="w-6 h-6 shrink-0">
                <rect width="32" height="32" rx="7" fill="#0A0A0A" />
                <text x="50%" y="24" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-1" fill="#F5F0E5" textAnchor="middle">h</text>
                <circle cx="24.5" cy="8.5" r="2.4" fill="#00FF88" />
              </svg>
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">Herbert AI</span>
            </Link>
            <p className="text-muted text-[14px] leading-[1.6] max-w-md">
              Custom software and AI for small businesses, built in Adelaide.
              You own what gets built.
            </p>
          </div>

          {NAV_COLS.map((col) => (
            <FooterNavCol key={col.label} label={col.label} links={col.links} />
          ))}

          {(managerUrl || ownerUrl) && (
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted mb-4">
                Portals
              </div>
              <ul className="space-y-2.5">
                {managerUrl && (
                  <li>
                    <Link href={managerUrl} className="text-[14px] text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5 group">
                      Manager portal
                      <span aria-hidden className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
                    </Link>
                  </li>
                )}
                {ownerUrl && (
                  <li>
                    <Link href={ownerUrl} className="text-[14px] text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5 group">
                      Owner console
                      <span aria-hidden className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

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
        {links.map(([href, text]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[14px] text-ink-soft hover:text-ink transition-colors inline-block"
            >
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
