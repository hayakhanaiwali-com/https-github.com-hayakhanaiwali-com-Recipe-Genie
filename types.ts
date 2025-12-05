export enum DietaryPreference {
  None = "None",
  Vegetarian = "Vegetarian",
  Vegan = "Vegan",
  GlutenFree = "Gluten Free",
  Keto = "Keto",
  Paleo = "Paleo"
}

export enum MealType {
  Any = "Any",
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Snack = "Snack",
  Dessert = "Dessert"
}

export interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: NutritionalInfo;
  tips: string;
  tags: string[];
}

export interface SearchState {
  ingredients: string[];
  dietary: DietaryPreference;
  mealType: MealType;
}