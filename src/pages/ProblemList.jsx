import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Circle } from 'lucide-react';
import Header from '../components/Header';

const problems = [
  { id: 1, title: 'Iterative Binary Search', completed: false, tags: ['Search', 'Iterative'] },
  { id: 2, title: 'Recursive Binary Search', completed: false, tags: ['Search', 'Recursion'] },
  { id: 3, title: 'Bubble Sort', completed: false, tags: ['Sorting'] },
  { id: 4, title: 'Insertion Sort', completed: false, tags: ['Sorting'] },
  { id: 5, title: 'Selection Sort', completed: false, tags: ['Sorting'] },
  { id: 6, title: 'Find Maximum and Minimum', completed: false, tags: ['Array'] },
  { id: 7, title: 'Merge Sort', completed: false, tags: ['Sorting', 'Divide and Conquer'] },
  { id: 8, title: 'Quick Sort', completed: false, tags: ['Sorting', 'Divide and Conquer'] },
  { id: 9, title: 'Breadth First Search', completed: false, tags: ['Graph', 'BFS'] },
  { id: 10, title: 'Depth First Search', completed: false, tags: ['Graph', 'DFS'] }
];

export default function ProblemList() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#1e1e1e] font-inter">
      <Header />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Problem List
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  onClick={() => navigate(`/problem/${problem.id}`)}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className='text-white font-bold pb-5'>{problem.id}.</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <div className="mt-1 flex gap-2">
                          {problem.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                    {problem.completed && (
                      <Circle className="text-green-500 w-3 h-3 fill-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
