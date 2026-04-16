import { useState, useRef } from 'react';
import AuthService from '../services/auth-service';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import Loader from '../constants/Loader';
import states from './nigerian-state';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const fileRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null as File | null,
    seller: false,
    state: '',
    mobile: '',
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleShowPasswordConfirmation = () => setShowPasswordConfirmation(!showPasswordConfirmation);

  const triggerFileSelect = () => fileRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (file.size > maxSize) {
        toast.error("File size must not exceed 2MB.");
        e.target.value = "";
        return;
      }

      setUser(prev => ({ ...prev, [name]: file }));
      return;
    }

    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value as any);
    });

    try {
      const response = await AuthService.createAccount(formData);
      toast.success(response?.message || "Account created successfully!");

      localStorage.setItem('token', JSON.stringify(response?.jwt_token));
      localStorage.setItem('user', JSON.stringify(response?.user));

      setTimeout(() => {
        window.location.href = '/';
      }, 1800);
    } catch (error: any) {
      const errorMessages = error?.response?.data?.errors;
      if (errorMessages?.length > 0) {
        toast.error(errorMessages.join(', '));
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-800 to-red-900 px-10 py-12 text-center">
              <div className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Create Account</h1>
              <p className="text-amber-100 mt-3 text-lg">Join our community of artisans and creators</p>
            </div>

            {/* Form */}
            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={user.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={user.mobile}
                    onChange={handleChange}
                    placeholder="08012345678"
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State / Location</label>
                  <select
                    name="state"
                    required
                    value={user.state}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white transition-all"
                  >
                    <option value="">Select your state</option>
                    {states.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Create a strong password"
                      className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12 transition-all"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <RiEyeOffFill size={22} /> : <RiEyeFill size={22} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      name="password_confirmation"
                      required
                      value={user.password_confirmation}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent pr-12 transition-all"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPasswordConfirmation}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPasswordConfirmation ? <RiEyeOffFill size={22} /> : <RiEyeFill size={22} />}
                    </button>
                  </div>
                </div>

                {/* Avatar Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture (Optional)</label>
                  <input
                    ref={fileRef}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <div 
                    onClick={triggerFileSelect}
                    className="border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-amber-50"
                  >
                    <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                      📸
                    </div>
                    <p className="text-sm font-medium text-gray-700">Click to upload photo</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                    {user.avatar && (
                      <p className="mt-3 text-xs text-amber-600 font-medium truncate">
                        {user.avatar.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-8 bg-gradient-to-r from-amber-800 to-red-900 hover:from-amber-900 hover:to-red-950 text-white font-semibold py-4 rounded-2xl text-lg shadow-lg transition-all duration-300 disabled:opacity-70"
                >
                  {loading ? <Loader /> : 'Create My Account'}
                </button>
              </form>

              {/* Login Link */}
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="font-semibold text-amber-700 hover:text-amber-800 transition-colors">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-500 text-sm mt-8">
            Join thousands of artisans building beautiful businesses
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;