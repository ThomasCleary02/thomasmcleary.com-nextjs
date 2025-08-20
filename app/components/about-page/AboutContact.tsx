'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { getSocialLinks } from '@/lib/utils/social';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function AboutContact(): React.JSX.Element {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={getSocialLinks().email.url}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
              {getSocialLinks().email.label}
            </motion.a>
            <motion.a
              href={getSocialLinks().linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Linkedin className="w-5 h-5" />
              {getSocialLinks().linkedin.label}
            </motion.a>
            <motion.a
              href={getSocialLinks().github.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Github className="w-5 h-5" />
              {getSocialLinks().github.label}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}