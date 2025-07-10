import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="form-container">
      <h2>Alumni Connect</h2>
      <div className="step active">
        <p>
          Welcome to the official platform of our alumni network. Our app supports three types of users:
        </p>
        <ul>
          <li><strong>Students</strong> – Register, log in, and access your profile. Explore mentorships, events, and alumni connections.</li>
          <li><strong>Alumni</strong> – Stay connected with your college community. Share experiences, update career info, and help current students.</li>
          <li><strong>Admin</strong> – Manage users, monitor activity, and ensure smooth operation of the portal.</li>
        </ul>
        <p>
          Each user must register and log in to access their personalized dashboard and features.
        </p>
        <div className="info-message">
          You must log in or register to access the platform. Click the button below to get started.
        </div>
        <button>Register / Login</button>
      </div>
    </div>
  );
};

export default HomePage;