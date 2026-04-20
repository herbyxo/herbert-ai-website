import Link from 'next/link'

const IconBuilding = () => (
  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const IconPhone = () => (
  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const IconClipboard = () => (
  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
)

const IconWrench = () => (
  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const IconCheck = () => (
  <svg className="w-4 h-4 text-white shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const IconCheckDark = () => (
  <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

const IconAlert = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

const IconClock = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const IconInbox = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
  </svg>
)

export default function PropertyManagers() {
  return (
    <div>

      {/* Hero */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto text-center px-4 max-w-4xl">
          <div className="inline-block bg-gray-100 text-gray-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
            For Property Managers
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold mb-6 text-gray-900 tracking-tight">
            Maintenance Requests,<br />Handled Automatically.
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-600 font-light">
            Tenants call in. An AI agent captures the issue and logs it. You review and approve. A tradesperson gets booked. All without lifting a finger.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition"
            >
              Get Started
            </Link>
            <Link
              href="#how-it-works"
              className="inline-block px-8 py-3 border-2 border-black text-black rounded-full font-medium text-lg hover:bg-gray-50 transition"
            >
              See How It Works
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
              <div className="mb-3"><IconAlert /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Tenant Calls Interrupt Your Day</h3>
              <p className="text-gray-600">Every maintenance call pulls you away from higher-value work. And they come at all hours.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-3"><IconInbox /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Requests Fall Through the Cracks</h3>
              <p className="text-gray-600">Scattered calls, texts, and emails make it impossible to track what&apos;s been actioned and what hasn&apos;t.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-3"><IconClock /></div>
              <h3 className="font-semibold text-gray-900 mb-2">Chasing Tradespeople Is Exhausting</h3>
              <p className="text-gray-600">Finding an available plumber or electrician, coordinating access times, and following up takes hours every week.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Three steps. Fully automated from intake to booking.
          </p>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconPhone />
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Step 1</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tenant Calls In</h3>
              <p className="text-gray-600">
                The tenant calls your number. An AI agent answers 24/7, identifies them, and gathers all the details — what broke, how urgent it is, and when access is available.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconClipboard />
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Step 2</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">You Review & Approve</h3>
              <p className="text-gray-600">
                Every request is logged instantly to your dashboard. You get a notification, review the details, and approve or deny — in seconds, from anywhere.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconWrench />
              </div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Step 3</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Tradesperson Gets Booked</h3>
              <p className="text-gray-600">
                On approval, a second AI agent contacts available tradespeople, gets a booking confirmed, and notifies the tenant automatically. Zero phone tag.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-semibold text-center mb-4 text-gray-900">
            Everything You Need
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Built specifically for property managers juggling multiple properties and tenants.
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">AI Tenant Intake Agent</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><IconCheckDark /><span>Answers calls 24/7 on your number</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Identifies tenant by phone or property address</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Classifies issue type — plumbing, electrical, structural, and more</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Assesses urgency and flags emergencies instantly</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Captures preferred access windows</span></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Manager Dashboard</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><IconCheckDark /><span>All requests logged and tracked in one place</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Approve or deny with one click</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Filter by property, urgency, or status</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Email or SMS notifications on new requests</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Full history and resolution notes per property</span></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Automated Tradesperson Booking</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><IconCheckDark /><span>AI contacts your preferred tradesperson network</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Confirms booking time against tenant availability</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Sends confirmation to tenant automatically</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Logs booking details back to the dashboard</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Follows up if tradesperson doesn&apos;t confirm</span></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Smart Escalation</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start gap-2"><IconCheckDark /><span>Gas leaks, flooding, and safety issues bypass the queue</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Urgent requests call you directly if needed</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Auto-approves pre-authorised emergency categories</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Tenant is kept informed at every step</span></li>
                <li className="flex items-start gap-2"><IconCheckDark /><span>Audit trail for every decision and action</span></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Connects with the tools you already use
          </p>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            When a repair is approved, jobs flow directly into your tradespeople&apos;s existing systems — no double entry, no friction.
          </p>
          <div className="flex flex-wrap justify-center gap-4">

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
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

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
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

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">SMS</div>
                <div className="text-xs text-gray-500">Tenant notifications</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 hover:shadow-sm transition">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
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

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-semibold text-center mb-4 text-gray-900">
            Simple, Portfolio-Based Pricing
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Pay based on your portfolio size. No per-request fees. No surprises.
          </p>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Starter</h3>
              <p className="text-gray-500 text-sm mb-4">Up to 20 properties</p>
              <div className="mb-6">
                <span className="text-3xl font-semibold text-gray-900">$99</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2"><IconCheckDark /> AI intake agent</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Manager dashboard</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Email notifications</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Basic reporting</li>
              </ul>
              <Link href="/contact" className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Growth</h3>
              <p className="text-gray-500 text-sm mb-4">Up to 60 properties</p>
              <div className="mb-6">
                <span className="text-3xl font-semibold text-gray-900">$199</span>
                <span className="text-gray-500 text-sm">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2"><IconCheckDark /> Everything in Starter</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Automated booking</li>
                <li className="flex items-center gap-2"><IconCheckDark /> SMS notifications</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Priority filtering</li>
              </ul>
              <Link href="/contact" className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-black text-white rounded-2xl p-6 border-2 border-black">
              <h3 className="text-xl font-semibold mb-1">Pro</h3>
              <p className="text-gray-400 text-sm mb-4">Up to 150 properties</p>
              <div className="mb-6">
                <span className="text-3xl font-semibold">$399</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 mb-6">
                <li className="flex items-center gap-2"><IconCheck /> Everything in Growth</li>
                <li className="flex items-center gap-2"><IconCheck /> Emergency escalation</li>
                <li className="flex items-center gap-2"><IconCheck /> Full audit trail</li>
                <li className="flex items-center gap-2"><IconCheck /> Priority support</li>
              </ul>
              <Link href="/contact" className="block w-full text-center px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition">
                Get Started
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Enterprise</h3>
              <p className="text-gray-500 text-sm mb-4">150+ properties</p>
              <div className="mb-6">
                <span className="text-3xl font-semibold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center gap-2"><IconCheckDark /> Everything in Pro</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Dedicated onboarding</li>
                <li className="flex items-center gap-2"><IconCheckDark /> Custom integrations</li>
                <li className="flex items-center gap-2"><IconCheckDark /> SLA guarantee</li>
              </ul>
              <Link href="/contact" className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto text-center px-4 max-w-3xl">
          <h2 className="text-4xl font-semibold mb-6 text-gray-900">
            Ready to Automate Your Maintenance Workflow?
          </h2>
          <p className="text-xl mb-10 text-gray-600">
            Book a free 15-minute call. We&apos;ll show you exactly how it works for your portfolio.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition"
          >
            Book a Free Call
          </Link>
        </div>
      </section>

    </div>
  )
}
