// src/pages/Login.js
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // handle login logic here
    console.log('Logging in with', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-1">Login</h2>
        <p className="text-sm text-gray-500 mb-6">to get started</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
            Forgot Password?
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            Continue
          </button>

          <div className="text-center text-sm text-gray-600 mt-2">
            New User?{' '}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Register
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
