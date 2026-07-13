import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
}