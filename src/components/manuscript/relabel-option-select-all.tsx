import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

interface RelabelOptionsProps {
    showOptions: boolean;
    variables: Array<{ id: number; name: string; type: string }>;
    selectedVariables: Array<{ id: number; name: string; type: string }>;
    setSelectedVariables: React.Dispatch<React.SetStateAction<Array<{ id: number; name: string; type: string }>>>;
}

const RelabelOptions = ({ showOptions, variables, selectedVariables, setSelectedVariables }: RelabelOptionsProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedVariables(variables);
        } else {
            setSelectedVariables([]);
        }
    };

    const handleSelectVariable = (variable: { id: number; name: string; type: string }) => {
        if (selectedVariables.some((selectedVariable) => selectedVariable.id === variable.id)) {
            setSelectedVariables(selectedVariables.filter((selectedVariable) => selectedVariable.id !== variable.id));
        } else {
            setSelectedVariables([...selectedVariables, variable]);
        }
    };

    const allSelected = variables.length > 0 && selectedVariables.length === variables.length;

    const filteredVariables = variables.filter(variable =>
        variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.id.toString().includes(searchQuery)
    );

    return (
        <div>
            <div className='relative w-full mb-5'>
                <input
                    type="text"
                    className='bg-[#F8FAFC] border text-sm border-[#CBD5E1] rounded-lg pl-10 pr-3 py-2 shadow-md outline-none w-full'
                    placeholder='Search by name, id, or keyword'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <BiSearch color='#475569' className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475569]' />
            </div>

            <div className='flex flex-col'>
                <div className='flex items-center gap-3 font-semibold text-sm'>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleSelectAll}
                    />
                    <div className='flex-1 text-left text-[#475569]'>Variable Name</div>
                    <div className='text-right text-[#475569]'>Variable Type</div>
                </div>

                {filteredVariables.map((variable) => (
                    <div key={variable.id} className='flex items-center gap-3 mt-5'>
                        <input
                            type="checkbox"
                            checked={selectedVariables.some((selectedVariable) => selectedVariable.id === variable.id)}
                            onChange={() => handleSelectVariable(variable)}
                        />
                        <div className='flex-1 text-sm font-normal text-[#64748B]'>{variable.name}</div>
                        <div className='text-sm font-normal text-[#64748B] text-right'>{variable.type}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RelabelOptions;