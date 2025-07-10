// src/components/VerifyOtp.js
import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = ({ userData }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        ...userData,
        otp
      });
      setSuccess(true);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'OTP verification failed.');
    }
  };

  return (
    <div className="form-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleVerify}>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" required />
        <button type="submit">Verify OTP</button>
      </form>
      <p className={success ? 'success' : 'error'}>{message}</p>
    </div>
  );
};

export default VerifyOtp;
