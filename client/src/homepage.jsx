import React from 'react';

const AlumniHomePage = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#F8F9FC', margin: 0 }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 60px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo192.png" alt="logo" style={{ height: 40, marginRight: 10 }} />
          <h2 style={{ margin: 0, color: '#6A11CB' }}>Alumni Connect</h2>
        </div>
        <nav style={{ display: 'flex', gap: 30 }}>
          <a href="#" style={navLinkStyle}>Home</a>
          <a href="#" style={navLinkStyle}>About</a>
          <a href="#" style={navLinkStyle}>Contact</a>
          <button style={loginBtnStyle}>Register / Login</button>
        </nav>
      </header>

      {/* Hero */}
      <section style={heroSectionStyle}>
        <div style={{ maxWidth: 600 }}>
          <h1 style={heroTitle}>Connect. Share. Inspire.</h1>
          <p style={heroText}>Join the alumni network of your institution and stay updated, inspired, and connected!</p>
          <button style={downloadBtnStyle}>Get Started</button>
        </div>
        <img
          src="https://cdn.dribbble.com/users/214929/screenshots/15373138/media/df34e59b17b70985b2e2fdb34c3ad00b.png"
          alt="phone"
          style={{ height: 300 }}
        />
      </section>

      {/* Features */}
      <section style={featuresSectionStyle}>
        <h2 style={sectionTitle}>Top Features</h2>
        <div style={featureGrid}>
          {['Easy to Use', 'Secure Profiles', 'Job Posts', 'Event Invites'].map((text, index) => (
            <div key={index} style={featureCard}>
              <div style={featureIcon}>🎯</div>
              <h4>{text}</h4>
              <p>Stay informed and connected through this modern alumni platform.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={pricingSectionStyle}>
        <h2 style={sectionTitle}>Simple Pricing</h2>
        <div style={pricingGrid}>
          {[1, 2, 3].map((plan) => (
            <div key={plan} style={pricingCard}>
              <h3>Plan {plan}</h3>
              <p style={{ fontSize: 24, fontWeight: 'bold' }}>$0/month</p>
              <ul>
                <li>Profile Listing</li>
                <li>Event Access</li>
                <li>Job Boards</li>
              </ul>
              <button style={planBtnStyle}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      {/* App Available Section */}
      <section style={downloadAppSection}>
        <div>
          <h2 style={{ color: '#fff' }}>Download the Alumni Connect App</h2>
          <p style={{ color: '#fff' }}>Access your alumni network anytime, anywhere.</p>
          <button style={{ ...planBtnStyle, backgroundColor: '#fff', color: '#6A11CB' }}>
            Download Now
          </button>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828506.png"
          alt="app"
          style={{ height: 200 }}
        />
      </section>

      {/* Contact CTA */}
      <section style={contactSectionStyle}>
        <h2>Say Hello To The Alumni Collaboration Hub.</h2>
        <button style={downloadBtnStyle}>Contact Us</button>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div>
          <h3>Alumni Connect</h3>
          <p>Building bridges between past and present students.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="#" style={footerLink}>Privacy</a><br />
          <a href="#" style={footerLink}>Terms</a><br />
          <a href="#" style={footerLink}>Help</a>
        </div>
        <div>
          <h4>Subscribe</h4>
          <input placeholder="Email Address" style={subscribeInput} />
        </div>
        <p style={{ textAlign: 'center', marginTop: 30, fontSize: 14, color: '#999' }}>
          © 2025 Alumni Connect. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

// Style Objects
const navLinkStyle = { textDecoration: 'none', color: '#2C3E50', fontWeight: 500 };
const loginBtnStyle = {
  backgroundColor: '#6A11CB',
  border: 'none',
  borderRadius: 6,
  color: '#fff',
  padding: '8px 18px',
  cursor: 'pointer'
};

const heroSectionStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '80px 60px',
  background: 'linear-gradient(to right, #6A11CB, #2575FC)',
  color: '#fff'
};

const heroTitle = { fontSize: '40px', marginBottom: 20 };
const heroText = { fontSize: '18px', maxWidth: 500 };
const downloadBtnStyle = {
  backgroundColor: '#fff',
  color: '#6A11CB',
  padding: '12px 24px',
  border: 'none',
  borderRadius: 6,
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: 20
};

const featuresSectionStyle = {
  padding: '60px 40px',
  textAlign: 'center',
  background: '#F8F9FC'
};
const sectionTitle = { fontSize: 30, marginBottom: 30 };
const featureGrid = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: 30
};
const featureCard = {
  width: 250,
  background: '#fff',
  padding: 20,
  borderRadius: 10,
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
};
const featureIcon = {
  fontSize: 40,
  marginBottom: 10
};

const pricingSectionStyle = {
  padding: '60px 40px',
  textAlign: 'center',
  background: '#fff'
};
const pricingGrid = {
  display: 'flex',
  justifyContent: 'center',
  gap: 30,
  marginTop: 30
};
const pricingCard = {
  width: 220,
  background: '#F4F4F4',
  padding: 30,
  borderRadius: 10,
  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  textAlign: 'center'
};
const planBtnStyle = {
  backgroundColor: '#6A11CB',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: 6,
  marginTop: 15,
  cursor: 'pointer'
};

const downloadAppSection = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '60px 40px',
  background: 'linear-gradient(to right, #6A11CB, #2575FC)'
};

const contactSectionStyle = {
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: '#F2F6FA'
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
