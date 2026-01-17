/**
 * V3 INDIVIDUALS PAGE
 * Transform how you relate to yourself
 */

import { V3Layout } from '../layout/V3Layout';
import { Headline } from '../shared/Headline';
import { Subhead } from '../shared/Subhead';
import { SectionWrapper } from '../shared/SectionWrapper';
import { CTAButton } from '../shared/CTAButton';

export function V3IndividualsPage() {
  return (
    <V3Layout>
      {/* Hero */}
      <SectionWrapper background="dark">
        <div className="max-w-4xl mx-auto text-center py-20">
          <Headline>Transform how you relate to yourself</Headline>
          <Subhead>
            64 journeys. 832 scenes. Daily practices. Proof receipts. Change that compounds.
          </Subhead>
        </div>
      </SectionWrapper>

      {/* Journey System */}
      <SectionWrapper background="light">
        <div className="max-w-6xl mx-auto py-20">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}
              >
                Guided change, not content library
              </h2>
              <p 
                className="text-lg text-zinc-600 mb-6"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                64 therapeutic journeys built by clinicians. Each journey is a structured pathway from problem to proof. Not articles. Not videos. Actual change work.
              </p>
              <CTAButton>Start your first journey</CTAButton>
            </div>
            <div 
              className="bg-zinc-100 border border-zinc-200 p-8 text-center"
              style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <p className="text-zinc-500">Journey visualization</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Daily OS */}
      <SectionWrapper background="dark">
        <div className="max-w-6xl mx-auto py-20">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: '#fff' }}
            >
              6S Orbit: Your daily operating system
            </h2>
            <p 
              className="text-lg text-zinc-400"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Soundtrack. Stories. Stickies. Shelf. Stations. Search.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { name: 'Soundtrack', desc: 'Audio practices on demand' },
              { name: 'Stories', desc: 'Your change journal' },
              { name: 'Stickies', desc: 'Quick captures' },
              { name: 'Shelf', desc: 'Saved content' },
              { name: 'Stations', desc: 'Themed collections' },
              { name: 'Search', desc: 'Find anything' }
            ].map(item => (
              <div 
                key={item.name}
                className="bg-zinc-900 border border-zinc-800 p-6"
              >
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'var(--font-display)', color: '#5739FB' }}
                >
                  {item.name}
                </h3>
                <p 
                  className="text-sm text-zinc-400"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Proof */}
      <SectionWrapper background="light">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h2 
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)', color: '#3E2BB8' }}
          >
            Proof matters
          </h2>
          <p 
            className="text-lg text-zinc-600 mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Every practice generates a receipt. Track your progress. See the delta. Build momentum.
          </p>
          <CTAButton>See how proof works</CTAButton>
        </div>
      </SectionWrapper>
    </V3Layout>
  );
}
