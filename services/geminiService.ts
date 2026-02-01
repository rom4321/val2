
import { GoogleGenAI, Type } from "@google/genai";
import { LoveLetterConfig } from "../types";

export const generateLoveLetter = async (config: LoveLetterConfig): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Write a short, heart-warming Valentine's Day message for ${config.recipientName}. 
  The relationship is ${config.relationshipType} and the tone should be ${config.tone}. 
  Keep it under 100 words and make it feel personal and sweet. 
  Do not include any placeholders like [Your Name].`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "I'm a bit speechless right now because you're so amazing, but happy Valentine's Day!";
  } catch (error) {
    console.error("Error generating love letter:", error);
    return "Roses are red, violets are blue, the AI failed, but I still love you! Happy Valentine's Day!";
  }
};
