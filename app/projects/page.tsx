import { Metadata } from 'next';
import ProjectList from "../components/projects-page/ProjectList";

export const metadata: Metadata = {
  title: 'Projects - Thomas Cleary',
  description: 'A showcase of my work across web development, mobile applications, and full-stack solutions. Each project represents a unique challenge and innovative approach to problem-solving.',
  openGraph: {
    title: 'Projects - Thomas Cleary',
    description: 'A showcase of my work across web development, mobile applications, and full-stack solutions.',
    url: 'https://thomasmcleary.com/projects',
  },
  twitter: {
    title: 'Projects - Thomas Cleary',
    description: 'A showcase of my work across web development, mobile applications, and full-stack solutions.',
  },
};

export default function ProjectsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work across web development, mobile applications, and full-stack solutions. 
            Each project represents a unique challenge and innovative approach to problem-solving.
          </p>
        </div>
        
        <ProjectList />
      </div>
    </div>
  );
};