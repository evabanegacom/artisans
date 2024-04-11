import React, { useState } from 'react'
import AuthService from '../../services/auth-service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { logout } from '../../constants';
import Loader from '../../constants/Loader';

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
const SellerModal = ({ isOpen, setIsOpen }: Props) => {
    const [store_name, setStoreName] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: any) => state?.reducer?.auth?.user);
    const handleChange = (e: any) => {
        setStoreName(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await AuthService.becomeASeller(store_name, user?.id);
            console.log(response)
            setLoading(false)
            toast.success('You are now a seller');
            setIsOpen(false);
            setTimeout(() => {
                logout()
            }
                , 3000)
            // Handle success, redirect, or perform additional actions
        } catch (error: any) {
            // Handle error
            toast.error('Invalid credentials')
            console.error('Error logging in:', error);
            setLoading(false)
        }
    };


    if (!isOpen) return null;
    return (
        <div className='modal-overlay'>
            <div className='modal-content-body'>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input placeholder='Enter store Name' required type="text" name="store_name" id="store_name" className="mt-1 p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-b border-gray-300 rounded-md" onChange={handleChange} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                {loading ? <Loader /> : 'Submit'}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SellerModal