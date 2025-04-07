import React from 'react';
import { X, Monitor, Globe, Bell, Lock, Keyboard } from 'lucide-react';

export default function SettingsModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Editor</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Font Size</span>
                  <select className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
                    <option>12px</option>
                    <option>14px</option>
                    <option>16px</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Tab Size</span>
                  <select className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
                    <option>2</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600 dark:text-gray-300">Email Notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600 dark:text-gray-300">Browser Notifications</span>
                </label>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600 dark:text-gray-300">Show Profile Publicly</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600 dark:text-gray-300">Share Progress</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}