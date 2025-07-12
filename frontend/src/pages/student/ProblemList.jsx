// ProblemList.js with sleek UI, column labels, hover animation, and correct background styling

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProblemContext } from '../../context/ProblemContext';
import Header from '../../components/Header';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ProblemList() {
  const navigate = useNavigate();
  const { problems, setProblems } = useProblemContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProblems = async () => {
    try {
      setError(false);
      const res = await fetch("http://localhost:5000/problems");
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Invalid data");
      setProblems(data);
    } catch (err) {
      console.error("Error fetching problems:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!problems || problems.length === 0) {
      fetchProblems();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black font-inter">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Problems</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Solve coding problems and improve your skills
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Table Header */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="col-span-1">Status</div>
              <div className="col-span-11">Title & Tags</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <div className="space-y-4 animate-pulse p-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                ))}
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">
                <p>Failed to load problems.</p>
                <button
                  onClick={() => {
                    setLoading(true);
                    fetchProblems();
                  }}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            ) : problems.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No problems found.
              </div>
            ) : (
              problems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  onClick={() => navigate(`/problem/${problem.order_id}`)}
                  className="p-4 cursor-pointer transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1">
                      {problem.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                      )}
                    </div>
                    <div className="col-span-11">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                          {problem.order_id}.
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {problem.title}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {problem.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

        </motion.div>
        {!loading && !error && (
          <motion.div 
            className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Showing {problems.length} problems
          </motion.div>
        )}
      </div>
    </div>
  );
}
