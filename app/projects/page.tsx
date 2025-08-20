import React from 'react';
import { ProjectService } from '@/lib/services/project';
import ProjectCard from '@/app/components/projects-page/ProjectCard';
import { Project } from '@/lib/types/project';

export default async function ProjectsPage() {
  const projects = await ProjectService.getProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of my work showcasing full-stack development, AI integration, and modern web technologies.
          </p>
        </div>
        
        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📁</div>
            <div className="text-gray-500 dark:text-gray-400 text-xl font-medium mb-2">No projects yet</div>
            <div className="text-gray-400 dark:text-gray-400">Check back soon for amazing projects!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}