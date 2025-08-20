import { supabase } from "@/lib/supabase";
import { Blog, CreateBlogRequest, UpdateBlogRequest } from "@/lib/types/blog";

/**
 * Service class for managing blog operations with Supabase
 * Provides CRUD operations for blog posts including creation, reading, updating, and deletion
 */
export class BlogService {

    /**
     * Creates a new blog post
     * @param {CreateBlogRequest} blog - The blog data to create
     * @returns {Promise<Blog>} The created blog post
     * @throws {Error} If the blog creation fails
     * @example
     * const newBlog = await BlogService.createBlog({
     *   title: "My New Post",
     *   body: "# Hello World\nThis is my first post",
     *   status: "draft"
     * });
     */
    static async createBlog(blog: CreateBlogRequest): Promise<Blog> {
        try {
            // Add logging
            console.log('Creating blog with data:', blog);
            
            const blogData = {
                ...blog,
                slug: blog.slug || this.generateSlug(blog.title),
                published_at: blog.published_at || (blog.status === 'published' ? new Date().toISOString() : null)
            };
            
            console.warn('Processed blog data:', blogData);
            
            const { data, error } = await supabase
                .from('blogs')
                .insert([blogData])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            
            console.warn('Blog created successfully:', data);
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
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    /**
     * Retrieves published blog posts for public display
     * @param {number} page - Page number for pagination (1-based)
     * @param {number} limit - Number of posts per page
     * @returns {Promise<Blog[]>} Array of published blog posts
     * @throws {Error} If the database query fails
     */
    static async getPublishedBlogs(page: number, limit: number): Promise<Blog[]> {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('status', 'published')
            .order('published_at', { ascending: false })
            .range((page - 1) * limit, page * limit - 1);

        if (error) throw error;
        return data || [];
    }

    /**
     * Retrieves a blog post by its slug
     * @param {string} slug - URL-friendly identifier
     * @returns {Promise<Blog | null>} Blog post or null if not found
     * @throws {Error} If the database query fails
     */
    static async getBlogBySlug(slug: string): Promise<Blog | null> {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', slug)
            .eq('status', 'published')
            .single();

        if (error) throw error;
        return data;
    }

    /**
     * Updates an existing blog post
     * @param {string} slug - Blog slug to update
     * @param {UpdateBlogRequest} updates - Blog data to update
     * @returns {Promise<Blog>} The updated blog post
     * @throws {Error} If update fails
     */
    static async updateBlog(slug: string, updates: UpdateBlogRequest): Promise<Blog> {
        const { data, error } = await supabase
            .from('blogs')
            .update(updates)
            .eq('slug', slug)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    /**
     * Deletes a blog post
     * @param {string} slug - Blog slug to delete
     * @returns {Promise<void>} Success confirmation
     * @throws {Error} If deletion fails
     */
    static async deleteBlog(slug: string): Promise<void> {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('slug', slug);

        if (error) throw error;
    }

    /**
     * Generates a URL-friendly slug from a title
     * @param {string} title - Blog title to convert
     * @returns {string} URL-friendly slug
     * @private
     * @example
     * const slug = BlogService.generateSlug("My Amazing Blog Post!");
     * // Returns: "my-amazing-blog-post"
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