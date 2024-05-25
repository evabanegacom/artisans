import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import AuthService from '../services/auth-service';
import Loader from '../constants/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
    const userData = useSelector((state: any) => state?.reducer?.auth);
    const [ loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        localStorage.clear();
        try {
            const response = await AuthService.login(user);
            localStorage.setItem('user', JSON.stringify(response.jwt_token));
            // Handle success, redirect, or perform additional actions
            setLoading(false)
            setTimeout(() => {
                window.location.href = '/';
              }, 1000)

        } catch (error:any) {
            // Handle error
            toast.error('Invalid credentials')
            console.error('Error logging in:', error);
            setLoading(false)
        }
    };

    return (
        <>
    <ToastContainer />
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div style={{ background: '#EAE3C9' }} className="max-w-lg w-full rounded-lg py-6 px-8 sm:py-8 sm:px-10 md:py-10 md:px-16">
            <form onSubmit={handleSubmit} className="">
                <p className='text-3xl font-semibold text-gray-600 mb-10'>Sign in</p>
                <div className="mb-4">
                    <label className="block text-gray-600 text-base font-medium">
                        Email:
                    </label>
                    <input className="appearance-none border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" onChange={handleChange} placeholder="Email" />
                </div>

                <div className="mt-6">
                    <label className="block text-gray-600 text-base font-medium">
                        Password:
                    </label>
                    <input autoComplete='off' className="appearance-none border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name="password" onChange={handleChange} placeholder="Password" />
                </div>

                <a className="font-medium underline text-base inline-block align-baseline font-bold text-base text-gray-600 hover:text-blue-800" href="/forgot-password">
                    Forgot Password?
                </a>
                <div className="flex items-center flex-col justify-between mt-4">
                    <button style={{ background: '#091F41' }} className="w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" type="submit">
                        {loading ? <Loader /> : 'Sign In'}
                    </button>
                </div>
            </form>

            <div className="text-center flex justify-center items-center text-xs mt-8">
                <p className="text-gray-700 ml-2">
                    Don't have an account?
                </p>
                <a href="/signup" style={{ color: '#091F41' }} className="inline-block align-baseline font-bold text-xs hover:text-blue-800 mr-2">
                    Sign up
                </a>
            </div>
        </div>
    </div>
</>

    )
}

export default Login