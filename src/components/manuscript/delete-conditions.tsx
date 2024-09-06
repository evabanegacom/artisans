import React from 'react';
import { BiTrash } from 'react-icons/bi';

interface ConditionFormProps {
    conditions: { variable: string | null; value: string }[];
    handleConditionChange: (index: number, value: string) => void;
    handleRemoveCondition: (index: number) => void;
    handleAddMoreConditions: () => void; // Added prop
}

const ConditionForm: React.FC<ConditionFormProps> = ({
    conditions,
    handleConditionChange,
    handleRemoveCondition,
    handleAddMoreConditions,
}) => {
    return (
        <div className="space-y-4">
            {conditions.map((condition, index) => (
                <div key={index} className='flex gap-3 items-center'>
                    <div>if</div>
                    <div>{condition.variable}</div>
                    <div>is</div>
                   <select
                        value={condition.value}
                        onChange={(e) => handleConditionChange(index, e.target.value)}
                        className='border border-gray-300 rounded-md p-1'
                   >
                        <option value="equals">Equals</option>
                        <option value="not-equals">Not Equals</option>
                        <option value="contains">Contains</option>
                        <option value="not-contains">Not Contains</option>
                    </select>
                    <BiTrash
                        size={20}
                        className='cursor-pointer'
                        onClick={() => handleRemoveCondition(index)}
                    />                    
                </div>
            ))}

            {/* Add More Conditions Button */}
            <button
                onClick={handleAddMoreConditions}
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Add More Conditions
            </button>
        </div>
    );
};

export default ConditionForm;
