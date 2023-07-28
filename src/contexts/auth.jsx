import React, { createContext, useState, useEffect } from 'react';

// Create the auth context
export const AuthContext = createContext();

// Create a provider for the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Function to log in the user
  const login = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setError(null);
        // Store user authentication data in localStorage
        localStorage.setItem('userdata', JSON.stringify(data));
      } else {
        const errorData = await response.json();
        setError(errorData.detail);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  // Function to register the user
  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setError(null);
        // Store user authentication data in localStorage
        localStorage.setItem('userdata', JSON.stringify(data));
      } else {
        const errorData = await response.json();
        setError(errorData.detail);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  // Function to log out the userdata
  const logout = () => {
    setUser(null);
    // Remove user authentication data from localStorage
    localStorage.removeItem('userdata');
  };

  // Check for user authentication data in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('userdata');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Provide the user, login, and logout functions to child components
  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  );
};
