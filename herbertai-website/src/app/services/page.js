import Link from 'next/link'

const IconGlobe = () => (
  <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
  </svg>
)

const IconMic = () => (
  <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z" />
  </svg>
)

const IconChat = () => (
  <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const IconSmGlobe = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
  </svg>
)

const IconSmMic = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z" />
  </svg>
)

const IconSmChat = () => (
  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const IconPhone = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const IconMail = () => (
  <svg className="w-7 h-7 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const CheckItem = ({ children }) => (
  <li className="flex items-start gap-2">
    <svg className="w-4 h-4 text-black shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
    <span className="text-gray-700">{children}</span>
  </li>
)

export default function Services() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">Our Services</h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Everything you need to capture more customers and grow your trades business.
          </p>
        </div>

        {/* Service 1: Website */}
        <div id="website" className="mb-20 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4"><IconGlobe /></div>
              <h2 className="text-4xl font-semibold mb-4 text-gray-900">Professional Website</h2>
              <p className="text-gray-600 text-lg mb-6">
                A fast, mobile-optimized website that showcases your services and converts visitors into customers.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">What&apos;s Included:</h3>
              <ul className="space-y-2 mb-6">
                <CheckItem>Custom professional design</CheckItem>
                <CheckItem>Mobile-optimized (most customers browse on phones)</CheckItem>
                <CheckItem>Fast loading (under 2 seconds)</CheckItem>
                <CheckItem>Contact forms for quote requests</CheckItem>
                <CheckItem>Before/after gallery (if applicable)</CheckItem>
                <CheckItem>Hosting & ongoing maintenance</CheckItem>
              </ul>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                <p className="text-sm text-gray-600 mb-2">Pricing:</p>
                <p className="text-2xl font-semibold text-gray-900">$300 <span className="text-base font-normal text-gray-600">one-time setup</span></p>
                <p className="text-2xl font-semibold text-gray-900">$197<span className="text-base font-normal text-gray-600">/month hosting</span></p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-1">Or get this included in our <Link href="/pricing" className="font-semibold text-blue-600 hover:underline">Complete Package for $697/month</Link></p>
                <p className="text-xs text-gray-600">(Save $294/month + no setup fees)</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Why You Need This:</h4>
              <p className="text-gray-700 mb-4">
                80% of customers check your website before calling. If you don&apos;t have one (or have an outdated one), you&apos;re losing jobs before you even know about them.
              </p>
              <p className="text-gray-700">
                A professional website builds trust, showcases your work, and makes it easy for customers to contact you.
              </p>
            </div>
          </div>
        </div>

        {/* Service 2: Voice */}
        <div id="voice" className="mb-20 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Why You Need This:</h4>
              <p className="text-gray-700 mb-4">
                Studies show 80% of callers won&apos;t leave voicemail. That means every missed call is a lost customer who will call your competitor instead.
              </p>
              <p className="text-gray-700">
                An AI receptionist ensures you never miss another opportunity — day or night.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4"><IconMic /></div>
              <h2 className="text-4xl font-semibold mb-4 text-gray-900">AI Voice Receptionist</h2>
              <p className="text-gray-600 text-lg mb-6">
                Never miss a customer call again. Our AI answers 24/7, books appointments, and captures leads while you focus on the work.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">What It Does:</h3>
              <ul className="space-y-2 mb-6">
                <CheckItem>Answers calls professionally 24/7</CheckItem>
                <CheckItem>Books appointments into Google Calendar</CheckItem>
                <CheckItem>Answers FAQs about your services/pricing</CheckItem>
                <CheckItem>Captures customer details automatically</CheckItem>
                <CheckItem>Transfers urgent calls to you if needed</CheckItem>
                <CheckItem>Sends SMS confirmations</CheckItem>
              </ul>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                <p className="text-sm text-gray-600 mb-2">Pricing:</p>
                <p className="text-2xl font-semibold text-gray-900">$297<span className="text-base font-normal text-gray-600">/month</span></p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-1">Or get this included in our <Link href="/pricing" className="font-semibold text-blue-600 hover:underline">Complete Package for $697/month</Link></p>
                <p className="text-xs text-gray-600">(Save $294/month + includes website & chatbot)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service 3: Chatbot */}
        <div id="chatbot" className="mb-20 scroll-mt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4"><IconChat /></div>
              <h2 className="text-4xl font-semibold mb-4 text-gray-900">AI Chatbot Widget</h2>
              <p className="text-gray-600 text-lg mb-6">
                Capture leads from your website 24/7. The chatbot answers questions and collects contact info automatically.
              </p>
              <h3 className="font-semibold text-gray-900 mb-3">What It Does:</h3>
              <ul className="space-y-2 mb-6">
                <CheckItem>Lives on your website as a chat widget</CheckItem>
                <CheckItem>Answers visitor questions instantly</CheckItem>
                <CheckItem>Captures name, email, phone automatically</CheckItem>
                <CheckItem>Books appointments through chat</CheckItem>
                <CheckItem>Trained on your business info</CheckItem>
                <CheckItem>Works on mobile and desktop</CheckItem>
              </ul>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
                <p className="text-sm text-gray-600 mb-2">Pricing:</p>
                <p className="text-2xl font-semibold text-gray-900">$197<span className="text-base font-normal text-gray-600">/month</span></p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-gray-700 mb-1">Or get this included in our <Link href="/pricing" className="font-semibold text-blue-600 hover:underline">Complete Package for $697/month</Link></p>
                <p className="text-xs text-gray-600">(Save $294/month + includes website & AI voice)</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Why You Need This:</h4>
              <p className="text-gray-700 mb-4">
                Most website visitors browse outside business hours. Without a chatbot, they leave without contacting you.
              </p>
              <p className="text-gray-700">
                A chatbot captures these leads automatically, even while you sleep.
              </p>
            </div>
          </div>
        </div>

        {/* Package CTA */}
        <div className="bg-black text-white rounded-3xl p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Get All 3 Services for $697/month</h2>
            <p className="text-xl text-gray-300 mb-2">Complete digital solution. No setup fees.</p>
            <p className="text-gray-400">Save $294/month vs buying individually</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="mb-3"><IconSmGlobe /></div>
              <h3 className="font-semibold mb-1">Website</h3>
              <p className="text-sm text-gray-300">Build + hosting included</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="mb-3"><IconSmMic /></div>
              <h3 className="font-semibold mb-1">AI Voice</h3>
              <p className="text-sm text-gray-300">24/7 call answering</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="mb-3"><IconSmChat /></div>
              <h3 className="font-semibold mb-1">AI Chatbot</h3>
              <p className="text-sm text-gray-300">Website chat widget</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/pricing" className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-100 transition">View Pricing</Link>
            <Link href="/contact" className="inline-block px-8 py-3 border-2 border-white text-white rounded-full font-medium text-lg hover:bg-white hover:text-black transition">Get Started</Link>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">Have Questions? Let&apos;s Talk</h2>
            <p className="text-gray-600 mb-8">
              Not sure which service is right for you? Book a free 15-minute call and we&apos;ll build a custom plan for your business.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <div className="flex justify-center mb-2"><IconPhone /></div>
                <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                <a href="tel:+61448111840" className="text-gray-600 hover:text-gray-900">0448 111 840</a>
              </div>
              <div>
                <div className="flex justify-center mb-2"><IconMail /></div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                <a href="mailto:herbert_aisolutions@outlook.com" className="text-gray-600 hover:text-gray-900 text-sm">herbert_aisolutions@outlook.com</a>
              </div>
              <div>
                <Link 
                  href="https://calendly.com/herbert_aisolutions/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
                >
                  Book Free Call
                </Link>
              </div>
            </div>
            <Link href="/contact" className="inline-block px-10 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition">
              Contact Us Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
