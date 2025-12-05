import React, { useState, useRef } from 'react';
import { Plus, X, Search } from 'lucide-react';

interface IngredientInputProps {
  ingredients: string[];
  onAdd: (ingredient: string) => void;
  onRemove: (ingredient: string) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAdd, onRemove }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  };

  const addIngredient = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      onAdd(trimmed);
      setInputValue("");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full pl-10 pr-12 py-4 bg-white border border-gray-200 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-lg transition-all"
          placeholder="What ingredients do you have? (e.g., chicken, spinach...)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addIngredient}
          className="absolute inset-y-2 right-2 flex items-center justify-center px-3 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[40px]">
        {ingredients.length === 0 && (
          <p className="text-sm text-gray-500 italic ml-2 mt-1">
            Add ingredients to start cooking...
          </p>
        )}
        {ingredients.map((ing) => (
          <span
            key={ing}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200 animate-fadeIn"
          >
            {ing}
            <button
              onClick={() => onRemove(ing)}
              className="ml-2 -mr-1 rounded-full p-0.5 hover:bg-green-100 text-green-500 focus:outline-none"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};