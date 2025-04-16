// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import StatusIndicator from '../../components/Common/StatusIndicator';
import ActionButtons from '../../components/Common/ActionButtons';

const Employees: React.FC = () => {
    const navigate = useNavigate();
    const employees = [
        {
            id: '1',
            employeeId: 'EMP001',
            fullName: 'Test 1',
            email: 'test@test.com',
            contactNumber: '008270063',
            department: '1',
            designation: '1',
            lastLogin: '2023-10-15 09:30 AM',
            status: 'Active'
        },
        {
            id: '2',
            employeeId: 'EMP002',
            fullName: 'Test 2',
            email: 'test2@test.com',
            contactNumber: '9876543210',
            department: '2',
            designation: '2',
            lastLogin: '2023-10-14 02:15 PM',
            status: 'Inactive'
        },
        {
            id: '3',
            employeeId: 'EMP003',
            fullName: 'Test 3',
            email: 'test3@test.com',
            contactNumber: '9551234567',
            department: '3',
            designation: '3',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        }
    ];

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

    const handleEditEmployee = (employee: any) => {
        navigate('/add-employee', { state: { employee } });
    };

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
                                            <td>{employee?.employeeId}</td>
                                            <td className="name-cell">
                                                <div className="employee-avatar">
                                                    {employee?.fullName.charAt(0)}
                                                </div>
                                                {employee?.fullName}
                                            </td>
                                            <td>{employee?.email}</td>
                                            <td>{employee?.contactNumber}</td>
                                            <td>{getDepartmentName(employee?.department)}</td>
                                            <td>{getDesignationName(employee?.designation)}</td>
                                            <td>{employee?.lastLogin}</td>
                                            <td>
                                                <StatusIndicator status={employee?.status} />
                                            </td>
                                            <td>
                                                <ActionButtons
                                                    // onView={() => console.log('View employee', employee?.id)}
                                                    onEdit={() => handleEditEmployee(employee)}
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

// Helper functions to get department and designation names
const getDepartmentName = (id: string): string => {
    const departments: Record<string, string> = {
        '1': 'Engineering',
        '2': 'Marketing',
        '3': 'HR',
        '4': 'Finance'
    };
    return departments[id] || 'Unknown';
};

const getDesignationName = (id: string): string => {
    const designations: Record<string, string> = {
        '1': 'Software Developer',
        '2': 'Marketing Manager',
        '3': 'HR Specialist',
        '4': 'Finance Analyst'
    };
    return designations[id] || 'Unknown';
};

export default Employees; 