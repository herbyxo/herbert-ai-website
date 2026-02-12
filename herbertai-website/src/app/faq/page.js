export default function FAQ() {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold mb-6 text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Everything you need to know about Herbert AI
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          
          {/* General Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What does Herbert AI do?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We provide complete digital solutions for trades businesses. This includes professional 
              websites, AI voice receptionists that answer calls 24/7, and AI chatbots that capture 
              leads from your website. Everything you need to stop losing customers and grow your business.
            </p>
          </div>

          {/* Website Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How long does it take to build a website?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Typically 1-2 weeks from start to finish. This includes a consultation to understand 
              your needs, design and development, your review and feedback, and final launch. We 
              handle everything - you just provide photos and content about your business.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What's included in website hosting?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our $197/month hosting includes fast, reliable hosting, security updates, uptime 
              monitoring, regular backups, and up to 2 hours/month of content updates (text changes, 
              new photos, etc.). Your site stays fast, secure, and up-to-date without you lifting a finger.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Can I update the website myself?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We handle all updates for you (included in hosting). Just email us what you want changed 
              and we'll update it within 24 hours. This is actually easier than learning a website 
              builder - plus you get professional results every time.
            </p>
          </div>

          {/* AI Voice Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Does the AI voice sound robotic?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              No. Our AI uses advanced natural language processing to sound natural and conversational. 
              Most customers can't tell they're speaking with an AI. The voice is professional, friendly, 
              and adapts to the conversation naturally - much better than a voicemail.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Can it understand different accents?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Yes. The AI is trained on diverse speech patterns and accents from around the world, 
              including Australian accents. It can understand and respond to various accents, dialects, 
              and speaking styles effectively.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What if the AI can't answer a question?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              If the AI encounters a question it can't answer, it will politely take a message with 
              the customer's details and let them know you'll get back to them. You can also configure 
              it to transfer the call directly to you or your team for complex inquiries.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How does appointment booking work?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The AI connects directly to your Google Calendar. When a customer requests an appointment, 
              it checks your real-time availability, offers suitable time slots, and books the appointment 
              automatically. Both you and the customer receive confirmation via SMS and email. It syncs 
              perfectly with your existing calendar.
            </p>
          </div>

          {/* Chatbot Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How does the chatbot work on my website?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The chatbot appears as a small widget in the corner of your website. Visitors can click 
              it to ask questions anytime. It's trained on your business information - services, pricing, 
              areas you cover - so it can answer questions instantly and capture contact details. Works 
              24/7, even when you're asleep or on a job.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Can the chatbot book appointments too?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Yes! Just like the voice AI, the chatbot can check your calendar and book appointments 
              directly through the website chat. Customers love this because they can book at their 
              convenience without calling.
            </p>
          </div>

          {/* Customization Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How is everything customized to my business?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We start with a detailed consultation to understand your business - services, pricing, 
              common questions customers ask, your processes, and your brand. Then we train the AI 
              systems on this information and design your website to match. Everything is tailored 
              specifically to your business, not generic.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Can I update the AI's information later?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Absolutely. As your business evolves - new services, updated pricing, changed hours - 
              we update the AI's knowledge base to reflect these changes. Updates are included in 
              your monthly service, just let us know what changed.
            </p>
          </div>

          {/* Pricing & Contract Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Are there any long-term contracts?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              No. All our services are month-to-month. You can cancel anytime with 30 days notice. 
              We keep customers by providing great service, not by locking them into contracts.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Can I start with one service and add more later?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Yes! Many clients start with just a website or just the AI voice receptionist, then 
              add other services later. You can also upgrade to our complete package anytime to get 
              all three services at a discounted rate.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How much does the complete package save me?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              The complete package ($697/month) includes a website, AI voice receptionist, and AI 
              chatbot. If purchased separately, these would cost $991/month plus a $300 setup fee. 
              So you save $294/month plus the setup fee - over $3,800 in the first year.
            </p>
          </div>

          {/* Technical Questions */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              How long does setup take?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Website: 1-2 weeks. AI voice receptionist: 3-5 days (after consultation). AI chatbot: 
              3-5 days. If you get the complete package, everything is typically live within 2-3 weeks. 
              We handle all the technical setup - you just provide information about your business.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              What if I already have a website?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We can add the AI chatbot to your existing website, or rebuild it if it's outdated. 
              We can also just provide the voice receptionist service independently. You don't need 
              to buy everything - choose what makes sense for your business.
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Do I need any technical knowledge?
            </h3>
            <p className="text-gray-700 leading-relaxed">
              None at all. We handle everything technical. You just tell us about your business 
              and we set everything up. When customers call or visit your website, everything works 
              automatically. You can focus on doing the actual work while we handle the tech.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gray-50 rounded-2xl p-12 border border-gray-200">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Book a free 15-minute call and we'll answer any questions you have about our services.
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