import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'Brief received',
  description: 'Your project brief is in. Will reply within a business day.',
  alternates: { canonical: '/start/thanks' },
  robots: { index: false, follow: true },
}

export default function Thanks() {
  return (
    <section className="bg-cream">
      {/* Google Ads conversion — every lead form redirects here, so one
          page-load event == one form submit. Pushes straight to the dataLayer
          queue (gtag.js replays it on load) — a typeof-gtag guard raced the
          layout bootstrap and silently dropped the event. */}
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', { send_to: 'AW-18228080032/RaGxCLSS6bwcEKDb6fND' });`}
      </Script>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 min-h-[80vh] flex flex-col justify-center py-20 md:py-28">
        <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
          <span>Brief received</span>
        </div>

        <h1
          className="font-display text-ink"
          style={{
            fontSize: 'var(--text-display-lg)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            fontWeight: 800,
          }}
        >
          Got it.
          <br />
          Talk soon.
        </h1>

        <p className="mt-9 md:mt-12 max-w-[60ch] text-[17px] md:text-[19px] text-muted leading-[1.55]">
          Your brief landed. I&rsquo;ll come back within a business day with one of
          three things: a fixed quote and timeline, a clarifying question or two,
          or a clear no.
        </p>

        <p className="mt-6 max-w-[60ch] text-[15px] md:text-[16px] text-ink-soft leading-[1.6]">
          I&rsquo;ve sent a confirmation to your email &mdash; if you remember anything you
          forgot to include, just reply to it.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            data-magnetic
            className="bg-ink text-cream px-6 py-3.5 rounded-full text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-ink-soft transition-colors"
          >
            <span aria-hidden>&larr;</span> Back to home
          </Link>
          <Link
            href="/services"
            data-magnetic
            className="text-[14px] font-medium text-ink hover:text-green-deep transition"
          >
            See what I build &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
