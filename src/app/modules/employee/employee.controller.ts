import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";
import { EmployeeValidationSchema } from "./employee.validation";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

const createEmployee = async (req: Request, res: Response) => {
  try {
    const validatedData = EmployeeValidationSchema.parse(req.body);

    if (req.file) {
      validatedData.profilePicture = req.file.path;
    }
    // Call the service layer to create the employee record
    const result = await EmployeeService.createEmployeeIntoDB(validatedData);
    res.status(201).json({
      success: true,
      message: "Employee is created sucessfully",
      data: result,
    });
  } catch (error) {
    if (req.file) {
      const publicId = req.file.filename;
      await cloudinary.uploader.destroy(publicId);
    }

    // If validation fails, Zod will throw an error that includes details
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors,
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
        error: error instanceof Error ? error : "Unknown error",
      });
    }
  }
};
const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = EmployeeValidationSchema.parse(req.body);

    if (req.file) {
      validatedData.profilePicture = req.file.path;
    }
    const result = await EmployeeService.updateEmployeeIntoDB(
      id,
      validatedData,
    );
    res.status(201).json({
      success: true,
      message: "Employee is created sucessfully",
      data: result,
    });
  } catch (error) {
    if (req.file) {
      const publicId = req.file.filename;
      await cloudinary.uploader.destroy(publicId);
    }

    // If validation fails, Zod will throw an error that includes details
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.errors,
        error: error,
      });
    } else {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
        error: error instanceof Error ? error : "Unknown error",
      });
    }
  }
};

const gettAllEmployees = async (req: Request, res: Response) => {
  const { search, filter } = req.query;
  try {
    const result = await EmployeeService.getAllEmployeesFromDB(
      search as string,
      filter as string,
    );

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error,
    });
  }
};
const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await EmployeeService.getEmployeeByIdFromDB(id);

    res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error,
    });
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await EmployeeService.deleteEmployeeFromDB(id);

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
      error: error instanceof Error ? error : "Unknown error",
    });
  }
};

export const EmployeeController = {
  createEmployee,
  updateEmployee,
  gettAllEmployees,
  getEmployeeById,
  deleteEmployee,
};
