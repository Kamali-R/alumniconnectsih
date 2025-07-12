import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // ✅ Add this
import './Styles/Signup.css';

const Register = ({ onOtpSent, setUserData }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtpRequest = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/send-otp', form);
      setUserData(form);
      setMessage('');
      onOtpSent();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendOtpRequest();
  };

  return (
    <div className="signup-container">
      <h2>Register to Alumni Connect</h2>
      <p className="subtitle">Enter your details to continue</p>

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="name"
          className="form-field"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          className="form-field"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="form-field"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="form-field select-role"
          value={form.role}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="alumni">Alumni</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>

      {message && <p className="error-message">{message}</p>}

      {/* ✅ Sign in link */}
      <p className="signin-link">
        Already have an account? <Link to="/Login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
