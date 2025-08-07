import React, { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface GenerateTitleProps {
  title: string;
}

const GenerateTitle = ({ title }: GenerateTitleProps) => {
    const highlights = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est'
    const [ enterHighlight, setEnterHighlight ] = useState(highlights)
  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
             <h2 className="text-xl font-medium mb-4 text-[#1E293B]">Generate {title}</h2>
             <p className="text-[#334155] text-xs">Please, enter the working {title} you wish to refine</p>
       <input
         value={enterHighlight}
         onChange={(e) => setEnterHighlight(e.target.value)}
         className="w-full p-2 text-[#475569] text-xs border border-gray-300 rounded-md focus:outline-none"
         />

<div className="flex justify-end mt-5 pt-4 border-t border-[#E2E8F0]">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Generate {title}
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}

export default GenerateTitle