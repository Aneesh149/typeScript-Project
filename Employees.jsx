import React, { useContext, useEffect, useRef, useState } from "react";
import {
  CustomButton,
  CustomDrawer,
  FilterSelect,
  NoDataFound,
  Pagination,
  PaginationText,
  TableHeader,
} from "../common";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineEdit, MdOutlineFilterAlt } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../helper/onClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees } from "../../redux/slice/employeeSlice";
import Skeleton from "react-loading-skeleton";
import { Roles } from "../../constant/Constant";

import { fetchDepartment } from "../../redux/slice/departmentSlice";
import { fetchDesignation } from "../../redux/slice/designationSlice";
import { dateFormatter } from "../../helper/formatDate";
import { GrView } from "react-icons/gr";
import { setEmployeeFilter } from "../../redux/slice/filterSlice";
import { GiHamburgerMenu, GiOrganigram } from "react-icons/gi";
import { PiSquaresFourLight } from "react-icons/pi";
import EmployeeCard from "./EmployeeCard";
import { CustomAlertContext } from "../../context";
import EmployeeChart from "./EmployeeChart";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const employeeStatusOptions = [
  { name: "All", value: "" },
  { name: "Active", value: true },
  { name: "InActive", value: false },
];
const Employees = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    drawerRef = useRef(),
    { token, user } = useSelector((state) => state.auth),
    { setToastNotification } = useContext(CustomAlertContext),
    { departmentData } = useSelector((state) => state.department),
    { designationData } = useSelector((state) => state.designation),
    { employeeLoading } = useSelector((state) => state.employee),
    { employeeFilter } = useSelector((state) => state.filter),
    [itemsPerPage, setItemsPerPage] = useState(100),
    [currentPage, setCurrentPage] = useState(1),
    [employeeCount, SetEmployeeCount] = useState(0),
    [searchString, setSearchString] = useState(""),
    [employees, setEmployees] = useState([]),
    [tableData, setTableData] = useState([]),
    [showEmployeeView, setShowEmployeeView] = useState(1),
    [openFilterDrawer, setOpenFilterDrawer] = useState(false);

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

  useOnClickOutside(drawerRef, () => setOpenFilterDrawer(false));

  const fetchEmployees = async (
    department = employeeFilter?.department || "",
    designation = employeeFilter?.designation || "",
    status = employeeFilter?.status || ""
  ) => {
    try {
      const response = await dispatch(
        fetchAllEmployees({
          token,
          department,
          designation,
          status,
          currentPage,
          itemsPerPage,
        })
      ).unwrap();

      if (response) {
        setEmployees(response?.employees);
        setTableData(response?.employees);
        SetEmployeeCount(response?.employee_count);
      }
      setOpenFilterDrawer(false);
    } catch (error) {
      setToastNotification(error?.message, "error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, itemsPerPage]);

  const filterEmployee = (e) => {
    const val = e?.target?.value;
    setSearchString(e?.target?.value);
    if (val?.length > 0) {
      const filterCompanies = employees?.filter(
        (item) =>
          item?.user_name?.toLowerCase().includes(val.toLowerCase()) ||
          item?.email?.toLowerCase() === val.toLowerCase() ||
          item?.mobile_number?.toString().includes(val.toLowerCase()) ||
          item?.department?.department_name
            ?.toLowerCase()
            .includes(val.toLowerCase()) ||
          item?.designation?.designation
            ?.toLowerCase()
            .includes(val.toLowerCase())
      );
      setTableData(filterCompanies);
    } else {
      setTableData(employees);
    }
  };

  // const GetAllEmployees = async () => {
  //   try {
  //     await dispatch(fetchAllEmployees({ token }));
  //   } catch (error) {
  //     setToastNotification(error?.message, "error");
  //   }
  // };

  // const handleChange = (e) => {
  //   const { value } = e.target;
  //   setSearchString(value);
  //   if (!employeeData || (employeeData && employeeData?.page_number)) {
  //     GetAllEmployees();
  //   }
  // };
  // useEffect(() => {
  //   if (searchString.length) {
  //     const filterEmployees = employeeData?.employees?.filter((item) =>
  //       item?.user_name?.toLowerCase().includes(searchString.toLowerCase())
  //     );
  //   }
  // }, [searchString]);

  const pageCount = Math.ceil(employeeCount / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event?.selected + 1);
  };

  const fetchDepartments = async () => {
    try {
      await dispatch(fetchDepartment({ token }));
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
  }, []);

  const departmentOptions = departmentData?.departments
    ?.filter((department) => department?.isActive === true)
    ?.map((department) => ({
      name: department?.department_name,
      value: department?._id,
    }));
  departmentOptions?.unshift({ name: "All", value: "" });
  const designationOptions = designationData?.designation
    ?.filter((designation) => designation?.isActive === true)
    ?.map((designation) => ({
      name: designation?.designation,
      value: designation?._id,
    }));
  designationOptions?.unshift({ name: "All", value: "" });

  const filterEmployeeApiHandler = () => {
    const { department, designation, status } = employeeFilter;
    fetchEmployees(department, designation, status);
  };

  return (
    <div className="w-full h-full bg-custom-white rounded-md">
      <section className="flex md:flex-row flex-col gap-2 justify-between bg-custom-white items-center p-2 rounded-t-md">
        <h1 className="font-semibold">
          Employee{" "}
          {showEmployeeView === 1
            ? "Card"
            : showEmployeeView === 2
            ? "List"
            : "Chart"}
        </h1>
        <div className="flex md:flex-row flex-col md:justify-between items-center gap-2">
          <div className="border border-slate-200 flex justify-center items-center text-slate-500 rounded-sm cursor-pointer">
            <span
              onClick={() => setShowEmployeeView(2)}
              className={`${showEmployeeView === 2 && "bg-slate-200"} p-2`}
            >
              <GiHamburgerMenu size={18} />
            </span>
            <span
              onClick={() => setShowEmployeeView(1)}
              className={`${showEmployeeView === 1 && "bg-slate-200"} p-2`}
            >
              <PiSquaresFourLight size={18} />
            </span>
            <span
              onClick={() => setShowEmployeeView(3)}
              className={`${showEmployeeView === 3 && "bg-slate-200"} p-2`}
            >
              <GiOrganigram size={18} />
            </span>
          </div>
          <div className="w-full relative">
            <IoMdSearch className="absolute z-10 top-3 left-1 text-slate-400" />
            <input
              name="searchString"
              label=""
              type="text"
              placeholder="Search"
              // onChange={handleChange}
              onChange={(e) => filterEmployee(e)}
              value={searchString}
              className="bg-custom-white w-full md:w-60 px-5 py-2 text-sm font-semibold border outline-none rounded-md"
            />
          </div>
          <div className="w-full flex justify-between md:justify-center items-center gap-2">
            <CustomButton
              title={
                <div className="relative flex justify-center items-center font-semibold">
                  {(employeeFilter?.department ||
                    employeeFilter?.designation ||
                    typeof employeeFilter?.status === "boolean") && (
                    <div className="absolute w-5 h-5 flex justify-center items-center rounded-full bg-green-500 -right-4 -top-4 text-xs font-semibold text-custom-white">
                      {
                        Object?.entries(employeeFilter)?.filter(
                          (item) =>
                            typeof item?.value === "string" ||
                            typeof item?.value === "boolean"
                        )?.length
                      }
                    </div>
                  )}
                  <MdOutlineFilterAlt size={20} />
                  <span>Filters</span>
                </div>
              }
              buttonType="submit"
              onClick={() =>
                setOpenFilterDrawer((openFilterDrawer) => !openFilterDrawer)
              }
              classname="bg-custom-white text-slate-400 p-2 text-sm font-semibold rounded-md border"
            />
            {user?.roleId !== Roles?.employee && (
              <CustomButton
                title={
                  <div className="flex justify-center items-center gap-2 ">
                    <FaPlusCircle />
                    <span>Add Employee</span>
                  </div>
                }
                buttonType="button"
                onClick={() => navigate("/employees/create")}
                classname="bg-gradient-custom text-custom-white font-semibold text-sm px-5 py-2 rounded-md"
              />
            )}
          </div>
        </div>
        {openFilterDrawer && (
          <CustomDrawer
            ref={drawerRef}
            open={openFilterDrawer}
            setOpen={setOpenFilterDrawer}
            filterName="Employee Filter"
          >
            {/* <div className="my-4">
              <FilterInput
                name="user_name"
                label="Name"
                inputType="text"
                placeholder="Name: John.doe"
                defaultValue={employeeFilter?.user_name}
                onChange={(value) => {
                  dispatch(
                    setEmployeeFilter({
                      user_name: value,
                    })
                  );
                }}
              />
            </div> */}
            <div className="my-4">
              <FilterSelect
                name="department"
                label="Department"
                placeholder="Select a department"
                options={departmentOptions}
                defaultValue={employeeFilter?.department}
                onChange={(selected) => {
                  dispatch(
                    setEmployeeFilter({
                      department: selected?.value,
                    })
                  );
                }}
              />
            </div>
            <div className="my-4">
              <FilterSelect
                name="designation"
                label="Designation"
                placeholder="Select a designation"
                options={designationOptions}
                defaultValue={employeeFilter?.designation}
                onChange={(selected) =>
                  dispatch(
                    setEmployeeFilter({
                      designation: selected?.value,
                    })
                  )
                }
              />
            </div>
            <div className="my-4">
              <FilterSelect
                name="status"
                label="Status"
                placeholder="Select a status"
                options={employeeStatusOptions}
                defaultValue={employeeFilter?.status}
                onChange={(selected) =>
                  dispatch(
                    setEmployeeFilter({
                      status: selected?.value,
                    })
                  )
                }
              />
            </div>
            
            <div className="w-full absolute bottom-0 right-0 p-4">
              <div className="w-full h-[1px] bg-slate-200 my-2" />
              <div className="flex items-center justify-between ">
                <CustomButton
                  title={"Clear"}
                  onClick={() => {
                    setCurrentPage(1);
                    dispatch(setEmployeeFilter(null));
                    fetchEmployees("", "", "");
                    setOpenFilterDrawer(false);
                  }}
                  buttonType="submit"
                  classname={"border px-5 py-1 rounded-md"}
                />
                <CustomButton
                  title={"Apply"}
                  onClick={() => {
                    setCurrentPage(1);
                    filterEmployeeApiHandler();
                  }}
                  buttonType="submit"
                  classname={
                    "border px-5 py-1 rounded-md bg-custom-status-completed text-custom-white"
                  }
                />
              </div>
            </div>
          </CustomDrawer>
        )}
      </section>
      <section className="w-full overflow-auto">
        {showEmployeeView === 1 ? (
          employeeLoading ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 p-2">
              {[1, 2, 3, 4, 5, 6]?.map((index) => (
                <div
                  key={index}
                  className="w-full border border-[#E8F0F6] bg-custom-white p-4 rounded-lg shadow-[2px_3px_10px_6px_#257CBB0F] space-y-3 cursor-pointer flex flex-col"
                >
                  <div className="flex justify-between items-center space-x-2">
                    <div className="w-40">
                      <Skeleton width={"70"} />
                    </div>
                    <div className="w-[15px] h-[15px]">
                      <Skeleton circle width={"100%"} height="100%" />
                    </div>
                  </div>
                  <div>
                    <Skeleton count={3} />
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-[25px] h-[25px]">
                      <Skeleton circle width={"100%"} height="100%" />
                    </div>
                    <div className="w-[25px] h-[25px]">
                      <Skeleton circle width={"100%"} height="100%" />
                    </div>
                    <div className="w-[25px] h-[25px]">
                      <Skeleton circle width={"100%"} height="100%" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : tableData && tableData?.length ? (
            <>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5 p-2">
                {tableData?.map((item) => (
                  <EmployeeCard key={item?._id} employee={item} />
                ))}
              </div>
              <section className="flex sm:flex-row flex-col justify-between items-center text-slate-400 text-sm p-2">
                <PaginationText
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  dataCount={employeeCount}
                  dataLength={employees?.length}
                />

                <Pagination 
                  handlePageClick={handlePageClick}
                  pageRangeDisplayed={itemsPerPage}
                  pageCount={pageCount}
                  name={"pageSize"}
                  onChange={(e) => setItemsPerPage(e?.target?.value)}
                />
              </section>
            </>
          ) : (
            <NoDataFound />
          )
        ) : showEmployeeView === 2 ? (
          <table className="w-full border rounded-lg bg-custom-white overflow-auto">
            <thead>
              <TableHeader TableHeads={TableHeads} />
            </thead>
            {employeeLoading ? (
              <tbody>
                <tr>
                  <td
                    colSpan={TableHeads.length}
                    className="text-center font-semibold text-sm p-3"
                  >
                    <Skeleton
                      count={5}
                      width={"100%"}
                      height={"22px"}
                      className="my-2"
                    />
                  </td>
                </tr>
              </tbody>
            ) : tableData && tableData?.length > 0 ? (
              <tbody>
                {tableData?.map((item) => {
                  return (
                    <tr
                      key={item?._id}
                      className="w-full border-b hover:bg-slate-100"
                    >
                      <td className="p-2 text-sm">{item?.emp_id}</td>
                      <td className="p-2 text-sm">
                        <div
                          onClick={() =>
                            navigate("/employees/view", {
                              state: { id: item?._id },
                            })
                          }
                          className="flex justify-start items-center gap-4 cursor-pointer"
                        >
                          <img
                            src={
                              item?.avatar
                                ? `${BASE_URL}/${item?.avatar}`
                                : `https://api.dicebear.com/5.x/initials/svg?seed=${item?.user_name}`
                            }
                            alt={item?.user_name?.[0]}
                            className="w-7 h-7 rounded-full bg-slate-300 p-0.5"
                          />
                          <span className="nameTn">{item?.user_name}</span>
                        </div>
                      </td>
                      <td className="p-2 text-sm w-32 ">
                        <div className="ellipsis">{item?.email}</div>
                      </td>
                      <td className="p-2 text-sm">{item?.mobile_number}</td>
                      <td className="p-2 text-sm">
                        {item?.roleId === Roles?.admin
                          ? "Admin"
                          : item?.department?.department_name ?? "-"}
                      </td>
                      <td className="p-2 text-sm">
                        {item?.roleId === Roles?.admin
                          ? "Admin"
                          : item?.designation?.designation ?? "-"}
                      </td>
                      <td className="p-2 text-sm">
                        {item?.last_login
                          ? dateFormatter(item?.last_login, {
                              format: "MMM D, YYYY hh:mm A",
                              includeTimeForToday: true,
                            })
                          : "--"}
                      </td>
                      <td>
                        <div className="flex items-center text-sm text-start gap-2">
                          <div
                            className={`w-3 h-3  rounded-full ${
                              item?.isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          <span>{item?.isActive ? "Active " : "Inactive"}</span>
                        </div>
                      </td>
                      <td className="p-2 gap-2">
                        <div className="flex justify-start items-center">
                          <div
                            onClick={() =>
                              navigate("/employees/view", {
                                state: { id: item?._id },
                              })
                            }
                            className="p-1 border border-custom-blue text-custom-blue hover:text-custom-white hover:bg-green-500  hover:border-custom-white rounded-md cursor-pointer me-1"
                          >
                            <GrView size={16} />
                          </div>
                          {(user?.roleId === Roles?.admin ||
                            user?.roleId === Roles?.hr) &&
                            item?.roleId !== Roles?.admin && (
                              <div
                                onClick={() => {
                                  navigate("/employees/create", {
                                    state: { employee: item },
                                  });
                                }}
                                className="p-1 border border-custom-blue text-custom-blue hover:text-custom-white hover:bg-custom-blue  hover:border-custom-white rounded-md cursor-pointer"
                              >
                                <MdOutlineEdit size={16} />
                              </div>
                            )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan={TableHeads.length}
                    className="text-center font-semibold text-sm p-4"
                  >
                    <NoDataFound />
                  </td>
                </tr>
              </tbody>
            )}
            <tfoot>
              <tr className="relative">
                <td className="text-slate-400 text-sm px-2 py-4" colSpan={6}>
                  <PaginationText
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    dataCount={employeeCount}
                    dataLength={employees?.length}
                  />
                </td>
                <td className="absolute bottom-0 right-2 top-1.5">
                  <Pagination
                    handlePageClick={handlePageClick}
                    pageRangeDisplayed={itemsPerPage}
                    pageCount={pageCount}
                    name={"pageSize"}
                    onChange={(e) => {
                      setItemsPerPage(e?.target?.value);
                    }}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          showEmployeeView === 3 && (
            <div className="w-full h-[80vh]">
              <EmployeeChart showEmployeeView={showEmployeeView} />
            </div>
          )
        )}
      </section>
    </div>
  );
};

export default Employees;
