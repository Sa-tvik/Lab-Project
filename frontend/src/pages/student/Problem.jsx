import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Settings,
  Timer as TimerIcon,
  User,
  Sun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
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
  const { toggleTheme } = useTheme();
  const [descriptionOpen, setDescriptionOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#1e1e1e] font-inter">
      {/* Full Custom Header (NOT a separate component) */}
      <motion.div 
        className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => navigate('/problemList')}
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
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <TimerIcon className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-mono text-gray-900 dark:text-white">45:30</span>
          </div>

          {/* Toggle Description */}
          <motion.button
            onClick={() => setDescriptionOpen(prev => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={descriptionOpen ? "Hide Description" : "Show Description"}
          >
            {descriptionOpen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </motion.button>

          {/* Theme */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
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
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {descriptionOpen && (
            <motion.div
              className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                  <h2 className="font-semibold text-gray-900 dark:text-white">Problem Description</h2>
                  <motion.button
                    onClick={() => setDescriptionOpen(false)}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-hidden">
                  <ProblemDescription />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Section */}
        <motion.div
          className="flex-1 flex flex-col"
          layout
          transition={{ type: "spring", stiffness: 300, damping: 40 }}
        >
          {/* Show Description Button */}
          {!descriptionOpen && (
            <motion.div 
              className="p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.button
                onClick={() => setDescriptionOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronRight className="w-4 h-4" />
                <span className="text-sm font-medium">Show Description</span>
              </motion.button>
            </motion.div>
          )}
          
          <div className="flex-1">
            <Editor />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Problem;
