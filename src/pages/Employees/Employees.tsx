// import React, { useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import StatusIndicator from '../../components/Common/StatusIndicator';
import ActionButtons from '../../components/Common/ActionButtons';
import { IoMdSearch } from 'react-icons/io';

interface Employee {
    id: string;
    employeeId: string;
    fullName: string;
    email: string;
    contactNumber: string;
    department: string;
    designation: string;
    lastLogin: string;
    status: string;
}

const Employees: React.FC = () => {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState<string>('');
    const [tableData, setTableData] = useState<Employee[]>([]);

    const employees: Employee[] = [
        {
            id: '1',
            employeeId: 'EMP001',
            fullName: 'Test 1',
            email: 'test1@test.com',
            contactNumber: '8270063981',
            department: 'Engineering',
            designation: 'Software Developer',
            lastLogin: '2023-10-15 09:30 AM',
            status: 'Active'
        },
        {
            id: '2',
            employeeId: 'EMP002',
            fullName: 'Test 2',
            email: 'test2@test.com',
            contactNumber: '9876543210',
            department: 'Marketing',
            designation: 'Marketing Manager',
            lastLogin: '2023-10-14 02:15 PM',
            status: 'Inactive'
        },
        {
            id: '3',
            employeeId: 'EMP003',
            fullName: 'Test 3',
            email: 'test3@test.com',
            contactNumber: '9551234567',
            department: 'HR',
            designation: 'HR Specialist',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        },
        {
            id: '4',
            employeeId: 'EMP004',
            fullName: 'Test 4',
            email: 'test4@test.com',
            contactNumber: '9587909067',
            department: 'Finance',
            designation: 'Finance Analyst',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        },
        {
            id: '5',
            employeeId: 'EMP005',
            fullName: 'Test 5',
            email: 'test5@test.com',
            contactNumber: '7821980422',
            department: 'HR',
            designation: 'HR Specialist',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Inactive'
        },
        {
            id: '6',
            employeeId: 'EMP006',
            fullName: 'Test 6',
            email: 'test6@test.com',
            contactNumber: '7976440227',
            department: 'Engineering',
            designation: 'Software Developer',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Inactive'
        },
        {
            id: '7',
            employeeId: 'EMP007',
            fullName: 'Test 7',
            email: 'test7@test.com',
            contactNumber: '6128709487',
            department: 'Marketing',
            designation: 'Marketing Manager',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        },
        {
            id: '8',
            employeeId: 'EMP008',
            fullName: 'Test 8',
            email: 'test8@test.com',
            contactNumber: '8213704561',
            department: 'Finance',
            designation: 'Finance Analyst',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Inactive'
        },
        {
            id: '9',
            employeeId: 'EMP009',
            fullName: 'Test 9',
            email: 'test9@test.com',
            contactNumber: '7894568521',
            department: 'Engineering',
            designation: 'Software Developer',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        },
        {
            id: '10',
            employeeId: 'EMP0010',
            fullName: 'Test 10',
            email: 'test10@test.com',
            contactNumber: '8476789142',
            department: 'HR',
            designation: 'HR Specialist',
            lastLogin: '2023-10-15 11:45 AM',
            status: 'Active'
        },
    ];

    useEffect(() => {
        setTableData(employees);
    }, []);

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

    const filterEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchString(val);

        if (val.length > 0) {
            const filteredEmployees = employees.filter(
                (item) =>
                    item.fullName.toLowerCase().includes(val.toLowerCase()) ||
                    item.email.toLowerCase().includes(val.toLowerCase()) ||
                    item.contactNumber.includes(val) ||
                    item.department.toLowerCase().includes(val.toLowerCase()) ||
                    item.designation.toLowerCase().includes(val.toLowerCase())
                // item.status.toLowerCase().includes(val.toLowerCase())
            );
            setTableData(filteredEmployees);
        } else {
            setTableData(employees);
        }
    };

    // const getDepartmentName = (id: string): string => {
    //     const departments: Record<string, string> = {
    //         '1': 'Engineering',
    //         '2': 'Marketing',
    //         '3': 'HR',
    //         '4': 'Finance'
    //     };
    //     return departments[id] || 'Unknown';
    // };

    // const getDesignationName = (id: string): string => {
    //     const designations: Record<string, string> = {
    //         '1': 'Software Developer',
    //         '2': 'Marketing Manager',
    //         '3': 'HR Specialist',
    //         '4': 'Finance Analyst'
    //     };
    //     return designations[id] || 'Unknown';
    // };

    const handleEditEmployee = (employee: Employee) => {
        navigate('/add-employee', { state: { employee } });
    };

    const handleViewEmployee = (ViewEmployee: Employee) => {
        navigate('/add-employee', { state: { ViewEmployee } });
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
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <IoMdSearch className="absolute z-10 top-3 left-2 text-slate-400" />
                                    <input
                                        name="searchString"
                                        type="text"
                                        placeholder="Search"
                                        onChange={filterEmployees}
                                        value={searchString}
                                        className="bg-white px-8 py-2 text-sm border outline-none rounded-md w-64"
                                    />
                                </div>
                                <button
                                    className="add-employee-btn"
                                    onClick={() => navigate('/add-employee')}
                                >
                                    Add Employee
                                </button>
                            </div>
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
                                    {tableData.map((employee) => (
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
                                            <td>{employee?.department}</td>
                                            <td>{employee?.designation}</td>
                                            <td>{employee?.lastLogin}</td>
                                            <td>
                                                <StatusIndicator status={employee?.status} />
                                            </td>
                                            <td>
                                                <ActionButtons
                                                    onView={() => handleViewEmployee(employee)}
                                                    onEdit={() => handleEditEmployee(employee)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    {tableData.length === 0 && (
                                        <tr>
                                            <td colSpan={TableHeads.length} className="text-center py-4 font-bold">
                                                No Employees Found 😢
                                            </td>
                                        </tr>
                                    )}
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