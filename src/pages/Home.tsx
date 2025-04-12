import React from 'react';
// import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Common/Navbar';
import Sidebar from '../components/Common/Sidebar';

const Home: React.FC = () => {
  // const { token } = useAuth();

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <h1 className="page-title">Welcome to Home Page</h1>
          <p className="welcome-text">
            This is a protected route that only authenticated users can access.
            Navigate using the sidebar to explore other sections of the application.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Home; 