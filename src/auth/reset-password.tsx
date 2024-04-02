import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthService from '../services/auth-service';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import Loader from '../constants/Loader';

const ResetPassword = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const [newPassword, setNewPassword] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const confirmAccount = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`https://fin-man.fly.dev/api/v1/password/reset/${token}`);
      response?.status === 200 ? setShowForm(true) : setShowForm(false)
      toast.success('Account confirmed successfully');
      setLoading(false)
    } catch (error) {
      console.error('Error occurred while confirming account:', error);
      toast.error('Invalid token');
      setLoading(false)
    }
  };

  const validate = newPassword?.newPassword === '' || newPassword?.confirmPassword === '' || newPassword?.newPassword.length < 6 || newPassword?.confirmPassword.length < 6 || newPassword?.newPassword !== newPassword?.confirmPassword

  useEffect(() => {
    confirmAccount();
  }, []);

  const handleChange = (e: any) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log({ newPassword })
    setSending(true)
    if (newPassword?.newPassword !== newPassword?.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true)
    const data = {
      new_password: newPassword?.newPassword,
      reset_token: token
    }

    try {
      const response = await AuthService.updatePassword(data)
      if (response) {
        toast.success('Password reset successfully')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        toast.error('Failed to reset password')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      toast.error('Failed to reset password')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  }

  if (!showForm) return
  return (
    <>

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full sm:w-1/2 max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md">

            <p className="text-lg font-bold mb-4">Reset your password</p>

            <form onSubmit={handleSubmit} className="flex flex-col">

              <div className="relative mb-4">
                <label htmlFor="password" className="block text-sm text-gray-700 font-bold">New Password:</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input type={showPassword ? 'text' : 'password'} name="newPassword" className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={togglePasswordVisibility}>
                    {showPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="relative mb-4">
                <label htmlFor="confirmPassword" className="block text-sm text-gray-700 font-bold">Confirm Password:</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input type={showNewPassword ? 'text' : 'password'} name="confirmPassword" className="focus:ring-0 focus:outline-none block w-full pr-10 sm:text-sm border-b border-gray-300 p-2 border-gray-300 rounded-md" onChange={handleChange} />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={toggleShowNewPassword}>
                    {showNewPassword ? <RiEyeOffFill className="h-5 w-5 text-gray-400" /> : <RiEyeFill className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <button disabled={validate || sending} type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">{sending ? <Loader /> : 'Submit' }</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default ResetPassword