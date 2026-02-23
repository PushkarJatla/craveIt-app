import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Store,
  Smartphone,
  MapPin,
  Upload,
  Navigation,
  CheckCircle2,
  UtensilsCrossed,
  Info
} from "lucide-react";

const CATEGORY_OPTIONS = [
  "Pizza", "Burger", "Biryani", "North Indian", "South Indian", "Pani Puri",
  "Vada Pav", "Chinese", "Italian", "Mexican", "Desserts", "Beverages",
  "Street Food", "Seafood", "Momos", "Rolls", "Shakes", "Ice Cream",
  "Sandwich", "Salad", "Fast Food", "Healthy Food", "Cake", "Sweets",
  "Tea-Coffee", "Thali", "Samosa", "Chaat", "Chicken", "Chole Bhature",
  "Sugarcane Juice", "Pasta", "Dosa",
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

  const handleCategoryChange = (cat) => {
    const updatedCategories = form.categories.includes(cat)
      ? form.categories.filter((c) => c !== cat)
      : [...form.categories, cat];
    setForm({ ...form, categories: updatedCategories });
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
    if (!validateForm()) return;

    try {
      setLoadingSubmit(true);
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

      await axios.post(`${BACKEND_URL}/vendors/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success("Registration successful! Approval pending.");
      navigate("/vendor-submitted");
    } catch (error) {
      console.error(error);
      toast.error("Error saving vendor.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex bg-orange-100 p-3 rounded-2xl text-orange-600 mb-2"
          >
            <UtensilsCrossed size={32} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Register your <span className="gradient-text">Business</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
            Join CraveIt and put your food on the digital map of your neighborhood.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card !p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-2 border-b border-orange-100 pb-4">
              <Info className="text-orange-600" size={20} />
              <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Business Basics</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Vendor Name</label>
              <div className="relative group">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Royal Street Cafe"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mobile Number</label>
              <div className="relative group">
                <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all text-sm font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 block">Categories</label>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-2xl border border-gray-100">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${form.categories.includes(cat)
                        ? "bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200"
                        : "bg-white text-gray-500 border-gray-100 hover:border-orange-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Location & Media */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Address & Coordinates */}
            <div className="glass-card !p-8 space-y-6 shadow-2xl shadow-orange-200/40">
              <div className="flex items-center gap-3 mb-2 border-b border-orange-100 pb-4">
                <MapPin className="text-orange-600" size={20} />
                <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Location Details</h3>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Address</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-4 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter complete stall address"
                    rows="3"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Latitude</label>
                  <input
                    type="text"
                    name="latitude"
                    value={form.latitude}
                    readOnly
                    placeholder="0.0000"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Longitude</label>
                  <input
                    type="text"
                    name="longitude"
                    value={form.longitude}
                    readOnly
                    placeholder="0.0000"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-100 rounded-xl text-xs font-bold text-gray-600 outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={getCoordinates}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border-2 border-dashed border-blue-200 py-3 rounded-xl hover:bg-blue-100 transition-all font-bold text-sm"
                disabled={loadingCoords}
              >
                {loadingCoords ? (
                  <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Navigation size={18} />
                )}
                {loadingCoords ? "Fetching..." : "Fetch Coordinates from Address"}
              </button>
            </div>

            {/* Banner Image */}
            <div className="glass-card !p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2 border-b border-orange-100 pb-4">
                <Upload className="text-orange-600" size={20} />
                <h3 className="font-bold text-gray-800 uppercase tracking-widest text-sm">Banner Image</h3>
              </div>

              <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-orange-50/50 hover:border-orange-200 transition-all group overflow-hidden">
                {previewURL ? (
                  <img src={previewURL} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="text-gray-400 group-hover:text-orange-500 mb-2 transition-colors" size={32} />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-orange-600">Click to upload banner</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          </motion.div>

          {/* Full Width Submit */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              disabled={loadingSubmit}
              className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3"
            >
              {loadingSubmit ? (
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle2 size={24} />
              )}
              {loadingSubmit ? "Processing Application..." : "Submit Registration"}
            </button>
            <p className="text-center text-gray-400 text-xs mt-4 font-medium italic">
              By clicking submit, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendorForm;
