import { Geist, Geist_Mono, Instrument_Serif, Bricolage_Grotesque } from 'next/font/google'
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

export const metadata = {
  title: 'Herbert AI — automation & growth studio for SMBs',
  description: 'Automation & growth studio for SMBs. Custom ads, websites, dashboards, voice agents, and workflow automation — built bespoke by Will Herbert in Adelaide.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${bricolage.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans">
        <LenisProvider>
          <MagneticCursor />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
