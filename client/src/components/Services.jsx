import React from "react";
import {
  MapPin,
  Store,
  TrendingUp,
  Search,
  UserPlus,
  ShieldCheck,
  Smartphone,
  Navigation
} from "lucide-react";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      title: "Discovery of Gems",
      desc: "We bring you street food stalls and hidden vendors that are invisible to mainstream maps.",
      icon: <Search className="text-orange-600" />,
      color: "bg-orange-100"
    },
    {
      title: "Vendor Ecosystem",
      desc: "Helping small-scale businesses build a digital presence and reach neighborhood foodies.",
      icon: <Store className="text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Real-time Tracking",
      desc: "Even if your favorite stall moves, we help you find their live location instantly.",
      icon: <Navigation className="text-green-600" />,
      color: "bg-green-100"
    },
    {
      title: "Verified Quality",
      desc: "Our team manually verifies every vendor to ensure authentic taste and hygiene standards.",
      icon: <ShieldCheck className="text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      title: "Growth Analytics",
      desc: "Vendors get insights into how many people are looking for them and their popularity.",
      icon: <TrendingUp className="text-amber-600" />,
      color: "bg-amber-100"
    },
    {
      title: "Mobile First",
      desc: "An ultra-fast experience optimized for discovery while you are on the streets.",
      icon: <Smartphone className="text-rose-600" />,
      color: "bg-rose-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-orange-200 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-amber-200 rounded-full blur-[150px] opacity-40" />

      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
          >
            Our <span className="gradient-text">Premium Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            CraveIt is more than just a listing app. We are building a bridge between
            traditional flavors and modern digital discovery.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-card flex flex-col items-start space-y-4 hover:shadow-orange-200/50 transition-all group"
            >
              <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl" />
          <h3 className="text-3xl md:text-5xl font-extrabold text-white">Ready to list your business?</h3>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Join hundreds of local vendors who have increased their reach by over 40% through CraveIt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Become a Vendor <UserPlus size={20} /></button>
            <button className="btn-secondary !bg-white/10 !text-white !border-white/10 hover:!bg-white/20">Talk to Support</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
