'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import RevealOnScroll from '../components/motion/RevealOnScroll'

/* ─── Service catalogue ─────────────────────────────────────────────── */

const buckets = [
  {
    id: 'grow',
    label: 'Grow',
    headline: 'Get more customers through the door.',
    body: 'Paid traffic, organic, lifecycle marketing — the systems that bring new business in. Set up once, run on their own, measured monthly.',
    services: [
      { tag: 'Ads', title: 'Paid ads · Google + Meta', body: 'Campaign setup, creative, daily monitoring. Scoped to your budget and target market.' },
      { tag: 'SEO', title: 'Organic search', body: 'Technical SEO, local SEO, content. Get found by the people already searching for what you do.' },
      { tag: 'Landing', title: 'Landing pages', body: 'Single-purpose conversion pages. Built for a specific campaign, lead magnet, or offer.' },
      { tag: 'Email · SMS', title: 'Email + SMS marketing', body: 'List management, broadcast campaigns, automated sequences. Resend + Twilio under the hood.' },
      { tag: 'Reviews', title: 'Review collection', body: 'Automated post-job SMS asking for a Google review. Boost your local search ranking.' },
      { tag: 'Funnels', title: 'Lead magnets + funnels', body: 'Free-PDF → email capture → nurture sequence → call booked. Whole funnel built and wired.' },
    ],
  },
  {
    id: 'automate',
    label: 'Automate',
    headline: 'Handle the admin without you in the loop.',
    body: 'Voice, chat, workflows — anything where a computer can do the boring repetitive work. You see the outcomes, not the process.',
    demo: 'voice',
    services: [
      { tag: 'Voice', title: 'AI voice agents', body: 'A 24/7 receptionist. Custom prompt per business. Qualifies, books, SMSs confirmations.', hasDemo: true },
      { tag: 'Chat', title: 'AI chatbot widget', body: 'Site widget trained on your business. Captures leads, answers questions, books through chat.' },
      { tag: 'Workflows', title: 'Workflow automation', body: 'Tool-to-tool stitching. AroFlo, CRM, Calendar, Gmail, SMS — all talking to each other. Built in n8n.' },
      { tag: 'Agents', title: 'Custom AI agents', body: 'AI agents trained on your business — answer staff questions from your docs, draft proposals, run internal tasks. Beyond receptionists.' },
      { tag: 'CRM', title: 'CRM setup + automation', body: 'HubSpot or Pipedrive setup, pipeline, follow-up rules, lead routing. Wired to the rest of your stack.' },
      { tag: 'Booking', title: 'Booking + calendar', body: 'Custom booking flows, deposit handling, calendar sync, SMS reminders, no-show recovery.' },
      { tag: 'Alerts', title: 'Internal alerts + ops', body: 'Slack or SMS triggers on key events. Big lead came in? Contract signed? You know instantly.' },
    ],
  },
  {
    id: 'build',
    label: 'Build',
    headline: 'Custom software for your business.',
    body: 'Websites, dashboards, internal tools — bespoke custom builds. Yours to keep, no platform lock-in.',
    demo: 'web',
    services: [
      { tag: 'Web', title: 'Marketing websites', body: 'Custom-coded sites, no template. Mobile-first, fast, modern hosting.', hasDemo: true },
      { tag: 'Dashboard', title: 'Custom dashboards', body: 'Admin panels, customer database, owner consoles. Secure email-link login — no passwords to remember.' },
      { tag: 'Portals', title: 'Customer portals', body: 'Customers log in to see their bookings, files, and history. Email-link or phone-number sign-in — no passwords.' },
      { tag: 'Booking', title: 'Custom booking systems', body: 'Fully bespoke — not Calendly with a logo. Service selection, deposits, calendar sync.' },
      { tag: 'Commerce', title: 'E-commerce setups', body: 'Shopify customisation, Stripe checkouts, custom storefronts where Shopify isn’t the right fit.' },
      { tag: 'App-style', title: 'Phone-installable web apps', body: 'Sit on the home screen like an app, send push notifications, work offline. Faster and cheaper to ship than a real mobile app.' },
    ],
  },
]

const claremontShots = [
  { src: '/portfolio/claremont/claremont-1.png', label: 'Hero' },
  { src: '/portfolio/claremont/claremont-2.png', label: 'Services' },
  { src: '/portfolio/claremont/claremont-3.png', label: 'About' },
  { src: '/portfolio/claremont/claremont-4.png', label: 'Listings' },
  { src: '/portfolio/claremont/claremont-5.jpg', label: 'Contact' },
  { src: '/portfolio/claremont/claremont-6.png', label: 'Detail · 06' },
  { src: '/portfolio/claremont/claremont-7.png', label: 'Detail · 07' },
  { src: '/portfolio/claremont/claremont-8.png', label: 'Detail · 08' },
]

/* ─── Page ──────────────────────────────────────────────────────────── */

export default function Services() {
  const [lightbox, setLightbox] = useState(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const prevImage = useCallback(() => {
    setLightbox((lb) => lb && { index: (lb.index - 1 + claremontShots.length) % claremontShots.length })
  }, [])
  const nextImage = useCallback(() => {
    setLightbox((lb) => lb && { index: (lb.index + 1) % claremontShots.length })
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, closeLightbox, prevImage, nextImage])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const current = lightbox ? claremontShots[lightbox.index] : null

  return (
    <>
      {/* ─── Hero — static (above the fold) ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pt-28 pb-24 md:pt-40 md:pb-32">
          <Eyebrow>Services</Eyebrow>
          <h1
            className="font-display text-ink max-w-[16ch]"
            style={{ fontSize: 'var(--text-display-lg)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 800 }}
          >
            What we build for small business.
          </h1>
          <p className="mt-9 text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[62ch]">
            Adelaide-based studio for web design, development, AI automation and growth.
            Three buckets &mdash; grow, automate, build. Productised plans for the common
            patterns; custom builds quoted on scope.
          </p>
          <p className="text-[15px] text-muted leading-[1.6] mt-4 max-w-[60ch]">
            Got a specific industry?{' '}
            <Link href="/industries" className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors">
              See if it&rsquo;s one we work with
            </Link>.
          </p>
        </div>
      </section>

      {/* ─── Buckets ─── */}
      {buckets.map((bucket, i) => (
        <section
          key={bucket.id}
          id={bucket.id}
          className={`${i % 2 === 0 ? 'bg-cream-alt' : 'bg-cream'} scroll-mt-24`}
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-36">
            <RevealOnScroll className="max-w-[44ch] mb-14">
              <div>
                <Eyebrow>{bucket.label}</Eyebrow>
                <h2
                  className="font-display text-ink mb-5"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.98, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  {bucket.headline}
                </h2>
                <p className="text-[16px] md:text-[17px] text-muted leading-[1.6]">{bucket.body}</p>
              </div>
            </RevealOnScroll>

            {/* Service cards */}
            <RevealOnScroll className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <>
                {bucket.services.map((s) => (
                  <ServiceCard key={s.title} service={s} />
                ))}
              </>
            </RevealOnScroll>

            {/* Inline demo */}
            {bucket.demo === 'voice' && <VoiceDemo />}
            {bucket.demo === 'web' && <WebDemo shots={claremontShots} onOpen={(index) => setLightbox({ index })} />}
          </div>
        </section>
      ))}

      {/* ─── Pricing teaser — ink panel ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="bg-ink text-cream rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow color="white">Pricing</Eyebrow>
                <h2
                  className="font-display text-cream mb-6 max-w-[16ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  Priced on scope. Not on a menu.
                </h2>
                <p className="text-cream/70 text-[17px] leading-[1.6] max-w-[52ch]">
                  Every project quoted on scope — fixed price, fixed timeline. Three pricing
                  models depending on the work: fixed quote, hourly, or monthly retainer.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/pricing"
                  data-magnetic
                  className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
                >
                  How we price <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/contact"
                  data-magnetic
                  className="text-cream px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center justify-between gap-2 border border-cream/20 hover:border-cream/50 transition-colors"
                >
                  Get a quote <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Custom builds CTA ─── */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 pb-24 md:pb-32">
          <div className="bg-cream-alt border border-line rounded-3xl p-12 md:p-20">
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
              <div>
                <Eyebrow>Doesn&apos;t fit the menu?</Eyebrow>
                <h2
                  className="font-display text-ink mb-6 max-w-[14ch]"
                  style={{ fontSize: 'var(--text-display-md)', lineHeight: 0.96, letterSpacing: '-0.035em', fontWeight: 800 }}
                >
                  Got something more specific?
                </h2>
                <p className="text-muted text-[17px] leading-[1.6] max-w-[52ch]">
                  Custom systems are scoped to your bottleneck and quoted on the build. Tell us what&apos;s slow,
                  what&apos;s broken, or what doesn&apos;t exist yet — we&apos;ll come back with an approach and a price.
                </p>
              </div>
              <Link
                href="/contact"
                data-magnetic
                className="bg-ink text-cream px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:bg-ink-soft transition-colors self-start md:self-end"
              >
                Scope a custom build <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Lightbox ─── */}
      {lightbox && current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={closeLightbox}>
          <div className="relative max-w-6xl w-full mx-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <span className="text-white font-medium text-sm">Claremont Property</span>
                <span className="text-white/50 text-sm ml-2">— {current.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-white/40 text-[11px]">{lightbox.index + 1} / {claremontShots.length}</span>
                <button onClick={closeLightbox} className="text-white/50 hover:text-white text-2xl leading-none font-light" aria-label="Close">×</button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-ink shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.src} alt={`Claremont — ${current.label}`} className="w-full h-auto max-h-[80vh] object-contain" />
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl" aria-label="Previous">‹</button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl" aria-label="Next">›</button>
            </div>
            <div className="flex gap-2 mt-3 justify-center flex-wrap">
              {claremontShots.map((shot, idx) => (
                <button key={idx} onClick={() => setLightbox({ index: idx })} className={`w-16 h-10 rounded overflow-hidden border-2 transition-all ${idx === lightbox.index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`} aria-label={shot.label}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.label} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Components ────────────────────────────────────────────────────── */

function ServiceCard({ service }) {
  return (
    <div className="bg-white border border-line rounded-3xl p-7 min-h-[200px] flex flex-col lift">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-deep shrink-0" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{service.tag}</span>
      </div>
      <h3 className="text-[20px] font-medium tracking-[-0.01em] text-ink mb-3 leading-[1.25]">{service.title}</h3>
      <p className="text-[14px] text-muted leading-[1.6]">{service.body}</p>
    </div>
  )
}

function VoiceDemo() {
  return (
    <div className="mt-14 grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12 items-center bg-white border border-line rounded-3xl p-8 md:p-10">
      <div>
        <Eyebrow>Example · live</Eyebrow>
        <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.01em] text-ink mb-3">
          A real call handled by the voice agent.
        </h3>
        <p className="text-[14px] text-muted leading-[1.6]">
          Master Freeze · commercial refrigeration · Sydney.
          Customer reported a refrigerant leak. Agent qualified the job, collected access details, closed the call. Zero human involvement.
        </p>
      </div>
      <div className="bg-ink rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-green hi-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">Inbound call · unedited</span>
        </div>
        <audio controls preload="metadata" className="w-full" style={{ filter: 'invert(0.85)' }}>
          <source src="/steve-demo.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  )
}

function WebDemo({ shots, onOpen }) {
  return (
    <div className="mt-14">
      <div className="max-w-[44ch] mb-8">
        <Eyebrow>Example · design</Eyebrow>
        <h3 className="text-[24px] md:text-[28px] font-medium tracking-[-0.01em] text-ink mb-3">
          Editorial real estate concept.
        </h3>
        <p className="text-[14px] text-muted leading-[1.6]">
          Concept design for a premium London real estate brand. Click any thumbnail to view.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {shots.map((shot, idx) => (
          <button
            key={idx}
            onClick={() => onOpen(idx)}
            className={`group relative rounded-2xl overflow-hidden border border-line bg-cream-alt hover:border-ink/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-cream ${idx === 0 ? 'col-span-2' : ''}`}
            aria-label={`View ${shot.label}`}
          >
            <div className="relative w-full aspect-video bg-cream-alt">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={shot.src} alt={`Claremont — ${shot.label}`} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-cream text-ink text-[12px] font-medium px-3 py-1.5 rounded-full">View</span>
              </div>
            </div>
            <div className="px-3 py-2 text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{shot.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white'
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-cream/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  )
}
