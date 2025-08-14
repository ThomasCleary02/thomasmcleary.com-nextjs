'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

export default function AboutContent(): React.JSX.Element {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p className="text-lg">
                I&apos;m Thomas Cleary, a software engineer with a strong foundation in computer science and 
                a passion for building innovative solutions. I hold a Bachelor of Science in Computer & Information Technology 
                from Shepherd University, where I developed expertise in software engineering, networking, database management, 
                and systems security.
              </p>
              <p className="text-lg">
                My technical skills span the full development spectrum - from frontend frameworks and responsive design 
                to backend architecture, database systems, and cloud infrastructure. I&apos;m comfortable working with 
                multiple programming languages, frameworks, and tools, allowing me to adapt quickly to new technologies 
                and project requirements.
              </p>
              <p className="text-lg">
                Beyond technical skills, I bring strong problem-solving abilities, effective communication, 
                and a collaborative mindset to every project. I thrive in agile environments and enjoy working 
                with teams to deliver high-quality software solutions.
              </p>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Vector 1.png"
                alt="Thomas Cleary"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300/20 dark:bg-blue-500/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}