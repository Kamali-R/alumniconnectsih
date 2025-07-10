import React from 'react';
import logo from './logo.jpeg'; // Place your logo in src and update the path if needed

const HomePage = () => {
  const styles = {
    body: {
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#EAE6F8',
      margin: 0,
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '15px 40px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
    },
    logo: {
      height: '40px',
      marginRight: '12px',
    },
    appName: {
      color: '#2C3E50',
      margin: 0,
      fontSize: '24px',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    },
    navLink: {
      textDecoration: 'none',
      color: '#2C3E50',
      fontWeight: 500,
      cursor: 'pointer',
    },
    loginBtn: {
      padding: '8px 16px',
      backgroundColor: '#2C3E50',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    loginBtnHover: {
      backgroundColor: '#B76E79',
    },
    hero: {
      textAlign: 'center',
      marginTop: '100px',
      padding: '40px',
    },
    heroTitle: {
      color: '#2C3E50',
      fontSize: '32px',
    },
    heroText: {
      color: '#555',
      fontSize: '18px',
      marginBottom: '30px',
    },
    exploreBtn: {
      backgroundColor: '#2C3E50',
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.body}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <img src={logo} alt="Alumni Connect" style={styles.logo} />
          <h1 style={styles.appName}>Alumni Connect</h1>
        </div>
        <nav style={styles.navLinks}>
          <a style={styles.navLink} href="#">Home</a>
          <a style={styles.navLink} href="#">About</a>
          <a style={styles.navLink} href="#">Contact</a>
          <button
            style={styles.loginBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#B76E79'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2C3E50'}
          >
            Register / Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main style={styles.hero}>
        <h2 style={styles.heroTitle}>Stay Connected. Grow Together.</h2>
        <p style={styles.heroText}>
          Join our alumni network to reconnect, collaborate, and inspire future generations.
        </p>
        <button style={styles.exploreBtn}>Explore Now</button>
      </main>
    </div>
  );
};

export default HomePage;
