import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, DietaryPreference, MealType } from "../types";

export const generateRecipes = async (
  ingredients: string[],
  dietary: DietaryPreference,
  mealType: MealType
): Promise<Recipe[]> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const dietaryPrompt = dietary !== DietaryPreference.None ? `Dietary restriction: ${dietary}.` : "";
  const mealPrompt = mealType !== MealType.Any ? `Meal type: ${mealType}.` : "";

  const prompt = `
    Create 3 distinct, creative, and practical recipes using these ingredients: ${ingredients.join(", ")}.
    ${dietaryPrompt}
    ${mealPrompt}
    You may assume the user has basic pantry staples (oil, salt, pepper, water, basic spices).
    For each recipe, provide detailed steps, estimated times, serving suggestions, and nutritional estimates.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Name of the dish" },
              description: { type: Type.STRING, description: "A short, appetizing description" },
              prepTime: { type: Type.STRING, description: "Preparation time (e.g., '15 mins')" },
              cookTime: { type: Type.STRING, description: "Cooking time (e.g., '30 mins')" },
              servings: { type: Type.INTEGER, description: "Number of servings" },
              ingredients: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of ingredients with quantities"
              },
              instructions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Step-by-step cooking instructions"
              },
              nutritionalInfo: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.INTEGER },
                  protein: { type: Type.STRING },
                  carbs: { type: Type.STRING },
                  fat: { type: Type.STRING }
                }
              },
              tips: { type: Type.STRING, description: "Chef's tips for presentation or variations" },
              tags: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Tags like 'Spicy', 'Quick', 'Comfort Food'" }
            },
            required: ["name", "description", "prepTime", "cookTime", "ingredients", "instructions", "nutritionalInfo"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Recipe[];
    }
    return [];
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
};