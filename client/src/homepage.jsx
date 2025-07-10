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
          <a href="#" style={navLinkStyle}>Home</a>
          <a href="#" style={navLinkStyle}>About</a>
          <a href="#" style={navLinkStyle}>Contact</a>
          <button style={logoutBtnStyle}>Register / Login</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={welcomeCard}>
        <h1 style={{ fontSize: '36px' }}>Welcome to Alumni Connect</h1>
        <p style={{ fontSize: '18px', marginTop: '10px' }}>
          A platform that connects Alumni, Students, and Admins for meaningful collaboration, guidance, and growth.
        </p>
      </section>

      {/* User Roles Features */}
      <section style={featuresSectionStyle}>
        <h2 style={sectionTitle}>Why Choose Alumni Connect?</h2>
        <div style={statsGrid}>
          <div style={{ ...statCard, borderLeft: '6px solid #007bff' }}>
            <div style={iconBox}>👨‍🎓</div>
            <div>
              <h4>For Alumni</h4>
              <p>Stay connected, mentor students, and access opportunities to give back.</p>
            </div>
          </div>

          <div style={{ ...statCard, borderLeft: '6px solid #28a745' }}>
            <div style={iconBox}>🎓</div>
            <div>
              <h4>For Students</h4>
              <p>Get mentorship, explore jobs, and connect with experienced alumni.</p>
            </div>
          </div>

          <div style={{ ...statCard, borderLeft: '6px solid #6610f2' }}>
            <div style={iconBox}>🛠️</div>
            <div>
              <h4>For Admins</h4>
              <p>Manage users, events, and monitor platform engagement easily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Features */}
      <section style={topFeatureSection}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '30px' }}>Top Features</h2>
        <div style={topFeaturesGrid}>
          {topFeatures.map((feature, index) => (
            <div key={index} style={topFeatureCard}>
              <img src="https://cdn-icons-png.flaticon.com/512/929/929426.png" alt="feature-icon" style={{ width: '50px', marginBottom: '10px' }} />
              <h4 style={{ marginBottom: '10px' }}>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div style={{ flex: 1 }}>
          <h3>Alumni Connect</h3>
          <p>Empowering alumni and students to build lifelong connections.</p>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Quick Links</h4>
          <a href="#" style={footerLink}>Privacy Policy</a><br />
          <a href="#" style={footerLink}>Terms & Conditions</a><br />
          <a href="#" style={footerLink}>Help</a>
        </div>
        <div style={{ flex: 1 }}>
          <h4>Subscribe</h4>
          <input placeholder="Email Address" style={subscribeInput} />
        </div>
        <div style={{ width: '100%', textAlign: 'center', marginTop: 30, fontSize: 14, color: '#999' }}>
          © 2025 Alumni Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

// Top Features Data
const topFeatures = [
  { title: 'Easy to Use', description: 'Stay informed and connected through this modern alumni platform.' },
  { title: 'Secure Profiles', description: 'Stay informed and connected through this modern alumni platform.' },
  { title: 'Job Posts', description: 'Stay informed and connected through this modern alumni platform.' },
  { title: 'Event Invites', description: 'Stay informed and connected through this modern alumni platform.' }
];

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
  padding: '60px',
  textAlign: 'center'
};

const featuresSectionStyle = {
  padding: '60px 40px',
  textAlign: 'center',
  background: '#F8F9FC'
};
const sectionTitle = { fontSize: 30, marginBottom: 30 };
const statsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '20px',
  marginTop: '20px'
};

const statCard = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '15px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  textAlign: 'left'
};

const iconBox = {
  fontSize: '30px'
};

const topFeatureSection = {
  background: '#f9fbfd',
  padding: '60px 40px'
};

const topFeaturesGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  justifyItems: 'center'
};

const topFeatureCard = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  textAlign: 'center'
};

const footerStyle = {
  background: '#2C3E50',
  color: '#fff',
  padding: '40px 60px',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
};

const footerLink = {
  color: '#fff',
  textDecoration: 'none',
  lineHeight: '24px'
};

const subscribeInput = {
  padding: '8px',
  borderRadius: 6,
  border: 'none',
  marginTop: '10px',
  width: '200px'
};

export default AlumniHomePage;
