'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, AlertCircle, CheckCircle } from 'lucide-react';

interface BugReportFormProps {
  onSuccess?: () => void; // Add this optional prop
}

export default function BugReportForm({ onSuccess }: BugReportFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps_to_reproduce: '',
    expected_behavior: '',
    actual_behavior: '',
    browser: '',
    operating_system: '',
    user_email: '',
    priority: 'medium' as const
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Bug report submitted successfully! Thank you for helping improve the site.' });
        setFormData({
          title: '',
          description: '',
          steps_to_reproduce: '',
          expected_behavior: '',
          actual_behavior: '',
          browser: '',
          operating_system: '',
          user_email: '',
          priority: 'medium'
        });
        
        // Call onSuccess callback if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000); // Close modal after 2 seconds to show success message
        }
      } else {
        throw new Error('Failed to submit bug report');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit bug report. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bug className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Report a Bug
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Help us improve by reporting any issues you encounter
        </p>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Bug Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            placeholder="Brief description of the issue"
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
            placeholder="Detailed description of what happened"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Steps to Reproduce
            </label>
            <textarea
              rows={3}
              value={formData.steps_to_reproduce}
              onChange={(e) => setFormData({...formData, steps_to_reproduce: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
              placeholder="1. Go to... 2. Click on... 3. See error"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Expected Behavior
            </label>
            <textarea
              rows={3}
              value={formData.expected_behavior}
              onChange={(e) => setFormData({...formData, expected_behavior: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
              placeholder="What should have happened?"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Actual Behavior
            </label>
            <textarea
              rows={3}
              value={formData.actual_behavior}
              onChange={(e) => setFormData({...formData, actual_behavior: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none"
              placeholder="What actually happened?"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Browser
            </label>
            <input
              type="text"
              value={formData.browser}
              onChange={(e) => setFormData({...formData, browser: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="Chrome, Firefox, Safari..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Operating System
            </label>
            <input
              type="text"
              value={formData.operating_system}
              onChange={(e) => setFormData({...formData, operating_system: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="Windows, macOS, Linux..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Email (Optional)
            </label>
            <input
              type="email"
              value={formData.user_email}
              onChange={(e) => setFormData({...formData, user_email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
              placeholder="For follow-up questions"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 dark:bg-red-500 text-white py-4 px-6 rounded-xl hover:bg-red-700 dark:hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg"
        >
          {isSubmitting ? 'Submitting Bug Report...' : 'Submit Bug Report'}
        </motion.button>
      </form>
    </motion.div>
  );
}
