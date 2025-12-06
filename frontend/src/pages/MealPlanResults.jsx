import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealCard from '../components/MealCard';
import GroceryListCard from '../components/GroceryListCard';
import NutritionChart from '../components/NutritionChart';
import toast from 'react-hot-toast';

const MealPlanResults = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('mealPlan');
    if (stored) {
      setMealPlan(JSON.parse(stored));
    } else {
      toast.error('No meal plan found. Please generate one first.');
      navigate('/generate');
    }
  }, [navigate]);

  if (!mealPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Your Meal Plan</h1>
        <button
          onClick={() => navigate('/generate')}
          className="btn-primary"
        >
          Regenerate Plan
        </button>
      </div>

      <div className="mb-8">
        <NutritionChart
          totalMacros={mealPlan.totalMacros}
          totalCalories={mealPlan.totalCalories}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8 items-stretch">
        <MealCard meal={mealPlan.breakfast} mealType="Breakfast" />
        <MealCard meal={mealPlan.lunch} mealType="Lunch" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8 items-stretch">
        <MealCard meal={mealPlan.dinner} mealType="Dinner" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Snacks</h2>
          <div className="space-y-4">
            {mealPlan.snacks.map((snack, index) => (
              <MealCard key={index} meal={snack} mealType={`Snack ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <GroceryListCard groceryList={mealPlan.groceryList} />
      </div>
    </div>
  );
};

export default MealPlanResults;

