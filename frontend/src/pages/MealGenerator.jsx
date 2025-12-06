import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import MoodSelector from '../components/MoodSelector';
import GoalSelector from '../components/GoalSelector';
import api from '../services/api';
import toast from 'react-hot-toast';

const MealGenerator = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [goal, setGoal] = useState('');
  const [selectedMedicalConditions, setSelectedMedicalConditions] = useState([]);
  const [loading, setLoading] = useState(false);

  const medicalOptions = [
    'diabetes',
    'hypertension',
    'heart_issues',
    'gluten_allergy',
    'lactose_intolerance',
    'nut_allergy',
    'celiac',
  ];

  const handleMedicalConditionToggle = (condition) => {
    setSelectedMedicalConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!mood || !goal) {
      toast.error('Please select your mood and goal');
      return;
    }

    if (!profile || !profile.age) {
      toast.error('Please complete your profile first');
      navigate('/profile');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/meals/generate', {
        mood,
        medicalConditions: selectedMedicalConditions.length > 0 
          ? selectedMedicalConditions 
          : profile.medicalConditions || [],
        goals: goal,
        profileId: user._id,
      });

      // Store meal plan in sessionStorage
      sessionStorage.setItem('mealPlan', JSON.stringify(response.data));
      toast.success('Meal plan generated successfully!');
      navigate('/results');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to generate meal plan';
      toast.error(message);
      console.error('Meal generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Generate Your Meal Plan</h1>

      <form onSubmit={handleGenerate} className="space-y-8">
        <div className="card">
          <MoodSelector selectedMood={mood} onMoodChange={setMood} />
        </div>

        <div className="card">
          <GoalSelector selectedGoal={goal} onGoalChange={setGoal} />
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Medical Conditions (Optional Override)</h2>
          <p className="text-sm text-gray-600 mb-4">
            Your profile conditions are used by default. Select additional or override here.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            {medicalOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMedicalConditions.includes(option)}
                  onChange={() => handleMedicalConditionToggle(option)}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 capitalize">
                  {option.replace('_', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !mood || !goal}
            className="btn-primary text-lg px-8 py-3"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Generate Meal Plan'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MealGenerator;

