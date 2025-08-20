'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { getSocialLinks } from '@/lib/utils/social';
import { Bug, X, Code, Globe, Github } from 'lucide-react';
import BugReportForm from '../BugReportForm';

export default function AboutContent(): React.JSX.Element {
  const [showBugForm, setShowBugForm] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="text-lg">
                I&apos;m Thomas Cleary, a software developer with a Bachelor of Science in Computer &amp; Information Technology 
                from Shepherd University. I&apos;ve developed expertise in full-stack web development and mobile applications.
              </p>
              <p className="text-lg">
                My recent work includes developing cross-platform mobile apps using React Native and Expo, 
                building web applications with React and Next.js, and working with backend technologies like Django 
                and Firebase. I&apos;m comfortable working with multiple programming languages and frameworks.
              </p>
              <p className="text-lg">
                I thrive in collaborative environments and enjoy working with teams to deliver high-quality software solutions. 
                I&apos;m passionate about learning new technologies and staying current with industry best practices.
              </p>
            </div>
          </motion.div>

          {/* Right Image with Enhanced Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Enhanced floating elements */}
            <div className="absolute -top-4 -right-4 w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-400/30 to-purple-400/30 dark:from-blue-600/30 dark:to-purple-600/30 rounded-2xl rotate-6 animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-full h-96 lg:h-[500px] bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/20 dark:to-pink-600/20 rounded-2xl rotate-3 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute -top-6 -right-6 w-full h-96 lg:h-[500px] bg-gradient-to-br from-green-400/20 to-blue-400/20 dark:from-green-600/20 dark:to-blue-600/20 rounded-2xl rotate-12 animate-pulse" style={{animationDelay: '2s'}}></div>
            
            <motion.div 
              className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/Vector 1.png"
                alt="Thomas Cleary"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Website Info Section - More Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            About This Website
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
                Modern Tech Stack
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance and developer experience.
              </p>
            </div>
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
                Responsive Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Mobile-first approach with dark mode support and smooth animations throughout.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Github className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
                Open Source
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Complete source code available on GitHub for learning and collaboration.
              </p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href={getSocialLinks().github.url + '/thomasmcleary.com-nextjs'}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Github className="w-5 h-5" />
              View Source Code →
            </a>
          </div>
        </motion.div>

        {/* Bug Report Section - More Engaging */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              🐛 Found an Issue?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Help me improve this website by reporting any bugs or issues you encounter. 
              Your feedback makes this site better for everyone!
            </p>
            <button
              onClick={() => setShowBugForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Bug className="w-5 h-5" />
              Report a Bug
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bug Form Modal */}
      {showBugForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Report a Bug</h2>
                <button
                  onClick={() => setShowBugForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <BugReportForm onSuccess={() => setShowBugForm(false)} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}