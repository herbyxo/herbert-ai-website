export default function Demo() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">
            See Herbert AI In Action
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Watch how Herbert AI handles customer calls professionally, books appointments, 
            and captures important information - all while you focus on your business.
          </p>
        </div>

        {/* Features Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
            What Herbert AI Does
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Answer Calls 24/7</h3>
              <p className="text-gray-600">Never miss a customer, even after hours or during busy periods.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Book Appointments</h3>
              <p className="text-gray-600">Check your calendar availability and schedule appointments automatically.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Answer FAQs</h3>
              <p className="text-gray-600">Trained on your business information to answer common questions.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Capture Information</h3>
              <p className="text-gray-600">Records names, phone numbers, and messages in your system.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Transfer Calls</h3>
              <p className="text-gray-600">Seamlessly transfer to you or your team when needed.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Custom To Your Business</h3>
              <p className="text-gray-600">Tailored with your pricing, services, and specific information.</p>
            </div>

          </div>
        </div>

        {/* Real Call Recording */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium text-gray-600">Real call recording</span>
            </div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Hear It For Yourself
            </h2>
            <p className="text-gray-600 mb-10">
              This is an unedited call handled by Herbert AI for a commercial refrigeration client in Adelaide. The customer reported a suspected refrigerant leak — the AI qualified the job, collected all details, and closed the call.
            </p>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4zm0 14a7 7 0 007-7h-2a5 5 0 01-10 0H5a7 7 0 007 7zm-1 2h2v2h-2v-2z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">Herbert AI — Voice Receptionist</p>
                  <p className="text-gray-500 text-xs">Commercial refrigeration client · Adelaide, SA</p>
                </div>
              </div>
              <audio
                controls
                className="w-full"
                preload="metadata"
              >
                <source src="/steve-demo.wav" type="audio/wav" />
              </audio>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-2xl font-semibold text-gray-900">~60s</p>
                <p className="text-xs text-gray-500 mt-1">Call handled end-to-end</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-2xl font-semibold text-gray-900">0</p>
                <p className="text-xs text-gray-500 mt-1">Humans involved</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <p className="text-2xl font-semibold text-gray-900">100%</p>
                <p className="text-xs text-gray-500 mt-1">Details captured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Behind the Scenes */}
        <div className="mt-16 bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">
            What Happens Behind The Scenes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center">
              <div className="flex justify-center mb-3"><svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Captures Details</h3>
              <p className="text-gray-600 text-sm">
                Name, phone number, and preferences are recorded automatically
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3"><svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Checks Calendar</h3>
              <p className="text-gray-600 text-sm">
                Integrates with Google Calendar to check real-time availability
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-3"><svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
              <h3 className="font-semibold text-gray-900 mb-2">Sends Confirmation</h3>
              <p className="text-gray-600 text-sm">
                Automatic SMS confirmation sent to the customer
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how Herbert AI can be customized for your business needs.
          </p>
          <a 
            href="/contact"
            className="inline-block px-8 py-3 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition"
          >
            Contact Us
          </a>
        </div>

      </div>
    </div>
  )
}