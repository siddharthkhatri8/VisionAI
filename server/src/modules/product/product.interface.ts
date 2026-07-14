import { Types } from "mongoose";

export enum ProductCategory {
  FRAME = "FRAME",
  LENS = "LENS",
  CONTACT_LENS = "CONTACT_LENS",
  SUNGLASSES = "SUNGLASSES",
  ACCESSORY = "ACCESSORY",
}

export interface IProduct {
  name: string;

  sku: string;

  brand: string;

  category: ProductCategory;

  buyingPrice: number;

  sellingPrice: number;

  stock: number;

  minimumStock: number;

  description?: string;

  image?: string;

  createdBy: Types.ObjectId;

  isActive: boolean;
}