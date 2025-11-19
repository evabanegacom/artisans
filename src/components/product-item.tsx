import { useSelector } from 'react-redux';
import { HiOutlineTrash } from "react-icons/hi2";
import React, { useState, useRef, useEffect } from 'react';
import ProductService from '../services/product-service';
import { useNavigate } from 'react-router-dom';
import PaystackPayButton from '../components/paystack';
import BuyerInfoModal from '../components/buyer-info-modal';
import { formatAsCurrency } from '../constants';
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiStar } from "react-icons/fi";

interface Props {
  product: any;
  getProducts?: () => void;
}

const ProductItem: React.FC<Props> = ({ product, getProducts }) => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.mobile || '');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPaymentReady, setPaymentReady] = useState(false);
  const paystackButtonRef = useRef<{ triggerPayment: () => void } | null>(null);

  const deleteProduct = async () => {
    setDeleting(true);
    try {
      await ProductService.deleteProduct(product?.id);
      getProducts?.();
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmDelete(false);
      setDeleting(false);
    }
  };

  // const generateOrderNumber = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // const handleSuccess = (reference: any) => {
  //   const orderNumber = generateOrderNumber();
  //   navigate(`/product/${product?.product_number}/success`, {
  //     state: { orderNumber: reference?.reference || orderNumber },
  //   });
  // };

  const handleSuccess = async (reference: any) => {
    try {
      const response = await ProductService.send_download_link(
        product.id,
        email,
        name
      )

      console.log({response})
  
      if (response?.data?.success) {
        navigate(`/product/${product.product_number}/success`, {
          state: {
            downloadUrl: response?.data?.order.download_url,
            orderNumber: reference.reference,
            expiresAt: response?.data?.order.expires_at,
          },
        });
      } else {
        alert('Order created but something went wrong.');
      }
    } catch (err) {
      console.error('Failed to create order:', err);
      alert('Payment successful, but failed to generate download link. Contact support.');
    }
  };

  const handleClose = () => console.log('Payment closed');

  const handleButtonClick = () => {
    if (user) {
      paystackButtonRef.current?.triggerPayment();
    } else {
      setModalOpen(true);
    }
  };

  const handleModalSubmit = (n: string, e: string, p: string) => {
    setName(n);
    setEmail(e);
    setPhone(p);
    setModalOpen(false);
    setPaymentReady(true);
  };

  useEffect(() => {
    if (isPaymentReady) {
      paystackButtonRef.current?.triggerPayment();
      setPaymentReady(false);
    }
  }, [isPaymentReady]);

  const rating = 4.5; // Replace with real rating later

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: window.innerWidth >= 768 ? -8 : 0 }} // Disable hover lift on mobile
        transition={{ type: "spring", stiffness: 300 }}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
      >
        {/* Image */}
        <a href={`/product/${product?.product_number}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={product?.pictureOne?.url || "/api/placeholder/400/400"}
            alt={product?.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Delete Button (Owner) */}
          {user?.id === product?.user_id && window.location.pathname.includes('/store/') && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setConfirmDelete(true);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-red-600 hover:bg-red-50 z-10 opacity-0 group-hover:opacity-100 transition-all"
            >
              <HiOutlineTrash size={16} />
            </motion.button>
          )}

          {/* Sale Badge */}
          {product?.onSale && (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md"
            >
              SALE
            </motion.div>
          )}
        </a>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
          {/* Store Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-2.5 py-1 rounded-full truncate max-w-[120px] sm:max-w-none">
              {product?.sold_by}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900 line-clamp-2 group-hover:text-red-950 transition-colors leading-tight">
            <a href={`/product/${product?.product_number}`} className="after:absolute after:inset-0">
              {product?.name}
            </a>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-950">
              {formatAsCurrency(product?.price)}
            </p>
            {product?.original_price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                {formatAsCurrency(product.original_price)}
              </span>
            )}
          </div>

          {/* Buy Button */}
          <PaystackPayButton
            email={email}
            amount={product?.price * 100}
            publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ''}
            productId={product?.id}
            phone={phone}
            soldBy={product?.sold_by}
            picture={product?.pictureOne?.url}
            productNumber={product?.product_number}
            productName={product?.name}
            userId={user?.id}
            onSuccess={handleSuccess}
            onClose={handleClose}
            ref={paystackButtonRef}
            name={name}
            buttonTrigger={handleButtonClick}
            text={
              <span className="flex items-center justify-center gap-2 text-sm sm:text-base font-bold">
                <FiShoppingBag size={16} />
                Buy Now
              </span> as any
            }
            className="w-full bg-gradient-to-r from-red-950 to-red-800 text-white py-3 px-4 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm"
          />
        </div>

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
      </motion.article>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setConfirmDelete(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-gray-900">Delete Product?</h3>
              <p className="mt-2 text-sm text-gray-600">
                Are you sure you want to delete <strong className="break-words">“{product?.name}”</strong>?
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteProduct}
                  disabled={deleting}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 disabled:opacity-70 transition"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BuyerInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default ProductItem;