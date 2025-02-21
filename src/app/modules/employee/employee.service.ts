import { Employee } from "./employee.model";
import { TEmployee } from "./employee.interface";

const createEmployeeIntoDb = async (employeeData: TEmployee) => {
  const existingEmployee = await Employee.isEmployeeExists(
    employeeData.employeeId,
  );
  if (existingEmployee) {
    throw new Error("Employee with this ID already exists");
  }

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
const updateEmployeeIntoDb = async (
  id: string,
  updateEmployeeData: TEmployee,
) => {
  try {
    const result = await Employee.findOneAndUpdate(
      { employeeId: parseInt(id) }, // Find by employeeId
      { $set: updateEmployeeData }, // Update fields
      { new: true, runValidators: true }, // Return updated document & validate changes
    );
    return result;
  } catch (error) {
    throw new Error("Error updating employee");
  }
};

const getAllEmployeesFromDB = async () => {
  try {
    const result = await Employee.find();
    return result;
  } catch (error) {
    throw new Error("Error fetching employees");
  }
};
const getEmployeeByIdFromDB = async (id: string) => {
  try {
    const result = await Employee.findOne({ employeeId: id });
    return result;
  } catch (error) {
    throw new Error("Error fetching employees");
  }
};

export const EmployeeService = {
  createEmployeeIntoDb,
  updateEmployeeIntoDb,
  getAllEmployeesFromDB,
  getEmployeeByIdFromDB,
};
