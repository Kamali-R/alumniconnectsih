import React from 'react';

const AlumniHomePage = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#F8F9FC', minHeight: '100vh' }}>
      {/* Navbar */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        <h2 style={{ margin: 0, color: '#007bff' }}>Alumni<span style={{ color: '#000' }}>Connect</span></h2>
        <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" style={navLinkStyle}>Dashboard</a>
          <a href="#" style={navLinkStyle}>Profile</a>
          <a href="#" style={navLinkStyle}>Events</a>
          <a href="#" style={navLinkStyle}>Opportunities</a>
          <a href="#" style={navLinkStyle}>Mentorship</a>
          <button style={logoutBtnStyle}>Logout</button>
        </nav>
      </header>

      {/* Welcome Card */}
      <main style={{ padding: '40px 60px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Dashboard</h1>
        <div style={welcomeCard}>
          <h2 style={{ margin: 0 }}>Welcome back, Sarah!</h2>
          <p style={{ margin: '10px 0' }}>You have 3 new connection requests and 2 upcoming events this week.</p>
          <button style={notificationBtn}>View Notifications</button>
        </div>

        {/* Stat Cards */}
        <div style={statsGrid}>
          <div style={{ ...statCard, borderLeft: '6px solid #007bff' }}>
            <div style={iconBox}>👥</div>
            <div>
              <h4>Network Connections</h4>
              <p style={statNumber}>128</p>
            </div>
          </div>

          <div style={{ ...statCard, borderLeft: '6px solid #6f42c1' }}>
            <div style={iconBox}>📅</div>
            <div>
              <h4>Upcoming Events</h4>
              <p style={statNumber}>5</p>
            </div>
          </div>

          <div style={{ ...statCard, borderLeft: '6px solid #28a745' }}>
            <div style={iconBox}>💼</div>
            <div>
              <h4>Job Opportunities</h4>
              <p style={statNumber}>12</p>
            </div>
          </div>

          <div style={{ ...statCard, borderLeft: '6px solid #6610f2' }}>
            <div style={iconBox}>⏰</div>
            <div>
              <h4>Mentorship Hours</h4>
              <p style={statNumber}>24</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Style Objects
const navLinkStyle = { textDecoration: 'none', color: '#2C3E50', fontWeight: 500 };
const logoutBtnStyle = {
  backgroundColor: '#007bff',
  border: 'none',
  borderRadius: 6,
  color: '#fff',
  padding: '8px 18px',
  cursor: 'pointer'
};

const welcomeCard = {
  background: 'linear-gradient(to right, #5B86E5, #8E54E9)',
  color: '#fff',
  padding: '30px',
  borderRadius: '10px',
  marginBottom: '40px'
};

const notificationBtn = {
  backgroundColor: '#fff',
  color: '#5B86E5',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px'
};

const statCard = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
};

const iconBox = {
  fontSize: '30px'
};

const statNumber = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginTop: '5px'
};

export default AlumniHomePage;
