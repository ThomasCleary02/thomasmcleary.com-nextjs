'use client';

import { motion } from 'framer-motion';
import { Monitor, Cloud, Database, Cpu } from 'lucide-react';
import React from 'react';

export default function AboutSkills(): React.JSX.Element {
  const skillCategories = [
    {
      title: "Frontend & Mobile",
      skills: ["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS", "Expo"],
      icon: Monitor,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      description: "Building responsive, cross-platform applications"
    },
    {
      title: "Backend & Databases", 
      skills: ["Python", "Django", "Node.js", "Express", "Firebase", "PostgreSQL", "MongoDB", "Redis"],
      icon: Database,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      description: "Server-side solutions and data architecture"
    },
    {
      title: "Cloud & Infrastructure",
      skills: ["AWS S3", "Lambda", "Route 53", "Rekognition", "Heroku", "Fly.io", "Vercel", "Cloudflare"],
      icon: Cloud,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      description: "Cloud services and deployment platforms"
    },
    {
      title: "AI & Tools",
      skills: ["LangChain", "OpenAI APIs", "Git", "Docker", "Figma", "Agile", "Postman"],
      icon: Cpu,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20",
      description: "AI integration and development tools"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white bg-clip-text text-transparent mb-6">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index): React.JSX.Element => {
            const IconComponent = category.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-gradient-to-br ${category.bgColor} backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300`}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {category.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex): React.JSX.Element => (
                    <motion.span 
                      key={skill} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
