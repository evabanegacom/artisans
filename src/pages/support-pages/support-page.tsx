import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaCheckCircle, FaQuestionCircle, FaShoppingCart, FaDownload, FaHeadset, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

const SupportPage = () => {
  const [sending, setSending] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    request: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
 const serviceId = import.meta.env.VITE_SERVICE_ID;
 const templateId = import.meta.env.VITE_TEMPLATE_ID;
 const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    try {
      await emailjs.send(
        serviceId,
        templateId,
        formData,
        emailjsPublicKey
      );
      toast.success('✅ Your request has been sent successfully! We’ll reply soon.');
      setFormData({ fullName: '', email: '', phone: '', request: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact us via WhatsApp.');
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const faqs = [
    {
      
      question: "How do I buy a digital product?",
      answer: "Click on any product → Click 'Buy Now' → Enter your details → Complete payment via Paystack → Download link is sent instantly to your email!"
    },
    {
      question: "Is payment secure?",
      answer: "Yes! We use Paystack (Nigeria's most trusted payment gateway) with bank-level encryption. Your card details are never stored."
    },
    {
      question: "What happens after payment?",
      answer: "Immediately after successful payment, you’ll be redirected to a success page and receive your download link via email (check spam/junk if not in inbox)."
    },
    {
      question: "Can I get a refund?",
      answer: "Due to the digital nature of our products, all sales are final. But if you have any issue, contact us within 24 hours and we’ll help!"
    },
    {
      question: "My download link expired. What do I do?",
      answer: "No problem! Just reply to the order email or message us on WhatsApp with your order number — we’ll resend a fresh link instantly."
    },
    {
      question: "Do you offer bulk purchase discounts?",
      answer: "Yes! Contact us directly via WhatsApp or email for bulk orders (5+ copies) and we’ll give you a special discount."
    }
  ];

  const howToBuySteps = [
    { icon: <FaShoppingCart />, title: "Browse & Choose", desc: "Explore products and click on what you love" },
    { icon: <FaCheckCircle />, title: "Click Buy Now", desc: "Fast checkout with secure Paystack payment" },
    { icon: <FaDownload />, title: "Instant Download", desc: "Get your file immediately after payment" },
    { icon: <FaHeadset />, title: "Lifetime Support", desc: "We're here if you need help anytime" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Need Help? We're Here For You
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you have a question about your order, need a new download link, or just want to say hi — we’ve got you covered!
          </p>
        </div>

        {/* How to Buy Guide */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">How to Buy in 4 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToBuySteps.map((step, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{i + 1}. {step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 flex items-center justify-center gap-3">
            <FaQuestionCircle className="text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors font-medium text-gray-800"
                >
                  <span>{faq.question}</span>
                  {openFAQ === i ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {openFAQ === i && (
                  <div className="px-6 pb-5 pt-2 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="08012345678"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message / Issue</label>
              <textarea
                name="request"
                value={formData.request}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                placeholder="E.g., I paid for [Product Name] but didn't receive the download link..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
            >
              {sending ? 'Sending Message...' : 'Send Message 🚀'}
            </button>
          </form>
        </section>

        {/* Social Links */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Or reach us directly:</p>
          <div className="flex justify-center gap-8 text-4xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:scale-125 transition-transform">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              className="text-sky-500 hover:scale-125 transition-transform">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="text-pink-600 hover:scale-125 transition-transform">
              <FaInstagram />
            </a>
            <a href="https://wa.me/2348012345678" target="_blank" rel="noopener noreferrer"
              className="text-green-500 hover:scale-125 transition-transform">
              <FaWhatsapp />
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            WhatsApp is the fastest way to get help • Usually reply in under 5 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;