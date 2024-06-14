import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';
import { useSelector } from 'react-redux';

const UserStore = () => {
  const { store_name } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
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
    <div className="bg-gray-200 py-4">
    <div className=
      "flex justify-between text-sm font-semibold text-white bg-blue-800 py-2 px-3 rounded-md mb-3">
      <div>{store_name}</div>
      {user && products?.store_name === store_name && (
          <a href='/create-product'>Add product</a>
        )}    </div>
<div className="px-1 lg:px-5 md:px-1 mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
            {products.products?.map((product:any) => (
        <ProductItem product={product} key={product.id} getProducts={getProductsByStore}/>
      ))}
    </div>
    {products?.products?.length === 20 ?<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> : null}
  </div>
  )
}

export default UserStore