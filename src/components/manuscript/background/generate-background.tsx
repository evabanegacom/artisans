import React, { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { GoTrash } from "react-icons/go";
import { GoPlus } from "react-icons/go";

interface Highlight {
  id: number;
  text: string;
}

const GenerateBackground: React.FC = () => {
  const [highlights, setHighlights] = useState<Highlight[]>([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' },
  ]);

  const addHighlight = () => {
    const newHighlight: Highlight = {
      id: highlights.length + 1,
      text: '',
    };
    setHighlights([...highlights, newHighlight]);
  };

  const removeHighlight = (id: number) => {
    setHighlights(highlights.filter((highlight) => highlight.id !== id));
  };

  const updateHighlight = (id: number, newText: string) => {
    const updatedHighlights = highlights.map((highlight) =>
      highlight.id === id ? { ...highlight, text: newText } : highlight
    );
    setHighlights(updatedHighlights);
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-medium mb-4 text-[#1E293B]">Generate Background</h2>
      <p className="text-[#334155] text-xs">Review your current aims, and edit or add new ones to generate the background</p>
      {highlights.map((highlight) => (
        <div key={highlight.id} className="flex items-center mb-2">
          <input
            type="text"
            value={highlight.text}
            onChange={(e) => updateHighlight(highlight.id, e.target.value)}
            className="flex-1 p-2 text-[#94A3B8] text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="ml-2 text-[#E11D48] hover:text-red-700"
            onClick={() => removeHighlight(highlight.id)}
          >
            <GoTrash />
          </button>
        </div>
      ))}
      <button
        className="text-[#03CDAA] text-sm hover:underline mb-4 flex items-center gap-2"
        onClick={addHighlight}
      >
        <GoPlus size={20}/> <span>Add highlight from another study</span>
      </button>
      
      <div  className='border-b border-[#E2E8F0]'/>
      <div className="flex justify-end mt-4">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Generate what we know about this topic
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default GenerateBackground;
