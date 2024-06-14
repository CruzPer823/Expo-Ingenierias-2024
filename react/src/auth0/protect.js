import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  if (isLoading) {
    return null; 
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    navigate('/');
  }

  return children;
};

export default ProtectedRoute;
