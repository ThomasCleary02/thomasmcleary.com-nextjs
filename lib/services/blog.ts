import { supabase } from "@/lib/supabase";
import { Blog, CreateBlogRequest, UpdateBlogRequest } from "@/lib/types/blog";

export class BlogService {

    // Create a new blog post
    static async createBlog(blog: CreateBlogRequest): Promise<Blog> {
        try {
            // Add logging
            console.log('Creating blog with data:', blog);
            
            const blogData = {
                ...blog,
                slug: blog.slug || this.generateSlug(blog.title),
                published_at: blog.published_at || (blog.status === 'published' ? new Date().toISOString() : null)
            };
            
            console.log('Processed blog data:', blogData);
            
            const { data, error } = await supabase
                .from('blogs')
                .insert([blogData])
                .select()
                .single();

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            
            return data;
        } catch (error) {
            console.error('Service error:', error);
            throw error;
        }
    }

    // Get all published blogs
    static async getAllBlogs(): Promise<Blog[]> {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
    }

    // Get all published blogs
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

    // Get single blog by slug
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

    // Update blog
    static async updateBlog(id: string, updates: UpdateBlogRequest): Promise<Blog> {
        const { data, error } = await supabase
            .from('blogs')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Delete blog
    static async deleteBlog(id: string): Promise<void> {
        const { error } = await supabase
            .from('blogs')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }

    private static generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim();
    }
}