import React, { useEffect, useState } from "react";
import { FaCheckSquare, FaSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Journal {
  id: number;
  name: string;
  focus: string;
  link: string;
  selected: boolean;
}

interface JournalOrLicense {
  id: number;
  name: string;
}

const customJournals = [
  { id: 1, name: "Nature", focus: "Multidisciplinary scientific research", link: "Nature Journal", selected: true },
  { id: 2, name: "The Lancet", focus: "Medical and healthcare research", link: "The Lancet", selected: true },
  { id: 3, name: "IEEE Transactions on Pattern Analysis and Machine Intelligence", focus: "Computer science, AI, and machine learning", link: "IEEE TPAMI", selected: false },
  { id: 4, name: "Journal of the American Medical Association (JAMA)", focus: "Clinical and medical research", link: "JAMA", selected: false },
]

const partnerJournals = [
  { id: 1, name: "Partner", focus: "Multidisciplinary scientific research", link: "Nature Journal", selected: true },
  { id: 2, name: "The Lancet", focus: "Medical and healthcare research", link: "The Lancet", selected: true },
  { id: 3, name: "IEEE Transactions on Pattern Analysis and Machine Intelligence", focus: "Computer science, AI, and machine learning", link: "IEEE TPAMI", selected: false },
  { id: 4, name: "Journal of the American Medical Association (JAMA)", focus: "Clinical and medical research", link: "JAMA", selected: false },
]

const licenceOptions = [
  {id: 1, name:'Attribution CC-BY 4.0'},
  {id: 2, name:'Attribution-ShareAlike CC-BY-SA 4.0'},
  {id: 3, name:'Attribution-NoDerivs CC-BY-ND 4.0'},
  {id: 4, name:'Attribution-NonCommercial CC-BY-NC 4.0'},
  {id: 5, name:'Non-Exclusive no reuse'},
]

const journalSelectionOptions = [
  {id: 1, name:'Submitting to Partner Journals'},
  {id: 2, name:'Submitting to Custom Journals'},
]

const PublishModal: React.FC = () => {
  const [publishingOption, setPublishingOption] = useState("Submit to Scientific Journals");
  const [submittingTo, setSubmittingTo] = useState("Submitting to Partner Journals");
  const [currentPage, setCurrentPage] = useState(1);
  const [journals, setJournals] = useState<Journal[]>(partnerJournals);
  const [ journalOrLicense, setJournalOrLicense ] = useState<any>(journalSelectionOptions);

  useEffect(() => {
    setJournalOrLicense(publishingOption === "Submit to Partner a Scientific Journal" ? journalSelectionOptions : licenceOptions);
    setJournals(submittingTo === "Submitting to Partner Journals" ? partnerJournals : customJournals);
  }, [submittingTo, publishingOption]);
  
  const toggleJournalSelection = (id: number) => {
    setJournals(journals.map(journal => 
      journal.id === id ? { ...journal, selected: !journal.selected } : journal
    ));
  };

 const customJournalText = "Browse journals that are tailored to your topic with filtering options to help you find the perfect fit. Visit the respective journals' websites to access submission instructions for authors."

 const partnerJournalText = "We partner with a select group of journals for easy submission. With just one click, you can submit your paper directly."

  return (
    <div className="">
      <div className="bg-white w-[600px] rounded-lg shadow-lg px-6 py-5">
        {/* <div className="text-right">
          <button className="text-gray-400 hover:text-gray-600">&times;</button>
        </div> */}
        <div className="text-xl font-medium text-[#1E293B]">Publish</div>
        <p className="text-[#64748B] text-base mt-2">Add your own text that best fits your needs.</p>

        {/* Publishing Options */}
        <div className="mt-4">
          <label className="block text-sm font-normal text-[#334155]">Choose Publishing Options</label>
          <select
            value={publishingOption}
            onChange={(e) => setPublishingOption(e.target.value)}
            className="mt-1 text-[#475569] outline-none text-sm w-full border border-gray-300 rounded px-3 py-2"
          >
            <option>Submit to Chisquares Preprint Server</option>
            <option>Submit to Partner a Scientific Journal</option>
          </select>
        </div>

        {/* Submitting To */}
        <div className="mt-4">
          <label className="block text-sm font-normal text-[#334155] outline-none">
            {publishingOption === "Submit to Partner a Scientific Journal" ? "Submitting to Journals" : "Select a license"}
          </label>
          <select
            value={submittingTo}
            onChange={(e) => setSubmittingTo(e.target.value)}
            className="mt-1 text-[#475569] outline-none text-sm w-full border border-[#E2E8F0] rounded-md px-3 py-2"
          >
            {journalOrLicense.map((option:JournalOrLicense) => (
              <option key={option.id} value={option.name}>{option.name}</option>
            ))}
          </select>
        </div>

        {/* Partner Journals */}
        <div className="mt-4">
          <h3 className="text-[#475569] font-medium text-base">
            {submittingTo === "Submitting to Partner Journals" ? "Partner Journals" : "Custom Journals"}
          </h3>
          <p className="text-[#94A3B8] text-xs">
            {submittingTo === "Submitting to Partner Journals" ? partnerJournalText : customJournalText}
          </p>

          {/* Journal List */}
          <div className="mt-2 space-y-2 h-64 overflow-y-auto">
            {journals.map((journal) => (
              <div
              key={journal.id}
              className={`flex items-start p-2 gap-2 ${
                journal.id !== journals[journals.length - 1].id ? 'border-b border-[#E2E8F0]' : ''
              }`}
            >
                <button
                  className={`rounded mt-1 ${journal.selected ? 'text-[#03CDAA]' : 'text-white border border-gray-300'}`}
                  onClick={() => toggleJournalSelection(journal.id)}
                >
                  {journal.selected ? <FaCheckSquare /> : <FaSquare />}
                </button>
                <div>
                  <h4 className="font-medium text-sm text-[#475569]">{journal.name}</h4>
                  <p className="text-[#94A3B8] font-medium text-sm">Focus: {journal.focus}</p>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] text-sm">Link: <span className="underline">{journal.link}</span></a>
                  
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-gray-500 text-sm">
            <span>Showing 1 - 4 of 20 results</span>
            <div className="flex items-center space-x-2">
              <button
                className="p-1"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`p-1 ${currentPage === page ? 'text-blue-500 font-bold' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="p-1"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4 border-t border-[#E2E8F0] pt-4">
          <button className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#03CDAA] text-white text-sm rounded-md hover:bg-blue-600">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
