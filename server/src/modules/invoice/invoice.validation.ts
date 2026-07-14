import { z } from "zod";

export const createInvoiceSchema = z.object({
  customer: z.string(),

  prescription: z.string().optional(),

  items: z.array(
    z.object({
      product: z.string(),

      quantity: z.number().min(1),
    })
  ),

  discount: z.number().optional(),
});