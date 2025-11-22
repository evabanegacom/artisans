/*  pages/SearchResults.tsx  */
import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/product-item";
import Pagination from "../../components/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import Spinner from "../../constants/spinner";
import { searchProducts } from "../../redux/actions";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = searchParams.get("q") || searchParams.get("searchTerm") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { products, totalProducts, loading, error } = useSelector(
    (state: any) => state?.reducer?.search || {}
  );

  useEffect(() => {
    if (query.trim()) {
      dispatch(searchProducts(query.trim(), page) as any);
    }
  }, [query, page, dispatch]);

  const totalPages = Math.ceil((totalProducts || 0) / 20);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    navigate(`/search?${params.toString()}`);
  };

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-rose-50">
        <p className="text-2xl text-gray-600">Please enter a search term</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
      {/* Background - NO z-index */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Hero Header - z-10 is enough */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-4 pt-16 pb-12 text-center"
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

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-4">
          for{" "}
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-red-950 to-red-800 text-white rounded-full font-bold shadow-lg">
            "{query}"
          </span>
        </p>

        {loading ? (
          <p className="text-lg text-gray-600">Searching for Products...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <p className="text-lg text-gray-600">
            Found{" "}
            <strong className="text-3xl text-red-950 font-bold">
              {totalProducts || 0}
            </strong>{" "}
            products{totalProducts !== 1 ? "s" : ""}
          </p>
        )}
      </motion.section>

      {/* Loading Spinner */}
      {loading && (
        <div className="container mx-auto px-4 py-32 text-center">
          <Spinner />
        </div>
      )}

      {/* Results Grid */}
      {!loading && products?.length > 0 && (
        <section className="relative container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-7"
          >
            <AnimatePresence>
              {products.map((product: any, i: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  <ProductItem product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 flex justify-center"
            >
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </section>
      )}

      {/* No Results */}
      {!loading && !error && products?.length === 0 && (
        <section className="relative text-center py-32">
          <div className="max-w-lg mx-auto">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-40 h-40 mx-auto mb-8"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-300">
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.3" />
                <path d="M70,100 Q100,140 130,100" fill="none" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
                <circle cx="85" cy="85" r="10" fill="#dc2626" />
                <circle cx="115" cy="85" r="10" fill="#dc2626" />
              </svg>
            </motion.div>

            <h3 className="text-4xl font-bold text-gray-800 mb-4">No Products Found</h3>
            <p className="text-xl text-gray-600 mb-10">
              Try a different search term or explore our collections.
            </p>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-950 to-red-800 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-3xl"
            >
              Explore Gallery
              <FiArrowRight className="animate-pulse" />
            </motion.a>
          </div>
        </section>
      )}

      {/* Bottom Wave - stays at bottom, no z-index needed */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-32 text-white">
          <path d="M0,120 C320,40 1120,80 1440,20 V120 H0 Z" className="fill-current" />
        </svg>
      </div>
    </div>
  );
};

export default SearchResults;
