import { useSelector } from 'react-redux';
import { HiOutlineTrash } from "react-icons/hi2";
import { useState, useRef, useEffect } from 'react';
import ProductService from '../services/product-service';
import { useNavigate } from 'react-router-dom';
import { formatAsCurrency } from '../constants';
import './style.css';
import PaystackPayButton from './paystack';
import BuyerInfoModal from './buyer-info-modal';

interface Props {
  product: any;
  getProducts?: any;
}

const ProductItem = ({ product, getProducts }: Props) => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const navigate = useNavigate();
console.log(user)
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.mobile || '');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPaymentReady, setPaymentReady] = useState(false); // New state to track when payment should be triggered
  const paystackButtonRef: any = useRef<{ triggerPayment: () => void } | null>(null);

  const deleteProduct = async () => {
    setDeleting(true);
    try {
      await ProductService.deleteProduct(product?.id);
      getProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setConfirmDelete(false);
      setDeleting(false);
    }
  };

  // Function to generate order number
  const generateOrderNumber = () => {
    return `ORD-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
  };

  const handleSuccess = (reference: any) => {
    const orderNumber = generateOrderNumber();
    console.log(`Order Number: ${orderNumber}`);
    console.log(reference);
    navigate(`/product/${product?.product_number}/success`, {
      state: { orderNumber: reference?.reference || orderNumber },
    });
  };

  const handleClose = () => {
    console.log('Transaction was not completed, window closed.');
  };

  const handleButtonClick = () => {
    if (user) {
      paystackButtonRef?.current.triggerPayment();
    } else {
      setModalOpen(true);
    }
  };

  const handleModalSubmit = (name: string, email: string, phone: string) => {
    setName(name);
    setEmail(email);
    setPhone(phone);
    setModalOpen(false);
    setPaymentReady(true); // Set payment ready state to true
  };

  useEffect(() => {
    if (isPaymentReady) {
      paystackButtonRef?.current.triggerPayment();
      setPaymentReady(false); // Reset payment ready state
    }
  }, [isPaymentReady]);

  return (
    <>
      <div className="product-card product-item rounded-lg overflow-hidden mb-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
        <a href={`/product/${product?.product_number}`} className="product-image block relative h-48 overflow-hidden custom-rounded">
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
            <h2 className="product-title title-font text-base font-medium product-name">{product?.name}</h2>
          </div>
          <div className="product-price-actions flex justify-between items-center mt-2 mb-2 flex-wrap">
            <div className="product-price product-name font-normal text-sm">{formatAsCurrency(product?.price)}</div>
            <h6 className="product-category text-white text-xs tracking-widest title-font uppercase font-bold rounded-3xl px-2 py-1">{product?.sold_by}</h6>
            {user?.id === product?.user_id && window.location.pathname.includes('/store/') && (
              <button type="button" className="product-delete text-red-500 hover:text-red-700 cursor-pointer focus:outline-none" onClick={() => setConfirmDelete(true)}>
                <HiOutlineTrash size={20} />
              </button>
            )}
          </div>

          {/* <button
            onClick={handleButtonClick}
            className="button-bg rounded-2xl text-white font-bold text-xs py-1"
          >
            Buy Now
          </button> */}

          <PaystackPayButton
            email={email}
            amount={product?.price * 100} // Convert to kobo
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
            text='Buy now'
            name={name}
            buttonTrigger={handleButtonClick}
            className="button-bg rounded-2xl text-white font-bold text-xs py-1"
          />
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

      <BuyerInfoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleModalSubmit} />
    </>
  );
};

export default ProductItem;
