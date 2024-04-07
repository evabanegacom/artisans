import { useEffect, useState } from 'react'
import ProductItem from '../../components/product-item';
import { useSelector } from 'react-redux';


const SearchResults = () => {
  const searchState = useSelector((state:any) => state?.reducer?.search)
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('searchTerm');
    const searchDataJson = urlParams.get('data');
  
    if (searchDataJson) {
      const searchData = JSON.parse(searchDataJson);
      setSearchData(searchData);
    } else {
      // If search data is not available in URL parameters, redirect back to search page
      console.log('/search-page'); // Update with your actual search page URL
    }
  }, []);
  return (
    <div className="bg-gray-200 p-3">  {/* Base styles */}
    <h1 className=
      "text-center text-2xl font-bold text-white bg-blue-800 py-4 rounded-md">
      results
    </h1>
    <div className="container px-5 py-20 mx-auto">
    <div className="flex flex-wrap -m-4">
      {searchData.map((product:any) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
    </div>
    {/* <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} /> */}
  </div>
  )
}

export default SearchResults