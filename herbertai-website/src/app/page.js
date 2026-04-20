import Link from 'next/link'

const IconPhone = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const IconGlobe = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
  </svg>
)

const IconClock = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const IconMic = () => (
  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z" />
  </svg>
)

const IconChat = () => (
  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const IconCheck = () => (
  <svg className="w-4 h-4 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

export default function Home() {
  return (
    <div>
      
      {/* Hero Section */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">
            Stop Losing Customers.<br />Start Growing Your Business.
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 font-light">
            We build digital systems that help trades businesses capture more leads, book more jobs, and never miss a customer.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
            <Link 
              href="/services"
              className="inline-block px-8 py-3 border-2 border-black text-black rounded-full font-medium text-lg hover:bg-gray-50 transition"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-semibold text-center mb-12 text-gray-900">
            Sound Familiar?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-3"><IconPhone /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Missing Calls = Lost Money</h3>
              <p className="text-gray-600">Every missed call is a potential customer going to your competitor instead.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-3"><IconGlobe /></div>
              <h3 className="font-semibold text-gray-900 mb-2">No Website or Outdated Site</h3>
              <p className="text-gray-600">Customers judge your business by your online presence. A bad site costs you jobs.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-3"><IconClock /></div>
              <h3 className="font-semibold text-gray-900 mb-2">After-Hours Inquiries</h3>
              <p className="text-gray-600">Potential customers calling at 7pm get voicemail. They won&apos;t leave a message.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-gray-900">
            How We Help
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            We build and manage the digital systems that capture more customers and save you time.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <div className="mb-4"><IconGlobe /></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Website</h3>
              <p className="text-gray-600 mb-4">
                Fast, mobile-optimized site that converts visitors into customers.
              </p>
              <Link href="/services#website" className="text-black font-medium hover:underline">
                Learn more
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <div className="mb-4"><IconMic /></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Voice Receptionist</h3>
              <p className="text-gray-600 mb-4">
                Answers calls 24/7, books appointments, never misses a customer.
              </p>
              <Link href="/services#voice" className="text-black font-medium hover:underline">
                Learn more
              </Link>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
              <div className="mb-4"><IconChat /></div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Chatbot Widget</h3>
              <p className="text-gray-600 mb-4">
                Website chat that captures leads and answers questions instantly.
              </p>
              <Link href="/services#chatbot" className="text-black font-medium hover:underline">
                Learn more
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-10">
            Connects with the tools you already use
          </p>
          <div className="flex flex-wrap justify-center gap-4">

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">AroFlo</div>
                <div className="text-xs text-gray-500">Job management</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Google Calendar</div>
                <div className="text-xs text-gray-500">Scheduling</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Xero</div>
                <div className="text-xs text-gray-500">Accounting</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">SMS</div>
                <div className="text-xs text-gray-500">Notifications</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Zapier</div>
                <div className="text-xs text-gray-500">Custom workflows</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-gray-900">
            Who We Help
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Two industries. One mission — replace manual, time-wasting workflows with AI that just handles it.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Trades Businesses</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Stop Missing Calls & Losing Jobs</h3>
              <p className="text-gray-600 mb-6">
                AI voice receptionist, chatbot, and a professional website that captures every lead — day or night. Built for plumbers, electricians, builders, and more.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  24/7 AI call answering
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Automatic appointment booking
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Professional website + chatbot
                </li>
              </ul>
              <Link href="/services" className="inline-block px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition text-sm">
                Explore Trades Solutions
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Property Managers</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Automate Maintenance Requests End-to-End</h3>
              <p className="text-gray-600 mb-6">
                Tenants call in, AI captures the issue, you approve, a tradesperson gets booked — all automatically. Manage your entire maintenance workflow without the phone tag.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 mb-8">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  AI tenant intake agent
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  One-click approve or deny
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  Automated tradesperson booking
                </li>
              </ul>
              <Link href="/property-managers" className="inline-block px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition text-sm">
                Explore Property Manager AI
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Package CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-black text-white rounded-3xl p-12">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4">
                Get Everything for $697/month
              </h2>
              <p className="text-xl text-gray-300 mb-2">
                Complete digital solution. No setup fees.
              </p>
              <p className="text-lg text-gray-400">
                Website + AI Voice + AI Chatbot — all included
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
              
              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">What&apos;s Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <IconCheck />
                    <span className="text-gray-200">Professional website build + hosting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCheck />
                    <span className="text-gray-200">24/7 AI voice receptionist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCheck />
                    <span className="text-gray-200">AI chatbot on your website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCheck />
                    <span className="text-gray-200">Google Calendar integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <IconCheck />
                    <span className="text-gray-200">Ongoing updates & support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">The Value:</h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex justify-between text-gray-300">
                    <span>Website (build + hosting)</span>
                    <span>$497</span>
                  </li>
                  <li className="flex justify-between text-gray-300">
                    <span>AI Voice Receptionist</span>
                    <span>$297</span>
                  </li>
                  <li className="flex justify-between text-gray-300">
                    <span>AI Chatbot Widget</span>
                    <span>$197</span>
                  </li>
                  <li className="flex justify-between text-white font-semibold text-lg border-t border-white/20 pt-2 mt-2">
                    <span>Total Value</span>
                    <span>$991/mo</span>
                  </li>
                </ul>
                <p className="text-green-400 font-semibold text-lg">
                  You Save: $294/month
                </p>
              </div>

            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/pricing"
                className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-100 transition"
              >
                View Pricing
              </Link>
              <Link 
                href="/contact"
                className="inline-block px-8 py-3 border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-4xl font-semibold mb-12 text-gray-900">
            Built for Trades Businesses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div>
              <div className="text-5xl font-semibold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">Never miss a call, even after hours</p>
            </div>

            <div>
              <div className="text-5xl font-semibold text-gray-900 mb-2">30%+</div>
              <p className="text-gray-600">Average increase in booked jobs</p>
            </div>

            <div>
              <div className="text-5xl font-semibold text-gray-900 mb-2">2 weeks</div>
              <p className="text-gray-600">From signup to fully live</p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto text-center px-4 max-w-3xl">
          <h2 className="text-4xl font-semibold mb-6 text-gray-900">
            Ready to Stop Losing Customers?
          </h2>
          <p className="text-xl mb-10 text-gray-600">
            Book a free 15-minute call. We&apos;ll show you exactly how to capture more leads and grow your business.
          </p>
          <Link 
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition"
          >
            Get Started Today
          </Link>
        </div>
      </section>

    </div>
  )
}
