import React from 'react';

const AlumniHomePage = () => {
  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#F8F9FC' }}>
      {/* Navbar */}
      <header style={headerStyle}>
        <h2 style={{ margin: 0, color: '#4f46e5' }}>Alumni<span style={{ color: '#111827' }}>Connect</span></h2>
        <nav style={navStyle}>
          <a href="#" style={navLink}>Home</a>
          <a href="#" style={navLink}>About</a>
          <a href="#" style={navLink}>Contact</a>
          <button style={buttonStyle}>Register / Login</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={heroSection}>
        <div style={heroContent}>
          <h1 style={{ fontSize: '38px', marginBottom: 10 }}>Connect with your college community like never before</h1>
          <p style={{ fontSize: '18px', color: '#E0E7FF' }}>Build lasting relationships, explore opportunities, and stay informed with AlumniConnect.</p>
          <div style={{ marginTop: 20 }}>
            <button style={buttonStyle}>Get Started</button>
            <button style={{ ...buttonStyle, background: '#111827', marginLeft: 10 }}>Learn More</button>
          </div>
        </div>
        <img src="https://via.placeholder.com/300x200" alt="Hero Illustration" style={{ maxWidth: '100%' }} />
      </section>

      {/* Roles Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Who Benefits from AlumniConnect?</h2>
        <div style={cardGrid}>
          {roles.map((role, i) => (
            <div key={i} style={card}>
              <h4>{role.title}</h4>
              <p>{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Special Features</h2>
        <div style={cardGrid}>
          {features.map((f, i) => (
            <div key={i} style={card}>
              <h4>{f.title}</h4>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section style={aboutSection}>
        <div>
          <h2 style={sectionTitle}>About Alumni Connect</h2>
          <p>Our mission is to empower alumni and students to collaborate, network, and grow together.</p>
          <div style={statsGrid}>
            <div><h3>10,000+</h3><p>Users</p></div>
            <div><h3>500+</h3><p>Events</p></div>
            <div><h3>2,000+</h3><p>Jobs Posted</p></div>
            <div><h3>95%</h3><p>Satisfaction Rate</p></div>
          </div>
        </div>
        <img src="https://via.placeholder.com/250x200" alt="Community Illustration" />
      </section>

      {/* Testimonials */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>What Our Users Say</h2>
        <div style={cardGrid}>
          {testimonials.map((t, i) => (
            <div key={i} style={card}>
              <p>"{t.feedback}"</p>
              <p><strong>- {t.name}</strong></p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={sectionStyle}>
        <h2 style={sectionTitle}>Get in Touch</h2>
        <div style={contactGrid}>
          <div>
            <h4>Contact Information</h4>
            <p>Email: support@alumniconnect.com</p>
            <p>Phone: +91 9876543210</p>
            <p>Socials: Facebook | Instagram | LinkedIn</p>
          </div>
          <div>
            <input type="text" placeholder="Your Name" style={inputStyle} /><br />
            <input type="email" placeholder="Your Email" style={inputStyle} /><br />
            <textarea placeholder="Your Message" style={{ ...inputStyle, height: '100px' }} /><br />
            <button style={buttonStyle}>Send Message</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div>
          <h3>AlumniConnect</h3>
          <p>Building Bridges Beyond Graduation</p>
        </div>
        <div>
          <h4>Links</h4>
          <a href="#" style={footerLink}>Privacy</a><br />
          <a href="#" style={footerLink}>Terms</a><br />
          <a href="#" style={footerLink}>FAQs</a>
        </div>
        <div>
          <h4>Subscribe</h4>
          <input placeholder="Email Address" style={inputStyle} />
        </div>
        <div style={{ textAlign: 'center', width: '100%', marginTop: 30, fontSize: 14, color: '#ccc' }}>
          © 2025 AlumniConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const headerStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};
const navStyle = { display: 'flex', gap: '25px', alignItems: 'center' };
const navLink = { textDecoration: 'none', color: '#374151', fontWeight: 500 };
const buttonStyle = { padding: '10px 18px', backgroundColor: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' };

const heroSection = { background: '#4f46e5', color: '#fff', padding: '60px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' };
const heroContent = { maxWidth: '600px' };

const sectionStyle = { padding: '60px 40px', backgroundColor: '#F8F9FC' };
const sectionTitle = { fontSize: 28, marginBottom: 30, textAlign: 'center' };
const cardGrid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' };
const card = { background: '#fff', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' };

const aboutSection = { ...sectionStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' };
const statsGrid = { display: 'flex', justifyContent: 'space-between', marginTop: 20, gap: '30px', flexWrap: 'wrap' };

const contactGrid = { display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap' };
const inputStyle = { padding: '10px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc', width: '100%' };

const footerStyle = { background: '#111827', color: '#fff', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' };
const footerLink = { color: '#fff', textDecoration: 'none', lineHeight: '24px' };

const roles = [
  { title: 'Alumni', description: 'Reconnect, mentor, and explore career opportunities.' },
  { title: 'Students', description: 'Get guidance, access alumni resources, and grow professionally.' },
  { title: 'Admins', description: 'Manage platform users, content, and engagement.' }
];

const features = [
  { title: 'Job Postings', description: 'Share and explore career opportunities.' },
  { title: 'Events', description: 'Join webinars, reunions, and virtual meetups.' },
  { title: 'Secure Profiles', description: 'Protect your information while networking.' },
  { title: 'Message Board', description: 'Engage in community discussions and announcements.' }
];

const testimonials = [
  { name: 'Asha', feedback: 'AlumniConnect helped me find my first mentor and job!' },
  { name: 'Rahul', feedback: 'Great way to stay in touch with my batchmates!' },
  { name: 'Divya', feedback: 'Simple, secure, and full of opportunities.' }
];

export default AlumniHomePage;
