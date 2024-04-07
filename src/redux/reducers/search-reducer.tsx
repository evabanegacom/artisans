const initialState = {
    searchTerm: '',
    searchResults: []
  };
  
  const searchReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'SET_SEARCH_TERM':
        return {
          ...state,
          searchTerm: action.payload
        };
        case 'SET_SEARCH_RESULTS':
          return {
            ...state,
            searchResults: action.payload
          };
      default:
        return state;
    }
  };
  
  export default searchReducer;
  