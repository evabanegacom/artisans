/*  components/Navbar.tsx  */
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, searchProducts } from "../../redux/actions";
import { logout } from "../../constants";
import categories from "../../constants/categories";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiLogOut,
  FiHelpCircle,
  FiChevronDown,
  FiShoppingBag,
} from "react-icons/fi";

const Navbar = () => {
  /* ------------------------------------------------------------------ */
  /*   STATE & SELECTORS                                                */
  /* ------------------------------------------------------------------ */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const isLoggedin = useSelector((s: any) => s?.reducer?.auth?.isAuth);
  const user = useSelector((s: any) => s?.reducer?.auth?.user);
  const { searchTerm } = useSelector((s: any) => s?.reducer?.search);
  const pageNumber = useSelector((s: any) => s?.reducer?.search?.pageNumber);

  const dispatch = useDispatch();
  const navigate = useNavigate();
const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");
  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  setLocalSearchTerm(searchTerm || "");
}, [searchTerm]);

  /* ------------------------------------------------------------------ */
  /*   HELPERS                                                          */
  /* ------------------------------------------------------------------ */
  const navigateToCategory = (cat: string) => {
    setSelectedCategory(cat);
    navigate(`/products/${cat}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setLocalSearchTerm(value);        // Update local input
  dispatch(setSearchTerm(value));   // Update Redux
};

const findProducts = (e: React.FormEvent) => {
  e.preventDefault();
  const term = localSearchTerm.trim();
  if (!term) return;

  dispatch(setSearchTerm(term));
  
  // Navigate immediately
  navigate(`/search-results?q=${encodeURIComponent(term)}`);
  
  // Then trigger search
  dispatch(searchProducts(term, 1) as any);
};

  /* ------------------------------------------------------------------ */
  /*   CLOSE DROPDOWNS ON OUTSIDE CLICK                                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ------------------------------------------------------------------ */
  /*   STICKY NAVBAR                                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ------------------------------------------------------------------ */
  /*   FOCUS SEARCH INPUT WHEN OPENED                                   */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  /* ------------------------------------------------------------------ */
  /*   RENDER                                                           */
  /* ------------------------------------------------------------------ */
  return (
    <nav
      className={`relative transition-all duration-300 z-10 ${
        sticky ? "sticky top-0 z-40 shadow-xl" : ""
      } bg-gradient-to-b from-gray-900 to-gray-800`}
    >
      {/* Glass backdrop */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ───── LEFT ───── */}
          <div className="flex items-center">
            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <a href="/" className="ml-2 lg:ml-0 flex items-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={logo}
                alt="Logo"
                className="h-10 w-auto drop-shadow-md"
              />
            </a>
          </div>

          {/* ───── CENTER (DESKTOP) ───── */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center space-x-6">
            {/* Primary actions */}
            <a
              href={user?.seller ? `/store/${user?.store_name}` : "/seller-signUp"}
              className="rounded-lg bg-gradient-to-r from-red-950 to-red-800 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-xl transition"
            >
              {user?.seller ? "Dashboard" : "Start selling"}
            </a>

            <a
              href={user?.seller ? `/store/${user?.store_name}` : "/create-product"}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-white transition"
            >
              Add Product
            </a>

            {/* Mega‑menu for categories */}
            <div className="relative group">
              <button className="flex items-center space-x-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 transition">
                <span>Categories</span>
                <FiChevronDown className="h-4 w-4" />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <div className="rounded-xl bg-gray-800/95 backdrop-blur-md shadow-2xl ring-1 ring-white/10 p-2">
                  {categories.map((c) => (
                    <a
                      key={c.id}
                      href={`/products/${c.name}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToCategory(c.name);
                      }}
                      className="block rounded-lg px-4 py-2 text-sm text-gray-200 hover:bg-white/10 transition"
                    >
                      {c.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="/support"
              className="flex items-center space-x-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10 transition"
            >
              <FiHelpCircle className="h-4 w-4" />
              <span>Get Help</span>
            </a>
          </div>

          {/* ───── RIGHT (DESKTOP) ───── */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search – icon → expands */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="rounded-full p-2 text-gray-300 hover:bg-white/10 transition"
              >
                <FiSearch className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "280px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.25 }}
                    onSubmit={findProducts}
                    className="absolute right-0 top-12 flex items-center overflow-hidden rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Search products..."
                      className="w-full bg-transparent py-2 pl-4 pr-10 text-sm text-gray-200 placeholder-gray-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 p-2 text-white"
                    >
                      <FiSearch className="h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* User profile */}
            <div ref={profileRef} className="relative">
              {isLoggedin ? (
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 rounded-full bg-white/10 p-1 pr-3 text-sm font-medium text-gray-200 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <img
                    src={user?.url || "https://i.pravatar.cc/80"}
                    alt={user?.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{user?.name}</span>
                  <FiChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg transition"
                >
                  Get started
                </button>
              )}

              {/* Desktop dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-gray-800/95 backdrop-blur-md shadow-2xl ring-1 ring-white/10"
                  >
                    <div className="py-2">
                      {isLoggedin ? (
                        <>
                          <a
                            href={`/profile/${user?.name}`}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                          >
                            <FiUser className="h-4 w-4" /> <span>Profile</span>
                          </a>
                          <a
                            href="/login"
                            onClick={logout}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20"
                          >
                            <FiLogOut className="h-4 w-4" /> <span>Sign out</span>
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href="/signup"
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                          >
                            Create Account
                          </a>
                          <a
                            href="/login"
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                          >
                            Sign in
                          </a>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ───── MOBILE FULL‑SCREEN MENU ───── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-lg lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-20">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-6 top-6 text-gray-300 hover:text-white"
              >
                <FiX className="h-8 w-8" />
              </button>

              <div className="space-y-4">
                <a
                  href={user?.seller ? `/store/${user?.store_name}` : "/seller-signUp"}
                  className="block rounded-lg bg-gradient-to-r from-red-950 to-red-800 px-5 py-3 text-lg font-semibold text-white"
                >
                  {user?.seller ? "Dashboard" : "Start selling"}
                </a>

                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    navigateToCategory(e.target.value);
                    setMobileOpen(false);
                  }}
                  className="w-full rounded-lg bg-white/10 px-5 py-3 text-lg text-gray-200 backdrop-blur-sm"
                >
                  <option value="all">Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.title}
                    </option>
                  ))}
                </select>

                <a href="/support" className="block rounded-lg px-5 py-3 text-lg text-gray-200 hover:bg-white/10">
                  <FiHelpCircle className="inline-block h-5 w-5 mr-2" /> Get Help
                </a>

                {/* Mobile search */}
                <form onSubmit={findProducts} className="mt-6 space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Search..."
                      className="w-full rounded-full bg-white/10 py-3 pl-12 pr-4 text-gray-200 placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-orange-600 to-orange-500 py-3 font-semibold text-white shadow-md"
                  >
                    Search
                  </button>
                </form>

                {/* Mobile auth */}
                {!isLoggedin ? (
                  <>
                    <a href="/signup" className="block rounded-lg bg-blue-700 px-5 py-3 text-lg font-semibold text-white">
                      Create Account
                    </a>
                    <a href="/login" className="block rounded-lg bg-gray-700 px-5 py-3 text-lg font-semibold text-white">
                      Sign in
                    </a>
                  </>
                ) : (
                  <a
                    href="/login"
                    onClick={logout}
                    className="block rounded-lg bg-red-600 px-5 py-3 text-lg font-semibold text-white"
                  >
                    <FiLogOut className="inline-block h-5 w-5 mr-2" /> Sign out
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── MOBILE USER DROPDOWN (appears on top of mobile menu) ───── */}
      <AnimatePresence>
        {profileOpen && !mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-50 mx-4 rounded-xl bg-gray-800/95 backdrop-blur-md shadow-2xl ring-1 ring-white/10 lg:hidden"
          >
            <div className="py-2">
              {isLoggedin ? (
                <>
                  <a
                    href={`/profile/${user?.name}`}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-white/10"
                  >
                    <FiUser className="h-4 w-4" /> <span>Profile</span>
                  </a>
                  <a
                    href="/login"
                    onClick={logout}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20"
                  >
                    <FiLogOut className="h-4 w-4" /> <span>Sign out</span>
                  </a>
                </>
              ) : (
                <>
                  <a href="/signup" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10">
                    Create Account
                  </a>
                  <a href="/login" className="block px-4 py-2 text-sm text-gray-200 hover:bg-white/10">
                    Sign in
                  </a>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;