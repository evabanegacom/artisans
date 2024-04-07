import React from 'react'

interface Props {
  product: any
}
const ProductItem = ({ product}: Props) => {
  return (
    <a href={`/product/${product?.id}`}>
            <div className="bg-white p-2 shadow-md rounded-lg">
              <img src={product?.pictureTwo?.url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="flex items-center justify-between rounded-lg bg-white py-2">
                <div className="flex items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {product?.name}
                  </h3>
                </div>
                <div className="text-xl font-bold text-green-600">
                  ${product?.price}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Sold by: {" "} {product?.sold_by}
              </div>
            </div>
          </a>
  )
}

export default ProductItem