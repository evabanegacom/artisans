import React, { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { PiFunnelThin } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface SearchFilterProps {
  headers: string[];
  dropdownOpen: { rowFilter: boolean; columnFilter: boolean };
  setDropdownOpen: React.Dispatch<React.SetStateAction<{ rowFilter: boolean; columnFilter: boolean }>>;
  filters: { [key: string]: string[] };
  toggleFilter: (key: string, value: string) => void;
  data: any[];
  selectedColumns: string[];
  setSelectedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  headers,
  dropdownOpen,
  setDropdownOpen,
  filters,
  toggleFilter,
  data,
  selectedColumns,
  setSelectedColumns,
setSearchTerm,
    searchTerm,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen({ rowFilter: false, columnFilter: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setDropdownOpen]);

  const handleSelectAll = (type: "row" | "column") => {
    if (type === "row") {
      const allSelected = headers.every((header) => filters[header]?.length === data.length);
      headers.forEach((header) => toggleFilter(header, allSelected ? "" : "All"));
    } else {
      const allColumnsSelected = selectedColumns.length === headers.length;
      setSelectedColumns(allColumnsSelected ? [] : [...headers]);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-between gap-8 p-2 bg-white">
        {/* Search Input */}
        <div className="flex items-center bg-[#F1F5F9] rounded-lg px-3 py-1 flex-1">
          <IoSearch className="text-[#475569]" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 text-sm w-full bg-transparent focus:outline-none text-[#64748B]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="relative flex space-x-3">
          {/* Row Filter Button */}
          <button
            className="flex items-center gap-2 bg-[#475569] text-white px-2 py-1 rounded-lg text-sm"
            onClick={() => setDropdownOpen((prev) => ({ ...prev, rowFilter: !prev.rowFilter, columnFilter: false }))}
          >
            <PiFunnelThin className="text-sm" /> <span>Filter Rows</span>
          </button>

          {/* Column Filter Button */}
          <button
            className="flex items-center gap-2 border border-[#CBD5E1] text-[#475569] px-2 py-1 rounded-lg text-sm"
            onClick={() => setDropdownOpen((prev) => ({ ...prev, columnFilter: !prev.columnFilter, rowFilter: false }))}
          >
            <PiFunnelThin className="text-sm" /> Filter Columns <RiArrowDropDownLine size={20} />
          </button>

          {/* Row Filtering Dropdown */}
          {dropdownOpen.rowFilter && (
            <div className="absolute mt-2 bg-white border rounded shadow-md text-[#475569] p-2 top-full left-0 w-80 z-10 max-h-60 overflow-auto">
              <div className="flex items-center justify-between p-2">
                <button onClick={() => handleSelectAll("row")} className="flex items-center text-sm font-semibold text-[#475569]">
                  {headers.every((header) => filters[header]?.length === data.length) ? (
                    <MdCheckBox className="text-[#03CDAA]" />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                  <span className="ml-2 font-normal text-sm">Select All</span>
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border p-1 text-sm rounded-md"
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
              {headers.map((header) => {
                const uniqueValues = [...new Set(data.map((d) => String(d[header as keyof typeof d])))].filter((value) =>
                  value.toLowerCase().includes(searchTerm)
                );

                return (
                  <div key={header} className="mb-2">
                    <div className="text-sm font-semibold text-[#475569]">{header}</div>
                    <div className="grid grid-cols-2 gap-2 p-1">
                      {uniqueValues.map((value) => (
                        <div key={value} className="flex items-center cursor-pointer">
                          <button onClick={() => toggleFilter(header, value)} className="flex items-center w-full">
                            {filters[header]?.includes(value) ? (
                              <MdCheckBox className="text-[#03CDAA]" />
                            ) : (
                              <MdCheckBoxOutlineBlank />
                            )}
                            <span className="ml-2 text-[#475569] text-sm">{value}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Column Filtering Dropdown */}
          {dropdownOpen.columnFilter && (
            <div className="absolute mt-2 bg-white border rounded shadow-md text-[#475569] p-2 top-full right-0 w-80 z-10 max-h-60 overflow-auto">
              <div className="flex items-center justify-between p-2">
                <button onClick={() => handleSelectAll("column")} className="flex items-center text-sm font-semibold text-[#475569]">
                  {selectedColumns.length === headers.length ? (
                    <MdCheckBox className="text-[#03CDAA]" />
                  ) : (
                    <MdCheckBoxOutlineBlank />
                  )}
                  <span className="ml-2 font-normal text-sm">Select All</span>
                </button>
                <input
                  type="text"
                  placeholder="Search..."
                  className="border p-1 text-sm rounded-md outline-none"
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 p-2">
                {headers
                  .filter((header) => header.toLowerCase().includes(searchTerm))
                  .map((header) => (
                    <div key={header} className="flex items-center cursor-pointer whitespace-nowrap">
                      <button
                        onClick={() =>
                          setSelectedColumns((prev) =>
                            prev.includes(header) ? prev.filter((h) => h !== header) : [...prev, header]
                          )
                        }
                        className="flex items-center w-full"
                      >
                        {selectedColumns.includes(header) ? (
                          <MdCheckBox className="text-[#03CDAA]" />
                        ) : (
                          <MdCheckBoxOutlineBlank />
                        )}
                        <span className="ml-2 text-[#475569] font-normal text-sm">{header}</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
