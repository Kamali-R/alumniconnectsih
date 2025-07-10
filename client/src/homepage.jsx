import React from "react";

const HomePage = () => (
  <>
    <style>{`
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background-color: #f8f9fb;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #2C3E50;
        padding: 16px 40px;
        color: #fff;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      }
      .logo-title {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .logo {
        width: 42px;
        height: 42px;
        background: #E94560;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        font-weight: bold;
        color: white;
      }
      .site-name {
        font-size: 1.7rem;
        font-weight: 700;
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
        color: #E94560;
      }
      .register-btn {
        padding: 8px 18px;
        background: #E94560;
        border: none;
        border-radius: 6px;
        color: white;
        font-weight: bold;
        cursor: pointer;
      }
      .hero-section {
        background: url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f') no-repeat center center/cover;
        min-height: 80vh;
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
        font-size: 1.3rem;
        max-width: 600px;
        margin-bottom: 20px;
      }
      .content-section {
        padding: 60px 30px;
        background: #ffffff;
        color: #2C3E50;
        text-align: center;
      }
      .content-section h2 {
        font-size: 2.2rem;
        margin-bottom: 30px;
      }
      .user-roles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 40px;
        max-width: 1100px;
        margin: 0 auto;
      }
      .role-card {
        background: #f2f4f7;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease;
      }
      .role-card:hover {
        transform: translateY(-6px);
      }
      .role-card h3 {
        font-size: 1.4rem;
        margin-bottom: 12px;
        color: #E94560;
      }
      .role-card p {
        font-size: 1rem;
        color: #555;
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
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button className="register-btn">Register / Login</button>
      </div>
    </div>

    <div className="hero-section">
      <div className="hero-title">Welcome to Alumni Connect</div>
      <div className="hero-subtitle">
        Bringing Students, Alumni, and Administrators Together On One Platform.
      </div>
    </div>

    <div className="content-section">
      <h2>Who Can Use This Platform?</h2>
      <div className="user-roles">
        <div className="role-card">
          <h3>Students</h3>
          <p>Students can register, connect with alumni, apply for mentorship, attend events, and view job opportunities shared by alumni.</p>
        </div>
        <div className="role-card">
          <h3>Alumni</h3>
          <p>Alumni can share their stories, post job openings, offer mentorship, organize reunions, and stay in touch with their college community.</p>
        </div>
        <div className="role-card">
          <h3>Admins</h3>
          <p>Admins manage users, approve content, oversee events, and maintain a secure and engaging environment for everyone.</p>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;