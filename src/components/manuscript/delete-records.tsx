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
    const [showOptions, setShowOptions] = useState(false);
    const [selectedRowVariable, setSelectedRowVariable] = useState<string | null>(null);
    const [selectedColumnVariable, setSelectedColumnVariable] = useState<string | null>(null);
    const [conditions, setConditions] = useState<{ variable: string | null; value: string }[]>([]);

    const handleDeleteOptionChange = (value: string) => {
        setDeleteOption(value as 'rows' | 'columns' | 'both');
        setConditions([]);
    };

    const handleAddMoreConditions = () => {
        setConditions([...conditions, { variable: selectedRowVariable || selectedColumnVariable, value: '' }]);
    };

    const handleConditionChange = (index: number, value: string) => {
        const updatedConditions = conditions.map((condition, i) =>
            i === index ? { ...condition, value } : condition
        );
        setConditions(updatedConditions);
    };

    const handleRemoveCondition = (index: number) => {
        const updatedConditions = conditions.filter((_, i) => i !== index);
        setConditions(updatedConditions);
    };

    const handleDeleteRecords = () => {
        console.log('Selected Rows:', selectedRowVariable);
        console.log('Selected Columns:', selectedColumnVariable);
        alert('Delete logic executed');
    };

    const toggleShowOptions = () => {
        setShowOptions(!showOptions);
        if (!showOptions) {
            setSelectedRowVariable(null);
            setSelectedColumnVariable(null);
        }
    };

    const isVariableSelected = deleteOption === 'rows' ? selectedRowVariable : selectedColumnVariable;
    const both = deleteOption === 'both';

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg relative">
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

            {deleteOption === 'rows' && <div>Select the variables that define rows to be selected</div>}
            {deleteOption === 'columns' && <div>Select the variables that define columns to be selected</div>}

            <button
                onClick={toggleShowOptions}
                className='border w-full border-gray-300 rounded-lg p-3 shadow-md flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {deleteOption === 'rows' && selectedRowVariable ? (
                        <div className='text-[#64748B] rounded-full flex items-center gap-2'>
                            <span className='text-sm text-[#64748B] font-normal'>{selectedRowVariable}</span>
                            <FaTimes
                                size={12}
                                className='cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedRowVariable(null);
                                }}
                            />
                        </div>
                    ) : deleteOption === 'columns' && selectedColumnVariable ? (
                        <div className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2'>
                            <span className='text-sm text-[#64748B] font-normal'>{selectedColumnVariable}</span>
                            <FaTimes
                                size={12}
                                className='cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedColumnVariable(null);
                                }}
                            />
                        </div>
                    ) : (
                        <span className='text-sm text-[#64748B] font-normal'>Select Variable</span>
                    )}
                </div>

                {showOptions ? (
                    <MdKeyboardArrowUp size={20} />
                ) : (
                    <MdKeyboardArrowDown size={20} />
                )}
            </button>

            {showOptions && (
                <DeleteRecordOptions
                    variables={variables}
                    selectedColumnVariable={selectedColumnVariable}
                    setSelectedRowVariable={setSelectedRowVariable}
                    setSelectedColumnVariable={setSelectedColumnVariable}
                    selectedRowVariable={selectedRowVariable}
                    deleteOption={deleteOption}
                    setShowOptions={setShowOptions}
                    setConditions={setConditions}
                    conditions={conditions}
                />
            )}

            {isVariableSelected && (
                <ConditionForm
                    conditions={conditions}
                    handleConditionChange={handleConditionChange}
                    handleRemoveCondition={handleRemoveCondition}
                    handleAddMoreConditions={handleAddMoreConditions} // Pass handler function
                />
            )}

            <div className="flex justify-end space-x-3">
                <button
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    onClick={() => alert('Cancelled')}
                >
                    Cancel
                </button>
                <button
                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleDeleteRecords}
                >
                    Delete Record
                </button>
            </div>
        </div>
    );
};

export default DeleteRecords;
