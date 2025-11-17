// components/product-item.tsx
import { useSelector } from 'react-redux';
import { HiOutlineTrash } from "react-icons/hi2";
import React, { useState, useRef, useEffect } from 'react';
import ProductService from '../services/product-service';
import { useNavigate } from 'react-router-dom';
import PaystackPayButton from '../components/paystack';
import BuyerInfoModal from '../components/buyer-info-modal';
import { formatAsCurrency } from '../constants';
import { motion } from "framer-motion";
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

  const generateOrderNumber = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleSuccess = (reference: any) => {
    const orderNumber = generateOrderNumber();
    navigate(`/product/${product?.product_number}/success`, {
      state: { orderNumber: reference?.reference || orderNumber },
    });
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
        whileHover={{ y: -8 }}
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
                setConfirmDelete(true);
              }}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-red-600 hover:bg-red-50 z-10 opacity-0 group-hover:opacity-100 transition-all"
            >
              <HiOutlineTrash size={18} />
            </motion.button>
          )}

          {/* Sale Badge */}
          {product?.onSale && (
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md"
            >
              SALE
            </motion.div>
          )}
        </a>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full">
              {product?.sold_by}
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-red-950 transition-colors">
            <a href={`/product/${product?.product_number}`} className="after:absolute after:inset-0">
              {product?.name}
            </a>
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                size={16}
                className={i < Math.floor(rating) ? "text-yellow-500 fill-current" : "text-gray-300"}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-red-950">
              {formatAsCurrency(product?.price)}
            </p>
            {product?.original_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatAsCurrency(product.original_price)}
              </span>
            )}
          </div>

          {/* Buy Button */}
          <PaystackPayButton
            email={email}
            amount={product?.price * 100}
            publicKey="pk_test_2c676d6b01cea0704354f1a486590a28da55a341"
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
              <span className="flex items-center justify-center gap-2 font-bold">
                <FiShoppingBag size={18} />
                Buy Now
              </span> as any
            }
            className="w-full bg-gradient-to-r from-red-950 to-red-800 text-white py-3 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          />
        </div>

        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"></div>
      </motion.article>

      {/* Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-xl font-bold text-gray-900">Delete Product?</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete <strong>“{product?.name}”</strong>? This cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={deleteProduct}
                disabled={deleting}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <BuyerInfoModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default ProductItem;