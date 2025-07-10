import React from "react";

const HomePage = () => (
  <>
    <style>{`
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background-color: #f4f7fa;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #1a1a40;
        padding: 16px 40px;
        color: #fff;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }
      .logo-title {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .logo {
        width: 48px;
        height: 48px;
        background: #e94560;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        font-weight: bold;
        color: white;
      }
      .site-name {
        font-size: 1.8rem;
        font-weight: 700;
        letter-spacing: 1px;
      }
      .nav-links {
        display: flex;
        align-items: center;
        gap: 28px;
      }
      .nav-links a {
        text-decoration: none;
        color: #fff;
        font-weight: 500;
        transition: color 0.2s;
      }
      .nav-links a:hover {
        color: #e94560;
      }
      .register-btn {
        padding: 9px 20px;
        background: #e94560;
        border: none;
        border-radius: 6px;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }
      .register-btn:hover {
        background: #ff6f91;
      }
      .hero-section {
        background: url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b') no-repeat center center/cover;
        min-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
        padding: 20px;
      }
      .hero-title {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 16px;
      }
      .hero-subtitle {
        font-size: 1.2rem;
        max-width: 600px;
        margin-bottom: 30px;
      }
      .cta-btn {
        padding: 14px 30px;
        background: #e94560;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        color: white;
        cursor: pointer;
        font-weight: bold;
      }
      .cta-btn:hover {
        background: #ff6f91;
      }
      .features-section {
        background-color: #fff;
        padding: 60px 20px;
        text-align: center;
      }
      .features-section h2 {
        font-size: 2.2rem;
        margin-bottom: 40px;
        color: #1a1a40;
      }
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        max-width: 1100px;
        margin: 0 auto;
      }
      .feature-card {
        background: #f0f0f5;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.07);
        transition: transform 0.3s ease;
      }
      .feature-card:hover {
        transform: translateY(-5px);
      }
      .feature-card h3 {
        margin-top: 10px;
        font-size: 1.3rem;
        color: #2c3e50;
      }
      .feature-card p {
        color: #555;
        font-size: 0.95rem;
      }
      @media (max-width: 600px) {
        .hero-title { font-size: 2.2rem; }
        .hero-subtitle { font-size: 1rem; }
        .navbar { flex-direction: column; gap: 12px; padding: 14px; }
      }
    `}</style>

    <div className="navbar">
      <div className="logo-title">
        <div className="logo">AC</div>
        <span className="site-name">Alumni Connect</span>
      </div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Events</a>
        <a href="#">Contact</a>
        <button className="register-btn">Login / Sign Up</button>
      </div>
    </div>

    <div className="hero-section">
      <div className="hero-title">Welcome to Alumni Connect</div>
      <div className="hero-subtitle">
        A place to reconnect with your alumni, grow your professional network, and share your achievements.
      </div>
      <button className="cta-btn">Explore Now</button>
    </div>

    <div className="features-section">
      <h2>Explore Our Features</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Alumni Directory</h3>
          <p>Search and connect with your batchmates and senior alumni easily.</p>
        </div>
        <div className="feature-card">
          <h3>Events & Meetups</h3>
          <p>Stay updated on upcoming reunions, webinars, and meetups.</p>
        </div>
        <div className="feature-card">
          <h3>Career Support</h3>
          <p>Find job openings and mentorship from experienced alumni.</p>
        </div>
        <div className="feature-card">
          <h3>Stories & Memories</h3>
          <p>Share and read stories, achievements, and memorable college moments.</p>
        </div>
        <div className="feature-card">
          <h3>Chat & Messaging</h3>
          <p>Message and keep in touch with your friends and connections.</p>
        </div>
        <div className="feature-card">
          <h3>Admin Dashboard</h3>
          <p>Manage users, events, and announcements with ease.</p>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;