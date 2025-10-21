// src/components/TestPanel.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, XCircle, Send, Play } from "lucide-react";
import submissionStatus from "../utils/SubmissionStatus";

export default function TestPanel({
    testCases = [],
    currentTestCase,
    setCurrentTestCase,
    activeTab,
    setActiveTab,
    showResults,
    submissionResults = [],
    submissionError,
    handleSubmit,
    isRunning,
    formatValue,
    getStatusIcon,
}) {
    const goToTestCase = (index) => setCurrentTestCase(index);
    const nextTestCase = () => setCurrentTestCase((p) => Math.min(p + 1, testCases.length - 1));
    const prevTestCase = () => setCurrentTestCase((p) => Math.max(p - 1, 0));

    return (
        <div className="relative h-[calc(100vh-150px)] rounded-lg bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mt-2 mb-2">
                {/* Tabs */}
                <div className="flex gap-4 px-4 ">
                    {["testcase", "result"].map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative py-3 px-3 text-sm font-medium z-10 transition-colors duration-200 ${
                            isActive ? "dark:text-white text-black" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}>
                            {tab === "testcase" ? "Test Cases" : "Test Results"}
                            {isActive && (
                            <motion.div
                                layoutId="tab-test"
                                className="absolute inset-0 dark:bg-gray-900 rounded-lg z-[-1] shadow-md"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}/>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Run/Submit buttons */}
            <div className="flex gap-3 justify-end pr-8">
                <motion.button
                    onClick={handleSubmit}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 h-11 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition disabled:opacity-50"
                    whileHover={{ scale: isRunning ? 1 : 1.02 }}
                    whileTap={{ scale: isRunning ? 1 : 0.98 }}
                >
                    {isRunning ? <Clock className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
                    {isRunning ? "Running..." : "Run"}
                </motion.button>

                <motion.button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-4 h-11 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Send className="w-3 h-3" />
                    Submit
                </motion.button>
            </div>
        </div>

          {/* Test Case Navigation */}
        {testCases.length > 0 && (
            <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {testCases.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestCase(index)}
                            className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                                index === currentTestCase ? "bg-blue-500 text-white shadow-lg" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Test Case {currentTestCase + 1} of {testCases.length}
                    </div>
                </div>
            </div>

            {activeTab === "result" && showResults && submissionResults[currentTestCase] && (
                <div className="flex items-center gap-2">
                {(() => {
                    const result = submissionResults[currentTestCase];
                    const status = result.passed ? "passed" : "failed";
                    return (
                    <>
                        {getStatusIcon(status)}
                        <span
                            className={`text-sm font-medium ${
                                result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        {/* <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 ml-3">
                            <Clock className="w-3 h-3" />
                            <span>{result.execution_time ? `${result.execution_time}ms` : "—"}</span>
                        </div> */}
                    </>
                    );
                })()}
                </div>
            )}
        </div>
        )}

          {/* Single Test Case Display */}
          <div className="flex-1 min-h-0 p-6 pt-3 overflow-auto hide-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${currentTestCase}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-auto"
              >
                {testCases.length > 0 && testCases[currentTestCase] && (
                  <div className="h-auto">
                    {activeTab === "testcase" && (
                      <div className="min-h-0">
                        <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 font-mono text-sm max-h-[300px] overflow-auto">
                          <div className="space-y-3">
                            <div className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Input:</span>
                              <span className="ml-2 bg-gray-700 px-2 py-1 rounded-sm">
                                {Object.entries(JSON.parse(testCases[currentTestCase].input))
                                  .map(([k, v]) => `${k} = ${formatValue(v)}`)
                                  .join(", ")}
                              </span>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Output:</span>
                              <span className="ml-2 bg-gray-700 px-2 py-1 rounded-sm">
                                {testCases[currentTestCase].expected_output}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "result" && showResults && (submissionError != 3 ? (
                      <div className="bg-red-50 dark:bg-red-900 rounded-lg p-5 mb-5 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 font-mono text-sm">
                        <p className="font-semibold">Error:</p>
                        <p>{submissionStatus[submissionError-1]["description"]}</p>
                      </div>
                    ) : (submissionResults[currentTestCase] && (
                      <div className="bg-white dark:bg-gray-900 rounded-lg p-5 mb-5 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-mono text-sm max-h-[50vh] overflow-auto">
                        <div className="space-y-3">
                          <div>
                            <span className="font-semibold">Input:</span>
                            <span className="ml-2 bg-gray-700 px-2 py-1 rounded-sm">
                              {Object.entries(JSON.parse(testCases[currentTestCase].input))
                                .map(([k, v]) => `${k} = ${formatValue(v)}`)
                                .join(", ")}
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold">Expected output:</span>
                            <span> {submissionResults[currentTestCase].expected_output}</span>
                          </div>
                          <div>
                            <span className="font-semibold">Actual output:</span>
                            <span className={submissionResults[currentTestCase].passed ? "text-green-600" : "text-red-600"}> {submissionResults[currentTestCase].actual_output}</span>
                          </div>
                        </div>
                      </div>
                    )))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
    );
}
