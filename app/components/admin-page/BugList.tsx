'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, Trash2, Edit, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Bug as BugType } from '@/lib/types/bug';

interface BugListProps {
  bugs: BugType[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (bug: BugType) => void;
  onStatusUpdate: (id: string, status: BugType['status'], admin_notes?: string) => Promise<void>;
}

export default function BugList({ bugs, onDelete, onEdit }: BugListProps) {
  const [showAllBugs, setShowAllBugs] = useState(false);

  const getStatusIcon = (status: BugType['status']) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: BugType['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200';
      case 'high':
        return 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200';
      case 'critical':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
        <Bug className="h-6 w-6" />
        Bug Reports ({bugs.length})
      </h2>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {bugs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <Bug className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No bug reports yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Users can submit bug reports through the public form</p>
          </div>
        ) : (
          <>
            {/* Show first 5 bugs always */}
            {bugs.slice(0, 5).map((bug) => (
              <motion.div 
                key={bug.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(bug.status)}
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">
                        {bug.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(bug.priority)}`}>
                        {bug.priority}
                      </span>
                      <span className="capitalize">{bug.status.replace('_', ' ')}</span>
                      <span>{new Date(bug.created_at).toLocaleDateString()}</span>
                    </div>
                    {bug.user_email && (
                      <p className="text-blue-600 dark:text-blue-400 text-xs mb-2">
                        Reported by: {bug.user_email}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(bug)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium"
                      title="Edit bug report"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onDelete(bug.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                      title="Delete bug report"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                  {bug.description}
                </p>
                {bug.browser || bug.operating_system ? (
                  <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {bug.browser && <span>Browser: {bug.browser}</span>}
                    {bug.operating_system && <span>OS: {bug.operating_system}</span>}
                  </div>
                ) : null}
              </motion.div>
            ))}
            
            {/* Show More/Less Button */}
            {bugs.length > 5 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllBugs(!showAllBugs)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                  {showAllBugs ? 'Show Less' : `Show ${bugs.length - 5} More`}
                </button>
              </div>
            )}
            
            {/* Additional bugs when expanded */}
            {showAllBugs && bugs.slice(5).map((bug) => (
              <motion.div 
                key={bug.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
              >
                {/* Same structure as above */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(bug.status)}
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base truncate">
                        {bug.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(bug.priority)}`}>
                        {bug.priority}
                      </span>
                      <span className="capitalize">{bug.status.replace('_', ' ')}</span>
                      <span>{new Date(bug.created_at).toLocaleDateString()}</span>
                    </div>
                    {bug.user_email && (
                      <p className="text-blue-600 dark:text-blue-400 text-xs mb-2">
                        Reported by: {bug.user_email}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(bug)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium"
                      title="Edit bug report"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onDelete(bug.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                      title="Delete bug report"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-3">
                  {bug.description}
                </p>
                {bug.browser || bug.operating_system ? (
                  <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                    {bug.browser && <span>Browser: {bug.browser}</span>}
                    {bug.operating_system && <span>OS: {bug.operating_system}</span>}
                  </div>
                ) : null}
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
