import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import DeleteRecordOptions from './delete-record-options';
import ConditionForm from './delete-conditions';

interface DeleteRecordsProps {
    variables: Array<{ id: number; name: string; type: string }>;
}

const DeleteRecords = ({ variables }: DeleteRecordsProps) => {
    const [deleteOption, setDeleteOption] = useState<'rows' | 'columns' | 'both'>('rows');
    const [showRowOptions, setShowRowOptions] = useState(false);
    const [showColumnOptions, setShowColumnOptions] = useState(false);
    const [selectedRowVariable, setSelectedRowVariable] = useState<string | null>(null);
    const [selectedColumnVariable, setSelectedColumnVariable] = useState<string | null>(null);
    const [rowConditions, setRowConditions] = useState<{ variable: string | null; value: string }[]>([]);
    const [columnConditions, setColumnConditions] = useState<{ variable: string | null; value: string }[]>([]);

    const handleDeleteOptionChange = (value: string) => {
        setDeleteOption(value as 'rows' | 'columns' | 'both');
        setRowConditions([]);
        setColumnConditions([]);
    };

    const handleAddMoreRowConditions = () => {
        setRowConditions([...rowConditions, { variable: selectedRowVariable, value: '' }]);
    };

    const handleAddMoreColumnConditions = () => {
        setColumnConditions([...columnConditions, { variable: selectedColumnVariable, value: '' }]);
    };

    const handleRowConditionChange = (index: number, value: string) => {
        const updatedConditions = rowConditions.map((condition, i) =>
            i === index ? { ...condition, value } : condition
        );
        setRowConditions(updatedConditions);
    };

    const handleColumnConditionChange = (index: number, value: string) => {
        const updatedConditions = columnConditions.map((condition, i) =>
            i === index ? { ...condition, value } : condition
        );
        setColumnConditions(updatedConditions);
    };

    const handleRemoveRowCondition = (index: number) => {
        const updatedConditions = rowConditions.filter((_, i) => i !== index);
        setRowConditions(updatedConditions);
    };

    const handleRemoveColumnCondition = (index: number) => {
        const updatedConditions = columnConditions.filter((_, i) => i !== index);
        setColumnConditions(updatedConditions);
    };

    const handleDeleteRecords = () => {
        console.log('Selected Rows:', selectedRowVariable);
        console.log('Selected Columns:', selectedColumnVariable);
        console.log('Row Conditions:', rowConditions);
        console.log('Column Conditions:', columnConditions);
        
        alert('Delete logic executed');
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg relative p-8">
            <h2 className="text-lg font-bold mb-4">Delete Records</h2>

            <p className="text-sm mb-3 text-[#94A3B8] font-normal">Choose what you want to delete</p>

            <div className="space-y-2 mb-6">
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        name="deleteOption"
                        value="rows"
                        checked={deleteOption === 'rows'}
                        onChange={() => handleDeleteOptionChange('rows')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-[#475569] text-sm font-semibold">Delete specific rows only</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        name="deleteOption"
                        value="columns"
                        checked={deleteOption === 'columns'}
                        onChange={() => handleDeleteOptionChange('columns')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-[#475569] text-sm font-semibold">
                        Delete specific columns only
                    </span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        name="deleteOption"
                        value="both"
                        checked={deleteOption === 'both'}
                        onChange={() => handleDeleteOptionChange('both')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-[#475569] text-sm font-semibold">
                        Delete specific rows and columns
                    </span>
                </label>
            </div>

            {(deleteOption === 'rows' || deleteOption === 'both') && (
                <>
                    <div className='text-[#1E293B] text-sm font-medium'>Select the variables that define rows to be selected</div>
                    <button
                        onClick={() => setShowRowOptions(!showRowOptions)}
                        className='border mt-2 w-full border-gray-300 rounded-lg p-2 shadow-md flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            {selectedRowVariable ? (
                                <div className='text-sm text-[#475569] p-2 rounded-lg font-medium bg-[#F1F5F9] flex items-center'>
                                    <span className=''>{selectedRowVariable}</span>
                                    <FaTimes
                                        size={12}
                                        className='cursor-pointer'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedRowVariable(null);
                                            setRowConditions([]);
                                        }}
                                    />
                                </div>
                            ) : (
                                <span className='text-sm text-[#64748B] font-normal'>Select Row Variable</span>
                            )}
                        </div>
                        {showRowOptions ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
                    </button>

                    {showRowOptions && (
                        <DeleteRecordOptions
                            variables={variables}
                            selectedColumnVariable={selectedColumnVariable}
                            setSelectedRowVariable={setSelectedRowVariable}
                            setSelectedColumnVariable={setSelectedColumnVariable}
                            selectedRowVariable={selectedRowVariable}
                            deleteOption="rows"
                            setShowOptions={setShowRowOptions}
                            setConditions={setRowConditions}
                            conditions={rowConditions}
                        />
                    )}

                    {selectedRowVariable && (
                        <ConditionForm
                            conditions={rowConditions}
                            handleConditionChange={handleRowConditionChange}
                            handleRemoveCondition={handleRemoveRowCondition}
                            handleAddMoreConditions={handleAddMoreRowConditions} // Row-specific
                        />
                    )}
                </>
            )}

            {(deleteOption === 'columns' || deleteOption === 'both') && (
                <>
                    <div className='text-[#1E293B] text-sm font-medium mt-5'>Select the variables that define columns to be selected</div>
                    <button
                        onClick={() => setShowColumnOptions(!showColumnOptions)}
                        className='border w-full mt-2 border-gray-300 rounded-lg p-2 shadow-md flex items-center justify-between mb-4'>
                        <div className='flex items-center gap-2'>
                            {selectedColumnVariable ? (
                                <div className='text-sm text-[#475569] p-2 rounded-lg font-medium bg-[#F1F5F9] flex items-center'>
                                    <span className=''>{selectedColumnVariable}</span>
                                    <FaTimes
                                        size={12}
                                        className='cursor-pointer'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedColumnVariable(null);
                                            setColumnConditions([]);
                                        }}
                                    />
                                </div>
                            ) : (
                                <span className='text-sm text-[#64748B] font-normal'>Select Column Variable</span>
                            )}
                        </div>
                        {showColumnOptions ? <MdKeyboardArrowUp size={20} /> : <MdKeyboardArrowDown size={20} />}
                    </button>

                    {showColumnOptions && (
                        <DeleteRecordOptions
                            variables={variables}
                            selectedColumnVariable={selectedColumnVariable}
                            setSelectedRowVariable={setSelectedRowVariable}
                            setSelectedColumnVariable={setSelectedColumnVariable}
                            selectedRowVariable={selectedRowVariable}
                            deleteOption="columns"
                            setShowOptions={setShowColumnOptions}
                            setConditions={setColumnConditions}
                            conditions={columnConditions}
                        />
                    )}

                    {selectedColumnVariable && (
                        <ConditionForm
                            conditions={columnConditions}
                            handleConditionChange={handleColumnConditionChange}
                            handleRemoveCondition={handleRemoveColumnCondition}
                            handleAddMoreConditions={handleAddMoreColumnConditions} // Column-specific
                        />
                    )}
                </>
            )}

            <div className="flex justify-end space-x-3 mt-4">
                <button
                    className="py-2 px-4 text-sm font-bold bg-[#FFF1F2] text-[#F43F5E] rounded-md hover:bg-gray-300"
                    onClick={() => console.log('Cancel')}
                >
                    Cancel
                </button>
                <button
                    className="py-2 px-4 bg-[#f43f5e] text-white text-sm rounded-md hover:bg-red-700"
                    onClick={handleDeleteRecords}
                >
                    Delete Record
                </button>
            </div>
        </div>
    );
};

export default DeleteRecords;

