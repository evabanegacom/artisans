import React from "react";
import Sidebar from "./template-sidebar";
import Header from "./template-header";

const Template = () => {
  const templates = [
    {
      id: 1,
      category: "Poster templates",
      titles: [
        "Advancements in Machine Learning",
        "Evaluating the Impact of Climate...",
        "Sociodemographic Influences on Ac...",
      ],
    },
    {
      id: 2,
      category: "Journal cover letter",
      titles: [
        "Exploring AI for Scientific Research",
        "Green Energy Innovations",
        "Healthcare Systems Overview",
      ],
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col py-4 px-6">
        <Header />
        <div className="flex-1 space-y-4 mt-3">
          {templates.map((template) => (
            <div key={template?.id}>
              {/* Category Title */}
              <h2 className="text-xs text-[#1E293B] font-semibold mb-4">{template?.category}</h2>

              {/* Grid for Templates */}
              <div className="grid grid-cols-3 gap-4">
                 {template?.titles.map((title) => (
                
                <div className="flex-col bg-[#F1F5F9] h-48 border border-[#E2E8F0] flex items-center justify-center rounded-xl hover:shadow-lg">
                {/* Top Section */}
                <div className="pt-4 px-4 h-full w-full flex-grow">
                  <div className="bg-white w-full rounded-lg h-full flex items-center justify-center">
                    <span className="text-sm text-center">{title}</span>
                  </div>
                </div>
              
                {/* Bottom Section */}
                <div className="w-full p-3 text-center bg-white text-[10px] text-[#64748B] rounded-b-xl border-t border-[#E2E8F0]">
                  {title}
                </div>
              </div>
              
            ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template;

