/* pages/UserStore.tsx */
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductService from "../../services/product-service";
import Pagination from "../../components/pagination";
import ProductItem from "../../components/product-item";
import { useSelector } from "react-redux";
import AuthService from "../../services/auth-service";
import { FaWhatsapp, FaChartLine, FaBox, FaDollarSign } from "react-icons/fa";
import Spinner from "../../constants/spinner";
import { motion, AnimatePresence } from "framer-motion";

const UserStore = () => {
  const { store_name } = useParams<{ store_name: string }>();
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storeOwner, setStoreOwner] = useState<any>({});
  const [storeStats, setStoreStats] = useState({ total_products: 0, total_sales: 0, total_revenue: "₦0" });
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const isOwner = user?.store_name === store_name;

  const getProductsByStore = async () => {
    setLoading(true);
    try {
      const storeInfo = await AuthService.findUserByStoreName(store_name);
      setStoreOwner(storeInfo?.user);

      const response = await ProductService.getProductByStore(store_name, currentPage);
      setProducts(response.data || []);

      // Fetch store stats (you can create this endpoint or reuse from sales)
      if (isOwner) {
        try {
          const stats = await ProductService.sales(user.id);
          setStoreStats(stats);
        } catch (e) { /* optional */ }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getProductsByStore();
  }, [currentPage, store_name]);

  const totalData = products?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  return (
    <>
      {loading && <Spinner />}

      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* HERO BANNER - Premium WordPress Style */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        <div className="relative container mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            {/* Store Info Card */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
                <div className="relative">
                  <img
                    src={storeOwner?.avatar?.url || "https://robohash.org/placeholder.png"}
                    alt={storeOwner?.name}
                    className="w-32 h-32 rounded-full object-cover ring-8 ring-white/30 shadow-2xl"
                  />
                  <div className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-black text-white drop-shadow-2xl">
                    {store_name}
                  </h1>
                  <p className="text-xl text-gray-200 font-medium">{storeOwner?.name}</p>
                  <p className="text-gray-300 flex items-center gap-2 justify-center sm:justify-start">
                    <span className="text-yellow-400">Location</span> {storeOwner?.state || "Worldwide"}
                  </p>

                  {/* WhatsApp Button */}
                  <motion.a
                    href={`https://wa.me/${storeOwner?.mobile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
                  >
                    <FaWhatsapp size={26} />
                    <span>Chat on WhatsApp</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Store Stats (Only for Owner) */}
            {isOwner && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Your Store Stats</h3>
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <FaBox className="w-10 h-10 text-purple-400 mx-auto mb-2" />
                    <p className="text-3xl font-black text-white">{storeStats.total_products || products.products?.length || 0}</p>
                    <p className="text-gray-300 text-sm">Products</p>
                  </div>
                  <div>
                    <FaChartLine className="w-10 h-10 text-pink-400 mx-auto mb-2" />
                    <p className="text-3xl font-black text-white">{storeStats.total_sales || 0}</p>
                    <p className="text-gray-300 text-sm">Sales</p>
                  </div>
                  <div>
                    <FaDollarSign className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <p className="text-3xl font-black text-white">{storeStats.total_revenue || "₦0"}</p>
                    <p className="text-gray-300 text-sm">Revenue</p>
                  </div>
                </div>

                {/* SALES DASHBOARD BUTTON */}
                <Link to={`/${store_name}/sales`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all text-lg"
                  >
                    Go to Sales Dashboard
                  </motion.button>
                </Link>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4"
            >
              {isOwner && (
                <Link to="/create-product">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-rose-500/50 transition-all"
                  >
                    + Add New Product
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 150" className="w-full h-32 text-white">
            <path
              fill="currentColor"
              d="M0,100 C320,20 1120,180 1440,80 L1440,150 L0,150 Z"
            />
          </svg>
        </div>
      </motion.section>

      {/* PRODUCT GRID */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        >
          All Products
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          <AnimatePresence>
            {products.products?.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <ProductItem product={product} getProducts={getProductsByStore} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex justify-center"
          >
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </motion.div>
        )}
      </section>

      {/* Floating WhatsApp Button */}
      {storeOwner?.mobile && (
        <motion.a
          href={`https://wa.me/${storeOwner.mobile}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-green-500 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaWhatsapp size={36} />
        </motion.a>
      )}
    </>
  );
};

export default UserStore;