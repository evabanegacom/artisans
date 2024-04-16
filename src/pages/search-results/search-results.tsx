import { useEffect, useState } from 'react'
import ProductItem from '../../components/product-item';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import Pagination from '../../components/pagination';


const SearchResults = () => {
  const searchState = useSelector((state:any) => state?.reducer?.search)
  const [searchData, setSearchData] = useState<any>({});
  let currentPage = useSelector((state:any) => state?.reducer?.search?.pageNumber);
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('searchTerm');
  const searchDataJson = urlParams.get('data');

  useEffect(() => {
  
    if (searchDataJson) {
      const searchData = JSON.parse(searchDataJson);
      setSearchData(searchData);
    } else {
      // If search data is not available in URL parameters, redirect back to search page
      console.log('/search-page'); // Update with your actual search page URL
    }
  }, []);

  const handlePageChange = (pageNumber: number) => {
    currentPage = pageNumber;
  };

  const totalData = searchData?.total_products || 0;
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalData / itemsPerPage);
  
  return (
    <div className="bg-gray-200 p-3">  {/* Base styles */}
    <h1 className=
      "text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md">
      results for {searchTerm}
    </h1>
    <div className="container px-5 py-5 mx-auto">
    <div className="flex flex-wrap -m-4">
      {searchData.products?.map((product:any) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
  </div>
  )
}

export default SearchResults