'use client';

import { useState, useEffect } from 'react';
import RouteButton from './RouteButton';

interface GreetingResponse {
  greeting: string;
  emoji: string;
  tone: 'friendly' | 'professional' | 'casual';
}

export default function Hero() {
  const [greeting, setGreeting] = useState<GreetingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch('/api/greeting');
        if (response.ok) {
          const data = await response.json();
          setGreeting(data);
        }
      } catch (error) {
        console.error('Failed to fetch greeting:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <section className="bg-backgroundLight min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto max-w-6xl px-2 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="lg:w-2/3 text-center lg:text-left w-full order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primaryBlue mb-4">
            Hey, I&apos;m Thomas!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-darkGray mb-6">
            A <span className="text-primaryBlue font-semibold">software engineer</span> passionate about 
            building innovative solutions across the full technology stack. I specialize in creating 
            <span className="text-primaryBlue font-semibold"> user-focused</span>{' '}
            applications that solve real-world problems.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            From web development to mobile apps, from frontend interfaces to backend systems, 
            I bring a comprehensive understanding of modern software architecture and development practices.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start">
            <RouteButton 
              text="Check Out My Projects!" 
              route="/projects"
            />
          </div>
        </div>

        {/* Right Image with Greeting */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-end w-full order-1 lg:order-2 mb-8 lg:mb-0">
          {/* Greeting Bubble - Increase top margin for mobile */}
          <div className="relative mb-4 mt-20 sm:mt-16 lg:mt-0">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 max-w-xs text-center">
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primaryBlue rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primaryBlue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primaryBlue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : greeting ? (
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">{greeting.emoji}</span>
                  <p className="text-sm sm:text-base text-gray-800 font-medium">
                    {greeting.greeting}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg">👋</span>
                  <p className="text-sm sm:text-base text-gray-800 font-medium">
                    Hello there!
                  </p>
                </div>
              )}
            </div>
            {/* Speech bubble tail */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"></div>
          </div>

          {/* Avatar */}
          <div className="relative">
            <img
              src="/avatar.png"
              alt="Thomas"
              className="rounded-2xl max-w-full w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-cover shadow-xl border-4 border-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}