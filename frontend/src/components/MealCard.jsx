const MealCard = ({ meal, mealType }) => {
  if (!meal) return null;

  return (
    <div className="card h-full w-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 capitalize">{mealType}</h3>
          <h4 className="text-lg font-semibold text-primary-600 mt-1">{meal.title}</h4>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{meal.calories}</div>
          <div className="text-xs text-gray-500">calories</div>
        </div>
      </div>

      {meal.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{meal.description}</p>
      )}

      <div className="mb-4">
        <h5 className="font-semibold text-gray-700 mb-2">Macronutrients:</h5>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-blue-600 font-medium">Protein</div>
            <div className="text-gray-700">{meal.macros.protein}g</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-green-600 font-medium">Carbs</div>
            <div className="text-gray-700">{meal.macros.carbs}g</div>
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <div className="text-yellow-600 font-medium">Fat</div>
            <div className="text-gray-700">{meal.macros.fat}g</div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h5 className="font-semibold text-gray-700 mb-2">Why this meal?</h5>
        <p className="text-sm text-gray-600 bg-primary-50 p-3 rounded-lg">
          {meal.reasoning}
        </p>
      </div>

      <div className="mb-4 flex-grow">
        <h5 className="font-semibold text-gray-700 mb-2">Ingredients:</h5>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {meal.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow">
        <h5 className="font-semibold text-gray-700 mb-2">Instructions:</h5>
        <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
          {meal.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      {meal.prepTime && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="text-xs text-gray-500">Prep time: {meal.prepTime} minutes</span>
        </div>
      )}
    </div>
  );
};

export default MealCard;

