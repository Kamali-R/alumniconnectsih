// src/App.js
import React, { useState } from 'react';
import Register from './Register';
import VerifyOtp from './VerifyOtp';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);

  return (
    <div className="app">
      {step === 1 && <Register onOtpSent={() => setStep(2)} setUserData={setUserData} />}
      {step === 2 && <VerifyOtp userData={userData} />}
    </div>
  );
}

export default App;
