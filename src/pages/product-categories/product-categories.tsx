import { useEffect, useState } from "react";
import ProductService from "../../services/product-service";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductItem from "../../components/product-item";

interface ProductCategoriesProps {
  category: any;
}

const ProductCategories: React.FC<ProductCategoriesProps> = ({ category }) => {
  const [products, setProducts] = useState([]);
  console.log(products.length)
  const getProducts = async () => {
    try {
      const response = await ProductService.getProductsByCategory(category?.name, 1);
      console.log(response)
      setProducts(response.data?.products.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  console.log(products)
  return (
    <>
      {/* {products.length > 0 ? */}
      <div className="flex flex-col mt-3">

        <div className="w-48 sm:w-full lg:w-80 text-center text-xl mb-8 no-rounded-left bg-red-950 text-white">
          {category?.title}
          {/* <a href={`/products/${category?.name}`} className="text-white">View All</a> */}
        </div>
<div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* <Slider {...settings} className="container mx-auto grid grid-cols-1 md:grid-cols-4"> */}

          {products.map((product: any) => (
            // <a href='#' key={product?.id} className="inline-block px-2">
            <ProductItem product={product} key={product?.id} />
          ))}
          {/* </Slider> */}
        </div>
      </div>
      {/* // : null */}
    </>
  )
}

export default ProductCategories