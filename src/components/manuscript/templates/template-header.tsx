import React, { useState } from "react";
import { PiFunnelLight } from "react-icons/pi";

interface FilterCommentsProps {
  onSearch: (keyword: string) => void; // Prop for search handler
}

const FilterComments = ({ onSearch }: FilterCommentsProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  // Handle input change and notify parent
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    onSearch(value); // Pass the value to the parent
  };

  const [selectedOption, setSelectedOption] = useState<string>("Sort by date");
  const [showResolved, setShowResolved] = useState<boolean>(false);
  const [showOpen, setShowOpen] = useState<boolean>(false);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleClearFilters = () => {
    setSelectedOption("Sort by date");
    setShowResolved(false);
    setShowOpen(false);
  };

  return (
    <div className="mt-5 relative">
      <form className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search comments"
          className="outline-none w-full text-xs border border-[#E2E8F0] p-2 rounded-lg"
          value={inputValue}
          onChange={handleInputChange} // Update input value and search
        />

        <button className="p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]" type="button">
          <PiFunnelLight className="text-[#475569]" />
        </button>

      </form>

      {/* <div className="absolute top-10 right-0 w-64 p-4 bg-white border rounded-lg shadow-md">
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sortOption"
            value="Sort by date"
            checked={selectedOption === "Sort by date"}
            onChange={() => handleOptionChange("Sort by date")}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-800">Sort by date</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="sortOption"
            value="Sort by unread"
            checked={selectedOption === "Sort by unread"}
            onChange={() => handleOptionChange("Sort by unread")}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-800">Sort by unread</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={() => setShowResolved(!showResolved)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-800">Show resolved comments</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOpen}
            onChange={() => setShowOpen(!showOpen)}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-800">Show open comments</span>
        </label>
      </div>

      <button
        onClick={handleClearFilters}
        className={`mt-4 w-full py-2 text-sm text-gray-600 bg-gray-200 rounded-lg ${
          selectedOption === "Sort by date" &&
          !showResolved &&
          !showOpen &&
          "opacity-50 cursor-not-allowed"
        }`}
        disabled={
          selectedOption === "Sort by date" && !showResolved && !showOpen
        }
      >
        Clear filters
      </button>
      </div> */}
      
    </div>
  );
};

export default FilterComments;
