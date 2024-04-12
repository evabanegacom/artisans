import { useSelector } from 'react-redux';
import { HiOutlineTrash } from "react-icons/hi2";
import { useState } from 'react';
import ProductService from '../services/product-service';
import Loader from '../constants/Loader';

interface Props {
  product: any;
  getProducts?: any;
}
const ProductItem = ({ product, getProducts}: Props) => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
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
    {/* // <a href={`/product/${product?.id}`}>
    //         <div className="bg-white p-2 shadow-md rounded-lg">
    //           <img src={product?.pictureTwo?.url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
    //           <div className="flex items-center justify-between rounded-lg bg-white py-2">
    //             <div className="flex items-center">
    //               <h3 className="text-lg font-semibold text-gray-900">
    //                 {product?.name}
    //               </h3>
    //             </div>
    //             <div className="text-xl font-bold text-green-600">
    //               ${product?.price}
    //             </div>
    //           </div>
    //           <div className="text-sm text-gray-500">
    //             Sold by: {" "} {product?.sold_by}
    //           </div>
    //         </div>
    // </a> */}
    <div className='lg:w-1/4 md:w-1/2 p-2 w-full shadow-md rounded-lg mb-2'>
      <a href={`/product/${product?.id}`} className='block relative h-48 rounded overflow-hidden'>
        <img src={product?.pictureTwo?.url} alt={product?.name} className="object-contain object-center w-full h-full block" />
      </a>
      <div className='flex items-center justify-between rounded-lg'>
       <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1 uppercase'>{product?.category}</h3>
       <h2 className='text-gray-900 title-font text-md text-semibold font-medium'>{product?.name}</h2>
      </div>
      <div className='flex justify-between'>
       <div className='mt-1 font-semibold text-md text-green-600'>{product?.price}</div>
       {user?.id === product?.user_id && <HiOutlineTrash color='#FF0000' cursor='pointer'  onClick={()=>setConfirmDelete(true)}/>}
      </div>
    </div>
    {user?.id===product?.user_id && confirmDelete ? 
    <div className='modal-overlay'>
    <div className='modal-content-body'>
      <div>Are you sure you want to delete</div>
      <div>{product?.name}</div>
      <div>from your store?</div>
      <div className='flex justify-between'>
        <button className='bg-red-500 text-white p-2 rounded' onClick={deleteProduct}>{deleting ? <Loader /> : 'Delete'}</button>
        <button className='bg-gray-500 text-white p-2 rounded' onClick={() => setConfirmDelete(false)}>Cancel</button>
    </div>
    </div>
    </div>
    : null}
    </>
  )
}

export default ProductItem