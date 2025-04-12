import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import StatusIndicator from '../../components/Common/StatusIndicator';
import ActionButtons from '../../components/Common/ActionButtons';

const Employees: React.FC = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([
        {
            id: '1',
            name: 'Test 1',
            email: 'test@test.com',
            contactNumber: '008270063',
            department: 'Engineering',
            designation: 'Software Developer',
            lastLogin: '2023-10-15 09:30 AM',
            status: 'Active'
        },
        {
            id: '2',
            name: 'Test 2',
            email: 'test2test.com',
            contactNumber: '9876543210',
            department: 'Marketing',
            designation: 'Marketing Manager',
            lastLogin: '2023-10-14 02:15 PM',
            status: 'Inactive'
        },
        {
            id: '3',
            name: 'Test 3',
            email: 'test3@test.com',
            contactNumber: '555-123-4567',
            department: 'HR',
            designation: 'HR Specialist',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        }
    ]);

    const TableHeads = [
        "Employee ID",
        "Name",
        "Email",
        "Contact Number",
        "Department",
        "Designation",
        "Last Login",
        "Status",
        "Actions",
    ];

    return (
        <div className="page-container">
            <Navbar />
            <div className="content-wrapper">
                <Sidebar />
                <main className="main-content">
                    <div className="employees-wrapper">
                        <div className="page-header">
                            <h1 className="page-title">Employees</h1>
                            <button
                                className="add-employee-btn"
                                onClick={() => navigate('/add-employee')}
                            >
                                Add Employee
                            </button>
                        </div>
                        <div className="table-container">
                            <table className="employee-table">
                                <thead>
                                    <tr>
                                        {TableHeads.map((head, index) => (
                                            <th key={index}>{head}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee?.id}>
                                            <td>{employee?.id}</td>
                                            <td className="name-cell">
                                                {/* <div className="employee-avatar">
                          {employee.name.charAt(0)}
                        </div> */}
                                                {employee?.name}
                                            </td>
                                            <td>{employee?.email}</td>
                                            <td>{employee?.contactNumber}</td>
                                            <td>{employee?.department}</td>
                                            <td>{employee?.designation}</td>
                                            <td>{employee?.lastLogin}</td>
                                            <td>
                                                <StatusIndicator status={employee?.status} />
                                            </td>
                                            <td>
                                                <ActionButtons
                                                    onView={() => console.log('View employee', employee?.id)}
                                                    onEdit={() => console.log('Edit employee', employee?.id)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Employees; 