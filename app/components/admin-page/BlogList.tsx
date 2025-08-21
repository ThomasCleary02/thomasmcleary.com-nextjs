'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trash2, Edit } from 'lucide-react';
import { Blog } from '@/lib/types/blog';

interface BlogListProps {
  blogs: Blog[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (blog: Blog) => void;
}

export default function BlogList({ blogs, onDelete, onEdit }: BlogListProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 flex flex-col h-[600px]"
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
        <BookOpen className="h-6 w-6" />
        Existing Blog Posts ({blogs.length})
      </h2>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {blogs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <BookOpen className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No blog posts yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Add your first blog post to get started!</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <motion.div 
              key={blog.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 truncate">{blog.title}</h3>
                  {blog.subtitle && (
                    <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{blog.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.status === 'published' 
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                        : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {blog.status}
                    </span>
                    <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium"
                    title="Edit blog post"
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => onDelete(blog.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                    title="Delete blog post"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{blog.body.substring(0, 150)}...</p>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
