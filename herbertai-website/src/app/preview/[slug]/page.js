import { getLead, leads } from '../leads'
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

function IconBolt() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}
function IconShield() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}
function IconStar({ filled }) {
  return (
    <svg className={`w-4 h-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}`} viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  )
}

const REVIEWS = [
  { name: 'Michael T.', text: 'Came out the same day I called. Sorted the problem fast and left the place clean. Really professional.', rating: 5 },
  { name: 'Sarah L.', text: 'Honest pricing, showed up on time, and explained everything clearly. Would absolutely use again.', rating: 5 },
  { name: 'Jason R.', text: 'Had an urgent job that needed doing ASAP. They picked up straight away and were on-site within the hour. Legends.', rating: 5 },
]

export default async function PreviewPage({ params }) {
  const { slug } = await params
  const lead = getLead(slug)
  if (!lead) notFound()

  const tradeLabel = lead.trade === 'Electrician' ? 'Electrician' : 'Plumber'
  const licenceLabel = lead.trade === 'Electrician' ? 'Licensed Electrician' : 'Licensed Plumber'

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Preview banner ─────────────────────────────────────────── */}
      <div className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <p className="text-gray-300 text-center sm:text-left">
            👋 Hey — I&apos;m <span className="text-white font-semibold">Will from Herbert AI</span>. I built this free mockup for {lead.biz}. No obligation.
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-white text-black font-semibold text-xs px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
          >
            Claim this site →
          </Link>
        </div>
      </div>

      {/* ── Mockup site header ─────────────────────────────────────── */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">{lead.biz}</span>
            <span className="ml-2 text-xs text-gray-400 font-medium">{licenceLabel} · {lead.suburb}, SA</span>
          </div>
          <a
            href={`tel:${lead.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 bg-black text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition"
          >
            <IconPhone />
            {lead.phone}
          </a>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-6 text-xs font-medium text-gray-300">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {lead.suburb} · Available now
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight max-w-2xl">
            {lead.hero}
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl">{lead.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${lead.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
            >
              <IconPhone />
              Call {lead.phone}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition"
            >
              Get a Free Quote
            </a>
          </div>
          <div className="flex items-center gap-6 mt-10 text-sm text-gray-400">
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Licensed & Insured</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> No Call-Out Fee</span>
            <span className="flex items-center gap-1.5"><span className="text-green-400">✓</span> Adelaide Local</span>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">What We Do</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Services</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {lead.services.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Why Choose Us</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Built on Trust</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4 text-white"><IconBolt /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Response</h3>
              <p className="text-gray-500 text-sm">We pick up, show up, and get the job done — no chasing, no waiting around.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4 text-white"><IconShield /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
              <p className="text-gray-500 text-sm">Fully licensed {tradeLabel.toLowerCase()} with public liability insurance on every job.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-4 text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Adelaide Local</h3>
              <p className="text-gray-500 text-sm">Based in {lead.suburb}. We know the area, and we&apos;re never far away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Reviews</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Customers Say</h2>
          <div className="flex items-center gap-2 mb-10">
            <div className="flex">{[1,2,3,4,5].map(n => <IconStar key={n} filled />)}</div>
            <span className="text-sm text-gray-500 font-medium">5.0 on Google</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex mb-3">{[1,2,3,4,5].map(n => <IconStar key={n} filled={n <= r.rating} />)}</div>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <p className="text-xs font-semibold text-gray-900">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Never miss a call (Herbert AI pitch) ───────────────────── */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-5 text-xs font-medium text-gray-300">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              AI Voice Receptionist — included
            </div>
            <h2 className="text-3xl font-bold mb-4">Never Miss a Call Again</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              When you&apos;re on the tools, {lead.biz} answers every call automatically — 24/7.
              It qualifies the job, books the appointment, and sends an SMS confirmation.
              You finish the job. The AI handles the phone.
            </p>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Answers calls 24/7 in your business name</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Qualifies jobs and books appointments</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> SMS confirms to customer and you</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Escalates emergencies to your mobile</li>
            </ul>
          </div>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full md:w-72 shrink-0">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-4">This month</p>
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-semibold">24</p>
                <p className="text-xs text-gray-400 mt-0.5">Calls answered automatically</p>
              </div>
              <div>
                <p className="text-3xl font-semibold">11</p>
                <p className="text-xs text-gray-400 mt-0.5">Bookings created while on the tools</p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-green-400">$4,400</p>
                <p className="text-xs text-gray-400 mt-0.5">Estimated revenue captured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Get in Touch</h2>
          <p className="text-gray-500 mb-8">Call or message us — we&apos;ll get back to you fast.</p>
          <a
            href={`tel:${lead.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-black text-white font-semibold px-8 py-4 rounded-full hover:bg-gray-800 transition text-lg"
          >
            <IconPhone />
            {lead.phone}
          </a>
          <p className="text-gray-400 text-sm mt-4">{lead.suburb}, South Australia</p>
        </div>
      </section>

      {/* ── Herbert AI footer ──────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-400">
            This is a <span className="font-medium text-gray-600">free mockup</span> built by{' '}
            <Link href="/" className="font-semibold text-gray-900 hover:underline">Herbert AI</Link>.
            The real site and AI receptionist can be live in days.
          </p>
          <Link
            href="/contact"
            className="shrink-0 bg-black text-white font-semibold text-xs px-5 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Get yours →
          </Link>
        </div>
      </div>

    </div>
  )
}
