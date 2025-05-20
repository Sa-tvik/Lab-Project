import React from 'react';
import { useParams } from 'react-router-dom';
import Split from 'react-split'
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
// import { java } from '@codemirror/lang-java';
// import { cpp } from '@codemirror/lang-cpp';
// import { python } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import problems from '../utils/problem';

export default function Editor() {
  const { id } = useParams();
  const problem = problems.find(p => p.id === parseInt(id));
  
  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] overflow-y-auto">
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <select className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-md px-2 py-1.5 border border-gray-200 dark:border-gray-600">
          <option>Java</option>
          <option>Python</option>
          <option>JavaScript</option>
        </select>
      </div>
      <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[50,50]} minSize={60}>
        <div className="w-full overflow-auto">
          <CodeMirror
            value='const a = 1;'
            theme={vscodeDark}
            extensions = {[javascript()]}
            style={{fontSize:16}}
          />
        </div>
        <div className='w-full px-5 overflow-auto'>
          {/* TESTCASE HEADING */}
          <div className='flex h-10 items-center space-x-6'>
            <div className='relative flex h-full flex-col justify-center cursor-pointer'>
              <div className='text-sm font-mono leading-5 text-white'>Testcases</div>
              <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white'/>
            </div>
          </div>

          {/* TESTCASES */}
          <div className='flex'>

            {/* case 1 */}
            <div className='mr-2 items-start mt-2 text-white'>
              <div className='flex flex-wrap items-center gap-y-4'>
                <div className='font-mono items-center transition-all focus:outline-none inline-flex bg-gray-800 hover:bg-gray-700 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>
                  Case 1
                </div>
              </div>
            </div>

            {/* case 2 */}
            <div className='mr-2 items-start mt-2 text-white'>
              <div className='flex flex-wrap items-center gap-y-4'>
                <div className='font-mono items-center transition-all focus:outline-none inline-flex bg-gray-800 hover:bg-gray-700 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>
                  Case 2
                </div>
              </div>
            </div>

            {/* case 3 */}
            <div className='mr-2 items-start mt-2 text-white'>
              <div className='flex flex-wrap items-center gap-y-4'>
                <div className='font-mono items-center transition-all focus:outline-none inline-flex bg-gray-800 hover:bg-gray-700 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap'>
                  Case 3
                </div>
              </div>
            </div>
          </div>
          <div className='font-normal'>
            <p className='text-sm font-mono mt-4 text-white'>nums = </p>
            <div className=' font-mono w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-800 border-transparent text-white mt-2'>
              [2,7,11,15]
            </div>
            <p className=' font-mono text-sm mt-4 text-white'>target =</p>
            <div className='font-mono w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-800 border-transparent text-white mt-2'>
              9
            </div>
          </div>
        </div>
      </Split>
    </div>
  );
}