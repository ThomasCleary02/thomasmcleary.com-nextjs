'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function IntroSection(): React.JSX.Element {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    
    if (hour < 12) {
      return "Hey there! Hope you're having a great morning";
    } else if (hour < 17) {
      return "Hey there! Hope you're having a great afternoon";
    } else if (hour < 22) {
      return "Hey there! Hope you're having a great evening";
    } else {
      return "Hey there! Hope you're having a great night";
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Avatar - Mobile: top, Desktop: left */}
          <div className="order-2 lg:order-1 w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg border-4 border-white">
            <Image
              src="/avatar.png"
              alt="Thomas Cleary"
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Speech bubble - Mobile: bottom, Desktop: right */}
          <div className="relative order-1 lg:order-2 bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 shadow-lg max-w-md">
            <div className="text-2xl text-gray-800 dark:text-white font-medium">
              {getTimeBasedGreeting()} 👋
            </div>
            
            {/* Speech bubble tail - Mobile: points down, Desktop: points left */}
            <div className="lg:hidden absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
            </div>
            
            {/* Desktop tail pointing left (toward avatar) */}
            <div className="hidden lg:block absolute left-full top-1/2 transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[8px] border-t-transparent border-b-transparent border-l-white dark:border-l-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
