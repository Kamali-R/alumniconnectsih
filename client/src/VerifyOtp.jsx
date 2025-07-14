import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, email } = location.state || {};
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    
    if (fullOtp.length !== 6) {
      setMessage({ text: 'Please enter a complete 6-digit code', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: '', type: '' });
      
      // Determine if this is for registration or password reset
      const endpoint = userData 
        ? 'http://localhost:5000/api/verify-otp' 
        : 'http://localhost:5000/api/verify-reset-otp';
      
      const payload = userData 
        ? { ...userData, otp: fullOtp } 
        : { email, otp: fullOtp };

      const response = await axios.post(endpoint, payload);
      
      setMessage({ 
        text: response.data.message || 'Verification successful!', 
        type: 'success' 
      });
      setShowResend(false);
      
      // Redirect based on flow
      setTimeout(() => {
        if (userData) {
          // Registration flow - go to home
          navigate('/', { state: { registrationSuccess: true } });
        } else {
          // Password reset flow - go to password reset form
          navigate('/reset-password', { state: { email, verified: true } });
        }
      }, 2000);
      
    } catch (error) {
      let errorMessage = 'Verification failed. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
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
      
      // Determine appropriate endpoint
      const endpoint = userData
        ? 'http://localhost:5000/api/send-otp'
        : 'http://localhost:5000/api/send-reset-otp';
      
      const payload = userData ? userData : { email };
      
      await axios.post(endpoint, payload);
      
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0].focus();
      
      setMessage({ 
        text: 'New OTP has been sent to your email!', 
        type: 'success' 
      });
      setShowResend(false);
    } catch (error) {
      let errorMessage = 'Failed to resend OTP. Please try again.';
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {userData ? 'Verify Your Account' : 'Verify Password Reset'}
          </h2>
          <p className="text-gray-600">
            We emailed the 6-digit code to <strong className="text-blue-600">{email}</strong>
          </p>
          <p className="text-gray-600 mt-1">Enter the code below to confirm</p>
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
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className={`w-12 h-12 text-center text-2xl font-semibold rounded-lg border ${
                  message.type === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={loading}
                autoFocus={index === 0}
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
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : (
              'VERIFY'
            )}
          </button>
        </form>

        {showResend && (
          <div className="mt-4 text-center text-gray-600">
            Didn't receive a code?{' '}
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'RESEND'}
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(userData ? '/Register' : '/Login')}
            className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
          >
            {userData ? 'Back to Registration' : 'Back to Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;