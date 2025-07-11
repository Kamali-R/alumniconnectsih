// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Register from './Register';         // Adjust path if inside /pages or /components
import VerifyOtp from './VerifyOtp';       // Adjust path if needed
import Login from './Login';         // This is the new styled login you wanted

function App() {
  const [userData, setUserData] = useState(null); // Pass from register to verify

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Home */}
          <Route
            path="/"
            element={
              <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Welcome to Alumni Connect</h2>
                <p className="text-gray-600">Visit <code>/register</code> or <code>/login</code></p>
              </div>
            }
          />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Registration page */}
          <Route
            path="/register"
            element={
              <Register
                onOtpSent={() => window.location.replace('/verify')}
                setUserData={setUserData}
              />
            }
          />

          {/* OTP Verification */}
          <Route
            path="/verify"
            element={<VerifyOtp userData={userData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
