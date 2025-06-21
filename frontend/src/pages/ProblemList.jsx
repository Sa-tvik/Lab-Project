import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function ProblemList() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
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
    fetchProblems();
  }, []);

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

              {loading ? (
                //  Skeleton shimmer
                <div className="space-y-4 animate-pulse p-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-14 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  ))}
                </div>
              ) : error ? (
                //  Fetch error
                <div className="p-4 text-center text-red-500">
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
                //  No problems found
                <div className="p-4 text-center text-gray-500">
                  No problems found.
                </div>
              ) : (
                //  Problem list
                problems.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => navigate(`/problem/${problem.order}`)}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-white font-bold pb-5">{problem.order}.</div>
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
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
