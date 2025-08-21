'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types/project';
import { Github, Code, Play, Bot, Database, Globe, BookOpen } from 'lucide-react';
import SetupInstructionsModal from './SetupInstructionsModal';
import ApiDemoModal from './ApiDemoModal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  // Add state for showing all technologies
  const [showAllTechnologies, setShowAllTechnologies] = useState(false);
  const [showApiDemoModal, setShowApiDemoModal] = useState(false);

  const getDemoIcon = (demoType: string) => {
    switch (demoType) {
      case 'live': return <Globe className="h-6 w-6" />;
      case 'local': return <Code className="h-6 w-6" />;
      case 'api': return <Database className="h-6 w-6" />;
      case 'discord': return <Bot className="h-6 w-6" />;
      case 'video': return <Play className="h-6 w-6" />;
      default: return <BookOpen className="h-6 w-6" />;
    }
  };

  const getDemoButton = (project: Project) => {
    switch (project.demo_type) {
      case 'live':
        return project.live_demo_url ? (
          <motion.a
            href={project.live_demo_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Globe className="h-4 w-4" />
            Live Demo
          </motion.a>
        ) : null;
      
      case 'local':
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => setShowSetupModal(true)}
          >
            <Code className="h-4 w-4" />
            Setup Guide
          </motion.button>
        );
      
      case 'api':
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => setShowApiDemoModal(true)}
          >
            <Database className="h-4 w-4" />
            Try API
          </motion.button>
        );
      
      case 'discord':
        return (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => setShowSetupModal(true)}
          >
            <Bot className="h-4 w-4" />
            Setup Bot
          </motion.button>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      >
        {/* Project Icon/Image */}
        <div className="h-32 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 flex items-center justify-center border-b border-gray-200 dark:border-gray-600">
          {project.image_url ? (
            <img
              src={project.image_url}
              alt={project.title}
              className="h-20 w-20 object-contain rounded-lg"
            />
          ) : (
            <div className="text-blue-600 dark:text-blue-400">
              {getDemoIcon(project.demo_type || 'none')}
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          {/* Header - Fixed height for consistency */}
          <div className="flex items-start justify-between mb-3 h-16"> {/* Fixed height */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 flex-1 pr-3">
              {project.title}
            </h3>
            {project.featured_project && (
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full flex-shrink-0">
                Featured
              </span>
            )}
          </div>

          {/* Description - Always truncated, consistent appearance */}
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {showAllTechnologies ? (
              // Show all technologies when expanded
              project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-lg font-medium"
                >
                  {tech.trim()}
                </span>
              ))
            ) : (
              // Show limited technologies with expand button
              <>
                {project.technologies.slice(0, 2).map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-lg font-medium"
                  >
                    {tech.trim()}
                  </span>
                ))}
                {project.technologies.length > 2 && (
                  <button
                    onClick={() => setShowAllTechnologies(true)}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors cursor-pointer"
                  >
                    +{project.technologies.length - 2}
                  </button>
                )}
              </>
            )}
            
            {/* Show collapse button when expanded */}
            {showAllTechnologies && (
              <button
                onClick={() => setShowAllTechnologies(false)}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors cursor-pointer"
              >
                Show Less
              </button>
            )}
          </div>

          {/* Action Buttons - Add Info button for projects with only one button */}
          <div className="flex gap-2">
            {/* Demo Button */}
            {getDemoButton(project)}
            
            {/* GitHub Link */}
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Github className="h-4 w-4" />
                Code
              </motion.a>
            )}
            
            {/* Info Button - Show for projects with only one button or inactive projects */}
            {((getDemoButton(project) && !project.github_url) || (!getDemoButton(project) && project.github_url) || project.status === 'inactive') && (
              <motion.button
                onClick={() => setShowInfoModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Info
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Setup Instructions Modal */}
      <SetupInstructionsModal
        isOpen={showSetupModal}
        onClose={() => {
          setShowSetupModal(false);
          // Reset any modal-specific states if needed
        }}
        project={project}
        showType="setup"
      />

      {/* Info Modal for inactive projects */}
      <SetupInstructionsModal
        isOpen={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          // Reset any modal-specific states if needed
        }}
        project={project}
        showType="info"
      />

      {/* API Demo Modal */}
      <ApiDemoModal
        isOpen={showApiDemoModal}
        onClose={() => {
          setShowApiDemoModal(false);
          // Reset any modal-specific states if needed
        }}
        project={project}
      />
    </>
  );
}
