import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { addInvoice,getAllInvoices, getInvoice, customerInvoiceHistory, updateInvoicePayment, downloadInvoice } from "./invoice.controller.js";
import { createInvoiceSchema, updatePaymentSchema } from "./invoice.validation.js";

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

router.get(
  "/customer/:customerId",
  authenticate,
  customerInvoiceHistory
);

router.get(
  "/:id/pdf",
  authenticate,
  downloadInvoice
);

router.get(
  "/:id",
  authenticate,
  getInvoice
);

router.patch(
  "/:id/payment",
  authenticate,
  validate(updatePaymentSchema),
  updateInvoicePayment
);

export default router;