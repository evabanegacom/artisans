import React, { useState } from 'react';

const Sidebar = () => {
  const categories = [
    'Poster templates',
    'Journal cover letter',
    'Oral presentation',
    'Concept notes',
    'Research proposals',
    'Data dissemination plan',
    'Budget tables',
    'Response to the editor',
    'Quantitative study instruments',
    'Ethics proposal',
    'Infographics',
    'Media release',
    'Policy briefs',
  ];

  // State to track selected categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Handle checkbox change
  const handleCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      // Remove from selection if already selected
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      // Add to selection if not already selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="w-1/4 bg-[#F8FAFC] py-4 ps-8 pe-3">
       
      <h2 className="text-lg text-[#334155] font-semibold mb-4">Templates</h2>
      <h2 className="text-xs text-[#64748b] font-medium mb-4">Template Categories</h2>
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="cursor-pointer"
            />
            <label htmlFor={category} className="cursor-pointer text-xs text-[#475569]">
              {category}
            </label>
          </li>
        ))}
        <li className="cursor-pointer text-xs underline text-[#03CDAA] mt-4">Show more</li>
      </ul>
    </div>
  );
};

export default Sidebar;
