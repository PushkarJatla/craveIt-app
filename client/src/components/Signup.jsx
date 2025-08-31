import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

  // ✅ Username Validation
  // ✅ Username Validation (only letters, min 5)
  const validateUsername = (username) => {
    const regex = /^[A-Za-z ]{5,}$/;
    if (!regex.test(username)) {
      setUsernameError(
        "Username must be at least 5 letters and contain only alphabets (no numbers or special characters)."
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  // ✅ Password Validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include one uppercase letter, one number, and one special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...");

    if (!validateUsername(formData.username)) {
      toast.dismiss();
      toast.error("Please enter a valid username.");
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.dismiss();
      toast.error("Please enter a valid password.");
      return;
    }

    try {
      await axios.post(
        `${BACKEND_URL}/auth/signup/request-otp`,
        formData,
        { withCredentials: true }
      );
      toast.dismiss();
      toast.success("OTP sent to your email. Please verify.");
      navigate("/verify-otp", { state: { email: formData.email } });
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)] bg-orange-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-600 outline-none"
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-600 outline-none"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-orange-600 hover:underline">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
