const goals = [
  { value: 'lose_weight', label: 'Lose Weight', icon: '📉' },
  { value: 'maintain', label: 'Maintain Weight', icon: '⚖️' },
  { value: 'gain_weight', label: 'Gain Weight', icon: '📈' },
  { value: 'increase_energy', label: 'Increase Energy', icon: '⚡' },
];

const GoalSelector = ({ selectedGoal, onGoalChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        What's your goal?
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {goals.map((goal) => (
          <button
            key={goal.value}
            type="button"
            onClick={() => onGoalChange(goal.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedGoal === goal.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300 bg-white'
            }`}
          >
            <div className="text-2xl mb-2">{goal.icon}</div>
            <div className="text-sm font-medium text-gray-700">{goal.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GoalSelector;

