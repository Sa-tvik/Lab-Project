import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
  Settings,
  Timer as TimerIcon,
  User,
  Sun,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Timer from './Timer';
import { useTheme } from '../context/ThemeContext';

export default function Header({
  onSettingsClick,
  onProfileClick,
  onToggleDescription,
  descriptionOpen,
}) {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();

  return (
    <motion.div
      className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {showRunSubmit && (
          <motion.button
            onClick={() => navigate('/problemList')}
            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Problems</span>
          </motion.button>
        )}

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
        <Logo />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {showRunSubmit && (
          <>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <TimerIcon className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-mono text-gray-900 dark:text-white">
                <Timer />
              </span>
            </div>

            {/* Optional: Show/Hide Description Button */}
            {onToggleDescription && (
              <motion.button
                onClick={onToggleDescription}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={descriptionOpen ? 'Hide Description' : 'Show Description'}
              >
                {descriptionOpen ? (
                  <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </motion.button>
            )}
          </>
        )}

        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </motion.button>

        <motion.button
          onClick={onProfileClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </motion.button>

        <motion.button
          onClick={onSettingsClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </motion.button>
      </div>
    </motion.div>
  );
}
