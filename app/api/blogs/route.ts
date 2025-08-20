import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/lib/services/blog';

/**
 * API endpoint for blog management
 * Supports GET (list blogs) and POST (create blog) operations
 */

/**
 * Retrieves a list of all blogs
 * @param {NextRequest} request - The incoming request object
 * @returns {Promise<NextResponse>} JSON response containing blogs array
 * @throws {Error} If database query fails
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    if (isAdmin) {
      // Admin request - get all blogs
      const blogs = await BlogService.getAllBlogs();
      return NextResponse.json(blogs);
    } else {
      // Public request - get only published blogs
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const blogs = await BlogService.getPublishedBlogs(page, limit);
      return NextResponse.json(blogs);
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

/**
 * Creates a new blog post
 * @param {NextRequest} request - The incoming request containing blog data
 * @returns {Promise<NextResponse>} JSON response containing the created blog
 * @throws {Error} If blog creation fails or validation fails
 */
export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json();
    
    // Add logging to debug
    console.log('Received blog data:', blogData);
    
    // Basic validation
    if (!blogData.title || !blogData.body) {
      return NextResponse.json(
        { error: 'Title and body are required' }, 
        { status: 400 }
      );
    }
    
    const blog = await BlogService.createBlog(blogData);
    return NextResponse.json(blog);
  } catch {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}