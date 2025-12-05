import React from 'react';
import { DietaryPreference, MealType } from '../types';

interface FiltersProps {
  dietary: DietaryPreference;
  mealType: MealType;
  onDietaryChange: (val: DietaryPreference) => void;
  onMealTypeChange: (val: MealType) => void;
}

export const Filters: React.FC<FiltersProps> = ({ dietary, mealType, onDietaryChange, onMealTypeChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto mt-6">
      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Dietary Preference
        </label>
        <select
          value={dietary}
          onChange={(e) => onDietaryChange(e.target.value as DietaryPreference)}
          className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer hover:border-orange-300"
          style={{ backgroundImage: 'none' }} // Remove default arrow for custom styling if desired, simpler here to keep default
        >
          {Object.values(DietaryPreference).map((pref) => (
            <option key={pref} value={pref}>{pref}</option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Meal Type
        </label>
        <select
          value={mealType}
          onChange={(e) => onMealTypeChange(e.target.value as MealType)}
          className="w-full bg-white border border-gray-200 text-gray-700 py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all appearance-none cursor-pointer hover:border-orange-300"
        >
          {Object.values(MealType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </div>
  );
};