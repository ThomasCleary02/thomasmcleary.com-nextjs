import Link from 'next/link';
import React from 'react';
import { getSocialLinks } from '@/lib/utils/social';
import { Mail } from 'lucide-react';

export default function CTASec(): React.JSX.Element {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600 relative overflow-hidden">
      {/* Enhanced floating elements for dark mode */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 dark:bg-blue-200/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-300/20 dark:bg-blue-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-blue-200/20 dark:bg-blue-300/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
          Let&apos;s collaborate on your next project. Whether you need a full-stack application, 
          website redesign, or technical consultation, I&apos;m here to help bring your ideas to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/projects"
            className="px-8 py-4 bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View My Work
          </Link>
          <a
            href={getSocialLinks().email.url}
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
} 