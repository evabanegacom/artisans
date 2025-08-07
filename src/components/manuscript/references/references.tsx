import { useState } from "react";
import './sliderStyles.css'; // This will hold the custom styles
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { AiOutlineArrowRight } from "react-icons/ai";

const ReferencesModal: React.FC = () => {
  const [isHealthIssue, setIsHealthIssue] = useState<string | null>(null);
  const [maxReferences, setMaxReferences] = useState(0);
  const [referencingStyle, setReferencingStyle] = useState("AMA");
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxReferences(parseInt(e.target.value));
    updateSliderBackground(e.target);
    setIsDragging(true);
  };

  const handleSliderRelease = () => {
    setIsDragging(false); // Set dragging to false on mouse up
  };

  const updateSliderBackground = (slider: HTMLInputElement) => {
    const value = (parseInt(slider.value) - 10) / (100 - 10) * 100; // Calculate percentage (based on min = 10 and max = 100)
    slider.style.background = `linear-gradient(to right, #03CDAA ${value}%, #E5E7EB ${value}%)`;
  };

  return (
    <div className="">
      <div className="bg-white w-[500px] p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium text-[#1E293B]">References</h2>
        </div>

        {/* Important Reminder */}
        <div className='bg-[#FFFBEB] flex p-2 rounded-md mt-4 '>
        <div className='flex justify-center pe-2'>
            <HiOutlineInformationCircle className='text-[#D97706] text-2xl' />
        </div>
        <div className=' text-[#B45309]'>
            <p className='text-sm font-semibold'>Important Reminder</p>
            <p className='text-sm'>
            It is recommended to manually create your references to ensure they fully align with the context of your work. While automatically generated references will retrieve actual records, they may not always perfectly match your specific needs. If you prefer to proceed with automatically generated references, please make your selections below to continue.
              </p>
        </div>
    </div>

        {/* Health Issue or Non-Health Issue */}
        <div className="my-4 ">
          <p className="text-xs text-[#334155] mb-2">
            Does this research topic involve a health or non-health issue?
          </p>
          <div className="space-y-2">
            <label className="flex items-center text-sm text-[#475569]">
              <input
                type="radio"
                value="health"
                checked={isHealthIssue === "health"}
                onChange={() => setIsHealthIssue("health")}
                className="mr-2"
              />
              Health issue
            </label>
            <label className="flex items-center text-sm text-[#475569]">
              <input
                type="radio"
                value="non-health"
                checked={isHealthIssue === "non-health"}
                onChange={() => setIsHealthIssue("non-health")}
                className="mr-2"
              />
              Non-health issue
            </label>
          </div>
        </div>

        {/* Maximum number of references */}
        <div className="mb-6">
          <p className="text-xs text-[#334155] mb-2">
            What is the maximum number of references you want?
          </p>
          <div className="mb-4 relative cursor-pointer">
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={maxReferences}
              onChange={handleSliderChange}
              onMouseUp={handleSliderRelease} // Reset on release
              onTouchEnd={handleSliderRelease} 
              className="custom-slider w-full h-6 border border-gray-300 rounded-md focus:outline-none"
              style={{
                background: `linear-gradient(to right, #03CDAA ${(maxReferences - 10) / (100 - 10) * 100}%, #FFF ${(maxReferences - 10) / (100 - 10) * 100}%)`
              }}
            />

<div className="slider-dots absolute top-1/3 w-full flex justify-between transform -translate-y-2 px-2">
              {[...Array(10)].map((_, i) => (
                <span
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  isDragging ? "bg-transparent" : "bg-[#F1F5F9]"
                }`}
              ></span>
              ))}
            </div>

            <div style={{ fontSize: '10px'}} className="flex px-2 justify-between mt-2 text-[#64748B] font-bold">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
                <span key={num}>{num}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Referencing Style */}
        <div className="mb-6">
          <p className="text-xs text-[#334155] mb-2">Please, choose your preferred referencing style</p>
          <select
            value={referencingStyle}
            onChange={(e) => setReferencingStyle(e.target.value)}
            className="w-full px-4 text-[#64748B] text-xs py-2 border border-[#E2E8F0] rounded-md focus:outline-none"
          >
            <option value="AMA">AMA</option>
            <option value="APA">APA</option>
            <option value="MLA">MLA</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
        <button className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4">

            Cancel
          </button>
          <button className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Generate References
          <AiOutlineArrowRight />
        </button>
        </div>
      </div>
    </div>
  );
};

export default ReferencesModal;
