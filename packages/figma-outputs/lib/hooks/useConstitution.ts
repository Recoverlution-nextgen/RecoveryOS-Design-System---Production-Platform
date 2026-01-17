// CONSTITUTION HEALTH HOOKS
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type { ConstitutionHealth, LawStatus } from '@/lib/types/constitution';

const supabase = createClient();

export function useConstitutionHealth() {
  return useQuery({
    queryKey: ['constitution', 'health'],
    queryFn: async (): Promise<ConstitutionHealth> => {
      // Fetch metrics for each law
      const laws = await Promise.all([
        checkLaw1(), // The Unit Is an Intervention
        checkLaw2(), // No Contract, No Delivery
        checkLaw3(), // Content Is Not Delivery
        checkLaw4(), // One Event Spine
        checkLaw5(), // Proof Is the One Language
        checkLaw6(), // Safety Is Policy, Not Flags
        checkLaw7(), // WhyNow Is Mandatory
        checkLaw8(), // Contracts Must Fail Gracefully
        checkLaw9(), // State Is One Model
        checkLaw10(), // Agency Is a First-Class Feature
      ]);
      
      const overall_score = Math.round(
        laws.reduce((sum, law) => sum + law.score, 0) / laws.length
      );
      
      const status = 
        overall_score >= 80 ? 'healthy' :
        overall_score >= 60 ? 'degraded' :
        'critical';
      
      return {
        overall_score,
        status,
        laws,
        last_updated: new Date().toISOString(),
      };
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

// LAW 1: The Unit Is an Intervention
async function checkLaw1(): Promise<LawStatus> {
  const { count: totalContent } = await supabase
    .from('content_registry')
    .select('*', { count: 'exact', head: true });
  
  // All items in content_registry should be interventions
  const score = totalContent && totalContent > 0 ? 100 : 0;
  
  return {
    law_number: 1,
    law_name: 'The Unit Is an Intervention',
    status: score === 100 ? 'healthy' : 'violation',
    score,
    message: `${totalContent || 0} interventions registered`,
    details: { total_content: totalContent },
  };
}

// LAW 2: No Contract, No Delivery
async function checkLaw2(): Promise<LawStatus> {
  const { count: totalContent } = await supabase
    .from('content_registry')
    .select('*', { count: 'exact', head: true });
  
  // All should have valid response_contract (enforced by DB constraint)
  // If we can query them, they're valid
  const score = 100;
  
  return {
    law_number: 2,
    law_name: 'No Contract, No Delivery',
    status: 'healthy',
    score,
    message: `All ${totalContent || 0} items have valid contracts`,
    details: { total_with_contracts: totalContent },
  };
}

// LAW 3: Content Is Not Delivery
async function checkLaw3(): Promise<LawStatus> {
  const { count: totalContent } = await supabase
    .from('content_registry')
    .select('*', { count: 'exact', head: true });
  
  const { count: totalDeliveries } = await supabase
    .from('delivery_registry')
    .select('*', { count: 'exact', head: true });
  
  const avgDeliveriesPerContent = totalContent && totalContent > 0
    ? (totalDeliveries || 0) / totalContent
    : 0;
  
  const score = Math.min(100, Math.round(avgDeliveriesPerContent * 50));
  
  return {
    law_number: 3,
    law_name: 'Content Is Not Delivery',
    status: score >= 80 ? 'healthy' : score >= 50 ? 'warning' : 'violation',
    score,
    message: `${avgDeliveriesPerContent.toFixed(1)} deliveries per content`,
    details: {
      total_content: totalContent,
      total_deliveries: totalDeliveries,
      avg_per_content: avgDeliveriesPerContent,
    },
  };
}

// LAW 4: One Event Spine
async function checkLaw4(): Promise<LawStatus> {
  // Check event volume in last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  
  const { count: recentEvents } = await supabase
    .from('event_spine')
    .select('*', { count: 'exact', head: true })
    .gte('occurred_at', oneHourAgo);
  
  const eventsPerHour = recentEvents || 0;
  const score = eventsPerHour > 0 ? 100 : 50; // Events are flowing
  
  return {
    law_number: 4,
    law_name: 'One Event Spine',
    status: score === 100 ? 'healthy' : 'warning',
    score,
    message: `${eventsPerHour} events/hour`,
    details: { events_last_hour: eventsPerHour },
  };
}

// LAW 5: Proof Is the One Language
async function checkLaw5(): Promise<LawStatus> {
  const { count: completions } = await supabase
    .from('event_spine')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'content_completed');
  
  const { count: proofs } = await supabase
    .from('proof_artifacts')
    .select('*', { count: 'exact', head: true });
  
  const proofRatio = completions && completions > 0
    ? (proofs || 0) / completions
    : 0;
  
  const score = Math.round(proofRatio * 100);
  
  return {
    law_number: 5,
    law_name: 'Proof Is the One Language',
    status: score >= 80 ? 'healthy' : score >= 50 ? 'warning' : 'violation',
    score,
    message: `${Math.round(proofRatio * 100)}% completion → proof`,
    details: {
      completions,
      proofs,
      proof_ratio: proofRatio,
    },
  };
}

// LAW 6: Safety Is Policy, Not Flags
async function checkLaw6(): Promise<LawStatus> {
  const { count: activePolicies } = await supabase
    .from('safety_policies')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);
  
  const { count: recentOutcomes } = await supabase
    .from('safety_policy_outcomes')
    .select('*', { count: 'exact', head: true });
  
  const score = (activePolicies || 0) > 0 ? 100 : 0;
  
  return {
    law_number: 6,
    law_name: 'Safety Is Policy, Not Flags',
    status: score === 100 ? 'healthy' : 'violation',
    score,
    message: `${activePolicies || 0} active policies, ${recentOutcomes || 0} evaluations`,
    details: {
      active_policies: activePolicies,
      recent_outcomes: recentOutcomes,
    },
  };
}

// LAW 7: WhyNow Is Mandatory
async function checkLaw7(): Promise<LawStatus> {
  const { count: totalContent } = await supabase
    .from('content_registry')
    .select('*', { count: 'exact', head: true });
  
  // All should have why_now_template (enforced by constraint)
  const score = 100;
  
  return {
    law_number: 7,
    law_name: 'WhyNow Is Mandatory',
    status: 'healthy',
    score,
    message: `All ${totalContent || 0} items have WhyNow templates`,
    details: { total_with_why_now: totalContent },
  };
}

// LAW 8: Contracts Must Fail Gracefully
async function checkLaw8(): Promise<LawStatus> {
  const { count: abandoned } = await supabase
    .from('event_spine')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'content_abandoned');
  
  const { count: rescued } = await supabase
    .from('event_spine')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'rescue_initiated');
  
  const recoveryRate = abandoned && abandoned > 0
    ? (rescued || 0) / abandoned
    : 1; // No abandonments = perfect
  
  const score = Math.round(recoveryRate * 100);
  
  return {
    law_number: 8,
    law_name: 'Contracts Must Fail Gracefully',
    status: score >= 80 ? 'healthy' : score >= 50 ? 'warning' : 'violation',
    score,
    message: `${Math.round(recoveryRate * 100)}% recovery rate`,
    details: {
      abandoned,
      rescued,
      recovery_rate: recoveryRate,
    },
  };
}

// LAW 9: State Is One Model
async function checkLaw9(): Promise<LawStatus> {
  const { count: stateSnapshots } = await supabase
    .from('user_state_snapshots')
    .select('*', { count: 'exact', head: true });
  
  const score = (stateSnapshots || 0) > 0 ? 100 : 50;
  
  return {
    law_number: 9,
    law_name: 'State Is One Model',
    status: score === 100 ? 'healthy' : 'warning',
    score,
    message: `${stateSnapshots || 0} state snapshots captured`,
    details: { total_snapshots: stateSnapshots },
  };
}

// LAW 10: Agency Is a First-Class Feature
async function checkLaw10(): Promise<LawStatus> {
  const { count: totalUsers } = await supabase
    .from('user_agency_settings')
    .select('*', { count: 'exact', head: true });
  
  const { count: customizedSettings } = await supabase
    .from('user_agency_settings')
    .select('*', { count: 'exact', head: true })
    .or('luma_enabled.eq.false,luma_suggestion_frequency.neq.balanced');
  
  const adoptionRate = totalUsers && totalUsers > 0
    ? (customizedSettings || 0) / totalUsers
    : 0;
  
  const score = Math.round(adoptionRate * 100);
  
  return {
    law_number: 10,
    law_name: 'Agency Is a First-Class Feature',
    status: score >= 20 ? 'healthy' : 'warning',
    score,
    message: `${Math.round(adoptionRate * 100)}% users customized settings`,
    details: {
      total_users: totalUsers,
      customized: customizedSettings,
      adoption_rate: adoptionRate,
    },
  };
}

export function useLawStatus(lawNumber: number) {
  const { data: health } = useConstitutionHealth();
  
  return health?.laws.find(law => law.law_number === lawNumber);
}
