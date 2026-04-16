import React, { useEffect, useState } from "react";
import ProductService from "../../services/product-service";
import Pagination from "../../components/pagination";
import ProductItem from "../../components/product-item";
import { useParams } from "react-router-dom";
import { FiArrowRight, FiPackage } from "react-icons/fi";

const CategoriesPage = () => {
  const { category } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductService.getProductsByCategory(
        category as string, 
        currentPage
      );
      setProducts(response?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [currentPage, category]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Nice UX touch
  };

  const totalData = products?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const categoryTitle = category
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-50">
      {/* HERO SECTION */}
      <section className="relative py-20 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4">
          <div className="inline-block mb-6">
            <div className="px-10 py-5 bg-gradient-to-r from-red-950 via-red-900 to-amber-800 rounded-3xl shadow-2xl ring-8 ring-white/30">
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                {categoryTitle}
              </h1>
            </div>
          </div>

          <p className="mt-6 text-xl md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto">
            Discover the finest handcrafted {categoryTitle?.toLowerCase()} from artisans worldwide
          </p>

          {totalData > 0 && (
            <div className="mt-6 text-lg text-amber-200">
              <span className="font-semibold text-3xl text-white">{totalData}</span>{" "}
              unique pieces available
            </div>
          )}
        </div>
      </section>

      {/* PRODUCT GRID SECTION */}
      <section className="container mx-auto px-4 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <FiPackage className="w-16 h-16 text-amber-600 animate-pulse mb-6" />
            <p className="text-xl text-gray-600">Loading beautiful creations...</p>
          </div>
        ) : products?.products?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
              {products.products.map((product: any, index: number) => (
                <div
                  key={product.id}
                  className="group transition-all duration-300 hover:-translate-y-3"
                >
                  <ProductItem product={product} />
                </div>
              ))}
            </div>

            {/* PAGINATION - Now always visible when needed */}
            {totalPages == 1 && (
              <div className="mt-16 flex justify-center">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          /* NO PRODUCTS STATE */
          <div className="text-center py-32">
            <div className="w-48 h-48 mx-auto mb-8 text-gray-300">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.3" />
                <path d="M70,100 Q100,140 130,100" fill="none" stroke="#dc2626" strokeWidth="10" strokeLinecap="round" />
                <circle cx="85" cy="85" r="10" fill="#dc2626" />
                <circle cx="115" cy="85" r="10" fill="#dc2626" />
              </svg>
            </div>

            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              No Products Yet
            </h3>
            <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
              This category is being curated. Check back soon for beautiful handcrafted treasures!
            </p>

            <a
              href="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-950 to-red-800 text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Explore All Categories
              <FiArrowRight className="text-2xl" />
            </a>
          </div>
        )}
      </section>

      {/* Decorative Bottom Wave */}
      <div className="w-full">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-32 text-amber-100">
          <path
            d="M0,120 C320,40 1120,80 1440,20 V120 H0 Z"
            className="fill-current"
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoriesPage;