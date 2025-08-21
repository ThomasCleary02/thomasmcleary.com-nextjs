import { supabase } from '../supabase';
import { supabaseAdmin } from '../supabase-server';
import { Bug, CreateBugRequest, UpdateBugRequest } from '../types/bug';

/**
 * Service class for managing bug report operations with Supabase
 * Provides CRUD operations for user-submitted bug reports
 */
export class BugService {
  /**
   * Creates a new bug report (public create)
   * @param {CreateBugRequest} bug - Bug report data to create
   * @returns {Promise<Bug>} The created bug report
   * @throws {Error} If bug report creation fails
   */
  static async createBug(bug: CreateBugRequest): Promise<Bug> {
    const { data, error } = await supabase
      .from('bugs')
      .insert([bug])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Retrieves all bug reports (admin use)
   * @returns {Promise<Bug[]>} Array of all bug reports
   * @throws {Error} If database query fails
   */
  static async getAllBugs(): Promise<Bug[]> {
    const { data, error } = await supabaseAdmin
      .from('bugs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  /**
   * Updates a bug report status (admin only)
   * @param {string} id - Bug report ID to update
   * @param {UpdateBugRequest} updates - Bug data to update
   * @returns {Promise<Bug>} The updated bug report
   * @throws {Error} If update fails
   */
  static async updateBug(id: string, updates: UpdateBugRequest): Promise<Bug> {
    const { data, error } = await supabaseAdmin
      .from('bugs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Deletes a bug report (admin only)
   * @param {string} id - Bug report ID to delete
   * @returns {Promise<void>} Success confirmation
   * @throws {Error} If deletion fails
   */
  static async deleteBug(id: string): Promise<void> {
    const { error } = await supabaseAdmin
      .from('bugs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}