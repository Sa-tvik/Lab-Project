import React from 'react';
import { useParams } from 'react-router-dom';
import problems from '../utils/problem';


export default function ProblemDescription() {
  const { id } = useParams();
  const problem = problems.find(p => p.id === parseInt(id));

  function languageMap(){
    startercode
  }
  return (
    <div className="h-full bg-white dark:bg-[#1e1e1e] overflow-y-auto">
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white">
          {problem.title}
        </h1>

        <div className="mt-6 prose dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300">{problem.description}</p>

          {problem.examples?.map((example, idx) => (
            <div key={idx} className="mt-6 dark:text-white">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Example {idx + 1}:</h3>
              <pre className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                <strong>Input:</strong> {example.input}
                {"\n"}
                <strong>Output:</strong> {example.output}
              </pre>
            </div>
          ))}

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Constraints:</h3>
            <ul className="mt-2 space-y-1 text-gray-600 dark:text-gray-300 list-disc list-inside">
              {problem.constraints?.map((c, i) => (
                <li key={i} className="font-mono text-sm">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}