'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

/* ─── Blendz By Ben — featured live work ───────────────────────────── */

const blendzSystems = [
  {
    tag: 'Website',
    title: 'Custom Next.js site',
    body: 'Editorial booking-led site replacing his Squarespace. Mobile-first, fast, SEO-ready. Live at blendzbyben.com.',
    accent: 'linear-gradient(135deg, #0A0A0A 0%, #1f2620 100%)',
    accentDot: '#00FF88',
  },
  {
    tag: 'Dashboard',
    title: 'Owner dashboard',
    body: 'Private admin view: today\'s bookings, customer DB, revenue, no-show tracking. Built on Supabase with magic-link auth.',
    accent: 'linear-gradient(135deg, #0d0d0d 0%, #2a2018 100%)',
    accentDot: '#E8B96A',
  },
  {
    tag: 'Bookings',
    title: 'Booking flow',
    body: 'Customer-facing booking funnel — service selection, calendar availability, deposit, confirmation. Replaces his manual back-and-forth via Insta DMs.',
    accent: 'linear-gradient(135deg, #0A0A0A 0%, #2c1f25 100%)',
    accentDot: '#C44569',
  },
  {
    tag: 'Comms',
    title: 'Email + SMS automation',
    body: 'Booking confirmations, reminders, follow-ups, no-show recovery — all automatic. Wired through n8n with Resend + Twilio.',
    accent: 'linear-gradient(135deg, #0A0A0A 0%, #1d1f2e 100%)',
    accentDot: '#7A8BFF',
  },
];

/* ─── Demo sites — design mockups ───────────────────────────────────── */

const demos = [
  {
    id: 'sparkies',
    name: 'North Adelaide Sparkies',
    industry: 'Electrician',
    description: 'Bold, high-contrast site for a licensed electrical contractor. Built to convert — quote form, services, and trust signals front and centre.',
    screenshots: [
      { src: '/portfolio/home_-_spark.png', label: 'Homepage' },
      { src: '/portfolio/services_-_spark.png', label: 'Services' },
      { src: '/portfolio/about_-_spark.png', label: 'About' },
      { src: '/portfolio/contact_-_spark.png', label: 'Contact' },
    ],
    tag: 'Trades',
    palette: ['#1a1a1a', '#f5c518'],
  },
  {
    id: 'urbanedge',
    name: 'Urban Edge Barber',
    industry: 'Barbershop',
    description: 'Dark, editorial design for an Adelaide CBD barbershop. Communicates craft and confidence — with an integrated booking flow.',
    screenshots: [
      { src: '/portfolio/home_-_haircut.png', label: 'Homepage' },
      { src: '/portfolio/services_-_haircut.png', label: 'Services' },
      { src: '/portfolio/about_-_haircut.png', label: 'About' },
      { src: '/portfolio/book_-_haircut.png', label: 'Book' },
    ],
    tag: 'Hospitality',
    palette: ['#0d0d0d', '#c0392b'],
  },
  {
    id: 'sammys',
    name: "Sammy's Café",
    industry: 'Café',
    description: 'Warm, editorial café site with a refined aesthetic. Features a seasonal menu, table reservations, and a story-first layout.',
    screenshots: [
      { src: '/portfolio/home_-_cafe.png', label: 'Homepage' },
      { src: '/portfolio/menu_-_cafe.png', label: 'Menu' },
      { src: '/portfolio/about_-_cafe.png', label: 'About' },
      { src: '/portfolio/contact_-_cafe.png', label: 'Contact' },
    ],
    tag: 'Hospitality',
    palette: ['#f5f0e8', '#8b6914'],
  },
];

export default function WorkPage() {
  const [lightbox, setLightbox] = useState(null);

  const currentProject = lightbox ? demos.find(p => p.id === lightbox.projectId) : null;
  const currentScreenshot = currentProject ? currentProject.screenshots[lightbox.index] : null;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prevImage = useCallback(() => {
    if (!lightbox || !currentProject) return;
    setLightbox(lb => ({
      ...lb,
      index: (lb.index - 1 + currentProject.screenshots.length) % currentProject.screenshots.length,
    }));
  }, [lightbox, currentProject]);

  const nextImage = useCallback(() => {
    if (!lightbox || !currentProject) return;
    setLightbox(lb => ({
      ...lb,
      index: (lb.index + 1) % currentProject.screenshots.length,
    }));
  }, [lightbox, currentProject]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, prevImage, nextImage]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Eyebrow>Work</Eyebrow>
          <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-semibold tracking-[-0.03em] leading-[1] mb-7 max-w-[18ch] text-ink">
            What we&apos;ve built for <span className="serif-em text-green-deep">real businesses.</span>
          </h1>
          <p className="text-[17px] md:text-[19px] text-muted leading-[1.55] max-w-[58ch]">
            Each system below is bespoke — no templates, no off-the-shelf widgets.
            Featured client is Blendz By Ben, an Adelaide barbershop running a full four-system stack we built end-to-end.
          </p>
        </div>
      </section>

      {/* Blendz featured */}
      <section id="blendz" className="bg-cream-alt border-y border-line scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-[40ch]">
              <Eyebrow>Featured client · live</Eyebrow>
              <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink">
                Blendz By Ben. <span className="serif-em text-green-deep">Full stack.</span>
              </h2>
            </div>
            <div className="max-w-[44ch] text-muted text-[16px] leading-[1.6]">
              <p className="mb-3">
                Adelaide barbershop. We replaced Squarespace + manual Insta DM bookings + spreadsheet-tracked customers
                with four custom systems that talk to each other.
              </p>
              <a
                href="https://blendzbyben.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink font-medium hover:text-green-deep transition-colors"
              >
                blendzbyben.com <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {blendzSystems.map((s) => (
              <div
                key={s.tag}
                className="rounded-3xl p-8 md:p-10 text-white relative overflow-hidden border border-white/5 min-h-[260px] flex flex-col justify-between"
                style={{ background: s.accent }}
              >
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: s.accentDot, boxShadow: `0 0 10px ${s.accentDot}40` }}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="text-[26px] md:text-[30px] font-medium tracking-[-0.02em] mb-3 text-white">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-white/65 leading-[1.6] max-w-[44ch]">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo sites */}
      <section id="demos" className="bg-cream scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-24 md:py-32 space-y-24">
          <div className="max-w-[44ch]">
            <Eyebrow>Recent sites · design demos</Eyebrow>
            <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] text-ink mb-4">
              Designs we&apos;ve built <span className="serif-em text-green-deep">for local businesses.</span>
            </h2>
            <p className="text-[16px] text-muted leading-[1.6]">
              Concept designs for trades and hospitality clients. Each one bespoke to the business — different palette, different voice, different structure.
            </p>
          </div>

          {demos.map((project) => (
            <div key={project.id}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
                <div>
                  <span className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-2">
                    {project.tag} · {project.industry}
                  </span>
                  <h3 className="text-[26px] font-medium tracking-[-0.02em] text-ink">{project.name}</h3>
                  <p className="text-muted mt-1.5 max-w-[58ch] text-[15px] leading-[1.6]">{project.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {project.palette.map((c, i) => (
                    <span
                      key={i}
                      className="w-5 h-5 rounded-full border border-line inline-block"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {project.screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightbox({ projectId: project.id, index: idx })}
                    className={`group relative rounded-2xl overflow-hidden border border-line bg-cream-alt hover:border-ink/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-cream ${idx === 0 ? 'col-span-2' : ''}`}
                    aria-label={`View ${shot.label} screenshot for ${project.name}`}
                  >
                    <div className="relative w-full aspect-video bg-cream-alt">
                      <img
                        src={shot.src}
                        alt={`${project.name} – ${shot.label}`}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-200 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-cream text-ink text-[12px] font-medium px-3 py-1.5 rounded-full">
                          View
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-2 text-left">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{shot.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom builds CTA */}
      <section className="px-6 lg:px-12 pb-24 md:pb-32 max-w-[1280px] mx-auto">
        <div className="bg-ink text-white rounded-[32px] p-12 md:p-20 relative overflow-hidden">
          <div className="hero-blob absolute top-[-200px] right-[-100px] w-[500px] h-[500px] pointer-events-none" />

          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-end">
            <div>
              <Eyebrow color="white">Custom builds</Eyebrow>
              <h2 className="text-[36px] md:text-[56px] font-medium leading-[1.02] tracking-[-0.03em] mb-6 max-w-[18ch]">
                Got something that <span className="serif-em text-green">doesn&apos;t fit the menu?</span>
              </h2>
              <p className="text-white/70 text-[17px] leading-[1.6] max-w-[52ch]">
                Bespoke systems are quoted on scope. Tell us the bottleneck —
                we&apos;ll sketch an approach, ballpark cost and timeline, and you decide if it&apos;s worth doing.
                No retainers, no agency overhead.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/contact"
                className="bg-green text-ink px-7 py-4 rounded-full font-semibold text-[16px] inline-flex items-center justify-between gap-2 hover:shadow-[0_0_32px_var(--green-glow)] hover:-translate-y-px transition-all duration-300"
              >
                Scope a custom build <span aria-hidden>→</span>
              </Link>
              <Link
                href="/services"
                className="text-white px-6 py-3.5 rounded-full font-medium text-[15px] inline-flex items-center justify-between gap-2 border border-white/20 hover:border-white/50 transition-colors"
              >
                See productised services <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && currentProject && currentScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-6xl w-full mx-4 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <div>
                <span className="text-white font-medium text-sm">{currentProject.name}</span>
                <span className="text-white/50 text-sm ml-2">— {currentScreenshot.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-white/40 text-[11px]">
                  {lightbox.index + 1} / {currentProject.screenshots.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="text-white/50 hover:text-white transition-colors text-2xl leading-none font-light"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-ink shadow-2xl">
              <img
                src={currentScreenshot.src}
                alt={`${currentProject.name} – ${currentScreenshot.label}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              {currentProject.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-xl"
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors text-xl"
                    aria-label="Next"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="flex gap-2 mt-3 justify-center">
              {currentProject.screenshots.map((shot, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightbox(lb => ({ ...lb, index: idx }))}
                  className={`w-16 h-10 rounded overflow-hidden border-2 transition-all ${idx === lightbox.index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  aria-label={shot.label}
                >
                  <img src={shot.src} alt={shot.label} className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Eyebrow({ children, color = 'ink' }) {
  const isWhite = color === 'white';
  return (
    <div className={`flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] ${isWhite ? 'text-white/55' : 'text-muted'}`}>
      <span className={`w-8 h-px ${isWhite ? 'bg-green' : 'bg-ink'}`} />
      {children}
    </div>
  );
}
