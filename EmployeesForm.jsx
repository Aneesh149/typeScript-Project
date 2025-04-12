import React, { useContext, useEffect, useState } from "react";
import { apiConnector } from "../../networking/ApiConnector";
import { setLoading } from "../../redux/slice/loadingSlice";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  CommonValidation,
  CustomButton,
  CustomInput,
  CustomSelect,
  CustomSwitch,
} from "../common";
import { Roles } from "../../constant/Constant";
import { employeeEndPoints, shiftEndPoints } from "../../networking/Endpoints";
import { fetchDepartment } from "../../redux/slice/departmentSlice";
import "react-phone-input-2/lib/style.css";
import { fetchDesignation } from "../../redux/slice/designationSlice";
import { fetchOfficeLocation } from "../../redux/slice/locationSlice";
import { CustomAlertContext } from "../../context";
import { fetchAllEmployees } from "../../redux/slice/employeeSlice";
 
const baseUrl = process.env.REACT_APP_BASE_URL;

const workModeOptions = [
  {
    name: "Work From Office",
    value: "Work From Office",
  },
  {
    name: "Work From Home",
    value: "Work From Home",
  },
  {
    name: "Hybrid",
    value: "Hybrid",
  },
  {
    name: "Deskless",
    value: "Deskless",
  },
];
// const ClockInPermissionOptions = [
//   {
//     name: "Location",
//     value: "Location",
//   },
//   {
//     name: "Local IP",
//     value: "Local IP",
//   },
//   {
//     name: "Public IP",
//     value: "Public IP",
//   },
// ];

const EmployeeSchemaValidation = yup.object().shape({
  user_name: CommonValidation.nameValidation,
  email: yup.string().when("$isEditable", {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.concat(CommonValidation.emailValidation),
  }),
  mobile_number: CommonValidation.mobileValidation,
  department: CommonValidation.departmentValidation,
  reporting_manager: yup
    .string()
    .max(30, "Reporting Manager must be less than 30 characters")
    .required("Reporting Manager is required *")
    .trim(),
  roleId: CommonValidation.roleValidation,
  designation: CommonValidation.designationValidation,
  office_location: CommonValidation.locationValidation,
  shift: yup.string().required("Shift is required *"),
  // clock_in_permission: yup
  //   .string()
  //   .required("ClockIn Permission is required *"),
  // local_ip: yup
  //   .array()
  //   .of(yup.string().required("Each item must be a valid string"))
  //   .when("clock_in_permission", {
  //     is: (clock_in_permission) => {
  //       return clock_in_permission === "One Time";
  //     },
  //     then: (schema) => schema.required("Local Ip is required"),
  //   }),
  work_mode: CommonValidation.workValidation,
  joining_date: yup.string().required("Joining Date is required *").trim(),
});

const EmployeesForm = () => {
  const dispatch = useDispatch(),
    { setToastNotification } = useContext(CustomAlertContext),
    navigate = useNavigate(),
    location = useLocation(),
    { token } = useSelector((state) => state.auth),
    { loading } = useSelector((state) => state.loading),
    { employeeData } = useSelector((state) => state.employee),
    { departmentData } = useSelector((state) => state.department),
    { designationData } = useSelector((state) => state.designation),
    { officeLocationData } = useSelector((state) => state.officeLocation),
    [isEditable, setIsEditable] = useState(false),
    [shifts, setShifts] = useState([]),
    [isEmployeeActive, setIsEmployeeActive] = useState(true);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const employee = location?.state?.employee;
  const roleOptions =
    // user?.roleId !== Roles?.project_manager
    //   ?
    [
      {
        name: "Project Manager",
        value: Roles?.project_manager,
      },
      {
        name: "Employee",
        value: Roles?.employee,
      },
      {
        name: "Hr",
        value: Roles?.hr,
      },
      {
        name: "Team Lead",
        value: Roles?.team_lead,
      },
    ];
  // : [
  //     {
  //       name: "Employee",
  //       value: Roles?.employee,
  //     },
  //   ];
  useEffect(() => {
    if (employee) {
      setIsEditable(true);
      setIsEmployeeActive(employee?.isActive);
    }
  }, [employee]);
  const initialValues = employee
    ? {
        user_name: employee?.user_name ?? "",
        email: employee?.email ?? "",
        mobile_number:
          (employee?.country_code ?? "+91") +
          " " +
          (employee?.mobile_number ?? ""),
        department: employee?.department?._id ?? "",
        reporting_manager: employee?.reporting_manager?._id ?? "",
        roleId: employee?.roleId,
        designation: employee?.designation?._id,
        office_location: employee?.office_location?._id,
        shift: employee?.shift,
        work_mode: employee?.work_mode,
        joining_date: employee?.joining_date?.split("T")[0],
      }
    : {};
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmployeeSchemaValidation),
    defaultValues: initialValues,
    context: { isEditable: isEditable },
  });

  const fetchEmployees = async () => {
    try {
      await dispatch(fetchAllEmployees({ token }));
    } catch (error) {
      setToastNotification(error?.message, "error");
    }
  };
  const fetchOfficeLocations = async () => {
    try {
      await dispatch(fetchOfficeLocation({ token }));
    } catch (error) {
      setToastNotification(error?.message, "error");
    }
  };
  const fetchDepartments = async () => {
    try {
      await dispatch(fetchDepartment({ token })).unwrap();
    } catch (error) {
      setToastNotification(error?.message, "error");
    }
  };
  const fetchDesignations = async () => {
    try {
      await dispatch(fetchDesignation({ token }));
    } catch (error) {
      setToastNotification(error?.message, "error");
    }
  };
  useEffect(() => {
    GetAllShifts();
    if (
      !departmentData ||
      (departmentData?.page_number && departmentData?.page_size)
    ) {
      fetchDepartments();
    }
    if (
      !designationData ||
      (designationData?.page_number && designationData?.page_size)
    ) {
      fetchDesignations();
    }
    if (
      !officeLocationData ||
      (officeLocationData?.page_number && officeLocationData?.page_size)
    ) {
      fetchOfficeLocations();
    }
    if (
      !employeeData ||
      (employeeData?.page_number && employeeData?.page_size)
    ) {
      fetchEmployees();
    }
  }, []);

  const selectedDepartement = watch("department");
  useEffect(() => {
    if (selectedDepartement) {
      setError("designation", {
        type: "manual",
        message: "",
      });
    }
  }, [selectedDepartement]);
  const employeeOptions = employeeData?.employees
    ?.filter((item) => item?._id !== employee?._id)
    ?.map((item) => ({
      name: item?.user_name,
      value: item?._id,
      designation: item?.designation?.designation,
      avatar: item?.avatar
        ? `${baseUrl}/${item?.avatar}`
        : `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user_name}`,
    }));
  const departmentOptions = departmentData?.departments
    ?.filter((item) => item?.isActive === true)
    ?.map((item) => ({
      name: item?.department_name,
      value: item?._id,
    }));

  const designationOptions = designationData?.designation
    ?.filter(
      (item) =>
        item?.department?._id === selectedDepartement && item?.isActive === true
    )
    .map((item) => ({
      name: item?.designation,
      value: item?._id,
    }));

  const officesOptions = officeLocationData?.offices
    ?.filter((item) => item?.isActive === true)
    ?.map((item) => ({
      name: item?.city + " , " + item?.address,
      value: item?._id,
    }));
  const shiftOptions = shifts
    // ?.filter((item) => item?.isActive === true)
    ?.map((item) => ({
      name: item?.shift_name,
      value: item?._id,
    }));

  // Function to get only changed fields

  const onSubmitHandler = async (data) => {
    let payload = isEditable
      ? {
          user_name:
            employee?.user_name !== data?.user_name
              ? data?.user_name
              : undefined,

          department:
            employee?.department?._id !== data?.department
              ? data?.department
              : undefined,
          reporting_manager:
            employee?.reporting_manager !== data?.reporting_manager
              ? data?.reporting_manager
              : undefined,
          roleId:
            employee?.roleId !== Number(data?.roleId)
              ? data?.roleId
              : undefined,
          designation:
            employee?.designation?._id !== data?.designation
              ? data?.designation
              : undefined,
          office_location:
            employee?.office_location?._id !== data?.office_location
              ? data?.office_location
              : undefined,
          shift: employee?.shift?._id !== data?.shift ? data?.shift : undefined,
          work_mode:
            employee?.work_mode !== data?.work_mode
              ? data?.work_mode
              : undefined,
          joining_date:
            employee?.joining_date !== data?.joining_date
              ? data?.joining_date
              : undefined,

          isActive: isEmployeeActive,
        }
      : {
          ...data,
          country_code: data?.mobile_number?.split(/(?<=^\S+)\s/)[0],
          mobile_number: data?.mobile_number?.split(/(?<=^\S+)\s/)[1],
        };

    dispatch(setLoading(true));
    try {
      const apiMethod = isEditable ? "PUT" : "POST";
      const apiUrl = isEditable
        ? `${employeeEndPoints?.EMPLOYEE_API}/${employee?._id}`
        : employeeEndPoints?.EMPLOYEE_API;

      const employee_response = await apiConnector(apiMethod, apiUrl, payload, {
        Authorization: `Bearer ${token}`,
      });
      setToastNotification(employee_response?.data?.message, "success");

      reset();
      navigate("/employees");
    } catch (error) {
      setToastNotification(error?.message, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };
  const GetAllShifts = async () => {
    dispatch(setLoading(true));
    try {
      const shift_response = await apiConnector(
        "GET",
        shiftEndPoints?.SHIFT_SCHEDULE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setShifts(shift_response?.data?.data);
    } catch (error) {
      setToastNotification(error?.message, "error");
    } finally {
      dispatch(setLoading(false));
    }
  };  
  return (
    <div className="w-full border bg-custom-white rounded-md">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="w-full px-6 py-6"
        noValidate
      >
        <div className="text-xl font-semibold text-custom-black">
          {isEditable ? "Edit Employee" : "Add Employee"}
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="my-4">
            <CustomInput
              name="user_name"
              label="Name"
              inputType="text"
              placeholder="John.doe"
              control={control}
              required={true}
              error={errors?.user_name?.message}
            />
          </div>
          <div className="my-4">
            <CustomInput
              name="email"
              label="Email"
              inputType="text"
              placeholder="John.Doe@gmail.com"
              control={control}
              required={true}
              isEditable={isEditable}
              error={errors?.email?.message}
            />
          </div>
          <div className="my-4">
            <CustomInput
              name="mobile_number"
              label="Mobile Number"
              inputType={isEditable ? "text" : "tel"}
              placeholder="99XXXXXXXX"
              control={control}
              isEditable={isEditable}
              required={true}
              error={errors?.mobile_number?.message}
            />
          </div>
          <div className="my-4 ">
            <CustomSelect
              name="reporting_manager"
              label="Reporting Manager"
              placeholder="Select"
              control={control}
              options={employeeOptions}
              required={true}
              error={errors?.reporting_manager?.message}
            />
          </div>
          <div className="my-4">
            <CustomSelect
              name="roleId"
              label="Role"
              inputType="text"
              placeholder="Select a role"
              control={control}
              required={true}
              options={roleOptions}
              error={errors?.roleId?.message}
            />
          </div>
          <div className="my-4 ">
            <CustomSelect
              name="department"
              label="Department"
              inputType="text"
              placeholder="Select a department"
              control={control}
              options={departmentOptions}
              required={true}
              error={errors?.department?.message}
            />
          </div>
          <div
            onClick={() => {
              if (!selectedDepartement) {
                setError("designation", {
                  type: "manual",
                  message: "Note:- Please Select a Department First!",
                });
              }
            }}
            className="my-4"
          >
            <CustomSelect
              name="designation"
              label="Designation"
              inputType="text"
              placeholder="Select a designation"
              control={control}
              required={true}
              options={designationOptions}
              error={errors?.designation?.message}
              isEditable={!selectedDepartement}
            />
          </div>
          <div className="my-4 ">
            <CustomSelect
              name="office_location"
              label="Office Location"
              inputType="text"
              placeholder="Select a office"
              control={control}
              required={true}
              options={officesOptions}
              error={errors?.office_location?.message}
            />
          </div>
          <div className="my-4 ">
            <CustomSelect
              name="work_mode"
              label="Work Mode"
              inputType="text"
              placeholder="Select a workmode"
              control={control}
              required={true}
              options={workModeOptions}
              error={errors?.work_mode?.message}
            />
          </div>
          <div className="my-2 sm:my-4 ">
            <CustomInput
              name="joining_date"
              label="Joining Date"
              inputType="date"
              placeholder=""
              required={true}
              control={control}
              max={formattedDate}
              error={errors?.joining_date?.message}
            />
          </div>
          <div className="my-4 ">
            <CustomSelect
              name="shift"
              label="Shift"
              inputType="text"
              placeholder="Select a shift"
              control={control}
              required={true}
              options={shiftOptions}
              error={errors?.shift?.message}
            />
          </div>
          {/* <div className="my-4 ">
            <CustomSelect
              name="clock_in_permission"
              label="ClockIn Permission"
              inputType="text"
              placeholder="Select a clock_in_permission"
              control={control}
              required={true}
              options={ClockInPermissionOptions ?? []}
              error={errors?.clock_in_permission?.message}
            />
          </div> */}
          {isEditable && (
            <div className="my-4">
              <label className="font-semibold text-sm text-slate-600">
                {`Employee's Status`}
              </label>
              <div className="mt-2 w-fit">
                <CustomSwitch
                  isActive={isEmployeeActive}
                  handleStatus={(status) => setIsEmployeeActive(status)}
                />
              </div>
            </div>
          )}
        </div>
        {/* <div className="my-4">
          <CustomInput
            name="address"
            label="Address"
            inputType="text-area"
            placeholder="Address"
            control={control}
            error={errors?.address?.message}
          />
        </div> */}

        <div className="flex justify-end items-center gap-5 my-10">
          <CustomButton
            tabIndex={1}
            title={"Cancel"}
            buttonType="button"
            onClick={() => navigate("/employees")}
            classname={`border font-semibold text-custom-black px-7 py-1.5 rounded-md 
            `}
          />
          <CustomButton
            tabIndex={0}
            title={
              loading ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Save"
              )
            }
            buttonType="submit"
            disabled={loading}
            classname={`bg-custom-blue font-semibold text-custom-white px-7 py-1.5 rounded-md ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          />
        </div>
      </form>
    </div>
  );
};

export default EmployeesForm;
