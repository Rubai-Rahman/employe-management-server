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
router.put(
  "/:id",
  upload.single("profilePicture"),
  EmployeeController.updateEmployee,
);
router.get("/", EmployeeController.gettAllEmployes);
router.get("/:id", EmployeeController.getEmployeById);
router.delete("/:id", EmployeeController.deleteEmployee);

export const EmployeeRoutes = router;
