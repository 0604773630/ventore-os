import { GoogleGenAI, Type } from "@google/genai";
import { VentureData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const ventureSchema = {
  type: Type.OBJECT,
  properties: {
    config: {
      type: Type.OBJECT,
      properties: {
        projectName: { type: Type.STRING },
        tagline: { type: Type.STRING },
        brandColors: {
          type: Type.OBJECT,
          properties: {
            primary: { type: Type.STRING, description: "Hex code" },
            secondary: { type: Type.STRING, description: "Hex code" },
            background: { type: Type.STRING, description: "Hex code" }
          },
          required: ["primary", "secondary", "background"]
        },
        pricingModel: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING, enum: ["Subscription", "Commission", "Freemium"] },
            basePrice: { type: Type.NUMBER },
            premiumMultiplier: { type: Type.NUMBER },
            currencySymbol: { type: Type.STRING }
          },
          required: ["type", "basePrice", "premiumMultiplier", "currencySymbol"]
        },
        databaseSchema: {
          type: Type.OBJECT,
          properties: {
            tables: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  columns: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["name", "columns"]
              }
            }
          },
          required: ["tables"]
        },
        featureFlags: {
          type: Type.OBJECT,
          properties: {
            mvp: { type: Type.ARRAY, items: { type: Type.STRING } },
            v2: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["mvp", "v2"]
        }
      },
      required: ["projectName", "tagline", "brandColors", "pricingModel", "databaseSchema", "featureFlags"]
    },
    strategy: {
      type: Type.OBJECT,
      properties: {
        problemStatement: { type: Type.STRING },
        solutionDescription: { type: Type.STRING },
        monetizationStrategy: { type: Type.STRING }
      },
      required: ["problemStatement", "solutionDescription", "monetizationStrategy"]
    },
    deck: {
      type: Type.OBJECT,
      properties: {
        slide4BusinessModel: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            points: { type: Type.ARRAY, items: { type: Type.STRING } },
            projectedRevenueYear1: { type: Type.STRING }
          },
          required: ["title", "points", "projectedRevenueYear1"]
        },
        slide7TheAsk: {
          type: Type.OBJECT,
          properties: {
            amount: { type: Type.STRING },
            equity: { type: Type.STRING },
            runwayMonths: { type: Type.NUMBER },
            useOfFunds: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["amount", "equity", "runwayMonths", "useOfFunds"]
        }
      },
      required: ["slide4BusinessModel", "slide7TheAsk"]
    }
  },
  required: ["config", "strategy", "deck"]
};

export const generateVenturePack = async (idea: string): Promise<VentureData> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Venture-OS, a startup architect. Analyze this startup idea: "${idea}". 
      Generate a complete technical and business architecture pack.
      Ensure the pricing numbers in the config match the descriptions in the strategy and pitch deck.
      Be realistic, modern, and specific.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: ventureSchema,
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Venture-OS Core");
    
    return JSON.parse(text) as VentureData;
  } catch (error) {
    console.error("Venture-OS Generation Error:", error);
    throw error;
  }
};