import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ProblemList from './pages/ProblemList';
import Problem from './pages/Problem';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<Problem />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;