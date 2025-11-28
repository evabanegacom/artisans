import React, { useState } from 'react';
import { useSelector } from 'react-redux';
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
    user_id: user?.id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsValue = e.target.value;
    setFormData({ ...formData, tags: tagsValue.split(',').map(tag => tag.trim()).filter(Boolean) });
  };

  const handleDownloadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024; // 20MB
      if (file.size > maxSize) {
        toast.error("Digital file must not exceed 10MB.");
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
    const file = e.target.files?.[0];

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
    const maxSize = 1024 * 1024; // 1MB

    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, JPG, PNG, and SVG images are allowed.");
      e.target.value = '';
      return;
    }

    if (file && file.size > maxSize) {
      toast.error("Image must be under 1MB.");
      e.target.value = '';
      return;
    }

    if (file) {
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Critical: Enforce main image manually
    if (!formData.pictureOne || !(formData.pictureOne instanceof File)) {
      toast.error("Please upload the main product image (Picture 1).");
      return;
    }

    setLoading(true);

    try {
      const productData = new FormData();

      Object.entries(formData).forEach(([key, value]: [string, any]) => {
        if (value instanceof File && value.size > 0) {
          productData.append(key, value);
        } else if (key === 'tags' && Array.isArray(value)) {
          productData.append(key, value.join(','));
        } else if (value !== null && value !== undefined && value !== '') {
          productData.append(key, String(value));
        }
      });

      await ProductService.createProduct(productData);
      toast.success('Product published successfully!');
      window.location.href = `/store/${user?.store_name}`;
    } catch (error: any) {
      const msg = error?.response?.data?.message || 'Failed to create product. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const generateActivationLink = async () => {
    setSending(true);
    try {
      const response = await AuthService.generateActivationLink(user?.email);
      toast.success(response?.message || "Activation link sent to your email!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send activation link.");
    } finally {
      setSending(false);
    }
  };

  // Premium File Upload Box (required attribute REMOVED from input)
  const FileUploadBox = ({ name, label, required = false }: { name: string; label: string; required?: boolean }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer">
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          accept="image/jpeg,image/jpg,image/png,image/svg+xml"
        />
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 mb-4 text-indigo-500 group-hover:scale-110 transition-transform">
            <svg fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M24 16v16m-8-8h16" />
              <circle cx="24" cy="24" r="20" strokeWidth={2} fill="none" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">
            {formData[name] ? formData[name].name : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, SVG · Max 1MB</p>
        </div>
      </div>
    </div>
  );

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-12 px-4">
      {/* Not Activated Banner */}
      {isLoggedin && !user?.activated && (
        <div className="max-w-4xl mx-auto mb-10 p-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-2xl text-white text-center">
          <p className="text-lg font-semibold">Your account is not activated yet.</p>
          <button
            onClick={generateActivationLink}
            disabled={sending}
            className="mt-4 inline-flex items-center gap-2 bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            {sending ? <Loader /> : "Resend Activation Link"}
          </button>
        </div>
      )}

      {/* Main Form - Only shown when activated */}
      {isLoggedin && user?.activated && (
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add New Product
            </h1>
            <p className="mt-3 text-lg text-gray-600">Showcase your craftsmanship to the world</p>
          </div>

          <div className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl overflow-hidden border border-white/20">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1">
              <div className="bg-white p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" required onChange={handleChange} placeholder="e.g. Handwoven Silk Scarf"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₦) <span className="text-red-500">*</span></label>
                      <input type="number" name="price" required onChange={handleChange} placeholder="25000"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description <span className="text-red-500">*</span></label>
                    <textarea name="description" required rows={5} onChange={handleChange} placeholder="Tell customers why they’ll love this piece..."
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                      <select name="category" required onChange={handleChange as any}
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none">
                        <option value="">Choose category</option>
                        {categories.map((cat: any) => (
                          <option key={cat.id} value={cat.name}>{cat.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity <span className="text-red-500">*</span></label>
                      <input type="number" name="quantity" required onChange={handleChange} placeholder="10"
                        className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags <span className="text-gray-500 text-xs font-normal">(comma-separated, max 20)</span>
                    </label>
                    <input type="text" placeholder="handmade, african print, ankara, luxury, gift" onChange={handleTagsChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none" />
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Product Images</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FileUploadBox name="pictureOne" label="Main Product Image" required />
                      <FileUploadBox name="pictureTwo" label="Image 2 (Optional)" />
                      <FileUploadBox name="pictureThree" label="Image 3 (Optional)" />
                      <FileUploadBox name="pictureFour" label="Image 4 (Optional)" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Digital Product File (Optional)</label>
                    <input
                      type="file"
                      name="download_file"
                      onChange={handleDownloadFileChange}
                      className="block w-full text-sm text-gray-600 file:mr-4 file:py-4 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white hover:file:from-indigo-700 hover:file:to-purple-700 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">Max 10MB • PDF, ZIP, MP4, etc.</p>
                  </div>

                  <div className="pt-8 text-center">
                    <button
                      disabled={loading}
                      type="submit"
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-5 px-12 rounded-full shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? <Loader /> : (
                        <>
                          <span>Publish Product</span>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductForm;