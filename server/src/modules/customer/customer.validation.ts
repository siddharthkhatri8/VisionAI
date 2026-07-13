import { z } from "zod";

export const createCustomerSchema = z.object({
  fullName: z.string().min(3),

  phone: z.string().regex(/^[6-9]\d{9}$/),

  email: z.string().email().optional(),

  age: z.number().optional(),

  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),

  address: z.string().optional(),

  occupation: z.string().optional(),

  referredBy: z.string().optional(),

  notes: z.string().optional(),
});