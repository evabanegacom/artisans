import React, { useState } from 'react';
import AIoptionsDropdown from '../AIoptions-dropdown';
import { LiaTimesSolid } from "react-icons/lia";

interface AIToolkitModalProps {
  activeForm: string;
  openModal: boolean;
  setActiveForm: (value: string) => void;
  setOpenModal: (open: boolean) => void;
  closeModal: () => void;
}

const AIToolkitModal = ({ activeForm, closeModal, openModal, setActiveForm }: AIToolkitModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
    
    if (!openModal) {
      return null;
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        {/* Modal Content */}
       

        <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg relative">
  {/* Modal Header */}
  <div className="flex justify-between items-center mb-4">
    {/* Active Form Title */}
    <div className="text-lg font-medium text-left text-[#1E293B]">
      {activeForm}
    </div>

    {/* Right section with Switch Tool and Close Icon */}
    <div className="flex items-center space-x-4 ml-auto">
      {/* Switch Tool Button */}
      <button
        className="border border-[#CBD5E1] text-[#64748B] py-2 px-4 rounded-md font-medium text-sm flex items-center"
        onClick={toggleDropdown}
      >
        Switch tool
        <span className="ml-2 transform transition-transform">
        {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Close Icon */}
      <button
        onClick={closeModal}
        className="text-[#64748B] hover:text-gray-700 text-sm focus:outline-none"
      >
        <LiaTimesSolid size={20} cursor='pointer' />

      </button>
    </div>
  </div>

  {/* Dropdown */}
  {isOpen && <AIoptionsDropdown setIsOpen={setIsOpen} setActiveForm={setActiveForm} activeForm={activeForm} />}

  {/* Modal Body */}
  <div className="mb-4">
    {activeForm === 'AI Journal Suggester' && <div>Journal Suggester</div>}
    {activeForm === 'AI Collaboration Connector' && <div>Collaboration Connector</div>}
    {activeForm === 'AI Research Question Generator' && <div>Research Question Generator</div>}
    {activeForm === 'AI Research Proposal Builder' && <div>Research Proposal Builder</div>}
    {activeForm === 'AI Journal Cover Letter Writer' && <div>Cover Letter Writer</div>}
    {activeForm === 'AI Consent Form Generator' && <div>Consent Form Generator</div>}
  </div>

  {/* Modal Footer */}
  <div className="flex justify-end space-x-2">
    <button
      onClick={closeModal}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none"
    >
      Close
    </button>
  </div>
</div>

      </div>
    );
};

export default AIToolkitModal;
