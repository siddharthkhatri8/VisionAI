import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { addProduct, getAllProducts } from "./product.controller.js";
import { createProductSchema } from "./product.validation.js";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(createProductSchema),
  addProduct
);

router.get(
  "/",
  authenticate,
  getAllProducts
);

export default router;