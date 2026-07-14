import { Request, Response } from "express";
import { createInvoice, getInvoices } from "./invoice.service.js";

export const addInvoice = async (
  req: Request,
  res: Response
) => {
  try {
    const invoice = await createInvoice(
      req.body,
      req.user!.id
    );

    res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getAllInvoices = async (
  req: Request,
  res: Response
) => {
  const invoices = await getInvoices();

  res.status(200).json({
    success: true,
    data: invoices,
  });
};