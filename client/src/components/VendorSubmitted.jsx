import { CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function VendorSubmitted() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">
        <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-orange-600 mx-auto mb-4" />

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          Application Submitted
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
          Thank you for submitting your vendor application.  
          Our team will review your details and update you soon via email.
        </p>

        <NavLink
          to="/home"
          className="inline-block bg-orange-600 text-white font-semibold px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg shadow-md hover:bg-orange-700 transition"
        >
          Back to Home
        </NavLink>

        <p className="text-xs sm:text-sm text-gray-400 mt-6">
          If you have any questions, please{" "}
          <NavLink
            to="/contact-us"
            className="text-orange-600 font-medium hover:underline"
          >
            contact us
          </NavLink>.
        </p>
      </div>
    </div>
  );
}
