'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Copy, Check, Bot, Database, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Project } from '@/lib/types/project';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SetupInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  showType: 'setup' | 'info'; // Add this prop
}

export default function SetupInstructionsModal({ isOpen, onClose, project, showType }: SetupInstructionsModalProps) {
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

  const getModalIcon = () => {
    if (showType === 'info') return <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    
    switch (project.demo_type) {
      case 'discord': return <Bot className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'local': return <Code className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'api': return <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      default: return <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getModalTitle = () => {
    if (showType === 'info') return 'Project Information';
    
    switch (project.demo_type) {
      case 'discord': return 'Discord Bot Setup';
      case 'local': return 'Setup Instructions';
      case 'api': return 'API Documentation';
      default: return 'Setup Instructions';
    }
  };

  // Add this custom component configuration for ReactMarkdown
  const markdownComponents = {
    h1: ({node, ...props}) => (
      <h1 {...props} className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700" />
    ),
    h2: ({node, ...props}) => (
      <h2 {...props} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3" />
    ),
    h3: ({node, ...props}) => (
      <h3 {...props} className="text-lg font-semibold text-gray-900 dark:text-white mt-5 mb-2" />
    ),
    h4: ({node, ...props}) => (
      <h4 {...props} className="text-base font-semibold text-gray-900 dark:text-white mt-4 mb-2" />
    ),
    p: ({node, ...props}) => (
      <p {...props} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" />
    ),
    ul: ({node, ...props}) => (
      <ul {...props} className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 ml-4" />
    ),
    ol: ({node, ...props}) => (
      <ol {...props} className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-2 ml-4" />
    ),
    li: ({node, ...props}) => (
      <li {...props} className="text-gray-700 dark:text-gray-300" />
    ),
    strong: ({node, ...props}) => (
      <strong {...props} className="font-bold text-gray-900 dark:text-white" />
    ),
    em: ({node, ...props}) => (
      <em {...props} className="italic text-gray-700 dark:text-gray-300" />
    ),
    code: ({node, inline, className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="my-4">
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            className="rounded-lg"
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code {...props} className="bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      );
    },
    blockquote: ({node, ...props}) => (
      <blockquote {...props} className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-3 my-4 italic text-gray-700 dark:text-gray-300 rounded-r-lg" />
    ),
    a: ({node, ...props}) => (
      <a {...props} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" />
    ),
    hr: ({node, ...props}) => (
      <hr {...props} className="my-6 border-gray-300 dark:border-gray-600" />
    ),
    table: ({node, ...props}) => (
      <div className="overflow-x-auto my-4">
        <table {...props} className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg" />
      </div>
    ),
    th: ({node, ...props}) => (
      <th {...props} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600" />
    ),
    td: ({node, ...props}) => (
      <td {...props} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600" />
    )
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {getModalIcon()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {getModalTitle()}
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
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {showType === 'info' ? (
                /* Show full description for info button */
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">Full Description</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ) : (
                /* Show setup instructions for setup button */
                <>
                  {/* Discord Bot Specific Content */}
                  {project.demo_type === 'discord' && (
                    <>
                      {/* Quick Setup */}
                      {project.discord_invite_url && (
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
                          <h4 className="font-medium text-indigo-900 dark:text-indigo-100 mb-3">Quick Setup</h4>
                          <a
                            href={project.discord_invite_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            <Bot className="h-4 w-4" />
                            Add Bot to Server
                          </a>
                        </div>
                      )}
                      
                      {/* Commands */}
                      {project.discord_commands && project.discord_commands.length > 0 && (
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Available Commands</h4>
                          <div className="space-y-2">
                            {project.discord_commands.map((command, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">
                                  {command}
                                </code>
                                <button
                                  onClick={() => copyToClipboard(command)}
                                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
                                >
                                  Copy
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Setup Instructions */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {project.demo_type === 'discord' ? 'Detailed Setup' : 'Instructions'}
                      </h3>
                      <button
                        onClick={() => copyToClipboard(project.setup_instructions || '')}
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
                            Copy All
                          </>
                        )}
                      </button>
                    </div>
                    <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                      <ReactMarkdown components={markdownComponents}>
                        {project.setup_instructions || 'No setup instructions available for this project.'}
                      </ReactMarkdown>
                    </div>
                  </div>
                </>
              )}
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
