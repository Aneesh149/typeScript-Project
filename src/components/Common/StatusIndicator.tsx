import React from 'react';

interface StatusIndicatorProps {
  status: string;
  // activeValue?: string;
  // className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  // activeValue = 'Active',
  // className = '' 
}) => {
  const isActive = status === 'Active';
  
  return (
    <div className={`status-indicator ${isActive ? 'active' : 'inactive'}`}>
      <span className="status-dot"></span>
      <span>{status}</span>
    </div>
  );
};

export default StatusIndicator; 