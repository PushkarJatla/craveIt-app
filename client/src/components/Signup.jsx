import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
    if (e.target.name === "username") {
      validateUsername(e.target.value);
    }
  };

  const validateUsername = (username) => {
    const regex = /^[A-Za-z ]{5,}$/;
    if (!regex.test(username)) {
      setUsernameError(
        "Min 5 letters, alphabets only."
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!regex.test(password)) {
      setPasswordError(
        "Min 8 chars, 1 uppercase, 1 number, 1 special char."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateUsername(formData.username)) {
      toast.error("Please enter a valid username.");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Please enter a valid password.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/auth/signup/request-otp`,
        formData,
        { withCredentials: true }
      );
      toast.success("OTP sent to your email. Please verify.");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row bg-orange-50">
      {/* Left: Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative items-center justify-center p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 blur-[100px]" />

        <div className="relative z-10 space-y-6 max-w-sm text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-900/40 mb-4"
          >
            <UserPlus size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-extrabold text-white leading-tight">
            Join the <br /><span className="text-orange-500">CraveIt</span> Community.
          </h1>
          <p className="text-gray-400 text-base">
            Become a part of the fastest growing network of food lovers and hidden vendors.
            Register today and start exploring your city's flavors.
          </p>

          <div className="space-y-3 pt-4">
            {[
              "Discover hidden gems first",
              "Support local street vendors",
              "Personalized food feed"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <ShieldCheck size={18} className="text-orange-500" />
                <span className="text-sm font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative overflow-y-auto">
        <div className="absolute top-0 left-0 w-full h-full lg:hidden -z-10 bg-orange-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card !p-6 md:!p-10 w-full max-w-md shadow-2xl shadow-orange-200/40"
        >
          <div className="text-center space-y-2 mb-6 text-gray-900">
            <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">Create Account</h2>
            <p className="text-gray-500 text-sm font-medium italic">Start your foodie journey today 🍕</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="JohnDoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
              {usernameError && (
                <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{usernameError}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg mt-2"
            >
              {loading ? <Spinner className="text-white" /> : "Create Account"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-orange-50 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Already a member?{" "}
              <NavLink to="/login" className="text-orange-600 font-extrabold hover:underline">
                Login here
              </NavLink>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
