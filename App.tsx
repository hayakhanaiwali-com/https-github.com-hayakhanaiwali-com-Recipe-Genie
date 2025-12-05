import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, AlertCircle } from 'lucide-react';
import { IngredientInput } from './components/IngredientInput';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { Filters } from './components/Filters';
import { generateRecipes } from './services/geminiService';
import { Recipe, DietaryPreference, MealType } from './types';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<DietaryPreference>(DietaryPreference.None);
  const [mealType, setMealType] = useState<MealType>(MealType.Any);
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleAddIngredient = (ing: string) => {
    setIngredients(prev => [...prev, ing]);
  };

  const handleRemoveIngredient = (ing: string) => {
    setIngredients(prev => prev.filter(i => i !== ing));
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipes(ingredients, dietary, mealType);
      setRecipes(generatedRecipes);
    } catch (err) {
      setError("We couldn't generate recipes at this moment. Please try again later or check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg text-white">
              <ChefHat size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif text-gray-900 leading-none">RecipeGenie</h1>
              <p className="text-xs text-gray-500">AI Culinary Assistant</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-gray-500 hover:text-gray-900">
               Powered by Gemini
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            What's in your kitchen?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter the ingredients you have on hand, and let our AI chef create a personalized menu just for you.
          </p>
        </div>

        {/* Input Section */}
        <section className="mb-16">
          <IngredientInput 
            ingredients={ingredients}
            onAdd={handleAddIngredient}
            onRemove={handleRemoveIngredient}
          />
          
          <Filters 
            dietary={dietary}
            mealType={mealType}
            onDietaryChange={setDietary}
            onMealTypeChange={setMealType}
          />

          <div className="mt-10 flex justify-center">
             <button
                onClick={handleGenerate}
                disabled={ingredients.length === 0 || isLoading}
                className={`
                  relative overflow-hidden group
                  px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1 active:translate-y-0
                  ${ingredients.length === 0 || isLoading 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                    : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-orange-600/30'}
                `}
             >
                <div className="flex items-center gap-3 relative z-10">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating Magic...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      <span>Generate Recipes</span>
                    </>
                  )}
                </div>
                {!isLoading && ingredients.length > 0 && (
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-orange-500/20"></div>
                )}
             </button>
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="mb-10 max-w-2xl mx-auto bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
             <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
             <div>
               <h4 className="font-semibold text-red-800">Oops! Something went wrong.</h4>
               <p className="text-sm text-red-600 mt-1">{error}</p>
             </div>
          </div>
        )}

        {/* Results Section */}
        {recipes.length > 0 && (
          <section className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif font-bold text-gray-900">Recommended for You</h3>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                {recipes.length} Results
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index}
                  recipe={recipe}
                  index={index}
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State / Welcome Placeholder (optional, shown when no recipes and no loading) */}
        {!isLoading && recipes.length === 0 && ingredients.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center text-gray-300 opacity-50">
             <ChefHat size={120} strokeWidth={1} />
             <p className="mt-4 text-xl font-serif">Your personal chef is waiting...</p>
          </div>
        )}
      </main>
      
      <RecipeModal 
        recipe={selectedRecipe} 
        onClose={() => setSelectedRecipe(null)} 
      />
    </div>
  );
};

export default App;