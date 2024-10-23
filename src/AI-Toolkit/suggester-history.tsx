import React, { useState } from 'react'
import EmptyStateHistory from './empty-state-history';

interface SuggesterHistoryProps {
  activeForm: string;
  setActiveForm: (value: string) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  toggleModalViews: (value: string) => void;
}

const SuggesterHistory = ({activeForm, setActiveForm, openModal, setOpenModal, toggleModalViews}: SuggesterHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className='grid sm:grid-cols-2 grid-cols-1 gap-2 justify-between'>
        <div className='text-[#475569] text-lg font-medium'>History</div>
        <div className='flex justify-end'>
          <div>
            <button
              className="bg-[#03CDAA] font-bold text-white py-2 px-4 rounded-md shadow-md text-sm flex items-center"
              onClick={toggleDropdown}
            >
              New journal suggestion
              <span className="ml-2 transform transition-transform">
                {isOpen ? '▲' : '▼'}
              </span>
            </button>
          </div>
        </div>
      </div>
      <EmptyStateHistory toggleModalViews={toggleModalViews}/>
    </div>
  )
}

export default SuggesterHistory