import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";

const AcknowledgementModal: React.FC = () => {
  const options = [
    {
      id: 1,
      label:
        "Funding agencies: This work was supported by Grant Number [123] from [XYZ].",
    },
    {
      id: 2,
      label:
        "Collaborators: Acknowledgements are extended to all individuals or groups who contributed to the research, including collaborators, research assistants, and data analysts.",
    },
    {
      id: 3,
      label:
        "Study participants: Grateful acknowledgment is extended to the study participants for their voluntary participation and contribution to this research.",
    },
    {
      id: 4,
      label:
        "Institutional support: The study owes its success to the invaluable support provided by the institutional facilities and resources.",
    },

    {
      id: 5,
      label:
        "Ethical approval: The study was conducted with the approval of the Institutional Review Board (IRB) and adhered to the ethical guidelines set forth by the Declaration of Helsinki.",
    },
    {
      id: 6,
      label:
        "Data availability: The data that support the findings of this study are available from the corresponding author upon reasonable request.",
    },
    {
      id: 7,
      label:
        "Conflict of interest: The authors declare no conflict of interest.",
    },

    {
      id: 8,
      label:
        "Open access: This article is distributed under the terms of the Creative Commons Attribution License, which permits unrestricted use, distribution, and reproduction in any medium, provided the original author and source are credited.",
    },

    {
      id: 9,
      label:
        "Authors' contributions: A.B. and C.D. conceived and designed the study; E.F. and G.H. performed the experiments; I.J. and K.L. analyzed the data; M.N. and O.P. wrote the paper.",
      },

    {
      id: 10,
      label:
        "Acknowledgment of previous work: This study builds on the work of [Author et al., 2020] and [Author et al., 2021].",
    },
    
  ];

  const [selectedOptions, setSelectedOptions] = useState<
    { id: number; content: string }[]
  >([]);

  const handleSelect = (id: number, label: string) => {
    setSelectedOptions((prev) =>
      prev.some((option) => option.id === id)
        ? prev.filter((option) => option.id !== id)
        : [...prev, { id, content: label }]
    );
  };

  const handleContentChange = (id: number, newContent: string) => {
    setSelectedOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, content: newContent } : option
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-xl font-medium text-[#1E293B]">Acknowledgement</h2>
      </div>
      <p className="text-sm text-[#64748B] mb-4">
        Select one or more options that apply to your circumstances, edit each
        to suit your preferences, and then submit them to the manuscript.
      </p>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedOptions.some((o) => o.id === option.id);
          return (
            <div
              key={option.id}
              className="flex items-start space-x-3 cursor-pointer"
              onClick={() => {
                if (!isSelected) handleSelect(option.id, option.label);
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.id, option.label);
                }}
                className={`min-w-5 h-5 mt-2 rounded-md flex items-center justify-center border ${
                  isSelected
                    ? "bg-[#03CDAA] border-[#03CDAA] text-white"
                    : "border-gray-300 text-transparent"
                }`}
              >
                {isSelected && <AiOutlineCheck />}
              </button>

              {isSelected ? (
                <div
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    handleContentChange(option.id, e.target.textContent || "")
                  }
                  className="p-2 text-sm text-[#475569] outline-none border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 w-full"
                >
                  {
                    selectedOptions.find((o) => o.id === option.id)?.content ||
                    option.label
                  }
                </div>
              ) : (
                <label
                  className="text-sm text-[#475569] cursor-pointer"
                  onClick={() => handleSelect(option.id, option.label)}
                >
                  {option.label}
                </label>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-5 pt-4 border-t border-[#E2E8F0]">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button
          onClick={() =>
            console.log("Selected Options:", selectedOptions.map((o) => o.content))
          }
          className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2"
        >
          Push to manuscript
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default AcknowledgementModal;
