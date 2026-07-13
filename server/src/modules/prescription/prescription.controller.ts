import { Request, Response } from "express";
import { createPrescription, getPrescriptionById, getPrescriptions, getCustomerHistory } from "./prescription.service.js";

export const addPrescription = async (
  req: Request,
  res: Response
) => {
  const prescription = await createPrescription(
    req.body,
    req.user!.id
  );

  res.status(201).json({
    success: true,
    message: "Prescription created successfully",
    data: prescription,
  });
};

export const getAllPrescriptions = async (
  req: Request,
  res: Response
) => {
  const prescriptions = await getPrescriptions();

  res.status(200).json({
    success: true,
    message: "Prescriptions fetched successfully",
    data: prescriptions,
  });
};

export const getPrescription = async (
  req: Request,
  res: Response
) => {
  const prescription =
    await getPrescriptionById(req.params.id);

  res.json({
    success: true,
    data: prescription,
  });
};

export const prescriptionHistory =
  async (
    req: Request,
    res: Response
  ) => {
    const data =
      await getCustomerHistory(
        req.params.customerId
      );

    res.json({
      success: true,
      data,
    });
  };