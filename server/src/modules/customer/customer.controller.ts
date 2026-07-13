import { Request, Response } from "express";
import { createCustomer, getCustomers,getCustomerById, updateCustomer, deleteCustomer } from "./customer.service.js";


export const addCustomer = async (
  req: Request,
  res: Response
) => {
  const customer = await createCustomer(
    req.body,
    req.user!.id
  );

  res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: customer,
  });
};

export const getAllCustomers = async (
  req: Request,
  res: Response
) => {
  const result = await getCustomers(req.query);

  res.status(200).json({
  success: true,
  message: "Customers fetched successfully",
  meta: result.meta,
  data: result.customers,
});
};

export const getCustomer = async (
  req: Request,
  res: Response
) => {
  const customer = await getCustomerById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Customer fetched successfully",
    data: customer,
  });
};

export const editCustomer = async (
  req: Request,
  res: Response
) => {
  const customer = await updateCustomer(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: customer,
  });
};

export const removeCustomer = async (
  req: Request,
  res: Response
) => {
  await deleteCustomer(req.params.id);

  res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
  });
};