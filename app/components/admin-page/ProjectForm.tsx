'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CreateProjectRequest, Project } from '@/lib/types/project';

interface ProjectFormProps {
  onSubmit: (project: CreateProjectRequest) => Promise<void>;
  isSubmitting: boolean;
  editingProject?: Project | null;
  onCancel?: () => void;
}

export default function ProjectForm({ onSubmit, isSubmitting, editingProject, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: '',
    affiliation: '',
    description: '',
    technologies: [],
    live_demo_url: '',
    github_url: '',
    image_url: '',
    featured_project: false,
    status: 'active',
    demo_type: 'live',
    setup_instructions: '',
    discord_bot_id: '',
    discord_invite_url: '',
    discord_commands: [],
    discord_setup_steps: ''
  });
  const [newTech, setNewTech] = useState('');

  // Populate form when editing
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        affiliation: editingProject.affiliation || '',
        description: editingProject.description,
        technologies: editingProject.technologies,
        live_demo_url: editingProject.live_demo_url,
        github_url: editingProject.github_url,
        image_url: editingProject.image_url,
        featured_project: editingProject.featured_project || false,
        status: editingProject.status || 'active',
        demo_type: editingProject.demo_type || 'live',
        setup_instructions: editingProject.setup_instructions || '',
        discord_bot_id: editingProject.discord_bot_id || '',
        discord_invite_url: editingProject.discord_invite_url || '',
        discord_commands: editingProject.discord_commands || [],
        discord_setup_steps: editingProject.discord_setup_steps || ''
      });
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!editingProject) {
      setFormData({ title: '', affiliation: '', description: '', technologies: [], live_demo_url: '', github_url: '', image_url: '', featured_project: false, status: 'active', demo_type: 'live', setup_instructions: '', discord_bot_id: '', discord_invite_url: '', discord_commands: [], discord_setup_steps: '' });
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

  const addDiscordCommand = () => {
    setFormData({
      ...formData,
      discord_commands: [...(formData.discord_commands || []), '']
    });
  };

  const removeDiscordCommand = (index: number) => {
    const newCommands = (formData.discord_commands || []).filter((_, i) => i !== index);
    setFormData({ ...formData, discord_commands: newCommands });
  };

  const updateDiscordCommand = (index: number, value: string) => {
    const newCommands = [...(formData.discord_commands || [])];
    newCommands[index] = value;
    setFormData({ ...formData, discord_commands: newCommands });
  };

  const clearForm = () => {
    setFormData({
      title: '', affiliation: '', description: '', technologies: [], live_demo_url: '', github_url: '', image_url: '', featured_project: false, status: 'active', demo_type: 'live', setup_instructions: '', discord_bot_id: '', discord_invite_url: '', discord_commands: [], discord_setup_steps: ''
    });
  };

  const title = editingProject ? 'Edit Project' : 'Add New Project';
  const buttonText = editingProject ? 'Update Project' : 'Add Project';
  const buttonSubmittingText = editingProject ? 'Updating Project...' : 'Adding Project...';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50"
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
        <Plus className="h-6 w-6" />
        {title}
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
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Affiliation
          </label>
          <input
            type="text"
            value={formData.affiliation}
            onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="Company or organization (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
            placeholder="Describe your project..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Technologies *
          </label>
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
              placeholder="Add technology"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 font-medium"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium flex items-center gap-2"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-lg leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Live Demo URL
          </label>
          <input
            type="url"
            value={formData.live_demo_url}
            onChange={(e) => setFormData({...formData, live_demo_url: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.github_url}
            onChange={(e) => setFormData({...formData, github_url: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Image URL *
          </label>
          <input
            type="url"
            required
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="https://example.com/image.png"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Status *
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive' | 'archived'})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Demo Type *
          </label>
          <select
            required
            value={formData.demo_type}
            onChange={(e) => setFormData({...formData, demo_type: e.target.value as 'live' | 'local' | 'video' | 'none' | 'api' | 'discord'})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
          >
            <option value="live">Live Website</option>
            <option value="local">Local Setup Required</option>
            <option value="video">Video Demo</option>
            <option value="none">No Demo Available</option>
            <option value="api">API Service</option>
            <option value="discord">Discord Bot</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Setup Instructions
          </label>
          <textarea
            rows={3}
            value={formData.setup_instructions}
            onChange={(e) => setFormData({...formData, setup_instructions: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
            placeholder="Instructions for setting up/running the project..."
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured_project"
            checked={formData.featured_project || false}
            onChange={(e) => setFormData({...formData, featured_project: e.target.checked})}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="featured_project" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Featured Project
          </label>
        </div>

        {/* Discord Bot Fields - Only show when demo_type is 'discord' */}
        {formData.demo_type === 'discord' && (
          <>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Discord Bot ID
              </label>
              <input
                type="text"
                value={formData.discord_bot_id || ''}
                onChange={(e) => setFormData({...formData, discord_bot_id: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                placeholder="123456789012345678"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Discord Invite URL
              </label>
              <input
                type="url"
                value={formData.discord_invite_url || ''}
                onChange={(e) => setFormData({...formData, discord_invite_url: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                placeholder="https://discord.com/api/oauth2/authorize?..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Discord Commands
              </label>
              <div className="space-y-2">
                {(formData.discord_commands || []).map((command, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => updateDiscordCommand(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      placeholder="!command"
                    />
                    <button
                      type="button"
                      onClick={() => removeDiscordCommand(index)}
                      className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDiscordCommand}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium"
                >
                  Add Command
                </button>
              </div>
            </div>
          </>
        )}

        {/* Submit Buttons */}
        {editingProject && onCancel ? (
          <div className="flex gap-3">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
            >
              {isSubmitting ? buttonSubmittingText : buttonText}
            </motion.button>
            <motion.button
              type="button"
              onClick={() => {
                clearForm();
                onCancel();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              Cancel
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
          >
            {isSubmitting ? buttonSubmittingText : buttonText}
          </motion.button>
        )}
      </form>
    </motion.div>
  );
}