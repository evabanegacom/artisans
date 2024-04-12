import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';

const UserStore = () => {
  const { store_name } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProductsByStore = async () => {
    const response = await ProductService.getProductByStore(store_name as string, currentPage);
    setProducts(response.data || []);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getProductsByStore();
  }, [currentPage])

  const totalData = products?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  
  return (
    <div className="bg-gray-200 p-4">  {/* Base styles */}
    <div className=
      "flex justify-between text-sm font-semibold text-white bg-blue-800 py-2 px-3 rounded-md mb-3">
      <div>{store_name}</div>
      <a href='/create-product'>Add product</a>
    </div>
    <div className="container px-5 py-1 mx-auto">
    <div className="flex flex-wrap -m-4">
            {products.products?.map((product:any) => (
        <ProductItem product={product} key={product.id} getProducts={getProductsByStore}/>
      ))}
    </div>
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
  </div>
  )
}

export default UserStore