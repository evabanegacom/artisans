import { useState } from 'react'
import AuthService from '../services/auth-service';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../constants/Loader';

const ForgotPassword = () => {
  const [ email, setEmail ] = useState('')
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(false)
  const handleChange = (e: any) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await AuthService.forgotPassword({ email })
        toast.success(response?.message)
        // Handle success, redirect, or perform additional actions
        setLoading(false)
        setTimeout(() => {
          navigate('/login')
        }, 3000)
    } catch (error:any) {
        // Handle error
        toast.error('user doesn\'t exist')
        console.error('Error logging in:', error);
        setLoading(false)
    }
};

const validate = email === ''
  return (
    <>
    <ToastContainer />
    <div style={{height: '89.3vh' }} className="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" onChange={handleChange} placeholder="Email" />
                </div>
                
                <div className="flex items-center justify-between">
                        <button disabled={validate || loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            {loading ? <Loader /> : 'Submit'}
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                            Cancel
                        </a>
                    </div>
            </form>
        </div>
    </div>
</>
  )
}

export default ForgotPassword


