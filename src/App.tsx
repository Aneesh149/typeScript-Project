import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
// import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import PublicRoute from './components/Routes/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import Employees from './pages/Employees/Employees';
import AddEmployee from './pages/Employees/AddEmployee';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Login />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/add-employee" element={<AddEmployee />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import { useForm, Resolver } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Navbar from '../../components/Common/Navbar';
// import Sidebar from '../../components/Common/Sidebar';
// import CustomInput from '../../components/Common/CustomInput';
// import CustomSelect from '../../components/Common/CustomSelect';
// import type { OptionType } from '../../components/Common/CustomSelect';
// import './Employees.css';

// const schema = yup.object().shape({
//   employeeId: yup.string().required('Employee ID is required'),
//   fullName: yup.string().required('Full name is required'),
//   email: yup.string().when('$isEditable', {
//     is: true,
//     then: (schema) => schema.optional(),
//     otherwise: (schema) => schema.email('Invalid email format').required('Email is required')
//   }),
//   contactNumber: yup.string()
//     .min(10, 'Contact number must be at least 10 digits')
//     .required('Contact number is required')
//     .matches(/^[6-9]\d{9}$/, 'Contact number must start from 6 to 9'),
//   department: yup.string().optional().nullable(),
//   designation: yup.string().required('Designation is required'),
//   status: yup.string().required('Status is required'),
// });

// type FormValues = yup.InferType<typeof schema>;

// interface EmployeeData {
//   employeeId: string;
//   fullName: string;
//   email: string;
//   contactNumber: string;
//   department: string;
//   designation: string;
//   status: string;
//   id?: string;
//   lastLogin?: string;
// }

// const AddEmployee: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const employeeData: EmployeeData | undefined = location.state?.employee;
//   const ViewEmployeeData: EmployeeData = location.state?.ViewEmployee;

//   // console.log(ViewEmployeeData,'ViewEmployeeData');
  
//   const [isEditable, setIsEditable] = useState(false);
  
//   useEffect(() => {
//     if (employeeData) {
//       setIsEditable(true);
//     }
//   }, [employeeData]);
  
//   const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     resolver: yupResolver(schema) as Resolver<FormValues>,
//     defaultValues: {
//       employeeId: employeeData?.employeeId || '',
//       fullName: employeeData?.fullName || '',
//       email: employeeData?.email || '',
//       contactNumber: employeeData?.contactNumber || '',
//       department: employeeData?.department || '',
//       designation: employeeData?.designation || '',
//       status: employeeData?.status || 'Active',
//     },
//     context: { isEditable }
//   });

//   const departments: OptionType[] = [
//     { value: '1', label: 'Engineering' },
//     { value: '2', label: 'Marketing' },
//     { value: '3', label: 'HR' },
//     { value: '4', label: 'Finance' }
//   ];

//   const designations: OptionType[] = [
//     { value: '1', label: 'Software Developer' },
//     { value: '2', label: 'Marketing Manager' },
//     { value: '3', label: 'HR Specialist' },
//     { value: '4', label: 'Finance Analyst' }
//   ];

//   const statusOptions: OptionType[] = [
//     { value: 'Active', label: 'Active' },
//     { value: 'Inactive', label: 'Inactive' }
//   ];

//   const onSubmit = (data: FormValues) => {
//     if (isEditable) {
//       console.log('Employee updated:', data);
//     } else {
//       console.log('New employee added:', data);
//     }
//     navigate('/employees');
//   };

//   return (
//     <div className="page-container">
//       <Navbar />
//       <div className="content-wrapper">
//         <Sidebar />
//         <main className="main-content">
//           <div className="add-employee-wrapper">
//             <div className="page-header">
//               <h1 className="page-title">{isEditable ? 'Edit Employee' : 'Add Employee'}</h1>
//             </div>

//             <form className="employee-form" onSubmit={handleSubmit(onSubmit)} noValidate>
//               <div className="form-row">
//                 <div className="form-col">
//                   <CustomInput
//                     name="employeeId"
//                     label="Employee ID"
//                     inputType="text"
//                     control={control}
//                     required
//                     placeholder="Enter employee ID"
//                     error={errors.employeeId?.message}
//                     isEditable={isEditable}
//                   />
//                 </div>

//                 <div className="form-col">
//                   <CustomInput
//                     name="fullName"
//                     label="Full Name"
//                     inputType="text"
//                     control={control}
//                     required
//                     placeholder="Enter employee name"
//                     error={errors.fullName?.message}
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-col">
//                   <CustomInput
//                     name="email"
//                     label="Email"
//                     inputType="email"
//                     control={control}
//                     placeholder="Enter email address"
//                     error={errors.email?.message}
//                     // isEditable={!isEditable}
//                   />
//                 </div>

//                 <div className="form-col">
//                   <CustomInput
//                     name="contactNumber"
//                     label="Contact Number"
//                     inputType="number"
//                     control={control}
//                     required
//                     placeholder="Enter contact number"
//                     error={errors.contactNumber?.message}
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-col">
//                   <CustomSelect
//                     name="department"
//                     label="Department"
//                     control={control}
//                     options={departments}
//                     placeholder="Select Department"
//                     error={errors.department?.message}
//                   />
//                 </div>

//                 <div className="form-col">
//                   <CustomSelect
//                     name="designation"
//                     label="Designation"
//                     control={control}
//                     options={designations}
//                     placeholder="Select Designation"
//                     required
//                     error={errors.designation?.message}
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-col">
//                   <CustomSelect
//                     name="status"
//                     label="Status"
//                     control={control}
//                     options={statusOptions}
//                     required
//                     error={errors?.status?.message}
//                   />
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className="cancel-button"
//                   onClick={() => navigate(-1)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="save-button"
//                 >
//                   {isEditable ? 'Update' : 'Save'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee; 
