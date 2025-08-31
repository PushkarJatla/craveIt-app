export default function FoodCategoriesMarquee({ foodCategories, onCategoryClick }) {
  return (
    <>
      <h2 className="text-lg md:text-xl font-bold text-orange-800 mb-3 self-start flex items-center gap-2">
        Explore Foods
      </h2>

      <div className="relative w-full overflow-hidden bg-white border border-orange-200 rounded-xl shadow-sm p-3">
        <div className="flex animate-marquee whitespace-nowrap gap-2 md:gap-4 lg:gap-5">
          {foodCategories.concat(foodCategories).map((food, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center w-20 cursor-pointer"
              onClick={() => onCategoryClick(food.name)}
            >
              <div className="w-16 h-16 rounded-full bg-white border border-orange-400 shadow hover:scale-105 transition flex items-center justify-center">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <p className="mt-1 text-xs font-medium text-gray-700 text-center truncate">
                {food.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
