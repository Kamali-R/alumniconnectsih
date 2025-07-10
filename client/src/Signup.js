import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; // External CSS for better styling

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', form);
      setMessage(response.data.message || 'Signup successful!');
      setForm({ name: '', email: '', password: '' }); // Clear form after success
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Join Alumni Connect</h2>
      <p className="subtitle">Reconnect. Collaborate. Grow.</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
