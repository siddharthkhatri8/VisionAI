import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import customerRoutes from "../modules/customer/customer.routes.js";
import prescriptionRoutes from "../modules/prescription/prescription.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/prescriptions", prescriptionRoutes);

export default router;