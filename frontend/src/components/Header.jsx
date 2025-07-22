import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Maximize2,
  Minimize2,
  Settings,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import ProfileMenu from './ProfileMenu';

export default function Header({
  onSettingsClick,
  onProfileClick,
  onToggleDescription,
  descriptionOpen,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const showRunSubmit = location.pathname.startsWith('/problem/');

  return (
    <motion.div
      className="h-14 bg-white dark:bg-black flex items-center px-4 justify-between"
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

        <motion
          onClick={onProfileClick}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ProfileMenu/>
        </motion>

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
