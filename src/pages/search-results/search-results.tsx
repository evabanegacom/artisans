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
    <div className="w-48 sm:w-full lg:w-80 text-center text-xl no-rounded-left bg-red-950 text-white">
    results for {searchTerm}
        </div>
   
    <div className="py-5 mx-auto">
    <div className="px-1 lg:px-5 md:px-1 mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
      {searchData.products?.length > 0 ? searchData?.products?.map((product:any) => (
        <ProductItem product={product} key={product.id} />
      )): <div className='text-center w-full mt-3'>No item matches your search</div>}
    </div>
    </div>
    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
  </div>
  )
}

export default SearchResults