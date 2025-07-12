<<<<<<< HEAD
// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Add this
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import Login from './Login'; // if you have login page
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={<Register onOtpSent={() => window.location.replace('/verify')} setUserData={setUserData} />}
        />
        <Route
          path="/verify"
          element={<VerifyOtp userData={userData} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
=======
// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
>>>>>>> 19420fa5a39f1e733b56b300279c16cedc338b6a
  );
}
export default App;