'use client';

import React from 'react';
import { motion } from 'framer-motion';


export default function GreetingSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Welcome to My Portfolio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
        >
          I'm a full-stack developer passionate about building modern web applications, 
          AI integrations, and scalable solutions. Explore my projects and get in touch 
          to discuss how we can work together.
        </motion.p>
      </div>
    </section>
  );
}
