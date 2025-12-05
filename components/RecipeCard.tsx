import React from 'react';
import { Clock, Users, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
  index: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, index }) => {
  // Deterministic seed for image based on recipe name length to keep it consistent but varied
  const seed = recipe.name.length + index * 100;
  
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={`https://picsum.photos/seed/${seed}/800/400`} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl font-bold font-serif leading-tight drop-shadow-md">
                {recipe.name}
            </h3>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase tracking-wider mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-orange-500" />
            <span>{recipe.prepTime} + {recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-orange-500" />
            <span>{recipe.servings} Servings</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <span className="text-orange-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                View Recipe <ChevronRight size={16} />
            </span>
        </div>
      </div>
    </div>
  );
};