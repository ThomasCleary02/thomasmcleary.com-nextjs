import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export class AdminService {
  static async verifyCredentials(username: string, password: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('password_hash')
        .eq('username', username)
        .single();

      if (error || !data) {
        return false;
      }

      return await bcrypt.compare(password, data.password_hash);
    } catch (error) {
      console.error('Admin verification error:', error);
      return false;
    }
  }

  static async getUserByUsername(username: string): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        return null;
      }

      return data;
    } catch (error) {
      console.error('Admin user fetch error:', error);
      return null;
    }
  }
}
