import React, { useState, useEffect } from 'react';
import './banner.css'; // Import CSS for styling

interface Banner {
  image: string;
  title: string;
  description: string;
}

const banners: Banner[] = [
  {
    image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1603546589/71xsZ9XMCtJtTa1tmKanbeVG.jpg',
    title: 'Unique Handcrafted Artworks',
    description: 'Discover exquisite handmade arts and crafts from talented artisans around the world.',
  },
  {
    image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1595343234/Qn5dFd2S3Mc1m6fYnMtKMzQR.jpg',
    title: 'Artisanal Home Decor',
    description: 'Transform your living space with unique artisanal home decor pieces.',
  },
  {
    image: 'https://res.cloudinary.com/spetsnaz/image/upload/v1594730959/samples/landscapes/girl-urban-view.jpg',
    title: 'Handmade Jewelry Collection',
    description: 'Adorn yourself with beautiful handcrafted jewelry made with love and passion.',
  },
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
            <h2>{banner.title}</h2>
            <p>{banner.description}</p>
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
