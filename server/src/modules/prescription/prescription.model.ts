import mongoose, { Schema } from "mongoose";
import {
  IEyePrescription,
  IPrescription,
} from "./prescription.interface.js";

const eyeSchema = new Schema<IEyePrescription>(
  {
    sph: {
      type: String,
      required: true,
    },

    cyl: {
      type: String,
      required: true,
    },

    axis: {
      type: String,
      required: true,
    },

    vision: String,
  },
  {
    _id: false,
  }
);

const prescriptionSchema = new Schema<IPrescription>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    rightEye: eyeSchema,

    leftEye: eyeSchema,

    pd: String,

    addPower: String,

    remarks: String,

    prescriptionImage: String,

    visitDate: {
      type: Date,
      default: Date.now,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Prescription = mongoose.model<IPrescription>(
  "Prescription",
  prescriptionSchema
);