'use client';

import { Mail, Linkedin } from 'lucide-react';

export default function AboutContact() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Let's Connect
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          I'm always interested in new opportunities, collaborations, and interesting projects. 
          Let's discuss how we can work together to bring your ideas to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="mailto:your.email@example.com" 
            className="px-8 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 font-medium inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </a>
          <a 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-blue-600 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white transition-all duration-300 font-medium inline-flex items-center"
          >
            <Linkedin className="w-5 h-5 mr-2" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}