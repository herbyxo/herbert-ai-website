import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
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
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata = {
  title: 'Herbert AI — AI receptionists for Adelaide tradies',
  description: 'Never miss a job while you\'re on the tools. Herbert answers every call 24/7, qualifies the job, books it in, and SMSs you the details.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${interTight.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-ink font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
