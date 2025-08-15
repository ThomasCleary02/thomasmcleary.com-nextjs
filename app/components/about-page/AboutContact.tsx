'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import React from 'react';

export default function AboutContact(): React.JSX.Element {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I&apos;m always interested in new opportunities and collaborations. 
            Feel free to reach out if you&apos;d like to discuss a project or just say hello!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="mailto:thomas@thomasmcleary.com"
            className="flex items-center gap-3 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Mail className="h-5 w-5" />
            <span className="font-medium">Email Me</span>
          </a>

          <a
            href="https://www.linkedin.com/in/t-cleary/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-blue-700 dark:bg-blue-600 text-white rounded-xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-medium">LinkedIn</span>
          </a>

          <a
            href="https://github.com/ThomasCleary02"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-900 dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Github className="h-5 w-5" />
            <span className="font-medium">GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}