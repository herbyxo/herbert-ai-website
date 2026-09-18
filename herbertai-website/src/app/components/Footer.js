'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const managerUrl = process.env.NEXT_PUBLIC_MANAGER_DASHBOARD_URL
const ownerUrl = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL

// The footer carries the ladder (Work), the ways in (Talk) and the pages that
// stay live for search but not in the nav (Also): the receptionist, web design
// and Google Ads pages sit on demand that exists and keep their ranking equity
// out of the spine. Decided 16 Sep 2026, docs/restructure-2026-09/PROJECT.md.
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
    <footer className="bg-cream border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-24 pb-10">

        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          {/* Identity */}
          <div className="max-w-[36ch]">
            <Link href="/" aria-label="Herbert AI, home" className="inline-flex items-baseline gap-2 group mb-6">
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
              Custom software and AI for small businesses, built in Adelaide.
              One builder, from the free audit to the system your business runs
              on. You own what gets built.
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
