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

export const getProducts = async () => {
  const response = await api.get('/products');
  return response;
};

export const getProduct = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response;
};

export const getProductsByCategory = async (category: string) => {
  const response = await api.get(`/products/products_by_category?category=${category}`)
  return response;
}

const getProductByStore = async (store_name: string) => {
  const response = await api.get(`/products/store/${store_name}`);
  return response;
}

const searchProducts = async (search: string) => {
  const response = await api.get(`/products/search?query=${search}`);
  return response;
}

const ProductService = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
  getProductsByCategory,
  getProductByStore,
  searchProducts
};

export default ProductService;