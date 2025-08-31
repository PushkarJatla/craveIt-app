import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home";
import Navbar from "./components/Navbar";
import AddVendorForm from "./components/AddVendorForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VerifyOtp from "./components/VerifyOtp";
import AdminDashboard from "./components/AdminDashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import ContactUs from "./components/Contact";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import VendorSubmitted from "./components/VendorSubmitted";


const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/auth/currentuser", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-vendor" element={<AddVendorForm />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user} allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/vendor-submitted" element={<VendorSubmitted />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>

  );
}

export default App;
