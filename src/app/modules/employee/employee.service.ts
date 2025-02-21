import { Employee } from "./employee.model";
import { TEmployee } from "./employee.interface";

const createEmployeeIntoDb = async (employeeData: TEmployee) => {
  // Check if employee exists using static method
  const existingEmployee = await Employee.isEmployeeExists(
    employeeData.employeeId,
  );
  if (existingEmployee) {
    throw new Error("Employee with this ID already exists");
  }

  // Check if email/username exists using static method
  const existingEmailOrUsername = await Employee.isEmailUserNameExists(
    employeeData.fullName.firstName,
    employeeData.email,
  );
  if (existingEmailOrUsername) {
    throw new Error("Email or username already exists");
  }

  // Create new employee
  const newEmployee = await Employee.create(employeeData);
  return newEmployee;
};

export const EmployeeService = {
  createEmployeeIntoDb,
};
