import { Model } from "mongoose";

export type TEmployeeName = {
  firstName: string;
  lastName: string;
};

export type TEmployeeAddress = {
  street: string;
  city: string;
  country: string;
};

export interface TEmployee {
  employeeId: number;
  fullName: TEmployeeName;
  phone: string;
  email: string;
  address: TEmployeeAddress;
  department: string;
  status?: "active" | "inactive";
  profilePicture?: string;
}

// 🔹 Define Static Methods Type
export interface EmployeeStatics {
  isEmployeeExists(employeeId: number): Promise<TEmployee | null>;
  isEmailUserNameExists(
    username: string,
    email: string,
  ): Promise<TEmployee | null>;
}

// 🔹 Define the Model Type (with Static Methods)
export type EmployeeModel = Model<TEmployee, {}, EmployeeStatics>;
