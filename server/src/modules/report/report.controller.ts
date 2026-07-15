import { Request, Response } from "express";
import { getDailySalesReport } from "./report.service.js";

export const dailySalesReport = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getDailySalesReport();

    res.status(200).json({
      success: true,
      message: "Daily sales report fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};