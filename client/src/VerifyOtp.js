// src/components/VerifyOtp.js
import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Styles/VerifyOtp.css';


const VerifyOtp = ({ userData }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
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

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        ...userData,
        otp: fullOtp
      });
      setSuccess(true);
      setMessage(response.data.message);
      setShowResend(false);
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
    } catch (error) {
      setSuccess(false);
      setMessage(error.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="otp-wrapper">
      {/* Top-right green message */}
      {success && message && (
        <div className="success-toast">
          ✅ {message}
        </div>
      )}

      <div className="otp-box">
        <h2>Verify Your Account</h2>
        <p>
          We emailed the 6-digit code to <strong>{userData?.email}</strong><br />
          Enter the code below to confirm your email
        </p>

        <form onSubmit={handleVerify} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputsRef.current[index] = el)}
              />
            ))}
          </div>
          <button type="submit" className="verify-btn">VERIFY</button>
        </form>

        {!success && message && (
          <p className="error-msg">{message}</p>
        )}

        {showResend && (
          <p className="resend-text">
            Didn't receive a code? <span onClick={handleResend}>RESEND</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyOtp;
