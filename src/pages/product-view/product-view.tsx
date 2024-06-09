import React, { useState, useEffect } from 'react';
import './Details.css';
import ProductService from '../../services/product-service';
import Colors from './Colors';
import DetailsThumb from './DetailsThumb';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { FiPhone } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { formatAsCurrency } from '../../constants';
import { FaEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { HiOutlineTrash } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import ProductCategories from '../product-categories/product-categories';
import ProductItem from '../../components/product-item';


interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  pictureOne: { url: string };
  pictureTwo: { url: string };
  pictureThree: { url: string };
  pictureFour: { url: string };
  sold_by: string;
  contact_number: string;
  product_number: string;
  tags: string[];
  image_urls: string[];
  user_id: number;
}

const ProductView = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const [productDetails, setProductDetails] = useState<Product>();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [ similarProducts, setSimilarProducts ] = useState([]);
  const navigate = useNavigate();

  const deleteProduct = async () => {
    setDeleting(true);
    try {
      const removeProduct = await ProductService.deleteProduct(productDetails?.id as any);
      console.log(removeProduct);
    } catch (err) {
      console.log(err);
    } finally {
      setConfirmDelete(false);
      setDeleting(false);
    }
  }
  const products = [
    {
      "id": "1",
      "title": "Nike Shoes",
      "src": productDetails?.image_urls || [],
      "description": "UI/UX designing, html css tutorials",
      "content": " Browse through our selection of items and find what you need. If you have any questions\
    or wish to purchase an item, feel free to contact the owner directly.",
      "price": 23,
      "colors": ["red", "black", "crimson", "teal"],
      "count": 1
    }
  ]

  const [product, setProduct] = useState({
    item: products,
    index: 0
  })

  const myRef: any = React.createRef();

  const handleTab = (index: number) => {
    setProduct({
      ...product,
      index: index
    });

    const images = myRef?.current?.children;
    if (productDetails && productDetails?.image_urls?.length > 0) {
      for (let i = 0; i < images.length; i++) {
        images[i].className = images[i].className.replace("active", "");
      }
      images[index].className = "active";
    }
  };

  const generateRandomColors = () => {
    const colors = [
      'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink',
      'cyan', 'magenta', 'teal', 'lime', 'brown', 'indigo', 'gray', 'black', 'white'
    ];
    const randomColors: string[] = [];
    while (randomColors.length < 4) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (!randomColors.includes(color)) {
        randomColors.push(color);
      }
    }
    return randomColors;
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await ProductService.getProduct(id as string);
        console.log(response)
        products[0].src = response?.data.image_urls;
        products[0].description = response?.data.description;
        products[0].title = response?.data?.name;
        products[0].price = response?.data?.price;
        products[0].count = response?.data?.quantity;
        products[0].colors = generateRandomColors();
        setProductDetails(response?.data);
        getSimilarProducts(response?.data?.category);
      } catch (error) {
        console.error(error)
      }
    }
    getProductDetails()
    if (productDetails && productDetails?.image_urls.length > 0) {
      const images = myRef.current.children;
      for (let i = 0; i < images.length; i++) {
        images[i].className = i === product?.index ? "active" : "";
      }
    }
  }, [productDetails?.image_urls?.length, product?.index])


  const handleCopyAndWhatsApp = () => {
    if (!productDetails?.contact_number) return;

    // Copy the contact number to the clipboard
    navigator.clipboard.writeText(productDetails?.contact_number);
    setCopied(true);

    // Open WhatsApp link in a new tab
    window.open(`https://wa.me/${productDetails?.contact_number}`, '_blank');

    // Reset copied feedback after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyPhoneNumber = () => {
    if (!productDetails?.contact_number) return;

    // Copy the contact number to the clipboard
    navigator.clipboard.writeText(productDetails?.contact_number);
    setCopied(true);

    // Reset copied feedback after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  const getSimilarProducts = async (productCategory: string) => {
    try {
      const response = await ProductService.getProductsByCategory(productCategory, 1);
      setSimilarProducts(response.data?.products.slice(0, 4));
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="app">
      {
        productDetails && productDetails?.image_urls?.length > 0 && product.item?.map((item: any) => (
          <div className="details" key={item?.id}>
            <div className="big-img">
              <img src={item.src[product?.index]} alt="" />
            </div>

            <div className="box">
              <div className="row">
                <h2><b>{item?.title}</b></h2>
                <span>{formatAsCurrency(item?.price)}</span>
              </div>
              <Colors colors={item.colors} />
              <p>Sold by: {" "} {productDetails?.sold_by}</p>
              {/* <p>{item?.content}</p> */}
              <p>Category: {" "}{productDetails?.category}</p>
              <p>Description: {" "}{item?.description}</p>
              <div>
                <div className='font-bold'>Tags</div>
                <ul>
                  {productDetails?.tags.map(tag => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              <DetailsThumb images={item?.src} tab={handleTab} myRef={myRef} />
              <div className='flex justify-between mt-2 gap-3'>
                <button onClick={handleCopyPhoneNumber} className="cart flex items-center text-sm"><FiPhone className="mr-2" /> {productDetails?.contact_number}</button>
                <button
                  className="cart flex items-center text-sm"
                  onClick={handleCopyAndWhatsApp}
                >
                  <AiOutlineWhatsApp className="mr-2" color='#25d366' /> {productDetails?.contact_number}
                </button>
              </div>
              <a className='bg-lime-950 text-white p-3 rounded align-center mt-3' href={`/store/${productDetails?.sold_by}`} style={{ display: 'grid', placeItems: 'center' }}>Visit store</a>
              {copied && <p className="text-green-500 text-sm">Contact number copied to clipboard</p>}
              {user?.id === productDetails?.user_id && (
                <div className='flex justify-between mt-3'>
                <button type="button" className="product-delete text-red-500 hover:text-red-700 cursor-pointer focus:outline-none" onClick={() => setConfirmDelete(true)}>
                  <HiOutlineTrash size={20} />
                </button>

                <a href={`/edit-product/${productDetails?.product_number}`} className="product-delete text-blue-500 hover:text-blue-700 cursor-pointer focus:outline-none">
                  <FaEdit size={20} />
                </a>
                </div>
              )}
            </div>

            {user?.id === productDetails?.user_id && confirmDelete && (
              <div className="modal-overlay bg-gray-900 opacity-75 fixed inset-0 z-50 flex items-center justify-center">
                <div className="modal-content bg-white rounded-lg shadow-lg px-8 py-6 text-gray-700">
                  <div className="modal-message text-lg font-medium">Are you sure you want to delete "{productDetails?.name}" from your store?</div>
                  <div className="modal-actions flex justify-between mt-4">
                    <button className="modal-confirm bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300" type="button" onClick={deleteProduct}>
                      {deleting ? <span className="spinner" /> : 'Delete'}
                    </button>
                    <button className="modal-cancel bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300" onClick={() => setConfirmDelete(false)}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      }
  <div className='font-medium product-name text-2xl sm:text-xl md:text-3xl'>Explore Similar Products</div>
      <div className="flex flex-col mt-3">
<div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">

  {similarProducts.map((product: any) => (
    // <a href='#' key={product?.id} className="inline-block px-2">
    <ProductItem product={product} key={product?.id} />
  ))}
  {/* </Slider> */}
</div>
<button onClick={() => navigate(`/products/${productDetails?.category}`)} className="py-3 text-center mx-auto button-bg text-white font-semibold text-base rounded-lg w-1/3 mt-3">Explore More</button>
</div>
    </div>
  );
}

export default ProductView;