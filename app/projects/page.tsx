'use client';

import { useState } from "react";
import FilterPills from "../components/FilterPills";
import ProjectList from "../components/ProjectList";

const ProjectsPage = () => {
    const [activeFilter, setActiveFilter] = useState("Professional");
  
    return (
      <div className="max-w-6xl mx-auto px-4 py-24">
        <div className="mb-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-primaryBlue mb-4">
            Explore My Projects
          </h1>
          <p className="text-gray-600 max-w-2xl">
            A collection of professional and personal projects showcasing my skills 
            and passion for creating innovative solutions.
          </p>
        </div>
        
        <FilterPills 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter} 
        />
        
        <ProjectList activeFilter={activeFilter} />
      </div>
    );
};

export default ProjectsPage; 