import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { uniqueProductNumber } from '../../constants';
import ProductService from '../../services/product-service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../constants/Loader';
import categories from '../../constants/categories';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/auth-service';

const ProductForm: React.FC = () => {
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const [sending, setSending] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<any>({
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
    contact_number: user?.mobile || '',
    product_number: '',
    tags: ['craft'],
    download_file: '',
    user_id: user?.id
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsValue = e.target.value;
    setFormData({ ...formData, tags: tagsValue.split(',').map(tag => tag.trim()) });
  };

  const handleDownloadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
  
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  
      if (file.size > maxSize) {
        alert("File size must not exceed 5MB.");
        // Clear the input value so user can re-select
        e.target.value = "";
        setFormData({ ...formData, download_file: '' });
        return;
      }
  
      setFormData({ ...formData, download_file: file });
    } else {
      setFormData({ ...formData, download_file: '' });
    }
  };
  
    
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const file = e.target.files && e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    const maxSize = 1024 * 1024; // 1 megabyte
    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, JPG, PNG, SVG).");
      e.target.value = ''; // Clear the input
      return;
    }

    if (file && file.size > maxSize) {
      toast.error("The selected image file is too large. Please select an image file under 1 megabyte.");
      e.target.value = '';
      return;
    }

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
      productData.append('tags', formData.tags.join(','));
      

      for (const [name, file] of Object.entries(formData)) {
        if (file instanceof File) {
          productData.append(name, file);
        }
      }
  
      // Append tags

      await ProductService.createProduct(productData);
      // Handle success, redirect, or perform additional actions
      toast.success('Product created successfully');
      window.location.href = `/store/${user?.store_name}`
    } catch (error) {
      // Handle error
      console.error('Error creating product:', error);
      toast.error('Error creating product');
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  const generateActivationLink = async (e: any) => {
    setSending(true)
    try {
      const response = await AuthService?.generateActivationLink(user?.email);
      // Handle success, redirect, or perform additional actions
      toast.success(response?.message)
    } catch (error:any) {
      // Handle error
      const errorMessages = error?.response?.data?.message
      toast.error(errorMessages)
      console.error('Error creating user:', error);
    } finally {
      setSending(false); // Set loading state to false regardless of success or failure
    }
  };

  const PictureInput = ({ name, required }: { name: string, required: boolean }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {name === 'pictureOne' ? 'Product Image:' : 'More(Optional):'}
      </label>
      <div className="relative border border-gray-300 bg-white rounded-md">
        <input type="file" required={required} name={name} onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="flex items-center justify-center py-2 px-4">
          <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
          {formData[name] ? (
            <span className="text-gray-600">{formData[name].name}</span>
          ) : (
            <span className="text-gray-600">Choose a file...</span>
          )}
        </div>
      </div>
    </div>
  );

  if (!user) {
    return <Navigate to='/login' />;
  }
  
  return (
    <div className='bg-gray-200 py-3'>
      {isLoggedin && user?.activated === false ?
    <div className="text-center mt-3">
      <span className="text-red-500 font-bold text-sm mb-2">Your account is not activated</span>
      <button onClick={generateActivationLink} className="text-green-500 hover:text-green-700 ml-2">
        {sending ? <Loader /> : 'Click here'}
      </button>
      <span className="text-red-500 font-bold text-sm ml-2">to activate your account</span>
    </div>
  : 
  <>
    <h1 className='text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3'>Add Product</h1>
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <input placeholder='Product Name' type="text" name="name" required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <textarea placeholder='Product description' name="description" required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div className="mb-4">
        <input type="number" placeholder='Product Price' name="price" required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <select name="category" value={formData.category} required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Product Category</option>
          {categories.map(category => (
            <option key={category?.id} value={category?.name}>
              {category?.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <input placeholder='Quantity' type="number" name="quantity" required onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      <div className="mb-4">
        <input placeholder='Tags' type="text" name="tags" onChange={handleTagsChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <small className="text-gray-500">Enter 5 tags separated by commas</small>
      </div>

<div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pictureOne">
        Product Image:
      </label>
      <div className="relative border border-gray-300 bg-white rounded-md">
        <input type="file" required name="pictureOne" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        <div className="flex items-center justify-center py-2 px-4">
          <svg className="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
          {formData?.pictureOne ? (
            <span className="text-gray-600">{formData?.pictureOne?.name}</span>
          ) : (
            <span className="text-gray-600">Choose a file...</span>
          )}
        </div>
      </div>
    </div>

<PictureInput name="pictureTwo" required={false} />
<PictureInput name="pictureThree" required={false}/>
<PictureInput name="pictureFour" required={false}/>
<div className="mb-4">
       <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="download_file">
        Upload downloadable product file:
      </label>
        <input placeholder='Downloadable File (for digital products)' type="file" name="download_file" 
        onChange={handleDownloadFileChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>

      
      <button disabled={loading} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3">
        {loading ? <Loader /> : 'Submit'} </button>
    </form>
    </>
    }
    </div>
  );
};

export default ProductForm;
