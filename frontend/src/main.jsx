import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ProblemProvider } from "./context/ProblemContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProblemProvider>
        <App />
      </ProblemProvider>
    </BrowserRouter>
  </React.StrictMode>
);
