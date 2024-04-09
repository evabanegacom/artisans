import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { uniqueProductNumber } from '../../constants';
import ProductService from '../../services/product-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../constants/Loader';

const ProductForm: React.FC = () => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  console.log({user})
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 0,
    pictureOne: '',
    pictureTwo: '',
    pictureThree: '',
    pictureFour: '',
    sold_by: user?.store_name || '',
    contact_number: user?.mobile || '08066698252',
    product_number: uniqueProductNumber,
    tags: [],
    user_id: user?.id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsInput = e.target.value;
    const tagsArray = tagsInput.split(',').map(tag => tag.trim());
    setFormData({ ...formData, tags: tagsArray as any});
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: file }); // Store the file itself, not its data URL
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: '' });
    }
  };
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const productData = new FormData();
  
      // Append all form data except file inputs and tags
      Object.entries(formData).forEach(([key, value]: [string, any]) => {
        if (typeof value !== 'object' || value instanceof File) {
          productData.append(key, value);
        }
      });
  
      // Append file inputs
      for (const [name, file] of Object.entries(formData)) {
        if (file instanceof File) {
          productData.append(name, file);
        }
      }
  
      // Append tags
      formData.tags.forEach((tag: string, index: number) => {
        productData.append(`tags[${index}]`, tag);
      });
  
      await ProductService.createProduct(productData);
      // Handle success, redirect, or perform additional actions
      toast.success('Product created successfully');
    } catch (error) {
      // Handle error
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };
  

  const productCategories = [
    "E-books",
    "Digital Art",
    "Photography",
    "Templates",
    "Plugins",
    "Themes",
    "Digital Assets",
    "Virtual Goods",
    "Subscription Services"
  ];
  
  return (
    <div className='bg-gray-200 py-3'>
    <h1 className='text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3'>Add Product</h1>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name:
        </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description:
        </label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price:
        </label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category:
        </label>
        <select name="category" value={formData.category} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Category</option>
          {productCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
          Quantity:
        </label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
          Tags:
        </label>
        <input type="text" name="tags" value={formData.tags.join(',')} onChange={handleTagsChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <small className="text-gray-500">Enter tags separated by commas</small>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureOne">
          Picture One:
        </label>
        <input type="file" name="pictureOne" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureTwo">
          Picture Two:
        </label>
        <input type="file" name="pictureTwo" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureThree">
          Picture Three:
        </label>
        <input type="file" name="pictureThree" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureFour">
          Picture Four:
        </label>
        <input type="file" name="pictureFour" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      {/* <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button> */}
      <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
        {loading ? <Loader /> : 'Submit'} </button>
    </form>
    </div>
  );
};

export default ProductForm;
