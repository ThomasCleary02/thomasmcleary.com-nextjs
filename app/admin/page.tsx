'use client';

import { useState, useEffect } from 'react';
import { Project, CreateProjectRequest } from '@/lib/types/project';
import AdminAuth from '../components/AdminAuth';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: '',
    affiliation: '',
    description: '',
    technologies: [],
    live_demo_url: '',
    github_url: '',
    image_url: ''
  });
  const [newTech, setNewTech] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProject = await response.json();
        setProjects([newProject, ...projects]);
        setFormData({
          title: '',
          affiliation: '',
          description: '',
          technologies: [],
          live_demo_url: '',
          github_url: '',
          image_url: ''
        });
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

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()]
      });
      setNewTech('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

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

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setProjects([]);
    setLoading(true);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-primaryBlue text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundLight py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primaryBlue mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your portfolio projects and keep your showcase up to date.
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-8 p-4 rounded-xl ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Project Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-primaryBlue mb-6">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Affiliation
                </label>
                <input
                  type="text"
                  value={formData.affiliation}
                  onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900"
                  placeholder="Company or organization (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900 resize-none"
                  placeholder="Describe your project..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Technologies *
                </label>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    placeholder="Add technology"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-6 py-3 bg-primaryBlue text-white rounded-lg hover:bg-lightBlue transition-all duration-200 font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-lightBlue text-white rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-white hover:text-gray-200 text-lg leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Live Demo URL
                </label>
                <input
                  type="url"
                  value={formData.live_demo_url}
                  onChange={(e) => setFormData({...formData, live_demo_url: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({...formData, github_url: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue focus:border-primaryBlue transition-all duration-200 text-gray-900"
                  placeholder="https://example.com/image.png"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primaryBlue text-white py-4 px-6 rounded-lg hover:bg-lightBlue transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
              >
                {isSubmitting ? 'Adding Project...' : 'Add Project'}
              </button>
            </form>
          </div>

          {/* Projects List */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-primaryBlue mb-6">
              Existing Projects ({projects.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No projects yet</p>
                  <p className="text-gray-400">Add your first project to get started!</p>
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-xl p-6 hover:bg-gray-50 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2">{project.title}</h3>
                        {project.affiliation && (
                          <p className="text-primaryBlue font-medium text-sm">
                            {project.affiliation}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:text-red-800 text-sm px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium"
                        title="Delete project"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-lightBlue text-white rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center mt-12">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 