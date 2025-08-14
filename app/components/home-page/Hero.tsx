'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export default function Hero(): React.JSX.Element {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-24">
      {/* Background gradient - Enhanced dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700"></div>
      
      {/* Floating elements - Enhanced for dark mode */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 dark:bg-blue-200/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200/20 dark:bg-blue-300/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg"
        >
          Thomas Cleary
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Full-stack software engineer building innovative solutions
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link 
            href="/projects"
            className="px-8 py-4 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View My Work
          </Link>
          <Link 
            href="/about"
            className="px-8 py-4 border-2 border-white dark:border-gray-200 text-white dark:text-gray-200 rounded-lg hover:bg-white dark:hover:bg-gray-200 hover:text-blue-600 dark:hover:text-blue-700 transition-all duration-300 font-semibold"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator - Enhanced dark mode */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white dark:border-gray-200 rounded-full flex justify-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white dark:bg-gray-200 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}