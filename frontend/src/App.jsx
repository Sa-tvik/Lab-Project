import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ProblemList from './pages/ProblemList';
import Problem from './pages/Problem';
import Signup from './pages/signup';  
import Login from './pages/login';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/problemlist" element={<ProblemList />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/signup" element={<Signup />} />  
          <Route path="/Login" element={<Login />} />    
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
