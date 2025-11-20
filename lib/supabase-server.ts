import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Use service role key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

// This client bypasses RLS policies (use only in admin API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
