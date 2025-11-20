import { supabaseAdmin } from '@/lib/supabase-server';

export class AdminService {
  static async verifyCredentials(email: string, password: string) {
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });
    return { success: !error, data, error };
  }
}