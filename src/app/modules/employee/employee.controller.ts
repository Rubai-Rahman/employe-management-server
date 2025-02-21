import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";
import { EmployeeValidationSchema } from "./employee.validation";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

const createEmployee = async (req: Request, res: Response) => {
  console.log("file", req.file);
  try {
    if (req.body.fullName) req.body.fullName = JSON.parse(req.body.fullName);
    if (req.body.address) req.body.address = JSON.parse(req.body.address);
    const validatedData = EmployeeValidationSchema.parse(req.body);

    if (req.file) {
      validatedData.profilePicture = req.file.path;
    }
    // Call the service layer to create the employee record
    const result = await EmployeeService.createEmployeeIntoDb(validatedData);
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

const gettAllEmployes = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeService.getAllEmployeesFromDB();

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
const getEmployeById = async (req: Request, res: Response) => {
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

export const EmployeeController = {
  createEmployee,
  gettAllEmployes,
  getEmployeById,
};
