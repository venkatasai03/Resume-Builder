import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export const geminiGeneration = async ({ prompt }: { prompt: string }) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("No Gemini api key in env variables");
  }
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const resumeContent = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resumeContent) {
      throw new Error("No content generated");
    }

    return resumeContent;
  } catch (error: any) {
    console.log("Error", error);
    throw new Error("Gemini content generation failed");
  }
};
