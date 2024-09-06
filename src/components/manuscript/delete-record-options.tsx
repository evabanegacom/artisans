import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

interface DeleteRecordOptionsProps {
    variables: Array<{ id: number; name: string; type: string }>;
    setShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRowVariable: string | null;
    setSelectedRowVariable: React.Dispatch<React.SetStateAction<string | null>>;
    selectedColumnVariable: string | null;
    deleteOption: 'rows' | 'columns' | 'both';
    setSelectedColumnVariable: React.Dispatch<React.SetStateAction<string | null>>;
    setConditions: React.Dispatch<React.SetStateAction<{ variable: string | null; value: string }[]>>;
    conditions: { variable: string | null; value: string }[];
}

const DeleteRecordOptions = ({
    setShowOptions,
    deleteOption,
    variables,
    selectedRowVariable,
    setSelectedRowVariable,
    selectedColumnVariable,
    setSelectedColumnVariable,
    setConditions,
    conditions,
}: DeleteRecordOptionsProps) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSelectVariable = (variable: { id: number; name: string; type: string }) => {
        if (deleteOption === 'rows') {
            setSelectedRowVariable(variable.name);
            setConditions([...conditions, { variable: variable.name, value: '' }]);
        } else if (deleteOption === 'columns') {
            setSelectedColumnVariable(variable.name);
            setConditions([...conditions, { variable: variable.name, value: '' }]);
        }
        setShowOptions(false); // Close the dropdown
    };

    const filteredVariables = variables.filter(variable =>
        variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.id.toString().includes(searchQuery)
    );

    return (
        <div style={{width: '88%', top: '280px'}} className='px-3 absolute bg-white rounded-lg z-10 mx-auto shadow-lg py-5'>
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

            <div className='flex flex-col px-2 max-h-60 overflow-y-auto'>
                <div className='flex bg-[#F8FAFC] items-center gap-3 font-semibold text-sm p-2'>
                    <div className='flex-1 text-left text-[#475569]'>Variable Name</div>
                    <div className='text-right text-[#475569]'>Variable Type</div>
                </div>

                {filteredVariables.map((variable, index) => (
                    <div
                        key={variable.id}
                        onClick={() => handleSelectVariable(variable)}
                        className={`flex items-center gap-3 p-2 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
                    >
                        <input
                            type="radio"
                            name={deleteOption === 'rows' ? 'rowVariable' : 'columnVariable'}
                            checked={
                                (deleteOption === 'rows' && selectedRowVariable === variable.name) ||
                                (deleteOption === 'columns' && selectedColumnVariable === variable.name)
                            }
                            onChange={(e) => {
                                e.stopPropagation();
                                handleSelectVariable(variable);
                            }}
                        />
                        <div className='flex-1 text-sm font-normal text-[#64748B]'>{variable.name}</div>
                        <div className='text-sm font-normal text-[#64748B] text-left w-20'>{variable.type}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteRecordOptions;
