import React from 'react';
import { X, Clock, Users, ChefHat, Flame, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  // Prepare data for chart
  const nutritionData = [
    { name: 'Carbs', value: parseInt(recipe.nutritionalInfo.carbs) || 0, unit: 'g', color: '#fb923c' },
    { name: 'Protein', value: parseInt(recipe.nutritionalInfo.protein) || 0, unit: 'g', color: '#f87171' },
    { name: 'Fat', value: parseInt(recipe.nutritionalInfo.fat) || 0, unit: 'g', color: '#facc15' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl custom-scrollbar flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Left Side: Image & Nutrition */}
        <div className="w-full md:w-2/5 bg-stone-50 md:sticky md:top-0 h-auto md:h-[90vh] overflow-y-auto custom-scrollbar flex flex-col">
            <div className="h-64 w-full relative shrink-0">
                <img 
                    src={`https://picsum.photos/seed/${recipe.name.length}/800/600`} 
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 text-sm font-medium mb-1">
                        <Flame size={16} className="text-orange-400" />
                        <span>{recipe.nutritionalInfo.calories} Calories</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <Leaf size={20} className="text-green-500" /> Nutritional Info
                </h3>
                <div className="h-48 w-full mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={nutritionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 12, fill: '#666'}} axisLine={false} tickLine={false}/>
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                cursor={{fill: 'transparent'}}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                {nutritionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <h4 className="font-bold text-orange-800 text-sm mb-2 flex items-center gap-2">
                        <ChefHat size={16} /> Chef's Tip
                    </h4>
                    <p className="text-orange-700 text-sm italic leading-relaxed">
                        "{recipe.tips}"
                    </p>
                </div>
            </div>
        </div>

        {/* Right Side: Details & Steps */}
        <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{recipe.name}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8 text-sm font-medium text-gray-500">
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Clock size={18} className="text-blue-500" />
                    Prep: {recipe.prepTime}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Flame size={18} className="text-red-500" />
                    Cook: {recipe.cookTime}
                </div>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Users size={18} className="text-green-500" />
                    Serves: {recipe.servings}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Ingredients</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-orange-400 shrink-0"></span>
                            <span>{ing}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Instructions</h3>
                <div className="space-y-6">
                    {recipe.instructions.map((step, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center font-bold text-sm">
                                {i + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed pt-1">
                                {step}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};