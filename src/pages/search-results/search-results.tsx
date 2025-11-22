/* pages/SearchResults.tsx */
import { useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/product-item";
import Pagination from "../../components/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight, FiHome } from "react-icons/fi";
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiSearch className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <p className="text-2xl font-medium text-gray-600">Start searching for products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-pink-50 to-purple-100" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #c084fc 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #f472b6 0%, transparent 50%)`
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Header - Shopify Style */}
        <section className="relative pt-16 pb-12 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-4xl mx-auto"
            >
              {/* Search Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl mb-8 ring-8 ring-white/50"
              >
                <FiSearch className="w-10 h-10 text-indigo-600" />
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Search Results
              </h1>

              {/* Query Highlight */}
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-200">
                <span className="text-gray-500">for</span>
                <span className="text-2xl font-bold text-indigo-600">"{query}"</span>
              </div>

              {/* Results Count */}
              <div className="mt-8">
                {loading ? (
                  <p className="text-lg text-gray-600">Searching the store...</p>
                ) : error ? (
                  <p className="text-red-600 font-medium">Something went wrong. Please try again.</p>
                ) : (
                  <p className="text-lg text-gray-700">
                    Found{" "}
                    <span className="text-3xl font-bold text-indigo-600">
                      {totalProducts?.toLocaleString() || 0}
                    </span>{" "}
                    {totalProducts === 1 ? "product" : "products"}
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Decorative Bottom Curve */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg viewBox="0 0 1440 100" className="w-full h-24 text-white">
              <path
                fill="currentColor"
                d="M0,100 C320,30 1120,80 1440,50 L1440,100 L0,100 Z"
              />
            </svg>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="container mx-auto px-4 py-32">
            <div className="flex justify-center">
              <Spinner />
            </div>
          </div>
        )}

        {/* Product Grid */}
        {!loading && products?.length > 0 && (
          <section className="relative bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout">
                  {products.map((product: any, i: number) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group"
                    >
                      <ProductItem product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* No Results - Shopify Style */}
        {!loading && !error && products?.length === 0 && (
          <section className="relative bg-white py-32">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
              >
                {/* Sad Face Icon */}
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 112 0 1 1 0 01-2 0zm6 0a1 1 0 112 0 1 1 0 01-2 0zm-3 5a4 4 0 01-4-4h8a4 4 0 01-4 4z" />
                  </svg>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  No products found
                </h2>
                <p className="text-xl text-gray-600 mb-10">
                  We couldn't find any products matching <strong>"{query}"</strong>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition shadow-lg"
                  >
                    <FiHome className="w-5 h-5" />
                    Back to Home
                  </Link>
                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition"
                  >
                    Try Different Keywords
                  </button>
                </div>

                <p className="mt-10 text-gray-500">
                  Try searching for: <em className="text-indigo-600">ebooks, templates, courses, graphics</em>
                </p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Bottom Decoration */}
        <div className="h-32 bg-gradient-to-t from-gray-100 to-transparent" />
      </div>
    </div>
  );
};

export default SearchResults;