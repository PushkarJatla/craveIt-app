import React from "react";

const Services = () => {
  const services = [
    {
      title: "Location-Based Discovery",
      desc: "Find nearby restaurants, vendors, and food shops based on your exact location."
    },
    {
      title: "Support for Local Vendors",
      desc: "We list small-scale shops and vendors that don’t show up on Google Maps."
    },
    {
      title: "Personalized Recommendations",
      desc: "Get suggestions for popular foods and trending spots around you."
    },
    {
      title: "Simple & Fast Search",
      desc: "Enter your location and instantly explore the best food options near you."
    },
    {
      title: "Vendor Registration",
      desc: "Vendors can easily apply to list their food business and reach more customers."
    }
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-50">
      <div className="md:bg-white  bg-orange-50 shadow-xl  md:rounded-2xl p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Our Services
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
            >
              <h3 className="text-lg font-semibold text-orange-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
