import React from 'react';
import { useLocation } from 'react-router-dom';
import { Settings} from 'lucide-react';
import Logo from './Logo';
import Timer from './Timer';

export default function Header() {
  const location = useLocation()

  return (
    <div className="h-12 bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white flex items-center px-4 py-5 pt-5 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-none">
        <Logo />
      </div>
      
      <div className="flex-1 flex justify-center">
      {location.pathname.startsWith('/problem/') && (
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
            Run
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-leetcode-button-primary hover:bg-leetcode-button-hover text-white rounded-lg transition-colors text-sm">
            Submit
          </button>
        </div>
      )}
      </div>

      <div className="flex-none flex items-center">
      {location.pathname.startsWith('/problem/') && (
        <Timer/>
      )}
        
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}