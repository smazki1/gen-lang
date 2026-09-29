
import { GoogleGenAI } from "@google/genai";
import type { LandingPageData } from "../types";
import { generatePrompt } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateLandingPageHtml = async (data: LandingPageData): Promise<string> => {
  if (!data.businessName || !data.description || !data.cta) {
    throw new Error("שם העסק, תיאור, וקריאה לפעולה הם שדות חובה.");
  }
  
  const prompt = generatePrompt(data);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    // The Gemini API might wrap the code in markdown, so we clean it.
    let htmlContent = response.text.trim();
    if (htmlContent.startsWith("```html")) {
      htmlContent = htmlContent.substring(7);
    }
    if (htmlContent.endsWith("```")) {
      htmlContent = htmlContent.substring(0, htmlContent.length - 3);
    }

    return htmlContent.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("יצירת דף הנחיתה נכשלה. אנא בדוק את מפתח ה-API שלך ונסה שוב.");
  }
};
