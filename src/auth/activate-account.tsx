import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../constants/Loader';
import SuccessModal from '../components/success-modal';
import { logout } from '../constants';

const ActivateAccount = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false)
  const [  success, setSuccess ] = useState<any>({});
  const [ isOpen, setIsopen ] = useState(false)

  // <a href="https://fin-man.fly.dev/api/v1/activate/<%= user.activation_token %>">Activate Account</a>

  const activateAccount = async () => {
    const data:any = {
      token: token
    }
    setLoading(true)
    try {
      // const response = 'hello'
      const response = await axios.post('https://fin-man.fly.dev/api/v1/activate', data);
      setSuccess(response)
      setTimeout(() => {
        // toast.success(response?.data?.message);
        setIsopen(true)
      }, 2000)

    } catch (error: any) {
      console.error('Error activating account:', error.message);
      setTimeout(() => {
        toast.error('Error activating account');
      }, 2000)
    } finally {
      setLoading(false);
      setTimeout(() => {
        logout()
      }, 3000)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      activateAccount();
    }, 1000)
  }, []);

  return (
    <div style={{ height: '89.3vh' }} className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Activating Account</h2>
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : null}
        <>
            <ToastContainer />
            <p className="text-gray-700 text-lg mb-4">
              Your account is being activated. Please wait while we process your request...
            </p>
            <p className="text-gray-700 text-lg mb-4">This may take a few moments.</p>
            <p className="text-gray-700 text-lg mb-4">
              Once your account is activated, you will be redirected to the login page.
            </p>
          </>
      </div>
      {isOpen ? <SuccessModal message={success?.data?.message} onClose={() => setIsopen(false)} isOpen={isOpen}/> : null}
    </div>
  );
};

export default ActivateAccount;

