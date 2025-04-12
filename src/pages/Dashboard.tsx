import React from 'react';
import Navbar from '../components/Common/Navbar';
import Sidebar from '../components/Common/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <h1 className="page-title">Dashboard</h1>
          <div className="dashboard-content">
            <p>Welcome to your dashboard! Here you can see your important data and metrics.</p>
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>Users</h3>
                <p className="card-value">1,254</p>
              </div>
              <div className="dashboard-card">
                <h3>Revenue</h3>
                <p className="card-value">$10,245</p>
              </div>
              <div className="dashboard-card">
                <h3>Orders</h3>
                <p className="card-value">354</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 