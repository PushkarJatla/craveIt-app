import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch current user from session
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

  // ✅ Logout functionality with toast
  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null); // clear UI
      setDropdownOpen(false);
      setMenuOpen(false);

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Failed to logout, please try again");
    }
  };

  return (
    <header className="bg-orange-50  sticky top-0 z-50 w-full">
      <nav className="flex items-center justify-between px-4 md:px-6 py-3 max-w-screen-xl w-full mx-auto">
        {/* Logo */}
        <NavLink
          to="/home"
          className="flex items-center font-bold text-orange-600 gap-1 sm:gap-2"
        >
          {/* Logo Icon */}
          <img
            src="/favicon-32x32.png"
            alt="CraveIt Logo"
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          />

          {/* Brand Text */}
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            CraveIt
          </span>
        </NavLink>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <NavLink to="/services" className="hover:text-orange-600 transition">
            Services
          </NavLink>
          
          <NavLink to="/about" className="hover:text-orange-600 transition">
            About Us
          </NavLink>
          <NavLink to="/contact-us" className="hover:text-orange-600 transition">
            Contact
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/dashboard" className="hover:text-orange-600 transition">
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* User / Login (Desktop) */}
        <div className="ml-4 relative hidden md:flex" ref={dropdownRef}>
          {user ? (
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none rounded-full hover:bg-gray-100 p-1"
              >

                <span className="hidden sm:block font-medium text-gray-700 truncate max-w-[120px]">
                  {user?.username}
                </span>
                <FaUserCircle className="text-2xl text-gray-700" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium"
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg pb-1">
          <NavLink
            to="/services"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 hover:bg-gray-100 transition"
          >
            Services
          </NavLink>
         
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 hover:bg-gray-100 transition"
          >
            About
          </NavLink>
          <NavLink
            to="/contact-us"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 hover:bg-gray-100 transition"
          >
            Contact
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/dashboard" className="block px-6 py-3 hover:bg-gray-100 transition">
              Dashboard
            </NavLink>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left px-6 py-3 hover:bg-gray-100 transition text-gray-700 font-medium"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 bg-orange-600 text-white text-center rounded-lg mx-4 my-2 hover:bg-orange-700 transition font-medium "
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
