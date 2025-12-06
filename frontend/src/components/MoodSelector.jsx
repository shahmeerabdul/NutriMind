const moods = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'stressed', label: 'Stressed', emoji: '😰' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'energetic', label: 'Energetic', emoji: '⚡' },
  { value: 'lazy', label: 'Lazy', emoji: '🛋️' },
];

const MoodSelector = ({ selectedMood, onMoodChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        How are you feeling today?
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onMoodChange(mood.value)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedMood === mood.value
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 hover:border-primary-300 bg-white'
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium text-gray-700">{mood.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;

