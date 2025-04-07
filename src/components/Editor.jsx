import React from 'react';

export default function Editor() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e]">
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <select className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-md px-2 py-1.5 border border-gray-200 dark:border-gray-600">
          <option>Java</option>
          <option>Python</option>
          <option>JavaScript</option>
        </select>
      </div>
      
      <div className="flex-1 bg-[#1e1e1e] text-white font-mono p-4 overflow-auto">
        <pre className="text-sm">
{`class Solution {
    public int countGoodNumbers(long n) {
        // Your solution here
        return 0;
    }
}`}
        </pre>
      </div>
      
      <div className="h-40 bg-[#1e1e1e] text-white p-4 overflow-y-auto border-t border-gray-700">
        <div className="text-sm font-mono">
          <div className="text-gray-400">// Output</div>
          <div className="mt-2">Running test cases...</div>
          <div className="text-green-500">✓ Test case 1 passed</div>
          <div className="text-red-500">✗ Test case 2 failed</div>
          <div className="text-gray-400 mt-2">Expected: 400</div>
          <div className="text-gray-400">Received: 0</div>
        </div>
      </div>
    </div>
  );
}