import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Package } from 'lucide-react';
import ProductService from '../../services/product-service';

interface LocationState {
  downloadUrl?: string;
  orderNumber?: string;
  expiresAt?: string;
}

const SuccessPage: React.FC = () => {
  const { product_number } = useParams<{ product_number: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const downloadUrl = state?.downloadUrl;
  const orderNumber = state?.orderNumber || 'N/A';
  const expiresAt = state?.expiresAt
    ? new Date(state.expiresAt).toLocaleString()
    : null;

  const getProduct = async () => {
    if (!product_number) return;
    try {
      const response = await ProductService.getProduct(product_number);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, [product_number]);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header - Success Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-8 px-6 text-center">
            <CheckCircle className="w-20 h-20 mx-auto mb-4 animate-pulse" />
            <h1 className="text-4xl font-bold mb-2">Purchase Successful!</h1>
            <p className="text-green-50 text-lg">Thank you for your order. Your payment has been processed securely.</p>
          </div>

          <div className="p-8">
            {/* Product Image */}
            {loading ? (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 animate-pulse" />
            ) : product?.image_urls?.[0] ? (
              <div className="mb-8 -mt-16 relative z-10">
                <img
                  src={product.image_urls[0]}
                  alt={product.name}
                  className="w-full max-w-sm mx-auto rounded-xl shadow-xl border-4 border-white object-cover h-80"
                />
              </div>
            ) : null}

            {/* Product Name */}
            {product && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                  <Package className="w-8 h-8 text-emerald-600" />
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2">{product.description?.substring(0, 150)}...</p>
              </div>
            )}

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Order Number:</span>
                <span className="font-bold text-lg text-emerald-600">#{orderNumber}</span>
              </div>
              {expiresAt && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Download Expires:</span>
                  <span className="text-red-600 font-medium">{expiresAt}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {downloadUrl ? (
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                >
                  <Download className="w-6 h-6" />
                  Download Your Product
                </button>
              ) : (
                <div className="text-center text-amber-600 bg-amber-50 py-4 px-6 rounded-xl">
                  Download link is being prepared...
                </div>
              )}

              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </button>
            </div>

            {/* Support Note */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Need help? Contact support at{' '}
              <Link to="/support" className="text-emerald-600 hover:underline font-medium">
                our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;