import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import problems from '../utils/problem';

const languageOptions = {
  Java: { extension: java, key: 'java' },
  Python: { extension: python, key: 'python' },
  'C++': { extension: cpp, key: 'cpp' },
  C: { extension: cpp, key: 'c' }, 
};


export default function Editor() {
  const { id } = useParams();
  const problem = problems.find((p) => p.id === parseInt(id));
  const [language, setLanguage] = useState('Java');
  const [code, setCode] = useState('');
  const [activeTest, setActiveTest] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`${problem.id}-${language}`)
    if (saved){
      setCode(JSON.parse(saved))
    } else if (problem?.starterCode) {
      const langKey = languageOptions[language].key;
      setCode(problem.starterCode[langKey] || '// No starter code for this language');
    }
  }, [problem, language]);

  if (!problem) return <div className="text-white p-4">Problem not found</div>;

  // Helper to format values with quotes for strings, JSON for arrays/objects, else string
  const formatValueWithQuotes = (val) => {
    if (typeof val === 'string') {
      return `"${val}"`;
    } else if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
      return JSON.stringify(val);
    } else {
      return String(val);
    }
  };


  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] overflow-y-auto">
      <div className="flex items-center gap-2 p-3 dark:bg-gray-800">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="dark:bg-gray-800 text-gray-900 dark:text-white px-2 text-sm outline-none focus:outline-none focus:ring-0 border-none"
        >
          {Object.keys(languageOptions).map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <Split className="h-[calc(100vh-94px)]" direction="vertical" sizes={[50, 50]} minSize={60}>
        {/* CODE EDITOR */}
        <div className="w-full overflow-auto">
          <CodeMirror
            value={code}
            theme={vscodeDark}
            extensions={[languageOptions[language].extension()]}
            onChange={(val) => {
              setCode(val);
              localStorage.setItem(`${problem.id}-${language}`, JSON.stringify(val));
            }}
            style={{ fontSize: 16 }}
          />
        </div>

        {/* TEST CASES */}
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-mono leading-5 text-white">Testcases</div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          {/* Buttons for test case selection */}
          <div className="flex flex-wrap gap-3 mt-4 mb-6">
            {problem.testCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTest(index)}
                className={`font-mono text-sm rounded-md px-4 py-2 transition-colors ${
                  activeTest === index
                    ? 'bg-white text-black dark:bg-white dark:text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Testcase {index + 1}
              </button>
            ))}
          </div>

          {/* Display the selected test case input/output */}
          {problem.testCases[activeTest] && (
            <div className="font-normal text-white space-y-4 mb-10">
              <div>
                <p className="text-sm font-mono mb-2">Input:</p>
                <div className="flex flex-col gap-4">
                  {Object.entries(problem.testCases[activeTest].input).map(([key, val]) => (
                    <div
                      key={key}
                      className="bg-gray-800 rounded-lg p-3 min-w-[120px] w-full break-words"
                    >
                      <pre className="font-mono text-sm text-white whitespace-pre-wrap">
                        {key} = {formatValueWithQuotes(val)}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-mono mt-4">Expected Output:</p>
                <div className="font-mono w-full rounded-lg px-3 py-2 bg-gray-800 whitespace-pre-wrap break-all text-yellow-300">
                  {problem.testCases[activeTest].output}
                </div>
              </div>
            </div>
          )}

        </div>
      </Split>
    </div>
  );
}
