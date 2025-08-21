'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Search, Copy, Check, ExternalLink } from 'lucide-react';
import { Project } from '@/lib/types/project';

interface ApiDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

export default function ApiDemoModal({ isOpen, onClose, project }: ApiDemoModalProps) {
  const [searchQuery, setSearchQuery] = useState('python programming');
  const [numResults, setNumResults] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const testApi = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const API_KEY = process.env.NEXT_PUBLIC_BOOK_SCRAPER_API_KEY || 'DEMO_KEY';
      const response = await fetch('https://bookscraperapi-production.up.railway.app/search', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keywords: searchQuery,
          num_results: numResults
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        const errorData = await response.json();
        setError(`${response.status}: ${errorData.detail || 'API Error'}`);
      }
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCurlCommand = () => {
    return `curl -X POST "https://bookscraperapi-production.up.railway.app/search" \\\n  -H "Authorization: Bearer DEMO_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"keywords": "${searchQuery}", "num_results": ${numResults}}'`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    API Demo
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {project.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
              {/* API Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">API Endpoint</h3>
                <div className="flex items-center gap-2">
                  <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-sm font-mono">
                    https://bookscraperapi-production.up.railway.app
                  </code>
                  <a
                    href="https://bookscraperapi-production.up.railway.app/health"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Interactive Demo */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">Try the API</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Keywords
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                      placeholder="e.g., python programming"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Results
                    </label>
                    <select
                      value={numResults}
                      onChange={(e) => setNumResults(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700"
                    >
                      <option value={1}>1</option>
                      <option value={3}>3</option>
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={testApi}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Testing API...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Test API
                    </>
                  )}
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-medium text-green-900 dark:text-green-100 mb-3">
                    API Response ({results.length} results)
                  </h3>
                  <div className="space-y-3">
                    {results.map((book, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-start gap-3">
                          {book.cover_img && (
                            <img src={book.cover_img} alt={book.title} className="w-16 h-20 object-cover rounded" />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{book.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">Author: {book.author?.join(', ')}</p>
                            {book.price && <p className="text-gray-600 dark:text-gray-400 text-xs">Price: {book.price}</p>}
                            {book.rating && <p className="text-gray-600 dark:text-gray-400 text-xs">Rating: {book.rating}/5</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h3 className="font-medium text-red-900 dark:text-red-100 mb-2">Error</h3>
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* cURL Command */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">cURL Command</h3>
                  <button
                    onClick={() => copyToClipboard(generateCurlCommand())}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {generateCurlCommand()}
                </pre>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
              <div className="flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
