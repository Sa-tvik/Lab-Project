import React from 'react';
import Header from '../components/Header';
import Editor from '../components/Editor';
import ProblemDescription from '../components/ProblemDescription';

function Problem() {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#1e1e1e] font-inter">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="h-[40vh] md:h-auto md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
          <ProblemDescription />
        </div>
        <div className="flex-1 h-[60vh] md:h-auto">
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default Problem;