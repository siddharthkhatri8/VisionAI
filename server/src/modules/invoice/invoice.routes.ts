import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { addInvoice,getAllInvoices } from "./invoice.controller.js";
import { createInvoiceSchema } from "./invoice.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createInvoiceSchema),
  addInvoice
);

router.get(
  "/",
  authenticate,
  getAllInvoices
);

export default router;