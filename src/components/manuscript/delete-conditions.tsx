import React from 'react';
import { BiTrash } from 'react-icons/bi';
import { GoPlus } from 'react-icons/go';

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
        <div className='border border-gray-200 rounded-lg text-sm p-3'>
        <div className='text-[#64748B] font-medium text-sm mb-2'>Define conditions for selected variable(s)</div>
        <div className="space-y-4">
            {conditions.map((condition, index) => (
                <div key={index} className='border-b border-gray-200 pb-2'>
                <div className='p-2 rounded-md flex items-center bg-[#F8FAFC] gap-3'>
                    <div className='text-[#334155] font-normal text-sm'>if</div>
                    <div className='bg-[#334155] p-2 text-white rounded-lg'>{condition.variable}</div>
                    <div className='text-[#334155] font-normal'>is</div>
                   <select
                        value={condition.value}
                        onChange={(e) => handleConditionChange(index, e.target.value)}
                        className='outline-none border border-gray-300 rounded-md p-1 text-[#334155] font-normal'
                   >
                        <option value="equals">Equals</option>
                        <option value="not-equals">Not Equals</option>
                        <option value="contains">Contains</option>
                        <option value="not-contains">Not Contains</option>
                    </select>
                    <input type='text' className='outline-none border border-gray-300 rounded-md w-10 p-1' />
                    <div className='bg-[#FFF1F2] p-2 rounded-md'>
                    <BiTrash
                        size={20}
                        className='cursor-pointer'
                        color='#F43F5E'
                        onClick={() => handleRemoveCondition(index)}
                    />
                    </div>                 
                </div>
                </div>
            ))}

            {conditions?.length >= 1 && <button
                onClick={handleAddMoreConditions}
                className="py-2 px-4 text-[#08A188] text-sm font-medium flex items-center gap-1"
            >
                <GoPlus size={20}/><span>Add More Conditions</span>
            </button>}
        </div>
        </div>
    );
};

export default ConditionForm;
