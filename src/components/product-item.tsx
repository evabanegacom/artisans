import React from 'react'

interface Props {
  product: any
}
const ProductItem = ({ product}: Props) => {
  return (
    // <a href={`/product/${product?.id}`}>
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
    // </a>
    <div className='lg:w-1/4 md:w-1/2 p-4 w-full shadow-md rounded-lg mb-2'>
      <a href={`/product/${product?.id}`} className='block relative h-48 rounded overflow-hidden'>
        <img src={product?.pictureTwo?.url} alt={product?.name} className="object-contain object-center w-full h-full block" />
      </a>
      <div className='flex items-center justify-between rounded-lg'>
       <h3 className='text-gray-500 text-xs tracking-widest title-font mb-1 uppercase'>{product?.category}</h3>
       <h2 className='text-gray-900 title-font text-md text-semibold font-medium'>{product?.name}</h2>
      </div>
       <p className='mt-1 font-semibold text-md text-green-600'>{product?.price}</p>
    </div>
  )
}

export default ProductItem