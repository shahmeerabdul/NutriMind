import Recipe from '../models/Recipe.js';
import Profile from '../models/Profile.js';

// Mifflin-St Jeor Equation for BMR calculation
const calculateBMR = (weight, height, age, sex) => {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Activity multipliers
const activityMultipliers = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extremely_active: 1.9,
};

// Calculate daily caloric needs
const calculateDailyCalories = (profile, goal) => {
  if (!profile.weight || !profile.height || !profile.age || !profile.sex || !profile.activityLevel) {
    return 2000; // Default calories
  }

  const bmr = calculateBMR(profile.weight, profile.height, profile.age, profile.sex);
  const tdee = bmr * (activityMultipliers[profile.activityLevel] || 1.2);

  // Adjust based on goal
  if (goal === 'lose_weight') {
    return Math.round(tdee * 0.85); // 15% deficit
  } else if (goal === 'gain_weight') {
    return Math.round(tdee * 1.15); // 15% surplus
  } else if (goal === 'increase_energy') {
    return Math.round(tdee * 1.1); // 10% surplus for energy
  } else {
    return Math.round(tdee); // Maintain
  }
};

// Mood to tag mapping
const moodToTags = {
  tired: ['complexCarbs', 'ironRich', 'quickPrep', 'easy'],
  stressed: ['magnesiumRich', 'lowSodium', 'highFiber'],
  sad: ['dopamineBoosting', 'highProtein'],
  energetic: ['highProtein', 'complexCarbs'],
  lazy: ['quickPrep', 'easy'],
  happy: [], // No specific restrictions for happy mood
};

// Medical condition to tag mapping
const medicalToTags = {
  diabetes: ['diabeticFriendly', 'lowGlycemic', 'lowCarb'],
  hypertension: ['lowSodium'],
  heart_issues: ['lowSodium', 'lowCarb'],
  gluten_allergy: ['glutenFree'],
  celiac: ['glutenFree'],
  lactose_intolerance: ['dairyFree'],
  nut_allergy: ['nutFree'],
};

// Dietary restriction to tag mapping
const dietaryToTags = {
  vegetarian: ['vegetarian'],
  vegan: ['vegan'],
  pescatarian: ['pescatarian'],
  keto: ['lowCarb', 'highProtein'],
  paleo: ['glutenFree', 'dairyFree'],
  mediterranean: ['highFiber', 'highProtein'],
};

// Filter recipes based on constraints
const filterRecipes = (recipes, profile, mood, medicalConditions, dietaryRestrictions) => {
  let filtered = [...recipes];

  // Apply mood-based tags
  const moodTags = moodToTags[mood] || [];
  if (moodTags.length > 0) {
    filtered = filtered.filter(recipe => 
      moodTags.some(tag => recipe.tags.includes(tag))
    );
  }

  // Apply medical condition tags
  const medicalTags = [];
  medicalConditions?.forEach(condition => {
    if (medicalToTags[condition]) {
      medicalTags.push(...medicalToTags[condition]);
    }
  });
  if (medicalTags.length > 0) {
    filtered = filtered.filter(recipe => 
      medicalTags.every(tag => recipe.tags.includes(tag))
    );
  }

  // Apply dietary restriction tags
  const dietaryTags = [];
  dietaryRestrictions?.forEach(restriction => {
    if (dietaryToTags[restriction]) {
      dietaryTags.push(...dietaryToTags[restriction]);
    }
  });
  if (dietaryTags.length > 0) {
    filtered = filtered.filter(recipe => 
      dietaryTags.some(tag => recipe.tags.includes(tag))
    );
  }

  // Filter out disliked foods
  if (profile?.dislikedFoods && profile.dislikedFoods.length > 0) {
    filtered = filtered.filter(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase());
      return !profile.dislikedFoods.some(disliked => 
        recipeIngredients.some(ing => ing.includes(disliked.toLowerCase()))
      );
    });
  }

  // Filter by cuisine preferences if specified
  if (profile?.cuisinePreferences && profile.cuisinePreferences.length > 0) {
    // This is a simple implementation - in production, you'd have cuisine tags on recipes
    // For now, we'll just pass through
  }

  return filtered;
};

// Generate reasoning for meal
const generateReasoning = (recipe, mood, medicalConditions) => {
  const reasons = [];

  if (mood === 'tired') {
    reasons.push('Rich in complex carbohydrates and iron to boost energy levels');
  } else if (mood === 'stressed') {
    reasons.push('Contains magnesium and fiber to help reduce stress');
  } else if (mood === 'sad') {
    reasons.push('Includes dopamine-boosting nutrients to improve mood');
  } else if (mood === 'energetic') {
    reasons.push('Balanced macros to sustain your energy throughout the day');
  } else if (mood === 'lazy') {
    reasons.push('Quick and easy to prepare, perfect for when you need something simple');
  }

  if (medicalConditions?.includes('diabetes')) {
    reasons.push('Low glycemic index to help manage blood sugar levels');
  }
  if (medicalConditions?.includes('hypertension')) {
    reasons.push('Low sodium content to support healthy blood pressure');
  }
  if (medicalConditions?.includes('heart_issues')) {
    reasons.push('Heart-healthy ingredients to support cardiovascular health');
  }

  if (reasons.length === 0) {
    reasons.push('Nutritious and balanced meal to support your health goals');
  }

  return reasons.join('. ') + '.';
};

// Distribute calories across meals
const distributeCalories = (totalCalories) => {
  return {
    breakfast: Math.round(totalCalories * 0.25),
    lunch: Math.round(totalCalories * 0.35),
    dinner: Math.round(totalCalories * 0.30),
    snacks: Math.round(totalCalories * 0.10),
  };
};

// Select recipe closest to target calories with randomization for variety
const selectRecipe = (recipes, targetCalories, tolerance = 300) => {
  if (recipes.length === 0) return null;

  // Calculate differences and sort
  const sorted = recipes
    .map(recipe => ({
      ...recipe.toObject(),
      diff: Math.abs(recipe.nutrition.calories - targetCalories),
    }))
    .sort((a, b) => a.diff - b.diff);

  // Select from top 5 closest matches (or all if less than 5) for variety
  const topMatches = sorted.slice(0, Math.min(5, sorted.length));
  
  // Filter to recipes within tolerance
  const withinTolerance = topMatches.filter(recipe => recipe.diff <= tolerance);
  const candidates = withinTolerance.length > 0 ? withinTolerance : topMatches;
  
  // Randomly select from candidates
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
};

// Generate grocery list
const generateGroceryList = (meals) => {
  const groceryMap = new Map();

  meals.forEach(meal => {
    if (meal && meal.ingredients) {
      meal.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase().trim();
        if (groceryMap.has(key)) {
          // Could aggregate amounts here if needed
          groceryMap.set(key, {
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          });
        } else {
          groceryMap.set(key, {
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          });
        }
      });
    }
  });

  return Array.from(groceryMap.values());
};

export const generateMealPlan = async (req, res) => {
  try {
    const { mood, medicalConditions, goals, profileId } = req.body;

    if (!mood || !goals || !profileId) {
      return res.status(400).json({ message: 'Missing required fields: mood, goals, profileId' });
    }

    // Get user profile
    const profile = await Profile.findOne({ userId: profileId });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Calculate daily calories
    const totalCalories = calculateDailyCalories(profile, goals);
    const mealCalories = distributeCalories(totalCalories);

    // Get all recipes
    const allRecipes = await Recipe.find({});

    // Filter recipes based on constraints
    const filteredRecipes = filterRecipes(
      allRecipes,
      profile,
      mood,
      medicalConditions || profile.medicalConditions,
      profile.dietaryRestrictions
    );

    // Separate by meal type
    const breakfastRecipes = filteredRecipes.filter(r => r.mealType === 'breakfast');
    const lunchRecipes = filteredRecipes.filter(r => r.mealType === 'lunch');
    const dinnerRecipes = filteredRecipes.filter(r => r.mealType === 'dinner');
    const snackRecipes = filteredRecipes.filter(r => r.mealType === 'snack');

    // Select meals - fallback to all recipes if filtered list is empty
    const finalBreakfastRecipes = breakfastRecipes.length > 0 ? breakfastRecipes : allRecipes.filter(r => r.mealType === 'breakfast');
    const finalLunchRecipes = lunchRecipes.length > 0 ? lunchRecipes : allRecipes.filter(r => r.mealType === 'lunch');
    const finalDinnerRecipes = dinnerRecipes.length > 0 ? dinnerRecipes : allRecipes.filter(r => r.mealType === 'dinner');
    const finalSnackRecipes = snackRecipes.length > 0 ? snackRecipes : allRecipes.filter(r => r.mealType === 'snack');

    const breakfast = selectRecipe(finalBreakfastRecipes, mealCalories.breakfast);
    const lunch = selectRecipe(finalLunchRecipes, mealCalories.lunch);
    const dinner = selectRecipe(finalDinnerRecipes, mealCalories.dinner);
    const snacks = [
      selectRecipe(finalSnackRecipes, mealCalories.snacks / 2),
    ].filter(Boolean);

    if (!breakfast || !lunch || !dinner) {
      return res.status(404).json({ 
        message: 'Could not generate meal plan. Please ensure recipes are seeded in the database.' 
      });
    }

    // Format response
    const formatMeal = (recipe) => ({
      title: recipe.title,
      description: recipe.description,
      calories: recipe.nutrition.calories,
      macros: {
        protein: recipe.nutrition.protein,
        carbs: recipe.nutrition.carbs,
        fat: recipe.nutrition.fat,
        fiber: recipe.nutrition.fiber,
      },
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      reasoning: generateReasoning(recipe, mood, medicalConditions || profile.medicalConditions),
      prepTime: recipe.prepTime,
    });

    const mealPlan = {
      breakfast: formatMeal(breakfast),
      lunch: formatMeal(lunch),
      dinner: formatMeal(dinner),
      snacks: snacks.map(formatMeal),
      groceryList: generateGroceryList([breakfast, lunch, dinner, ...snacks]),
      totalCalories: [breakfast, lunch, dinner, ...snacks].reduce(
        (sum, meal) => sum + (meal?.nutrition?.calories || 0),
        0
      ),
      totalMacros: {
        protein: [breakfast, lunch, dinner, ...snacks].reduce(
          (sum, meal) => sum + (meal?.nutrition?.protein || 0),
          0
        ),
        carbs: [breakfast, lunch, dinner, ...snacks].reduce(
          (sum, meal) => sum + (meal?.nutrition?.carbs || 0),
          0
        ),
        fat: [breakfast, lunch, dinner, ...snacks].reduce(
          (sum, meal) => sum + (meal?.nutrition?.fat || 0),
          0
        ),
      },
    };

    res.json(mealPlan);
  } catch (error) {
    console.error('Meal generation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

