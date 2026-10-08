import Script from 'next/script'
import { Geist, Geist_Mono, Instrument_Serif, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import TrackBeacon from './components/TrackBeacon'
import Header from './components/Header'
import Footer from './components/Footer'
import LenisProvider from './components/motion/LenisProvider'
import { OG_IMAGE } from './components/site/og'
import './globals.css'

// Only the weights the site actually uses. Every extra weight is another file
// competing for bandwidth in the window before the headline paints, and a
// Lighthouse mobile audit put LCP at 6.1s with 123KB of fonts in flight.
// Audited against the codebase: font-bold (700), font-semibold (600),
// font-medium (500) and the 400 default are used; 300 was used nowhere.
const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
})
// Italic only: the serif appears exclusively through `.serif-em`, which sets
// font-style italic. The upright face was downloaded on every page and used on
// none of them.
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const SITE_URL = 'https://herbert-aisolutions.com'
const SITE_NAME = 'Herbert AI'
// One description for the meta tag and the JSON-LD, so they can't drift apart.
const SITE_DESC =
  'Custom software and AI for small businesses, built in Adelaide by Will Herbert. A free AI audit finds the job that costs you most; the Bottleneck Pilot builds one AI employee for it, live in 14 days.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Custom Software & AI for Small Business | Herbert AI, Adelaide',
    template: '%s · Herbert AI',
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: 'Will Herbert', url: `${SITE_URL}/about` }],
  creator: 'Will Herbert',
  publisher: SITE_NAME,
  keywords: [
    'custom software for small business',
    'AI for small business',
    'AI employees',
    'AI automation Adelaide',
    'small business automation',
    'workflow automation',
    'AI receptionist',
    'AI voice agents',
    'business dashboards',
    'Adelaide web design',
    'Adelaide',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Custom Software & AI for Small Business | Herbert AI, Adelaide',
    description:
      'A free AI audit finds the job that costs you most. The Bottleneck Pilot builds one AI employee for it, live in 14 days. Built in Adelaide by Will Herbert.',
  },
  // No hardcoded twitter title/description — it overrode every page's own
  // values. Twitter falls back to per-page openGraph.
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'LocalBusiness'],
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: 'herbertai',
  slogan: 'Custom software and AI for small businesses, built in Adelaide.',
  description: SITE_DESC,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}${OG_IMAGE}`,
  telephone: '+61448111840',
  email: 'hello@herbert-aisolutions.com',
  founder: { '@type': 'Person', name: 'Will Herbert', jobTitle: 'Founder' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Adelaide',
    addressRegion: 'SA',
    addressCountry: 'AU',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -34.9285, longitude: 138.6007 },
  areaServed: [
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'AdministrativeArea', name: 'South Australia' },
    { '@type': 'Country', name: 'Australia' },
  ],
  serviceArea: { '@type': 'Country', name: 'Australia' },
  knowsAbout: [
    'custom software for small business',
    'AI employees',
    'AI for small business',
    'small business automation',
    'workflow automation',
    'AI voice agents',
    'AI receptionist',
    'AI chatbot widget',
    'business dashboards',
    'CRM integration',
    'custom website development',
  ],
  priceRange: '$$',
  sameAs: ['https://github.com/herbyxo'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${bricolage.variable}`}>
      <head>
        {/* The TLS handshake to Google's tag host costs ~490ms on mobile
            (Lighthouse estimate) and it is paid serially when the tag loads.
            Opening the connection early overlaps it with the rest of the page. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans">
        <a href="#main" className="skip-link">Skip to content</a>
        <LenisProvider>
          <Header />
          <main id="main" className="flex-grow">{children}</main>
          <Footer />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <SpeedInsights />
        <TrackBeacon />
        {/* Google Ads tag: conversion tracking for paid campaigns.
            lazyOnload, not afterInteractive. At 145KB (60KB of it unused) this
            is the single heaviest asset on the site, and on afterInteractive it
            competed for bandwidth in the window before the headline painted:
            the tag measuring ad conversions was hurting the ad quality score
            that decides whether the ads serve at all. Conversions are unaffected
            because the event fires on /start/thanks, which queues into
            window.dataLayer before this library arrives, and gtag replays that
            queue on load. */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18228080032"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18228080032');
            // Website call conversion (Google Ads action 7753449754, created by
            // the marketing engine 2026-09-08). For visitors who arrived from an
            // ad, Google swaps the number below wherever it is shown with a
            // forwarding number, and a call over 60 seconds counts as a lead.
            // The text must match how the number is written on the pages.
            gtag('config', 'AW-18228080032/z7BrCJqCkfEcEKDb6fND', {
              'phone_conversion_number': '0448 111 840'
            });`}
        </Script>
      </body>
    </html>
  )
}
