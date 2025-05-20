import React from 'react';
import Header from '../components/Header';
import Editor from '../components/Editor';
import Split from 'react-split'
import "../index.css"
import ProblemDescription from '../components/ProblemDescription';

function Problem() {
  return (
    <div className="h-screen bg-white dark:bg-[#1e1e1e] font-inter">
      <Header />
          <Split className='split' minSize={0}>
            <div className="h-full md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="h-full overflow-y-auto">
                <ProblemDescription />
              </div>
            </div>
            <div className="flex-1 h-full">
              <Editor />
            </div>
          </Split>
      
    </div>
  );
}

export default Problem;