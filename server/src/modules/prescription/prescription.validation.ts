import { z } from "zod";

const eyeSchema = z.object({
  sph: z.string(),

  cyl: z.string(),

  axis: z.string(),

  vision: z.string().optional(),
});

export const createPrescriptionSchema = z.object({
  customerId: z.string(),

  doctorName: z.string().min(3),

  rightEye: eyeSchema,

  leftEye: eyeSchema,

  pd: z.string().optional(),

  addPower: z.string().optional(),

  remarks: z.string().optional(),
});