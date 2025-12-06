import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { profile } = useProfile();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Ready to plan your meals for today?
        </p>
      </div>

      {!profile || !profile.age ? (
        <div className="card bg-yellow-50 border-2 border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">
            Complete Your Profile
          </h2>
          <p className="text-yellow-700 mb-4">
            To get personalized meal plans, please complete your profile with your health information.
          </p>
          <Link to="/profile" className="btn-primary">
            Go to Profile
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <Link to="/generate" className="block w-full btn-primary text-center mb-3">
              Generate Today's Meal Plan
            </Link>
            <Link to="/profile" className="block w-full btn-secondary text-center">
              Update Profile
            </Link>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Your Profile Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium">{profile.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{profile.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Height:</span>
                <span className="font-medium">{profile.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Activity Level:</span>
                <span className="font-medium capitalize">{profile.activityLevel?.replace('_', ' ')}</span>
              </div>
              {profile.medicalConditions?.length > 0 && (
                <div className="mt-4">
                  <span className="text-gray-600">Medical Conditions:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.medicalConditions.map((condition, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs"
                      >
                        {condition.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

