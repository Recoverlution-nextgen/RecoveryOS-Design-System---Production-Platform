/**
 * Simple Data Store - Replaces kv_store with a single JSON storage table
 * 
 * This provides a drop-in replacement for the kv_store without dependencies
 * on Figma Make infrastructure.
 * 
 * Table schema (create in your Supabase project):
 * 
 * CREATE TABLE app_storage (
 *   key TEXT PRIMARY KEY,
 *   value JSONB NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const getClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// Set a value
export const set = async (key: string, value: any): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('app_storage')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error setting value:', error);
    throw new Error(`Failed to set value for key ${key}: ${error.message}`);
  }
};

// Get a value
export const get = async (key: string): Promise<any> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('app_storage')
    .select('value')
    .eq('key', key)
    .maybeSingle();
  
  if (error) {
    console.error('Error getting value:', error);
    throw new Error(`Failed to get value for key ${key}: ${error.message}`);
  }
  
  return data?.value || null;
};

// Delete a value
export const del = async (key: string): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('app_storage')
    .delete()
    .eq('key', key);
  
  if (error) {
    console.error('Error deleting value:', error);
    throw new Error(`Failed to delete value for key ${key}: ${error.message}`);
  }
};

// Set multiple values
export const mset = async (keys: string[], values: any[]): Promise<void> => {
  if (keys.length !== values.length) {
    throw new Error('Keys and values arrays must have the same length');
  }
  
  const supabase = getClient();
  const records = keys.map((key, i) => ({
    key,
    value: values[i],
    updated_at: new Date().toISOString()
  }));
  
  const { error } = await supabase
    .from('app_storage')
    .upsert(records);
  
  if (error) {
    console.error('Error setting multiple values:', error);
    throw new Error(`Failed to set multiple values: ${error.message}`);
  }
};

// Get multiple values
export const mget = async (keys: string[]): Promise<any[]> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('app_storage')
    .select('key, value')
    .in('key', keys);
  
  if (error) {
    console.error('Error getting multiple values:', error);
    throw new Error(`Failed to get multiple values: ${error.message}`);
  }
  
  // Return in the same order as the input keys
  const valueMap = new Map(data?.map(item => [item.key, item.value]) || []);
  return keys.map(key => valueMap.get(key) || null);
};

// Delete multiple values
export const mdel = async (keys: string[]): Promise<void> => {
  const supabase = getClient();
  const { error } = await supabase
    .from('app_storage')
    .delete()
    .in('key', keys);
  
  if (error) {
    console.error('Error deleting multiple values:', error);
    throw new Error(`Failed to delete multiple values: ${error.message}`);
  }
};

// Get all keys with a prefix
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const supabase = getClient();
  const { data, error } = await supabase
    .from('app_storage')
    .select('key, value')
    .like('key', `${prefix}%`);
  
  if (error) {
    console.error('Error getting values by prefix:', error);
    throw new Error(`Failed to get values by prefix ${prefix}: ${error.message}`);
  }
  
  return data?.map(item => ({ key: item.key, value: item.value })) || [];
};
