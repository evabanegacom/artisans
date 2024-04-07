import React from 'react'
import useSearch from '../../search-hook';
import ProductItem from '../../components/product-item';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const searchState = useSelector((state:any) => state?.reducer?.search)
  const { searchTerm, searchResults } = searchState;
  return (
    <div className="bg-gray-200 p-4">  {/* Base styles */}
    <h1 className=
      "text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md mb-3">
      results
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto"> {/* Product list grid */}
      {searchResults.map((product:any) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
    {/* <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
  </div>
  )
}

export default SearchResults