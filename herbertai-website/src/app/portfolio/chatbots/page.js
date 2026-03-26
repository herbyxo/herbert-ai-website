export default function ChatbotsPortfolioPage() {
  return (
    <>
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Portfolio · Chatbots</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            AI Chatbot Widgets
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Custom AI chat widgets built for local businesses — answering questions, capturing leads, and working 24/7.
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
          <h2 className="text-3xl font-bold mb-4">Want an AI chatbot for your business?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We build smart chat widgets that handle enquiries, answer FAQs, and capture leads — so you don&apos;t have to.
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
