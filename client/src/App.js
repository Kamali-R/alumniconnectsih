import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './homepage';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import PasswordResetFlow from './password';
import Login from './Login';
import AlumniProfile from './AluminiProfile';
import Dashboard from './Dashboard'; // Make sure to create this
import './index.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                onOtpSent={() => window.location.replace('/VerifyOtp')}
                setUserData={setUserData}
              />
            }
          />
          <Route 
            path="/VerifyOtp" 
            element={<VerifyOtp userData={userData} setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route path="/forgot-password" element={<PasswordResetFlow />} />
          <Route path="/complete-profile" element={ isAuthenticated ? (
                <AlumniProfile />
              ) : (
                <Navigate to="/login" replace />
              )} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;