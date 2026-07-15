import { Request, Response } from "express";
import { getDashboardData } from "./dashboard.service.js";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getDashboardData();

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
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