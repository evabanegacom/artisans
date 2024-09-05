import React, { useState } from 'react';
import { GoInfo } from 'react-icons/go';
import { PiFunnel } from "react-icons/pi";
import { BiSearch } from "react-icons/bi";

type RespecifyDatasetMultipleProps = {
    variables: Array<{ id: number; name: string }>;
};

const RespecifyDatasetMultiple: React.FC<RespecifyDatasetMultipleProps> = ({ variables }) => {
    const variableType = ['Numeric', 'String', 'Categorical', 'Date', 'Other'];
    
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');  // State to track the search query

    const handleFilterClick = () => {
        setShowFilter(!showFilter);
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilter(e.target.value);
        // You can add logic here to filter the data based on the selected filter
    };

    // Filter the variables based on the search query (matching by name or id)
    const filteredVariables = variables.filter(variable =>
        variable.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        variable.id.toString().includes(searchQuery)
    );

    return (
        <div>
            <div className='flex text-sm font-medium items-center gap-3 my-3'>
                <div className='text-[#94A3B8]'>Sample description</div>
                <div className='text-[#03CDAA] flex items-center gap-1'>
                    <GoInfo />
                    <span className='underline'>Learn More</span>
                </div>
            </div>

            <div className='flex items-center gap-3 mb-5'>
                <div className='relative w-full'>
                    <input
                        type="text"
                        className='bg-[#F8FAFC] border text-sm border-[#CBD5E1] rounded-lg pl-10 pr-3 py-2 shadow-md outline-none w-full'
                        placeholder='Search by name, id, or keyword'
                        value={searchQuery}  // Bind input value to search query state
                        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query on input change
                    />
                    <BiSearch color='#475569' className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#475569]' />
                </div>
                <button
                    onClick={handleFilterClick}
                    className='py-2 px-3 border border-[#CBD5E1] rounded-lg bg-[#F8FAFC] flex items-center relative'>
                    <PiFunnel color='#475569' />
                </button>
            </div>

            {showFilter && (
                <div className='absolute right-0 bg-white border border-[#CBD5E1] rounded-lg shadow-md p-4 z-10'>
                    <div className='flex flex-col gap-2 bg-white'>
                        {variableType.map(type => (
                            <label key={type} className='flex items-center text-sm text-[#94A3B8]'>
                                <input
                                    type="radio"
                                    name="datatype"
                                    value={type}
                                    checked={selectedFilter === type}
                                    onChange={handleRadioChange}
                                    className='mr-2'
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div className='mx-auto rounded-lg border border-[#CBD5E1] text-sm py-3 h-64 overflow-y-auto'>
                <div className='grid grid-cols-2 gap-4 py-3 text-sm px-2 text-[#475569] border-b border-[#CBD5E1]'>
                    <div className='text-sm font-semibold'>Variable Name</div>
                    <div className='text-sm font-semibold'>Choose Variable Type</div>
                </div>

                {filteredVariables.length > 0 ? (
                    filteredVariables.map((variable, index) => (
                        <div
                            key={variable.id}
                            className={`grid grid-cols-2 gap-4 text-sm p-2 border-b border-[#CBD5E1] items-center ${index % 2 === 1 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
                        >
                            <div className='text-sm text-[#334155] font-medium'>{variable.name}</div>
                            <select
                                className='border text-sm border-[#CBD5E1] rounded-lg p-2 shadow-md outline-none w-full text-[#94A3B8]'
                            >
                                <option value=''>Select</option>
                                {variableType.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    ))
                ) : (
                    <div className='text-center text-sm text-[#64748B] py-5'>
                        No variables found
                    </div>
                )}
            </div>

            <div className='flex gap-3 mt-10 justify-end border-t-2 border-[#E2E8F0] py-5'>
                <button
                    className='bg-[#E3FFFA] text-[#03CDAA] text-sm font-bold px-5 py-3 rounded-lg'
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className='bg-[#03CDAA] text-white font-bold text-sm px-5 py-3 rounded-lg'
                    type="submit"
                >
                    Respecify
                </button>
            </div>
        </div>
    );
};

export default RespecifyDatasetMultiple;
