'use client';

import { motion } from 'framer-motion';
import { Blog } from '@/lib/types/blog';
import { Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export default function BlogCard({ blog, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate excerpt from body (first 150 characters)
  const excerpt = blog.body.length > 150 
    ? `${blog.body.substring(0, 150)}...` 
    : blog.body;

  return (
    <Link href={`/blogs/${blog.slug}`} className="block">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
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
            
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {blog.title}
            </h2>
            
            {blog.subtitle && (
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                {blog.subtitle}
              </p>
            )}

            {/* Excerpt - make sure this shows up */}
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {excerpt}
              </p>
            </div>
          </div>
          
          {/* Subtle indicator that it's clickable */}
          <div className="flex justify-end">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Read full article →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
