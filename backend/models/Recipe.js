import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  ingredients: [{
    name: String,
    amount: String,
    unit: String,
  }],
  instructions: [{
    type: String,
  }],
  tags: [{
    type: String,
    enum: [
      'vegan',
      'vegetarian',
      'glutenFree',
      'diabeticFriendly',
      'highProtein',
      'lowCarb',
      'lowSodium',
      'highFiber',
      'quickPrep',
      'easy',
      'dairyFree',
      'nutFree',
      'ironRich',
      'magnesiumRich',
      'dopamineBoosting',
      'complexCarbs',
      'lowGlycemic',
    ],
  }],
  nutrition: {
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      default: 0,
    },
    carbs: {
      type: Number,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0,
    },
    fiber: {
      type: Number,
      default: 0,
    },
    sugar: {
      type: Number,
      default: 0,
    },
    sodium: {
      type: Number,
      default: 0,
    },
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true,
  },
  prepTime: {
    type: Number,
    default: 15,
  },
  servings: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

