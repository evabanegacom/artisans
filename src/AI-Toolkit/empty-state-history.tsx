import React, { useState } from 'react';
import options from './ai-options-data';

interface EmptyStateHistoryProps {
  toggleModalViews: (modal: string) => void;
}
const EmptyStateHistory = ({ toggleModalViews }:EmptyStateHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <button
          className="bg-[#03CDAA] text-white py-2 px-4 rounded-md shadow-md text-sm flex items-center"
          onClick={toggleDropdown}
        >
          Get Started Now
          <span className="ml-2 transform transition-transform">
            {isOpen ? '▲' : '▼'}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-2 w-max bg-white border border-[#CBD5E1] rounded-lg shadow-md">
          <ul className="py-2">
            {options.map((option, index) => (
              <li
                onClick={() => toggleModalViews(option?.title)}
                key={index}
                className="px-4 py-2 hover:bg-[#F1F5F9] text-[#475569] cursor-pointer font-normal text-base"
              >
                {option?.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmptyStateHistory;
