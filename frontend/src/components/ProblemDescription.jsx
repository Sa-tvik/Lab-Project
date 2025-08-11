import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProblemContext } from '../context/ProblemContext';
import { ParseProblem } from '../utils/ParseProblem';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code2,
  AlertCircle,
  Tag,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const tabVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function ProblemDescription() {
  const { id } = useParams();
  const { problems, setProblems } = useProblemContext();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const local = localStorage.getItem(`problem-${id}`);
    const parsedLocal = local ? JSON.parse(local) : null;

    if (!parsedLocal) {
      const rawProblem = problems.find((p) => p.order_id === Number(id));
      if (rawProblem) {
        setProblem(ParseProblem(rawProblem));
        localStorage.setItem(`problem-${id}`, JSON.stringify(rawProblem));
        setLoading(false);
      } else {
        const fetchProblem = async () => {
          try {
            const res = await fetch(`${backendUrl}/problems`);
            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("Invalid data");
            setProblems(data);
            const fetchedProblem = data.find((p) => p.order_id === Number(id));
            if (!fetchedProblem || fetchedProblem.error) throw new Error("Invalid data");
            setProblem(ParseProblem(fetchedProblem));
            localStorage.setItem(`problem-${id}`, JSON.stringify(fetchedProblem));
          } catch (err) {
            console.error("Error fetching problem:", err);
            setError(true);
          } finally {
            setLoading(false);
          }
        };
        fetchProblem();
      }
    } else {
      try {
        setProblem(ParseProblem(parsedLocal));
      } catch (err) {
        console.error("Error parsing local problem:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
  }, [id, problems, setProblems]);

  if (loading) return <div className="p-4 text-gray-400">Loading...</div>;
  if (error || !problem) return <div className="p-4 text-red-500">Problem not found.</div>;

  const renderInputInline = (input) => {
    if (typeof input === 'object' && input !== null) {
      const parts = Object.entries(input).map(([key, value]) => {
        const formatValue = (val) => Array.isArray(val) ? `[${val.map(formatValue).join(',')}]` : String(val);
        return `${key} = ${formatValue(value)}`;
      });
      return parts.join(" ");
    }
    return String(input);
  };

  const tabs = [
    { id: 'description', label: 'Description', icon: BookOpen },
    { id: 'examples', label: 'Examples', icon: Code2 },
    { id: 'constraints', label: 'Constraints', icon: AlertCircle }
  ];

  return (
    <motion.div className="min-h-screen h-full bg-white dark:bg-gray-800 overflow-y-auto" variants={containerVariants} initial="hidden" animate="visible">
      <div className="p-6 space-y-6 pb-20">
        <motion.div variants={itemVariants}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {problem.order_id}. {problem.title}
                </h1>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600">
                  {problem.difficulty || 'Unrated'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-gray-500" />
            {problem.tags.map((tag) => (
              <motion.span
                key={tag}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div>
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-1 py-3 px-3 font-medium text-sm transition-all duration-200 z-10 ${
                      isActive
                        ? 'dark:text-white'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="tab-bg"
                        className="absolute inset-0 rounded-lg bg-gray-900 z-[-1] shadow-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={tabVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            {activeTab === 'description' && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {problem.description}
                </p>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-6">
                {problem.examples?.map((example, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      Example {index + 1}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-white">Input:</span>
                        <pre className="mt-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto">
                          {renderInputInline(example.input)}
                        </pre>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-white">Output:</span>
                        <pre className="mt-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg font-mono text-sm text-gray-900 dark:text-white overflow-x-auto">
                          {Array.isArray(example.output) ? `[${example.output.join(", ")}]` : String(example.output)}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'constraints' && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  Constraints
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  {problem.constraints?.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-white" />
                      <code className="text-white bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">{c}</code>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}