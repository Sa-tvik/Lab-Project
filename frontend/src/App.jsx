import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, PrivateRoute, RoleProtectedRoute } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import ProblemList from './pages/student/ProblemList';
import Problem from './pages/student/Problem';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Faculty/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Student Routes */}
          <Route
            path="/problems"
            element={
              <PrivateRoute>
                <ProblemList />
              </PrivateRoute>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <PrivateRoute>
                <Problem />
              </PrivateRoute>
            }
          />
          {/* Protected Faculty Route */}
          <Route
            path="/faculty/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['faculty']}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
