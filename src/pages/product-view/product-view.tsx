import React, { useState, useEffect } from 'react';
import './Details.css';
import ProductService from '../../services/product-service';
import Colors from './Colors';
import DetailsThumb from './DetailsThumb';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { FiPhone } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { formatAsCurrency } from '../../constants';


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
}

const ProductView = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  console.log(id)
  const [productDetails, setProductDetails] = useState<Product>();
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
        products[0].src = response.data.image_urls;
        products[0].description = response.data.description;
        products[0].title = response.data.name;
        products[0].price = response.data.price;
        products[0].count = response.data.quantity;
        products[0].colors = generateRandomColors();
        setProductDetails(response.data);
      } catch (error) {
        console.error(error)
      }
    }
    getProductDetails()
    if (productDetails && productDetails?.image_urls.length > 0) {
      const images = myRef.current.children;
      for (let i = 0; i < images.length; i++) {
        images[i].className = i === product.index ? "active" : "";
      }
    }
  }, [productDetails?.image_urls.length, product.index])


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
              <p>{item?.description}</p>
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
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ProductView;