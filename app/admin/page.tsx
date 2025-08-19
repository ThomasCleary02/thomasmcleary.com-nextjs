'use client';

import React, { useState, useEffect } from 'react';
import { Project, CreateProjectRequest } from '@/lib/types/project';
import AdminAuth from '../components/admin-page/AdminAuth';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import BlogForm from '../components/admin-page/BlogForm';
import BlogList from '../components/admin-page/BlogList';
import ProjectForm from '../components/admin-page/ProjectForm';
import { Blog, CreateBlogRequest, UpdateBlogRequest } from '@/lib/types/blog';
import ProjectList from '../components/admin-page/ProjectList';
import BlogEditForm from '../components/admin-page/BlogEditForm';

export default function AdminDashboard(): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'blogs'>('projects');
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isEditingBlog, setIsEditingBlog] = useState(false);

  useEffect((): void => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect((): void => {
    if (isAuthenticated) {
      fetchProjects();
      fetchBlogs();
    }
  }, [isAuthenticated]);

  const fetchProjects = async (): Promise<void> => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setMessage({ type: 'error', text: 'Failed to fetch projects' });
    } finally {
      setLoading(false);
    }
  };

    const handleSubmit = async (projectData: CreateProjectRequest): Promise<void> => {
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([newProject, ...projects]);
        setMessage({ type: 'success', text: 'Project added successfully!' });
      } else {
        throw new Error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setMessage({ type: 'error', text: 'Failed to create project' });
    } finally {
      setIsSubmitting(false);
    }
  };





  const deleteProject = async (id: string): Promise<void> => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
        setMessage({ type: 'success', text: 'Project deleted successfully!' });
      } else {
        throw new Error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage({ type: 'error', text: 'Failed to delete project' });
    }
  };

  const handleLogout = (): void => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setProjects([]);
    setLoading(true);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?admin=true'); // Add admin flag
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setMessage({ type: 'error', text: 'Failed to fetch blogs' });
    }
  };

  const handleBlogSubmit = async (blogData: CreateBlogRequest) => {
    setIsSubmittingBlog(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        const newBlog = await response.json();
        setBlogs([newBlog, ...blogs]);
        setMessage({ type: 'success', text: 'Blog post added successfully!' });
      } else {
        throw new Error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog post:', error);
      setMessage({ type: 'error', text: 'Failed to create blog post' });
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
        setMessage({ type: 'success', text: 'Blog post deleted successfully!' });
      } else {
        throw new Error('Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      setMessage({ type: 'error', text: 'Failed to delete blog post' });
    }
  };

  const handleEditBlog = async (id: string, updates: UpdateBlogRequest) => {
    setIsEditingBlog(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        setBlogs(blogs.map(b => b.id === id ? updatedBlog : b));
        setEditingBlog(null);
        setMessage({ type: 'success', text: 'Blog post updated successfully!' });
      } else {
        throw new Error('Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      setMessage({ type: 'error', text: 'Failed to update blog post' });
    } finally {
      setIsEditingBlog(false);
    }
  };

  const startEditBlog = (blog: Blog) => {
    setEditingBlog(blog);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white dark:text-blue-100 text-lg">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Manage your portfolio projects and keep your showcase up to date.
          </p>
        </motion.div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'projects' 
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                activeTab === 'blogs' 
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'
              }`}
            >
              Blogs
            </button>
          </div>
        </div>

        {/* Message Display */}
        <AnimatePresence>
          {message && activeTab === 'projects' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 ${
                message.type === 'success' 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-green-800'
              }`}
            >
              {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Based on Active Tab */}
        {activeTab === 'projects' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProjectForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            <ProjectList projects={projects} onDelete={deleteProject} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BlogForm onSubmit={handleBlogSubmit} isSubmitting={isSubmittingBlog} />
            <BlogList 
              blogs={blogs} 
              onDelete={deleteBlog} 
              onEdit={startEditBlog} 
            />
            {editingBlog && (
              <BlogEditForm
                blog={editingBlog}
                onSubmit={handleEditBlog}
                onCancel={() => setEditingBlog(null)}
                isSubmitting={isEditingBlog}
              />
            )}
          </div>
        )}

        {/* Logout Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="px-8 py-3 bg-gray-600 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 font-medium flex items-center gap-2 mx-auto shadow-lg"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 