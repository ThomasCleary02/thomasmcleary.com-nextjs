import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabase-server";
import { Blog, CreateBlogRequest, UpdateBlogRequest } from "@/lib/types/blog";

/**
 * Service class for managing blog operations with Supabase
 * Provides CRUD operations for blog posts including creation, reading, updating, and deletion
 */
export class BlogService {

    /**
     * Creates a new blog post (admin only)
     * @param {CreateBlogRequest} blog - The blog data to create
     * @returns {Promise<Blog>} The created blog post
     * @throws {Error} If the blog creation fails
     */
    static async createBlog(blog: CreateBlogRequest): Promise<Blog> {
        try {
            console.log('Creating blog with data:', blog);
            
            const blogData = {
                ...blog,
                slug: blog.slug || this.generateSlug(blog.title),
                published_at: blog.published_at || (blog.status === 'published' ? new Date().toISOString() : null)
            };
            
            console.log('Processed blog data:', blogData);
            
            const { data, error } = await supabaseAdmin
                .from('blogs')
                .insert([blogData])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            
            console.log('Blog created successfully:', data);
            return data;
        } catch (error) {
            console.error('Service error:', error);
            throw error;
        }
    }

    /**
     * Retrieves all blog posts (admin use)
     * @returns {Promise<Blog[]>} Array of all blog posts
     * @throws {Error} If the database query fails
     */
    static async getAllBlogs(): Promise<Blog[]> {
        try {
            console.log('Fetching all blogs...');
            
            const { data, error } = await supabaseAdmin
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching all blogs:', error);
                throw error;
            }
            
            console.log(`Fetched ${data?.length || 0} blogs`);
            return data || [];
        } catch (error) {
            console.error('getAllBlogs error:', error);
            throw error;
        }
    }

    /**
     * Retrieves published blog posts for public display (public read)
     * @param {number} page - Page number for pagination (1-based)
     * @param {number} limit - Number of posts per page
     * @returns {Promise<Blog[]>} Array of published blog posts
     * @throws {Error} If the database query fails
     */
    static async getPublishedBlogs(page: number = 1, limit: number = 10): Promise<Blog[]> {
        try {
            console.log(`Fetching published blogs: page ${page}, limit ${limit}`);
            
            // First, try to get the total count to verify we can access the table
            const { count, error: countError } = await supabase
                .from('blogs')
                .select('*', { count: 'exact', head: true })
                .eq('status', 'published');
            
            if (countError) {
                console.error('Error getting blog count:', countError);
                throw countError;
            }
            
            console.log(`Total published blogs in database: ${count}`);
            
            // Now fetch the actual blogs
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false })
                .range((page - 1) * limit, page * limit - 1);

            if (error) {
                console.error('Error fetching published blogs:', error);
                throw error;
            }
            
            console.log(`Successfully fetched ${data?.length || 0} published blogs`);
            return data || [];
        } catch (error) {
            console.error('getPublishedBlogs error:', error);
            
            // Fallback: try to get all blogs and filter client-side
            try {
                console.log('Attempting fallback: fetching all blogs...');
                const { data: allBlogs, error: fallbackError } = await supabase
                    .from('blogs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (fallbackError) {
                    console.error('Fallback also failed:', fallbackError);
                    return [];
                }

                const publishedBlogs = allBlogs?.filter(blog => blog.status === 'published') || [];
                console.log(`Fallback successful: found ${publishedBlogs.length} published blogs`);
                return publishedBlogs;
            } catch (fallbackError) {
                console.error('All attempts failed:', fallbackError);
                return [];
            }
        }
    }

    /**
     * Retrieves a blog post by its slug (public read)
     * @param {string} slug - URL-friendly identifier
     * @returns {Promise<Blog | null>} Blog post or null if not found
     * @throws {Error} If the database query fails
     */
    static async getBlogBySlug(slug: string): Promise<Blog | null> {
        try {
            console.log(`Fetching blog by slug: ${slug}`);
            
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slug)
                .eq('status', 'published')
                .single();

            if (error) {
                console.error(`Error fetching blog by slug ${slug}:`, error);
                throw error;
            }
            
            console.log(`Blog found: ${data?.title}`);
            return data;
        } catch (error) {
            console.error(`getBlogBySlug error for ${slug}:`, error);
            return null;
        }
    }

    /**
     * Updates an existing blog post (admin only)
     * @param {string} slug - Blog slug to update
     * @param {UpdateBlogRequest} updates - Blog data to update
     * @returns {Promise<Blog>} The updated blog post
     * @throws {Error} If update fails
     */
    static async updateBlog(slug: string, updates: UpdateBlogRequest): Promise<Blog> {
        try {
            console.log(`Updating blog: ${slug}`);
            
            const { data, error } = await supabaseAdmin
                .from('blogs')
                .update(updates)
                .eq('slug', slug)
                .select()
                .single();

            if (error) {
                console.error(`Error updating blog ${slug}:`, error);
                throw error;
            }
            
            console.log(`Blog updated successfully: ${data?.title}`);
            return data;
        } catch (error) {
            console.error(`updateBlog error for ${slug}:`, error);
            throw error;
        }
    }

    /**
     * Deletes a blog post (admin only)
     * @param {string} slug - Blog slug to delete
     * @returns {Promise<void>} Success confirmation
     * @throws {Error} If deletion fails
     */
    static async deleteBlog(slug: string): Promise<void> {
        try {
            console.log(`Deleting blog: ${slug}`);
            
            const { error } = await supabaseAdmin
                .from('blogs')
                .delete()
                .eq('slug', slug);

            if (error) {
                console.error(`Error deleting blog ${slug}:`, error);
                throw error;
            }
            
            console.log(`Blog deleted successfully: ${slug}`);
        } catch (error) {
            console.error(`deleteBlog error for ${slug}:`, error);
            throw error;
        }
    }

    /**
     * Generates a URL-friendly slug from a title
     * @param {string} title - Blog title to convert
     * @returns {string} URL-friendly slug
     * @private
     */
    private static generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim();
    }
}