import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomView from '../../components/Common/CustomView';

interface EmployeeViewProps {
  employee: {
    id?: string;
    employeeId: string;
    fullName: string;
    email: string;
    contactNumber: string;
    department: string;
    designation: string;
    status: string;
    lastLogin?: string;
  };
}

const EmployeeView: React.FC<EmployeeViewProps> = ({ employee }) => {
  const navigate = useNavigate();

  if (!employee) {
    return <div>Employee data not found</div>;
  }

  const handleEditClick = () => {
    // Create a copy of the employee to pass as the employee prop, not ViewEmployee
    navigate('/add-employee', {
      state: {
        employee: {
          id: employee?.id,
          employeeId: employee?.employeeId,
          fullName: employee?.fullName,
          email: employee?.email,
          contactNumber: employee?.contactNumber,
          department: employee?.department,
          designation: employee?.designation,
          status: employee?.status,
          lastLogin: employee?.lastLogin
        }
      }
    });
  };

  return (
    <div className="employee-view-container bg-white rounded-md shadow-sm p-6">
      <div className="employee-header mb-6 pb-4 border-b">
        <div className="avatar-container mb-4 flex items-center">
          <div className="employee-avatar w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600 mr-4">
            {employee.fullName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{employee.fullName}</h2>
            <p className="text-gray-500">{employee.designation} • {employee.department}</p>
          </div>
        </div>
        <div className={`status-badge inline-block px-3 py-1 rounded-full text-sm ${employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {employee.status}
        </div>
      </div>

      <div className="employee-details grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomView
          label="Employee ID"
          value={employee.employeeId}
        />

        <CustomView
          label="Full Name"
          value={employee.fullName}
        />

        <CustomView
          label='Email'
          value={employee.email}
        />

        <CustomView
          label="Contact Number"
          value={employee.contactNumber}
        />

        <CustomView
          label="Department"
          value={employee.department}
        />

        <CustomView
          label="Designation"
          value={employee.designation}
        />

        {employee.lastLogin && (
          <CustomView
            label="Last Login"
            value={employee.lastLogin}
          />
        )}
      </div>

      <div className="form-actions mt-8">
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <button
          type="button"
          className="save-button ml-4"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EmployeeView; 