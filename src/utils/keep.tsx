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
  FiMenu, FiX, FiSearch, FiUser, FiLogOut,
  FiHelpCircle, FiChevronDown, FiShoppingBag,
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
  const reduxSearchTerm = useSelector((s: any) => s?.reducer?.search?.searchTerm || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Local controlled input (critical fix!)
  const [localSearchTerm, setLocalSearchTerm] = useState(reduxSearchTerm);

  // Sync local state when Redux changes (e.g. page load)
  useEffect(() => {
    setLocalSearchTerm(reduxSearchTerm);
  }, [reduxSearchTerm]);

  /* ------------------------------------------------------------------ */
  /*   HELPERS                                                          */
  /* ------------------------------------------------------------------ */
  const navigateToCategory = (cat: string) => {
    setSelectedCategory(cat);
    navigate(`/products/${cat}`);
    setMobileOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    dispatch(setSearchTerm(value)); // Keep Redux in sync
  };

  const findProducts = (e: React.FormEvent) => {
    e.preventDefault();
    const term = localSearchTerm.trim();
    if (!term) return;

    // Clean, beautiful URL
    navigate(`/search?q=${encodeURIComponent(term)}`);
    
    // Trigger search from page 1
    dispatch(searchProducts(term, 1) as any);

    // Close search on mobile
    setSearchOpen(false);
    setMobileOpen(false);
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
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  /* ------------------------------------------------------------------ */
  /*   RENDER                                                           */
  /* ------------------------------------------------------------------ */
  return (
    <nav className={`relative transition-all duration-300 z-50 ${sticky ? "sticky top-0 shadow-2xl" : ""} bg-gradient-to-b from-gray-900 to-gray-800`}>
      <div className="absolute inset-0 bg-white/5 backdrop-blur-md pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: Logo + Mobile Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden rounded-lg p-2 text-gray-300 hover:bg-white/10"
            >
              {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>

            <a href="/" className="ml-2 lg:ml-0">
              <motion.img whileHover={{ scale: 1.05 }} src={logo} alt="Logo" className="h-10 w-auto drop-shadow-md" />
            </a>
          </div>

          {/* CENTER: Desktop Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-6">
            <a href={user?.seller ? `/store/${user?.store_name}` : "/seller-signUp"}
              className="rounded-lg bg-gradient-to-r from-red-950 to-red-800 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl">
              {user?.seller ? "Dashboard" : "Start Selling"}
            </a>

            <div className="relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-gray-200 hover:bg-white/10 rounded-lg transition">
                Categories <FiChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                <div className="rounded-2xl bg-gray-800/95 backdrop-blur-xl shadow-2xl ring-1 ring-white/20 p-3">
                  {categories.map((c) => (
                    <a key={c.id} href={`/products/${c.name}`}
                      onClick={(e) => { e.preventDefault(); navigateToCategory(c.name); }}
                      className="block rounded-lg px-5 py-3 text-gray-200 hover:bg-white/10 transition text-left">
                      {c.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="/support" className="flex items-center gap-2 px-4 py-2 text-gray-200 hover:bg-white/10 rounded-lg">
              <FiHelpCircle /> Help
            </a>
          </div>

          {/* RIGHT: Search + Profile */}
          <div className="hidden lg:flex items-center space-x-4">

            {/* Desktop Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full text-gray-300 hover:bg-white/10 transition">
                <FiSearch className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "320px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-0 top-12 flex items-center rounded-full bg-white/10 backdrop-blur-md shadow-2xl overflow-hidden"
                    onSubmit={findProducts}
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={localSearchTerm}
                      onChange={handleSearchChange}
                      placeholder="Search artworks..."
                      className="w-full bg-transparent py-3 pl-5 pr-12 text-gray-100 placeholder-gray-400 focus:outline-none"
                    />
                    <button type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      <FiSearch className="h-4 w-4" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              {isLoggedin ? (
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-gray-200 hover:bg-white/20 transition">
                  <img src={user?.url || "https://i.pravatar.cc/80"} alt={user?.name}
                    className="h-9 w-9 rounded-full ring-2 ring-white/30" />
                  <span className="font-medium">{user?.name}</span>
                  <FiChevronDown />
                </button>
              ) : (
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 font-bold text-white shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              )}

              <AnimatePresence>
                {profileOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-60 rounded-2xl bg-gray-800/95 backdrop-blur-xl shadow-2xl ring-1 ring-white/20">
                    {isLoggedin ? (
                      <>
                        <a href={`/profile/${user?.name}`} className="flex items-center gap-3 px-5 py-4 text-gray-200 hover:bg-white/10">
                          <FiUser /> Profile
                        </a>
                        <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-900/20 text-left">
                          <FiLogOut /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <a href="/signup" className="block px-5 py-4 text-gray-200 hover:bg-white/10">Create Account</a>
                        <a href="/login" className="block px-5 py-4 text-gray-200 hover:bg-white/10">Sign In</a>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu & Search */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
            className="fixed inset-0 z-50 bg-gray-900/98 backdrop-blur-2xl lg:hidden">
            <div className="flex flex-col h-full px-6 pt-24 pb-10">
              <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 text-gray-300">
                <FiX className="h-8 w-8" />
              </button>

              <form onSubmit={findProducts} className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search artworks..."
                    className="w-full rounded-full bg-white/10 py-4 pl-14 pr-4 text-gray-100 placeholder-gray-400 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <button type="submit" className="mt-3 w-full rounded-full bg-gradient-to-r from-orange-600 to-red-600 py-4 font-bold text-white shadow-xl">
                  Search Now
                </button>
              </form>

              <div className="space-y-3">
                <a href={user?.seller ? `/store/${user?.store_name}` : "/seller-signUp"}
                  className="block rounded-xl bg-gradient-to-r from-red-950 to-red-800 py-4 text-center font-bold text-white">
                  {user?.seller ? "Go to Dashboard" : "Start Selling"}
                </a>

                <select onChange={(e) => { navigateToCategory(e.target.value); setMobileOpen(false); }}
                  className="w-full rounded-xl bg-white/10 py-4 px-5 text-gray-200 backdrop-blur-md">
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.title}</option>)}
                </select>

                {!isLoggedin ? (
                  <>
                    <a href="/signup" className="block rounded-xl bg-blue-600 py-4 text-center font-bold text-white">Create Account</a>
                    <a href="/login" className="block rounded-xl bg-gray-700 py-4 text-center font-bold text-white">Sign In</a>
                  </>
                ) : (
                  <button onClick={logout} className="w-full rounded-xl bg-red-600 py-4 font-bold text-white flex items-center justify-center gap-3">
                    <FiLogOut /> Sign Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;