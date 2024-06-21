import React, { useState, useEffect } from 'react';
import './banner.css'; // Import CSS for styling

interface Banner {
  id?: number;
  image: string;
  title: string;
  description: string;
}

// https://www.figma.com/design/440rv5mCHa4CxKnwLGzMjZ/ART-HUB?m=dev

const banners: Banner[] = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1717930214/pikaso_texttoimage_hand-crafted-artworks_2_z43oqd.svg',
    title: 'Artisanal Home Decor',
    description: 'Transform your living space with unique artisanal home decor pieces.',
  },
  {
    id: 2,
    // image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1595343234/Qn5dFd2S3Mc1m6fYnMtKMzQR.jpg',
    image : 'https://res.cloudinary.com/spetsnaz/image/upload/v1717927175/ancient-terracotta-crockery-collection-store-generated-by-ai_2_znuvbk.png',
    title: 'Unique Handcrafted Artworks',
    description: 'Discover exquisite handmade arts and crafts from talented artisans around the world.',
  },
  {
    id: 3,
    // image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1594730959/samples/landscapes/girl-urban-view.jpg',
        image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1717930104/jan-sh-opener_2_a137ot.svg',

    title: 'Handmade Jewelry Collection',
    description: 'Adorn yourself with beautiful handcrafted jewelry made with love and passion.',
  },

  {
    id: 4,
    image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1718342666/digital-painting_qrq1ai.svg',
    title: 'Digital Artworks',
    description: 'Explore a wide range of digital artworks created by talented artists.',
  },

  {
    id: 5,
    image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1719001445/start-ups_q8fuym.svg',
    title: 'Sell your startup',
    description: 'Sell your startup and get the best price for it.',
  }
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // Automatically move to the next banner every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(nextBanner, 3000);

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div className="carousel">
      {banners.map((banner, index) => (
        <div key={index} className={`banner ${index === currentIndex ? 'active' : ''}`}>
          <img src={banner.image} alt={`Banner ${index + 1}`} />
          <div className="content">
            <h2 className={`font-bold ${banner.id===3 ? 'text-gray-950' : ''}`}>{banner.title}</h2>
            <p className={`font-bold ${banner.id===3 ? 'text-gray-950' : ''}`}>{banner.description}</p>
            <a href="#">Shop Now</a>
          </div>
        </div>
      ))}
      {/* <button className="prev" onClick={prevBanner}>Prev</button> */}
      {/* <button className="next" onClick={nextBanner}>Next</button> */}
    </div>
  );
};

export default Carousel;
