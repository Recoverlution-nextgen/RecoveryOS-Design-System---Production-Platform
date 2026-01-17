/**
 * V3 ORGANISATIONS PAGE
 * Scale therapeutic standard without losing depth
 */

import { V3Layout } from '../layout/V3Layout';
import { OrgHero } from '../organisations/OrgHero';
import { DischargeCliffVisualization } from '../organisations/DischargeCliffVisualization';
import { AlumniMicrosites } from '../organisations/AlumniMicrosites';
import { InstallationAtScale } from '../organisations/InstallationAtScale';

export function V3OrganisationsPage() {
  return (
    <V3Layout>
      <OrgHero />
      <DischargeCliffVisualization />
      <AlumniMicrosites />
      <InstallationAtScale />
    </V3Layout>
  );
}
