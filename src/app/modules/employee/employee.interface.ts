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
  address?: TEmployeeAddress;
  department: string;
  status?: "active" | "inactive";
  profilePicture?: string;
}
export type EmployeMethods = {
  isEmployeeExists(employeId: number): Promise<TEmployee | null>;
  isEmailUserNameExists(
    username: string,
    email: string,
  ): Promise<TEmployee | null>;
};

export type employeeModel = Model<
  TEmployee,
  Record<string, never>,
  EmployeMethods
>;
