import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import customerRoutes from "../modules/customer/customer.routes.js";
import prescriptionRoutes from "../modules/prescription/prescription.routes.js";
import productRoutes from "../modules/product/product.routes.js";
import invoiceRoutes from "../modules/invoice/invoice.routes.js";
import reportRoutes from "../modules/report/report.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";
import uploadRoutes from "../modules/upload/upload.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/prescriptions", prescriptionRoutes);
router.use("/products", productRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/reports", reportRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/ai", aiRoutes);
router.use("/upload", uploadRoutes);

export default router;