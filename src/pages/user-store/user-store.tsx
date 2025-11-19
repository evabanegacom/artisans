/*  pages/UserStore.tsx  */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../../services/product-service";
import Pagination from "../../components/pagination";
import ProductItem from "../../components/product-item";
import { useSelector } from "react-redux";
import AuthService from "../../services/auth-service";
import { FaWhatsapp } from "react-icons/fa";
import Spinner from "../../constants/spinner";
import { motion, AnimatePresence } from "framer-motion";

const UserStore = () => {
  const { store_name } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storeOwner, setStoreOwner] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: any) => state?.reducer?.auth?.user);

  const getProductsByStore = async () => {
    setLoading(true);
    try {
      const storeInfo = await AuthService.findUserByStoreName(store_name as string);
      setStoreOwner(storeInfo?.user);
      const response = await ProductService.getProductByStore(store_name as string, currentPage);
      setProducts(response.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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

      {/* ===== HERO BANNER ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

        <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Store Info Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 flex flex-col md:flex-row items-center gap-6 w-full md:w-auto"
          >
            <img
              src={storeOwner?.avatar?.url || "https://robohash.org/placeholder.png"}
              alt={storeOwner?.name}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-white/30 shadow-xl"
            />

            <div className="text-center md:text-left space-y-2">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">{store_name}</h1>
              <p className="text-lg text-gray-200">{storeOwner?.name}</p>
              <p className="text-sm text-gray-300 flex items-center gap-1 justify-center md:justify-start">
                <span className="text-yellow-400">Location</span> {storeOwner?.state}
              </p>
              <p className="text-sm text-gray-300">{storeOwner?.email}</p>

              {/* WhatsApp Button */}
              <motion.a
                href={`https://wa.me/${storeOwner?.mobile}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 mt-3 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
              >
                <FaWhatsapp size={22} />
                <span>{storeOwner?.mobile}</span>
                <span className="ml-1 animate-pulse">Chat</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Add Product (Owner only) */}
          {user && products?.store_name == store_name && (
            <motion.a
              href="/create-product"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-red-950 to-red-800 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition"
            >
              + Add Product
            </motion.a>
          )}
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-16 text-gray-200">
            <path d="M0,100 C360,20 1080,60 1440,100 V0 H0 Z" className="fill-current" />
          </svg>
        </div>
      </motion.section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          <AnimatePresence>
            {products.products?.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductItem product={product} getProducts={getProductsByStore} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {products?.products?.length === 20 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </motion.div>
        )}
      </section>
    </>
  );
};

export default UserStore;