import { Geist, Geist_Mono, Instrument_Serif, Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from './components/Header'
import Footer from './components/Footer'
import LenisProvider from './components/motion/LenisProvider'
import MagneticCursor from './components/motion/MagneticCursor'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
})
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
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
const SITE_DESC =
  'Automation & growth studio for SMBs. Custom ads, websites, dashboards, voice agents, and workflow automation — built bespoke by Will Herbert in Adelaide.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Herbert AI — automation & growth studio for SMBs',
    template: '%s · Herbert AI',
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  authors: [{ name: 'Will Herbert', url: `${SITE_URL}/about` }],
  creator: 'Will Herbert',
  publisher: SITE_NAME,
  keywords: [
    'automation studio',
    'AI voice agents',
    'AI receptionist',
    'small business automation',
    'Adelaide web design',
    'Adelaide automation',
    'workflow automation',
    'n8n',
    'AI chatbot',
    'custom websites',
    'small business websites Australia',
    'SMB automation',
    'AI for small business',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Herbert AI — automation & growth studio for SMBs',
    description: SITE_DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Herbert AI — automation & growth studio for SMBs',
    description:
      'Automation & growth studio for SMBs. Built bespoke by Will Herbert in Adelaide.',
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
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  alternateName: 'Herbert AI Studio',
  description:
    'Automation & growth studio for SMBs. Custom AI voice agents, chatbots, workflow automation, websites, and dashboards — built bespoke by Will Herbert in Adelaide.',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: '+61448111840',
  email: 'hello@herbert-aisolutions.com',
  founder: { '@type': 'Person', name: 'Will Herbert', jobTitle: 'Founder' },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Adelaide',
    addressRegion: 'SA',
    addressCountry: 'AU',
  },
  areaServed: [
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'AdministrativeArea', name: 'South Australia' },
    { '@type': 'Country', name: 'Australia' },
  ],
  serviceArea: { '@type': 'Country', name: 'Australia' },
  knowsAbout: [
    'AI voice agents',
    'AI receptionist',
    'workflow automation',
    'n8n',
    'small business automation',
    'custom website development',
    'CRM integration',
    'AI chatbot widget',
    'Stripe integration',
    'AroFlo integration',
  ],
  priceRange: '$$',
  sameAs: ['https://github.com/herbyxo'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${bricolage.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans">
        <a href="#main" className="skip-link">Skip to content</a>
        <LenisProvider>
          <MagneticCursor />
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
      </body>
    </html>
  )
}
