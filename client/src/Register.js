// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onOtpSent, setUserData }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/send-otp', form);
      setUserData(form); // pass user info to OTP page
      onOtpSent();        // navigate to OTP form
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP.');
    }
  };

  return (
    <div className="form-container">
      <h2>Register to Alumni Connect</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
          <option value="faculty">Faculty</option>
        </select>
        <button type="submit">Send OTP</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Register;
