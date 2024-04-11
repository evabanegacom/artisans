import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../constants/Loader';
import SuccessModal from '../components/success-modal';
import { logout } from '../constants';
import AuthService from '../services/auth-service';

const ActivateAccount = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const activateAccount = async () => {
    setLoading(true);
    try {
      const response = await AuthService.activateAccount(token as string);
      // Assuming the response structure correctly includes a data object with a message property.
      if (response && response.data && response.data.message) {
        setSuccessMessage(response.data.message);
        setIsOpen(true); // Open the success modal only on successful response
        toast.success(response.data.message);
      } else {
        // Log and toast a generic success message if the expected message is not found in the response
        console.warn('Activation successful, but the response format is unexpected:', response);
        toast.success("Your account has been activated.");
      }
    } catch (error: any) {
      // Improved error handling: Log the entire error object for debugging purposes
      console.error('Error activating account:', error);
      // Displaying a more specific or generic error message based on the error object structure
      const errorMessage = error.response?.data?.error || error.message || "An error occurred while activating your account.";
      toast.error(errorMessage);
      setIsOpen(false); // Ensure the modal does not open on error
    } finally {
      setLoading(false);
      setTimeout(() => {
        logout();
      }, 3000);
    }
  };

  useEffect(() => {
    activateAccount();
  }, [token]);

  return (
    <div style={{ height: '89.3vh' }} className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Activating Account</h2>
        {loading && (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!loading && (
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
        )}
      </div>
      {isOpen && <SuccessModal message={successMessage} onClose={() => setIsOpen(false)} isOpen={isOpen} />}
    </div>
  );
};

export default ActivateAccount;
