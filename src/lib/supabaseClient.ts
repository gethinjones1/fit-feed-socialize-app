
import { createClient } from '@supabase/supabase-js';

// These environment variables are managed by Lovable's Supabase integration.
const supabaseUrl = (window as any).env?.VITE_SUPABASE_URL as string;
const supabaseAnonKey = (window as any).env?.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
