import { useSelector } from 'react-redux';
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from 'react';
import ProductService from '../services/product-service';
import Loader from '../constants/Loader';
import { formatAsCurrency } from '../constants';
import './style.css';

interface Props {
  product: any;
  getProducts?: any;
}
const ProductItem = ({ product, getProducts}: Props) => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  console.log(user);
  
  const [ confirmDelete, setConfirmDelete ] = useState(false);
  const [ deleting, setDeleting ] = useState(false);

  const deleteProduct = async () => {
    setDeleting(true);
    try{
      const removeProduct = await ProductService.deleteProduct(product?.id);
      console.log(removeProduct);
      getProducts();
    }catch(err){
      console.log(err);
    }finally{
      setConfirmDelete(false);
      setDeleting(false);
    }
  }

  return (
<>
  <div className="product-card product-item lg:w-1/4 md:w-1/2 sm:w-full rounded-lg overflow-hidden mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
    <a href={`/product/${product?.product_number}`} className="product-image block relative h-48 rounded-lg overflow-hidden">
      {/* <img src={product.pictureOne.url} alt={product.name} className="object-cover object-center w-full h-full block transition duration-300 ease-in-out" /> */}

      <img
  src={product?.pictureOne?.url}
  alt={product?.name}
  loading="lazy"
  className="object-cover object-center w-full h-full block transition duration-300 ease-in-out"
  srcSet={`${product?.pictureOne} 300w, 
           ${product?.pictureOne} 768w,
           ${product?.pictureOne} 1280w`}
  sizes="(max-width: 300px) 280px,
         (max-width: 768px) 750px,
         1280px"
/>

    </a>
    <div className="product-details flex flex-col justify-between px-4 py-2">
      <div className="product-info flex justify-between items-center">
        <h2 className="product-title title-font text-xl font-medium product-name">{product?.name}</h2>
      </div>
      <div className="product-price-actions flex justify-between items-center mt-2">
        <div className="product-price product-name font-normal text-sm">{formatAsCurrency(product?.price)}</div>
        <h3 className="product-category text-white text-xs tracking-widest title-font mb-1 uppercase font-bold rounded-2xl p-1">{product?.category}</h3>
        {user?.id === product?.user_id && (
          <button type="button" className="product-delete text-red-500 hover:text-red-700 cursor-pointer focus:outline-none" onClick={() => setConfirmDelete(true)}>
            <HiOutlineTrash size={20} />
          </button>
        )}
      </div>
      <button className='button-bg rounded-2xl text-white font-bold text-xs py-1'>Buy</button>
    </div>
  </div>

  {user?.id === product?.user_id && confirmDelete && (
    <div className="modal-overlay bg-gray-900 opacity-75 fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-content bg-white rounded-lg shadow-lg px-8 py-6 text-gray-700">
        <div className="modal-message text-lg font-medium">Are you sure you want to delete "{product?.name}" from your store?</div>
        <div className="modal-actions flex justify-between mt-4">
          <button className="modal-confirm bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300" type="button" onClick={deleteProduct}>
            {deleting ? <span className="spinner" /> : 'Delete'}
          </button>
          <button className="modal-cancel bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300" onClick={() => setConfirmDelete(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )}
</>

  )
}

export default ProductItem