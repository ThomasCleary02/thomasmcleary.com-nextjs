import { supabase } from '../supabase';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../types/project';

/**
 * Service class for managing project operations with Supabase
 * Provides CRUD operations for portfolio projects
 */
export class ProjectService {
  /**
   * Creates a new project in the database
   * @param {CreateProjectRequest} project - Project data to create
   * @returns {Promise<Project>} The created project
   * @throws {Error} If project creation fails
   * @example
   * const newProject = await ProjectService.createProject({
   *   title: "My App",
   *   description: "A mobile application",
   *   technologies: ["React Native", "Expo"]
   * });
   */
  static async createProject(project: CreateProjectRequest): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      throw new Error('Failed to create project');
    }

    return data;
  }

  /**
   * Retrieves all projects from the database
   * @returns {Promise<Project[]>} Array of all projects
   * @throws {Error} If database query fails
   */
  static async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects');
    }

    return data || [];
  }

  /**
   * Retrieves a project by its unique identifier
   * @param {string} id - Project ID
   * @returns {Promise<Project | null>} Project or null if not found
   * @throws {Error} If database query fails
   */
  static async getProjectById(id: string): Promise<Project | null> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        return null;
      }
      console.error('Error fetching project:', error);
      throw new Error('Failed to fetch project');
    }

    return data;
  }

  /**
   * Updates an existing project
   * @param {string} id - Project ID to update
   * @param {UpdateProjectRequest} updates - Project data to update
   * @returns {Promise<Project>} The updated project
   * @throws {Error} If update fails
   */
  static async updateProject(id: string, updates: UpdateProjectRequest): Promise<Project> {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating project:', error);
      throw new Error('Failed to update project');
    }

    return data;
  }

  /**
   * Deletes a project from the database
   * @param {string} id - Project ID to delete
   * @returns {Promise<void>} Success confirmation
   * @throws {Error} If deletion fails
   */
  static async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      throw new Error('Failed to delete project');
    }
  }
} 