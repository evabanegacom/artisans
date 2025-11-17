// ProductCategories.tsx
import React, { useEffect, useState } from "react";
import ProductService from "../../services/product-service";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../../components/product-item";
import Loader from "../../constants/Loader";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

interface ProductCategoriesProps {
  category: any;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ category }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProductsByCategory(category?.name, 1);
      setProducts(response.data?.products.slice(0, 10));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category?.name) getProducts();
  }, [category]);

  const settings = {
    dots: true,
    infinite: products.length > 4,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    arrows: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots: any) => (
      <div className="mt-8 pb-4">
        <ul className="flex justify-center space-x-3"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <motion.div
        whileHover={{ scale: 1.4 }}
        className="w-2.5 h-2.5 bg-gradient-to-r from-red-600 to-red-900 rounded-full shadow-md"
      />
    ),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 640, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 2, arrows: false } },
    ],
  };

  if (!category) return null;

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#991b1b" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112... (same as before)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">{category?.title}</h2>
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-red-600 to-red-900 mx-auto rounded-full"></div>
          <p className="mt-3 text-lg text-gray-600">Discover premium picks curated just for you.</p>
        </motion.div>

        <div className="flex justify-end mb-6">
          <a href={`/products/${category?.name}`} className="group inline-flex items-center text-red-950 font-semibold hover:text-red-700">
            View All <FiArrowRight className="ml-2 group-hover:translate-x-1 transition" />
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader /></div>
        ) : products.length === 0 ? (
          <p className="text-center py-16 text-gray-500">No products available.</p>
        ) : (
          <>
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product.id} className="px-3">
                  <ProductItem product={product} getProducts={getProducts} />
                </div>
              ))}
            </Slider>

            {products.length > 5 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center mt-12">
                <button
                  onClick={() => navigate(`/products/${category?.name}`)}
                  className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-red-950 to-red-800 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <FiShoppingBag className="mr-3" />
                  Explore More
                  <span className="ml-3 animate-pulse">→</span>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 z-10">
      <FiArrowRight className="text-red-950 text-xl" />
    </button>
  );
};

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button onClick={onClick} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-12 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-50 z-10">
      <FiArrowRight className="text-red-950 text-xl rotate-180" />
    </button>
  );
};

export default ProductCategories;