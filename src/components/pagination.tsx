import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  totalPages, 
  currentPage, 
  onPageChange 
}) => {
  // if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    // if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  // Generate page numbers with smart ellipsis
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // First page

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) end = Math.min(5, totalPages - 1);
      if (currentPage >= totalPages - 2) start = Math.max(totalPages - 4, 2);

      if (start > 2) pages.push('...');

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push('...');

      if (totalPages > 1) pages.push(totalPages); // Last page
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="flex justify-center mt-8">
      <ul className="pagination flex items-center gap-1">
        
        {/* Previous Button */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-4 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page as number)}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button - FIXED */}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
            // className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Pagination;