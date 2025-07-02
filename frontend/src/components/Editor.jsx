import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Send, Settings, ChevronDown, Copy, RotateCcw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';

const languageOptions = {
  Java: { extension: java, key: 'java', icon: '☕' },
  Python: { extension: python, key: 'python', icon: '🐍' },
  'C++': { extension: cpp, key: 'cpp', icon: '⚡' },
};

export default function Editor() {
  const { id } = useParams();
  const [language, setLanguage] = useState('Java');
  const [fontSize, setFontSize] = useState('16px');
  const [code, setCode] = useState('');
  const [starterCode, setStarterCode] = useState([]);
  const [testCases, setTestcases] = useState([]);
  const [activeTest, setActiveTest] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const localTc = localStorage.getItem(`problem-${id}-starterCode`);
    let parsedLocalTc = [];

    try {
      const temp = JSON.parse(localTc);
      parsedLocalTc = Array.isArray(temp)
        ? temp
        : Object.entries(temp).map(([lang, code]) => ({
            language: lang,
            code,
          }));
    } catch {
      parsedLocalTc = [];
    }

    if (parsedLocalTc.length > 0) {
      setStarterCode(parsedLocalTc);
    } else {
      const fetchStarterCode = async () => {
        const res = await fetch(`http://localhost:5000/problem/${id}/starter`);
        const data = await res.json();
        setStarterCode(data);
        localStorage.setItem(`problem-${id}-starterCode`, JSON.stringify(data));
      };
      fetchStarterCode();
    }

    const fetchTestCases = async () => {
      const res = await fetch(`http://localhost:5000/problem/${id}/Editor`);
      const data = await res.json();
      setTestcases(data);
    };
    fetchTestCases();
  }, [id]);

  useEffect(() => {
    const langObj = starterCode.find(
      (item) => item.language.toLowerCase() === language.toLowerCase()
    );
    if (langObj) setCode(langObj.code);
  }, [starterCode, language]);

  const saveToLocalStorage = (lang, val) => {
    const key = `problem-${id}-starterCode`;
    const existing = JSON.parse(localStorage.getItem(key)) || {};
    existing[lang.toLowerCase()] = val;
    localStorage.setItem(key, JSON.stringify(existing));
  };

  const formatValue = (val) =>
    typeof val === 'string'
      ? `"${val}"`
      : Array.isArray(val) || typeof val === 'object'
      ? JSON.stringify(val)
      : String(val);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <motion.div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-white"
            >
              {Object.entries(languageOptions).map(([lang, { icon }]) => (
                <option key={lang} value={lang}>
                  {icon} {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Font size */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white"
          >
            <option>14px</option>
            <option>16px</option>
            <option>18px</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
            <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-auto bg-black">
        <CodeMirror
          value={code}
          height="100%"
          theme={vscodeDark}
          style={{ fontSize }}
          extensions={[languageOptions[language].extension()]}
          onChange={(val) => {
            setCode(val);
            saveToLocalStorage(language, val);
          }}
        />
      </div>

      {/* Run/Submit */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <motion.button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              whileHover={{ scale: isRunning ? 1 : 1.02 }}
              whileTap={{ scale: isRunning ? 1 : 0.98 }}
            >
              {isRunning ? <Clock className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Running...' : 'Run'}
            </motion.button>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              Submit
            </motion.button>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Last run: 2ms</span>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {showResults && testCases.length > 0 && (
          <motion.div
            className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4">
              {/* Tabs (optional, fixed to Test Cases for now) */}
              <div className="flex gap-4 mb-4 border-b border-gray-300 dark:border-gray-700">
                <span className="pb-2 text-blue-500 dark:text-blue-400 border-b-2 border-blue-500 text-sm font-medium">
                  Test Cases
                </span>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {testCases.map((tc, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      index % 2
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-700'
                        : 'bg-red-50 dark:bg-red-900/10 border-red-300 dark:border-red-700'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex gap-2 items-center">
                        {getStatusIcon(index % 2 ? 'passed' : 'failed')}
                        <span className="text-gray-900 dark:text-white font-medium">
                          Test Case {index + 1}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">2ms</span>
                    </div>
                    <div className="text-sm space-y-1">
                      {tc.input && (
                        <div>
                          <strong>Input:</strong>{' '}
                          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {Object.entries(JSON.parse(tc.input))
                              .map(([k, v]) => `${k} = ${formatValue(v)}`)
                              .join(', ')}
                          </code>
                        </div>
                      )}
                      {tc.expected_output && (
                        <div>
                          <strong>Expected:</strong>{' '}
                          <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {tc.expected_output}
                          </code>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
