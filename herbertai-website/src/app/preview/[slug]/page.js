import { getLead, leads, PALETTES } from '../leads'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  return leads.map(l => ({ slug: l.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const lead = getLead(slug)
  if (!lead) return {}
  return {
    title: `${lead.biz} — Free Website Mockup`,
    description: `A free website mockup built for ${lead.biz} by Herbert AI.`,
    robots: 'noindex',
  }
}

export default async function PreviewPage({ params }) {
  const { slug } = await params
  const lead = getLead(slug)
  if (!lead) notFound()

  const tel = lead.phone.replace(/\s/g, '')
  const tradeLabel = lead.trade === 'Electrician' ? 'Electrician' : 'Plumber'

  const p = PALETTES[lead.palette] ?? PALETTES['sparky-classic']

  // CSS variables on the page root
  const styleVars = {
    '--p-bg': p.bg,
    '--p-bg-alt': p.bgAlt,
    '--p-ink': p.ink,
    '--p-ink-soft': p.inkSoft,
    '--p-muted': p.muted,
    '--p-line': p.line,
    '--p-card': p.card,
    '--p-accent': p.accent,
    '--p-accent-deep': p.accentDeep,
    '--p-accent-text': p.accentText,
    '--p-accent-glow': p.accentGlow,
    fontFamily: 'var(--font-inter-tight), -apple-system, sans-serif',
  }

  // Pull initials for the owner monogram (or business mark when no owner)
  const monogram = (lead.owner || lead.biz)
    .replace(/[^A-Za-z\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div style={styleVars} className="min-h-screen bg-[var(--p-bg)] text-[var(--p-ink)]">

      {/* ── Disclosure banner (Herbert AI brand) ──────────────────── */}
      <div className="bg-ink text-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px]">
          <p className="text-white/70 text-center sm:text-left">
            <span className="text-green mr-1">●</span> Hey — I&apos;m <span className="text-white font-semibold">Will from Herbert AI</span>. I built this free mockup for {lead.biz}. No obligation.
          </p>
          <Link href="/contact" className="shrink-0 bg-green text-ink font-semibold text-[12px] px-4 py-1.5 rounded-full hover:shadow-[0_0_24px_var(--green-glow)] transition-shadow">
            Claim this site →
          </Link>
        </div>
      </div>

      {/* ── Header (lead's brand) ─────────────────────────────────── */}
      <header
        className="border-b sticky top-0 z-10"
        style={{ borderColor: 'var(--p-line)', background: 'var(--p-bg)' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ background: 'var(--p-accent)' }} />
            <span className="text-[18px] font-bold tracking-[-0.02em]">{lead.biz}</span>
            <span className="hidden md:inline ml-3 text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: 'var(--p-muted)' }}>
              {p.label}
            </span>
          </div>
          <a
            href={`tel:${tel}`}
            className="px-5 py-2.5 rounded-md text-[15px] md:text-[17px] font-bold inline-flex items-center gap-2 tracking-[-0.01em] transition-transform hover:-translate-y-px"
            style={{ background: 'var(--p-accent)', color: 'var(--p-accent-text)' }}
          >
            <PhoneIcon /> {lead.phone}
          </a>
        </div>
      </header>

      {/* ── Hero (asymmetric: text left, trade-color block right) ── */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-20 grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-[11px] md:text-[12px] uppercase tracking-[0.22em] font-semibold mb-7" style={{ color: 'var(--p-accent-deep)' }}>
            <span className="inline-block w-8 h-px align-middle mr-3" style={{ background: 'var(--p-accent-deep)' }} />
            {lead.eyebrow}
          </p>

          <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-extrabold leading-[0.96] tracking-[-0.035em] mb-7 max-w-[14ch]">
            {lead.hero}
          </h1>

          <p className="text-[18px] md:text-[20px] leading-[1.5] max-w-[52ch] mb-10 font-medium" style={{ color: 'var(--p-muted)' }}>
            {lead.tagline}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            <a
              href={`tel:${tel}`}
              className="px-7 py-4 rounded-md font-bold text-[16px] inline-flex items-center gap-2.5 transition-transform hover:-translate-y-px"
              style={{ background: 'var(--p-accent)', color: 'var(--p-accent-text)', boxShadow: `0 8px 24px var(--p-accent-glow)` }}
            >
              <PhoneIcon /> Call now · {lead.phone}
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 rounded-md font-semibold text-[15px] inline-flex items-center gap-2 border-2 transition-colors"
              style={{ borderColor: 'var(--p-ink)', color: 'var(--p-ink)' }}
            >
              Get a fixed-price quote
            </a>
          </div>
        </div>

        {/* Right column — trade-color block with stamp */}
        <div className="hidden lg:flex items-center justify-center">
          <div
            className="relative w-full aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
            style={{ background: 'var(--p-ink)' }}
          >
            {/* subtle pattern */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle, var(--p-accent) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            {/* monogram badge */}
            <div className="relative flex flex-col items-center text-center px-10">
              <div
                className="w-44 h-44 rounded-full flex items-center justify-center mb-8 ring-1 ring-inset"
                style={{ background: 'var(--p-accent)', color: 'var(--p-accent-text)', '--tw-ring-color': 'var(--p-accent-deep)' }}
              >
                <span className="text-[80px] font-extrabold tracking-[-0.04em] leading-none">{monogram}</span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: 'var(--p-accent)' }}>
                — Adelaide —
              </p>
              <p className="text-[20px] font-bold tracking-[-0.02em]" style={{ color: 'var(--p-bg)' }}>
                {lead.biz}
              </p>
              <p className="text-[12px] uppercase tracking-[0.16em] font-medium mt-1" style={{ color: p.muted.startsWith('rgba') ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.6)' }}>
                {p.label}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust strip ───────────────────────────────────────────── */}
      <div className="border-t border-b" style={{ borderColor: 'var(--p-line)', background: 'var(--p-bg-alt)' }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-5 flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.16em] font-semibold" style={{ color: 'var(--p-ink-soft)' }}>
          <span>{lead.yearsLabel}</span>
          <span className="hidden md:inline" style={{ color: 'var(--p-muted)' }}>•</span>
          <span>Licensed &amp; Insured</span>
          <span className="hidden md:inline" style={{ color: 'var(--p-muted)' }}>•</span>
          <span>Available 24 / 7</span>
          <span className="hidden md:inline" style={{ color: 'var(--p-muted)' }}>•</span>
          <span>No call-out fee</span>
          <span className="hidden md:inline" style={{ color: 'var(--p-muted)' }}>•</span>
          <span>Family-owned</span>
        </div>
      </div>

      {/* ── Services ──────────────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-32">
        <div className="mb-14 max-w-[44ch]">
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--p-accent-deep)' }}>
            <span className="inline-block w-8 h-px align-middle mr-3" style={{ background: 'var(--p-accent-deep)' }} />
            What we do
          </p>
          <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.04] tracking-[-0.03em]">
            {lead.trade === 'Electrician' ? 'Electrical work, done by tradies who care.' : 'Plumbing work, done by tradies who care.'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lead.services.map((s, i) => (
            <div
              key={i}
              className="rounded-xl p-7 border h-full"
              style={{ background: 'var(--p-card)', borderColor: 'var(--p-line)' }}
            >
              <div className="flex items-center gap-2 mb-7">
                <span className="w-7 h-7 rounded-md flex items-center justify-center text-[12px] font-bold tracking-[-0.02em]" style={{ background: 'var(--p-accent)', color: 'var(--p-accent-text)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-[19px] font-bold tracking-[-0.02em] mb-2 leading-[1.2]">{s.title}</h3>
              <p className="text-[14px] leading-[1.55]" style={{ color: 'var(--p-muted)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Owner story (only when owner data exists) ────────────── */}
      {lead.owner && (
        <section style={{ background: 'var(--p-ink)', color: 'var(--p-bg)' }}>
          <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-center">
            <div className="flex justify-center md:justify-start">
              <div
                className="w-56 h-56 rounded-full flex items-center justify-center"
                style={{ background: 'var(--p-accent)', color: 'var(--p-accent-text)' }}
              >
                <span className="text-[100px] font-extrabold tracking-[-0.04em] leading-none">
                  {lead.owner[0].toUpperCase()}
                </span>
              </div>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--p-accent)' }}>
                <span className="inline-block w-8 h-px align-middle mr-3" style={{ background: 'var(--p-accent)' }} />
                The owner
              </p>
              <h2 className="text-[32px] md:text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6">
                Hi, I&apos;m {lead.owner}.
              </h2>
              <p className="text-[17px] md:text-[19px] leading-[1.55] mb-6 max-w-[52ch]" style={{ color: 'rgba(255,255,255,0.75)' }}>
                I&apos;ve been running {lead.biz} as a {tradeLabel.toLowerCase()} across Adelaide for years.
                When you call, you&apos;ll talk to me — not a call centre. I take pride in showing up
                on time, doing the job properly, and standing behind the work.
              </p>
              <p className="text-[15px] font-bold tracking-[-0.01em]" style={{ color: 'var(--p-accent)' }}>
                — {lead.owner}, Owner &amp; Lead {tradeLabel}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Reviews ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--p-bg-alt)', borderTop: `1px solid var(--p-line)`, borderBottom: `1px solid var(--p-line)` }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--p-accent-deep)' }}>
            <span className="inline-block w-8 h-px align-middle mr-3" style={{ background: 'var(--p-accent-deep)' }} />
            Reviews
          </p>

          {lead.realReview ? (
            <>
              <div className="flex items-center gap-3 mb-8">
                <Stars color={p.accentDeep} />
                <span className="text-[14px] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--p-ink)' }}>
                  5.0 stars on Google
                </span>
              </div>
              <blockquote className="max-w-[64ch]">
                <p className="text-[24px] md:text-[34px] leading-[1.3] font-bold tracking-[-0.02em] mb-6">
                  &ldquo;{lead.realReview.text}&rdquo;
                </p>
                <footer className="text-[13px] uppercase tracking-[0.16em] font-semibold" style={{ color: 'var(--p-muted)' }}>
                  — {lead.realReview.name}
                </footer>
              </blockquote>
            </>
          ) : (
            <div className="max-w-[60ch]">
              <h2 className="text-[32px] md:text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-4">
                Real Google reviews go here.
              </h2>
              <p className="text-[16px] leading-[1.55]" style={{ color: 'var(--p-muted)' }}>
                When your site goes live, your real Google reviews pull in automatically — keeping the social proof up to date without you lifting a finger.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Suburbs served ────────────────────────────────────────── */}
      <section className="max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-28">
        <div className="grid md:grid-cols-[1fr_1.6fr] gap-10 md:gap-20 items-start">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--p-accent-deep)' }}>
              <span className="inline-block w-8 h-px align-middle mr-3" style={{ background: 'var(--p-accent-deep)' }} />
              Where we work
            </p>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-3">
              Adelaide metro &amp; surrounds.
            </h2>
            <p className="text-[15px] leading-[1.55]" style={{ color: 'var(--p-muted)' }}>
              Servicing your suburb? Call to confirm — we&apos;re mobile across Adelaide.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {lead.suburbs.map(s => (
              <span
                key={s}
                className="px-3.5 py-1.5 rounded-full border text-[13px] font-medium"
                style={{ borderColor: 'var(--p-line)', background: 'var(--p-card)', color: 'var(--p-ink-soft)' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Herbert AI section (DARK + NEON GREEN — contrasts) ──── */}
      <section className="px-6 lg:px-12 py-24 md:py-32 max-w-[1320px] mx-auto">
        <div className="bg-ink text-white rounded-[28px] p-8 md:p-16 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center relative overflow-hidden">
          <div className="hero-blob absolute bottom-[-160px] left-[-160px] w-[420px] h-[420px] pointer-events-none" />

          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55 mb-7 flex items-center gap-3">
              <span className="w-8 h-px bg-green" />
              <span className="w-1.5 h-1.5 rounded-full bg-green hi-pulse" />
              AI Voice Receptionist · included
            </p>
            <h2 className="text-[36px] md:text-[48px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5 max-w-[18ch]">
              Never miss <span className="text-green">another</span> job while you&apos;re on the tools.
            </h2>
            <p className="text-white/70 text-[16px] leading-[1.6] mb-6 max-w-[48ch]">
              {lead.biz} answers every call automatically — 24/7. Qualifies the job,
              books it in, and SMSs you the details. You finish what you&apos;re doing,
              the AI handles the phone.
            </p>
            <ul className="space-y-2.5 text-[14px] text-white/80">
              <li className="flex items-center gap-2.5"><span className="text-green">✓</span> Answers calls 24/7 in your business name</li>
              <li className="flex items-center gap-2.5"><span className="text-green">✓</span> Qualifies jobs and books appointments</li>
              <li className="flex items-center gap-2.5"><span className="text-green">✓</span> SMS confirms to customer and you</li>
              <li className="flex items-center gap-2.5"><span className="text-green">✓</span> Escalates emergencies to your mobile</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/15 rounded-2xl p-6 relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-green hi-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">Real call recording</span>
            </div>
            <p className="text-[14px] font-medium mb-1">Hear it for yourself</p>
            <p className="text-[12px] text-white/50 mb-5">Refrigerant leak callout · qualified &amp; booked end-to-end</p>
            <audio controls preload="metadata" className="w-full" style={{ filter: 'invert(0.85)' }}>
              <source src="/steve-demo.wav" type="audio/wav" />
            </audio>
            <p className="text-[11px] text-white/40 mt-4 italic">Imagine this answering for {lead.biz}.</p>
          </div>
        </div>
      </section>

      {/* ── Contact (centered, phone is the loudest element) ────── */}
      <section
        id="contact"
        style={{ background: 'var(--p-ink)', color: 'var(--p-bg)' }}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-32 text-center">
          <p className="text-[11px] uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: 'var(--p-accent)' }}>
            <span className="inline-block w-8 h-px align-middle mr-3" style={{ background: 'var(--p-accent)' }} />
            Get in touch
          </p>
          <h2 className="text-[32px] md:text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-3">
            Ready when you are.
          </h2>
          <p className="text-[15px] mb-10" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Call us — we pick up.
          </p>

          <a
            href={`tel:${tel}`}
            className="inline-flex items-center gap-3 text-[44px] md:text-[64px] font-extrabold tracking-[-0.04em] transition-transform hover:-translate-y-px"
            style={{ color: 'var(--p-accent)' }}
          >
            <PhoneIcon className="w-10 h-10 md:w-14 md:h-14" /> {lead.phone}
          </a>

          <p className="text-[12px] uppercase tracking-[0.18em] font-semibold mt-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {lead.suburb} · South Australia · ABN registered · Licensed &amp; Insured
          </p>
        </div>
      </section>

      {/* ── Herbert AI footer ─────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
          <p className="text-white/55">
            This is a <span className="text-white font-medium">free mockup</span> built by{' '}
            <Link href="/" className="text-green font-semibold hover:underline">Herbert AI</Link>.
            The real site &amp; AI receptionist can be live in days.
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-green text-ink font-semibold text-[12px] px-5 py-2 rounded-full hover:shadow-[0_0_24px_var(--green-glow)] transition-shadow"
          >
            Get yours →
          </Link>
        </div>
      </div>

    </div>
  )
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function Stars({ color }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <svg key={n} className="w-5 h-5" viewBox="0 0 24 24" fill={color}>
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  )
}

function PhoneIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}
