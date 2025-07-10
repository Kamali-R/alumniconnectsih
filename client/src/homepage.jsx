import React from "react";

const HomePage = () => (
  <>
    <style>{`
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background-color: #EAE6F8;
      }
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #fff;
        padding: 18px 40px;
        box-shadow: 0 4px 20px rgba(44, 62, 80, 0.08);
        border-radius: 0 0 18px 18px;
      }
      .logo-title {
        display: flex;
        align-items: center;
        gap: 14px;
      }
      .logo {
        width: 42px;
        height: 42px;
        background: #B76E79;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        color: #fff;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(183, 110, 121, 0.15);
      }
      .site-name {
        font-size: 1.7rem;
        color: #2C3E50;
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
        color: #2E2E2E;
        font-weight: 600;
        font-size: 1.05rem;
        transition: color 0.2s;
      }
      .nav-links a:hover {
        color: #B76E79;
      }
      .register-btn {
        margin-left: 30px;
        padding: 9px 26px;
        background: #2C3E50;
        color: #fff;
        border: none;
        border-radius: 7px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s;
      }
      .register-btn:hover {
        background: #B76E79;
      }
      .hero-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 78vh;
        background: linear-gradient(120deg, #eae6f8 60%, #fff 100%);
        padding: 40px 0 0 0;
      }
      .hero-title {
        font-size: 2.6rem;
        color: #2C3E50;
        font-weight: 800;
        text-align: center;
        margin-bottom: 14px;
        letter-spacing: 1px;
      }
      .hero-subtitle {
        font-size: 1.25rem;
        color: #5a5a5a;
        text-align: center;
        margin-bottom: 32px;
        max-width: 520px;
      }
      .cta-btn {
        padding: 14px 38px;
        background: #B76E79;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.3s;
        box-shadow: 0 2px 12px rgba(183, 110, 121, 0.13);
      }
      .cta-btn:hover {
        background: #2C3E50;
      }
      .decorative-shape {
        position: absolute;
        z-index: 0;
        opacity: 0.13;
      }
      .shape1 {
        top: 100px;
        left: 40px;
        width: 120px;
        height: 120px;
        background: #B76E79;
        border-radius: 50%;
      }
      .shape2 {
        bottom: 70px;
        right: 60px;
        width: 90px;
        height: 90px;
        background: #2C3E50;
        border-radius: 50%;
      }
      @media (max-width: 600px) {
        .navbar { flex-direction: column; gap: 18px; padding: 18px 10px; }
        .hero-title { font-size: 2rem; }
        .hero-section { padding: 20px 0; }
      }
    `}</style>

    <div className="navbar">
      <div className="logo-title">
        <div className="logo">AC</div>
        <span className="site-name">Alumni Connect</span>
      </div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <button className="register-btn">Register / Login</button>
      </div>
    </div>

    <div className="hero-section">
      <div className="hero-title">Welcome to Alumni Connect</div>
      <div className="hero-subtitle">
        Reconnect, network, and grow with your alumni community.<br />
        Stay updated, share your journey, and discover opportunities together.
      </div>
      <button className="cta-btn">Join the Community</button>
    </div>

    {/* Decorative shapes */}
    <div className="decorative-shape shape1" style={{position:'fixed'}}></div>
    <div className="decorative-shape shape2" style={{position:'fixed'}}></div>
  </>
);

export default HomePage;
