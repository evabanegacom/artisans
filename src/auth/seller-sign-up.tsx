// import { useState, useRef, useEffect, } from 'react'
// import AuthService from '../services/auth-service';
// import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
// import Loader from '../constants/Loader';
// import states from './nigerian-state';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
// import SellerModal from '../components/seller-modal/seller-modal';

// const SellerSignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const userDetails = useSelector((state: any) => state?.reducer?.auth?.user);
//   const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
//   const [ loading, setLoading ] = useState(false);
//   const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
//   const fileRef = useRef<any>(null);
//   const [ updateSellerModal, setUpdateSellerModal ] = useState(false);
//   const [sending, setSending] = useState(false);

//   useEffect(() => {
//     userDetails?.seller === true ? window.location.href = '/' : console.log('do nothing');
//     if (isLoggedin && userDetails?.seller === false) {
//       setUpdateSellerModal(true);
//     } else {
//       console.log('do nothing');
//     }
//   }, [isLoggedin, userDetails]); // Assuming userDetails is stable, or destructure the necessary properties if it's not
  
//   console.log(userDetails?.seller)
//   const toggleShowPasswordConfirmation = () => {
//     setShowPasswordConfirmation(!showPasswordConfirmation);
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const triggerOnChange = () => {
//     fileRef.current.click();
//   };

//   const [user, setUser] = useState<any>({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     avatar: null,
//     seller: true,
//     state: '',
//     store_name: '',
//     mobile: '',
//   })

//   const handleChange = (e: any) => {
//     const { name, value, files } = e.target;
//     setUser((prevUser: any) => ({
//       ...prevUser,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     Object.entries(user).forEach(([key, value]) => {
//       formData.append(key, value as any);
//     });
//     try {
//       const response = await AuthService.createAccount(formData);
//       // Handle success, redirect, or perform additional actions
//       toast.success(response?.message)
//       localStorage.setItem('user', JSON.stringify(response?.jwt_token));
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 2000)
//     } catch (error:any) {
//       // Handle error
//       const errorMessages = error?.response?.data?.errors
//       toast.error(`${errorMessages[0]} OR ${errorMessages[1]} OR ${errorMessages[2]} OR An error occurred`)
//       console.error('Error creating user:', error);
//     } finally {
//       setLoading(false); // Set loading state to false regardless of success or failure
//     }
//   };

//   const generateActivationLink = async (e: any) => {
//     setSending(true)
//     try {
//       const response = await AuthService?.generateActivationLink(userDetails?.email);
//       // Handle success, redirect, or perform additional actions
//       toast.success(response?.message)
//     } catch (error:any) {
//       // Handle error
//       const errorMessages = error?.response?.data?.message
//       toast.error(errorMessages)
//       console.error('Error creating user:', error);
//     } finally {
//       setSending(false); // Set loading state to false regardless of success or failure
//     }
//   };

//   return (
//     <>
//     <ToastContainer />
//      <div className="flex flex-col items-center mb-3 bg-gray-900 py-10">
//   {isLoggedin && userDetails?.activated === false ? (
//     <div className="text-center mt-3">
//       <span className="text-red-500 font-bold text-sm mb-2">Your account is not activated</span>
//       <button onClick={generateActivationLink} className="text-green-500 hover:text-green-700 ml-2">
//         {sending ? <Loader /> : 'Click here'}
//       </button>
//       <span className="text-red-500 font-bold text-sm ml-2">to activate your account</span>
//     </div>
//   ) : 
//       <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 py-12 px-4 sm:px-6 lg:px-8">
//         <h5 className="font-bold text-center mb-8">Create Account</h5>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input placeholder='Full Name' required type="text" name="name" id="name" className="mt-1 p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-b border-gray-300 rounded-md" onChange={handleChange} />
//           </div>

//           <div>
//             <input type="email" required placeholder='Email' name="email" id="email" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
//           </div>

//           <div>
//             <input type="text" required placeholder='Mobile' name="mobile" id="mobile" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
//           </div>

//           <div>
//             <input type="text" required placeholder='Store name' name="store_name" id="store_name" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
//           </div>

//           <div>
//             <select required value={user?.state} name="state" id="state" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange}>
//               <option>Select Location</option>
//               {states.map((state, index) => (
//                 <option key={index} value={state}>{state}</option>
//               ))}
//             </select>
//           </div>

//           <div className="relative">
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <input required type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder='Password' className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
//               <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
//                 {showPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="mt-1 relative rounded-md shadow-sm">
//               <input required type={showPasswordConfirmation ? 'text' : 'password'} placeholder='Confirm Password' name="password_confirmation" id="password_confirmation" className="focus:ring-0 focus:outline-none block border-b w-full pr-10 sm:text-sm border-gray-300 p-2 rounded-md" onChange={handleChange} />
//               <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleShowPasswordConfirmation}>
//                 {showPasswordConfirmation ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Optional:</label>
//             <input ref={fileRef} type="file" name="avatar" id="avatar" className="hidden" onChange={handleChange} />
//             <div className="mt-1 flex items-center whitespace-nowrap">
//               <span onClick={triggerOnChange} className="mr-2 inline-block py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm text-gray-700 hover:bg-gray-50 cursor-pointer font-bold">
//                 Choose Image
//               </span>
//               {user.avatar ? <span className="text-gray-500 overflow-hidden overflow-ellipsis whitespace-no-wrap">{user.avatar.name}</span> : <span className="text-gray-500">No file chosen</span>}
//             </div>
//           </div>


//           <div className='mt-4'>
//             <button disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{loading ? <Loader /> : 'Sign Up'}</button>
//           </div>
//         </form>
//         <div className="text-center flex justify-between mt-4">
//           <p className="text-gray-700 ml-2">
//             ALready have an account?
//           </p>
//           <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-2">
//             Sign in
//           </a>
//         </div>
//       </div>
// }
//    </div>
//     <SellerModal isOpen={updateSellerModal} setIsOpen={setUpdateSellerModal} />
//     </>
//   )
// }

// export default SellerSignUp


import { useState, useRef, useEffect } from 'react';
import AuthService from '../services/auth-service';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import Loader from '../constants/Loader';
import states from './nigerian-state';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import SellerModal from '../components/seller-modal/seller-modal';

const SellerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const userDetails = useSelector((state: any) => state?.reducer?.auth?.user);
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const [loading, setLoading] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const fileRef = useRef<any>(null);
  const [updateSellerModal, setUpdateSellerModal] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    userDetails?.seller === true ? window.location.href = '/' : console.log('do nothing');
    if (isLoggedin && userDetails?.seller === false) {
      setUpdateSellerModal(true);
    } else {
      console.log('do nothing');
    }
  }, [isLoggedin, userDetails]); // Assuming userDetails is stable, or destructure the necessary properties if it's not

  const toggleShowPasswordConfirmation = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

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
    seller: true,
    state: '',
    store_name: '',
    mobile: '',
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Trim the store_name value before sending it to the backend
    const trimmedUser = { ...user, store_name: user.store_name.trim() };

    const formData = new FormData();
    Object.entries(trimmedUser).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      const response = await AuthService.createAccount(formData);
      // Handle success, redirect, or perform additional actions
      toast.success(response?.message);
      localStorage.setItem('user', JSON.stringify(response?.jwt_token));
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error: any) {
      // Handle error
      const errorMessages = error?.response?.data?.errors;
      toast.error(`${errorMessages[0]} OR ${errorMessages[1]} OR ${errorMessages[2]} OR An error occurred`);
      console.error('Error creating user:', error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  const generateActivationLink = async (e: any) => {
    setSending(true);
    try {
      const response = await AuthService?.generateActivationLink(userDetails?.email);
      // Handle success, redirect, or perform additional actions
      toast.success(response?.message);
    } catch (error: any) {
      // Handle error
      const errorMessages = error?.response?.data?.message;
      toast.error(errorMessages);
      console.error('Error creating user:', error);
    } finally {
      setSending(false); // Set loading state to false regardless of success or failure
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center mb-3 bg-gray-900 py-10">
        {isLoggedin && userDetails?.activated === false ? (
          <div className="text-center mt-3">
            <span className="text-red-500 font-bold text-sm mb-2">Your account is not activated</span>
            <button onClick={generateActivationLink} className="text-green-500 hover:text-green-700 ml-2">
              {sending ? <Loader /> : 'Click here'}
            </button>
            <span className="text-red-500 font-bold text-sm ml-2">to activate your account</span>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 py-12 px-4 sm:px-6 lg:px-8">
            <h5 className="font-bold text-center mb-8">Create Account</h5>
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
                <input type="text" required placeholder='Store name' name="store_name" id="store_name" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleChange} />
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
                <button disabled={loading} type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{loading ? <Loader /> : 'Sign Up'}</button>
              </div>
            </form>
            <div className="text-center flex justify-between mt-4">
              <p className="text-gray-700 ml-2">
                Already have an account?
              </p>
              <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-2">
                Sign in
              </a>
            </div>
          </div>
        )}
      </div>
      <SellerModal isOpen={updateSellerModal} setIsOpen={setUpdateSellerModal} />
    </>
  );
};

export default SellerSignUp;
