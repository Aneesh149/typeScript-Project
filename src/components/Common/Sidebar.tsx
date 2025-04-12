import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>MyApp</h3>
      </div>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <button
            className="sidebar-button"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li className="sidebar-item">
          <button
            className="sidebar-button"
            onClick={() => navigate('/about')}
          >
            About Us
          </button>
        </li>
        <li className="sidebar-item">
          <button
            className="sidebar-button"
            onClick={() => navigate('/employees')}
          >
            Employees
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 