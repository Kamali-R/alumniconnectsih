<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/VerifyOtp.css';
=======
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [userData, setUserData] = useState(null);
  const inputsRef = useRef([]);

  // Initialize user data from navigation state
  useEffect(() => {
    if (location.state?.userData) {
      setUserData(location.state.userData);
    } else {
      // If no user data, redirect back to register
      navigate('/Register');
    }
  }, [location, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setShowResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
=======
  const { userData, email } = location.state || {};
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

<<<<<<< HEAD
    // Auto-focus next input
=======
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

<<<<<<< HEAD
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');

    if (fullOtp.length !== 6) {
      setMessage('Please enter a 6-digit OTP');
      return;
    }

    try {
=======
  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    
    try {
      setLoading(true);
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        ...userData,
        otp: fullOtp
      });
<<<<<<< HEAD

      if (response.data.success) {
        setSuccess(true);
        setMessage(response.data.message);
        setShowResend(false);
        
        // Redirect to dashboard after successful verification
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setSuccess(false);
        setMessage(response.data.message || 'OTP verification failed.');
        setShowResend(true);
      }
    } catch (error) {
      setSuccess(false);
      setMessage(error.response?.data?.message || 'OTP verification failed.');
      setShowResend(true);
=======
      
      setMessage({ 
        text: response.data.message || 'Verification successful!', 
        type: 'success' 
      });
      setShowResend(false);
      
      // Redirect to home/dashboard after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'OTP verification failed.', 
        type: 'error' 
      });
      setShowResend(true);
    } finally {
      setLoading(false);
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
    }
  };

  const handleResend = async () => {
    try {
<<<<<<< HEAD
      await axios.post('http://localhost:5000/api/send-otp', userData);
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0].focus();
      setMessage('OTP resent successfully!');
      setSuccess(true);
      setShowResend(false);
      setCountdown(30);
    } catch (error) {
      setSuccess(false);
      setMessage(error.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="otp-verification-container">
      <div className="otp-card">
        {/* Success message */}
        {success && message && (
          <div className="success-message">
            <svg viewBox="0 0 24 24" className="success-icon">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        <h2>Verify Your Email</h2>
        <p className="instruction-text">
          We've sent a 6-digit verification code to<br />
          <strong>{userData.email}</strong>
        </p>

        <form onSubmit={handleVerify} className="otp-form">
          <div className="otp-inputs-container">
=======
      setLoading(true);
      await axios.post('http://localhost:5000/api/send-otp', userData);
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0].focus();
      setMessage({ 
        text: 'OTP resent successfully!', 
        type: 'success' 
      });
      setShowResend(false);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to resend OTP.', 
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
            We emailed the 6-digit code to <strong className="text-blue-600">{email}</strong>
          </p>
          <p className="text-gray-600 mt-1">Enter the code below to confirm your email</p>
        </div>

        {message.text && (
          <div className={`mb-6 p-3 rounded-lg ${message.type === 'error' ? 'bg-red-100 text-red-700 border-l-4 border-red-500' : 'bg-green-100 text-green-700 border-l-4 border-green-500'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between space-x-2">
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
<<<<<<< HEAD
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="otp-input"
                autoFocus={index === 0}
=======
                ref={(el) => (inputsRef.current[index] = el)}
                className={`w-12 h-12 text-center text-2xl font-semibold rounded-lg border ${
                  message.type === 'error' ? 'border-red-300 bg-red-50' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                disabled={loading}
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
              />
            ))}
          </div>

<<<<<<< HEAD
          <button type="submit" className="verify-button">
            Verify
          </button>
        </form>

        {/* Error message */}
        {!success && message && (
          <p className="error-message">{message}</p>
        )}

        {/* Resend OTP section */}
        <div className="resend-section">
          {!showResend ? (
            <p>Resend OTP in {countdown} seconds</p>
          ) : (
            <p>
              Didn't receive a code?{' '}
              <button onClick={handleResend} className="resend-button">
                Resend OTP
              </button>
            </p>
          )}
        </div>
=======
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

        {showResend && (
          <div className="mt-4 text-center text-gray-600">
            Didn't receive a code?{' '}
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium hover:text-blue-800 focus:outline-none"
              disabled={loading}
            >
              RESEND
            </button>
          </div>
        )}

        {message.type === 'success' && (
          <div className="mt-6 p-3 bg-blue-50 text-blue-700 rounded-lg text-center">
            Redirecting...
          </div>
        )}
>>>>>>> bf8f7f73ed65247dec2f4e4f8080ff92e84d3de5
      </div>
    </div>
  );
};

export default VerifyOtp;