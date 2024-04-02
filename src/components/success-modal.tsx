
interface Props {
    message: any;
    onClose: () => void
    isOpen: boolean;
}

const SuccessModal = ({ message, onClose, isOpen }:Props) => {
     console.log({message})
    if (!isOpen) return null

    return (
    <div className="modal-overlay">
        <div className="modal-content-body">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
        <div className="relative w-80 md:w-96 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center justify-center p-6">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h2 className="mt-4 text-lg font-semibold text-gray-800">Account activated successfully</h2>
          </div>
          <div className="flex justify-end px-6 py-4 bg-gray-100 rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  };

export default SuccessModal