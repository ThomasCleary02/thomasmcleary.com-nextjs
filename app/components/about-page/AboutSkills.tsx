'use client';

import { motion } from 'framer-motion';
import { Monitor, Server, Settings } from 'lucide-react';
import React from 'react';

export default function AboutSkills(): React.JSX.Element {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
      icon: Monitor,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Backend Development", 
      skills: ["Python", "Node.js", "Express", "PostgreSQL", "MongoDB"],
      icon: Server,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Tools & Infrastructure",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"],
      icon: Settings,
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
          Technical Expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index): React.JSX.Element => {
            const IconComponent = category.icon;
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-6 mx-auto`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill): React.JSX.Element => (
                    <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                      {skill}
                    </span>
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
