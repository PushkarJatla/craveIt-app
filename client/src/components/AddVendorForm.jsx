import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const CATEGORY_OPTIONS = [
  "Pizza",
  "Burger",
  "Biryani",
  "North Indian",
  "South Indian",
  "Pani Puri",
  "Vada Pav",
  "Chinese",
  "Italian",
  "Mexican",
  "Desserts",
  "Beverages",
  "Street Food",
  "Seafood",
  "Momos",
  "Rolls",
  "Shakes",
  "Ice Cream",
  "Sandwich",
  "Salad",
  "Fast Food",
  "Healthy Food",
  "Cake",
  "Sweets",
  "Tea-Coffee",
  "Thali",
  "Samosa",
  "Chaat",
  "Chicken",
  "Chole Bhature",
  "Sugarcane Juice",
  "Pasta",
  "Dosa",
];


const AddVendorForm = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    categories: [],
    address: "",
    latitude: "",
    longitude: "",
    banner: "",
  });

  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loadingCoords, setLoadingCoords] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [user, setUser] = useState(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const OPENCAGE_URL = import.meta.env.VITE_OPENCAGE_URL;
  const OPENCAGE_API_KEY = import.meta.env.VITE_OPENCAGE_API_KEY;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setForm({ ...form, categories: selected });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const getCoordinates = async () => {
    if (!form.address) {
      toast.error("Please enter an address first.");
      return;
    }

    try {
      setLoadingCoords(true);
      const response = await axios.get(
        `${OPENCAGE_URL}/geocode/v1/json?q=${encodeURIComponent(
          form.address
        )}&key=${OPENCAGE_API_KEY}`
      );

      const result = response.data.results[0];
      if (result) {
        const { lat, lng } = result.geometry;
        setForm({
          ...form,
          latitude: lat.toString(),
          longitude: lng.toString(),
        });
        toast.success("Coordinates fetched successfully!");
      } else {
        toast.error("Could not find location.");
      }
    } catch (error) {
      console.error("OpenCage error:", error);
      toast.error("Failed to fetch coordinates.");
    } finally {
      setLoadingCoords(false);
    }
  };
   const validateForm = () => {
    if (!form.name || form.name.trim().length < 3) {
      toast.error("Vendor name must be at least 3 characters.");
      return false;
    }

    if (!form.mobile || !/^\d{10}$/.test(form.mobile)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return false;
    }

    if (form.categories.length === 0) {
      toast.error("Please select at least one category.");
      return false;
    }

    if (!form.address.trim()) {
      toast.error("Address is required.");
      return false;
    }

    if (!form.latitude || !form.longitude) {
      toast.error("Please fetch coordinates for the address.");
      return false;
    }

    if (!imageFile) {
      toast.error("Please upload a banner image.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        if (!validateForm()) return; // stop submission if invalid

    try {
      setLoadingSubmit(true);
      toast.loading("Submitting vendor...");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("mobile", form.mobile);
      formData.append("categories", JSON.stringify(form.categories));
      formData.append("address", form.address);
      formData.append("latitude", form.latitude);
      formData.append("longitude", form.longitude);

      if (imageFile) {
        formData.append("banner", imageFile);
      }

      const response = await axios.post(`${BACKEND_URL}/vendors/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.dismiss(); // remove "loading..." toast
      toast.success("Registration successful! Your account will be approved soon.", {
        duration: 7000,
      });
      console.log(response.data);

      setForm({
        name: "",
        mobile: "",
        categories: [],
        address: "",
        latitude: "",
        longitude: "",
        banner: "",
      });
      setPreviewURL("");
      setImageFile(null);
      navigate("/vendor-submitted");
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Error saving vendor.");
    } finally {
      setLoadingSubmit(false);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 py-6 min-h-screen px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-bold text-center text-orange-700 mb-2">
          Register as Vendor
        </h2>
        <p className="text-center text-gray-500 mb-4 text-xs sm:text-sm">
          Fill in the details to register your vendor
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Vendor Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter Shop name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Vendor Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
              required
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Categories
            </label>
            <select
              multiple
              value={form.categories}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
            >
              {CATEGORY_OPTIONS.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              Hold CTRL (Windows) or CMD (Mac) to select multiple
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
              required
            />
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
              Upload Banner
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                className="w-full h-28 sm:h-36 object-cover rounded-lg mt-2 shadow-md"
              />
            )}
          </div>

          {/* Coordinates */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-600">
              Location Coordinates
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                required
              />
              <input
                type="text"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                required
              />
            </div>
            <button
              type="button"
              onClick={getCoordinates}
              className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              disabled={loadingCoords}
            >
              {loadingCoords && (
                <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {loadingCoords ? "Fetching..." : "Get Coordinates"}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition text-sm sm:text-base"
            disabled={loadingSubmit}
          >
            {loadingSubmit ? (
              <div className="flex items-center justify-center">
                <span className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              "Add Vendor"
            )}
          </button>
        </form>
      </div>
    </div>

  );
};

export default AddVendorForm;
