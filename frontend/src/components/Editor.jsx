import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Send,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import Split from 'react-split';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { EditorView } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';

const languageOptions = {
  Java: { extension: java, key: 'java', judge0_id: 62 },
  Python: { extension: python, key: 'python', judge0_id: 71 },
  cpp: { extension: cpp, key: 'cpp', judge0_id: 54 },
  C: { extension: cpp, key: 'c', judge0_id: 50 },
};

export default function Editor() {
  const { id } = useParams();
  const [language, setLanguage] = useState('Java');
  const [fontSize, setFontSize] = useState('16px');
  const [code, setCode] = useState('');
  const [starterCode, setStarterCode] = useState([]);
  const [testCases, setTestcases] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('testcase');
  const [currentTestCase, setCurrentTestCase] = useState(0);

  // Effect to fetch initial problem data (starter code and test cases) from localStorage or API
  useEffect(() => {
    const localCode = localStorage.getItem(`problem-${id}-starterCode`);
    if (localCode) {
      try {
        setStarterCode(JSON.parse(localCode));
      } catch (error) {
        console.error("Failed to parse starter code from localStorage:", error);
      }
    } else {
      const fetchStarterCode = async () => {
        try {
          const res = await fetch(`${process.env.PUBLIC_BACKEND_URL}/problem/${id}/starter`);
          const data = await res.json();
          setStarterCode(data);
        } catch (error) {
          console.error("Failed to fetch starter code from API:", error);
        }
      };
      fetchStarterCode();
    }

    const fetchTestCases = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/problem/${id}/Editor`);
        const data = await res.json();
        setTestcases(data);
      } catch (error) {
        console.error("Failed to fetch test cases:", error);
      }
    };
    fetchTestCases();
  }, [id]);

  // **FIXED**: Effect to save the entire starterCode state to localStorage whenever it changes.
  // This ensures that user edits are always persisted.
  useEffect(() => {
    if (starterCode.length > 0) {
      localStorage.setItem(`problem-${id}-starterCode`, JSON.stringify(starterCode));
    }
  }, [starterCode, id]);


  // Effect to update the code in the editor when the language or starter code array changes
  useEffect(() => {
    const langObj = starterCode.find(
      (item) => item.language.toLowerCase() === language.toLowerCase()
    );
    if (langObj) {
      setCode(langObj.code);
    } else {
      setCode('');
    }
  }, [starterCode, language]);


  // Helper to format values for display
  const formatValue = (val) =>
    typeof val === 'string'
      ? `"${val}"`
      : Array.isArray(val) || typeof val === 'object'
      ? JSON.stringify(val)
      : String(val);

  // Custom theme for CodeMirror to set the background color
  const customBackground = EditorView.theme({
    "&": {
      backgroundColor: "#1f2937 !important"
    },
    ".cm-gutters": {
      backgroundColor: "#1f2937 !important",
    }
  });

  // Returns an icon based on the test case status
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

  // Handlers for test case navigation
  const nextTestCase = () => setCurrentTestCase(p => Math.min(p + 1, testCases.length - 1));
  const prevTestCase = () => setCurrentTestCase(p => Math.max(p - 1, 0));
  const goToTestCase = (index) => setCurrentTestCase(index);

  // Handler for running/submitting the code
  const handleSubmit = async () => {
    setIsRunning(true);
    setActiveTab('result');

    const payload = {
      source_code: code,
      language_id: languageOptions[language].judge0_id
    };

    try {
      const res = await fetch(`${process.env.PUBLIC_BACKEND_URL}/problem/${id}/submission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      console.log(result); // Process the result here
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsRunning(false);
      setShowResults(true);
    }
  };

  return (
    <motion.div className="flex flex-col flex-1 min-h-0 h-full w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 rounded-t-lg border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-900 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-white focus:outline-none"
            >
              {Object.keys(languageOptions).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Font size */}
          <div className="relative">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-900 rounded-lg px-3 py-2 pr-8 text-sm text-gray-900 dark:text-white focus:outline-none"
            >
              <option>14px</option>
              <option>16px</option>
              <option>18px</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Editor + Test Panels (Split) */}
      <Split
        className="flex-1 min-h-0 flex flex-col"
        direction="vertical"
        sizes={[50, 50]}
        minSize={100}
        gutterSize={10}
        gutter={() => {
          const gutter = document.createElement('div');
          gutter.className = 'custom-gutter-vertical';
          return gutter;
        }}
      >
        {/* CODE EDITOR */}
        <div className="h-full min-h-0 overflow-hidden flex flex-col hide-scrollbar bg-gray-800">
          <div className='flex-1 min-h-0 overflow-hidden'>
            <CodeMirror
              value={code}
              height="100%"
              theme={vscodeDark}
              style={{ fontSize, height: "100%" }}
              extensions={[
                languageOptions[language].extension(),
                customBackground
              ]}
              // **FIXED**: This now updates both the local 'code' state for the UI
              // and the main 'starterCode' state array, which is the source of truth.
              onChange={(val) => {
                setCode(val);
                setStarterCode(currentCode =>
                  currentCode.map(item =>
                    item.language.toLowerCase() === language.toLowerCase()
                      ? { ...item, code: val }
                      : item
                  )
                );
              }}
            />
          </div>
        </div>

        {/* TEST CASES / RESULTS */}
        <div className="relative h-full rounded-lg bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
          <div className='flex justify-between items-center mt-2 mb-2'>
            {/* Tabs */}
            <div className="flex gap-4 px-4 ">
              {['testcase', 'result'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-3 px-3 text-sm font-medium z-10 transition-colors duration-200 ${isActive
                        ? 'dark:text-white text-black'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                  >
                    {tab === 'testcase' ? 'Test Cases' : 'Test Results'}

                    {isActive && (
                      <motion.div
                        layoutId="tab-test"
                        className="absolute inset-0 dark:bg-gray-900 rounded-lg z-[-1] shadow-md"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Run/Submit buttons */}
            <div className="flex gap-3 justify-end pr-8">
              <motion.button
                onClick={handleSubmit}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 h-11 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                whileHover={{ scale: isRunning ? 1 : 1.02 }}
                whileTap={{ scale: isRunning ? 1 : 0.98 }}
              >
                {isRunning ? <Clock className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                {isRunning ? 'Running...' : 'Run'}
              </motion.button>
              <motion.button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 h-11 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-3 h-3" />
                Submit
              </motion.button>
            </div>
          </div>

          {/* Test Case Navigation */}
          {testCases.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {testCases.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestCase(index)}
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${index === currentTestCase
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                      {index + 1}
                    </button>
                    
                  ))}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Test Case {currentTestCase + 1} of {testCases.length}
                  </div>
                </div>
              </div>

              {activeTab === 'result' && showResults && (
                <div className="flex items-center gap-2">
                  {(() => {
                    const isPassed = currentTestCase % 2; // Placeholder logic
                    const status = isPassed ? 'passed' : 'failed';
                    return (
                      <>
                        {getStatusIcon(status)}
                        <span className={`text-sm font-medium ${isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 ml-3">
                          <Clock className="w-3 h-3" />
                          <span>2ms</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Single Test Case Display */}
          <div className="flex-1 min-h-0 p-6 pt-3 overflow-auto">
            <AnimatePresence mode='wait'>
              <motion.div
                key={`${activeTab}-${currentTestCase}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-auto"
              >
                {testCases.length > 0 && testCases[currentTestCase] && (
                  <div className="h-auto">
                    {activeTab === 'testcase' && (
                      <div className="min-h-0">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 font-mono text-sm max-h-[300px] overflow-auto">
                          <div className="space-y-3">
                            <div className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Input:</span>
                              <span className="ml-2 bg-gray-700 px-2 py-1 rounded-sm">
                                {Object.entries(JSON.parse(testCases[currentTestCase].input))
                                  .map(([k, v]) => `${k} = ${formatValue(v)}`)
                                  .join(', ')}
                              </span>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Output:</span>
                              <span className="ml-2 bg-gray-700 px-2 py-1 rounded-sm">{testCases[currentTestCase].expected_output}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'result' && showResults && (
                      <div className="h-auto">
                        {(() => {
                          const isPassed = currentTestCase % 2; // Placeholder logic
                          return (
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-5 mb-5 border border-gray-200 dark:border-gray-700 font-mono text-sm max-h-[300px] overflow-auto">
                              <div className="space-y-3">
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Input:</span>
                                  <pre className="ml-2 inline-block whitespace-pre-wrap">
                                    {Object.entries(JSON.parse(testCases[currentTestCase].input))
                                      .map(([k, v]) => `${k} = ${formatValue(v)}`)
                                      .join('\n')}
                                  </pre>
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Expected:</span>
                                  <pre className="ml-2 inline-block whitespace-pre-wrap">{testCases[currentTestCase].expected_output}</pre>
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Actual:</span>
                                  <pre className={`ml-2 inline-block whitespace-pre-wrap ${isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                    }`}>
                                    {isPassed ? testCases[currentTestCase].expected_output : '-1'}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Split>
    </motion.div>
  );
}
