/*  pages/SearchResults.tsx  */
import { useEffect, useState } from "react";
import ProductItem from "../../components/product-item";
import { useSelector } from "react-redux";
import Pagination from "../../components/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiPackage, FiArrowRight } from "react-icons/fi";

const SearchResults = () => {
  const searchState = useSelector((state: any) => state?.reducer?.search);
  const [searchData, setSearchData] = useState<any>({});
  let currentPage = useSelector((state: any) => state?.reducer?.search?.pageNumber);
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("searchTerm");
  const searchDataJson = urlParams.get("data");

  useEffect(() => {
    if (searchDataJson) {
      try {
        const parsed = JSON.parse(searchDataJson);
        setSearchData(parsed);
      } catch (err) {
        console.error("Failed to parse search data", err);
      }
    } else {
      console.log("/search-page");
    }
  }, [searchDataJson]);

  const handlePageChange = (pageNumber: number) => {
    currentPage = pageNumber;
  };

  const totalData = searchData?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* ===== BACKGROUND IMAGE (subtle) ===== */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* ===== HERO HEADER ===== */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 container mx-auto px-4 pt-16 pb-12 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="inline-block"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-950 to-red-800 flex items-center justify-center shadow-2xl ring-8 ring-white/30">
            <FiSearch className="text-4xl text-white" />
          </div>
        </motion.div>

        {/* <h1 className="text-xl md:text-6xl font-bold text-gray-900 mb-3">
          Search Results
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          for{" "}
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-red-950 to-red-800 text-white rounded-full font-semibold shadow-lg">
            "{searchTerm}"
          </span>
        </p> */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-gray-600"
        >
          {totalData > 0 ? (
            <>
              Found{" "}
              <motion.span
                key={totalData}
                initial={{ scale: 1.5, color: "#991b1b" }}
                animate={{ scale: 1, color: "#1f2937" }}
                className="font-bold text-2xl"
              >
                {totalData}
              </motion.span>{" "}
              masterpiece{totalData > 1 ? "s" : ""}
            </>
          ) : (
            "No masterpieces found"
          )}
        </motion.p>
      </motion.section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="relative z-10 container mx-auto px-4 pb-16">
        {searchData.products?.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-7"
          >
            <AnimatePresence>
              {searchData.products.map((product: any, i: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30, rotateY: 15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  className="group"
                >
                  <ProductItem product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* ===== NO RESULTS ILLUSTRATION ===== */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="max-w-lg mx-auto">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-40 h-40 mx-auto mb-8"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full text-gray-300">
                  <path
                    d="M100,20 A40,40 0 1,1 60,60 A40,40 0 1,1 100,100 A40,40 0 1,1 140,60 A40,40 0 1,1 100,20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="opacity-30"
                  />
                  <circle cx="100" cy="100" r="15" fill="#dc2626" />
                  <path
                    d="M80,100 Q100,120 120,100"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              <h3 className="text-3xl font-bold text-gray-800 mb-3">
                No Artworks Found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Try a different search term or explore our curated collections.
              </p>

              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-950 to-red-800 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all"
              >
                Explore Gallery
                <FiArrowRight className="animate-pulse" />
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* ===== PAGINATION ===== */}
        {searchData.products?.length === 20 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 flex justify-center"
          >
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </section>

      {/* ===== DECORATIVE BOTTOM WAVE ===== */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-32 text-white">
          <path
            d="M0,120 C320,40 1120,80 1440,20 V120 H0 Z"
            className="fill-current"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchResults;