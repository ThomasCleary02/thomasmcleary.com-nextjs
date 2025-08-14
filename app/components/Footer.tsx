import React from 'react';
import Link from 'next/link';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Thomas Cleary</h3>
            <p className="text-gray-300 text-sm">
              Full-stack software engineer passionate about building innovative solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-blue-400 transition-colors">Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:your.email@example.com" className="text-gray-300 hover:text-blue-400 transition-colors">Email</a></li>
              <li><a href="https://linkedin.com/in/yourprofile" className="text-gray-300 hover:text-blue-400 transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/yourusername" className="text-gray-300 hover:text-blue-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Thomas Cleary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
