import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, phone: string) => void;
}

const BuyerInfoModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, phone);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay bg-gray-900 opacity-75 fixed inset-0 z-50 flex items-center justify-center">
      <div className="modal-content bg-white rounded-lg shadow-lg px-8 py-6 text-gray-700">
        <h2 className="text-lg font-medium mb-4">Enter your details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2 hover:bg-gray-400 transition duration-300">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerInfoModal;
