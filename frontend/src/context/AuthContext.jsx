import React, { createContext, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();
const backendUrl = import.meta.env.VITE_API_URL; 

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${backendUrl}/check-auth`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          setUser({
            id: data.user_id,
            email: data.email,
            role: data.role
          });
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        <p>Checking session...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export function RoleProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 dark:text-gray-300">
        <p>Checking session...</p>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/" />;

  return children;
}

export { AuthContext };