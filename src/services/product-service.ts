import { submitFormData, api, updateFormData } from '../utils/api';

export const createProduct = async (product:any) => {
  const response = await submitFormData(product, '/products');
  return response;
};

export const updateProduct = async (product: any, id:number) => {
  const response = await updateFormData(product, `products/${id}`);
  return response;
};

export const deleteProduct = async (id:number) => {
  const response = await api.delete(`/products/${id}`)
  return response;
};

export const getProductsByUserId = async (user_id: number, page:number) => {
  const response = await api.get(`/products/user_products?user_id=${user_id}?page=${page}`);
  return response;
};

export const getProduct = async (product_number: string) => {
  const response = await api.get(`/products/get_product_by_product_number?product_number=${product_number}`);
  return response;
};

export const getProductToEdit = async (product_number: string) => {
  const response = await api.get(`/products/get_picture_to_edit?product_number=${product_number}`);
  return response;
};

export const getProductsByCategory = async (category: string, page:number) => {
  const response = await api.get(`/products/products_by_category?category=${category}&page=${page}`)
  return response;
}

const getProductByStore = async (store_name: string, page:number) => {
  const response = await api.get(`/products/products_by_storename?store_name=${store_name}&page=${page}`);
  return response;
}

const searchProducts = async (search: string, page :number) => {
  const response = await api.get(`/products/search?query=${search}&page=${page}`);
  return response;
}

// const send_download_link = async (product_id: number) => {
//   const response = await api.get(`/products/${product_id}/generate_download_link`);
//   return response;
// }

  const send_download_link = async (product_id: number, email: string, name: string) => {
    const response = await api.post(`/products/${product_id}/send_download_link`, { email, name });
    return response;
  }

const ProductService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
  getProduct,
  getProductsByCategory,
  getProductByStore,
  searchProducts,
  getProductToEdit,
  send_download_link,
};

export default ProductService;