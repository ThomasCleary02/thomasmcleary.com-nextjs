'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Blog } from '@/lib/types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
          <div className="text-blue-600 dark:text-blue-400 text-lg">Loading blogs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Thoughts on technology, development, and the future of the web.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-8">
                  {/* Blog Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {formatDate(blog.published_at || blog.created_at)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {Math.ceil(blog.body.split(' ').length / 200)} min read
                      </div>
                    </div>
                    
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Link href={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>
                    
                    {blog.subtitle && (
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        {blog.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Blog Preview */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-3">
                    {blog.body.substring(0, 300)}...
                  </p>

                  {/* Read More */}
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Read full article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
