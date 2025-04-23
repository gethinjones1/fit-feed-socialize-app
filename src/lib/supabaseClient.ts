
import { createClient } from '@supabase/supabase-js';

// These environment variables are managed by Lovable's Supabase integration.
const supabaseUrl = (window as any).env?.VITE_SUPABASE_URL as string;
const supabaseAnonKey = (window as any).env?.VITE_SUPABASE_ANON_KEY as string;

// Add fallback for development if needed
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure you have connected your project to Supabase through Lovable\'s integration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
