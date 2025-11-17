// reducer/searchReducer.ts
import { AnyAction } from 'redux';
import { SET_SEARCH_TERM, SET_SEARCH_RESULTS, SET_SEARCH_LOADING, SET_SEARCH_ERROR, SET_CURRENT_PAGE } from '../actions';

interface SearchState {
  searchTerm: string;
  products: any[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchTerm: '',
  products: [],
  totalProducts: 0,
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action: AnyAction): SearchState => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
        // Reset results when new search starts
        products: [],
        totalProducts: 0,
        currentPage: 1,
        totalPages: 0,
        error: null,
      };

    case SET_SEARCH_RESULTS:
      console.log("Reducer - received search results:", action.payload);
      return {
        ...state,
        products: action?.payload?.products || [],
        totalProducts: action?.payload?.total_products || 0,
        totalPages: Math.ceil((action.payload.total_products || 0) / 20),
        loading: false,
        error: null,
      };

    case SET_SEARCH_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };

    case SET_SEARCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        products: [],
        totalProducts: 0,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;