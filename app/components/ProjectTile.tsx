'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/types/project';

interface ProjectTileProps {
  project: Project;
}

const ProjectTile = ({ project }: ProjectTileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Project Tile - Entire tile is clickable */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -4 }}
        className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Project Logo/Icon - Centered and smaller */}
        <div className="relative h-32 flex items-center justify-center p-6 bg-gray-50">
          {project.image_url ? (
            <img 
              src={project.image_url} 
              alt={project.title} 
              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section - Always visible with consistent spacing */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primaryBlue transition-colors">
            {project.title}
          </h3>
          
          {/* Fixed height container for affiliation to maintain consistent spacing */}
          <div className="h-5 mb-3">
            {project.affiliation && (
              <p className="text-sm text-gray-500">{project.affiliation}</p>
            )}
          </div>
          
          {/* Truncated Description */}
          <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
            {project.description}
          </p>
          
          {/* Technology Preview (show first 3) */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span 
                key={tech} 
                className="bg-lightBlue text-white px-2 py-1 rounded-md text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-gray-400 text-xs px-2 py-1">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          
          {/* Click indicator - subtle hint that tile is clickable */}
          <div className="text-center">
            <span className="text-primaryBlue text-sm font-medium group-hover:text-lightBlue transition-colors">
              Click to view details →
            </span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
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
              className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header with Logo */}
              <div className="relative p-6 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  {/* Project Logo */}
                  <div className="w-16 h-16 flex-shrink-0">
                    {project.image_url ? (
                      <img 
                        src={project.image_url} 
                        alt={project.title} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Project Info */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{project.title}</h2>
                    {project.affiliation && (
                      <p className="text-primaryBlue font-medium">{project.affiliation}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-[calc(90vh-12rem)] overflow-y-auto">
                {/* Full Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* All Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-lightBlue text-white px-3 py-1 rounded-md text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primaryBlue text-white py-3 px-4 rounded-lg hover:bg-lightBlue transition-colors duration-200 text-center font-medium"
                    >
                      View Live Demo
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center font-medium"
                    >
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
};

export default ProjectTile;