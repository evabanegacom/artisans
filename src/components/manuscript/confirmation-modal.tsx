import React from 'react';
import { AiOutlineCheckCircle, AiOutlineInfoCircle } from 'react-icons/ai';

interface ConfirmationModalProps {
  iconType: 'success' | 'warning';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ iconType, title, message, onClose, onConfirm }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 shadow-lg w-full max-w-md'>
        <div className='flex items-center gap-3 mb-4 flex-col'>
          {iconType === 'success' ? (
            <AiOutlineCheckCircle size={24} color='#03CDAA' />
          ) : (
            <AiOutlineInfoCircle size={24} color='#F43F5E' />
          )}
          <h2 className={`text-lg font-semibold ${iconType === 'success' ? 'text-[#475569]' : 'text-[#F43F5E]'}`}>
            {title}
          </h2>
        </div>
        <p className='text-[#475569] mb-5 text-center'>{message}</p>
        <div className='flex justify-center gap-3 border-t border-gray-200 pt-5'>
          <button
            // className='bg-[#FFF1F2] text-[#F43F5E] text-sm font-bold px-5 py-2 rounded-lg'
            className={`bg-${iconType==='success' ? '[#F1FFFC]' : '[#FFF1F2]'} text-${iconType === 'success' ? '[#03CDAA]' : '[#F43F5E]'} text-sm font-bold px-5 py-2 rounded-lg`}
            onClick={onClose}
          >
            {iconType === 'success' ? 'Close' : 'Cancel'}
          </button>
          {iconType === 'warning' && (
            <button
              className='bg-[#F43F5E] text-white font-bold text-sm px-5 py-2 rounded-lg'
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
