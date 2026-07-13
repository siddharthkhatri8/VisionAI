import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { addPrescription, getAllPrescriptions, getPrescription, prescriptionHistory} from "./prescription.controller.js";
import { createPrescriptionSchema } from "./prescription.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createPrescriptionSchema),
  addPrescription
);

router.get(
  "/",
  authenticate,
  getAllPrescriptions
);

router.get(
  "/:id",
  authenticate,
  getPrescription
);

router.get(
  "/customer/:customerId",
  authenticate,
  prescriptionHistory
);

export default router;