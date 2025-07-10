import React from 'react';
import Signup from './Signup';

function App() {
  return (
    <div style={{ backgroundColor: '#f4f7fb', minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#003366', fontSize: '36px', margin: '10px 0' }}>Alumni Connect</h1>
        <p style={{ color: '#555', fontSize: '16px' }}>Bridging past and present for a brighter future</p>
      </header>
      <Signup />
      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#aaa' }}>
        <small>&copy; {new Date().getFullYear()} Alumni Connect. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
