import React from 'react';
import Image from 'next/image';

interface GreetingContentProps {
  greetingData: {
    greeting: string;
    weather: any;
    location: {
      city: string;
      region: string;
      country: string;
    } | null;
  };
}

export default function GreetingContent({ greetingData }: GreetingContentProps): React.JSX.Element {
  const locationText = greetingData.location 
    ? ` from ${greetingData.location.city}, ${greetingData.location.region}`
    : '';

  const weatherText = greetingData.weather 
    ? ` - ${greetingData.weather.condition}, ${greetingData.weather.temperature}°F`
    : '';

  return (
    <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Subtle background pattern for cohesion */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent"></div>
      
      <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
          {/* Avatar - Mobile: below, Desktop: left */}
          <div className="relative order-2 lg:order-1">
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
          </div>
          
          {/* Speech bubble - Mobile: above, Desktop: right */}
          <div className="relative order-1 lg:order-2">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg dark:shadow-gray-900/50 max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-white font-medium leading-tight">
                {greetingData.greeting}{locationText}{weatherText} 👋
              </div>
              
              {/* Speech bubble tail - Mobile: points down, Desktop: points right */}
              <div className="lg:hidden absolute top-full left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[8px] sm:border-l-[12px] border-r-[8px] sm:border-r-[12px] border-t-[8px] sm:border-t-[12px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
              </div>
              
              {/* Desktop tail pointing right (toward avatar) */}
              <div className="hidden lg:block absolute right-full top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[12px] border-t-transparent border-b-transparent border-r-white dark:border-r-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
