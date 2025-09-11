// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './homepage';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import PasswordResetFlow from './password';
import Login from './Login';
import AlumniProfile from './AluminiProfile';
import Dashboard from './Dashboard';
import './index.css';
import AlumniConnectProfile from './AlumniProfile';


function App() {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [userRole, setUserRole] = useState(null);
  
  // Check for authentication token on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUserData = localStorage.getItem('registrationData');
    const otpVerified = localStorage.getItem('otpVerified') === 'true';
    const savedUserRole = localStorage.getItem('userRole');
    
    if (token) {
      setIsAuthenticated(true);
    }
    
    if (savedUserData) {
      try {
        setUserData(JSON.parse(savedUserData));
      } catch (e) {
        console.error('Failed to parse saved user data', e);
        localStorage.removeItem('registrationData');
      }
    }
    
    setIsOtpVerified(otpVerified);
    setUserRole(savedUserRole);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/Register"
            element={
              <Register
                setUserData={setUserData}
                setUserRole={setUserRole}
              />
            }
          />
          <Route 
            path="/VerifyOtp" 
            element={<VerifyOtp setIsOtpVerified={setIsOtpVerified} setUserRole={setUserRole} />} 
          />
          <Route path="/forgot-password" element={<PasswordResetFlow />} />
          <Route 
            path="/complete-profile" 
            element={
              isOtpVerified ? 
                <AlumniProfile userRole={userRole} /> : 
                <Navigate to="/register" replace />
            }
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard userRole={userRole} /> : <Navigate to="/login" replace />}
          />
          <Route 
  path="/alumni-profile" 
  element={<AlumniConnectProfile />} 
/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;