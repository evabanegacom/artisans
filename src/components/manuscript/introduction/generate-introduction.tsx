import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Icons for arrow toggle
import Accordion from "./accordion";

const GenerateIntroduction: React.FC = () => {
  const [skipAI, setSkipAI] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<{ title: string; selectedCheckboxes: string[] }[]>([]);
  const [selectedGaps, setSelectedGaps] = useState<{ title: string; selectedCheckboxes: string[] }[]>([]);
  const [isReasonsAccordionOpen, setIsReasonsAccordionOpen] = useState(false);
  const [isGapsAccordionOpen, setIsGapsAccordionOpen] = useState(false);

  const toggleReasonsAccordion = () => {
    setIsReasonsAccordionOpen((prev) => !prev);
    if (isGapsAccordionOpen) setIsGapsAccordionOpen(false);
  };

  const toggleGapsAccordion = () => {
    setIsGapsAccordionOpen((prev) => !prev);
    if (isReasonsAccordionOpen) setIsReasonsAccordionOpen(false);
  };

  // Helper function to display the section title and count of selected checkboxes
  const renderSelectedSection = (selectedItems: { title: string; selectedCheckboxes: string[] }[]) => {
    return selectedItems.map((item) => (
      <div key={item.title} className="bg-[#F1F5F9] p-1 rounded-md flex gap-2 items-center">
        <span className="text-[#475569] text-xs">{item.title}</span>
        <span className="bg-[#03CDAA] w-5 h-5 flex items-center justify-center rounded-full text-white text-xs font-semibold">
          {item.selectedCheckboxes.length}
        </span>
      </div>
    ));
  };

  return (
    <div className="flex flex-col w-full max-w-lg p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl text-[#1E293B] font-semibold mb-2">Generate Introduction</h2>
      <p className="text-sm mb-4 text-[#94A3B8] font-medium">
        Select one-click AI generation or fill in the fields below for more customized AI content generation.
      </p>

      {/* Skip AI and Autogenerate */}
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setSkipAI(!skipAI)}
          className={`bg-[#FFF0F7] p-2 rounded-md flex items-center gap-2 font-medium ${skipAI ? "underline" : ""}`}
        >
          <span className="bg-gradient-to-r from-[#9A00FF] via-[#CF03B7] to-[#F8057F] bg-clip-text text-transparent">
            ✍️ Skip manual input & Autogenerate with AI
          </span>
        </button>
      </div>

      <p className="text-center text-sm mb-6 text-[#475569]">
        This would skip manual input and let AI draft the introduction without assistance.
      </p>

      <div className="flex items-center justify-center mb-6">
        <div className="w-full border-b border-[#E2E8F0]" />
        <span className="px-4 text-gray-500">or</span>
        <div className="w-full border-b border-[#E2E8F0]" />
      </div>

      {/* Reasons Accordion */}
      <div className="mb-4 relative">
        <label className="text-xs text-[#334155] mb-2 block">
          What makes this issue important? Please select 4-10 reasons below and briefly explain
        </label>

        <button
          className="bg-white border border-gray-200 text-gray-800 p-2 rounded-md flex items-center gap-1 w-full justify-between"
          onClick={toggleReasonsAccordion}
        >
          <div className="flex gap-2">
            {renderSelectedSection(selectedReasons)}
          </div>
          {isReasonsAccordionOpen ? <AiOutlineUp className="text-sm" /> : <AiOutlineDown className="text-sm" />}
        </button>

        {isReasonsAccordionOpen && (
          <Accordion selectedItems={selectedReasons} onSelect={setSelectedReasons} />
        )}
      </div>

      {/* Gaps Accordion */}
      <div className="mb-4 relative">
        <label className="text-xs text-[#334155] mb-2 block">
          What’s the gap on this issue? Please select 1-2 checkboxes below and briefly explain
        </label>

        <button
          className="bg-white border border-gray-200 text-gray-800 p-2 rounded-md flex items-center gap-1 w-full justify-between"
          onClick={toggleGapsAccordion}
        >
          <div className="flex gap-2">
            {renderSelectedSection(selectedGaps)}
          </div>
          {isGapsAccordionOpen ? <AiOutlineUp className="text-sm" /> : <AiOutlineDown className="text-sm" />}
        </button>

        {isGapsAccordionOpen && (
          <Accordion selectedItems={selectedGaps} onSelect={setSelectedGaps} />
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end mt-4">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Generate Introduction
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default GenerateIntroduction;
