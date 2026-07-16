import { Types } from "mongoose";

export interface IEyePrescription {
  sph: string;
  cyl: string;
  axis: string;
  vision?: string;
}

export interface IPrescription {
  customerId: Types.ObjectId;

  doctorName: string;

  rightEye: IEyePrescription;

  leftEye: IEyePrescription;

  pd?: string;

  addPower?: string;

  remarks?: string;

  prescriptionImage?: string;

  visitDate: Date;

  createdBy: Types.ObjectId;
  scanImage?: string;

  isActive: boolean;
}