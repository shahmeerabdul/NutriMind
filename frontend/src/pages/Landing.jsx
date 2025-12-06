import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              NutriMind
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Your mood-aware, medical-aware daily meal planner
            </p>
            <p className="text-lg mb-12 text-primary-200 max-w-2xl mx-auto">
              Get personalized meal plans that adapt to your mood, respect your medical conditions,
              and help you achieve your health goals.
            </p>
            {!user && (
              <div className="flex justify-center space-x-4">
                <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
                  Get Started
                </Link>
                <Link to="/login" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
                  Login
                </Link>
              </div>
            )}
            {user && (
              <Link to="/generate" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
                Generate Meal Plan
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why NutriMind?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Mood-Aware</h3>
            <p className="text-gray-600">
              Meal plans that adapt to how you're feeling - whether you're tired, stressed, or energetic.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Medical-Aware</h3>
            <p className="text-gray-600">
              Respects your medical conditions like diabetes, hypertension, allergies, and dietary restrictions.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Goal-Oriented</h3>
            <p className="text-gray-600">
              Personalized plans to help you lose weight, gain weight, maintain, or boost energy.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Create Profile</h3>
              <p className="text-sm text-gray-600">Tell us about yourself, your health, and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Select Mood</h3>
              <p className="text-sm text-gray-600">Choose how you're feeling today</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Plan</h3>
              <p className="text-sm text-gray-600">Receive a personalized meal plan with recipes</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Shop & Cook</h3>
              <p className="text-sm text-gray-600">Use the grocery list and follow simple instructions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

