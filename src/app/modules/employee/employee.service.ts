import { Employee } from "./employee.model";
import { TEmployee } from "./employee.interface";
import { v2 as cloudinary } from "cloudinary";

const createEmployeeIntoDB = async (employeeData: TEmployee) => {
  const existingEmployee = await Employee.isEmployeeExists(
    employeeData.employeeId,
  );
  if (existingEmployee) {
    throw new Error("Employee with this ID already exists");
  }

  const existingEmailOrUsername = await Employee.isEmailUserNameExists(
    employeeData.fullName.firstName,
    employeeData.email,
    employeeData.phone,
  );
  if (existingEmailOrUsername) {
    throw new Error("Email Phone or username already exists");
  }

  // Create new employee
  const newEmployee = await Employee.create(employeeData);
  return newEmployee;
};
const updateEmployeeIntoDB = async (
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

const deleteEmployeeFromDB = async (id: string) => {
  try {
    const employee = await Employee.findOne({ employeeId: parseInt(id) });

    if (!employee) {
      return null; // Employee not found
    }

    // Delete profile picture from Cloudinary
    if (employee.profilePicture) {
      const publicId = employee.profilePicture.split("/").pop()?.split(".")[0]; // Extract public_id from URL
      await cloudinary.uploader.destroy(`employees/${publicId}`);
    }
    await Employee.findOneAndDelete({ employeeId: parseInt(id) });

    return true;
  } catch (error) {
    throw new Error("Error deleting employee");
  }
};
export const EmployeeService = {
  createEmployeeIntoDB,
  updateEmployeeIntoDB,
  getAllEmployeesFromDB,
  getEmployeeByIdFromDB,
  deleteEmployeeFromDB,
};
