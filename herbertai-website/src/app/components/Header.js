'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Herbert AI" 
            width={32} 
            height={32}
            className="rounded"
          />
          <span className="text-2xl font-semibold text-gray-900 hover:text-gray-700 transition">
            Herbert AI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/">Home</Link>
          
          {/* Services Dropdown */}
          <div className="relative group">
            <Link className="text-gray-600 hover:text-gray-900 transition font-medium flex items-center gap-1" href="/services">
              Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                <Link 
                  href="/services#website" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🌐</span>
                    <div>
                      <div className="font-medium text-gray-900">Website</div>
                      <div className="text-xs text-gray-500">Professional site + hosting</div>
                    </div>
                  </div>
                </Link>
                
                <Link 
                  href="/services#voice" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🤖</span>
                    <div>
                      <div className="font-medium text-gray-900">AI Voice Receptionist</div>
                      <div className="text-xs text-gray-500">24/7 call answering</div>
                    </div>
                  </div>
                </Link>
                
                <Link 
                  href="/services#chatbot" 
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="font-medium text-gray-900">AI Chatbot Widget</div>
                      <div className="text-xs text-gray-500">Website chat widget</div>
                    </div>
                  </div>
                </Link>

                <div className="border-t border-gray-200 my-2"></div>

                <Link 
                  href="/services" 
                  className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>

          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/pricing">Pricing</Link>
          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/portfolio">Portfolio</Link>
          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/about">About</Link>
          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/faq">FAQ</Link>
          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/demo">Demo</Link>
          <Link className="text-gray-600 hover:text-gray-900 transition font-medium" href="/contact">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 py-4 px-4 space-y-2">
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2 font-medium" href="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2 pl-4" href="/services#website" onClick={() => setMobileMenuOpen(false)}>→ Website</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2 pl-4" href="/services#voice" onClick={() => setMobileMenuOpen(false)}>→ AI Voice</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2 pl-4" href="/services#chatbot" onClick={() => setMobileMenuOpen(false)}>→ AI Chatbot</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/demo" onClick={() => setMobileMenuOpen(false)}>Demo</Link>
          <Link className="block text-gray-600 hover:text-gray-900 py-2" href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  )
}