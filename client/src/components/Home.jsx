import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import NearestVendorsList from "./NearestVendorsList";
import VendorsList from "./VendorsList";
import LocationInput from "./LocationInput";
import FoodSearchInput from "./FoodSearchInput";
import foodCategories from "../data/foodCategories";
import FoodCategoriesMarquee from "./FoodCategoriesMarquee";
import Spinner from "./Spinner";

const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const OPENCAGE_URL = import.meta.env.VITE_OPENCAGE_URL;

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [food, setFood] = useState("");
  const [allVendors, setAllVendors] = useState([]);  // full vendor list
  const [apps, setApps] = useState([]);              // filtered vendor list


  const [suggestions, setSuggestions] = useState([]);

  // Pagination State
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingVendors, setLoadingVendors] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedFilter = useMemo(
    () =>
      debounce((value) => {
        if (value.trim() === "") {
          setSuggestions([]);
        } else {
          const filtered = foodCategories.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          );
          setSuggestions(filtered);
        }
      }, 300),
    []
  );

  const handleAddressSearch = async (address) => {
    if (!address) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `${OPENCAGE_URL}/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}`
      );

      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;

        // set coords so nearestVendor recalculates
        setCoords({ latitude: lat, longitude: lng });
        setLocation(result.formatted);
      } else {
        setLocation("Address not found");
      }
    } catch (error) {
      console.error("Error fetching coords from address:", error);
      setLocation("Failed to fetch location");
    } finally {
      setLoading(false);
    }
  };


  const handleFoodChange = (value) => {
    setFood(value);
    debouncedFilter(value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/auth/currentuser`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const fetchVendors = async (skipValue = 0, limit = 6, isInitial = false) => {
    try {
      if (isInitial) setLoadingVendors(true);
      else setLoadingMore(true);

      const res = await axios.get(`${BACKEND_URL}/vendors/vendor-applications?skip=${skipValue}&limit=${limit}`);
      const newVendors = res.data;

      if (newVendors.length < limit) setHasMore(false);

      if (isInitial) {
        setAllVendors(newVendors);
        setApps(newVendors);
      } else {
        setAllVendors((prev) => [...prev, ...newVendors]);
        setApps((prev) => [...prev, ...newVendors]);
      }
    } catch (error) {
      console.error("Failed to fetch vendor applications:", error);
    } finally {
      if (isInitial) setLoadingVendors(false);
      else setLoadingMore(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchVendors(0, 6, true);
    setSkip(6);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
        hasMore &&
        !loadingMore &&
        !isFiltered
      ) {
        fetchVendors(skip, 6, false);
        setSkip((prev) => prev + 6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingMore, skip, isFiltered]);

  const handleCategoryClick = async (category) => {
    setIsFiltered(true);
    if (!category || !category.trim()) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/vendors/by-category/${category}`);
      setApps(res.data); // filter results shown in VendorsList
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };


  const handleLocationFetch = async () => {
    setLoading(true);
    try {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ latitude, longitude });

          const url = `${OPENCAGE_URL}/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`;
          const response = await axios.get(url);

          if (response.data && response.data.results.length > 0) {
            setLocation(response.data.results[0].formatted);
          } else {
            setLocation("No address found");
          }

          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocation("Permission denied or error");
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error with OpenCage API:", error);
      setLocation("Failed to fetch address");
      setLoading(false);
    }
  };

  function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const [showAllNearest, setShowAllNearest] = useState(false);

  const nearestVendors = coords && allVendors.length > 0
    ? allVendors
      .map((vendor) => ({
        ...vendor,
        distance: getDistanceInKm(
          coords.latitude,
          coords.longitude,
          parseFloat(vendor.latitude),
          parseFloat(vendor.longitude)
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
    : [];

  const displayedNearest = showAllNearest
    ? nearestVendors
    : nearestVendors.slice(0, 3);




  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <main className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            📍 <span className="gradient-text">Crave Near You</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
            Discover the best street food and hidden gems in your neighborhood.
          </p>
        </div>

        <div className="w-full glass-card !p-6 md:!p-10 space-y-6 shadow-2xl shadow-orange-200/40">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Current Location</label>
              <LocationInput
                location={location}
                loading={loading}
                onLocationChange={setLocation}
                onFetchLocation={handleLocationFetch}
                onSearch={handleAddressSearch}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">What's on your mind?</label>
              <FoodSearchInput
                food={food}
                suggestions={suggestions}
                onFoodChange={handleFoodChange}
                onSearch={handleCategoryClick}
                setFood={setFood}
                setSuggestions={setSuggestions}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-orange-50">
            <FoodCategoriesMarquee
              foodCategories={foodCategories}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>

        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Nearest <span className="text-orange-600">Vendors</span>
            </h2>
            {nearestVendors.length > 3 && (
              <button
                onClick={() => setShowAllNearest((prev) => !prev)}
                className="text-orange-600 font-bold hover:bg-orange-100 px-4 py-2 rounded-xl transition"
              >
                {showAllNearest ? "Show Less" : "View All"}
              </button>
            )}
          </div>

          <NearestVendorsList vendors={displayedNearest} />
        </div>

        <div className="w-full space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              All <span className="text-orange-600">Hidden Gems</span>
            </h2>
          </div>

          {loadingVendors ? (
            <div className="flex justify-center py-20">
              <Spinner size={48} className="text-orange-600 animate-spin" />
            </div>
          ) : (
            <VendorsList apps={apps} />
          )}
        </div>

        {loadingMore && (
          <div className="flex justify-center py-8">
            <Spinner size={32} className="text-orange-600 animate-spin" />
          </div>
        )}
      </main>

      <div className="fixed bottom-4 right-4">
        <NavLink to={user ? "/add-vendor" : "#"}>
          <button
            disabled={!user}
            className={`group relative bg-orange-600 text-white font-medium py-2 px-4 rounded-full shadow-md text-sm flex items-center gap-1 transition
        ${!user ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-700"}`}
          >
            ➕ Apply as Vendor

            {!user && (
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition z-50">
                Login first
              </span>

            )}
          </button>
        </NavLink>
      </div>

      <footer className="text-center text-xs text-gray-500 p-3">
        © CraveIt | Crafted with 🧡
      </footer>
    </div>

  );
}
