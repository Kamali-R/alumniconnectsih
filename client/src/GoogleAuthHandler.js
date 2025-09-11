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

    console.log('Google Auth Callback Params:', {
      token, role, error, name, email, graduationYear
    });

    if (error) {
      // Handle error case
      navigate('/login', { state: { error: 'Google authentication failed. Please try again.' } });
      return;
    }

    if (token && role) {
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      // Save user info to localStorage
      const userData = {
        role: role,
        name: name || 'User',
        email: email || '',
        graduationYear: graduationYear || ''
      };
      localStorage.setItem('user', JSON.stringify(userData));
      
      console.log('User data saved to localStorage:', userData);
      
      // Redirect based on role
      if (role === 'alumni') {
        navigate('/dashboard');
      } else if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        // Default to alumni dashboard
        navigate('/dashboard');
      }
    } else {
      // If no token or role, redirect to login
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