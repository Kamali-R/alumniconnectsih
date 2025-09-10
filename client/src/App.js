import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './homepage';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import PasswordResetFlow from './password';
import Login from './Login';
import AlumniDashboard from './dashboard'; // Import the dashboard
import AlumniConnectProfile from './AlumniProfile';
import './index.css';

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
          <Route path="/alumni-profile" element={<AlumniConnectProfile />} />
          {/* Add the dashboard route */}
          <Route path="/dashboard" element={<AlumniDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;