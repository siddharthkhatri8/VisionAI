import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const askGemini = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text;
};


export const explainPrescription = async (
  prescription: any
) => {
  const prompt = `
You are an experienced optometrist.

Explain the following eye prescription in very simple English.

Prescription:
${JSON.stringify(prescription, null, 2)}

Rules:
- Explain SPH, CYL, AXIS and Vision.
- Tell whether the patient has myopia, hyperopia or astigmatism.
- Keep the explanation under 200 words.
- Do not use overly technical language.
`;

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  return response.text;
};

export const recommendLens = async (data: any) => {
  const prompt = `
You are an experienced optometrist.

Based on the following customer details and prescription, recommend suitable lenses.

Customer:
${JSON.stringify(data, null, 2)}

Return ONLY valid JSON:
{
  "lensType": "",
  "coatings": [],
  "reason": ""
}
`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: prompt,
      });

      return response.text;
    } catch (error: any) {
      if (error.status === 503 && attempt < 3) {
        console.log(`Retry ${attempt}...`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }

      throw error;
    }
  }
};