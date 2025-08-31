import { useNavigate } from "react-router-dom";
import pizzaBG from "/pb.jpg";
import { motion } from "framer-motion";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-orange-50 overflow-hidden">
            {/* Hero Banner Section */}
            <main className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-16 py-20 max-w-7xl mx-auto">
                {/* Left Side Text */}
                <motion.div
                    className="md:w-1/2 text-center md:text-left space-y-6"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-extrabold text-orange-600 leading-tight drop-shadow-sm">
                        Taste the Best, <br /> Wherever You Are
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
                        From local stalls to popular restaurants, discover hidden food gems
                        and let your flavors reach food lovers everywhere. Register today
                        and start your journey with <span className="font-semibold text-orange-500">CraveIt</span>!
                    </p>
                    <div className="flex flex-row sm:flex-clo gap-2 md:gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => navigate("/home")}
                            className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm md:text-xl font-semibold shadow hover:bg-orange-700  transition"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => navigate("/signup")}
                            className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm md:text-xl font-semibold shadow hover:bg-orange-700  transition"
                        >
                            Signup
                        </button>
                    </div>

                </motion.div>

                {/* Right Side Image + Badge */}
                <motion.div
                    className="md:w-1/2 flex justify-center relative mt-10 md:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <img
                        src={pizzaBG}
                        alt="Food Banner"
                        className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full shadow-xl border-8 border-white"
                    />
                    {/* Circular Badge */}
                    <div className="absolute top-6 right-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm md:text-base font-bold rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center text-center shadow-lg animate-bounce">
                        For Foodies <br /> & Vendors
                    </div>
                </motion.div>
            </main>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 p-6 max-w-6xl mx-auto">
                {[
                    {
                        title: "🍕 Explore Food",
                        desc: "Enter your location and instantly find the nearest and most popular vendors.",
                    },
                    {
                        title: "📍 Vendor Registration",
                        desc: "Small stalls & large vendors can register and grow their reach.",
                    },
                    {
                        title: "✅ Verified Vendors",
                        desc: "Vendors are approved by our team to ensure genuine food experiences.",
                    },
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-bold mb-3 text-orange-600">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </motion.div>
                ))}
            </section>

            {/* How It Works Section */}
            <section className="bg-gradient-to-b from-orange-50 to-white py-20 px-6">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-14">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
                    {[
                        {
                            icon: "📍",
                            title: "Enter Location",
                            desc: "Type your area or enable GPS to see the nearest vendors instantly.",
                        },
                        {
                            icon: "🏪",
                            title: "Explore Vendors",
                            desc: "Browse small stalls, popular restaurants, and hidden gems around you.",
                        },
                        {
                            icon: "🧭",
                            title: "Get Directions / Register",
                            desc: "Easily navigate to vendors or register your own stall/restaurant.",
                        },
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-20 h-20 bg-orange-100 text-orange-600 flex items-center justify-center text-3xl rounded-full mb-4 shadow-md">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <footer className="p-4 text-center text-gray-500 bg-orange-50">
                © 2025 <span className="font-semibold text-orange-600">CraveIt</span> | Crafted with 🧡
            </footer>
        </div>
    );
}
