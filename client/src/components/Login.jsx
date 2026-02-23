import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn, Mail, Lock, ArrowRight, Utensils, Star } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      toast.success("Login successful");
      setUser(res.data.user);
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-orange-50">
      {/* Right: Signup Form (Reused layout for consistency) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative order-2 lg:order-1">
        <div className="absolute top-0 left-0 w-full h-full lg:hidden -z-10 bg-orange-50" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card !p-8 md:!p-12 w-full max-w-lg shadow-2xl shadow-orange-200/40"
        >
          <div className="text-center space-y-2 mb-10">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <LogIn className="text-orange-600" size={32} />
            </motion.div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">Welcome Back</h2>
            <p className="text-gray-500 font-medium italic">Login to continue your cravings 🍴</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
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
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-5 text-xl mt-4"
            >
              {loading ? <Spinner className="text-white" /> : "Login"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-orange-50 text-center">
            <p className="text-gray-500 font-medium">
              Don&apos;t have an account?{" "}
              <NavLink to="/signup" className="text-orange-600 font-extrabold hover:underline">
                Sign up now
              </NavLink>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Left: Branding/Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative items-center justify-center p-12 overflow-hidden order-1 lg:order-2">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-600/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-600/20 blur-[100px]" />

        <div className="relative z-10 space-y-8 max-w-md text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-orange-600 w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-900/40 mb-8 mx-auto lg:mx-0"
          >
            <Utensils size={40} className="text-white" />
          </motion.div>
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Your <span className="text-orange-500">Favorite</span> Tastes, Just a Login Away.
          </h1>
          <p className="text-gray-400 text-lg">
            Ready to find your next favorite hidden gem? Our community of foodies is waiting for
            your reviews and recommendations.
          </p>

          <div className="space-y-4 pt-8">
            {[
              "Track your favorite vendors",
              "Save your frequent stalls",
              "Get exclusive foodie tips"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <Star size={20} className="text-orange-500 fill-orange-500" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
