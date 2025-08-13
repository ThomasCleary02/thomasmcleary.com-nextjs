'use client';

import { useState, useEffect } from "react";
import { Project } from "@/lib/types/project";
import ProjectTile from "./ProjectTile";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Loading state
  if (loading) return (
    <div className="flex justify-center items-center py-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primaryBlue mx-auto mb-6"></div>
        <div className="text-primaryBlue text-xl font-medium">Loading amazing projects...</div>
      </div>
    </div>
  );
  
  // Error state
  if (error) return (
    <div className="text-center py-16">
      <div className="text-red-500 mb-4">
        <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="text-red-600 text-xl font-medium mb-2">Something went wrong</div>
      <div className="text-gray-500">{error}</div>
    </div>
  );

  // No projects found state
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-gray-500 text-xl font-medium mb-2">No projects yet</div>
        <div className="text-gray-400">Check back soon for amazing projects!</div>
      </div>
    );
  }

  // Render projects in awesome tile layout
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectTile key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList; 