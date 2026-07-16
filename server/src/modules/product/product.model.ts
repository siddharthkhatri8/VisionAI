import mongoose, { Schema } from "mongoose";
import {
  IProduct,
  ProductCategory,
} from "./product.interface.js";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },

    buyingPrice: {
      type: Number,
      required: true,
    },

    sellingPrice: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    minimumStock: {
      type: Number,
      default: 5,
    },

    description: String,

    image: {
        type: String,
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

export const Product = mongoose.model<IProduct>(
  "Product",
  productSchema
);