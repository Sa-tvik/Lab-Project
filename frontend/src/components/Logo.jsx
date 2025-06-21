import React from 'react';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/problemlist" className="flex items-center gap-2 text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
      <div className="relative">
        <Code2 className="w-8 h-8 text-blue-400" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Lab IDE
      </span>
    </Link>
                
  );
}