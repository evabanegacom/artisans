import { CgWebsite } from 'react-icons/cg';
import { FaPalette, FaCamera, FaBook, FaFile, FaPlug, FaPaintBrush, FaGlobe, FaCube, FaHandsHelping, FaLayerGroup, FaRocket } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: 'DigitalArt',
    title: 'Digital Art',
    icon: <FaPalette />,
  },
  {
    id: 2,
    name: 'Photography',
    title: 'Photography',
    icon: <FaCamera />,
  },
  {
    id: 3,
    name: 'E-books',
    title: 'E-books',
    icon: <FaBook />,
  },
  {
    id: 4,
    name: 'Templates',
    title: 'Templates',
    icon: <FaFile />,
  },
  {
    id: 5,
    name: 'Plugins',
    title: 'Plugins',
    icon: <FaPlug />,
  },
  {
    id: 6,
    name: 'Themes',
    title: 'Themes',
    icon: <FaPaintBrush />,
  },
  {
    id: 7,
    name: 'Printables',
    title: 'Printables',
    icon: <FaGlobe />,
  },
  {
    id: 8,
    name: 'Stickers',
    title: 'Stickers',
    icon: <FaCube />,
  },
  {
    id: 9,
    name: 'HandCrafted',
    title: 'Hand Crafted',
    icon: <FaHandsHelping />,
  },
  {
    id: 10,
    name: 'Paintings',
    title: 'Paintings',
    icon: <FaLayerGroup />,
  },

  {
    id: 11,
    name: 'WebDesign',
    title: 'Web Design',
    icon: <CgWebsite />
  },
  {
    id: 12,
    name: 'TechStartups',
    title: 'Tech Startups',
    icon: <FaRocket />
  }
  
];

export default categories;
