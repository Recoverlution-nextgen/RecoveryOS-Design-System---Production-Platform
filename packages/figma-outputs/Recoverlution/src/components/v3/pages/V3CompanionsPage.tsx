/**
 * V3 COMPANIONS PAGE
 * Support without suffocating
 */

import { V3Layout } from '../layout/V3Layout';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { SectionWrapper } from '../shared/SectionWrapper';
import { CTAButton } from '../shared/CTAButton';

export function V3CompanionsPage() {
  return (
    <V3Layout>
      {/* Hero */}
      <SectionWrapper background="dark">
        <div className="max-w-4xl mx-auto text-center py-20">
          <Headline>Support without suffocating</Headline>
          <Subhead>
            Be present without being intrusive. See progress without pressure. Help without hovering.
          </Subhead>
        </div>
      </SectionWrapper>

      {/* Visibility */}
      <SectionWrapper background="light">
        <div className="max-w-6xl mx-auto py-20">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}
              >
                See their progress, not their phone
              </h2>
              <p 
                className="text-lg text-zinc-600 mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Dashboard access shows journey completion, proof receipts, and momentum metrics. You stay informed without demanding updates.
              </p>
              <CTAButton>Request companion access</CTAButton>
            </div>
            <div 
              className="bg-zinc-100 border border-zinc-200 p-8 text-center"
              style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p className="text-zinc-500">Dashboard preview</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Boundaries */}
      <SectionWrapper background="dark">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            Healthy boundaries by design
          </h2>
          <p 
            className="text-lg text-zinc-400 mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            You see milestones and proof, not journal entries or private reflections. The system protects their autonomy while giving you confidence.
          </p>
        </div>
      </SectionWrapper>

      {/* Shared Moments */}
      <SectionWrapper background="light">
        <div className="max-w-6xl mx-auto py-20">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div 
              className="bg-zinc-100 border border-zinc-200 p-8 text-center"
              style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p className="text-zinc-500">Shared content interface</p>
            </div>
            <div>
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}
              >
                Connection without control
              </h2>
              <p 
                className="text-lg text-zinc-600 mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                They can share specific insights or practices with you when they choose. You can send supportive messages or recommended content. All opt-in, always respectful.
              </p>
              <CTAButton>Learn about companion features</CTAButton>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Peace of Mind */}
      <SectionWrapper background="dark">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
          >
            Peace of mind for both of you
          </h2>
          <p 
            className="text-lg text-zinc-400 mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            They get privacy and autonomy. You get visibility and reassurance. Everyone breathes easier.
          </p>
          <CTAButton>Start as a companion</CTAButton>
        </div>
      </SectionWrapper>
    </V3Layout>
  );
}
