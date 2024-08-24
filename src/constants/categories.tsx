import { CgWebsite } from 'react-icons/cg';
import { FaPalette, FaCamera, FaBook, FaFile, FaPlug, FaPaintBrush, FaGlobe, FaCube, FaHandsHelping, FaLayerGroup, FaRocket } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: 'TechStartups',
    title: 'Tech Startups',
    icon: <FaRocket />
  },

  {
    id: 2,
    name: 'Printables',
    title: 'Printables',
    icon: <FaGlobe />,
  },

  {
    id: 3,
    name: 'Templates',
    title: 'Templates',
    icon: <FaFile />,
  },

  {
    id: 4,
    name: 'ProductDesign',
    title: 'Product Design',
    icon: <CgWebsite />
  },

  {
    id: 5,
    name: 'E-books',
    title: 'E-books',
    icon: <FaBook />,
  },

  {
    id: 6,
    name: 'Themes',
    title: 'Themes',
    icon: <FaPaintBrush />,
  },

 
  {
    id: 7,
    name: 'DigitalArt',
    title: 'Digital Art',
    icon: <FaPalette />,
  },
  {
    id: 8,
    name: 'Photography',
    title: 'Photography',
    icon: <FaCamera />,
  },
 
  {
    id: 9,
    name: 'Plugins',
    title: 'Plugins',
    icon: <FaPlug />,
  },
  
  
  // {
  //   id: 8,
  //   name: 'Stickers',
  //   title: 'Stickers',
  //   icon: <FaCube />,
  // },
  {
    id: 10,
    name: 'HandCrafted',
    title: 'Hand Crafted',
    icon: <FaHandsHelping />,
  },
  // {
  //   id: 10,
  //   name: 'Paintings',
  //   title: 'Paintings',
  //   icon: <FaLayerGroup />,
  // },
];

export default categories;
