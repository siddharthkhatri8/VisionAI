import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),

  sku: z.string().min(2),

  brand: z.string(),

  category: z.enum([
    "FRAME",
    "LENS",
    "CONTACT_LENS",
    "SUNGLASSES",
    "ACCESSORY",
  ]),

  buyingPrice: z.number(),

  sellingPrice: z.number(),

  stock: z.number(),

  minimumStock: z.number().optional(),

  description: z.string().optional(),
});