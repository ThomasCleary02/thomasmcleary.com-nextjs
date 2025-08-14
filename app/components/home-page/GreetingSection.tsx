'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function GreetingSection() {
  const [greeting, setGreeting] = useState('Hello');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const greetingResponse = await fetch('/api/greeting');
        if (greetingResponse.ok) {
          const greetingData = await greetingResponse.json();
          setGreeting(greetingData.greeting);
        }

        try {
          const locationResponse = await fetch('/api/get-location');
          if (locationResponse.ok) {
            const locationData = await locationResponse.json();
            if (locationData.city && locationData.region) {
              setLocation(` from ${locationData.city}, ${locationData.region}`);
            }
          }
        } catch (error) {
          // Location is optional
        }
      } catch (error) {
        setGreeting('Hello');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle background pattern for cohesion */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
      
      <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8"
          >
            {/* Avatar - Mobile: below, Desktop: left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative order-2 lg:order-1"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 p-1 shadow-lg">
                <Image
                  src="/avatar.png"
                  alt="Thomas Cleary"
                  width={128}
                  height={128}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-full bg-blue-400/20 dark:bg-blue-300/20 blur-xl -z-10"></div>
            </motion.div>
            
            {/* Speech bubble - Mobile: above, Desktop: right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg dark:shadow-gray-900/50 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                {isLoading ? (
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
                    <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse mr-2"></span>
                    Loading...
                  </div>
                ) : (
                  <motion.div 
                    key={greeting}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-white font-medium leading-tight"
                  >
                    {greeting}{location} 👋
                  </motion.div>
                )}
                
                {/* Speech bubble tail - Mobile: points down, Desktop: points left */}
                <div className="lg:hidden absolute top-full left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-r-[8px] sm:border-r-[12px] border-t-[8px] sm:border-t-[12px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
                </div>
                
                {/* Desktop tail pointing left */}
                <div className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-white dark:border-r-gray-800"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
