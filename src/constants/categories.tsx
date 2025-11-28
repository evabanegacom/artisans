import { CgWebsite } from 'react-icons/cg';
import { FaPalette, FaCamera, FaBook, FaFile, FaPlug, FaPaintBrush, FaGlobe, FaCube, FaHandsHelping, FaLayerGroup, FaRocket } from 'react-icons/fa';

const categories = [
  {
    id: 2,
    name: 'Printables',
    title: 'Printables',
    slug: 'printables',
    icon: <FaGlobe />,
    description: 'Printable resources and materials for various needs.'
  },

  {
    id: 3,
    name: 'Templates',
    title: 'Templates',
    slug: 'templates',
    icon: <FaFile />,
    description: 'Pre-designed templates for various projects and purposes.'
  },

  {
    id: 4,
    name: 'ProductDesign',
    title: 'Product Design',
    slug: 'product-design',
    icon: <CgWebsite />,
    description: 'Design resources and tools for creating digital products.'
  },

  {
    id: 5,
    name: 'E-books',
    title: 'E-books',
    slug: 'e-books',
    icon: <FaBook />,
    description: 'A wide range of electronic books across various genres and topics.'
  },

  {
    id: 6,
    name: 'Themes',
    title: 'Themes',
    slug: 'themes',
    icon: <FaPaintBrush />,
    description: 'Themes and design resources for websites and applications.'
  },

  {
    id: 7,
    name: 'DigitalArt',
    title: 'Digital Art',
    slug: 'digital-art',
    icon: <FaPalette />,
    description: 'Digital artwork and illustrations for various uses.'
  },

  {
    id: 8,
    name: 'Photography',
    title: 'Photography',
    slug: 'photography',
    icon: <FaCamera />,
  },

  {
    id: 9,
    name: 'Plugins',
    title: 'Plugins',
    slug: 'plugins',
    icon: <FaPlug />,
    description: 'Plugins and extensions to enhance software functionality.'
  },

  {
    id: 10,
    name: 'HandCrafted',
    title: 'Hand Crafted',
    slug: 'hand-crafted',
    icon: <FaHandsHelping />,
    description: 'Unique hand-crafted digital products and resources.'
  },

  {
    id: 1,
    name: 'TechStartups',
    title: 'Tech Startups',
    slug: 'tech-startups',
    icon: <FaRocket />,
    description: 'Resources and tools for launching and growing technology startups.'
  },
];

export default categories;
