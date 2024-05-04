import React, { useState } from 'react';

const EditProfile = () => {
  // Initialize state object for user information
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    seller: false,
    avatar: '',
    state: '',
    storeName: '',
    mobile: ''
  });

  // Function to handle input changes
  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Logic to submit updated user information
    console.log('Form submitted:', userData);
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name:</label>
          <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email:</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">Password:</label>
          <input type="password" id="password" name="password" value={userData.password} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Seller */}
        <div className="mb-4">
          <label htmlFor="seller" className="block mb-1">Seller:</label>
          <input type="checkbox" id="seller" name="seller" checked={userData.seller} onChange={handleInputChange} className="mr-2" />
          <span className="text-gray-700">Are you a seller?</span>
        </div>
        {/* Avatar */}
        <div className="mb-4">
          <label htmlFor="avatar" className="block mb-1">Avatar:</label>
          <input type="text" id="avatar" name="avatar" value={userData.avatar} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* State */}
        <div className="mb-4">
          <label htmlFor="state" className="block mb-1">State:</label>
          <input type="text" id="state" name="state" value={userData.state} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Store Name */}
        <div className="mb-4">
          <label htmlFor="storeName" className="block mb-1">Store Name:</label>
          <input type="text" id="storeName" name="storeName" value={userData.storeName} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Mobile */}
        <div className="mb-4">
          <label htmlFor="mobile" className="block mb-1">Mobile:</label>
          <input type="text" id="mobile" name="mobile" value={userData.mobile} onChange={handleInputChange} className="border rounded-md px-3 py-2 w-full" />
        </div>
        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
