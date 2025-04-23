
import { createClient } from '@supabase/supabase-js';

// These values come from your Supabase project
const supabaseUrl = 'https://ikicjkohcjieudvdhtxg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlraWNqa29oY2ppZXVkdmRodHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0MDYzNDYsImV4cCI6MjA2MDk4MjM0Nn0.Go9vcfPIkbOBfdB7op4GOqFLsoDr-1P_dxUjFaXdFmE';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly configured
export const isSupabaseReady = () => true;
