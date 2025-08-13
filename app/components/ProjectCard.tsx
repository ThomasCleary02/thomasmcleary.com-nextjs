import React from 'react';
import { motion } from 'framer-motion';
import { effects } from '../styles/animationVariants';
import { Project } from '@/lib/types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectPlaceholder = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 400 300" 
    className="w-full h-full text-gray-200"
    fill="currentColor"
  >
    <rect width="100%" height="100%" fill="currentColor" />
    <text 
      x="50%" 
      y="50%" 
      dominantBaseline="middle" 
      textAnchor="middle" 
      fill="gray" 
      fontSize="24"
    >
      No Image
    </text>
  </svg>
);

const ProjectCard = ({ project }: ProjectCardProps) => {
    const technologies = project.technologies || [];
  
    return (
      <motion.div 
        variants={effects}
        whileHover="cardHover"
        className="border rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
        {/* Project Image Container */}
        <div className="h-40 flex items-center justify-center p-4">
          <div className="w-full h-full flex items-center justify-center bg-white rounded-xl overflow-hidden">
            {project.image_url ? (
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-contain"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%' 
                }}
              />
            ) : (
              <ProjectPlaceholder />
            )}
          </div>
        </div>
  
        {/* Content Container */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Project Header */}
          <div className="mb-2">
            <h2 className="text-xl font-semibold">{project.title}</h2>
            {project.affiliation && (
              <p className="text-xs font-medium mt-1 text-primaryBlue">
                {project.affiliation.charAt(0).toUpperCase() + project.affiliation.slice(1)}
              </p>
            )}
          </div>
  
          {/* Description */}
          <p className="text-gray-600 mb-4 text-sm flex-grow">{project.description}</p>
  
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="bg-lightBlue text-white px-2 py-1 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
  
          {/* Links */}
          <div className="flex space-x-4 mt-auto">
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primaryBlue hover:text-lightBlue transition-colors flex items-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  strokeWidth="0"
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
                className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
              >
                <svg 
                  className="w-5 h-5 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                  strokeWidth="0"
                >
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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