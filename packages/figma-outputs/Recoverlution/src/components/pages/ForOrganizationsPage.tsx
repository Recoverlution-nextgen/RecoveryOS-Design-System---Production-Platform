/**
 * FOR ORGANIZATIONS LANDING PAGE
 * Marketing page for treatment centers/clinics
 */

export default function ForOrganizationsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
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
        <h1 className="mb-6">Recoverlution for Organizations</h1>
        <p className="text-2xl opacity-70 mb-12 max-w-3xl mx-auto">
          Deliver measurable outcomes, scale your impact, and reduce costs with the complete therapeutic intelligence platform
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onNavigate('organization-onboarding')}
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

      {/* Value Proposition */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Why Organizations Choose Recoverlution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="mb-4">Measurable Outcomes</h3>
            <p className="opacity-70">
              Track clinical outcomes across your entire patient population. Demonstrate effectiveness to payers and regulators with real data.
            </p>
          </div>

          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="mb-4">Reduce Costs</h3>
            <p className="opacity-70">
              PMPM pricing scales with your active patients. Pay only for what you use. Reduce readmissions with adaptive interventions.
            </p>
          </div>

          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="mb-4">AI-Powered Intelligence</h3>
            <p className="opacity-70">
              LUMA orchestration layer analyzes patient signals and delivers just-in-time interventions. Clinical decision support for your entire team.
            </p>
          </div>
        </div>
      </section>

      {/* Organization Features */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Complete Platform for Treatment Centers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="mb-4">👥 Team Management</h3>
            <p className="opacity-70 mb-4">
              Manage your entire clinical team from one dashboard. Assign patients, track caseloads, monitor team performance.
            </p>
          </div>

          <div>
            <h3 className="mb-4">📈 Analytics Dashboard</h3>
            <p className="opacity-70 mb-4">
              Real-time visibility into patient engagement, clinical outcomes, and team utilization. Export reports for payers and regulators.
            </p>
          </div>

          <div>
            <h3 className="mb-4">🔒 HIPAA Compliant</h3>
            <p className="opacity-70 mb-4">
              Enterprise-grade security. End-to-end encryption. BAA included. SOC 2 Type II certified. Your patient data is protected.
            </p>
          </div>

          <div>
            <h3 className="mb-4">🎯 Risk Stratification</h3>
            <p className="opacity-70 mb-4">
              LUMA identifies high-risk patients before crisis. Adaptive interventions prevent relapse and reduce readmissions.
            </p>
          </div>

          <div>
            <h3 className="mb-4">📚 Evidence-Based Content</h3>
            <p className="opacity-70 mb-4">
              Complete library of clinically validated articles, practices, and interventions mapped to the 6-Pillar Clinical Blueprint.
            </p>
          </div>

          <div>
            <h3 className="mb-4">🔗 EHR Integration</h3>
            <p className="opacity-70 mb-4">
              Integrate with your existing EHR. Bidirectional data sync. No duplicate data entry for your team.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Predictable, Scalable Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Tier */}
          <div className="p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <h3 className="mb-2">Standard</h3>
            <p className="text-sm opacity-70 mb-6">For treatment centers with up to 100 patients</p>
            <div className="mb-6">
              <p className="text-4xl mb-2">$50</p>
              <p className="text-sm opacity-70">per patient per month (PMPM)</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Up to 100 active patients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Unlimited team members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Full platform access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Analytics dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Email support</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('organization-onboarding')}
              className="w-full px-6 py-3 bg-white bg-opacity-10 rounded hover:bg-opacity-20 transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="p-8 bg-[#3E2BB8] bg-opacity-10 rounded-lg border-2 border-[#3E2BB8] border-opacity-50">
            <div className="inline-block px-3 py-1 bg-[#3E2BB8] text-white text-xs rounded mb-4">
              MOST POPULAR
            </div>
            <h3 className="mb-2">Enterprise</h3>
            <p className="text-sm opacity-70 mb-6">For large organizations (100+ patients)</p>
            <div className="mb-6">
              <p className="text-4xl mb-2">$40</p>
              <p className="text-sm opacity-70">per patient per month (PMPM)</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Unlimited patients</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Unlimited team members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Full platform access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Advanced analytics & reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>EHR integration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Phone & email support</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Custom training & onboarding</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('organization-onboarding')}
              className="w-full px-6 py-3 bg-[#3E2BB8] text-white rounded hover:bg-[#5739FB] transition-all"
            >
              Get Started
            </button>
          </div>
        </div>

        <p className="text-center text-sm opacity-70 mt-8">
          Pay only for active patients • No setup fees • Cancel anytime
        </p>
      </section>

      {/* ROI Calculator */}
      <section className="mb-20">
        <h2 className="text-center mb-12">Calculate Your ROI</h2>
        <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
          <div className="space-y-6">
            <div>
              <label className="block mb-2">Number of Active Patients</label>
              <input
                type="number"
                defaultValue={80}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Current Readmission Rate (%)</label>
              <input
                type="number"
                defaultValue={30}
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-white border-opacity-10 rounded"
              />
            </div>
            <div className="p-6 bg-[#3E2BB8] bg-opacity-10 rounded">
              <p className="text-sm opacity-70 mb-4">Estimated Results with Recoverlution:</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monthly Platform Cost:</span>
                  <span className="text-xl">$4,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Readmissions Prevented:</span>
                  <span className="text-xl text-green-400">35%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Savings (Annual):</span>
                  <span className="text-xl text-green-400">$186,000</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-white border-opacity-10">
                  <span>Net ROI:</span>
                  <span className="text-3xl text-green-400">288%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="mb-6">Ready to Transform Your Organization?</h2>
        <p className="text-lg opacity-70 mb-8 max-w-2xl mx-auto">
          Join leading treatment centers delivering better outcomes through therapeutic intelligence
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onNavigate('organization-onboarding')}
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
      </section>
    </div>
  );
}
