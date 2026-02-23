import React from "react";
import { Heart, Users, Target, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const values = [
    {
      icon: <Heart className="text-red-500" />,
      title: "Built with Passion",
      desc: "Our love for street food drives us to find the most authentic flavors in every corner of the city."
    },
    {
      icon: <Users className="text-blue-500" />,
      title: "Community First",
      desc: "We prioritize local small-scale vendors, giving them the digital stage they deserve."
    },
    {
      icon: <Target className="text-orange-500" />,
      title: "Our Mission",
      desc: "To bridge the gap between digital discovery and the traditional essence of street flavors."
    },
    {
      icon: <Rocket className="text-purple-500" />,
      title: "The Vision",
      desc: "Creating a world where no 'hidden gem' stays hidden, and every foodie finds their piece of heaven."
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider"
          >
            <Users size={16} /> Get to know us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight"
          >
            The Story Behind <br />
            <span className="gradient-text">CraveIt</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            We noticed that the most delicious food often comes from the smallest stalls—venders who
            don&apos;t have a marketing team or a spot on Google Maps. We decided to change that.
          </motion.p>
        </section>

        {/* Content Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-800">Why we do what we do</h3>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                CraveIt was born from a simple craving for Panipuri from a hidden stall that moved every day.
                We realized that millions of foodies face the same problem, and thousands of amazing vendors
                stay invisible to potential customers just a block away.
              </p>
              <p>
                Our platform provides a free, easy-to-use digital home for these vendors. We manually
                verify locations and menus to ensure that when you use CraveIt, you are getting an
                authentic and safe street food experience.
              </p>
              <p>
                Join us in our journey to celebrate the local food heroes and make every street a
                culinary destination.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {values.map((v, i) => (
              <div key={i} className="glass-card !p-6 flex flex-col items-center text-center space-y-3 hover:shadow-orange-100 transition-shadow">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  {v.icon}
                </div>
                <h4 className="font-bold text-gray-800 text-base">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Team Section Placeholder / Inspiration */}
        <section className="bg-white rounded-[3rem] p-12 text-center space-y-12 shadow-xl shadow-orange-100/50">
          <h3 className="text-3xl font-bold text-gray-800">Our Core Philosophy</h3>
          <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-orange-600">100%</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Small Business Focused</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-100" />
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-orange-600">Free</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">For All Vendors</p>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-100" />
            <div className="space-y-2">
              <div className="text-5xl font-extrabold text-orange-600">Local</div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Growth & Community</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
