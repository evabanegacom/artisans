import React, { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface CreateSectionProps {
    setIsAddingSection: (value: boolean) => void;
}

const CreateSection = ({ setIsAddingSection }:CreateSectionProps) => {
    const section = 'Theoretical Framework'
    const [ enterSection, setEnterSection ] = useState(section)
  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
             <h2 className="text-xl font-medium mb-4 text-[#1E293B]">Create Section</h2>
             <p className="text-[#334155] text-xs">Please, enter the name of the section you want to create</p>
       <input
         value={enterSection}
         onChange={(e) => setEnterSection(e.target.value)}
         className="w-full p-2 text-[#475569] text-xs border border-gray-300 rounded-md focus:outline-none"
         />

<div className="flex justify-end mt-5 pt-4 border-t border-[#E2E8F0]">
        <button 
            onClick={() => setIsAddingSection(false)}
        className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Create Section
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}

export default CreateSection