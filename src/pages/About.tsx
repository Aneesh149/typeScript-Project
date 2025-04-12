import React from 'react';
import Navbar from '../components/Common/Navbar';
import Sidebar from '../components/Common/Sidebar';

const About: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <h1 className="page-title">About Us</h1>
          <div className="about-content">
            <p>
              Welcome to MyApp! We are a dedicated team of professionals committed to delivering 
              high-quality software solutions to our clients.
            </p>
            <p>
              Founded in 2023, our mission is to create user-friendly applications that solve 
              real-world problems and enhance productivity for our users.
            </p>
            <h2>Our Team</h2>
            <div className="team-section">
              <div className="team-member">
                <h3>John Doe</h3>
                <p>CEO & Founder</p>
              </div>
              <div className="team-member">
                <h3>Jane Smith</h3>
                <p>Lead Developer</p>
              </div>
              <div className="team-member">
                <h3>Mike Johnson</h3>
                <p>UX Designer</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default About; 