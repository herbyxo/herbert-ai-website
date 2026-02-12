import Header from './components/Header'
import Footer from './components/Footer'
import './globals.css'

export const metadata = {
  title: 'Herbert AI - Digital Solutions for Trades Businesses',
  description: 'Professional websites, AI voice receptionists, and chatbots for Australian trades businesses. Never miss a customer again.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}