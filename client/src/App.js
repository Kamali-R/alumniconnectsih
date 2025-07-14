import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import HomePage from './homepage';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import Login from './Login';
import Blank from './Blank'; // ✅ Import the new blank page

import './index.css';

function App() {
  const [userData, setUserData] = useState(null); // Used to pass data between Register & VerifyOtp

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Home */}
          <Route path="/" element={<HomePage />} />

          {/* Login */}
          <Route path="/Login" element={<Login />} />

          {/* Register */}
          <Route
            path="/Register"
            element={
              <Register
                onOtpSent={() => window.location.replace('/VerifyOtp')}
                setUserData={setUserData}
              />
            }
          />

          {/* Verify OTP */}
          <Route path="/VerifyOtp" element={<VerifyOtp userData={userData} />} />

          {/* ✅ Blank page after Google Sign-In */}
          <Route path="/blank" element={<Blank />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
