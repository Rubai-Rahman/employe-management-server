import { z } from "zod";

// Define the fullName sub-schema
export const NameValidationSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .max(20, "First name cannot exceed 20 characters"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .max(20, "Last name cannot exceed 20 characters"),
});

// Define the address sub-schema
export const AddressValidationSchema = z.object({
  street: z.string({ required_error: "Street is required" }),
  city: z.string({ required_error: "City is required" }),
  country: z.string({ required_error: "Country is required" }),
});

// Define the main Employee schema using the sub-schemas
const EmployeeValidationSchema = z.object({
  employeeId: z.coerce.number({ required_error: "Employee ID is required" }),
  fullName: NameValidationSchema,
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number format"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  address: AddressValidationSchema,
  department: z.string({ required_error: "Department is required" }),
  status: z.enum(["active", "inactive"]).optional(),
  profilePicture: z.string().optional(), // URL from Cloudinary
});
export { EmployeeValidationSchema };
