import { Types } from "mongoose";

export enum PaymentStatus {
  PAID = "PAID",
  PENDING = "PENDING",
  PARTIAL = "PARTIAL",
}

export interface IInvoiceItem {
  product: Types.ObjectId;

  quantity: number;

  price: number;

  total: number;
}

export interface IInvoice {
  customer: Types.ObjectId;

  prescription?: Types.ObjectId;

  items: IInvoiceItem[];

  subtotal: number;

  discount: number;

  gst: number;

  grandTotal: number;

  paymentStatus: PaymentStatus;

  createdBy: Types.ObjectId;
}