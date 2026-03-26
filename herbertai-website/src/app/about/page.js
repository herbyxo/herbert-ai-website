export default function About() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">
            About Herbert AI
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            We help Australian trades businesses capture more customers and run smoother operations through smart digital systems.
          </p>
        </div>

        {/* Why We Created This */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Why We Created Herbert AI
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              We saw a clear problem: trades businesses are amazing at their craft, but most struggle 
              with the digital side of business. They're losing customers to missed calls, outdated 
              websites, and manual processes that eat up valuable time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Meanwhile, larger companies with big marketing budgets are capturing customers that 
              smaller trades businesses should be getting. It's not because they do better work - 
              it's because they have better systems.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Herbert AI exists to level the playing field. We give small to medium trades businesses 
              the same professional digital presence and automated systems that big companies have - 
              at a price they can actually afford.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Our Mission
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe every trades business deserves professional digital systems, regardless of 
              size or budget. Our mission is to help you:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-black mr-3 font-semibold">•</span>
                <span>Never miss a customer call, even outside business hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-3 font-semibold">•</span>
                <span>Present a professional image online that builds trust</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-3 font-semibold">•</span>
                <span>Capture leads automatically while you focus on the work</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-3 font-semibold">•</span>
                <span>Compete with larger companies without a massive budget</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-3 font-semibold">•</span>
                <span>Save hours every week on admin and customer communication</span>
              </li>
            </ul>
          </div>
        </div>

        {/* The Problems We Solve */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            The Problems We Solve
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Missed Calls = Lost Revenue</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Studies show that 80% of callers won't leave a voicemail. Every missed call is 
                likely a lost customer - potentially thousands in lost revenue every month.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">No Online Presence</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                80% of customers check your website before calling. Without a professional site, 
                you're losing trust and credibility before you even speak to potential customers.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">After-Hours Inquiries</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Customers want to book when it's convenient for them - not just during your business 
                hours. Without 24/7 availability, you're losing customers to competitors who are available.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Manual Admin Time</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Answering the same questions, booking appointments, following up with quotes - 
                these tasks eat 10+ hours per week that you could spend doing actual paid work.
              </p>
            </div>

          </div>
        </div>

        {/* Our Solution */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            Our Solution
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-6">
              Herbert AI provides complete digital solutions specifically designed for trades businesses. 
              We combine professional website design with cutting-edge AI technology to create systems that:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg></div>
                <h3 className="font-semibold text-gray-900 mb-2">Build Trust</h3>
                <p className="text-gray-700 text-sm">
                  Professional websites that showcase your work and make customers confident in choosing you
                </p>
              </div>

              <div>
                <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z" /></svg></div>
                <h3 className="font-semibold text-gray-900 mb-2">Capture Leads</h3>
                <p className="text-gray-700 text-sm">
                  AI systems that answer calls and website inquiries 24/7, so you never miss an opportunity
                </p>
              </div>

              <div>
                <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
                <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
                <p className="text-gray-700 text-sm">
                  Automated booking, FAQs, and lead capture that free up 10+ hours per week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900">
            What Makes Us Different
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Built Specifically for Trades</h3>
              <p className="text-gray-700">
                We don't do generic marketing. Every system we build is designed specifically for 
                how trades businesses operate - emergency calls, appointment booking, quote requests, 
                service area coverage.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Done-For-You Service</h3>
              <p className="text-gray-700">
                You don't need any technical knowledge. We handle everything - design, setup, training, 
                ongoing updates. You just tell us about your business and we make it work.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Affordable & Flexible</h3>
              <p className="text-gray-700">
                No massive upfront costs or long-term contracts. Choose individual services or our 
                complete package. Cancel anytime. We make professional digital systems accessible 
                to businesses of any size.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Results</h3>
              <p className="text-gray-700">
                Our clients see an average 30% increase in booked jobs and save 10+ hours per week 
                on admin work. This isn't just nice-to-have tech - it's systems that directly 
                impact your bottom line.
              </p>
            </div>
          </div>
        </div>

        {/* Who We Help */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
            Who We Help
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Plumbers</h3>
              <p className="text-gray-700 text-sm">Emergency calls, appointment booking, service areas</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Electricians</h3>
              <p className="text-gray-700 text-sm">Quote requests, urgent repairs, solar installations</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Builders</h3>
              <p className="text-gray-700 text-sm">Project inquiries, portfolio showcase, consultation booking</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">HVAC</h3>
              <p className="text-gray-700 text-sm">Installation quotes, maintenance bookings, emergency service</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21l-4.35-4.35M15 11a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Landscapers</h3>
              <p className="text-gray-700 text-sm">Project quotes, seasonal services, before/after showcases</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center">
              <div className="mb-3"><svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">And More</h3>
              <p className="text-gray-700 text-sm">Any trades business that wants to grow</p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
            Built By Someone Who Gets It
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Herbert AI was created by an Adelaide-based software engineer who understands both 
              technology and business. We've seen firsthand how missed calls and poor online presence 
              cost trades businesses thousands in lost revenue. Our mission is simple: give you the 
              digital systems that big companies have, at a price small businesses can afford.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-black text-white rounded-3xl p-12">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the growing number of Adelaide trades businesses using smart digital systems 
            to capture more customers and save time.
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium text-lg hover:bg-gray-100 transition"
          >
            Get Started Today
          </a>
        </div>

      </div>
    </div>
  )
}