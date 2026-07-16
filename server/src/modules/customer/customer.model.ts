import mongoose, { Schema } from "mongoose";
import { Gender, ICustomer } from "./customer.interface.js";

const customerSchema = new Schema<ICustomer>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      default: "",
    },

    age: Number,

    gender: {
      type: String,
      enum: Object.values(Gender),
    },

    address: String,

    occupation: String,

    referredBy: String,

    notes: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    photo: {
        type: String,
    },
    
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model<ICustomer>(
  "Customer",
  customerSchema
);