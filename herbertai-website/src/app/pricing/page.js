const IconGlobe = () => (
  <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
  </svg>
)
const IconMic = () => (
  <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z" />
  </svg>
)
const IconChat = () => (
  <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)
const IconBolt = () => (
  <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)
const Check = ({ dark }) => (
  <svg className={`w-4 h-4 shrink-0 ${dark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
)

export default function Pricing() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Choose individual services or save with our complete package.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-12 text-center border border-gray-200">
          <p className="text-gray-700">
            <span className="font-semibold">Save $294/month</span> by choosing the Complete Package instead of individual services
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-16">
          
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="mb-3"><IconGlobe /></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Website</h3>
            <p className="text-gray-600 text-sm mb-4">Professional site + hosting</p>
            <div className="mb-4">
              <p className="text-gray-700 mb-1"><span className="text-2xl font-semibold text-gray-900">$300</span><span className="text-sm"> setup</span></p>
              <p className="text-gray-700"><span className="text-2xl font-semibold text-gray-900">$197</span><span className="text-sm">/month</span></p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center gap-2"><Check /> Custom design</li>
              <li className="flex items-center gap-2"><Check /> Mobile-optimized</li>
              <li className="flex items-center gap-2"><Check /> Hosting included</li>
              <li className="flex items-center gap-2"><Check /> Ongoing maintenance</li>
            </ul>
            <a href="/contact" className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">Get Started</a>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="mb-3"><IconMic /></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Voice</h3>
            <p className="text-gray-600 text-sm mb-4">24/7 call answering</p>
            <div className="mb-4">
              <p className="text-gray-700 mb-1"><span className="text-2xl font-semibold text-gray-900">$297</span><span className="text-sm">/month</span></p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6 mt-8">
              <li className="flex items-center gap-2"><Check /> 24/7 answering</li>
              <li className="flex items-center gap-2"><Check /> Appointment booking</li>
              <li className="flex items-center gap-2"><Check /> FAQ handling</li>
              <li className="flex items-center gap-2"><Check /> Call transfer</li>
            </ul>
            <a href="/contact" className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">Get Started</a>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="mb-3"><IconChat /></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Chatbot</h3>
            <p className="text-gray-600 text-sm mb-4">Website chat widget</p>
            <div className="mb-4">
              <p className="text-gray-700 mb-1"><span className="text-2xl font-semibold text-gray-900">$197</span><span className="text-sm">/month</span></p>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-6 mt-8">
              <li className="flex items-center gap-2"><Check /> Instant responses</li>
              <li className="flex items-center gap-2"><Check /> Lead capture</li>
              <li className="flex items-center gap-2"><Check /> Booking through chat</li>
              <li className="flex items-center gap-2"><Check /> Custom training</li>
            </ul>
            <a href="/contact" className="block w-full text-center px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">Get Started</a>
          </div>

          <div className="bg-black text-white rounded-2xl p-6 border-2 border-black relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">BEST VALUE</div>
            <div className="mb-3"><IconBolt /></div>
            <h3 className="text-xl font-semibold mb-2">Complete Package</h3>
            <p className="text-gray-300 text-sm mb-4">All 3 services included</p>
            <div className="mb-4">
              <p className="text-gray-300 line-through text-sm">$991/month</p>
              <p className="mb-1"><span className="text-3xl font-semibold">$697</span><span className="text-sm">/month</span></p>
              <p className="text-green-400 text-sm font-semibold">Save $294/month</p>
            </div>
            <ul className="space-y-2 text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2"><Check dark /> Everything included</li>
              <li className="flex items-center gap-2"><Check dark /> No setup fees</li>
              <li className="flex items-center gap-2"><Check dark /> Priority support</li>
              <li className="flex items-center gap-2"><Check dark /> Monthly updates</li>
            </ul>
            <a href="/contact" className="block w-full text-center px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition">Get Started</a>
          </div>

        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">Pricing FAQs</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Are there any contracts?</h3>
              <p className="text-gray-700">No. All services are month-to-month. Cancel anytime with 30 days notice.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">What&apos;s included in the website hosting?</h3>
              <p className="text-gray-700">Fast hosting, security updates, uptime monitoring, and content updates (up to 2 hours/month).</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">How long does setup take?</h3>
              <p className="text-gray-700">Website: 1–2 weeks. AI Voice & Chatbot: 3–5 days after website is live. Complete package: 2–3 weeks total.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade later?</h3>
              <p className="text-gray-700">Yes! Start with one service and add more anytime. Or upgrade to the package for instant savings.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8">Book a free call and we&apos;ll build a custom plan for your business.</p>
          <a href="/contact" className="inline-block px-10 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition">Schedule Free Call</a>
        </div>

      </div>
    </div>
  )
}
