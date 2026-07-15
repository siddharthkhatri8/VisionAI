import { Request, Response } from "express";
import { askGemini, explainPrescription, recommendLens } from "./ai.service.js";

export const chat = async (
  req: Request,
  res: Response
) => {
  try {
    const answer = await askGemini(
      req.body.prompt
    );

    res.json({
      success: true,
      answer,
    });
  } catch (error) {
  console.error("Gemini Error:", error);

  res.status(500).json({
    success: false,
    message:
      error instanceof Error
        ? error.message
        : "Something went wrong",
  });
}
};

export const explain = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await explainPrescription(req.body);

    res.json({
      success: true,
      explanation: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const lensRecommendation = async (
  req: Request,
  res: Response
) => {
  try {
    const recommendation = await recommendLens(req.body);

    res.status(200).json({
      success: true,
      recommendation: JSON.parse(recommendation!),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};