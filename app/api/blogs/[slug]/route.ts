import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from 'next/cache';
import { BlogService } from "@/lib/services/blog";
import { AuthService } from "@/lib/utils/auth";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    try {
        const blog = await BlogService.getBlogBySlug(slug);
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = AuthService.verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Use admin client directly instead of setting context
    const { supabaseAdmin } = await import('@/lib/supabase-server');
    
    const { slug } = await params;
    const updates = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from('blogs')
      .update(updates)
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }

    // Revalidate the blogs list page (always, in case order/visibility changed)
    revalidatePath('/blogs');
    
    // Revalidate the blog post page(s)
    const oldSlug = slug;
    const newSlug = data.slug;
    
    // Always revalidate the old slug path
    revalidatePath(`/blogs/${oldSlug}`);
    
    // If slug changed, also revalidate the new slug path
    if (oldSlug !== newSlug) {
      revalidatePath(`/blogs/${newSlug}`);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}