
import { createClient } from '@supabase/supabase-js';

// These environment variables are managed by Lovable's Supabase integration
const supabaseUrl = (window as any).env?.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = (window as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if Supabase is properly configured
const isSupabaseConfigured = !!(window as any).env?.VITE_SUPABASE_URL && !!(window as any).env?.VITE_SUPABASE_ANON_KEY;

if (!isSupabaseConfigured) {
  console.error('Missing Supabase environment variables. Make sure you have connected your project to Supabase through Lovable\'s integration.');
}

// Create client with fallback values to prevent runtime errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseReady = () => isSupabaseConfigured;
