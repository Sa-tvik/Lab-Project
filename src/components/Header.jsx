import React from 'react';
import { Timer, Settings, Sun, Play, Send } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

export default function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="h-12 bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-none">
        <Logo />
      </div>
      
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-leetcode-button-primary hover:bg-leetcode-button-hover text-white rounded-md transition-colors text-sm">
            <Play className="w-4 h-4" />
            Run
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm">
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>

      <div className="flex-none flex items-center gap-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md">
          <Timer className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-mono">02:45:30</span>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="w-4 h-4 theme-toggle text-gray-600 dark:text-gray-400" />
        </button>
        
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}