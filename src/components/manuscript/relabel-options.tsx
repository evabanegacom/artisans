import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

interface RelabelOptionsProps {
    showOptions: boolean;
    variables: Array<{ id: number; name: string; type: string }>;
    selectedVariable: { id: number; name: string; type: string } | null;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedVariable: React.Dispatch<React.SetStateAction<{ id: number; name: string; type: string } | null>>;
}

const RelabelOptions = ({ setShowOptions, variables, selectedVariable, setSelectedVariable }: RelabelOptionsProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectVariable = (variable: { id: number; name: string; type: string }) => {
        if (selectedVariable?.id === variable.id) {
            setSelectedVariable(null);
        } else {
            setSelectedVariable(variable);
            setShowOptions(false);
        }
    };

    const filteredVariables = variables.filter(variable =>
        variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.id.toString().includes(searchQuery)
    );

    return (
        <div className='absolute top-20 w-full bg-white rounded-lg z-10'>
            <div className='relative w-full mb-5'>
                <input
                    type="text"
                    className='bg-[#F8FAFC] border text-sm border-[#CBD5E1] rounded-lg pl-10 pr-3 py-2 shadow-md outline-none w-full'
                    placeholder='Search Variable'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <BiSearch color='#475569' className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475569]' />
            </div>

            <div className='flex flex-col px-2'>
                <div className='flex bg-[#F8FAFC] items-center gap-3 font-semibold text-sm p-2'>
                    <div className='flex-1 text-left text-[#475569]'>Variable Name</div>
                    <div className='text-right text-[#475569]'>Variable Type</div>
                </div>

                {filteredVariables.map((variable, index) => (
                    <div
                        key={variable.id}
                        onClick={() => handleSelectVariable(variable)}
                        className={`flex items-center gap-3 p-2 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={selectedVariable?.id === variable.id}
                            // onChange={() => handleSelectVariable(variable)}
                            onChange={(e) => { e.stopPropagation(); handleSelectVariable(variable); }} // Prevent double firing

                        />
                        <div className='flex-1 text-sm font-normal text-[#64748B]'>{variable.name}</div>
                        <div className='text-sm font-normal text-[#64748B] text-left w-20'>{variable.type}</div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default RelabelOptions;
