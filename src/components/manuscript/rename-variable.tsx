import React, { useState } from 'react';
import { GoInfo } from "react-icons/go";

type RenameVariableProps = {
    initialVariableName: string;
};

const RenameVariable: React.FC<RenameVariableProps> = ({ initialVariableName }) => {
    const [variableName, setVariableName] = useState(initialVariableName);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVariableName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Variable renamed to:', variableName);
    };

    const handleCancel = () => {
        setVariableName(initialVariableName);
    };

    return (
        <div className='m-10'>
            <div className='flex text-sm font-medium items-center gap-3 my-3'>
                <div className='text-[#94A3B8]'>Sample description</div>
                <div className='text-[#03CDAA] flex items-center gap-1'><GoInfo /><span className='underline'>Learn More</span></div>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className='border w-full border-gray-300 rounded-lg p-3 shadow-md outline-none'
                    value={variableName} 
                    onChange={handleInputChange} 
                />
                <div className='flex gap-3 mt-10 justify-end border-t-2 border-[#E2E8F0] py-5'>
                    <button 
                        className='bg-[#E3FFFA] text-[#03CDAA] text-sm font-bold px-5 py-3 rounded-lg' 
                        type="button" 
                        onClick={handleCancel}
                        disabled={variableName === initialVariableName} // Disable if unchanged
                    >
                        Cancel
                    </button>
                    <button 
                        className='bg-[#03CDAA] text-white font-bold text-sm px-5 py-3 rounded-lg' 
                        type="submit"
                        disabled={variableName === initialVariableName}
                    >
                        Rename
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RenameVariable;
