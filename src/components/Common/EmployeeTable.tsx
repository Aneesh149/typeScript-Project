import React from 'react';

interface TableProps {
  headers: string[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
  className?: string;
}

const EmployeeTable: React.FC<TableProps> = ({ 
  headers, 
  data, 
  renderRow,
  className = ""
}) => {
  return (
    <div className={`table-container ${className}`}>
      <table className="common-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => renderRow(item, index))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable; 