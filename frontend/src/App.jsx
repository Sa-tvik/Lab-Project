import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ProblemList from './pages/student/ProblemList';
import Problem from './pages//student/Problem';
import Signup from './pages/Signup';  
import Login from './pages/login';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/teacher/dashboard';
import Attendance from './pages/teacher/Attendance'
import LabSessions from './pages/teacher/LabSessions';
import Performance from './pages/teacher/Performance';
import TeacherLayout from './components/TeacherLayout';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/problemlist" element={<ProblemList />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
      
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherLayout />} />
          <Route path="/teacher/dashboard" element={<Dashboard />} />
          <Route path="/teacher/attendance" element={<Attendance />} />
          <Route path="/teacher/session" element={<LabSessions />} />
          <Route path="/teacher/performance" element={<Performance />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
