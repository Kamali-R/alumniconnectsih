import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      setMessage(response.data.message); // "Login successful"
      
      // OPTIONAL: save token or navigate
      // localStorage.setItem('token', response.data.token);
      // navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message); // "User not found" or "Invalid credentials"
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
  <div style={{
    height: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <div style={{
      width: '400px',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    }}>
      <div style={{ textAlign:'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', margin: 0 }}>
          Login <span style={{ fontWeight: '500' }}>to get started</span>
        </h2>
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <input
            type={showPwd ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
          flexWrap: 'nowrap',
        }}>
          <div
  style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: 0,
    padding: 0,
    height: '20px',
  }}
>
</div>



       <Link
  to={email ? "/forgot-password" : "#"}
  state={email ? { email } : null}
  onClick={(e) => {
    if (!email) {
      e.preventDefault(); // stop navigation
      document.querySelector('input[type="email"]').reportValidity();
    }
  }}
  style={{
    fontSize: '14px',
    color: '#1a3eea',
    cursor: 'pointer',
  }}
>
  Forgot Password?
</Link>


        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#0024ff',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '6px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
{/* ✅ Message Display */}
        {message && (
          <p style={{
            color: message.toLowerCase().includes('successful') ? 'green' : 'red',
            textAlign: 'center',
            marginTop: '15px'
          }}>
            {message}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
  <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#ccc' }} />
  <span style={{ margin: '0 10px', color: '#888', fontWeight: 'bold' }}>or</span>
  <hr style={{ flex: 1, border: 'none', height: '1px', backgroundColor: '#ccc' }} />
</div>


        {/* ✅ Google Sign-in Button */}
<div style={{ marginTop: '20px', textAlign: 'center' }}>
  <button
  type="button"
  style={{
    padding: '12px',
    width: '100%',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    color: '#000',
    fontWeight: '500',
  }}
  onClick={() => {
    window.location.href = 'http://localhost:5000/api/google';
  }}
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
    width="20"
    height="20"
    style={{ marginRight: '8px' }}
  />
  Sign in with Google
</button>

</div>


        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px'
        }}>
          Don't have an account?{' '}
          <Link to="/Register" style={{ color: '#1a3eea', fontWeight: 'bold' }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  </div>
);
};
export default Login;