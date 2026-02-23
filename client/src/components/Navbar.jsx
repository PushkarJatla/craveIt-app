import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { LogOut, LayoutDashboard, UtensilsCrossed } from "lucide-react";
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

  const navLinks = [
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-orange-100 shadow-sm">
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 max-w-screen-2xl w-full mx-auto">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center font-extrabold text-orange-600 gap-2 group transition-transform hover:scale-[1.02]"
        >
          <div className="bg-orange-600 p-1.5 rounded-xl shadow-lg shadow-orange-200">
            <UtensilsCrossed size={20} className="text-white" />
          </div>
          <span className="text-2xl md:text-3xl font-heading tracking-tight">
            CraveIt
          </span>
        </NavLink>


        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-semibold">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-orange-600 transition-colors duration-200 relative py-1
                ${isActive ? "text-orange-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-600 after:rounded-full" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user?.role === "admin" && (
            <NavLink
              to="/dashboard"
              className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl hover:bg-orange-100 transition-colors"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>
          )}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/home"
            className="text-gray-700 font-bold hover:text-orange-600 transition-colors"
          >
            Explore
          </NavLink>

          <div className="relative" ref={dropdownRef}>
            {user ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none rounded-2xl bg-gray-50 hover:bg-gray-100 p-2 border border-gray-100 transition-all"
                >
                  <FaUserCircle className="text-2xl text-gray-500" />
                  <span className="font-bold text-gray-700 max-w-[100px] truncate">
                    {user?.username}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-orange-100 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 hover:bg-gray-50 text-red-600 text-sm font-bold flex items-center gap-3 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-6 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold shadow-lg shadow-orange-200"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <div className="font-bold text-gray-700 text-sm">
              Hey, {user.username}!
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 text-2xl focus:outline-none hover:text-orange-600 transition-colors"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-orange-50 shadow-2xl p-4 space-y-2 absolute w-full left-0 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 hover:bg-orange-50 rounded-xl transition-colors font-semibold text-gray-700"
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/home"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 hover:bg-orange-50 rounded-xl transition-colors font-semibold text-orange-600"
          >
            Explore Food
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 hover:bg-orange-50 rounded-xl transition-colors font-semibold text-gray-700"
            >
              Dashboard
            </NavLink>
          )}

          <div className="pt-2 border-t border-gray-100 mt-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 bg-orange-600 text-white text-center rounded-xl hover:bg-orange-700 transition font-bold shadow-lg "
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
