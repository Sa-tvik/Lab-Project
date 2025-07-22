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
  Java: { extension: java, key: 'java' },
  Python: { extension: python, key: 'python' },
  'C++': { extension: cpp, key: 'cpp' },
  C: { extension: cpp, key: 'cpp' },
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
    setActiveTab('result')
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 2000);
  };

  const customBackground = EditorView.theme({
    "&": {
      backgroundColor: "#1f2937 !important" 
    },
    ".cm-gutters": {
    backgroundColor: "#1f2937 !important",
    }
  });

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

  const nextTestCase = () => {
    if (currentTestCase < testCases.length - 1) {
      setCurrentTestCase(currentTestCase + 1);
    }
  };

  const prevTestCase = () => {
    if (currentTestCase > 0) {
      setCurrentTestCase(currentTestCase - 1);
    }
  };

  const goToTestCase = (index) => {
    setCurrentTestCase(index);
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
              {Object.entries(languageOptions).map(([lang]) => (
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
      <Split className="flex-1 min-h-0 flex flex-col" 
      direction="vertical" 
      sizes={[50, 50]} 
      minSize={100}
      gutterSize={10}
      gutter={()=>{
        const gutter = document.createElement('div');
          gutter.className = 'custom-gutter-vertical'
        return gutter;
      }}
      >
        {/* CODE EDITOR */}
          <div className=" h-full min-h-0 overflow-hidden flex flex-col hide-scrollbar bg-gray-800">
            <div className='flex-1 min-h-0 overflow-hidden'>
            <CodeMirror
              value={code}
              height="100%"
              theme={vscodeDark}
              style={{ fontSize, height:"100%" }}
              extensions={[languageOptions[language].extension(),
                customBackground
              ]}
              onChange={(val) => {
                setCode(val);
                saveToLocalStorage(language, val);
              }}
            />
            </div>
          </div>
          
        {/* TEST CASES / RESULTS */}
        <div className="relative h-full rounded-lg bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
          <div className='flex justify-between mt-2 mb-2'>
            {/* Tabs */}
            <div className="flex gap-4 px-4 ">
              {['testcase', 'result'].map((tab) => { 
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-3 px-3 text-sm font-medium z-10 transition-colors duration-200 ${
                      isActive
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
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 h-11 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
                whileHover={{ scale: isRunning ? 1 : 1.02 }}
                whileTap={{ scale: isRunning ? 1 : 0.98 }}
              >
                {isRunning ? <Clock className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                {isRunning ? 'Running...' : 'Run'}
              </motion.button>
              <motion.button
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
                      className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                        index === currentTestCase
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Test Case {currentTestCase + 1} of {testCases.length}
                </div>
              </div>
              
              {activeTab === 'result' && showResults && (
                <div className="flex items-center gap-2">
                  {(() => {
                    const isPassed = currentTestCase % 2;
                    const status = isPassed ? 'passed' : 'failed';
                    return (
                      <>
                        {getStatusIcon(status)}
                        <span className={`text-sm font-medium ${
                          isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-auto"
              >
                {testCases.length > 0 && (
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
                          const isPassed = currentTestCase % 2;
                          const status = isPassed ? 'passed' : 'failed';
                          
                          return (
                            <div className="bg-white dark:bg-gray-900 rounded-lg p-5 mb-5 border border-gray-200 dark:border-gray-700 font-mono text-sm max-h-[300px] overflow-auto">
                              <div className="space-y-3">
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Input:</span>
                                  <span className="ml-2">
                                    {Object.entries(JSON.parse(testCases[currentTestCase].input))
                                      .map(([k, v]) => `${k} = ${formatValue(v)}`)
                                      .join(', ')}
                                  </span>
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Expected:</span>
                                  <span className="ml-2">{testCases[currentTestCase].expected_output}</span>
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Actual:</span>
                                  <span className={`ml-2 ${
                                    isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {isPassed ? testCases[currentTestCase].expected_output : '-1'}
                                  </span>
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