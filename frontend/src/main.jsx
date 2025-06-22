import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ProblemProvider } from './context/ProblemContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProblemProvider>
      <App />
    </ProblemProvider>
  </StrictMode>
);