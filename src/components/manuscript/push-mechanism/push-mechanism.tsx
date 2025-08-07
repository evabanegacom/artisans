import React, { useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { HiPlusSmall } from "react-icons/hi2";
import CreateSection from './create-section';

interface Section {
  id: number;
  name: string;
}

const PushModal: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    { id: 1, name: 'Introduction' },
    { id: 2, name: 'Study Population' },
    { id: 3, name: 'Measures' },
    { id: 4, name: 'Analysis' },
    { id: 5, name: 'Results' },
  ]);
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleSectionSelect = (id: number) => {
    setSelectedSection(id);
  };

  return (
    <>
    {!isAddingSection ?
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-medium mb-4 text-[#1E293B]">Please specify where to push to</h2>
        <form>
          <fieldset className="space-y-3">
            {sections.map((section) => (
              <div key={section.id} className="flex items-center">
                <input
                  type="radio"
                  id={`section-${section.id}`}
                  name="section"
                  value={section.id}
                  checked={selectedSection === section.id}
                  onChange={() => handleSectionSelect(section.id)}
                  className="mr-2"
                />
                <label htmlFor={`section-${section.id}`} className="text-[#475569] text-sm">
                  {section.name}
                </label>
              </div>
            ))}
          </fieldset>
          
            <button
              type="button"
              onClick={() => setIsAddingSection(true)}
              className="text-[#03CDAA] mt-4 flex items-center text-sm"
            >
              <span className="mr-2">+</span> Add new section
            </button>
          

<div className="flex justify-end mt-5 pt-4 border-t border-[#E2E8F0]">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">
          Cancel
        </button>
        <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Push
          <AiOutlineArrowRight />
        </button>
      </div>
        </form>
      </div>
    : <CreateSection setIsAddingSection={setIsAddingSection} />}
   </>
  );
};

export default PushModal;
