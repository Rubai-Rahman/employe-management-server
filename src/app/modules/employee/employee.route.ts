import express from "express";
import upload from "./employee.upload"; // This is your Cloudinary storage middleware
import { EmployeeController } from "./employee.controller";

const router = express.Router();

// Use `upload.single("profilePicture")` to handle one image upload under that field name.
router.post(
  "/create-employee",
  upload.single("profilePicture"),
  EmployeeController.createEmployee,
);

export const UserRoutes = router;
