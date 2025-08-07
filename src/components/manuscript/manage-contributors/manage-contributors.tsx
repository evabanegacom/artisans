import React, { useState } from "react";
import RoleManager from "./role-options";
import { GoTrash } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { BsPlus } from "react-icons/bs";

type Contributor = {
  id: number;
  email: string;
  role: string | null;
};

const ManageContributors: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([
    { id: 1, email: "", role: null },
  ]);

  const [openRoleManagerId, setOpenRoleManagerId] = useState<number | null>(null);

  // Function to handle role selection for a specific contributor
  const handleRoleSelect = (contributorId: number, role: string) => {
    setContributors(
      contributors.map((contributor) =>
        contributor.id === contributorId
          ? { ...contributor, role } // Update the role for the specific contributor
          : contributor
      )
    );
    setOpenRoleManagerId(null); // Close the RoleManager after selection
  };

  // Add a new contributor
  const handleAddContributor = () => {
    setContributors([
      ...contributors,
      { id: contributors.length + 1, email: "", role: null },
    ]);
  };

  // Handle input change for email
  const handleInputChange = (id: number, value: string) => {
    setContributors(
      contributors.map((contributor) =>
        contributor.id === id ? { ...contributor, email: value } : contributor
      )
    );
  };

  // Remove a contributor
  const handleRemoveContributor = (id: number) => {
    setContributors(contributors.filter((contributor) => contributor.id !== id));
  };

  // Toggle RoleManager visibility for a specific contributor
  const toggleRoleManager = (id: number) => {
    setOpenRoleManagerId(openRoleManagerId === id ? null : id);
  };

  const handleSendInvite = () => {
    console.log("Send Invite");
  };

  return (
    <div className="rounded-lg bg-white max-w-2xl p-6 space-y-6 overflow-x-hidden">
      {/* Header */}
      <div>
        <div className="text-[#334155] font-semibold text-xl">
          Manage Contributors
        </div>
        <div className="text-gray-500">
          Regulate collaborator access and responsibilities for your study
        </div>
      </div>

      <div className="border border-[#E2E8F0] rounded-lg p-4 space-y-2">
        {contributors.map((contributor) => (
          <div
            key={contributor.id}
            className="flex items-center w-full justify-between gap-3 text-sm"
          >
            <div className="w-96">
              <input
                type="text"
                placeholder="Enter Contributor email"
                value={contributor.email}
                onChange={(e) =>
                  handleInputChange(contributor.id, e.target.value)
                }
                className="w-full outline-none border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>

            {/* Assign Role Button */}
            <div className="relative inline-block flex-shrink-0">
              <button
                className="w-36 flex justify-between items-center border border-[#E2E8F0] whitespace-nowrap text-[#475569] rounded-lg px-2 py-2"
                onClick={() => toggleRoleManager(contributor.id)}
              >
                {contributor.role || "Assign Role"}
                {openRoleManagerId === contributor.id ? (
                  <MdKeyboardArrowUp className="inline-block ml-2" />
                ) : (
                  <MdKeyboardArrowDown className="inline-block ml-2" />
                )}
              </button>

              {openRoleManagerId === contributor.id && (
                <div className="absolute left-0 mt-2 w-[500px] bg-white shadow-lg rounded-lg z-10">
                  <RoleManager
                    onSelect={(role: string) =>
                      handleRoleSelect(contributor.id, role)
                    }
                    roles={[]}
                  />
                </div>
              )}
            </div>

            {/* Trash Button */}
            <div className="flex-shrink-0 bg-[#FFF1F2] flex items-center justify-center p-2 rounded-lg">
              <button
                onClick={() => handleRemoveContributor(contributor.id)}
                className="text-red-500"
              >
                <GoTrash size={20} />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddContributor}
          className="flex items-center text-sm text-[#03CDAA]"
        >
          <BsPlus className="" size={20} /> <span className="text-sm">Add More</span>
        </button>
      </div>

      <div className="flex justify-end mt-5 pt-4 border-t border-[#E2E8F0]">
        <button
          onClick={() => console.log("Cancel")}
          className="text-[#475569] border border-[#CBD5E1] rounded-md text-sm font-semibold px-3 hover:text-gray-700 mr-4"
        >
          Skip for now
        </button>
        <button
         onClick={handleSendInvite}
         className="bg-[#03CDAA] text-white py-2 px-4 rounded-md font-medium text-sm flex items-center gap-2">
          Send Invite
        </button>
      </div>
    </div>
  );
};

export default ManageContributors;

// git push --no-verify origin manuscript-integration
