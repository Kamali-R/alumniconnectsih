import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Styles/VerifyOtp.css';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      navigate('/register');
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
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

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
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        ...userData,
        otp: fullOtp
      });

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
    }
  };

  const handleResend = async () => {
    try {
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
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="otp-input"
                autoFocus={index === 0}
              />
            ))}
          </div>

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
      </div>
    </div>
  );
};

export default VerifyOtp;