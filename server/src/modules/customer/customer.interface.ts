import { Types } from "mongoose";

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface ICustomer {
  fullName: string;
  phone: string;
  email?: string;
  age?: number;
  gender?: Gender;
  address?: string;
  occupation?: string;
  referredBy?: string;
  notes?: string;
  isActive: boolean;
  createdBy: Types.ObjectId;
  photo?: string;
}