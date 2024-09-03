import React, { useState } from 'react';
import { GoInfo } from 'react-icons/go';

type RespecifyDatasetProps = {
  variables: Array<{ id: number; name: string }>;
};

const RespecifyVariable: React.FC<RespecifyDatasetProps> = ({ variables }) => {
  const [selectedVariable, setSelectedVariable] = useState('');
  const [selectedVariableType, setSelectedVariableType] = useState('');

  const variableType = ['Numeric', 'String', 'Categorical', 'Date', 'Other'];

  const handleChangeVariable = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariable(e.target.value);
  };

  const handleChangeVariableType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVariableType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Variable:', selectedVariable);
    console.log('Variable Type:', selectedVariableType);
  };

  // Handle form cancellation
  const handleCancel = () => {
    // Reset the form to initial values
    setSelectedVariable(variables[0]?.name || '');
    setSelectedVariableType('Numeric');
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
        <div className='text-sm font-medium text-[#1E293B]'>Select Variable to Respecify</div>
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

        {selectedVariable && 
        <>
        <div className='mt-5 text-sm font-medium text-[#1E293B]'>Choose the type of variable</div>
        <select
          className='border w-full border-gray-300 rounded-lg p-3 text-sm font-normal shadow-md outline-none text-[#1E293B]'
          value={selectedVariableType}
          onChange={handleChangeVariableType}
        >
          <option value=''>Select</option>
          {variableType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        </>}

        <div className='flex gap-3 mt-10 justify-end border-t-2 border-[#E2E8F0] py-5'>
          <button
            className='bg-[#E3FFFA] text-[#03CDAA] text-sm font-bold px-5 py-3 rounded-lg'
            type='button'
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className='bg-[#03CDAA] text-white font-bold text-sm px-5 py-3 rounded-lg'
            type='submit'
          >
            Rename
          </button>
        </div>
      </form>
    </div>
  );
};

export default RespecifyVariable;
