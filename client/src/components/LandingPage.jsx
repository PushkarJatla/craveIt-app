import { useNavigate } from "react-router-dom";
import pizzaBG from "/pb.jpg";
import { motion } from "framer-motion";
import {
    MapPin,
    Store,
    ShieldCheck,
    Search,
    ArrowRight,
    ChefHat,
    TrendingUp,
    Smartphone,
    Navigation
} from "lucide-react";

export default function LandingPage() {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-orange-50 font-body overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-12 md:pt-20 pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-400 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-amber-400 rounded-full blur-[120px]" />
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                    {/* Left: Content */}
                    <motion.div
                        className="lg:w-1/2 text-center lg:text-left space-y-8"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider">
                            <ChefHat size={16} /> Exploring Hidden Street Gems
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]"
                        >
                            Discover <span className="gradient-text">Flavor</span> <br />
                            Off the Map
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            The best street food often doesn&apos;t show up on Google. We find those
                            <span className="font-semibold text-orange-600"> hidden gems</span> near you and help small-scale
                            vendors reach their neighborhood.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
                        >
                            <button
                                onClick={() => navigate("/home")}
                                className="btn-primary w-full sm:w-auto"
                            >
                                Find Food Near Me <Search size={20} />
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="btn-secondary w-full sm:w-auto"
                            >
                                Register as Vendor <ArrowRight size={20} />
                            </button>
                        </motion.div>

                        {/* Quick Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center lg:justify-start gap-8 pt-6 border-t border-orange-100 mt-12"
                        >
                            <div>
                                <p className="text-3xl font-extrabold text-orange-600">500+</p>
                                <p className="text-sm text-gray-400 font-medium">Local Gems</p>
                            </div>
                            <div className="w-px h-10 bg-orange-100" />
                            <div>
                                <p className="text-3xl font-extrabold text-orange-600">10k+</p>
                                <p className="text-sm text-gray-400 font-medium">Foodies Joined</p>
                            </div>
                            <div className="w-px h-10 bg-orange-100" />
                            <div>
                                <p className="text-3xl font-extrabold text-orange-600">4.9/5</p>
                                <p className="text-sm text-gray-400 font-medium">Trust Score</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Interactive Image */}
                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="relative z-10 p-4">
                            <img
                                src={pizzaBG}
                                alt="Delicious Street Food"
                                className="w-full h-auto max-w-[500px] mx-auto rounded-[3rem] shadow-2xl border-[12px] border-white object-cover aspect-square md:rotate-3 hover:rotate-0 transition-transform duration-500"
                            />

                            {/* Floating Cards */}
                            <motion.div
                                className="absolute -top-4 -right-4 md:right-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="bg-green-100 p-2 rounded-full text-green-600">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Verified</p>
                                    <p className="font-bold text-gray-800">Authentic Taste</p>
                                </div>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-8 -left-4 md:left-0 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-float"
                                style={{ animationDelay: "1s" }}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase">Nearest</p>
                                    <p className="font-bold text-gray-800">200m Away</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Visual Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-orange-200/50 rounded-full -z-10 scale-90 md:scale-100" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-orange-100/30 rounded-full -z-10 scale-90 md:scale-100" />
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-4 md:px-8 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
                            Why <span className="text-orange-600">CraveIt</span> Exists?
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                            We bridges the gap between digital discovery and traditional street flavors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Search className="text-orange-600" />,
                                title: "Gems Discovery",
                                desc: "Find that one Panipuri stall that everyone talks about but isn't on any map.",
                                color: "bg-orange-50"
                            },
                            {
                                icon: <Store className="text-blue-600" />,
                                title: "Vendor Empowerment",
                                desc: "We help small stalls get digital identity and reach customers beyond their street.",
                                color: "bg-blue-50"
                            },
                            {
                                icon: <ShieldCheck className="text-green-600" />,
                                title: "Trust & Quality",
                                desc: "Every vendor is manually verified by our team to ensure safety and hygiene.",
                                color: "bg-green-50"
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                className="group p-10 rounded-[2.5rem] bg-gray-50 hover:bg-white border border-transparent hover:border-orange-100 hover:shadow-2xl hover:shadow-orange-200/20 transition-all duration-500"
                                whileHover={{ y: -10 }}
                            >
                                <div className={`w-16 h-16 ${feature.color} flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 px-4 md:px-8 bg-orange-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                                Your Journey from <br />
                                <span className="text-orange-600">Cravings to Contentment</span>
                            </h2>

                            <div className="space-y-8">
                                {[
                                    {
                                        step: "01",
                                        icon: <Navigation size={20} />,
                                        title: "Share Your Location",
                                        desc: "Type your area or use GPS to see what's cooking in your neighborhood."
                                    },
                                    {
                                        step: "02",
                                        icon: <Smartphone size={20} />,
                                        title: "Browse Real Stalls",
                                        desc: "Explore menus, photos, and live locations of validated street vendors."
                                    },
                                    {
                                        step: "03",
                                        icon: <TrendingUp size={20} />,
                                        title: "Help Vendors Grow",
                                        desc: "Visit them, share reviews, and help the local food scene thrive."
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="flex-shrink-0 w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-600 font-extrabold text-xl shadow-sm border border-orange-100">
                                            {item.step}
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <div className="glass-card !p-2 rotate-2">
                                <div className="bg-gray-900 rounded-[2rem] overflow-hidden p-6 text-white space-y-8 aspect-[4/5] flex flex-col justify-center">
                                    <div className="space-y-2">
                                        <MapPin className="text-orange-500" size={40} />
                                        <h3 className="text-3xl font-extrabold">Live Location</h3>
                                        <p className="text-gray-400">Track your favorite stalls even if they move!</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="font-bold">Raju&apos;s Panipuri</p>
                                            <span className="bg-green-500 text-[10px] px-2 py-0.5 rounded-full uppercase">Open Now</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full w-2/3 bg-orange-500" />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Highly rated by 200+ locals</p>
                                    </div>
                                    <button className="w-full py-4 bg-orange-600 rounded-xl font-bold hover:bg-orange-700 transition">
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-5xl mx-auto rounded-[3rem] bg-gray-900 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/20 blur-[100px]" />

                    <div className="relative z-10 p-12 md:p-20 text-center space-y-8">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                            Are you a Vendor? <br />
                            <span className="text-orange-500">Reach 1000s of Foodies.</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Don&apos;t stay invisible. Join CraveIt and let the city know about your amazing food.
                            Registration is free and takes less than 2 minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => navigate("/signup")}
                                className="px-12 py-5 bg-orange-600 text-white font-bold rounded-2xl text-xl hover:bg-orange-700 transition shadow-2xl shadow-orange-900/40"
                            >
                                Sign Up as Vendor
                            </button>
                            <button
                                onClick={() => navigate("/contact-us")}
                                className="px-12 py-5 bg-white/10 text-white font-bold rounded-2xl text-xl hover:bg-white/20 transition backdrop-blur-sm border border-white/10"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-orange-100 text-center">
                <div className="max-w-7xl mx-auto px-4 space-y-6">
                    <div className="flex items-center justify-center gap-2 font-bold text-2xl text-orange-600">
                        <img src="/favicon-32x32.png" alt="logo" className="w-8 h-8" />
                        CraveIt
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2025 CraveIt. Supporting Local Vendors with Love 🧡
                    </p>
                    <div className="flex justify-center gap-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-orange-600 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-600 transition">Terms of Service</a>
                        <a href="#" className="hover:text-orange-600 transition">Guidelines</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

