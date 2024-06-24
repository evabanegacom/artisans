import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../../services/product-service';
import Pagination from '../../components/pagination';
import ProductItem from '../../components/product-item';
import { useSelector } from 'react-redux';
import AuthService from '../../services/auth-service';
import { FaWhatsapp } from 'react-icons/fa';
import Spinner from '../../constants/spinner';

const UserStore = () => {
  const { store_name } = useParams();
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [storeOwner, setStoreOwner] = useState<any>({})
  const [ loading, setLoading ] = useState(false);

  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const getProductsByStore = async () => {
    setLoading(true)
    await AuthService.findUserByStoreName(store_name as string).then((storeInfo) => {
      setStoreOwner(storeInfo?.user);
    });
    const response = await ProductService.getProductByStore(store_name as string, currentPage);
    setProducts(response.data || []);
    setLoading(false)
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
    <>
    {loading && <Spinner /> }
    <div className="bg-gray-200 py-4">
    
      <div className=
        "flex justify-between text-sm items-center bg-white font-semibold product-name py-2 px-3 rounded-md mb-3">

        <div className='flex flex-col'>
          <div className='product-name font-medium text-2xl'>{store_name}</div>
          <div className='flex gap-2 mt-2 items-center'>
            <div><img className='h-28 w-28 rounded' src={storeOwner?.avatar?.url || 'https://robohash.org/placeholder.png'} alt={storeOwner?.name} /></div>
            <div className='flex flex-col space-y-2'>
              <div>{storeOwner?.name}</div>
              <div>Location: {storeOwner?.state}</div>
              <div>{storeOwner?.email}</div>
              {/* <div className='product-name'>Digital Arts | E-books | Themes | Paintings</div> */}
              <a href={`https://wa.me/${storeOwner?.mobile}`} className="text-green-500 flex items-center gap-1 text-sm" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={30} /> {storeOwner?.mobile}
              </a>
            </div>
          </div>
        </div>

        {user && products?.store_name === store_name && (
          <a className='text-sm text-end' href='/create-product'>Add product</a>
        )}
      </div>

      <div className="px-1 lg:px-5 md:px-1 mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
        {products.products?.map((product: any) => (
          <ProductItem product={product} key={product.id} getProducts={getProductsByStore} />
        ))}
      </div>
      {products?.products?.length === 20 ? <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> : null}
    </div>
    </>
  )
}

export default UserStore