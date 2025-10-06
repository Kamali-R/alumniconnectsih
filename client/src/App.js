import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './homepage';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import PasswordResetFlow from './password';
import Login from './Login';
import AlumniDashboard from './Dashboard';
import StudentDashboard from './StudentDashboard';
import AlumniConnectProfile from './AlumniProfile';
import StudentProfilePage from './studentprofile';
import GoogleAuthHandler from './GoogleAuthHandler';
import Dashboard from './Dashboard'; // Import the new Dashboard component
import './index.css';
import AlumniDirectory from './alumnidirectory';

function App() {
  const [userData, setUserData] = useState(null);
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="/Register"
            element={
              <Register
                onOtpSent={() => window.location.replace('/VerifyOtp')}
                setUserData={setUserData}
              />
            }
          />
          <Route path="/VerifyOtp" element={<VerifyOtp userData={userData} />} />
          <Route path="/forgot-password" element={<PasswordResetFlow />} />
          
          {/* Alumni Routes */}
          <Route path="/alumni-profile" element={<AlumniConnectProfile />} />
          <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
          
          {/* Student Routes */}
          <Route path="/student-profile" element={<StudentProfilePage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/alumni-directory" element={<AlumniDirectory />} />
         
          {/* Main dashboard route that redirects based on user role */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Add Google Auth Handler route */}
          <Route path="/auth/google/callback" element={<GoogleAuthHandler />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;