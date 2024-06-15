import React, { ReactEventHandler, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

const SupportPage = () => {
  const EMAILJS_CONFIG = {
    serviceID: 'service_at08rhg',
    templateID: 'template_t49l8mp',
    userID: 'n6awI1SvGuse1bk8M',
  };

  const [ sending, setSending ] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    request: '',
    phone: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    setSending(true);
    e.preventDefault();
    emailjs.send(
      EMAILJS_CONFIG.serviceID,
      EMAILJS_CONFIG.templateID,
      formData,
      EMAILJS_CONFIG.userID
    ).then((result) => {
      console.log(result.text);
      toast.success('request sent successfully!');
      setFormData({ fullName: '', email: '', request: '', phone: ''});
      setSending(false);
    }, (error) => {
      console.log(error.text);
      toast.error('Failed to send request, please try again later.');
      setSending(false);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Support Page</h1>
        
        <div className="mb-8 text-center">
          <p>If you have any questions or need support, please fill out the form below or reach out to us via social media.</p>
        </div>
        
        <div className="flex justify-center space-x-4 mb-8">
          <a href="https://facebook.com" className="text-blue-600" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" className="text-blue-400" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} />
          </a>
          <a href="https://instagram.com" className="text-pink-500" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://wa.me/YOUR_WHATSAPP_NUMBER" className="text-green-500" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} />
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName}
              onChange={handleChange}
              required 
              className="mt-1 block w-full border border-gray-300 outline-none rounded-md shadow-sm py-2 px-3 focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Mobile</label>
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              required 
              className="mt-1 block w-full border border-gray-300 outline-none rounded-md shadow-sm py-2 px-3 focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              className="mt-1 block w-full border border-gray-300 outline-none rounded-md shadow-sm py-2 px-3 focus:ring-1 focus:ring-blue-600 focus:border-transparent"            />
          </div>
          
          <div>
            <label htmlFor="request" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea 
              id="request" 
              name="request" 
              value={formData.request}
              onChange={handleChange}
              required 
              className="mt-1 block w-full border border-gray-300 outline-none rounded-md shadow-sm py-2 px-3 focus:ring-1 focus:ring-blue-600 focus:border-transparent"              rows={4}
            ></textarea>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">
            {sending ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
