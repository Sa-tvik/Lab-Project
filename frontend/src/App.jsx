import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ProblemList from './pages/student/ProblemList';
import Problem from './pages/student/Problem';
import Signup from './pages/Signup';  
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Faculty/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/problems" element={<ProblemList />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/faculty/dashboard" element={<Dashboard />} />
    
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
