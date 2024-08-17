import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ProductService from '../../services/product-service';

const SuccessPage: React.FC = () => {
  const { product_number } = useParams<{ product_number: string }>();
  const [product, setProduct] = React.useState<any>(null);
  const location = useLocation();
  const { orderNumber } = location.state || {}; // Destructure the orderNumber from state

  const getProduct = async () => {
    try {
      const response = await ProductService.getProduct(product_number as string);
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Thank you for your purchase!</h1>
        <p className="text-gray-700 mb-6">Your payment was successful. Enjoy your new product!</p>
        {product?.image_urls && (
          <img
            src={product?.image_urls[0]}
            alt={product?.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-gray-500 mb-4">Order Number: <span className="font-semibold">{orderNumber}</span></p>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
