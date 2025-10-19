import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProblemContext } from '../../context/ProblemContext';
import Header from '../../components/Header';

export default function Dashboard() {
  const navigate = useNavigate();
  const { problems, setProblems } = useProblemContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [actionLoading, setActionLoading] = useState({}); 
  const backendUrl = import.meta.env.VITE_API_URL;

  const fetchProblems = async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(`${backendUrl}/problems`, { credentials: 'include' });
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error('Invalid data');
      setProblems(data);
    } catch (err) {
      console.error('Error fetching problems:', err);
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

  const toggleLock = async (e, problem) => {
    e.stopPropagation(); // prevent row navigation
    const orderId = problem.order_id;
    const currentlyUnlocked = !!problem.is_unlocked;
    const newUnlockState = !currentlyUnlocked;

    // optimistic update
    setProblems((prev) => prev.map((p) => (p.order_id === orderId ? { ...p, is_unlocked: newUnlockState } : p)));
    setActionLoading((s) => ({ ...s, [orderId]: true }));

    try {
      // toggles the lock state
      const res = await fetch(`${backendUrl}/problems/unlock/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ is_unlocked: currentlyUnlocked }) // backend flips it
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.success) {
        // revert optimistic change
        setProblems((prev) => prev.map((p) => (p.order_id === orderId ? { ...p, is_unlocked: currentlyUnlocked } : p)));
        throw new Error(json?.message || `Failed to update (status ${res.status})`);
      }

      // If backend returned the updated problem, use it to update local state
      if (json.problem) {
        const updated = json.problem;
        setProblems((prev) =>
          prev.map((p) => {
            // match by order or order_id (whichever your backend returns)
            if (updated.order_id !== undefined && (p.order_id === updated.order_id || p.order === updated.order_id)) {
              return { ...p, ...updated };
            }
            return p;
          })
        );
      }

    } catch (err) {
      console.error('Toggle lock error:', err);
      // revert optimistic change (safety)
      setProblems((prev) => prev.map((p) => (p.order_id === orderId ? { ...p, is_unlocked: currentlyUnlocked } : p)));
    } finally {
      setActionLoading((s) => {
        const copy = { ...s };
        delete copy[orderId];
        return copy;
      });
    }
  };

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
              Lock or unlock problems to control student access
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
            <div className="grid grid-cols-11 gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="col-span-9">Title & Tags</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>
        </div>


          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <div className="space-y-4 animate-pulse p-6">
                {[...Array(6)].map((_, i) => (
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
              <div className="p-6 text-center text-gray-500">No problems found.</div>
            ) : (
              problems.map((problem, index) => (
                <motion.div
                  key={problem.id || problem.order_id || index}
                  className="p-4 cursor-pointer transition-all group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="grid grid-cols-11 gap-4 items-center">

                    <div className="col-span-9">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                          {problem.order_id}.
                        </span>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {problem.title}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(problem.tags || []).map((tag) => (
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

                    <div className="col-span-2 text-right flex items-center justify-end gap-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${problem.is_unlocked ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}`}>
                        {problem.is_unlocked ? 'Unlocked' : 'Locked'}
                      </span>

                      <button
                        onClick={(e) => toggleLock(e, problem)}
                        disabled={!!actionLoading[problem.order_id]}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                          problem.is_unlocked ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                        } disabled:opacity-60`}
                      >
                        {actionLoading[problem.order_id] ? '...' : problem.is_unlocked ? 'Lock' : 'Unlock'}
                      </button>
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
