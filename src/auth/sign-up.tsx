import { useState, useRef, } from 'react'
import AuthService from '../services/auth-service';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import Loader from '../constants/Loader';
import states from './nigerian-state';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './auth.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const fileRef = useRef<any>(null);

  const toggleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const triggerOnChange = () => {
    fileRef.current.click();
  };

  const [user, setUser] = useState<any>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    avatar: null,
    seller: false,
    state: '',
    mobile: '',
  })

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
  
    if (files && files[0]) {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024; // 2MB
  
      if (file.size > maxSize) {
        alert("File size must not exceed 2MB.");
        e.target.value = ""; // reset input
        return;
      }
  
      setUser((prevUser: any) => ({
        ...prevUser,
        [name]: file,
      }));
      return;
    }
  
    // For normal text fields
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      const response = await AuthService.createAccount(formData);
      toast.success(response?.message);
      localStorage.setItem('user', JSON.stringify(response?.jwt_token));
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error: any) {
      // Improved error handling
      const errorMessages = error?.response?.data?.errors;
      if (errorMessages && errorMessages.length > 0) {
        toast.error(errorMessages.join(' OR '));
      } else {
        toast.error('An error occurred');
      }
      console.error('Error creating user:', error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };
  
  return (
    <>
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div style={{ background: '#EAE3C9' }} className="max-w-lg w-full rounded-lg py-6 px-8 sm:py-8 sm:px-10 md:py-10 md:px-16">
        <h5 className="font-bold text-start form-color mb-8">Create Account</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input placeholder='Full Name' required type="text" name="name" id="name" className="mt-1 p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-b border-gray-300 rounded-md" onChange={handleChange} />
          </div>

          <div>
            <input type="email" required placeholder='Email' name="email" id="email" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
          </div>

          <div>
            <input type="text" required placeholder='Mobile' name="mobile" id="mobile" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
          </div>

          <div>
            <select required value={user?.state} name="state" id="state" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange}>
              <option>Select Location</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input required type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder='Password' className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
                {showPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input required type={showPasswordConfirmation ? 'text' : 'password'} placeholder='Confirm Password' name="password_confirmation" id="password_confirmation" className="focus:ring-0 focus:outline-none block border-b w-full pr-10 sm:text-sm border-gray-300 p-2 rounded-md" onChange={handleChange} />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleShowPasswordConfirmation}>
                {showPasswordConfirmation ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="relative">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Optional:</label>
            <input ref={fileRef} type="file" name="avatar" id="avatar" className="hidden" onChange={handleChange} />
            <div className="mt-1 flex items-center whitespace-nowrap">
              <span onClick={triggerOnChange} className="mr-2 inline-block py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer font-bold">
                Choose Image
              </span>
              {user.avatar ? <span className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-no-wrap">{user.avatar.name}</span> : <span className="text-gray-500">No file chosen</span>}
            </div>
          </div>


          <div className='mt-4'>
            <button disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white button-bg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{loading ? <Loader /> : 'Sign Up'}</button>
          </div>
        </form>

        {/* <div className="text-center flex justify-between mt-4">
          <p className="text-gray-700 ml-2">
            ALready have an account?
          </p>
          <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-2">
            Sign in
          </a>
        </div> */}

<div className="text-center flex justify-center items-center text-xs mt-8">
                <p className="text-gray-700 ml-2">
                    Already have an account?
                </p>
                <a href="/login" className="dark-text inline-block align-baseline font-bold text-xs hover:text-blue-800 mr-2">
                    Sign in
                </a>
            </div>

      </div>

    </div>
    </>
  )
}

export default SignUp