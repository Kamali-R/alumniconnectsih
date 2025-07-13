import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </Router>
  );
}

export default App;
