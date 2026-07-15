import "dotenv/config";

export const env = {
  PORT: process.env.PORT || "8000",
  MONGODB_URI: process.env.MONGODB_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
//   GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};