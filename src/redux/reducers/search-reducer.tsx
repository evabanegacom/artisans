const initialState = {
  searchTerm: '',
  searchResults: [],
  pageNumber: 1
};

const searchReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action?.payload,
      };
    case 'SET_SEARCH_RESULTS':
      // Check if the search term has changed
      const searchTermChanged = action?.payload !== state?.searchTerm;
      return {
        ...state,
        searchResults: action?.payload,
        // Reset pageNumber only if search term has changed
        pageNumber: searchTermChanged ? 1 : state?.pageNumber,
      };
    case 'SET_PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action?.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
