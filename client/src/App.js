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
        <Route path="/Register" element={<Register />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        {/* Optional if you've created this */}
      </Routes>
    </Router>
  );
}

export default App;
