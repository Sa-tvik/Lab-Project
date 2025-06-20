import React from 'react';
import { Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/problemlist" className="flex items-center gap-2 text-gray-900 dark:text-white hover:opacity-80 transition-opacity">
      <Code2 className="w-6 h-6 text-blue-600" />
      <span className="font-semibold text-lg">Lab IDE</span>
    </Link>
  );
}