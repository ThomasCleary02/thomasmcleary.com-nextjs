'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bug, X, Github, Linkedin, Mail } from 'lucide-react';
import BugReportForm from './BugReportForm';
import { getSocialLinks } from '@/lib/utils/social';

export default function Footer(): React.JSX.Element {
  const [showBugForm, setShowBugForm] = useState(false);

  // Icon mapping for social links
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'mail': return <Mail className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Thomas Cleary</h3>
            <p className="text-gray-400 text-sm">
              Full-stack software engineer passionate about building innovative solutions.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          {/* Social Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {Object.entries(getSocialLinks()).map(([key, link]) => (
                <li key={key}>
                  <a 
                    href={link.url} 
                    target={key === 'email' ? undefined : '_blank'} 
                    rel={key === 'email' ? undefined : 'noopener noreferrer'} 
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    {getIcon(link.icon)}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bug Report Section */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="text-center">
            <button
              onClick={() => setShowBugForm(true)}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Bug className="w-4 h-4" />
              Report a Bug
            </button>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Thomas Cleary. All rights reserved.</p>
        </div>
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
    </footer>
  );
}
