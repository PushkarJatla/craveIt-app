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
    <div className="min-h-screen flex flex-col lg:flex-row bg-orange-50">
      {/* Left: Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 blur-[100px]" />

        <div className="relative z-10 space-y-8 max-w-md text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-orange-600 w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-900/40 mb-8 mx-auto lg:mx-0"
          >
            <UserPlus size={40} className="text-white" />
          </motion.div>
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Join the <span className="text-orange-500">CraveIt</span> Community.
          </h1>
          <p className="text-gray-400 text-lg">
            Become a part of the fastest growing network of food lovers and hidden vendors.
            Register today and start exploring your city's flavors.
          </p>

          <div className="space-y-4 pt-8">
            {[
              "Discover hidden gems first",
              "Support local street vendors",
              "Personalized food feed"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <ShieldCheck size={20} className="text-orange-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="absolute top-0 left-0 w-full h-full lg:hidden -z-10 bg-orange-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card !p-8 md:!p-12 w-full max-w-lg shadow-2xl shadow-orange-200/40"
        >
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">Create Account</h2>
            <p className="text-gray-500 font-medium italic">Start your foodie journey today 🍕</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={20} />
                <input
                  type="text"
                  name="username"
                  placeholder="JohnDoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
              {usernameError && (
                <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{usernameError}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all font-medium"
                />
              </div>
              {passwordError && (
                <p className="text-red-500 text-[10px] font-bold mt-1 ml-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-5 text-xl mt-4"
            >
              {loading ? <Spinner className="text-white" /> : "Create Account"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-orange-50 text-center">
            <p className="text-gray-500 font-medium">
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
