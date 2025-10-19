// src/pages/student/Editor.jsx
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
import TestPanel from './TestPanel';

const languageOptions = {
  Java: { extension: java, key: 'java', judge0_id: 62 },
  Python: { extension: python, key: 'python', judge0_id: 71 },
  cpp: { extension: cpp, key: 'cpp', judge0_id: 54 },
  C: { extension: cpp, key: 'c', judge0_id: 50 },
};

export default function Editor() {
  const { id } = useParams();
  const [language, setLanguage] = useState('Python');
  const [fontSize, setFontSize] = useState('16px');
  const [code, setCode] = useState('');
  const [starterCode, setStarterCode] = useState([]);
  const [testCases, setTestcases] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('testcase');
  const [submissionError, setSubmissionError] = useState(3);
  const [currentTestCase, setCurrentTestCase] = useState(0);
  const [submissionResults, setSubmissionResults] = useState([]);

  const backendUrl = import.meta.env.VITE_API_URL;
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
          const res = await fetch(`${backendUrl}/problem/${id}/starter`);
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
        const res = await fetch(`${backendUrl}/problem/${id}/Editor`);
        const data = await res.json();
        setTestcases(data);
      } catch (error) {
        console.error("Failed to fetch test cases:", error);
      }
    };
    fetchTestCases();
  }, [id]);

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
      const res = await fetch(`${backendUrl}/problem/${id}/submission`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      console.log(result); 
      
      if (result.results) {
      // Sort by testcase_index to match order
        const sortedResults = result.results.sort((a, b) => a.testcase_index - b.testcase_index);
        console.log(sortedResults);
        if(sortedResults[0]["status_id"]!=3){
          setSubmissionError(sortedResults[0]["status_id"])
        }
        setSubmissionResults(sortedResults);
      }

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
        <TestPanel
          testCases={testCases}
          currentTestCase={currentTestCase}
          setCurrentTestCase={setCurrentTestCase}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showResults={showResults}
          submissionResults={submissionResults}
          submissionError={submissionError}
          handleSubmit={handleSubmit}
          isRunning={isRunning}
          formatValue={formatValue}
          getStatusIcon={getStatusIcon}
        />
      </Split>
    </motion.div>
  );
}
