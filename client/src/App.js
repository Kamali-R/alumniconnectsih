import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './homepage';
import Register from './Register'; // ✅ Import Register
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <Register
              onOtpSent={() => {}}
              setUserData={() => {}}
            />
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
