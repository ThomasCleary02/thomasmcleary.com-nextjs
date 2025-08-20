// Remove 'use client' - Server Component
import React from 'react';
import { BlogService } from '@/lib/services/blog';
import { notFound } from 'next/navigation';
import BlogPostContent from '@/app/components/blogs-page/BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params; // Await the params
  const blog = await BlogService.getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
      <div className="max-w-4xl mx-auto px-4">
        <BlogPostContent blog={blog} />
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params; // Await the params here too
  const blog = await BlogService.getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.title} - Thomas Cleary`,
    description: blog.subtitle || blog.body.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.subtitle || blog.body.substring(0, 160),
    },
  };
}
