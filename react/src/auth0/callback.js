// src/auth0/callback.js
import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './loading.js';

function Callback() {
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isLoading:', isLoading);
    console.log('isAuthenticated:', isAuthenticated);
    console.log('error:', error);

    if (!isLoading && !isAuthenticated) {
      window.location.href = "http://localhost:3000";
      return null; 
    }

    //Verificar si es admin o no
    //Auht0 genera un id, en ese id va user.sub()
    //auth0|66539b1ce539b35aea94e74d


    if (!isLoading && isAuthenticated && user) {
      const username = user.email.split('@')[0];
      const isStudent = /^[aA]\d{8}$/.test(username);

      if (isStudent) {
        localStorage.setItem('userRole', 'student');
        navigate('/principal-estudiante'); // Redirigir a la página de estudiante
      } else {
        localStorage.setItem('userRole', 'teacher');
        navigate('/principal-profesor'); // Redirigir a la página de profesor
      }
    }
  }, [isLoading, isAuthenticated, error, user, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return null;
}

export default Callback;
