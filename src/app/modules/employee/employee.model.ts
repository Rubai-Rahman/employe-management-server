import { Schema, model } from "mongoose";
import {
  EmployeeModel,
  TEmployee,
  TEmployeeAddress,
  TEmployeeName,
} from "./employee.interface";

// Define the sub-schema for fullName
const fullNameSchema = new Schema<TEmployeeName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "First name cannot exceed 20 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [20, "Last name cannot exceed 20 characters"],
  },
});

// Define the sub-schema for address (optional)
const addressSchema = new Schema<TEmployeeAddress>({
  street: { type: String, trim: true },
  city: { type: String, trim: true },
  country: { type: String, trim: true },
});

// Define Employee Schema
const EmployeeSchema = new Schema<TEmployee, EmployeeModel>(
  {
    employeeId: { type: Number, required: true, unique: true },
    fullName: fullNameSchema,
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Invalid phone number format"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },
    address: { type: addressSchema },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    profilePicture: { type: String, trim: true }, // Cloudinary Image URL
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

// 🔹 Method: Check if Employee Exists by ID
EmployeeSchema.statics.isEmployeeExists = async function (employeeId: number) {
  return await this.findOne({ employeeId }).lean(); // Improves performance
};

// 🔹 Method: Check if Email or Username Exists
EmployeeSchema.statics.isEmailUserNameExists = async function (
  username: string,
  email: string,
  phone: string,
) {
  return await this.findOne({
    $or: [
      { "fullName.firstName": username },
      { "fullName.lastName": username },
      { email },
      { phone },
    ],
  }).lean();
};

// Define Model
export const Employee = model<TEmployee, EmployeeModel>(
  "Employee",
  EmployeeSchema,
);
