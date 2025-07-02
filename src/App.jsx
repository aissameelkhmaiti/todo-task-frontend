import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';

// Fonction utilitaire pour vérifier l'authentification
const isAuthenticated = () => !!localStorage.getItem("token");

// Composant pour protéger les routes privées
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Composant principal
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Routes protégées */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
