import React, { useState } from 'react';
import { GoInfo } from 'react-icons/go';
import ConfirmationModal from './confirmation-modal';

type RespecifyDatasetProps = {
  variables: Array<{ id: number; name: string }>;
};

const DeleteVariable: React.FC<RespecifyDatasetProps> = ({ variables }) => {
  const [selectedVariable, setSelectedVariable] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'warning'>('warning');

  const handleChangeVariable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariable(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalType('warning');
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    setModalType('success');
    setShowModal(true);
    console.log('Variable deleted:', selectedVariable);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className='flex text-sm font-medium items-center gap-3 my-3'>
        <div className='text-[#94A3B8]'>Sample description</div>
        <div className='text-[#03CDAA] flex items-center gap-1'>
          <GoInfo />
          <span className='underline'>Learn More</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='text-sm font-medium text-[#1E293B]'>Select Variable to Delete</div>
        <select
          className='border w-full font-normal border-gray-300 rounded-lg p-3 text-sm shadow-md outline-none text-[#1E293B]'
          value={selectedVariable}
          onChange={handleChangeVariable}
        >
          <option value=''>Select Variable</option>
          {variables.map((variable) => (
            <option key={variable.id} value={variable.name}>
              {variable.name}
            </option>
          ))}
        </select>

        <div className='flex gap-3 mt-10 justify-end border-t-2 border-[#E2E8F0] py-5'>
          <button
            className='bg-[#E3FFFA] text-[#03CDAA] text-sm font-bold px-5 py-3 rounded-lg'
            type='button'
            onClick={() => setSelectedVariable('')}
          >
            Cancel
          </button>
          <button
            className='bg-[#03CDAA] text-white font-bold text-sm px-5 py-3 rounded-lg'
            type='submit'
          >
            Delete Variable
          </button>
        </div>
      </form>

      {showModal && (
        <ConfirmationModal
          iconType={modalType}
          title={modalType === 'success' ? 'Success' : 'Attention'}
          message={
            modalType === 'success'
              ? 'The variable has been successfully deleted.'
              : `Are you sure you want to delete the variable "${selectedVariable}"?`
          }
          onClose={handleCloseModal}
          onConfirm={modalType === 'warning' ? handleConfirmDelete : undefined}
        />
      )}
    </div>
  );
};

export default DeleteVariable;
