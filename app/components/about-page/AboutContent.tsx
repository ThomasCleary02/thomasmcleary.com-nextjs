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
                I'm Thomas Cleary, a software developer with a Bachelor of Science in Computer & Information Technology 
                from Shepherd University. I've developed expertise in full-stack web development and mobile applications.
              </p>
              <p className="text-lg">
                My recent work includes developing cross-platform mobile apps using React Native and Expo, 
                building web applications with React and Next.js, and working with backend technologies like Django 
                and Firebase. I'm comfortable working with multiple programming languages and frameworks.
              </p>
              <p className="text-lg">
                I thrive in collaborative environments and enjoy working with teams to deliver high-quality software solutions. 
                I'm passionate about learning new technologies and staying current with industry best practices.
              </p>
            </div>
          </motion.div>

          {/* Right Image with Stacked Offset Shapes Behind */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Stacked offset shapes behind the image */}
            <div className="absolute -top-2 -right-2 w-full h-96 lg:h-[500px] bg-blue-400/20 dark:bg-blue-600/20 rounded-2xl rotate-3"></div>
            <div className="absolute -top-1 -right-1 w-full h-96 lg:h-[500px] bg-purple-400/20 dark:bg-purple-600/20 rounded-2xl rotate-1"></div>
            <div className="absolute -top-3 -right-3 w-full h-96 lg:h-[500px] bg-green-400/20 dark:bg-green-600/20 rounded-2xl rotate-6"></div>
            
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/Vector 1.png"
                alt="Thomas Cleary"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}