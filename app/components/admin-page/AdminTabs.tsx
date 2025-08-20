'use client';

import React from 'react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

export default function AdminTabs({ activeTab, onTabChange, tabs }: AdminTabsProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-1 backdrop-blur-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
