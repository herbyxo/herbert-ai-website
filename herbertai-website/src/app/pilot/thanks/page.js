import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'Audit request received',
  description: 'Your audit request is in. Will calls the same day to set a time.',
  alternates: { canonical: '/pilot/thanks' },
  robots: { index: false, follow: true },
}

// The /pilot form lands here instead of /start/thanks, because that page
// promises a fixed quote within a business day and an audit requester is
// promised a same-day call. The conversion event is the same: one load of a
// thanks page is one form submit.
export default function PilotThanks() {
  return (
    <section className="bg-cream">
      <Script id="gtag-conversion" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('event', 'conversion', { send_to: 'AW-18228080032/RaGxCLSS6bwcEKDb6fND' });`}
      </Script>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 min-h-[80vh] flex flex-col justify-center py-20 md:py-28">
        <div className="flex items-center gap-3 mb-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-green-deep" />
          <span>Audit request received</span>
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
          Talk today.
        </h1>

        <p className="mt-9 md:mt-12 max-w-[60ch] text-[17px] md:text-[19px] text-muted leading-[1.55]">
          Your details landed. I&rsquo;ll call you the same day to set a time for the
          audit: forty five minutes, no preparation. The written page follows within
          two business days.
        </p>

        <p className="mt-6 max-w-[60ch] text-[15px] md:text-[16px] text-ink-soft leading-[1.6]">
          I&rsquo;ve sent a confirmation to your email. If another annoying job comes to
          mind before we talk, just reply to it.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="bg-ink text-cream px-6 py-3.5 rounded-full text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-ink-soft transition-colors"
          >
            <span aria-hidden>&larr;</span> Back to home
          </Link>
          <Link
            href="/work"
            className="text-[14px] font-medium text-ink hover:text-green-deep transition"
          >
            See what gets built &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
