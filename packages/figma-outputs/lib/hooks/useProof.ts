// PROOF ARTIFACT HOOKS
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/utils/supabase/client';
import type {
  ProofArtifact,
  ProofArtifactFilters,
  ProofAnalytics,
  ProofType,
} from '@/lib/types/constitution';

const supabase = createClient();

export function useProofArtifacts(filters?: ProofArtifactFilters) {
  return useQuery({
    queryKey: ['proof_artifacts', filters],
    queryFn: async (): Promise<ProofArtifact[]> => {
      let query = supabase
        .from('proof_artifacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (filters?.artifact_type?.length) {
        query = query.in('artifact_type', filters.artifact_type);
      }
      
      if (filters?.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      
      if (filters?.content_ref) {
        query = query.eq('content_ref', filters.content_ref);
      }
      
      if (filters?.min_confidence !== undefined) {
        query = query.gte('confidence_score', filters.min_confidence);
      }
      
      if (filters?.time_range) {
        query = query
          .gte('created_at', filters.time_range.start)
          .lte('created_at', filters.time_range.end);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    },
  });
}

export function useProofArtifact(artifactId: string | null) {
  return useQuery({
    queryKey: ['proof_artifact', artifactId],
    queryFn: async (): Promise<ProofArtifact | null> => {
      if (!artifactId) return null;
      
      const { data, error } = await supabase
        .from('proof_artifacts')
        .select('*')
        .eq('id', artifactId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!artifactId,
  });
}

export function useProofAnalytics(timeRange?: { start: string; end: string }): {
  data: ProofAnalytics | undefined;
  isLoading: boolean;
  error: Error | null;
} {
  return useQuery({
    queryKey: ['proof_analytics', timeRange],
    queryFn: async (): Promise<ProofAnalytics> => {
      let query = supabase.from('proof_artifacts').select('*');
      
      if (timeRange) {
        query = query
          .gte('created_at', timeRange.start)
          .lte('created_at', timeRange.end);
      }
      
      const { data: artifacts } = await query;
      
      if (!artifacts) {
        return {
          total_artifacts: 0,
          artifacts_by_type: {} as Record<ProofType, number>,
          average_confidence: 0,
          average_confidence_by_type: {} as Record<ProofType, number>,
          generation_rate_over_time: [],
          schema_impact: {},
          transfer_success_rate: 0,
        };
      }
      
      // Count by type
      const artifacts_by_type: Record<string, number> = {};
      const confidenceByType: Record<string, number[]> = {};
      
      artifacts.forEach(artifact => {
        artifacts_by_type[artifact.artifact_type] = (artifacts_by_type[artifact.artifact_type] || 0) + 1;
        
        if (artifact.confidence_score !== null && artifact.confidence_score !== undefined) {
          if (!confidenceByType[artifact.artifact_type]) {
            confidenceByType[artifact.artifact_type] = [];
          }
          confidenceByType[artifact.artifact_type].push(artifact.confidence_score);
        }
      });
      
      // Average confidence overall
      const allConfidences = artifacts
        .map(a => a.confidence_score)
        .filter((c): c is number => c !== null && c !== undefined);
      
      const average_confidence = allConfidences.length > 0
        ? allConfidences.reduce((sum, c) => sum + c, 0) / allConfidences.length
        : 0;
      
      // Average confidence by type
      const average_confidence_by_type: Record<string, number> = {};
      Object.entries(confidenceByType).forEach(([type, scores]) => {
        average_confidence_by_type[type] = scores.reduce((sum, s) => sum + s, 0) / scores.length;
      });
      
      // Generation rate over time (group by day)
      const rateByDay: Record<string, number> = {};
      artifacts.forEach(artifact => {
        const day = new Date(artifact.created_at).toISOString().slice(0, 10);
        rateByDay[day] = (rateByDay[day] || 0) + 1;
      });
      
      const generation_rate_over_time = Object.entries(rateByDay)
        .map(([timestamp, count]) => ({ timestamp, count }))
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
      
      // Schema impact
      const schema_impact: Record<string, { update_count: number; avg_confidence: number }> = {};
      artifacts.forEach(artifact => {
        if (artifact.schema_updates) {
          Object.keys(artifact.schema_updates).forEach(schema => {
            if (!schema_impact[schema]) {
              schema_impact[schema] = { update_count: 0, avg_confidence: 0 };
            }
            schema_impact[schema].update_count++;
            if (artifact.confidence_score) {
              schema_impact[schema].avg_confidence += artifact.confidence_score;
            }
          });
        }
      });
      
      // Average confidences
      Object.keys(schema_impact).forEach(schema => {
        if (schema_impact[schema].update_count > 0) {
          schema_impact[schema].avg_confidence /= schema_impact[schema].update_count;
        }
      });
      
      // Transfer success rate (transfer proofs with confidence > 0.7)
      const transferProofs = artifacts.filter(a => a.artifact_type === 'transfer');
      const successfulTransfers = transferProofs.filter(
        a => a.confidence_score && a.confidence_score > 0.7
      );
      const transfer_success_rate = transferProofs.length > 0
        ? successfulTransfers.length / transferProofs.length
        : 0;
      
      return {
        total_artifacts: artifacts.length,
        artifacts_by_type: artifacts_by_type as Record<ProofType, number>,
        average_confidence,
        average_confidence_by_type: average_confidence_by_type as Record<ProofType, number>,
        generation_rate_over_time,
        schema_impact,
        transfer_success_rate,
      };
    },
    refetchInterval: 30000,
  });
}

export function useRecentProof(limit = 20) {
  return useQuery({
    queryKey: ['recent_proof', limit],
    queryFn: async (): Promise<ProofArtifact[]> => {
      const { data, error } = await supabase
        .from('proof_artifacts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 10000,
  });
}

export function useProofForContent(contentRef: string | null) {
  return useQuery({
    queryKey: ['proof_for_content', contentRef],
    queryFn: async (): Promise<ProofArtifact[]> => {
      if (!contentRef) return [];
      
      const { data, error } = await supabase
        .from('proof_artifacts')
        .select('*')
        .eq('content_ref', contentRef)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!contentRef,
  });
}
