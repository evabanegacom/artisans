// actions/searchActions.ts
import ProductService from '../services/product-service';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';
export const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export const setSearchTerm = (searchTerm: string) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

export const setSearchResults = (results: any) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});

export const setSearchLoading = (loading: boolean) => ({
  type: SET_SEARCH_LOADING,
  payload: loading,
});

export const setSearchError = (error: string | null) => ({
  type: SET_SEARCH_ERROR,
  payload: error,
});

// Clean, proper async action — NO URL pollution!
export const searchProducts = (searchTerm: string, page: number = 1) => async (dispatch: any) => {
  dispatch(setSearchLoading(true));
  dispatch(setSearchError(null));

  try {
    const response = await ProductService.searchProducts(searchTerm, page);
    const data = response?.data || { products: [], total_products: 0 };
    dispatch(setSearchResults({
      products: data?.products || [],
      total_products: data?.total_products || 0,
      currentPage: page,
      searchTerm,
    }));
  } catch (error: any) {
    console.error("Search failed:", error);
    dispatch(setSearchError(error.message || "Search failed"));
    dispatch(setSearchResults({ products: [], total_products: 0 }));
  } finally {
    dispatch(setSearchLoading(false));
  }
};