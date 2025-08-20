'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { CreateBlogRequest } from '@/lib/types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Form component for creating and editing blog posts
 * Includes markdown preview functionality and form validation
 */

interface BlogFormProps {
  /** Function called when the form is submitted */
  onSubmit: (blog: CreateBlogRequest) => Promise<void>;
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
}

/**
 * BlogForm component for creating new blog posts
 * @param {BlogFormProps} props - Component properties
 * @returns {JSX.Element} The blog form component
 */
export default function BlogForm({ onSubmit, isSubmitting }: BlogFormProps) {
  const [formData, setFormData] = useState<CreateBlogRequest>({
    title: '',
    subtitle: '',
    thumbnail_url: '',
    body: '',
    status: 'draft'
  });
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ title: '', subtitle: '', thumbnail_url: '', body: '', status: 'draft' });
  };


  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50"
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
        <Plus className="h-6 w-6" />
        Add New Blog Post
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="Optional subtitle"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Thumbnail URL
          </label>
          <input
            type="url"
            value={formData.thumbnail_url}
            onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'draft' | 'published'})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Published At (Optional)
          </label>
          <input
            type="datetime-local"
            value={formData.published_at || ''}
            onChange={(e) => setFormData({...formData, published_at: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="Leave empty to publish now"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Set a custom publish date for backdated posts. Leave empty to publish immediately.
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Content *
            </label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
          
          {showPreview ? (
            <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 min-h-[200px] overflow-y-auto">
              <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 prose-headings:dark:text-gray-100 prose-p:text-gray-700 prose-p:dark:text-gray-300 prose-strong:text-gray-900 prose-strong:dark:text-gray-100 prose-code:text-blue-600 prose-code:dark:text-blue-400 prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:dark:bg-blue-900/20 prose-blockquote:dark:border-l-blue-400">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    img: ({node, ...props}) => (
                      <img {...props} className="w-full h-auto rounded-lg" />
                    ),
                    h1: ({node, ...props}) => (
                      <h1 {...props} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-6" />
                    ),
                    h2: ({node, ...props}) => (
                      <h2 {...props} className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 mt-5" />
                    ),
                    h3: ({node, ...props}) => (
                      <h3 {...props} className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 mt-4" />
                    ),
                    p: ({node, ...props}) => (
                      <p {...props} className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed" />
                    ),
                    ul: ({node, ...props}) => (
                      <ul {...props} className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-3 space-y-1" />
                    ),
                    ol: ({node, ...props}) => (
                      <ol {...props} className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-3 space-y-1" />
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
                      <code {...props} className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1 py-0.5 rounded text-sm font-mono" />
                    ),
                    blockquote: ({node, ...props}) => (
                      <blockquote {...props} className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 my-4 italic text-gray-700 dark:text-gray-300" />
                    ),
                    a: ({node, ...props}) => (
                      <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />
                    )
                  }}
                >
                  {formData.body || 'No content to preview'}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              required
              rows={8}
              value={formData.body}
              onChange={(e) => setFormData({...formData, body: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
              placeholder="Write your blog content in markdown..."
            />
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
        >
          {isSubmitting ? 'Adding Blog Post...' : 'Add Blog Post'}
        </motion.button>
      </form>
    </motion.div>
  );
}
