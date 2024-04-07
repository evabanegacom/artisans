import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';
import { current } from '@reduxjs/toolkit';

const UserStore = () => {
  const { store_name } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProductsByStore = async () => {
    const response = await ProductService.getProductByStore(store_name as string);
    console.log({ response })
    setProducts(response.data || []);
  }

  const handlePageChange = (pageNumber: number) => {
    console.log(currentPage, pageNumber)
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getProductsByStore();
  }, [currentPage])

  console.log(products?.total_products)
  const totalData = products?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  
  return (
    <div className="bg-gray-200 p-4">  {/* Base styles */}
    <h1 className=
      "text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3">
      {store_name}
    </h1>
    <div className="container px-5 py-1 mx-auto">
    <div className="flex flex-wrap -m-4">
            {products.products?.map((product:any) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
  </div>
  )
}

export default UserStore