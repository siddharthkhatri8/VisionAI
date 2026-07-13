import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { addCustomer, getAllCustomers, getCustomer, editCustomer, removeCustomer } from "./customer.controller.js";
import { createCustomerSchema } from "./customer.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createCustomerSchema),
  addCustomer
);

router.get(
  "/",
  authenticate,
  getAllCustomers
);

router.get(
  "/:id",
  authenticate,
  getCustomer
);

router.patch(
  "/:id",
  authenticate,
  editCustomer
);

router.delete(
  "/:id",
  authenticate,
  removeCustomer
);

export default router;  