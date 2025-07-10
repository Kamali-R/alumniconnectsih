import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: '#f6f8fb'
  },
  titleBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#003366',
    color: '#fff',
    padding: '1rem 2rem'
  },
  appName: {
    fontSize: '2rem',
    fontWeight: 'bold',
    letterSpacing: '1px'
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1.1rem'
  },
  loginBtn: {
    background: '#fff',
    color: '#003366',
    padding: '0.5rem 1.2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginLeft: '2rem',
    border: 'none',
    transition: 'background 0.2s, color 0.2s',
    cursor: 'pointer'
  },
  main: {
    flex: 1,
    padding: '2.5rem 1.5rem 1rem 1.5rem',
    maxWidth: 800,
    margin: '0 auto',
    width: '100%'
  },
  section: {
    marginBottom: '2.5rem'
  },
  benefitHeader: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#003366'
  },
  userTypeContainer: {
    display: 'flex',
    gap: '2.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  userTypeCard: {
    background: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    borderRadius: 10,
    padding: '1.5rem',
    minWidth: 260,
    maxWidth: 340,
    flex: 1
  },
  userTypeTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#134080',
    marginBottom: '0.5rem'
  },
  statsSection: {
    margin: '2.5rem 0',
    textAlign: 'center',
    background: '#e8ecf4',
    borderRadius: 8,
    padding: '1.5rem 0'
  },
  statsNumbers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '3rem',
    marginTop: '1rem'
  },
  statsBox: {
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 1px 5px rgba(0,0,0,0.09)',
    padding: '1rem 2.5rem',
    minWidth: 120
  },
  statsLabel: {
    fontWeight: 500,
    color: '#003366'
  },
  statsValue: {
    fontWeight: 'bold',
    fontSize: '2rem',
    color: '#134080'
  },
  copyright: {
    background: '#f1f1f1',
    textAlign: 'center',
    color: '#555',
    padding: '1rem',
    fontSize: '0.97rem',
    marginTop: 'auto'
  }
};

// Dummy values for stats, you can replace with dynamic values as needed
const STUDENT_COUNT = 325;
const ALUMNI_COUNT = 412;

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Title Bar */}
      <header style={styles.titleBar}>
        <div style={styles.appName}>Alumni Connect</div>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/login" style={styles.loginBtn}>Register / Login</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Who can benefit */}
        <section style={styles.section}>
          <h2 style={styles.benefitHeader}>Who Can Benefit from Alumni Connect?</h2>
          <div style={styles.userTypeContainer}>
            <div style={styles.userTypeCard}>
              <div style={styles.userTypeTitle}>🎓 Students</div>
              <div>
                <ul>
                  <li>Connect with alumni for career guidance & mentorship</li>
                  <li>Explore job and internship opportunities posted by alumni</li>
                  <li>Stay updated with campus events and news</li>
                  <li>Build a strong professional network before graduation</li>
                </ul>
              </div>
            </div>
            <div style={styles.userTypeCard}>
              <div style={styles.userTypeTitle}>🎓 Alumni</div>
              <div>
                <ul>
                  <li>Reconnect with batchmates and faculty</li>
                  <li>Share job opportunities and mentor current students</li>
                  <li>Participate in alumni events and reunions</li>
                  <li>Give back to your alma mater and community</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={styles.statsSection}>
          <h3>Currently Enrolled</h3>
          <div style={styles.statsNumbers}>
            <div style={styles.statsBox}>
              <div style={styles.statsValue}>{STUDENT_COUNT}</div>
              <div style={styles.statsLabel}>Students</div>
            </div>
            <div style={styles.statsBox}>
              <div style={styles.statsValue}>{ALUMNI_COUNT}</div>
              <div style={styles.statsLabel}>Alumni</div>
            </div>
          </div>
        </section>
      </main>

      {/* Copyright */}
      <footer style={styles.copyright}>
        &copy; {new Date().getFullYear()} Alumni Connect. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;