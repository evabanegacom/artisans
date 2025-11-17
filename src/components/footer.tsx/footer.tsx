/*  components/Footer.tsx  */
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const categories = [
    { name: "Handcrafted Jewelry", href: "/products/jewelry" },
    { name: "Artisanal Home Decor", href: "/products/home-decor" },
    { name: "Digital Artworks", href: "/products/digital-art" },
    { name: "Traditional Crafts", href: "/products/crafts" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 mt-20 overflow-hidden">
      {/* Decorative Top Wave */}
      <div className="relative -top-1">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-20 text-gray-800">
          <path
            d="M0,0 C360,80 1080,40 1440,0 V120 H0 Z"
            className="fill-current"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* ===== ABOUT US ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-red-950 to-red-800 rounded-full"></span>
              About Us
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Artisans Hub is a marketplace for unique handcrafted arts, crafts and digital arts from talented artisans around the world.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-950 transition">
                <FiFacebook className="text-lg text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-950 transition">
                <FiTwitter className="text-lg text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-950 transition">
                <FiInstagram className="text-lg text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-950 transition">
                <FiYoutube className="text-lg text-white" />
              </a>
            </div>
          </motion.div>

          {/* ===== CATEGORIES ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-full"></span>
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <a
                    href={cat.href}
                    className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition group"
                  >
                    <span className="w-1 h-1 bg-indigo-500 rounded-full group-hover:scale-150 transition"></span>
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ===== CONTACT US ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-full"></span>
              Contact Us
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <p className="flex items-center gap-2">
                <FiMapPin className="text-emerald-500" />
                123, Main Street<br />New York, NY 10001
              </p>
              <p className="flex items-center gap-2">
                <FiMail className="text-emerald-500" />
                contact@example.com
              </p>
              <p className="flex items-center gap-2">
                <FiPhone className="text-emerald-500" />
                +234 (806) 669 8252
              </p>
            </div>
          </motion.div>

          {/* ===== NEWSLETTER ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full"></span>
              Newsletter
            </h3>
            <p className="text-sm text-gray-400">
              Subscribe to get updates on our latest offers!
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition"
              >
                <FiSend />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="border-t border-gray-700 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; 2025 Artisans Hub. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="relative -bottom-1">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-16 text-gray-900">
          <path
            d="M0,100 C360,20 1080,60 1440,100 V0 H0 Z"
            className="fill-current"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;