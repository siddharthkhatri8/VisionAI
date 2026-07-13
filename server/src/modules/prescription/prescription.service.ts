import { Customer } from "../customer/customer.model.js";
import { Prescription } from "./prescription.model.js";

export const createPrescription = async (
  payload: any,
  userId: string
) => {
  const customer = await Customer.findById(payload.customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return await Prescription.create({
    ...payload,
    createdBy: userId,
  });
};

export const getPrescriptions = async () => {
  return await Prescription.find()
    .populate("customerId", "fullName phone")
    .sort({ createdAt: -1 });
};

export const getPrescriptionById = async (
  id: string
) => {
  return await Prescription.findById(id)
    .populate("customerId");
};

export const getCustomerHistory = async (
  customerId: string
) => {
  return await Prescription.find({
    customerId,
    isActive: true,
  }).sort({
    visitDate: -1,
  });
};