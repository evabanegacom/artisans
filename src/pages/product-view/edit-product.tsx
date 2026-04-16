import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductService from '../../services/product-service';
import Loader from '../../constants/Loader';
import categories from '../../constants/categories';
import { AiFillDelete } from 'react-icons/ai';
import { FaTimes, FaImage, FaTag } from 'react-icons/fa';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: any) => state?.reducer?.auth?.user);

  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState<any>({});
  const [formData, setFormData] = useState<any>({
    name: '',
    description: '',
    price: '',
    category: '',
    quantity: '',
    sold_by: user?.store_name || '',
    contact_number: user?.mobile || '',
    product_number: '',
    tags: [] as string[],
    pictureOne: null as File | null,
    pictureTwo: null as File | null,
    pictureThree: null as File | null,
    pictureFour: null as File | null,
    user_id: user?.id,
  });

  const fileRefs = {
    pictureOne: useRef<HTMLInputElement>(null),
    pictureTwo: useRef<HTMLInputElement>(null),
    pictureThree: useRef<HTMLInputElement>(null),
    pictureFour: useRef<HTMLInputElement>(null),
  };

  // Fetch product details
  const getProduct = async () => {
    try {
      setLoading(true);
      const response = await ProductService.getProductToEdit(id as string);
      const product = response?.data;

      setProductDetail(product);
      setFormData({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        category: product?.category || '',
        quantity: product?.quantity || '',
        sold_by: user?.store_name || '',
        contact_number: user?.mobile || '',
        product_number: product?.product_number || '',
        tags: product?.tags || [],
        user_id: user?.id,
      });
    } catch (error) {
      toast.error('Failed to load product details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsValue = e.target.value;
    setFormData((prev: any) => ({
      ...prev,
      tags: tagsValue.split(',').map((tag) => tag.trim()).filter(Boolean),
    }));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 2.5 * 1024 * 1024; // 2.5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPG, PNG, or WebP)");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size must be less than 2.5MB");
      return;
    }

    setFormData((prev: any) => ({ ...prev, [name]: file }));
  };

  const triggerFileSelect = (field: keyof typeof fileRefs) => {
    fileRefs[field].current?.click();
  };

  const handleDeleteImage = async (index: string) => {
    if (index === 'One') {
      toast.error("You cannot delete the main image. Replace it instead.");
      return;
    }

    if (!window.confirm(`Delete this image?`)) return;

    setLoading(true);
    try {
      const updatedFormData = { ...formData, [`picture${index}`]: '' };
      await ProductService.updateProduct(updatedFormData, productDetail?.id);
      toast.success("Image removed successfully");
      getProduct();
    } catch (error) {
      toast.error("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formPayload = new FormData();

    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'tags' && Array.isArray(value)) {
        value.forEach(tag => formPayload.append('tags[]', tag));
      } else if (value !== null && value !== undefined && !(value instanceof File)) {
        formPayload.append(key, value as string);
      }
    });

    // Append image files
    ['pictureOne', 'pictureTwo', 'pictureThree', 'pictureFour'].forEach((key) => {
      if (formData[key] instanceof File) {
        formPayload.append(key, formData[key]);
      }
    });

    try {
      await ProductService.updateProduct(formPayload, productDetail?.id);
      toast.success("Product updated successfully!");
      getProduct(); // Refresh data
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white shadow-md px-8 py-4 rounded-3xl">
            <FaImage className="text-3xl text-amber-600" />
            <h1 className="text-4xl font-bold text-gray-800">Edit Product</h1>
          </div>
          <p className="text-gray-600 mt-3">Update your product details and images</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Product name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₦)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Price"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-5 py-4 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y transition-all"
                placeholder="Describe your product..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <FaTag /> Tags
              </label>
              <input
                type="text"
                placeholder="Enter tags separated by commas"
                onChange={handleTagsChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-amber-600 hover:text-red-600 transition-colors"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaImage /> Product Images
              </h3>

              {['One', 'Two', 'Three', 'Four'].map((num, idx) => {
                const field = `picture${num}` as keyof typeof formData;
                const currentImage = productDetail?.[`picture${num}`]?.url;

                return (
                  <div key={num} className="border border-gray-200 rounded-3xl p-6 bg-gray-50">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {idx === 0 ? 'Main Image *' : `Additional Image ${idx}`}
                    </label>

                    <input
                      type="file"
                      ref={fileRefs[field]}
                      name={field as string}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row gap-6 items-center">
                      <button
                        type="button"
                        onClick={() => triggerFileSelect(field as keyof typeof fileRefs)}
                        className="flex-1 border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl py-10 text-center transition-all hover:bg-white"
                      >
                        <FaImage className="mx-auto text-4xl text-gray-400 mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Click to upload new image</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP • Max 2.5MB</p>
                        {/* {display the update image name} */}
                        <p className='text-xs text-gray-500 mt-1'>{formData[field] instanceof File ? formData[field].name : ''}</p>
                      </button>

                      {currentImage && (
                        <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-md border border-gray-200">
                          <img
                            src={currentImage}
                            alt={`Product ${num}`}
                            className="w-full h-full object-cover"
                          />
                          {num !== 'One' && (
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(num)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <AiFillDelete size={18} />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
              <input
                type="text"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="08012345678"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-amber-700 to-red-800 hover:from-amber-800 hover:to-red-900 text-white font-bold py-4 rounded-2xl text-lg shadow-lg transition-all disabled:opacity-70"
            >
              {loading ? <Loader /> : 'Update Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;