import React, { useState } from 'react';
import DesignPreview from './design-preview';
import tshirtImage from '../../assets/mock-up.jpg';
import blankTshirt from '../../assets/blan-shirt.jpg';
const Preview = () => {


  const pillowImage = 'https://res.cloudinary.com/spetsnaz/image/upload/v1595343234/Qn5dFd2S3Mc1m6fYnMtKMzQR.jpg';
  const dressImage = 'https://res.cloudinary.com/spetsnaz/image/upload/v1594730959/samples/landscapes/girl-urban-view.jpg';
  const designImage = 'https://res.cloudinary.com/spetsnaz/image/upload/v1718342666/digital-painting_qrq1ai.svg';

  const [selectedItem, setSelectedItem] = useState<string>(tshirtImage);

  return (
    <div className="p-4 border border-red-500">
      <h1 className="text-2xl font-bold mb-4">Design Preview</h1>
      <div className="flex space-x-4 mb-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSelectedItem(blankTshirt)}>T-Shirt</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setSelectedItem(pillowImage)}>Pillow Case</button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded" onClick={() => setSelectedItem(dressImage)}>Dress</button>
      </div>
      <DesignPreview itemImage={selectedItem} designImage={designImage} />
    </div>
  );
};

export default Preview;
