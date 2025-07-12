import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Settings,
  User,
} from 'lucide-react';
import Split from 'react-split';
import { useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer';
import Editor from '../../components/Editor';
import ProblemDescription from '../../components/ProblemDescription';
import Logo from '../../components/Logo';

const sidebarVariants = {
  open: {
    width: "50%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40
    }
  },
  closed: {
    width: "0%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 40
    }
  }
};

function Problem() {
  const navigate = useNavigate();
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [splitKey, setSplitKey] = useState(0);


  useEffect(() => {
    const handleResize = () => setSplitKey((prev) => prev + 1);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
    setTimeout(() => setSplitKey((prev) => prev + 1)); 
  }, [descriptionOpen]);
  
  
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-black font-inter">
      {/* Custom Header */}
  cd 
      <motion.div 
        className="h-14 bg-white dark:bg-black flex rounded-md m-2 items-center px-4 justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        {/* Left */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => navigate('/problems')}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Problems</span>
          </motion.button>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          <Logo />
        </div>


        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex text-white items-center px-3 py-1.5 rounded-lg">
            <Timer  />
          </div>

          {/* Toggle Description */}
          <motion.button
            onClick={() => setDescriptionOpen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={descriptionOpen ? "Hide Description" : "Show Description"}
            >
            {descriptionOpen ? <Minimize2 className="w-4 h-4 text-gray-400" /> : <Maximize2 className="w-4 h-4 text-gray-400" />}
          </motion.button>

          <motion.button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.button>

          <motion.button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </motion.button>
        
        </div>
      </motion.div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden mb-2">
        <Split key={splitKey}className="flex flex-row w-full"
        sizes={[50, 50]}
        minSize={0}
        gutterSize={12}
        gutter={() => {
          const gutter = document.createElement('div');
          gutter.className = 'custom-gutter';
          return gutter;
        }}>
          {/* Sidebar */}
          <AnimatePresence>
            {descriptionOpen && (
              <motion.div
              className="bg-white dark:bg-black overflow-hidden ml-2 rounded-lg border border-gray-700"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              >
                <ProblemDescription />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor Section */}
          <motion.div
            className="flex flex-col h-screen flex-1"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 40 }}
            >
            <div className="flex-1 min-h-0 flex flex-col">
              <Editor />
            </div>
          </motion.div>
        </Split>
      </div>
    </div>
  );
}

export default Problem;
