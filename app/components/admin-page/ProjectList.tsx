'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Trash2 } from 'lucide-react';
import { Project } from '@/lib/types/project';

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: string) => Promise<void>;
}

export default function ProjectList({ projects, onDelete }: ProjectListProps) {
  const [showAllProjects, setShowAllProjects] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
        <FolderOpen className="h-6 w-6" />
        Existing Projects ({projects.length})
      </h2>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 mb-3">
              <FolderOpen className="w-12 h-12 mx-auto" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No projects yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">Add your first project to get started!</p>
          </div>
        ) : (
          <>
            {/* Show first 3 projects always */}
            {projects.slice(0, 3).map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 truncate">{project.title}</h3>
                    {project.affiliation && (
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                        {project.affiliation}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                    title="Delete project"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Show More/Less Button */}
            {projects.length > 3 && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                  {showAllProjects ? 'Show Less' : `Show ${projects.length - 3} More`}
                </button>
              </div>
            )}
            
            {/* Additional projects when expanded */}
            {showAllProjects && projects.slice(3).map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 bg-white/50 dark:bg-gray-700/50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 truncate">{project.title}</h3>
                    {project.affiliation && (
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-xs">
                        {project.affiliation}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(project.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium"
                    title="Delete project"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
