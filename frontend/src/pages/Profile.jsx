import { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { profile, updateProfile, loading } = useProfile();
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryRestrictions: [],
    medicalConditions: [],
    cuisinePreferences: [],
    dislikedFoods: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        age: profile.age || '',
        sex: profile.sex || '',
        weight: profile.weight || '',
        height: profile.height || '',
        activityLevel: profile.activityLevel || '',
        dietaryRestrictions: profile.dietaryRestrictions || [],
        medicalConditions: profile.medicalConditions || [],
        cuisinePreferences: profile.cuisinePreferences || [],
        dislikedFoods: profile.dislikedFoods?.join(', ') || '',
      });
    }
  }, [profile]);

  const dietaryOptions = ['vegetarian', 'vegan', 'pescatarian', 'keto', 'paleo', 'mediterranean'];
  const medicalOptions = [
    'diabetes',
    'hypertension',
    'heart_issues',
    'gluten_allergy',
    'lactose_intolerance',
    'nut_allergy',
    'celiac',
  ];
  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'lightly_active', label: 'Lightly Active (light exercise 1-3 days/week)' },
    { value: 'moderately_active', label: 'Moderately Active (moderate exercise 3-5 days/week)' },
    { value: 'very_active', label: 'Very Active (hard exercise 6-7 days/week)' },
    { value: 'extremely_active', label: 'Extremely Active (very hard exercise, physical job)' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelect = (name, value) => {
    setFormData((prev) => {
      const current = prev[name] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [name]: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      dislikedFoods: formData.dislikedFoods.split(',').map((f) => f.trim()).filter(Boolean),
    };
    await updateProfile(submitData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
                min="1"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sex
              </label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input-field"
                min="1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input-field"
                min="1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Level
              </label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select</option>
                {activityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Dietary Restrictions</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.dietaryRestrictions.includes(option)}
                  onChange={() => handleMultiSelect('dietaryRestrictions', option)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {option.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Medical Conditions</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {medicalOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.medicalConditions.includes(option)}
                  onChange={() => handleMultiSelect('medicalConditions', option)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {option.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Food Preferences</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disliked Foods (comma-separated)
            </label>
            <input
              type="text"
              name="dislikedFoods"
              value={formData.dislikedFoods}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., mushrooms, olives, cilantro"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

