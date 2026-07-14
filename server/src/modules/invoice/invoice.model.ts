import mongoose, { Schema } from "mongoose";
import {
  IInvoice,
  PaymentStatus,
} from "./invoice.interface.js";

const invoiceSchema = new Schema<IInvoice>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    prescription: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: Number,

        price: Number,

        total: Number,
      },
    ],

    subtotal: Number,

    discount: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 18,
    },

    grandTotal: Number,

    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice = mongoose.model<IInvoice>(
  "Invoice",
  invoiceSchema
);