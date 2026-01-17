/**
 * FOR PROFESSIONALS LANDING PAGE
 * Marketing page for therapists/counselors to join platform
 */

export default function ForProfessionalsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="text-center mb-20">
        <button
          onClick={() => onNavigate('Website')}
          className="mb-8 px-4 py-2 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
        >
          ← Back to Home
        </button>
        <h1 className="mb-6">Join Recoverlution as a Professional</h1>
        <p className="text-2xl opacity-70 mb-12 max-w-3xl mx-auto">
          Connect with patients, grow your practice, and deliver evidence-based care through the most advanced therapeutic platform
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onNavigate('professional-onboarding')}
            className="px-8 py-4 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
          >
            Get Started
          </button>
          <button
            onClick={() => onNavigate('marketing-demo')}
            className="px-8 py-4 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
          >
            Schedule Demo
          </button>
        </div>
      </header>

      {/* Benefits */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Why Professionals Choose Recoverlution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="mb-4">Grow Your Practice</h3>
            <p className="opacity-70">
              Get matched with patients seeking your specific expertise. Flexible scheduling and remote sessions make it easy to expand your reach.
            </p>
          </div>

          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="mb-4">Clinical Intelligence</h3>
            <p className="opacity-70">
              Access real-time patient data, LUMA AI insights, and evidence-based intervention recommendations to deliver better outcomes.
            </p>
          </div>

          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="mb-4">Streamlined Payments</h3>
            <p className="opacity-70">
              Automated billing through Stripe. You set your rates, we handle payments, and you receive deposits within 2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Professional Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="mb-4">🗓️ Integrated Scheduling</h3>
            <p className="opacity-70 mb-4">
              Set your availability, sync with Google Calendar or Outlook, and let patients book directly. Automated reminders reduce no-shows.
            </p>
          </div>

          <div>
            <h3 className="mb-4">💻 Video Sessions</h3>
            <p className="opacity-70 mb-4">
              Use Zoom, Google Meet, or Teams. Seamlessly integrated meeting links sent automatically to patients.
            </p>
          </div>

          <div>
            <h3 className="mb-4">📊 Patient Dashboard</h3>
            <p className="opacity-70 mb-4">
              Track patient progress with Momentum metrics, engagement data, and LUMA AI recommendations for personalized interventions.
            </p>
          </div>

          <div>
            <h3 className="mb-4">📝 Clinical Notes</h3>
            <p className="opacity-70 mb-4">
              Secure, HIPAA-compliant notes system. Document sessions, track treatment plans, and maintain complete patient records.
            </p>
          </div>

          <div>
            <h3 className="mb-4">🎯 Outcome Tracking</h3>
            <p className="opacity-70 mb-4">
              Measure clinical outcomes with validated instruments. Demonstrate effectiveness to patients and payers.
            </p>
          </div>

          <div>
            <h3 className="mb-4">📚 Content Library</h3>
            <p className="opacity-70 mb-4">
              Assign evidence-based articles, practices, and NaviCues from our curated library to support patient growth between sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="max-w-2xl mx-auto p-8 bg-[#3E2BB8] bg-opacity-10 rounded-lg border border-[#3E2BB8] border-opacity-30">
          <h3 className="text-center mb-4">15% Platform Fee</h3>
          <p className="text-center opacity-70 mb-6">
            We only make money when you do. Set your own rates, and we take a 15% platform fee from each session.
          </p>
          <div className="p-6 bg-white bg-opacity-10 rounded mb-6">
            <p className="text-sm mb-2 opacity-70">Example:</p>
            <div className="flex justify-between mb-2">
              <span>Your Rate: $150/session</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Platform Fee (15%):</span>
              <span>$22.50</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white border-opacity-10">
              <span>You Receive:</span>
              <span className="text-xl">$127.50</span>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>No monthly fees</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>No setup costs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Automated payments via Stripe</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Full platform access</span>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="mb-6">Ready to Get Started?</h2>
        <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto">
          Join hundreds of professionals delivering better outcomes through Recoverlution
        </p>
        <button
          onClick={() => onNavigate('professional-onboarding')}
          className="px-8 py-4 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
        >
          Create Professional Account
        </button>
      </section>
    </div>
  );
}
