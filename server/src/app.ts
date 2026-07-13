import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import routes from "./routes/index.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(globalErrorHandler);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "VisionAI API Running 🚀",
  });
});



export default app;