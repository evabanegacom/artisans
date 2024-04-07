import ProductService from '../services/product-service';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';

export const setSearchTerm = (searchTerm:string) => {
  return {
    type: SET_SEARCH_TERM,
    payload: searchTerm
  };
};

// actions.js

const setSearchResults = (searchResults:any) => {
  return {
    type: SET_SEARCH_RESULTS,
    payload: searchResults
  };
}

// export const searchProducts = (searchTerm: string) => async (dispatch: any) => {
//   console.log('dispatch triggered');
//   try {
//     const response = await ProductService.searchProducts(searchTerm);
//     const searchData = response.data; // Extract serializable data from the response
//     dispatch(setSearchResults(searchData));
//   } catch (error) {
//     console.error(error);
//   }
// };
// In the searchProducts action creator
export const searchProducts = (searchTerm: string) => async (dispatch: any, getState: any) => {
  try {
    const response = await ProductService.searchProducts(searchTerm);
    console.log({response})
    const searchData = response?.data?.products; // Extract serializable data from the response

    // Redirect to the '/search-results' page with search data as URL parameters
    window.location.href = `/search-results?searchTerm=${searchTerm}&data=${JSON.stringify(searchData)}`;
  } catch (error) {
    console.error(error);
  }
};


