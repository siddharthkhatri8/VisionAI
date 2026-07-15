import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { chat, explain, lensRecommendation } from "./ai.controller.js";

const router = Router();

router.post(
  "/chat",
  authenticate,
  chat
);

router.post(
  "/prescription-explain",
  authenticate,
  explain
);

router.post(
  "/lens-recommendation",
  authenticate,
  lensRecommendation
);

export default router;