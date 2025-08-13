'use client';

import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/types/project";

interface ProjectWithFlag extends Project {
  isProfessional: boolean;
}

interface ProjectListProps {
  activeFilter: string;
}

const ProjectList = ({ activeFilter }: ProjectListProps) => {
  const [projects, setProjects] = useState<ProjectWithFlag[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const cachedData = localStorage.getItem("projects");
        const cacheTimestamp = localStorage.getItem("cacheTimestamp");

        const isCacheValid =
          cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < CACHE_EXPIRATION_TIME;

        if (isCacheValid) {
          setProjects(JSON.parse(cachedData));
          setLoading(false);
        } else {
          const response = await fetch(
            "https://projects-database-d25a17e83152.herokuapp.com/api/projects/"
          );
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Add a boolean flag for each project
          const projectsWithFlag = data.map((project: any) => ({
            ...project,
            // If affiliation is null or empty, isProfessional is false
            // Otherwise, it's true
            isProfessional: project.affiliation && project.affiliation.trim() !== ''
          }));
          
          localStorage.setItem("projects", JSON.stringify(projectsWithFlag));
          localStorage.setItem("cacheTimestamp", Date.now().toString());

          setProjects(projectsWithFlag);
          setLoading(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error instanceof Error ? error.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter based on the active pill and the isProfessional flag
    if (activeFilter !== "All") {
      filtered = projects.filter((project) => {
        // For "Professional" filter, show only projects with affiliation
        // For "Hobby" filter, show only projects without affiliation
        return activeFilter === "Professional" 
          ? project.isProfessional 
          : !project.isProfessional;
      });
    }

    setFilteredProjects(filtered);
  }, [activeFilter, projects]);

  // Loading and error states
  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <div className="text-primaryBlue text-lg">Loading...</div>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-500 py-8">
      Error: {error}
    </div>
  );

  // No projects found state
  if (filteredProjects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No projects found matching the selected filter.
      </div>
    );
  }

  // Render projects
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList; 