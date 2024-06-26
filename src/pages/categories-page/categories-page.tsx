import React, { useEffect, useState } from 'react'
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';
import { useParams } from 'react-router-dom';

const CategoriesPage = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState<any>([]);
  const getProducts = async () => {
    try {
      const response = await ProductService.getProductsByCategory(category as string , currentPage);
      console.log({response})
      setProducts(response?.data || []);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, [currentPage]);

  console.log({products})
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // You can fetch data for the new page from the backend here
  };

  const totalData = products?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  return (
    <div className="bg-gray-200 p-4">  {/* Base styles */}
      <h1 className=
        "text-center text-1xl font-bold text-white bg-blue-800 py-1 rounded-md mb-3">
        {category}
      </h1>
      <p className="text-center text-lg text-gray-700 mb-4"> See all products in {category} category</p>
      <div className="py-1 mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products?.products?.map((product: any) => (
          <ProductItem product={product} key={product.id} />
        ))}
        </div>
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  )
}

export default CategoriesPage