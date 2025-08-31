// components/NearestVendorsList.jsx
import React from "react";

const NearestVendorsList = ({ vendors }) => {
    if (!vendors || vendors.length === 0) return null;

    return (
        <div className="w-full mt-6">
            <h2 className="text-lg md:text-xl font-bold text-orange-800 mb-4">
                Nearest Vendors
            </h2>

            {/* Scrollable container */}
            <div
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth
                           scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent"
            >
                {vendors.map((vendor) => (
                    <div
                        key={vendor._id}
                        className="min-w-[250px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px]
                                   bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col justify-between
                                   snap-center shrink-0"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                <span className="text-orange-500">📍</span>
                                {vendor.name}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {vendor.address} ({vendor.distance.toFixed(2)} km away)
                            </p>
                        </div>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                                vendor.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-medium 
                                       hover:bg-orange-600 transition w-fit"
                        >
                            Get Directions
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NearestVendorsList;
