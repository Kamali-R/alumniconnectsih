// VerifyOtp.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = ({ setIsOtpVerified, setUserRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, email, role } = location.state || {};
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const inputsRef = useRef([]);
  
  // Check if we have the required data
  React.useEffect(() => {
    if (!userData || !email || !role) {
      setMessage({
        text: 'Missing registration information. Please register again.',
        type: 'error'
      });
      setTimeout(() => navigate('/register'), 2000);
    }
  }, [userData, email, role, navigate]);
  
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };
  
  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    
    // Validate OTP format
    if (!/^\d{6}$/.test(fullOtp)) {
      setMessage({
        text: 'Please enter a valid 6-digit OTP',
        type: 'error'
      });
      return;
    }
    
    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      
      console.log('Sending OTP verification request:', {
        email,
        otp: fullOtp,
        purpose: 'register'
      });
      
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        email,
        otp: fullOtp,
        purpose: 'register'
      });
      
      console.log('OTP verification response:', response.data);
      
      // Check if the response contains the expected data
      if (response.data && response.data.success) {
        setMessage({ 
          text: response.data.message || 'Verification successful!', 
          type: 'success' 
        });
        setShowResend(false);
        
        // Store verification status and role in localStorage
        localStorage.setItem('otpVerified', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        setIsOtpVerified(true);
        setUserRole(role);
        
        // Redirect to complete profile page with user data
        setTimeout(() => {
          navigate('/complete-profile', { 
            state: { 
              userData: { ...userData, verified: true },
              verified: true,
              role: role
            } 
          });
        }, 1500);
      } else {
        // Handle case where backend returns success: false
        throw new Error(response.data.message || 'OTP verification failed');
      }
      
    } catch (error) {
      console.error('OTP verification error:', error);
      
      let errorMessage = 'OTP verification failed.';
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        // Handle specific error cases
        if (error.response.status === 404) {
          errorMessage = 'OTP not found or expired. Please request a new OTP.';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid OTP. Please try again.';
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (error.request) {
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        console.error('Request setup error:', error.message);
        errorMessage = error.message;
      }
      
      setMessage({ 
        text: errorMessage, 
        type: 'error' 
      });
      setShowResend(true);
    } finally {
      setLoading(false);
    }
  };
  
  const handleResend = async () => {
    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      
      console.log('Resending OTP to:', email);
      
      const response = await axios.post('http://localhost:5000/api/send-otp', {
        email,
        purpose: 'register'
      });
      
      console.log('OTP resend response:', response.data);
      
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0].focus();
      setMessage({ 
        text: response.data.message || 'OTP resent successfully!', 
        type: 'success' 
      });
      setShowResend(false);
    } catch (error) {
      console.error('OTP resend error:', error);
      
      let errorMessage = 'Failed to resend OTP.';
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else {
        errorMessage = error.message;
      }
      
      setMessage({ 
        text: errorMessage, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md mx-4 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Account</h2>
          <p className="text-gray-600">
            We emailed the 6-digit code to <strong className="text-blue-600">{email || 'your email'}</strong>
          </p>
          <p className="text-gray-600 mt-1">Enter the code below to confirm your email</p>
        </div>
        
        {message.text && (
          <div className={`mb-6 p-3 rounded-lg ${
            message.type === 'error'
              ? 'bg-red-100 text-red-700 border-l-4 border-red-500'
              : 'bg-green-100 text-green-700 border-l-4 border-green-500'
          }`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputsRef.current[index] = el)}
                className={`w-12 h-12 text-center text-2xl font-semibold rounded-lg border ${
                  message.type === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={loading}
              />
            ))}
          </div>
          
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'VERIFY'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-600">
          Didn't receive a code?{' '}
          <button
            onClick={handleResend}
            className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Resend Code'}
          </button>
        </div>
        
        {message.type === 'success' && (
          <div className="mt-6 p-3 bg-blue-50 text-blue-700 rounded-lg text-center">
            Redirecting to complete your profile...
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;