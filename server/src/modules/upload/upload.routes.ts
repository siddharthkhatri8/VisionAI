import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";
import { uploadImage } from "./upload.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("image"),
  uploadImage
);

export default router;