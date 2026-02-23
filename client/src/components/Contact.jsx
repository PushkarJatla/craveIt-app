import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -z-10 w-64 h-64 bg-orange-200 rounded-full blur-[100px] opacity-40" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900"
          >
            Get in <span className="gradient-text">Touch</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
            Have questions or feedback? We&apos;d love to hear from you.
            Our team is here to help!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-800">Contact Information</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Whether you are a vendor wanting to join or a foodie looking for support,
                use the channels below to reach us.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: <Mail size={24} />, label: "Email", value: "support@craveit.com", color: "bg-blue-100 text-blue-600" },
                { icon: <Phone size={24} />, label: "Phone", value: "+1 (555) 000-0000", color: "bg-green-100 text-green-600" },
                { icon: <MapPin size={24} />, label: "Office", value: "Street Food Lane, Mumbai, IN", color: "bg-orange-100 text-orange-600" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-6 glass-card !p-6 hover:shadow-orange-100 transition-shadow">
                  <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-bold text-gray-800">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card !p-10 shadow-2xl shadow-orange-200/40"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <MessageSquare size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Send us a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-orange-100 focus:bg-white outline-none transition-all font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-5 text-xl"
              >
                {loading ? "Sending..." : "Send Message"} <Send size={24} className="ml-2" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
