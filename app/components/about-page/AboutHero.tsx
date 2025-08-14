import React from 'react';

export default function AboutHero(): React.JSX.Element {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700 min-h-[60vh] flex items-center justify-center px-4 z-10">
      {/* Floating elements for consistency with home page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 dark:bg-blue-200/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-400/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          About Me
        </h1>
        <p className="text-xl lg:text-2xl text-blue-100 dark:text-blue-200 leading-relaxed max-w-3xl mx-auto">
          Software engineer with a passion for building innovative solutions
        </p>
      </div>
    </section>
  );
}