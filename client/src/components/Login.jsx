import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full sm:w-[90%] md:w-[80%] max-w-md p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <LogIn className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mb-2" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            Login to continue your cravings 🍴
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:outline-none text-sm sm:text-base"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-orange-700 transition text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs sm:text-sm mt-6">
          Don’t have an account?{" "}
          <NavLink
            to="/signup"
            className="text-orange-600 font-medium hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
