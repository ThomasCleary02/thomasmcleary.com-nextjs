'use client';

import { useState, useEffect } from "react";
import { Project } from "@/lib/types/project";
import ProjectTile from "./ProjectTile";
import { Loader2, AlertCircle, FolderOpen } from 'lucide-react';

/**
 * ProjectList component for displaying projects with loading states
 * Useful for admin panels or other dynamic contexts
 */

interface ProjectListProps {
  /** Optional filter function for projects */
  filterProjects?: (projects: Project[]) => Project[];
  /** Custom loading message */
  loadingMessage?: string;
  /** Custom empty state message */
  emptyMessage?: string;
}

const ProjectList = ({ 
  filterProjects, 
  loadingMessage = "Loading amazing projects...",
  emptyMessage = "No projects found"
}: ProjectListProps): React.JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect((): void => {
    const fetchProjects = async (): Promise<void> => {
      try {
        const response = await fetch("/api/projects");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const filteredProjects = filterProjects ? filterProjects(data) : data;
        setProjects(filteredProjects);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filterProjects]);

  // Loading state
  if (loading) return (
    <div className="flex justify-center items-center py-16">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-6" />
        <div className="text-blue-600 dark:text-blue-400 text-xl font-medium">{loadingMessage}</div>
      </div>
    </div>
  );
  
  // Error state
  if (error) return (
    <div className="text-center py-16">
      <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
      <div className="text-red-600 dark:text-red-400 text-xl font-medium mb-2">Something went wrong</div>
      <div className="text-gray-500 dark:text-gray-400">{error}</div>
    </div>
  );

  // No projects found state
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <FolderOpen className="w-20 h-20 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <div className="text-gray-500 dark:text-gray-400 text-xl font-medium mb-2">{emptyMessage}</div>
        <div className="text-gray-400 dark:text-gray-500">Check back soon for amazing projects!</div>
      </div>
    );
  }

  // Render projects in grid layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectTile key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList; 