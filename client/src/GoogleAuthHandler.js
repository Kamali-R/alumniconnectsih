import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const GoogleAuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');
        const success = params.get('success');
        
        console.log('Google auth params:', { token, error, success });
        
        if (error) {
          console.error('Google auth error:', error);
          navigate('/login', { 
            state: { 
              error: 'Google authentication failed. Please try again.' 
            } 
          });
          return;
        }
        
        if (token && success === 'true') {
          // Store token with consistent key
          localStorage.setItem('token', token);
          
          // Get user data using the token
          const response = await axios.get('http://localhost:5000/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const userData = response.data;
          
          // Store user data
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('userRole', userData.role);
          localStorage.setItem('otpVerified', 'true');
          
          console.log('Google auth successful, user data:', userData);
          
          // Redirect based on profile completion
          if (!userData.profileCompleted) {
            navigate('/alumni-profile', { 
              state: { 
                userData: userData,
                verified: true,
                role: userData.role,
                fromGoogle: true
              }
            });
          } else {
            // Redirect to appropriate dashboard
            if (userData.role === 'student') {
              navigate('/student-dashboard');
            } else {
              navigate('/dashboard');
            }
          }
        } else {
          console.error('No token received from Google auth');
          navigate('/login', { 
            state: { 
              error: 'Authentication failed. Please try again.' 
            } 
          });
        }
      } catch (error) {
        console.error('Google auth handler error:', error);
        
        // Clear any partial auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        
        navigate('/login', { 
          state: { 
            error: 'Authentication failed. Please try again.' 
          } 
        });
      }
    };
    
    handleGoogleAuth();
  }, [location, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Completing Google Authentication...
        </h2>
        <p className="text-gray-600">Please wait while we set up your account.</p>
      </div>
    </div>
  );
};

export default GoogleAuthHandler;