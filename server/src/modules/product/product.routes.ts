import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";

import { addProduct, getAllProducts, getProduct, editProduct, removeProduct, lowStockProducts } from "./product.controller.js";
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

router.get(
  "/low-stock",
  authenticate,
  lowStockProducts
);

router.get(
  "/:id",
  authenticate,
  getProduct
);

router.patch(
  "/:id",
  authenticate,
  editProduct
);

router.delete(
  "/:id",
  authenticate,
  removeProduct
);



export default router;