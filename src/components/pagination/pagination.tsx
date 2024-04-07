import React from 'react';
import './style.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-link"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className="page-item">
            <button
              onClick={() => handlePageChange(index + 1)}
              className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage <= totalPages}
            className="page-link"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
