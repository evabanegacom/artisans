import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';

const UserStore = () => {
  const { store_name } = useParams();
  const [products, setProducts] = useState<any>([]);
  const getProductsByStore = async () => {
    const response = await ProductService.getProductByStore(store_name as string);
    console.log({ response })
    setProducts(response.data);
  }

  useEffect(() => {
    getProductsByStore();
  }, [store_name])

  console.log({ store_name })
  return (
    <div className="bg-gray-200 p-4">  {/* Base styles */}
    <h1 className=
      "text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3">
      {store_name}
    </h1>
    <div className="container px-5 py-1 mx-auto">
    <div className="flex flex-wrap -m-4">
            {products.map((product:any) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
    </div>
    {/* <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
  </div>
  )
}

export default UserStore