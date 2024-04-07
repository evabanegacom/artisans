import { submitFormData, api } from '../utils/api';

export const createProduct = async (product:any) => {
  const response = await submitFormData(product, '/products');
  return response;
};

export const updateProduct = async (product: any) => {
  const response = await submitFormData(product, '/products');
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

export const getProduct = async (id: number) => {
  const response = await api.get(`/products/${id}`);
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

const searchProducts = async (search: string, page:number) => {
  const response = await api.get(`/products/search?query=${search}&page=${page}`);
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
  searchProducts
};

export default ProductService;