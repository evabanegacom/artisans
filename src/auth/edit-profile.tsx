import { useEffect, useState } from 'react';
import AuthService from '../services/auth-service';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import states from './nigerian-state';
import { toast } from 'react-toastify';
import Loader from '../constants/Loader';
import Spinner from '../constants/spinner';

const EditProfile = () => {
  // Initialize state object for user information
  const isLoggedin = useSelector((state: any) => state?.reducer?.auth?.isAuth);
  const user = useSelector((state: any) => state?.reducer?.auth?.user);
  const [loading, setLoading] = useState(false);
  
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    seller: user?.seller || false,
    avatar: '',
    state: user?.state || '',
    storeName: user?.store_name || '',
    mobile: user?.mobile || ''
  });

  // Function to handle input changes
  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: files ? files[0] : value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    try {
      const response = await AuthService.updateUserInfo(formData, user?.id);
      // Handle success, redirect, or perform additional actions
      console.log({response})
      toast.success(response?.message)
      localStorage.setItem('user', JSON.stringify(response?.jwt_token));
      // setTimeout(() => {
      //   window.location.href = '/';
      // }, 2000)
    } catch (error:any) {
      // Handle error
      const errorMessages = error?.response?.data?.errors
      toast.error(`${errorMessages[0]} OR ${errorMessages[1]} OR ${errorMessages[2]} OR An error occurred`)
      console.error('Error creating user:', error);
    } finally {
      setLoading(false); // Set loading state to false regardless of success or failure
    }
  };

  if (!isLoggedin) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input placeholder={user?.name} type="text" id="name" name="name" onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input placeholder={user?.email} type="email" id="email" name="email" onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        
        <div>
          <label>Location</label>
            <select required value={user?.state} name="state" id="state" className="mt-1 border-b focus:outline-none focus:ring-blue-500 p-2 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" onChange={handleInputChange}>
              <option>{user?.state}</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
        {/* Store Name */}
        <div className="mb-4">
          <label htmlFor="storeName" className="block mb-1">Store Name:</label>
          <input placeholder={user?.store_name} type="text" id="storeName" name="storeName" onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Mobile */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block mb-1">Mobile:</label>
          <input placeholder={user?.mobile} type="text" id="mobile" name="mobile" onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {user?.url ? <img src={user?.url} alt="avatar" className="w-20 h-20 rounded-full mx-auto mb-4" /> : null}

        <div className="mb-4">
          <label htmlFor="avatar" className="block mb-1">Avatar:</label>
          <input type="file" id="avatar" name="avatar" onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {loading ? <Loader/> : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
