// BackgroundSVG.js
import React from 'react';

const BackgroundSVG = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
      <defs>
        <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' style={{ stopColor: '#4e54c8', stopOpacity: 1 }} />
          <stop offset='100%' style={{ stopColor: '#8f94fb', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width='100' height='100' fill='url(#grad)' />
      <circle cx='20' cy='20' r='15' fill='#ffffff' opacity='0.2' />
      <circle cx='80' cy='20' r='10' fill='#ffffff' opacity='0.2' />
      <circle cx='50' cy='50' r='25' fill='#ffffff' opacity='0.2' />
      <circle cx='30' cy='80' r='20' fill='#ffffff' opacity='0.2' />
      <circle cx='80' cy='80' r='15' fill='#ffffff' opacity='0.2' />
    </svg>
  );
};

export default BackgroundSVG;
