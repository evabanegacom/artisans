import React, { useEffect, useState } from "react";
import ProductService from "../../services/product-service";
import Pagination from "../../components/pagination";
import ProductItem from "../../components/product-item";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiPackage, FiArrowRight } from "react-icons/fi";

const CategoriesPage = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any>([]);

  const getProducts = async () => {
    try {
      const response = await ProductService.getProductsByCategory(category as string, currentPage);
      setProducts(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, category]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalData = products?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const categoryTitle = category?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-50 relative overflow-hidden">
      {/* ===== BACKGROUND PATTERN ===== */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-repeat"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
        }}
      />

      {/* ===== HERO SECTION ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-20 text-center"
      >
        {/* Background Image (Artisan Theme) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block"
          >
            <div className="px-8 py-4 bg-gradient-to-r from-red-950 via-red-800 to-amber-700 rounded-3xl shadow-2xl ring-8 ring-white/30">
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
                {categoryTitle}
              </h1>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xl md:text-2xl text-gray-200 font-medium"
          >
            Discover the finest handcrafted {categoryTitle?.toLowerCase()} from artisans worldwide
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-lg text-amber-200"
          >
            {totalData > 0 ? (
              <span>
                <strong className="text-3xl text-white">{totalData}</strong> unique pieces available
              </span>
            ) : (
              "Loading masterpieces..."
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="relative z-10 container mx-auto px-4 pb-20">
        {products?.products?.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-8"
          >
            <AnimatePresence>
              {products.products.map((product: any, i: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{
                    y: -12,
                    scale: 1.04,
                    transition: { duration: 0.25 },
                  }}
                  className="group"
                >
                  <ProductItem product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ===== NO PRODUCTS ILLUSTRATION ===== */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="w-48 h-48 mx-auto mb-8"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-300">
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.3" />
                <path d="M70,100 Q100,140 130,100" fill="none" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
                <circle cx="85" cy="85" r="10" fill="#dc2626" />
                <circle cx="115" cy="85" r="10" fill="#dc2626" />
              </svg>
            </motion.div>

            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              No Products Yet
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              This category is being curated. Check back soon for beautiful handcrafted treasures!
            </p>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-950 to-red-800 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all"
            >
              Explore All Categories
              <FiArrowRight className="animate-pulse" />
            </motion.a>
          </motion.div>
        )}

        {/* ===== PAGINATION ===== */}
        {products?.products?.length === 20 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 flex justify-center"
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </section>

      {/* ===== BOTTOM WAVE ===== */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-32 text-white">
          <path
            d="M0,120 C320,40 1120,80 1440,20 V120 H0 Z"
            className="fill-current opacity-90"
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoriesPage;