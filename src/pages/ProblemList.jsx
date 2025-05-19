import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Circle } from 'lucide-react';
import Header from '../components/Header';

const problems = [
  { id: 1, title: 'Iterative Binary Search', difficulty: 'Easy', completed: false, tags: ['Search', 'Iterative'] },
  { id: 2, title: 'Recursive Binary Search', difficulty: 'Easy', completed: false, tags: ['Search', 'Recursion'] },
  { id: 3, title: 'Bubble Sort', difficulty: 'Easy', completed: false, tags: ['Sorting'] },
  { id: 4, title: 'Insertion Sort', difficulty: 'Easy', completed: false, tags: ['Sorting'] },
  { id: 5, title: 'Selection Sort', difficulty: 'Easy', completed: false, tags: ['Sorting'] },
  { id: 6, title: 'Find Maximum and Minimum', difficulty: 'Easy', completed: false, tags: ['Array'] },
  { id: 7, title: 'Merge Sort', difficulty: 'Medium', completed: false, tags: ['Sorting', 'Divide and Conquer'] },
  { id: 8, title: 'Quick Sort', difficulty: 'Medium', completed: false, tags: ['Sorting', 'Divide and Conquer'] },
  { id: 9, title: 'Breadth First Search', difficulty: 'Medium', completed: false, tags: ['Graph', 'BFS'] },
  { id: 10, title: 'Depth First Search', difficulty: 'Medium', completed: false, tags: ['Graph', 'DFS'] }
];


const difficultyColors = {
  Easy: 'text-green-500',
  Medium: 'text-yellow-500',
  Hard: 'text-red-500',
};

export default function ProblemList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <>
      <div className="h-screen flex flex-col bg-white dark:bg-[#1e1e1e] font-inter">
        <Header />
  
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Problem List
            </h1>
  
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
  
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <div className="flex gap-2">
                  {['All', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`px-4 py-2 rounded-md text-sm ${
                        selectedDifficulty === difficulty
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Problem List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Circle
                        className={`w-2 h-2 ${difficultyColors[problem.difficulty]}`}
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {problem.id}. {problem.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-3">
                          <span
                            className={`text-sm font-medium ${difficultyColors[problem.difficulty]}`}
                          >
                            {problem.difficulty}
                          </span>
                          <div className="flex gap-2">
                            {problem.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {problem.completed && (
                        <Circle className="text-green-500 w-3 h-3 fill-green-500"></Circle>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  