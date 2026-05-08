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
  const heroSubject = lead.trade === 'Electrician' ? 'electrical' : 'plumbing'

  const p = PALETTES[lead.palette] ?? PALETTES['cream-amber']
  const isDark = p.mode === 'dark'

  // CSS variables set on the page root — used throughout via bg-[var(--p-bg)] etc.
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
    '--p-accent-glow': p.accentGlow,
  }

  return (
    <div
      style={styleVars}
      className="min-h-screen font-sans bg-[var(--p-bg)] text-[var(--p-ink)]"
    >

      {/* ── Disclosure banner (Herbert AI brand) ──────────────────── */}
      <div className="bg-ink text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px]">
          <p className="text-white/70 text-center sm:text-left">
            <span className="text-green mr-1">●</span> Hey — I&apos;m <span className="text-white font-semibold">Will from Herbert AI</span>. I built this free mockup for {lead.biz}. No obligation.
          </p>
          <Link href="/contact" className="shrink-0 bg-green text-ink font-semibold text-[12px] px-4 py-1.5 rounded-full hover:shadow-[0_0_24px_var(--green-glow)] transition-shadow">
            Claim this site →
          </Link>
        </div>
      </div>

      {/* ── Mockup nav (lead's brand) ─────────────────────────────── */}
      <header
        className="border-b sticky top-0 z-10"
        style={{ borderColor: 'var(--p-line)', background: 'var(--p-bg)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <div>
            <span className="text-[18px] font-semibold tracking-[-0.02em]">{lead.biz}</span>
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: 'var(--p-muted)' }}>
              Licensed {tradeLabel} · {lead.suburb}, SA
            </span>
          </div>
          <a
            href={`tel:${tel}`}
            className="px-4 py-2 rounded-full text-[13px] font-medium inline-flex items-center gap-2 transition-colors"
            style={{ background: 'var(--p-ink)', color: 'var(--p-bg)' }}
          >
            <PhoneIcon /> {lead.phone}
          </a>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="px-6 lg:px-12 py-6 max-w-[1280px] mx-auto">
        {isDark ? <HeroDark lead={lead} tel={tel} /> : <HeroLight lead={lead} tel={tel} />}
      </section>

      {/* ── Services ──────────────────────────────────────────────── */}
      <section style={{ background: 'var(--p-bg-alt)', borderTop: `1px solid var(--p-line)`, borderBottom: `1px solid var(--p-line)` }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="mb-16">
            <Eyebrow palette={p}>What we do</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] max-w-[16ch]" style={{ color: 'var(--p-ink)' }}>
              Quality {heroSubject} work, <span className="serif-em" style={{ color: 'var(--p-accent-deep)' }}>done right.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {lead.services.map((s, i) => (
              <div
                key={i}
                className="rounded-3xl p-8 border"
                style={{ background: 'var(--p-card)', borderColor: 'var(--p-line)' }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--p-accent-deep)' }} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--p-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-[22px] font-medium tracking-[-0.02em] mb-2" style={{ color: 'var(--p-ink)' }}>{s.title}</h3>
                <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--p-muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ─────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
        <div>
          <Eyebrow palette={p}>Why choose us</Eyebrow>
          <h2 className="text-[40px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] max-w-[18ch]" style={{ color: 'var(--p-ink)' }}>
            Built on <span className="serif-em" style={{ color: 'var(--p-accent-deep)' }}>trust,</span> not promises.
          </h2>
        </div>
        <div className="grid gap-8 pt-1">
          <FeaturePoint palette={p} n="01" title="Fast response">
            We pick up, show up, and get the job done. No chasing, no waiting around.
          </FeaturePoint>
          <FeaturePoint palette={p} n="02" title="Licensed &amp; insured">
            Fully licensed {tradeLabel.toLowerCase()} with public liability insurance on every job.
          </FeaturePoint>
          <FeaturePoint palette={p} n="03" title={`${lead.suburb} local`}>
            Based locally. We know the area, and we&apos;re never far away.
          </FeaturePoint>
        </div>
      </section>

      {/* ── Reviews ───────────────────────────────────────────────── */}
      <section style={{ background: 'var(--p-bg-alt)', borderTop: `1px solid var(--p-line)`, borderBottom: `1px solid var(--p-line)` }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <Eyebrow palette={p}>Reviews</Eyebrow>
          <h2 className="text-[36px] md:text-[44px] font-medium leading-[1.05] tracking-[-0.03em] mb-3 max-w-[18ch]" style={{ color: 'var(--p-ink)' }}>
            What customers <span className="serif-em" style={{ color: 'var(--p-accent-deep)' }}>say.</span>
          </h2>
          <div className="flex items-center gap-2 mb-12">
            <Stars color={p.accentDeep} />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] ml-2" style={{ color: 'var(--p-muted)' }}>5.0 on Google</span>
          </div>
          {lead.realReview ? (
            <blockquote
              className="rounded-3xl p-10 md:p-14 border max-w-[56ch]"
              style={{ background: 'var(--p-card)', borderColor: 'var(--p-line)' }}
            >
              <p className="text-[20px] md:text-[24px] leading-[1.4] tracking-[-0.01em] mb-6" style={{ color: 'var(--p-ink)' }}>
                <span className="serif-em" style={{ color: 'var(--p-accent-deep)' }}>&ldquo;</span>{lead.realReview.text}<span className="serif-em" style={{ color: 'var(--p-accent-deep)' }}>&rdquo;</span>
              </p>
              <footer className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: 'var(--p-muted)' }}>
                — {lead.realReview.name}
              </footer>
            </blockquote>
          ) : (
            <div
              className="rounded-3xl p-10 md:p-14 border max-w-[56ch]"
              style={{ background: 'var(--p-card)', borderColor: 'var(--p-line)' }}
            >
              <p className="text-[15px] italic mb-2" style={{ color: 'var(--p-muted)' }}>Your real Google reviews would appear here.</p>
              <p className="text-[13px]" style={{ color: 'var(--p-muted)' }}>We pull them in automatically when your site goes live.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Never miss a call (Herbert AI BRAND — neon green) ───── */}
      <section className="px-6 lg:px-12 py-24 md:py-32 max-w-[1280px] mx-auto">
        <div className="bg-ink text-white rounded-[32px] p-8 md:p-16 grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center relative overflow-hidden">
          <div className="hero-blob absolute bottom-[-160px] left-[-160px] w-[420px] h-[420px] pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
              <span className="w-8 h-px bg-green" />
              <span className="w-1.5 h-1.5 rounded-full bg-green hi-pulse" />
              AI Voice Receptionist · included
            </div>
            <h2 className="text-[36px] md:text-[48px] font-medium leading-[1.05] tracking-[-0.03em] mb-5 max-w-[18ch]">
              Never miss <span className="serif-em text-green">another</span> job while you&apos;re on the tools.
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

      {/* ── Contact ───────────────────────────────────────────────── */}
      <section
        id="contact"
        style={{ background: 'var(--p-bg-alt)', borderTop: `1px solid var(--p-line)` }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 text-center">
          <Eyebrow palette={p} center>Get in touch</Eyebrow>
          <h2 className="text-[40px] md:text-[64px] font-medium leading-[1.02] tracking-[-0.03em] mb-5 max-w-[20ch] mx-auto" style={{ color: 'var(--p-ink)' }}>
            Ready when <span className="serif-em" style={{ color: 'var(--p-accent-deep)' }}>you are.</span>
          </h2>
          <p className="text-[16px] leading-[1.6] mb-10 max-w-[44ch] mx-auto" style={{ color: 'var(--p-muted)' }}>
            Call or message — we&apos;ll get back to you fast.
          </p>
          <a
            href={`tel:${tel}`}
            className="px-8 py-4 rounded-full font-semibold text-[18px] inline-flex items-center gap-3 transition-colors"
            style={{ background: 'var(--p-ink)', color: 'var(--p-bg)' }}
          >
            <PhoneIcon /> {lead.phone}
          </a>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] mt-6" style={{ color: 'var(--p-muted)' }}>
            {lead.suburb} · South Australia
          </p>
        </div>
      </section>

      {/* ── Herbert AI footer ─────────────────────────────────────── */}
      <div className="bg-ink text-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
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

/* ─── Hero variants ───────────────────────────────────────────────── */

function HeroLight({ lead, tel }) {
  // light palette: contained dark hero card on light page
  return (
    <div
      className="rounded-[32px] p-8 md:p-16 lg:p-22 relative overflow-hidden text-white"
      style={{ background: 'var(--p-ink)' }}
    >
      <div
        className="absolute top-[-120px] right-[-120px] w-[480px] h-[480px] pointer-events-none"
        style={{ background: `radial-gradient(circle, var(--p-accent-glow), transparent 60%)` }}
      />
      <HeroBody lead={lead} tel={tel} onDark accentColor="var(--p-accent)" mutedColor="rgba(255,255,255,0.7)" />
    </div>
  )
}

function HeroDark({ lead, tel }) {
  // dark palette: hero text directly on the dark page bg, no contained card
  return (
    <div className="px-2 md:px-8 py-20 md:py-32 relative">
      <div
        className="absolute top-[-160px] right-[-160px] w-[600px] h-[600px] pointer-events-none"
        style={{ background: `radial-gradient(circle, var(--p-accent-glow), transparent 60%)` }}
      />
      <HeroBody lead={lead} tel={tel} accentColor="var(--p-accent)" mutedColor="var(--p-muted)" />
    </div>
  )
}

function HeroBody({ lead, tel, onDark, accentColor, mutedColor }) {
  const heroNode = withSerifEmphasis(lead.hero, accentColor)

  return (
    <div className="relative">
      {/* eyebrow */}
      <div className="flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: onDark ? 'rgba(255,255,255,0.55)' : 'var(--p-muted)' }}>
        <span className="w-8 h-px" style={{ background: accentColor }} />
        <span className="w-1.5 h-1.5 rounded-full hi-pulse" style={{ background: accentColor }} />
        {lead.suburb} · Available now
      </div>

      <h1 className="text-[44px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.04em] leading-[0.98] mb-7 max-w-[14ch]">
        {heroNode}
      </h1>

      <p className="text-[17px] md:text-[19px] leading-[1.55] max-w-[56ch] mb-10 font-light" style={{ color: mutedColor }}>
        {lead.tagline}
      </p>

      <div className="flex flex-wrap gap-3 items-center mb-14">
        <a
          href={`tel:${tel}`}
          className="px-6 py-3.5 rounded-full font-semibold text-[15px] inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-px"
          style={{
            background: accentColor,
            color: 'var(--p-ink)',
            boxShadow: `0 0 0 0 var(--p-accent-glow)`,
          }}
        >
          <PhoneIcon /> Call {lead.phone}
        </a>
        <a
          href="#contact"
          className="px-5 py-3 rounded-full font-medium text-[15px] inline-flex items-center gap-2 border transition-colors"
          style={{
            borderColor: onDark ? 'rgba(255,255,255,0.2)' : 'var(--p-line)',
            color: onDark ? '#fff' : 'var(--p-ink)',
          }}
        >
          Get a free quote
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.14em]" style={{ color: onDark ? 'rgba(255,255,255,0.55)' : 'var(--p-muted)' }}>
        <span className="flex items-center gap-2"><span style={{ color: accentColor }}>✓</span> Licensed &amp; Insured</span>
        <span className="flex items-center gap-2"><span style={{ color: accentColor }}>✓</span> No call-out fee</span>
        <span className="flex items-center gap-2"><span style={{ color: accentColor }}>✓</span> Adelaide local</span>
      </div>
    </div>
  )
}

/* ─── Helpers ─────────────────────────────────────────────────────── */

function withSerifEmphasis(text, accentColor) {
  // pick the second word for italic serif emphasis
  const words = text.split(' ')
  if (words.length < 2) return text
  const idx = 1
  return (
    <>
      {words.slice(0, idx).join(' ')}{' '}
      <span className="serif-em text-[1.05em]" style={{ color: accentColor }}>{words[idx]}</span>{' '}
      {words.slice(idx + 1).join(' ')}
    </>
  )
}

function Eyebrow({ children, palette: p, center }) {
  return (
    <div
      className={`flex items-center gap-3 mb-9 font-mono text-[11px] uppercase tracking-[0.18em] ${center ? 'justify-center' : ''}`}
      style={{ color: 'var(--p-muted)' }}
    >
      <span className="w-8 h-px" style={{ background: 'var(--p-ink)' }} />
      {children}
    </div>
  )
}

function FeaturePoint({ palette: p, n, title, children }) {
  return (
    <div className="flex gap-5">
      <span className="font-mono text-[12px] pt-1 shrink-0" style={{ color: 'var(--p-muted)' }}>{n}</span>
      <div>
        <h3 className="text-[18px] font-medium tracking-[-0.01em] mb-1.5" style={{ color: 'var(--p-ink)' }}>{title}</h3>
        <p className="text-[15px] leading-[1.6] max-w-[52ch]" style={{ color: 'var(--p-muted)' }}>{children}</p>
      </div>
    </div>
  )
}

function Stars({ color }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} className="w-4 h-4" viewBox="0 0 24 24" fill={color}>
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ))}
    </div>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}
