import React, { useState } from 'react';
import { GoInfo } from "react-icons/go";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import RelabelOptions from './relabel-options';

type RelabelProps = {
    variables: Array<{ id: number; name: string, type: string }>;
};

const Relabel: React.FC<RelabelProps> = ({ variables }) => {
    const [datasetName, setDatasetName] = useState(variables);
    const [ showOptions, setShowOptions ] = useState(false);
    const [selectedVariables, setSelectedVariables] = useState<Array<{ id: number; name: string; type: string }>>([]);
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setDatasetName(e.target.value);
    // };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Dataset renamed to:', datasetName);
    };

    const handleCancel = () => {
        setDatasetName(variables);
    };

    return (
        <div className='m-10'>
            <div className='flex text-sm font-medium items-center gap-3 my-3'>
                <div className='text-[#94A3B8]'>Sample description</div>
                <div className='text-[#03CDAA] flex items-center gap-1'><GoInfo /><span className='underline'>Learn More</span></div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='border w-full border-gray-300 rounded-lg p-3 shadow-md flex items-center justify-between'>
                    <div className='text-sm text-[#64748B] font-normal'>Select Variable</div>
                    {showOptions ? <MdKeyboardArrowDown onClick={() => setShowOptions(!showOptions)} size={20}/> : <MdKeyboardArrowUp onClick={() => setShowOptions(!showOptions)} size={20} />}
                </div>
                <div className='flex gap-3 mt-10 justify-end border-t-2 border-[#E2E8F0] py-5'>
                    <button 
                        className='bg-[#E3FFFA] text-[#03CDAA] text-sm font-bold px-5 py-3 rounded-lg' 
                        type="button" 
                        onClick={handleCancel}
                        disabled={datasetName === variables} // Disable if unchanged
                    >
                        Cancel
                    </button>
                    <button 
                        className='bg-[#03CDAA] text-white font-bold text-sm px-5 py-3 rounded-lg' 
                        type="submit"
                        disabled={datasetName === variables} // Disable if unchanged
                    >
                        Rename
                    </button>
                </div>
            </form>
            <RelabelOptions 
            showOptions={showOptions} 
            variables={variables}
            selectedVariables={selectedVariables}
            setSelectedVariables={setSelectedVariables}
            />
        </div>
    );
};

export default Relabel;
