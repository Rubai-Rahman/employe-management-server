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
// Add static methods to the model interface
export interface EmployeeModel extends Model<TEmployee> {
  isEmployeeExists(employeeId: number): Promise<TEmployee | null>;
  isEmailUserNameExists(
    username: string,
    email: string,
    phone: string,
  ): Promise<TEmployee | null>;
}
