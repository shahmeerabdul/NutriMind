const GroceryListCard = ({ groceryList }) => {
  if (!groceryList || groceryList.length === 0) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Grocery List</h3>
      <div className="space-y-2">
        {groceryList.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="text-gray-700 font-medium">{item.name}</span>
            <span className="text-sm text-gray-500">
              {item.amount} {item.unit}
            </span>
          </div>
        ))}
      </div>
      <button
        onClick={async () => {
          try {
            const listText = groceryList
              .map((item) => `${item.name} - ${item.amount} ${item.unit}`)
              .join('\n');
            await navigator.clipboard.writeText(listText);
            alert('Grocery list copied to clipboard!');
          } catch (error) {
            console.error('Failed to copy:', error);
            alert('Failed to copy to clipboard. Please try again.');
          }
        }}
        className="mt-4 w-full btn-secondary"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default GroceryListCard;

