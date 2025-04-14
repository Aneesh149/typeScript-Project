import React from 'react';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Common/Navbar';
import Sidebar from '../../components/Common/Sidebar';
import CustomInput from '../../components/Common/CustomInput';
import CustomSelect from '../../components/Common/CustomSelect';
import type { OptionType } from '../../components/Common/CustomSelect';
import './Employees.css';

const schema = yup.object({
  employeeId: yup.string().required('Employee ID is required'),
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  contactNumber: yup.string().min(10, 'Contact number must be at least 10 digits').required('Contact number is required').matches(/^[6-9]\d{9}$/, 'Contact number must be start from 6 to 9'),
  department: yup.string().optional().nullable(),
  designation: yup.string().required('Designation is required'),
  status: yup.string().required('Status is required'),
});

// Type for form values

// interface FormValues {
//   employeeId: string;
//   fullName: string;
//   email: string;
//   contactNumber: string;
//   department: string;
//   designation: string;
//   status: string;
// }

type FormValues = yup.InferType<typeof schema>;

const AddEmployee: React.FC = () => {
  const navigate = useNavigate();

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      employeeId: '',
      fullName: '',
      email: '',
      contactNumber: '',
      department: '',
      designation: '',
      status: 'Active',
    }
  });

  const departments: OptionType[] = [
    { value: '1', label: 'Engineering' },
    { value: '2', label: 'Marketing' },
    { value: '3', label: 'HR' },
    { value: '4', label: 'Finance' }
  ];

  const designations: OptionType[] = [
    { value: '1', label: 'Software Developer' },
    { value: '2', label: 'Marketing Manager' },
    { value: '3', label: 'HR Specialist' },
    { value: '4', label: 'Finance Analyst' }
  ];

  const statusOptions: OptionType[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // alert('Employee added successfully!');
    navigate('/employees');
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          <div className="add-employee-wrapper">
            <div className="page-header">
              <h1 className="page-title">Add Employee</h1>
            </div>

            <form className="employee-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="form-row">
                <div className="form-col">
                  <CustomInput
                    name="employeeId"
                    label="Employee ID"
                    inputType="text"
                    control={control}
                    required
                    placeholder="Enter employee ID"
                    error={errors.employeeId?.message}
                  />
                </div>

                <div className="form-col">
                  <CustomInput
                    name="fullName"
                    label="Full Name"
                    inputType="text"
                    control={control}
                    required
                    placeholder="Enter employee name"
                    error={errors.fullName?.message}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <CustomInput
                    name="email"
                    label="Email"
                    inputType="email"
                    control={control}
                    required
                    placeholder="Enter email address"
                    error={errors.email?.message}
                  />
                </div>

                <div className="form-col">
                  <CustomInput
                    name="contactNumber"
                    label="Contact Number"
                    inputType="number"
                    control={control}
                    required
                    placeholder="Enter contact number"
                    error={errors.contactNumber?.message}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <CustomSelect
                    name="department"
                    label="Department"
                    control={control}
                    options={departments}
                    placeholder="Select Department"
                    error={errors.department?.message}
                  />
                </div>

                <div className="form-col">
                  <CustomSelect
                    name="designation"
                    label="Designation"
                    control={control}
                    options={designations}
                    placeholder="Select Designation"
                    required
                    error={errors.designation?.message}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <CustomSelect
                    name="status"
                    label="Status"
                    control={control}
                    options={statusOptions}
                    required
                    error={errors?.status?.message}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save-button"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddEmployee;






// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../../components/Common/Navbar';
// import Sidebar from '../../components/Common/Sidebar';

// // Form validation schema
// const schema = yup.object({
//   employeeId: yup.string().required('Employee ID is required'),
//   name: yup.string().required('Name is required'),
//   email: yup.string().email('Invalid email format').required('Email is required'),
//   contactNumber: yup.string().required('Contact number is required'),
//   department: yup.string().required('Department is required'),
//   designation: yup.string().required('Designation is required'),
//   status: yup.string().required('Status is required')
// }).required();

// // Type for form values
// interface FormValues {
//   employeeId: string;
//   name: string;
//   email: string;
//   contactNumber: string;
//   department: string;
//   designation: string;
//   status: string;
// }

// const AddEmployee: React.FC = () => {
//   const navigate = useNavigate();
  
//   // Initialize form
//   const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       employeeId: '',
//       name: '',
//       email: '',
//       contactNumber: '',
//       department: '',
//       designation: '',
//       status: 'Active'
//     }
//   });

//   // Mock departments and designations
//   const departments = [
//     { id: '1', name: 'Engineering' },
//     { id: '2', name: 'Marketing' },
//     { id: '3', name: 'HR' },
//     { id: '4', name: 'Finance' }
//   ];

//   const designations = [
//     { id: '1', name: 'Software Developer' },
//     { id: '2', name: 'Marketing Manager' },
//     { id: '3', name: 'HR Specialist' },
//     { id: '4', name: 'Finance Analyst' }
//   ];

//   const statusOptions = [
//     { value: 'Active', label: 'Active' },
//     { value: 'Inactive', label: 'Inactive' }
//   ];

//   // Form submit handler
//   const onSubmit = (data: FormValues) => {
//     console.log(data);
//     alert('Employee added successfully!');
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
//               <h1 className="page-title">Add Employee</h1>
//             </div>
            
//             <form className="employee-form" onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-row">
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="employeeId">Employee ID</label>
//                     <Controller
//                       name="employeeId"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           {...field}
//                           id="employeeId"
//                           type="text"
//                           placeholder="Enter employee ID"
//                         />
//                       )}
//                     />
//                     {errors.employeeId && <p className="error-message">{errors.employeeId.message}</p>}
//                   </div>
//                 </div>
                
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="name">Name</label>
//                     <Controller
//                       name="name"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           {...field}
//                           id="name"
//                           type="text"
//                           placeholder="Enter employee name"
//                         />
//                       )}
//                     />
//                     {errors.name && <p className="error-message">{errors.name.message}</p>}
//                   </div>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <Controller
//                       name="email"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           {...field}
//                           id="email"
//                           type="email"
//                           placeholder="Enter email address"
//                         />
//                       )}
//                     />
//                     {errors.email && <p className="error-message">{errors.email.message}</p>}
//                   </div>
//                 </div>
                
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="contactNumber">Contact Number</label>
//                     <Controller
//                       name="contactNumber"
//                       control={control}
//                       render={({ field }) => (
//                         <input
//                           {...field}
//                           id="contactNumber"
//                           type="text"
//                           placeholder="Enter contact number"
//                         />
//                       )}
//                     />
//                     {errors.contactNumber && <p className="error-message">{errors.contactNumber.message}</p>}
//                   </div>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="department">Department</label>
//                     <Controller
//                       name="department"
//                       control={control}
//                       render={({ field }) => (
//                         <select
//                           {...field}
//                           id="department"
//                           className="form-select"
//                         >
//                           <option value="">Select Department</option>
//                           {departments.map(dept => (
//                             <option key={dept.id} value={dept.id}>{dept.name}</option>
//                           ))}
//                         </select>
//                       )}
//                     />
//                     {errors.department && <p className="error-message">{errors.department.message}</p>}
//                   </div>
//                 </div>
                
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="designation">Designation</label>
//                     <Controller
//                       name="designation"
//                       control={control}
//                       render={({ field }) => (
//                         <select
//                           {...field}
//                           id="designation"
//                           className="form-select"
//                         >
//                           <option value="">Select Designation</option>
//                           {designations.map(desig => (
//                             <option key={desig.id} value={desig.id}>{desig.name}</option>
//                           ))}
//                         </select>
//                       )}
//                     />
//                     {errors.designation && <p className="error-message">{errors.designation.message}</p>}
//                   </div>
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-col">
//                   <div className="form-group">
//                     <label htmlFor="status">Status</label>
//                     <Controller
//                       name="status"
//                       control={control}
//                       render={({ field }) => (
//                         <div>
//                           <select
//                             {...field}
//                             id="status"
//                             className="form-select"
//                             style={{ marginBottom: '10px' }}
//                           >
//                             {statusOptions.map(option => (
//                               <option key={option.value} value={option.value}>{option.label}</option>
//                             ))}
//                           </select>
//                           {/* <StatusIndicator status={field.value} /> */}
//                         </div>
//                       )}
//                     />
//                     {errors.status && <p className="error-message">{errors.status.message}</p>}
//                   </div>
//                 </div>
//               </div>

//               <div className="form-actions">
//                 <button
//                   type="button"
//                   className='cancel-button'
//                   onClick={() => navigate(-1)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="login-button"
//                   style={{ backgroundColor: '#4c75cf' }}
//                 >
//                   Save
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