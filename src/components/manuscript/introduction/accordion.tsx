import React, { useState } from "react";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";

// TypeScript Interface
interface AccordionItem {
  title: string;
  checkboxes: CheckboxItem[];
}

interface CheckboxItem {
  label: string;
  inputField: string; // Add inputField per checkbox
}

interface SelectedItem {
  title: string;
  selectedCheckboxes: string[];
}

interface AccordionProps {
  selectedItems: SelectedItem[]; // Array of selected items, including title and selected checkboxes
  onSelect: (item: SelectedItem[]) => void; // Callback to handle selection
}

const CheckMark = () => (
  <div className="w-5 h-5 bg-[#03CDAA] flex items-center justify-center rounded-lg">
    <svg
      className="w-3.5 h-3.5 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  </div>
);

const Accordion: React.FC<AccordionProps> = ({ selectedItems, onSelect }) => {
  const [accordionData, setAccordionData] = useState<AccordionItem[]>([
    {
      title: "Health and Mortality",
      checkboxes: [
        { label: "Lives lost (i.e., premature mortality)", inputField: "" },
        { label: "Excess injury, illness, and disability", inputField: "" },
        { label: "Impact on mental health", inputField: "" },
        { label: "Impact on emotional health", inputField: "" },
      ],
    },
    {
      title: "Economic Impact",
      checkboxes: [
        { label: "Healthcare costs", inputField: "" },
        { label: "Loss of productivity", inputField: "" },
        { label: "Government expenditures", inputField: "" },
      ],
    },
  ]);

  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<SelectedItem[]>([]);

  // Handle toggling accordion sections
  const toggleAccordion = (index: number) => {
    setOpenSectionIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Handle checkbox toggle
  const handleCheckboxToggle = (sectionIndex: number, checkboxLabel: string) => {
    const sectionTitle = accordionData[sectionIndex].title;

    setSelectedCheckboxes((prev) => {
      const sectionExists = prev.find((item) => item.title === sectionTitle);

      if (sectionExists) {
        // If section exists, toggle the checkbox in that section
        const updatedSection = {
          ...sectionExists,
          selectedCheckboxes: sectionExists.selectedCheckboxes.includes(checkboxLabel)
            ? sectionExists.selectedCheckboxes.filter((label) => label !== checkboxLabel)
            : [...sectionExists.selectedCheckboxes, checkboxLabel],
        };

        // Remove section if no checkboxes are selected anymore
        const updatedSections = updatedSection.selectedCheckboxes.length > 0
          ? prev.map((item) => (item.title === sectionTitle ? updatedSection : item))
          : prev.filter((item) => item.title !== sectionTitle);

        onSelect(updatedSections); // Pass updated selections to parent
        return updatedSections;
      } else {
        // If section doesn't exist, add new section with selected checkbox
        const newSection = { title: sectionTitle, selectedCheckboxes: [checkboxLabel] };
        const updatedSections = [...prev, newSection];
        onSelect(updatedSections); // Pass updated selections to parent
        return updatedSections;
      }
    });
  };

  // Handle input field change for a specific checkbox
  const handleInputChange = (
    sectionIndex: number,
    checkboxIndex: number,
    value: string
  ) => {
    setAccordionData((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              checkboxes: section.checkboxes.map((checkbox, j) =>
                j === checkboxIndex ? { ...checkbox, inputField: value } : checkbox
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="absolute z-50 w-full max-w-2xl mx-auto shadow-md bg-white rounded-md p-2 mt-2">
      {accordionData.map((item, sectionIndex) => {
        const selectedCount = selectedCheckboxes.find(
          (selectedItem) => selectedItem.title === item.title
        )?.selectedCheckboxes.length || 0;
        const isOpen = openSectionIndex === sectionIndex;

        return (
          <div key={sectionIndex} className="border-b border-gray-200">
            <button
              onClick={() => toggleAccordion(sectionIndex)}
              className="flex justify-between items-center w-full py-2 text-left text-lg font-medium text-gray-900 hover:text-blue-500"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#475569] text-sm ml-1">{item.title}</span>
                <span className="bg-[#03CDAA] w-5 h-5 flex items-center justify-center rounded-full text-white text-xs font-semibold">
                  {selectedCount}
                </span>
              </div>
              <span>
                {isOpen ? <AiOutlineUp className="text-sm" /> : <AiOutlineDown className="text-sm" />}
              </span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 text-gray-700">
                {item.checkboxes.map((checkbox, checkboxIndex) => {
                  const isCheckboxSelected = selectedCheckboxes.some(
                    (section) => section.selectedCheckboxes.includes(checkbox.label)
                  );
                  return (
                    <div key={checkbox.label} className="my-2">
                      <button
                        onClick={() =>
                          handleCheckboxToggle(sectionIndex, checkbox.label)
                        }
                        type="button"
                        className="flex justify-between gap-3"
                      >
                        {isCheckboxSelected ? <CheckMark /> : (
                          <div className="w-5 h-5 rounded-lg border border-[#CBD5E1]" />
                        )}
                        <div className="text-sm text-[#1E293B] font-medium">{checkbox.label}</div>
                      </button>

                      {isCheckboxSelected && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Enter your response here"
                            value={checkbox.inputField}
                            onChange={(e) =>
                              handleInputChange(sectionIndex, checkboxIndex, e.target.value)
                            }
                            className="border text-xs text-[#475569] border-gray-300 px-3 py-2 w-full rounded-md outline-none"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
