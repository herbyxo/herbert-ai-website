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

        {/* Sample Conversation */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
            Sample Conversation
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Here's how Herbert AI handles a typical appointment booking call:
          </p>

          <div className="space-y-4 max-w-3xl mx-auto">
            
            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  Good afternoon! Thank you for calling. How can I help you today?
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl rounded-tr-sm p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">Customer</p>
                <p>
                  Hi, I'd like to book an appointment for next week.
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  Of course! I'd be happy to help you book an appointment. Can I please get your name?
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl rounded-tr-sm p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">Customer</p>
                <p>
                  Sure, it's Sarah Mitchell.
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  Thank you, Sarah. And what's the best contact number for you?
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl rounded-tr-sm p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">Customer</p>
                <p>
                  0412 345 678
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  Perfect. Let me check availability for next week. What day works best for you?
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl rounded-tr-sm p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">Customer</p>
                <p>
                  Tuesday afternoon if possible?
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  Great! I have availability at 2:00 PM and 3:30 PM on Tuesday. Which time suits you better?
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl rounded-tr-sm p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">Customer</p>
                <p>
                  2:00 PM works perfectly.
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  Excellent! I've booked you in for Tuesday at 2:00 PM. You'll receive a confirmation text at 0412 345 678. Is there anything else I can help you with today?
                </p>
              </div>
            </div>

            {/* Customer Message */}
            <div className="flex justify-end">
              <div className="bg-black text-white rounded-2xl rounded-tr-sm p-4 max-w-md">
                <p className="text-sm font-semibold mb-1">Customer</p>
                <p>
                  No, that's all. Thank you!
                </p>
              </div>
            </div>

            {/* AI Message */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-tl-sm p-4 max-w-md border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-1">Herbert AI</p>
                <p className="text-gray-700">
                  You're welcome, Sarah! We look forward to seeing you on Tuesday at 2:00 PM. Have a great day!
                </p>
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