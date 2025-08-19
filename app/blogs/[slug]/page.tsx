'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Blog } from '@/lib/types/blog';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPostPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchBlog(params.slug as string);
    }
  }, [params.slug]);

  const fetchBlog = async (slug: string) => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      if (!response.ok) throw new Error('Blog not found');
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-blue-600 dark:text-blue-400 text-lg">Loading article...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all blogs
          </Link>
        </motion.div>

        {/* Blog Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(blog.published_at || blog.created_at)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {Math.ceil(blog.body.split(' ').length / 200)} min read
              </div>
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {blog.title}
            </h1>
            
            {blog.subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {blog.subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 prose-headings:dark:text-gray-100 prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-gray-900 prose-strong:dark:text-gray-100 prose-code:text-blue-600 prose-code:dark:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:dark:bg-blue-900/20 prose-blockquote:dark:border-l-blue-400">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({node, ...props}) => (
                    <img {...props} className="w-full h-auto rounded-lg" />
                  ),
                  h1: ({node, ...props}) => (
                    <h1 {...props} className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8" />
                  ),
                  h2: ({node, ...props}) => (
                    <h2 {...props} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-6" />
                  ),
                  h3: ({node, ...props}) => (
                    <h3 {...props} className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-5" />
                  ),
                  p: ({node, ...props}) => (
                    <p {...props} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" />
                  ),
                  ul: ({node, ...props}) => (
                    <ul {...props} className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" />
                  ),
                  ol: ({node, ...props}) => (
                    <ol {...props} className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2" />
                  ),
                  li: ({node, ...props}) => (
                    <li {...props} className="text-gray-700 dark:text-gray-300" />
                  ),
                  strong: ({node, ...props}) => (
                    <strong {...props} className="font-bold text-gray-900 dark:text-gray-100" />
                  ),
                  em: ({node, ...props}) => (
                    <em {...props} className="italic text-gray-700 dark:text-gray-300" />
                  ),
                  code: ({node, ...props}) => (
                    <code {...props} className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-mono" />
                  ),
                  blockquote: ({node, ...props}) => (
                    <blockquote {...props} className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-6 py-4 my-6 italic text-gray-700 dark:text-gray-300" />
                  ),
                  a: ({node, ...props}) => (
                    <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />
                  )
                }}
              >
                {blog.body}
              </ReactMarkdown>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
