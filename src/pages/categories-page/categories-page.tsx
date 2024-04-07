import React, { useEffect, useState } from 'react'
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';
import { useParams } from 'react-router-dom';

const CategoriesPage = () => {
    const url = "http://localhost:5173/products/Electronics";
    const { category } = useParams();
    console.log(category); // Output: "Electronics"
const [currentPage, setCurrentPage] = useState(1);
console.log(category); // Output: "Electronics"

const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await ProductService.getProductsByCategory(category as string);
      console.log(response);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // You can fetch data for the new page from the backend here
  };

  const totalData = 5 || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  return (
    <div className="bg-gray-200 p-4">  {/* Base styles */}
      <h1 className=
        "text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3">
        {category}
      </h1>
      <div className="container px-5 py-1 mx-auto">
      <div className="flex flex-wrap -m-4">        {products.map((product:any) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </div>
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default CategoriesPage