// src/auth0/callback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './loading.js';

function Callback() {
  const URL = "http://localhost:8000/Admin/getAdmin/";
  const { isAuthenticated, isLoading, error, user } = useAuth0();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('error:', error);
    

    if (!isLoading && !isAuthenticated) {
      window.location.href = "http://localhost:3000";
      return null;
    }

    if (!isLoading && isAuthenticated && user) {

      const checkAdminStatus = async () => {
        try {
          const response = await axios.get(`${URL}${user.sub}`);
          const isAdmin = response.data.length > 0;

          if (isAdmin) {
            localStorage.setItem('userRole', 'admin');
            navigate('/Admin');
          } else {
            throw new Error('Not an admin');
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const username = user.email.split('@')[0];
            const isStudent = /^[aA]\d{8}$/.test(username);

            if (isStudent) {
              localStorage.setItem('userRole', 'student');
              navigate('/principal-estudiante');
            } else {
              localStorage.setItem('userRole', 'teacher');
              navigate('/principal-profesor');
            }
          } else {
            console.error('Error checking admin status:', error);
            navigate('/'); 
          }
        } finally {
          setIsCheckingAdmin(false);
        }
      };

      checkAdminStatus();
    }
  }, [isLoading, isAuthenticated, error, user, navigate]);

  if (isLoading || isCheckingAdmin) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return null;
}

export default Callback;
