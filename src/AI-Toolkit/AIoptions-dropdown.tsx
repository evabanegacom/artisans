import React from 'react';
import options from './ai-options-data';

interface AIoptionsDropdownProps {
  setActiveForm: (modal: string) => void;
  activeForm: string;
  setIsOpen: (value: boolean) => void;
}

const AIoptionsDropdown = ({ setActiveForm, activeForm, setIsOpen }: AIoptionsDropdownProps) => {
  return (
    <div className="absolute top-14 right-0 mt-2 w-max bg-white border border-[#CBD5E1] rounded-lg shadow-md z-10">
      <ul className="py-2">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              setActiveForm(option.title);
              setIsOpen(false);
            }}
            className={`px-4 py-2 flex items-center space-x-2 hover:bg-[#F1F5F9] text-[#475569] cursor-pointer font-normal text-base ${
              option.title === activeForm ? 'bg-green-100 text-green-600' : ''
            }`}
          >
            {/* Circle Icon */}
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                option.title === activeForm ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
              }`}
            >
              {option.title === activeForm && (
                <span className="text-white">&#10003;</span> /* Checkmark */
              )}
            </div>
            <span>{option?.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIoptionsDropdown;
