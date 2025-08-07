import React, { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

const AimsObjectives = () => {
    const highlights = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est'
    const [ enterHighlight, setEnterHighlight ] = useState(highlights)
  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
             <h2 className="text-xl font-medium mb-4 text-[#1E293B]">Generate Aims & Objectives</h2>
             <p className="text-[#334155] text-xs">Please, enter the research idea to create specific aims and objectives</p>
       <textarea
         value={enterHighlight}
         onChange={(e) => setEnterHighlight(e.target.value)}
         className="w-full h-40 p-2 text-[#475569] text-xs border border-gray-300 rounded-md focus:outline-none"
         />

<div className="flex justify-end mt-4">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Generate Aims & Objectives
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}

export default AimsObjectives