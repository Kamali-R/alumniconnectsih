import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleAuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const role = params.get('role');
    const error = params.get('error');
    const name = params.get('name');
    const email = params.get('email');
    const graduationYear = params.get('graduationYear');
    const profileCompleted = params.get('profileCompleted');
    
    console.log('Google Auth Callback Params:', {
      token, role, error, name, email, graduationYear, profileCompleted
    });
    
    if (error) {
      navigate('/login', { state: { error: 'Google authentication failed. Please try again.' } });
      return;
    }
    
    if (token && role) {
      // Save token to localStorage
      localStorage.setItem('authToken', token);
      
      // Save user info to localStorage
      const userData = {
        role: role,
        name: name || 'User',
        email: email || '',
        graduationYear: graduationYear || '',
        profileCompleted: profileCompleted === 'true'
      };
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRole', role);
      
      console.log('User data saved to localStorage:', userData);
      
      // Redirect based on profile completion and role
      if (profileCompleted === 'false') {
        // Redirect to profile completion
        navigate('/alumni-profile', { 
          state: { 
            userData: userData,
            fromGoogle: true,
            token: token
          }
        });
      } else {
        // Redirect to appropriate dashboard
        if (role === 'alumni') {
          navigate('/dashboard');
        } else if (role === 'student') {
          navigate('/student-dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } else {
      console.error('Missing token or role in Google callback');
      navigate('/login', { state: { error: 'Authentication failed. Please try again.' } });
    }
  }, [location, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
        <p className="mt-4 text-gray-700">Completing Google authentication...</p>
      </div>
    </div>
  );
};

export default GoogleAuthHandler;