import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const NutritionChart = ({ totalMacros, totalCalories }) => {
  const data = [
    { name: 'Protein', value: totalMacros.protein * 4, grams: totalMacros.protein },
    { name: 'Carbs', value: totalMacros.carbs * 4, grams: totalMacros.carbs },
    { name: 'Fat', value: totalMacros.fat * 9, grams: totalMacros.fat },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#eab308'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].payload.grams}g ({payload[0].value} cal)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Nutrition Summary</h3>
      <div className="mb-4">
        <div className="text-3xl font-bold text-primary-600">{totalCalories}</div>
        <div className="text-sm text-gray-500">Total Calories</div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, grams }) => `${name}: ${grams}g`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-lg font-semibold text-blue-600">{totalMacros.protein}g</div>
          <div className="text-xs text-gray-500">Protein</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-600">{totalMacros.carbs}g</div>
          <div className="text-xs text-gray-500">Carbs</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-yellow-600">{totalMacros.fat}g</div>
          <div className="text-xs text-gray-500">Fat</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionChart;

