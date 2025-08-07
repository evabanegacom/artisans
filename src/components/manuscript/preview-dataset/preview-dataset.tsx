import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import SearchFilter from "./search-filter";

const data = Array.from({ length: 20 }, (_, i) => ({
  id : i + 1,
  Stratum: ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"][i % 10],
  PSU: String((i % 10) + 1),
  Year: ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"][i % 10],
  Country: ["Ghana", "Nigeria", "Kenya", "South Africa", "Egypt", "Morocco", "Ethiopia", "Uganda", "Tanzania", "Zimbabwe"][i % 10],
  Sex: i % 2 === 0 ? "Male" : "Female",
  Age: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24][i % 10],
  Ever_Ciga: i % 3,
  Current_Ciga: i % 4,
  Freq_Ciga: i % 5,
  Notes: ["NA", "Low Risk", "Moderate Risk", "High Risk", "No Data", "Occasional", "Frequent", "Rare", "Unknown", "Tested"][i % 10]
}));

const headers = ["id", "Stratum", "PSU", "Year", "Country", "Sex", "Age", "Ever_Ciga", "Current_Ciga", "Freq_Ciga", "Notes"];

export default function FixedHeaderTable() {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [ searchTerm, setSearchTerm ] = useState<string>("");
  const [rowColumnDropdown, setRowColumnDropDown] = useState<{ rowFilter: boolean; columnFilter: boolean }>({
    rowFilter: false,
    columnFilter: false,
  });

  const toggleFilter = (key: string, value: string) => {
    setFilters((prev) => {
      let updatedFilters = { ...prev };
      const allValues = [...new Set(data.map((d) => String(d[key as keyof typeof d])))];

      if (value === "All") {
        updatedFilters[key] = updatedFilters[key]?.length === allValues.length ? [] : allValues;
      } else {
        const currentValues = updatedFilters[key] || [];
        updatedFilters[key] = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];

        if (updatedFilters[key].length === allValues.length) {
          updatedFilters[key] = allValues;
        }
      }

      return updatedFilters;
    });
    setDropdownOpen(null);
  };

  const toggleRowSelection = (rowName: string) => {
    setSelectedColumns((prev) =>
      prev.includes(rowName) ? prev.filter((r) => r !== rowName) : [...prev, rowName]
    );
  };

  // Filter data to only show rows where selected values in a column match
  const filteredData = data.filter((row) =>
    Object.entries(filters).every(([key, values]) =>
      values.length ? values.includes(String(row[key as keyof typeof row])) : true
    )
  );

  const handleDropdownToggle = (header: string) => {
    setDropdownOpen((prev) => (prev === header ? null : header)); // Toggle dropdown, ensuring only one stays open
  };
  // Determine which headers (columns) to display based on selected rows
  const displayedHeaders = selectedColumns.length ? headers.filter(header => selectedColumns.includes(header)) : headers;

  return (
    <div className="w-full max-w-5xl mx-auto border rounded-lg shadow-lg overflow-hidden">
      <div className="px-2">
        <div className="text-2xl font-medium text-[#64748B]">
          Preview Dataset: <span className="font-medium text-[#1E293B]">GYTS_SENEGAL_12345</span>
        </div>
        <div className="flex gap-2 items-center text-xs font-medium mt-2">
          <div className="flex items-center gap-2 border-r border-gray-300 pr-2">
            <span className="text-[#94A3B8]">DatasetID</span>
            <span className="text-[#64743B] font-medium">GYTS SN123</span>
          </div>
          <div className="flex items-center gap-2 border-r border-gray-300 pr-2">
            <span className="text-[#94A3B8]">Rows</span>
            <span className="text-[#64743B] font-medium">1200</span>
            <span className="text-[#94A3B8]">Columns</span>
            <span className="text-[#64743B] font-medium">1200</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#94A3B8]">Last Modified</span>
            <span className="text-[#64743B] font-medium">05 Jan 2024 22:00</span>
          </div>
        </div>
      </div>

      <SearchFilter 
        headers={headers}
        setDropdownOpen={setRowColumnDropDown}
        dropdownOpen={rowColumnDropdown}
        filters={filters}
        toggleFilter={toggleFilter}
        data={data}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      <div className="flex justify-between px-2 mt-2">
        <div className="text-[#A4A4B3] text-sm">Showing {filteredData.length} of 6680 Rows</div>
        <div><span className="text-sm text-[#1E293B]">Display Colored</span></div>
      </div>

      <div className="relative overflow-auto mt-4" style={{ maxHeight: "500px" }}>

        <table className="w-full border-collapse">
                  <thead className="bg-[#F8FAFC] sticky top-0 shadow-md">
             <tr>
               {displayedHeaders.map((header) => (
                 <th key={header} className="p-2 text-left relative">
                   <div className="flex items-center gap-2 relative text-sm text-[#475569]">
                     {header}
                     <button
                    //    onClick={() =>
                    //      setDropdownOpen((prev) => ({ ...prev, [header]: !prev[header] }))
                    //    }
                    onClick={() => handleDropdownToggle(header)}
                       className="text-gray-600 focus:outline-none border border-[#CBD5E1] rounded-md"
                     >
                       <IoMdArrowDropdown size={20} />
                     </button>

                     {dropdownOpen === header && (
 <div 
 className="absolute mt-2 bg-white border rounded shadow-md text-[#475569] p-2 
            top-full left-0 w-80 z-50 max-h-60 overflow-auto"
 style={{ position: "absolute" }}
>
    {/* "Select All" Option - Fixed at the top */}
    <div className="flex items-center cursor-pointer sticky top-0 bg-white p-2 border-b">
      <button onClick={() => toggleFilter(header, "All")} className="flex items-center w-full">
        {filters[header]?.length === data.length ? (
          <MdCheckBox className="text-[#03CDAA]" />
        ) : (
          <MdCheckBoxOutlineBlank />
        )}
        <span className="ml-2 text-[#475569] font-normal text-sm">Select all</span>
      </button>
    </div>

    {/* Filter options in a 2-column grid */}
    <div className="grid grid-cols-2 gap-4 p-2 overflow-auto">
      {[...new Set(data.map((d) => String(d[header as keyof typeof d])))].map((value) => (
        <div key={value} className="flex items-center cursor-pointer whitespace-nowrap">
          <button onClick={() => toggleFilter(header, value)} className="flex items-center w-full">
            {filters[header]?.includes(value) ? (
              <MdCheckBox className="text-[#03CDAA] font-normal" />
            ) : (
              <MdCheckBoxOutlineBlank />
            )}
            <span
              className={`ml-2 font-normal text-sm ${
                value === "NA" ? "text-[#F59E0B]" : "text-[#475569]"
              }`}
            >
              {value}
            </span>
          </button>
        </div>
      ))}
    </div>
  </div>
)}




                   </div>
                 </th>
               ))}
             </tr>
           </thead>

          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id} className="even:bg-[#F8FAFC] odd:bg-white">
                {displayedHeaders.map((header) => (
                  <td
                    key={header}
                    className={`p-2 text-[#475569] border-b text-center text-sm ${
                      row[header as keyof typeof row] === "NA" ? "bg-[#FEF3C7] text-[#F59E0B]" : ""
                    }`}
                  >
                    {row[header as keyof typeof row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      
    </div>
  );
}
