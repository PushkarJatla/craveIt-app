import { FaSearch } from "react-icons/fa";

export default function FoodSearchInput({
  food,
  suggestions,
  onFoodChange,
  onSearch,
  setFood,
  setSuggestions
}) {
  return (
    <div className="flex-1 max-w-xl relative">
      <div className="bg-white rounded-xl shadow p-3 flex items-center gap-2">
        <FaSearch className="text-orange-600 text-lg" />

        <input
          type="text"
          value={food}
          onChange={(e) => onFoodChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(food)}
          placeholder="Search your crave"
          className="flex-1 border-none outline-none text-gray-700 text-sm bg-white"
        />

        <button
          onClick={() => onSearch(food.trim())}
          className="bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-orange-700 transition disabled:opacity-60"
        >
          Search
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-orange-200 rounded-md shadow-md max-h-48 overflow-y-auto z-50">
          {suggestions.map((item, idx) => (
            <li
              key={idx}
              onClick={() => {
                setFood(item.name);
                setSuggestions([]);
                onSearch(item.name);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-orange-100 text-sm text-gray-700 flex items-center gap-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-5 h-5 object-contain"
              />
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
