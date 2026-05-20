'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const managerUrl = process.env.NEXT_PUBLIC_MANAGER_DASHBOARD_URL
const ownerUrl = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/preview')) return null

  return (
    <footer className="bg-cream border-t border-line">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green shadow-[0_0_10px_var(--green-glow)]" />
              <span className="text-[18px] font-semibold tracking-[-0.02em] text-ink">herbertai</span>
            </Link>
            <p className="text-muted text-[14px] max-w-md">
              Automation &amp; growth studio for SMBs. Custom ads, websites, dashboards, voice agents, and workflow automation — built bespoke by Will Herbert in Adelaide.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[14px] text-ink-soft">
            <Link href="/services" className="hover:opacity-60 transition">Services</Link>
            <Link href="/pricing" className="hover:opacity-60 transition">Pricing</Link>
            <Link href="/industries" className="hover:opacity-60 transition">Industries</Link>
            <Link href="/about" className="hover:opacity-60 transition">About</Link>
            <Link href="/contact" className="hover:opacity-60 transition">Contact</Link>
            {managerUrl && (
              <Link href={managerUrl} className="hover:opacity-60 transition">Manager portal</Link>
            )}
            {ownerUrl && (
              <Link href={ownerUrl} className="hover:opacity-60 transition">Owner console</Link>
            )}
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[12px] text-muted font-mono uppercase tracking-[0.12em]">
          <span>© {new Date().getFullYear()} Herbert AI</span>
          <span>Adelaide · South Australia</span>
        </div>
      </div>
    </footer>
  )
}
