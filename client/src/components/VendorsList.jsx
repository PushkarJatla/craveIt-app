import React from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // or wherever you store

const VendorsList = ({ apps }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg md:text-xl font-bold text-orange-800 mt-6 mb-3 self-start">
        Popular Vendors
      </h2>

      {apps && apps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {apps.map((app) => (
            <div
              key={app._id}
              className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 gap-3"
            >
              {/* Banner */}
              <div className="w-full h-28 rounded-md overflow-hidden">
                {app.banner ? (
                  <img
                    src={`${BACKEND_URL}${app.banner}`}
                    alt={app.vendorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm md:text-base font-semibold text-gray-800">
                    {app.name}
                  </h2>
                  <span className="text-xs text-gray-600">
                    {app.rating || "4.5"} ⭐
                  </span>
                </div>

                <p className="text-gray-500 text-xs">{app.address}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {app.categories?.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px]"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Directions */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  app.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center px-3 py-1.5 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition text-xs font-medium"
              >
                Get Directions
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6 text-center text-sm">
          No vendors available yet.
        </p>
      )}
    </div>
  );
};

export default VendorsList;
