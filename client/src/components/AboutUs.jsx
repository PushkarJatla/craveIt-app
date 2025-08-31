import React from "react";

const AboutUs = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <div className="md:bg-white bg-orange-50 shadow-xl md:rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Welcome to <span className="font-semibold text-orange-600">CraveIt</span> – 
          your trusted platform to discover the **best and nearest food restaurants, vendors, and local shops**.  
          Unlike traditional map services, we focus on highlighting **local and small-scale food businesses** that often don’t appear on Google Maps.  
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mt-4 text-center">
          Our mission is simple: **connect food lovers with hidden local gems** while supporting small vendors and restaurants.  
          Whether you’re craving street food, regional delicacies, or trending dishes, we bring everything closer to you with accurate location-based recommendations.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed mt-4 text-center">
          We believe in building a food community where every vendor, big or small, gets visibility and every foodie finds their next favorite place.  
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
