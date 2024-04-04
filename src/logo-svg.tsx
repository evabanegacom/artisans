import React from 'react'

const LogoSvg = () => {
  return (

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#55efc4" />
      <stop offset="100%" stop-color="#4285f4" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="url(#gradient)" />

  <text x="50%" y="35" dominant-baseline="middle" textAnchor="middle" fontSize="20" fontFamily="Amatic SC, cursive" fill="#2d3436" fontWeight="bold">
        Art Hub
  </text>

  <path d="M20 70 C 30 50 50 40 70 50 L 80 60 L 70 70 C 50 70 30 60 20 70 Z" fill="#ff9f43" />
</svg>


  
        )
}

export default LogoSvg