import React, { useState } from "react";
import { BsPlus } from "react-icons/bs";

type Role = {
  id: number;
  title: string;
  category: "System" | "Custom";
  description: string;
};

interface RoleManagerProps {
  onSelect: (role: string) => void;
  roles: Role[];
}

// const roles: Role[] = [
//   {
//     id: 1,
//     title: "Project Owner",
//     category: "System",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
//   {
//     id: 2,
//     title: "Co-Lead",
//     category: "System",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
//   {
//     id: 3,
//     title: "Co-Author",
//     category: "System",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
//   {
//     id: 4,
//     title: "Research Mentor",
//     category: "System",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
//   {
//     id: 5,
//     title: "Project Owner",
//     category: "Custom",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
//   {
//     id: 6,
//     title: "Admin Assistant",
//     category: "Custom",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
//   {
//     id: 7,
//     title: "Peer Reviewer",
//     category: "System",
//     description:
//       "Can manage collaborators, set up incentives, delete questions, add languages for translation and manage participants.",
//   },
// ];

const RoleManager: React.FC<RoleManagerProps> = ({onSelect, roles}) => {
  const [activeTab, setActiveTab] = useState<"All" | "System" | "Custom">("All");

  const filteredRoles =
    activeTab === "All"
      ? roles
      : roles.filter((role) => role?.category === activeTab);

  return (
    <div className="absolute top-0 right-72 mt-3 w-full bg-white p-6 rounded-lg shadow-lg space-y-4 h-80 overflow-y-auto">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        {["All", "System", "Custom"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "All" | "System" | "Custom")}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-[#03CDAA] text-[#03CDAA]"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add Custom Role Button */}
      {activeTab === "Custom" && (
        <button className="text-[#03CDAA] rounded-md flex items-center gap-1 text-xs">
          <div className="bg-[#C2FFF5] rounded-md p-1 text-xs"><BsPlus className="text-xs"/></div><span className="">Add new custom role</span>
        </button>
      )}

      {/* Role List */}

<div className="space-y-4">
  {filteredRoles.map((role) => (
    <div
      key={role?.id}
      onClick={() => onSelect(role?.title)}
      className="flex hover:bg-[#F8FAFC] items-center justify-between border border-gray-200 rounded-lg p-4 group"
    >
      <div className="flex-grow">
        <h3 className="text-xs font-medium text-[#475569]">
          {role?.title}{" "}
          <span
            style={{ fontSize: '10px' }}
            className={`ml-2 text-xs font-semibold p-1 ${
              role?.category === "System"
                ? "text-[#64748B] bg-[#E2E8F0]"
                : "bg-[#BFDBFE] text-[#3B82F6]"
            }`}
          >
            {role?.category?.toUpperCase()}
          </span>
        </h3>
        <p style={{ fontSize: '10px' }} className="text-[#94A3B8]">
          {role?.description}
        </p>
      </div>

      {/* Always visible "View Permissions" button that only shows on hover */}
      <button className="text-[#334155] whitespace-nowrap text-xs font-medium hover:underline hidden group-hover:inline transition-all">
        View Permissions
      </button>
    </div>
  ))}
</div>




    </div>
  );
};

export default RoleManager;
