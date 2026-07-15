import { Request, Response } from "express";
import { createInvoice, getInvoices, getInvoiceById, getCustomerInvoices, updatePayment } from "./invoice.service.js";
import { generateInvoicePDF } from "../../shared/pdf/invoice.pdf.js";

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

export const getInvoice = async (
  req: Request,
  res: Response
) => {
  try {
    const invoice = await getInvoiceById(req.params.id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Invoice fetched successfully",
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

export const customerInvoiceHistory =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const invoices =
        await getCustomerInvoices(
          req.params.customerId
        );

      res.status(200).json({
        success: true,
        message:
          "Customer invoice history fetched successfully",
        data: invoices,
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

  export const updateInvoicePayment = async (
  req: Request,
  res: Response
) => {
  try {
    const invoice = await updatePayment(
      req.params.id,
      req.body.paidAmount
    );

    res.json({
      success: true,
      message: "Payment updated successfully",
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

export const downloadInvoice = async (
  req: Request,
  res: Response
) => {
  const invoice =
    await getInvoiceById(req.params.id);

  if (!invoice) {
    return res.status(404).json({
      success: false,
      message: "Invoice not found",
    });
  }

  generateInvoicePDF(invoice, res);
};
