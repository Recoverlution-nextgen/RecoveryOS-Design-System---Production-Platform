import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "./info";

// Singleton Supabase client to avoid multiple instances
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

/**
 * UNIFIED SUPABASE CLIENT
 * 
 * Project: wzeqlkbmqxlsjryidagf
 * - All SQL tables (48+ tables including multi-tenant, journey, content, etc.)
 * - All storage buckets (audio, dashboard-assets, etc.)
 * - Soundbites metadata + audio (450 tracks via soundbite_all VIEW)
 */
export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(
      `https://${projectId}.supabase.co`,
      publicAnonKey
    );
  }
  return supabaseInstance;
}