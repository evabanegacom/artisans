import { FaPalette, FaCamera, FaBook, FaFile, FaPlug, FaPaintBrush, FaGlobe, FaCube, FaHandsHelping, FaLayerGroup } from 'react-icons/fa';

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
    name: 'DigitalAssets',
    title: 'Digital Assets',
    icon: <FaGlobe />,
  },
  {
    id: 8,
    name: 'VirtualGoods',
    title: 'Virtual Goods',
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
];

export default categories;
