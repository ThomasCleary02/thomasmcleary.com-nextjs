import { NextRequest, NextResponse } from "next/server";
import { BlogService } from "@/lib/services/blog";

export async function GET(
    _request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const { slug } = params;
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
  { params }: { params: { slug: string } }
) {
  try {
    const updates = await request.json();
    const blog = await BlogService.updateBlog(params.slug, updates);
    return NextResponse.json(blog);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}