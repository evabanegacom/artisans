import React, { useState, useEffect, useRef } from "react";
import ProductService from "../../services/product-service";
import { useParams, useNavigate } from "react-router-dom";
import { formatAsCurrency } from "../../constants";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiShare2, FiEdit3, FiTrash2, FiEye, FiDownload, FiShoppingBag } from "react-icons/fi";
import { FaWhatsapp, FaStore, FaStar, FaShieldAlt } from "react-icons/fa";
import { AiOutlineCopy } from "react-icons/ai";
import Spinner from "../../constants/spinner";
import Preview from "../../components/print-on-demand/preview";
import ProductItem from "../../components/product-item";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import BuyerInfoModal from "@/components/buyer-info-modal";
import PaystackPayButton from "@/components/paystack";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState(user?.email || '');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.mobile || '');
    const [isPaymentReady, setPaymentReady] = useState(false);
      const paystackButtonRef = useRef<{ triggerPayment: () => void } | null>(null);
  const shareUrl = window.location.href;
  const title = productDetails?.name || "Check out this amazing artwork!";

  const getProduct = async () => {
    setLoading(true);
    try {
      const res = await ProductService.getProduct(id as string);
      setProductDetails(res?.data);
      getSimilarProducts(res?.data?.category);
      setActiveImg(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getSimilarProducts = async (category: string) => {
    try {
      const res = await ProductService.getProductsByCategory(category, 1);
      setSimilarProducts(res.data?.products?.filter((p: any) => p.id !== Number(id)).slice(0, 8) || []);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async () => {
    setDeleting(true);
    try {
      await ProductService.deleteProduct(productDetails?.id);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(productDetails?.contact_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const handleSuccess = async (reference: any) => {
    setPaymentProcessing(true);
      try {
        const response = await ProductService.send_download_link(
          productDetails?.id,
          email,
          name
        )
    
        if (response?.data?.success) {
          navigate(`/product/${productDetails?.product_number}/success`, {
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
      }finally {
        setPaymentProcessing(false);
      }
    };

  const handleButtonClick = () => {
    if (user) {
      paystackButtonRef.current?.triggerPayment();
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
      if (isPaymentReady) {
        paystackButtonRef.current?.triggerPayment();
        setPaymentReady(false);
      }
    }, [isPaymentReady]);

  const handleModalSubmit = (n: string, e: string, p: string) => {
    setName(n);
    setEmail(e);
    setPhone(p);
    setModalOpen(false);
    setPaymentReady(true);
  };

  if (loading) return <Spinner />;

  if (!productDetails) return <div className="text-center py-20 text-2xl">Product not found</div>;

  return (
    <>
      {/* ===== BREADCRUMB ===== */}
      <div className="bg-gray-100 py-4 border-b">
        <div className="container mx-auto px-4 text-sm breadcrumbs">
          <a href="/" className="text-gray-600 hover:text-red-950">Home</a> →{" "}
          <a href={`/products/${productDetails.category}`} className="text-gray-600 hover:text-red-950">
            {productDetails.category}
          </a>{" "}
          → <span className="text-red-950 font-medium">{productDetails.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* ===== IMAGE GALLERY ===== */}
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl shadow-2xl bg-white"
            >
              <img
                src={productDetails.image_urls?.[activeImg] || "/placeholder.jpg"}
                alt={productDetails.name}
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                className="w-full h-96 md:h-full object-cover cursor-not-allowed"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition" />
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-3">
              {productDetails.image_urls?.map((img: string, i: number) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveImg(i)}
                  className={`rounded-xl overflow-hidden border-4 ${activeImg === i ? "border-red-950" : "border-transparent"}`}
                >
                  <img src={img} alt="" draggable={false} className="w-full h-24 object-cover" onContextMenu={(e) => e.preventDefault()} />
                </motion.button>
              ))}
            </div>
          </div>

          {/* ===== PRODUCT DETAILS ===== */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{productDetails.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-red-950">{formatAsCurrency(productDetails.price)}</span>
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{productDetails.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {productDetails.tags?.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 bg-gradient-to-r from-red-950 to-red-800 text-white text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-6 mb-6 shadow-md border border-gray-300">
  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
    {/* Seller Info */}
    <div className="flex items-center gap-5">
      <img
        src={productDetails.user?.avatar?.url || "https://i.pravatar.cc/80"}
        alt={productDetails.sold_by}
        className="w-16 h-16 rounded-full ring-4 ring-white shadow-xl object-cover"
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />
      <div>
        <p className="font-bold text-xl text-gray-800">{productDetails.sold_by}</p>
        <a 
          href={`/store/${productDetails.sold_by}`} 
          className="text-red-950 hover:text-red-700 font-medium flex items-center gap-1.5 transition-colors"
        >
          <FaStore className="text-sm" />
          Visit Store
        </a>
      </div>
    </div>

    {/* Buy Now Button - Prominent & Eye-catching */}
    <div className="w-full sm:w-auto">
  {/* Hidden Paystack Button (for programmatic trigger) */}
  <PaystackPayButton
    email={email}
    amount={productDetails.price * 100}
    publicKey={import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || ''}
    productId={productDetails.id}
    phone={phone}
    soldBy={productDetails.sold_by}
    picture={productDetails.pictureOne?.url}
    productNumber={productDetails.product_number}
    productName={productDetails.name}
    userId={user?.id}
    onSuccess={handleSuccess}
    onClose={() => console.log('Payment closed')}
    ref={paystackButtonRef}
    name={name}
    text="" // We don't want visible text here
    className="hidden"
  />

  {/* Visible Beautiful "Buy Now" Button */}
  <button
    onClick={handleButtonClick}
    className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-red-950 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
  >
    <FiShoppingBag className="text-xl group-hover:animate-pulse" />
    <span>Buy Now • {formatAsCurrency(productDetails.price)}</span>
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
  </button>
</div>
  </div>

  {/* Optional: Small trust badge below */}
  <div className="mt-4 text-center sm:text-left">
    <p className="text-xs text-gray-600 flex items-center justify-center sm:justify-start gap-2">
      <FaShieldAlt className="text-green-600" />
      Secure payment • Instant download after purchase
    </p>
  </div>
</div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyNumber}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl"
                >
                  <FiPhone /> Call {productDetails.contact_number}
                  {copied && <AiOutlineCopy className="text-green-400" />}
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://wa.me/${productDetails.contact_number}`}
                  target="_blank"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl"
                >
                  <FaWhatsapp size={24} /> Chat on WhatsApp
                </motion.a>
              </div>

              {/* Share & Owner Actions */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <button
                  onClick={() => setShowShare(!showShare)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-950"
                >
                  <FiShare2 /> Share
                </button>

                {user?.id === productDetails.user_id && (
                  <div className="flex gap-4">
                    <a href={`/edit-product/${productDetails.product_number}`} className="text-blue-600 hover:text-blue-800">
                      <FiEdit3 size={22} />
                    </a>
                    <button onClick={() => setConfirmDelete(true)} className="text-red-600 hover:text-red-800">
                      <FiTrash2 size={22} />
                    </button>
                  </div>
                )}
              </div>

              {/* Share Buttons */}
              <AnimatePresence>
                {showShare && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3 mt-4"
                  >
                    <FacebookShareButton url={shareUrl}>
                      <FacebookIcon size={40} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={title}>
                      <TwitterIcon size={40} round />
                    </TwitterShareButton>
                    <WhatsappShareButton url={shareUrl} title={title}>
                      <WhatsappIcon size={40} round />
                    </WhatsappShareButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ===== PRINTABLES / PHOTOGRAPHY PREVIEW ===== */}
        {/* {(productDetails.category === "Printables" || productDetails.category === "Photography") && (
          <div className="mt-16">
            <Preview preferred={productDetails.image_urls[0]} fill={false} />
          </div>
        )} */}

        {/* ===== SIMILAR PRODUCTS ===== */}
        {similarProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {similarProducts.map((p) => (
                <motion.div
                  key={p.id}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring" }}
                >
                  <ProductItem product={p} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/products/${productDetails.category}`)}
                className="px-10 py-4 bg-gradient-to-r from-red-950 to-red-800 text-white font-bold rounded-full shadow-xl hover:shadow-2xl"
              >
                Explore All {productDetails.category}
              </motion.button>
            </div>
          </section>
        )}
      </div>

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Product?</h3>
              <p className="text-gray-600 mb-8">
                Are you sure you want to delete <strong>"{productDetails.name}"</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={deleteProduct}
                  disabled={deleting}
                  className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 disabled:opacity-70"
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-4 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300"
                >
                  Cancel
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

      <AnimatePresence>
        {paymentProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4"
            >
              {/* Spinner */}
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-red-600"></div>
                <FiShoppingBag className="absolute inset-0 m-auto text-red-600" size={32} />
              </div>
      
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900">Processing Your Order...</h3>
                <p className="text-sm text-gray-600 mt-1">Generating your secure download link</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductView;