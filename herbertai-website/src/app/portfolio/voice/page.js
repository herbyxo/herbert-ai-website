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
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-24 text-center">
            <p className="text-gray-400 text-sm font-medium">Work coming soon</p>
            <p className="text-gray-300 text-xs mt-1">Check back shortly — we&apos;re adding examples here.</p>
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
