import React from 'react';

export default function ProblemDescription() {
  return (
    <div className="h-full bg-white dark:bg-[#1e1e1e] overflow-y-auto">
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">1922. Count Good Numbers</h1>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-yellow-500 text-sm font-medium">Medium</span>
        </div>
        
        <div className="mt-6 prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">
            A digit string is <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">good</code> if the digits <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">(0-indexed)</code> at <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">even</code> indices are <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">even</code> and the digits at <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">odd</code> indices are <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">prime</code> (2, 3, 5, or 7).
          </p>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example 1:</h3>
            <pre className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
{`Input: n = 1
Output: 5
Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8".`}
            </pre>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example 2:</h3>
            <pre className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
{`Input: n = 4
Output: 400`}
            </pre>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example 3:</h3>
            <pre className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
{`Input: n = 50
Output: 564908303`}
            </pre>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Constraints:</h3>
            <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 list-disc list-inside">
              <li className="font-mono text-sm">1 ≤ n ≤ 10¹⁵</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}