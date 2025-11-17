import { CgWebsite } from 'react-icons/cg';
import { FaPalette, FaCamera, FaBook, FaFile, FaPlug, FaPaintBrush, FaGlobe, FaCube, FaHandsHelping, FaLayerGroup, FaRocket } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: 'TechStartups',
    title: 'Tech Startups',
    icon: <FaRocket />,
    description: 'Resources and tools for launching and growing technology startups.'
  },

  {
    id: 2,
    name: 'Printables',
    title: 'Printables',
    icon: <FaGlobe />,
    description: 'Printable resources and materials for various needs.'
  },

  {
    id: 3,
    name: 'Templates',
    title: 'Templates',
    icon: <FaFile />,
    description: 'Pre-designed templates for various projects and purposes.'
  },

  {
    id: 4,
    name: 'ProductDesign',
    title: 'Product Design',
    icon: <CgWebsite />,
    description: 'Design resources and tools for creating digital products.'
  },

  {
    id: 5,
    name: 'E-books',
    title: 'E-books',
    icon: <FaBook />,
    description: 'A wide range of electronic books across various genres and topics.'
  },

  {
    id: 6,
    name: 'Themes',
    title: 'Themes',
    icon: <FaPaintBrush />,
    description: 'Themes and design resources for websites and applications.'
  },

 
  {
    id: 7,
    name: 'DigitalArt',
    title: 'Digital Art',
    icon: <FaPalette />,
    description: 'Digital artwork and illustrations for various uses.'
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
    description: 'Plugins and extensions to enhance software functionality.'
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
    description: 'Unique hand-crafted digital products and resources.'
  },
  // {
  //   id: 10,
  //   name: 'Paintings',
  //   title: 'Paintings',
  //   icon: <FaLayerGroup />,
  // },
];

export default categories;
