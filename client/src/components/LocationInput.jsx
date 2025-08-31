import { FaMapMarkerAlt, FaCrosshairs } from "react-icons/fa";

export default function LocationInput({ location, loading, onLocationChange, onFetchLocation, onSearch }) {
  return (
    <div className="flex-1 max-w-xl bg-white rounded-xl shadow p-3 flex items-center gap-2">
      {/* Map Marker Icon */}
      <FaMapMarkerAlt className="text-orange-600 text-lg" />

      {/* User can now type location */}
      <input
        type="text"
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Get nearby vendors by location"
        className="flex-1 border-none outline-none text-gray-700 text-sm bg-white"
      />

      {/* Fetch current location icon */}
      <button
        onClick={onFetchLocation}
        className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-600 transition disabled:opacity-50"
        disabled={loading}
        title="Use Current Location"
      >
        <FaCrosshairs className="text-lg" />
      </button>

      {/* Search by manual address */}
      <button
        onClick={() => onSearch(location.trim())}
        className="bg-orange-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-orange-700 transition disabled:opacity-60"
        disabled={!location.trim()}
      >
        Search
      </button>
    </div>
  );
}
