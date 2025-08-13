import React from 'react';
import { motion } from 'framer-motion';
import { effects } from '../styles/animationVariants';
import { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
    <div className="text-center text-gray-400">
      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
      <p className="text-sm">No Image</p>
    </div>
  </div>
);

const ProjectCard = ({ project }: ProjectCardProps) => {
    const technologies = project.technologies || [];
  
    return (
      <motion.div 
        variants={effects}
        whileHover="cardHover"
        className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">
        
        {/* Project Image Container */}
        <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
          {project.image_url ? (
            <img 
              src={project.image_url} 
              alt={project.title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <ProjectPlaceholder />
          )}
        </div>
  
        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Project Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
            {project.affiliation && (
              <p className="text-sm font-medium text-primaryBlue">
                {project.affiliation}
              </p>
            )}
          </div>
  
          {/* Description */}
          <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow line-clamp-3">
            {project.description}
          </p>
  
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.slice(0, 4).map((tech) => (
              <span 
                key={tech} 
                className="bg-lightBlue text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                +{technologies.length - 4} more
              </span>
            )}
          </div>
  
          {/* Links */}
          <div className="flex space-x-4 mt-auto pt-4 border-t border-gray-100">
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primaryBlue hover:text-lightBlue transition-colors flex items-center text-sm font-medium"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors flex items-center text-sm font-medium"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

export default ProjectCard; 