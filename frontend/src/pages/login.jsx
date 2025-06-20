import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Code2, User, School, Mail, Lock, Eye, EyeOff, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Student")
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const trimmedEmail = email.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5000/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email: trimmedEmail, password}),
            });

            const data = await res.json();
            if (res.ok) {
                setTimeout(() => {
                    navigate("/problemlist"); 
                }); 
            } else {
                alert(data?.error || "Something went wrong");
            }
        } catch (err) {
            alert("Server error: " + err.message);

        }
    };
    
    return (
    <>
        <div className='min-h-screen bg-gray-900 text-white overflow-hidden'>
        
            {/* Background Elements */}

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            {/*  Form */}
            <div className='relative z-10 min-h-screen flex items-center justify-center px-8'>
                <div className='max-w-md w-full my-10'>
                    <motion.div
                    className='bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-700/50'
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <Link 
                        to='/'
                        className='absolute top-7 right-5'
                        >
                            <X className='w-5 h-5'/>
                        </Link>
                        <div className='text-center mb-8'>
                            <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <div className="relative inline-block">
                                    <Code2 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                </div>
                            </motion.div>
                            <h1 className='text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
                                Welcome Back
                            </h1>
                            <p className="text-gray-400 mt-2">Sign in to your Lab IDE account</p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div>
                                {/* Role Section */}
                                <div>
                                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                                        Select Role
                                    </label>
                                    <div className='grid grid-cols-2 gap-3'>
                                        <motion.button 
                                        type="button"
                                        onChange={() => setRole("Student")}
                                        className={`p3 rounded-lg border-2 transition-all duration-200' ${
                                            role === 'Student'
                                                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                                                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                                            }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        >
                                            <User className="w-5 h-5 mx-auto mb-1" />
                                            <span className="text-sm font-medium">Student</span>
                                        </motion.button>
                                        <motion.button
                                            type="button"
                                            onClick={() => setRole("Faculty")}
                                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                                role === 'Faculty'
                                                ? 'border-purple-500 bg-purple-500/10 text-purple-400'
                                                : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                                            }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            >
                                            <School className="w-5 h-5 mx-auto mb-1" />
                                            <span className="text-sm font-medium">Faculty</span>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className='mt-5'>
                                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                                        Email Address
                                    </label>
                                    <div className='relative'>
                                        <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                        <input 
                                        type="email" 
                                        id='email'
                                        name='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        className=' w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white hover:border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                                        placeholder='Enter your email'
                                        required
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className='mt-5'>
                                    <label className='block text-sm font-medium text-gray-300 mb-3'>
                                        Password
                                    </label>
                                    <div className='relative'>
                                        <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                        <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        id='password'
                                        name='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                        className=' w-full pl-10 pr-4 py-3 rounded-lg border border-gray-600 bg-gray-700/50 text-white hover:border-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                                        placeholder='Enter your password'
                                        required
                                        />
                                        <button
                                        type='button'
                                        onClick={()=> setShowPassword(!showPassword)}
                                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors'
                                        >
                                            {showPassword ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5'/>}
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Remember me and Forgot Password */}
                                <div className='flex items center justify-between mt-5 '>
                                    <label className='flex items-center'>
                                        <input 
                                        type="checkbox" 
                                        className='w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2'
                                        />
                                        <span className='ml-2 text-sm text-gray-300'>Remember Me</span>
                                    </label>
                                    <Link 
                                    to="/"
                                    className='text-sm text-blue-400 hover:text-blue-300 transition-colors'
                                    >
                                        Forgot Password
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    className="w-full py-3 px-4  mt-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Login
                                </motion.button>
                                
                                {/* Divider */}
                                <div className="relative mt-5">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                                    </div>
                                </div>
                                
                                {/* Google OAuth Button */}
                                <motion.button
                                    type="button"
                                    className="w-full py-3 px-4 mt-5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    Sign in with Google
                                </motion.button>
                            </div>
                        </form>
                        
                        <div className="mt-8 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                    Sign up here
                                </Link>
                            </p>
                        </div>

                                
                    </motion.div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Login;
