import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Play, Terminal, Zap, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-y-scroll hide-scrollbar">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo/>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link 
            to="/login"
            className="px-6 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Login
          </Link>
          <Link 
            to="/signup"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            Signup
          </Link>
        </motion.div>
      </header>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className='relative z-10 flex justify-between items-center max-w-7xl px-8 py-16 mx-auto'>
        {/* Left Side  */}
        <div className='flex-1 max-w-2xl'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Your Lab,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Code.
              </span>
              <br />
              <span className="text-white">Online.</span>
            </h1>
          </motion.div>
          <motion.p className="text-xl text-gray-300 mb-8 leading-relaxed leading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Practice lab experiments, write code, and get evaluated — all in one place. Master DSA, DAA, AIML, and more with our interactive coding environment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link 
              to="/signup"
              className=" group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
              <Play className="w-5 h-5" />
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
          {/* Feature Pills */}
          <motion.div 
            className="flex items-center gap-4 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Live Code Editor</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Instant Evaluation</span>
            </div>
          </motion.div>
        </div>

        {/* Right side */}
        {/* Right Side - Illustration */}
        <motion.div 
          className="flex-1 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative">
            {/* Code Editor Mockup */}
            <div className="w-[500px] h-[350px] bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm text-gray-400">main.py</span>
                <div className="w-16"></div>
              </div>
              
              {/* Code Content */}
              <div className="p-4 font-mono text-sm">
                <div className="text-purple-400">def <span className="text-blue-400">binary_search</span>(<span className="text-orange-400">arr, target</span>):</div>
                <div className="text-gray-500 ml-4"># Lab Exercise: Implement binary search</div>
                <div className="text-gray-300 ml-4">left, right = <span className="text-green-400">0</span>, <span className="text-blue-400">len</span>(arr) - <span className="text-green-400">1</span></div>
                <div className="text-gray-300 ml-4"></div>
                <div className="text-purple-400 ml-4">while <span className="text-gray-300">left &lt;= right:</span></div>
                <div className="text-gray-300 ml-8">mid = (left + right) // <span className="text-green-400">2</span></div>
                <div className="text-purple-400 ml-8">if <span className="text-gray-300">arr[mid] == target:</span></div>
                <div className="text-purple-400 ml-12">return <span className="text-gray-300">mid</span></div>
                <div className="text-purple-400 ml-8">elif <span className="text-gray-300">arr[mid] &lt; target:</span></div>
                <div className="text-gray-300 ml-12">left = mid + <span className="text-green-400">1</span></div>
                <div className="text-purple-400 ml-8">else:</div>
                <div className="text-gray-300 ml-12">right = mid - <span className="text-green-400">1</span></div>
                <div className="text-purple-400 ml-4">return <span className="text-red-400">-1</span></div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">✓</span>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Terminal className="w-6 h-6 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}