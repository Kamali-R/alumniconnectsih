import React from 'react';

const AlumniHomePage = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#F8F9FC', minHeight: '100vh' }}>
      {/* Navbar */}
      <header style={headerStyle}>
        <h2 style={{ margin: 0, color: '#007bff' }}>Alumni<span style={{ color: '#000' }}>Connect</span></h2>
        <nav style={navStyle}>
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

      {/* About Section */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>About Alumni Connect</h2>
        <p style={textCenter}>Our mission is to foster a vibrant community between alumni and current students, enhancing career guidance and institutional pride.</p>
      </section>

      {/* News Section */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>Latest News & Announcements</h2>
        <ul style={bulletList}>
          <li>🎓 Congratulations to the 2025 graduates!</li>
          <li>🏆 Notable alumna wins national award in AI research.</li>
          <li>📣 Student startup gets featured in national press.</li>
        </ul>
      </section>

      {/* Events Section */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>Upcoming Events</h2>
        <ul style={bulletList}>
          <li>🤝 Alumni-Student Networking Meet – Aug 10</li>
          <li>💼 Career Development Workshop – Sep 5</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>Alumni Stories & Testimonials</h2>
        <blockquote style={quoteBlock}>"Thanks to Alumni Connect, I got mentored by industry professionals and landed my dream internship!" – Priya S., IT 2023</blockquote>
        <blockquote style={quoteBlock}>"Reconnecting with my batchmates through this platform has been an incredible journey." – Arjun R., CSE 2018</blockquote>
      </section>

      {/* Volunteering Section */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>Contribute & Volunteer</h2>
        <p style={textCenter}>Support initiatives or become a mentor to help shape the next generation. <a href="#" style={navLinkStyle}>Learn how to get involved</a>.</p>
      </section>

      {/* General Resources */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>General Resources</h2>
        <ul style={bulletList}>
          <li><a href="#" style={navLinkStyle}>FAQs</a></li>
          <li><a href="#" style={navLinkStyle}>Help Center</a></li>
          <li><a href="#" style={navLinkStyle}>About the Institution</a></li>
        </ul>
      </section>

      {/* Media Highlights */}
      <section style={infoSection}>
        <h2 style={sectionTitle}>Media Highlights</h2>
        <p style={textCenter}>📸 Glimpses from last year's alumni meet and student projects showcase.</p>
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

// Reuse styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 60px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
};

const navStyle = { display: 'flex', gap: '30px', alignItems: 'center' };
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

const infoSection = {
  backgroundColor: '#fff',
  padding: '50px 60px',
  borderBottom: '1px solid #eee'
};
const sectionTitle = { fontSize: '24px', textAlign: 'center', marginBottom: '20px' };
const textCenter = { textAlign: 'center', fontSize: '16px', maxWidth: '800px', margin: 'auto' };
const bulletList = { listStyle: 'none', textAlign: 'center', padding: 0, lineHeight: '2em', fontSize: '16px' };
const quoteBlock = { fontStyle: 'italic', marginBottom: '20px', textAlign: 'center', color: '#555' };

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

const topFeatures = [
  { title: 'Easy to Use', description: 'Stay informed and connected through this modern alumni platform.' },
  { title: 'Secure Profiles', description: 'Stay informed and connected through this modern alumni platform.' },
  { title: 'Job Posts', description: 'Stay informed and connected through this modern alumni platform.' },
  { title: 'Event Invites', description: 'Stay informed and connected through this modern alumni platform.' }
];

export default AlumniHomePage;
