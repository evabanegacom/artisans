import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  pictureOne: string;
  pictureTwo: string;
  pictureThree: string;
  pictureFour: string;
  soldBy: string;
  contactNumber: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    quantity: 0,
    pictureOne: '',
    pictureTwo: '',
    pictureThree: '',
    pictureFour: '',
    soldBy: '',
    contactNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const file = e.target.files && e.target.files[0]; // Get the first file if available
    if (file) {
      // Handle file upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [name]: reader.result as string });
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    } else {
      // Clear the file if no file is selected
      setFormData({ ...formData, [name]: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
  <label>
    Name:
    <input type="text" name="name" value={formData.name} onChange={handleChange} />
  </label>
  <label>
    Description:
    <textarea name="description" value={formData.description} onChange={handleChange} />
  </label>
  <label>
    Price:
    <input type="number" name="price" value={formData.price} onChange={handleChange} />
  </label>
  <label>
    Category:
    <input type="text" name="category" value={formData.category} onChange={handleChange} />
  </label>
  <label>
    Quantity:
    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
  </label>
  <label>
    Picture One:
    <input type="file" name="pictureOne" onChange={handleFileChange} />
  </label>
  <label>
    Picture Two:
    <input type="file" name="pictureTwo" onChange={handleFileChange} />
  </label>
  <label>
    Picture Three:
    <input type="file" name="pictureThree" onChange={handleFileChange} />
  </label>
  <label>
    Picture Four:
    <input type="file" name="pictureFour" onChange={handleFileChange} />
  </label>
  <label>
    Sold By:
    <input type="text" name="soldBy" value={formData.soldBy} onChange={handleChange} />
  </label>
  <label>
    Contact Number:
    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
  </label>
  <button type="submit">Submit</button>
</form>

  );
};

export default ProductForm;
