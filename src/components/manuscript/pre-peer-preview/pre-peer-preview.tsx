import React, { useState } from 'react'
import { AiOutlineArrowRight } from 'react-icons/ai'

const PrePeerPreview = () => {
    const highlights = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam, si coactum est'
    const [ enterHighlight, setEnterHighlight ] = useState(highlights)
    const manuscriptHighlights = [
        'Abstract',
        'Introduction',
        'Materials and Methods',
        'Results',
        'Discussion',
        'Conclusion',
        'References',
        'Tables',
        'Figures',
        'Supplementary Data',
        'Acknowledgements',
        'Conflict of Interest',
        'Author Contributions',
        'Funding',
        'Ethical Approval',
        'Data Availability',
        'Peer Review History',
        'Author Information',
        'Keywords',
        'Abbreviations',
        'Supporting Information',
        'Article Information',
        'Article Metrics',
        'Related Articles',
        'Metrics',
        'Comments',
        'Citations',
        'Keywords',
        'Abbreviations',
        'Supporting Information',
        ]
  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
             <h2 className="text-xl font-medium mb-4 text-[#1E293B]">Pre-PeerReview</h2>
             <p className="text-[#334155] text-xs">
             Please, select the sections of the manuscript you wish to generate review comments for proofreading
             </p>
       <select
        className="w-90 mt-1 border border-[#E2E8F0] text-[#1E293B] rounded-md text-xs px-3 py-2 focus:outline-none"
        onChange={(e) => setEnterHighlight(e.target.value)}
        >
        {manuscriptHighlights.map((highlight, index) => (
            <option key={index} value={highlight}>
                {highlight}
            </option>
        ))}
        </select>



<div className="flex justify-end mt-5 pt-4 border-t border-[#E2E8F0]">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Generate Review Comments
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  )
}

export default PrePeerPreview