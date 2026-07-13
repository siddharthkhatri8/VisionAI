import { Response } from "express";

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  response: IResponse<T>
) => {
  return res.status(response.statusCode).json({
    success: response.success,
    message: response.message,
    data: response.data ?? null,
  });
};