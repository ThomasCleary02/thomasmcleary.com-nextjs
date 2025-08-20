'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/types/project';
import { ExternalLink, Github, Code } from 'lucide-react';
import Image from 'next/image';

/**
 * Project tile component for displaying project information
 * Shows project details in a card format with hover effects and modal expansion
 */

interface ProjectTileProps {
  /** Project data to display */
  project: Project;
}

/**
 * ProjectTile component for displaying individual projects
 * @param {ProjectTileProps} props - Component properties
 * @returns {JSX.Element} The project tile component
 */
export default function ProjectTile({ project }: ProjectTileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Project Tile - Clean design without images */}
      <motion.div
        initial={{ opacity:0, y: 20 }}
        animate={{ opacity:1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Icon - Simple icon instead of image */}
        <div className="relative h-24 flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Code className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          
          {/* Affiliation - Always show this div for consistent spacing */}
          <div className="h-5 mb-3">
            {project.affiliation ? (
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {project.affiliation}
              </p>
            ) : (
              <div className="h-5"></div>
            )}
          </div>
          
          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm line-clamp-2">
            {project.description}
          </p>
          
          {/* Technology Preview */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-gray-400 dark:text-gray-500 text-xs px-2 py-1">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          
          {/* Click indicator */}
          <div className="text-center">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              Click to view details →
            </span>
          </div>
        </div>
      </motion.div>

      {/* Modal with Image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full p-2 hover:bg-white dark:hover:bg-gray-600 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header with Image */}
              <div className="relative p-6 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  {/* Project Image - Only shown in modal */}
                  {project.image_url && (
                    <div className="w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0">
                      <Image 
                        src={project.image_url} 
                        alt={project.title} 
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  )}
                  
                  {/* Project Info */}
                  <div className="text-center lg:text-left">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h2>
                    {project.affiliation && (
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">{project.affiliation}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
                {/* Full Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  {project.description}
                </p>
                
                {/* All Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-md text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-3 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-200 text-center font-medium inline-flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 text-center font-medium inline-flex items-center justify-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}