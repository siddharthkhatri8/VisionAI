import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { dailySalesReport } from "./report.controller.js";

const router = Router();

router.get(
  "/daily",
  authenticate,
  dailySalesReport
);

export default router;