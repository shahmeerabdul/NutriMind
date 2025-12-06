import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: [1, 'Age must be positive'],
    max: [120, 'Age must be realistic'],
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  weight: {
    type: Number,
    min: [1, 'Weight must be positive'],
  },
  height: {
    type: Number,
    min: [1, 'Height must be positive'],
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'],
  },
  dietaryRestrictions: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean'],
  }],
  medicalConditions: [{
    type: String,
    enum: ['diabetes', 'hypertension', 'heart_issues', 'gluten_allergy', 'lactose_intolerance', 'nut_allergy', 'celiac'],
  }],
  cuisinePreferences: [{
    type: String,
  }],
  dislikedFoods: [{
    type: String,
  }],
}, {
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;

