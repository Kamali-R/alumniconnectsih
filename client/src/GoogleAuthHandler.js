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
        
        if (error) {
          console.error('Google auth error:', error);
          navigate('/login', { 
            state: { 
              error: 'Google authentication failed. Please try again.' 
            } 
          });
          return;
        }
        
        if (token) {
          // Store token
          localStorage.setItem('token', token);
          
          try {
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
            localStorage.setItem('profileCompleted', userData.profileCompleted ? 'true' : 'false');
            
            console.log('Google auth successful, user data:', userData);
            
            // Redirect based on profile completion and role
            if (userData.profileCompleted) {
              // Redirect to appropriate dashboard based on role
              if (userData.role === 'student') {
                navigate('/student-dashboard');
              } else {
                navigate('/dashboard');
              }
            } else {
              // Redirect to profile completion based on role
              if (userData.role === 'student') {
                navigate('/student-profile', { 
                  state: { 
                    userData: userData,
                    verified: true,
                    role: userData.role,
                    fromGoogle: true
                  }
                });
              } else {
                navigate('/alumni-profile', { 
                  state: { 
                    userData: userData,
                    verified: true,
                    role: userData.role,
                    fromGoogle: true
                  }
                });
              }
            }
          } catch (userError) {
            console.error('Error fetching user data:', userError);
            
            // If we can't get user data but have a token, try to decode it
            try {
              const tokenParts = token.split('.');
              if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                
                if (payload.role === 'student') {
                  navigate('/student-profile', { 
                    state: { 
                      fromGoogle: true
                    }
                  });
                } else {
                  navigate('/alumni-profile', { 
                    state: { 
                      fromGoogle: true
                    }
                  });
                }
              } else {
                throw new Error('Invalid token format');
              }
            } catch (decodeError) {
              console.error('Error decoding token:', decodeError);
              navigate('/login', { 
                state: { 
                  error: 'Authentication failed. Please try again.' 
                } 
              });
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