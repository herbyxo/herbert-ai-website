export default function VoicePortfolioPage() {
  return (
    <>
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Portfolio · Voice Receptionists</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            AI Voice Receptionists
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            24/7 AI receptionists that answer calls, take messages, and book jobs — so you never miss a lead.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Master Freeze card */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1 mb-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-medium text-gray-600">Real call recording</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Master Freeze</h2>
                  <p className="text-gray-500 text-sm mt-1">Commercial refrigeration &amp; air systems · Sydney, NSW</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Industry</p>
                  <p className="text-sm text-gray-700 font-medium mt-0.5">Trades / Refrigeration</p>
                </div>
              </div>

              <p className="text-gray-600 mb-8 max-w-2xl">
                An unedited call handled by Herbert AI. The customer reported a suspected refrigerant leak — the AI qualified the job, collected all required details, and closed the call without any human involvement.
              </p>

              {/* Audio player */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4zm0 14a7 7 0 007-7h-2a5 5 0 01-10 0H5a7 7 0 007 7zm-1 2h2v2h-2v-2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Herbert AI — Voice Receptionist</p>
                    <p className="text-gray-400 text-xs">Refrigerant leak enquiry · inbound call</p>
                  </div>
                </div>
                <audio controls className="w-full" preload="metadata">
                  <source src="/steve-demo.wav" type="audio/wav" />
                </audio>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-semibold text-gray-900">~60s</p>
                  <p className="text-xs text-gray-500 mt-1">Call handled end-to-end</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-semibold text-gray-900">0</p>
                  <p className="text-xs text-gray-500 mt-1">Humans involved</p>
                </div>
                <div className="text-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-2xl font-semibold text-gray-900">100%</p>
                  <p className="text-xs text-gray-500 mt-1">Details captured</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Want an AI receptionist for your business?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Never miss a call again. Our AI receptionists answer 24/7, sound professional, and hand off to you when it matters.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </section>
    </>
  );
}
